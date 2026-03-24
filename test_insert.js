const SUPABASE_URL = 'https://fepivzcobbdybztuiyge.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcGl2emNvYmJkeWJ6dHVpeWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4ODkxMDMsImV4cCI6MjA4OTQ2NTEwM30.ZwUjlkqiucO3bzLW-Rw4CGUS3N4wsNFrjLl2ZyPa4PU';

async function run() {
  const url = `${SUPABASE_URL}/rest/v1/provider_responses`;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  const payload = {
    batch: 'TEST_BATCH',
    provider: 'TestProvider',
    sku: 'TEST_SKU',
    price_sin_iva: 100,
    price_con_iva: 119,
    delivery_days: 5,
    warranty_months: 12,
    payment_terms: '30 dias',
    notes: 'Test note',
    responded_at: new Date().toISOString()
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch(e) {
    console.error('Fetch error:', e);
  }
}
run();
