// /routes/layout/+page.js-->
export async function load({ fetch }) {
  try {
    const API_URL = import.meta.env.VITE_API_URL || '';
    
    const response1 = await fetch(`${API_URL}/categories`);
    if (!response1.ok) {
      message: 'error loading data'
    }

    const response2 = await fetch(`${API_URL}/dishes`);
    if (!response1.ok) {
      message: 'error loading data'
    }


    const categories = await response1.json();
    const menu =  await response2.json();

    return { 
      categories,
      menu

    }
     } catch (e) {
       message: e
    }
}
export const prerender = false