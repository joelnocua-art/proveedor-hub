export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text, skus } = req.body;
  if (!text || !skus || !Array.isArray(skus)) {
    return res.status(400).json({ error: 'Missing text or skus array in request body' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured on the Vercel server. Please add it in your project Settings -> Environment Variables.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a professional procurement and logistics AI for BIA Energy. I will provide raw text extracted from a supplier's catalog PDF, and a list of my company's valid SKUs. Find the pricing and delivery details for the exact SKUs in the catalog. Return ONLY a valid JSON array of objects with keys: "sku" (string, EXACTLY matching one of my SKUs), "price" (number, NO currency symbols, just float or integer. For example, if it says $250.000, parse as 250000), "delivery_days" (string or number, e.g. "5", null if not found), "warranty" (string, e.g. "12 meses", null if not found). Output strictly pure JSON, no markdown blocks like \`\`\`json.`
          },
          {
            role: 'user',
            content: `Valid SKUs:\n${JSON.stringify(skus)}\n\nSupplier Catalog Text:\n${typeof text === 'string' ? text.substring(0, 80000) : text}`
          }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: 'OpenAI API Error', details: err });
    }

    const data = await response.json();
    let content = data.choices[0].message.content.trim();
    if (content.startsWith('```json')) content = content.replace(/```json/g, '').replace(/```$/g, '').trim();
    if (content.startsWith('```')) content = content.replace(/```/g, '').trim();
    
    return res.status(200).json(JSON.parse(content));
  } catch (error) {
    console.error('Error in analyze-catalog:', error);
    return res.status(500).json({ error: error.message });
  }
}
