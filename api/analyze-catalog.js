export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text, skus } = req.body;
  if (!text || !skus || !Array.isArray(skus)) {
    return res.status(400).json({ error: 'Missing text or skus array in request body' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the Vercel server. Please add it in your project Settings -> Environment Variables.' });
  }

  // Define the prompt identical to OpenAI to preserve quality
  const systemInstruction = `You are a professional procurement and logistics AI for BIA Energy. I will provide a list of valid SKUs and raw text extracted from a supplier's catalog PDF. Find the pricing and delivery details for the exact SKUs in the catalog. Return ONLY a valid JSON array of objects with keys: "sku" (string, EXACTLY matching one of my SKUs), "price" (number, NO currency symbols, just float or integer. For example, if it says $250.000, parse as 250000), "delivery_days" (string or number, e.g. "5", null if not found), "warranty" (string, e.g. "12 meses", null if not found). Output strictly pure JSON.`;
  
  const userPrompt = `Valid SKUs:\n${JSON.stringify(skus)}\n\nSupplier Catalog Text:\n${typeof text === 'string' ? text.substring(0, 150000) : text}`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: userPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      let errMsg = 'Gemini API Error';
      try {
        const parsed = JSON.parse(err);
        if (parsed.error && parsed.error.message) errMsg += ': ' + parsed.error.message;
        else errMsg += ': ' + err;
      } catch(e) {
        errMsg += ': ' + err;
      }
      return res.status(response.status).json({ error: errMsg, details: err });
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
       return res.status(500).json({ error: "Gemini devolvió una respuesta vacía o bloqueada por seguridad." });
    }

    let content = data.candidates[0].content.parts[0].text.trim();
    if (content.startsWith('```json')) content = content.replace(/```json/g, '').replace(/```$/g, '').trim();
    if (content.startsWith('```')) content = content.replace(/```/g, '').trim();
    
    return res.status(200).json(JSON.parse(content));
  } catch (error) {
    console.error('Error in analyze-catalog:', error);
    return res.status(500).json({ error: error.message });
  }
}
