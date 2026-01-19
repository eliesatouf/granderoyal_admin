// /routes/order/+page.js-->
import { browser } from '$app/environment';
export async function load({  }) {
 
  let strpreLoad = localStorage.getItem('preLoad')

  let preLoad = JSON.parse(strpreLoad)
  console.log('preLoad', preLoad)
    return { 
      preLoad
    }

    // return { 
    //   statusList,
    //   orderChannels,
    //   customerList,
    //   orderList,
    //   dishList,
    //   offerList,
    //   paymentTypes
    // }

}
export const prerender = false