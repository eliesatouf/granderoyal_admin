<script>
import Navbar from '$lib/components/Navbar.svelte'	

import { fade, scale,fly } from 'svelte/transition';
import { toast } from '$lib/stores/toast.js';
import { jwtDecode } from 'jwt-decode';
import userState from '$lib/stores/user.svelte.js';

import Toast from '$lib/components/Toast.svelte';
import { goto } from '$app/navigation';
import { beforeNavigate , afterNavigate} from '$app/navigation';
	//import { SvelteToast, toast } from '@zerodevx/svelte-toast'
import { onMount } from 'svelte';
import { api } from '$lib/api/api.js';
const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL)
let email = '';
let password = '';
let error = '';
let isLoading = false;

const closeAlert= ()=>{
 	error = false
}
  onMount(() => {
  	if(userState.user.isAuthenticated === true){
  		goto('/home',{ replaceState: true });
  	}else{
  		tokenLogin()
  	}
  	
  })

async function tokenLogin(){

	let token =localStorage.getItem('token')

	if(localStorage.getItem('token')){

		const headers = {};
  	headers['Content-Type'] = 'application/json';
  	if (token) headers['Authorization'] = `Bearer ${token}`;

  	const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      headers: headers
      
    });

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.message || 'Login failed!!');
    }else{
    	goto('/home',{ replaceState: true });
    }
  }else{
  	//handleLogin()
  }
}

async function handleLogin(event) {
  event.preventDefault(); // Prevent default form submission
  isLoading = true;
  error = '';

  

  try {
    const response = await fetch(`${API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(response)

	  if (!response.ok) {
  	  const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }
      const data = await response.json();
      const decoded = jwtDecode(data.token);
      localStorage.setItem('token',data.token)
      userState.user.name = decoded.username
      userState.user.isAuthenticated= true
      userState.user.roles=[...decoded.roles]
      goto('/home',{ replaceState: true });
     // goto('/mainlayout/home',{ replaceState: true });

  } catch (err) {
    error = err.message;
   	  //toast.error(err.message,5000);
  } finally {
    isLoading = false;
  }
}


  export const load = async ({ fetch }) => {
    const response = await fetch(`${API_URL}/assets`);
    if (!response.ok) throw error(response.status, 'Failed to load');
    return { data: await response.json() }; // Auto-serialized to page
  };


</script>




<div in:fade out:fade class="grid grid-col justify-center items-center h-screen">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend text-lg">Login</legend>
    
    {#if error}
      <div in:fly out:fade class="flex flex-wrap gap-1 alert alert-soft alert-error error-content m-2 p-0">
        <div class="grid grid-flow-col justify-items-center w-full">
        <div class="p-1 m-1">
    			
    				<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        		</svg>

  			</div>
        <span class="pt-1.5 mt-1">{error}</span>
        <button type="button" class="btn btn-sm btn-error btn-soft mt-1" onclick={()=>closeAlert()} >close
    		</button>
    	</div>
    			<div class="toast-progress m-0 p-0" 
           style={`animation-duration: 6s`}
           onanimationend={()=>closeAlert()}></div>
      </div>
    {/if}


    <form id="loginForm" class="m-1 p-1" onsubmit={handleLogin}>
      <label for="email" class="label mb-2">Email</label>
      <input 
        type="email" 
        class="input w-full" 
        placeholder="Email" 
        bind:value={email}
        required
      />

      <label for="password" class="label mt-5 mb-2">Password</label>
      <input 
        type="password" 
        class="input w-full p-2" 
        placeholder="Password" 
        bind:value={password}
        required
      />

      <button 
        class="btn btn-neutral mt-4 w-full" 
        type="submit"
        disabled={isLoading}
      >
        {#if isLoading}
          <span class="loading loading-spinner"></span>
          Logging in...
        {:else}
          Login
        {/if}
      </button>
    </form>
  </fieldset>

</div>

<style>
  :global(.log.info) {
    --toastBackground: #00bafe;
    --toastColor: #172554;
  }
  :global(.log.error) {
    --toastBackground: #ff627d;
    --toastColor: black;
  }
  :global(.log.success) {
    --toastBackground: #00d390;
    --toastColor: #052e16;
  }

  .toast-progress {
    height: 3px;
    width: 100%;
    background: rgba(255, 255, 255, 0.3);
    animation: progress linear forwards;
  }

  @keyframes progress {
    from { width: 100%; }
    to { width: 0%; }
  }
</style>

