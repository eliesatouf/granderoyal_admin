<script lang="ts">
import '../app.css';
import Navbar  from '$lib/components/Navbar.svelte';

import Toast from '$lib/components/Toast.svelte';
import { beforeNavigate , afterNavigate} from '$app/navigation';
import userState from '$lib/stores/user.svelte.js';
import { redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
import { jwtDecode } from 'jwt-decode';
//import { SvelteToast, toast } from '@zerodevx/svelte-toast'
let { children } = $props();
	
onMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
    	userState.user.isAuthenticated = true
      const decoded = jwtDecode(token);
      userState.user.name = decoded.username
      //goto('/home',{ replaceState: true });

    }
    else{//console.log('not found')
    	//goto('/',{ replaceState: true });
    }
  });

afterNavigate(({ to, from }) => {
    if(!userState.user.isAuthenticated && (from ===null  && to.route.id != '/') ){
       goto('/logout', { replaceState: true });
     // return { path: '/mainlayout/logout', replaceState: true };
    }
});




</script>

{#if userState.user.isAuthenticated}
<Navbar/>
{/if}
{@render children()}

<!-- <SvelteToast options={{ classes: ['log'] }} /> -->




