// /routes/order/+page.js-->
import { browser } from '$app/environment';
export async function load() {

  let strpreLoad = localStorage.getItem('preLoad')

  let preLoad = JSON.parse(strpreLoad)
    return { 
      preLoad
    }

}
export const prerender = false