// /routes/layout/+page.js-->
export async function load({ fetch }) {
  try {
    const API_URL = import.meta.env.VITE_API_URL || '';
    
    const response1 = await fetch(`${API_URL}/offer_types?active=true`);
    if (!response1.ok) {
      message: 'error loading data'
    }

    const response2 = await fetch(`${API_URL}/discounts?active=true`);
    if (!response1.ok) {
      message: 'error loading data'
    }

    const response3 = await fetch(`${API_URL}/dishes?active=true&type=dining&hasVariant=false`);
    if (!response3.ok) {
      message: 'error loading data'
    }

    const response4 = await fetch(`${API_URL}/bundles`);
    if (!response4.ok) {
      message: 'error loading data'
    }

    const response5 = await fetch(`${API_URL}/offers`);
    if (!response5.ok) {
      message: 'error loading data'
    }


    const offerTypes = await response1.json();
    const discounts =  await response2.json();
    const dishes = await response3.json();
    const bundleList = await response4.json();
    const offers = await response5.json();

    return { 
      offerTypes,
      discounts,
      dishes,
      bundleList,
      offers

    }
     } catch (e) {
       message: e
    }
}
export const prerender = false