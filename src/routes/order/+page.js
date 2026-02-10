// /routes/order/+page.js-->
import { browser } from '$app/environment';

export async function load({ depends }) {
  //depends('order:preload'); // Add dependency key
  
  let preLoad = null;
  
  if (browser) {
    const strpreLoad = localStorage.getItem('preLoad');
    preLoad = strpreLoad ? JSON.parse(strpreLoad) : null;
  }
  
  return { preLoad };
}