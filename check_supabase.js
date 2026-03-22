const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://fepivzcobbdybztuiyge.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcGl2emNvYmJkeWJ6dHVpeWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4ODkxMDMsImV4cCI6MjA4OTQ2NTEwM30.ZwUjlkqiucO3bzLW-Rw4CGUS3N4wsNFrjLl2ZyPa4PU';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

async function check() {
  const { data: quotes } = await sb.from('quotes').select('cotizacion_nombre, cotizacion_batch, empresa, descripcion');
  const { data: responses } = await sb.from('provider_responses').select('*');
  
  console.log('--- Provider Responses ---');
  console.log(responses);
  
  console.log('\n--- Quotes matching "tcccc" ---');
  console.log(quotes.filter(q => q.cotizacion_nombre === 'tcccc'));
}
check();
