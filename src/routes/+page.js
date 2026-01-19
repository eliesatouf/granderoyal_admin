// /routes/order/+page.js-->
import { browser } from '$app/environment';
//import preLoad from '$lib/stores/preLoad.svelte.js'
export async function load({ fetch }) {
  let token = '';
  let preLoad={};
    const API_URL = import.meta.env.VITE_API_URL || '';
    if (browser) {
        token = localStorage.getItem('token') || '';
    }

    const headers = {};
    headers['Content-Type'] = 'application/json';
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response1 = await fetch(`${API_URL}/order_statuses?active=true`, {
      method: 'GET',
      headers: headers
      
    });
    if (!response1.ok) {
      message: 'error loading data'
    }
    const  statusList = await response1.json();

    const response2 = await fetch(`${API_URL}/order_channels`, {
      method: 'GET',
      headers: headers
      
    });
    if (!response2.ok) {
      message: 'error loading data'
    }
    const  orderChannels = await response2.json();

    const response3 = await fetch(`${API_URL}/customers`, {
      method: 'GET',
      headers: headers
      
    });
    if (!response3.ok) {
      message: 'error loading data'
    }
    const  customerList = await response3.json();

    const response4 = await fetch(`${API_URL}/orders`, {
      method: 'GET',
      headers: headers
      
    });
    if (!response4.ok) {
      message: 'error loading data'
    }
    const  orderList = await response4.json();

    const response5 = await fetch(`${API_URL}/dishes?type=dining&active=true`, {
      method: 'GET',
      headers: headers
      
    });
    if (!response5.ok) {
      message: 'error loading data'
    }
    const  dishList = await response5.json();

    const response7 = await fetch(`${API_URL}/offers?type=dining&active=true`, {
      method: 'GET',
      headers: headers
      
    });
    if (!response1.ok) {
      message: 'error loading data'
    }
    const  offerList = await response7.json();

    const response8 = await fetch(`${API_URL}/loyverse_payment_types`, {
      method: 'GET',
      headers: headers
      
    });
    if (!response1.ok) {
      message: 'error loading data'
    }
    const  paymentTypes = await response8.json();

    
    

    if (browser) {
    preLoad.statusList =statusList
    preLoad.orderChannels =orderChannels
    preLoad.customerList =customerList
    preLoad.dishList =dishList
    preLoad.offerList =offerList
    preLoad.paymentTypes =paymentTypes
    preLoad.orderList = orderList
    //console.log('preLoad', preLoad)
    localStorage.setItem('preLoad', JSON.stringify(preLoad))
   }

    return { 
      statusList,
      orderChannels,
      customerList,
      orderList,
      dishList,
      offerList,
      paymentTypes
    }

}
export const prerender = false