// /routes/app_settings/+page.js-->
import { browser } from '$app/environment';

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

    const response1 = await fetch(`${API_URL}/settings`, {
      method: 'GET',
      headers: headers
      
    });
    if (!response1.ok) {
      message: 'error loading data'
    }
    const  appSettings = await response1.json();
    console.log('appSettings', appSettings)



    return { 
      appSettings,
    }

}
export const prerender = false