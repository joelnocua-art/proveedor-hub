const urlCatalog = 'https://fepivzcobbdybztuiyge.supabase.co/rest/v1/sku_catalog?sku=eq.AE%20303&select=*';
const urlOffers = 'https://fepivzcobbdybztuiyge.supabase.co/rest/v1/sku_offers?select=*';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcGl2emNvYmJkeWJ6dHVpeWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4ODkxMDMsImV4cCI6MjA4OTQ2NTEwM30.ZwUjlkqiucO3bzLW-Rw4CGUS3N4wsNFrjLl2ZyPa4PU';

async function run() {
  const reqCat = await fetch(urlCatalog, { headers: { 'apikey': key, 'Authorization': 'Bearer ' + key } });
  const catData = await reqCat.json();
  console.log('Catalog AE 303:', catData);

  if (catData.length > 0) {
    const skuId = catData[0].id;
    const reqOff = await fetch(`https://fepivzcobbdybztuiyge.supabase.co/rest/v1/sku_offers?sku_id=eq.${skuId}&select=*`, { headers: { 'apikey': key, 'Authorization': 'Bearer ' + key } });
    const offData = await reqOff.json();
    console.log(`Offers for sku_id=${skuId}:`, offData);
  }
}
run();
