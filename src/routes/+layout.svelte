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
let admin = $state(false)

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
    const token = localStorage.getItem('token');
    if(token){
        const decoded = jwtDecode(token);
        admin =  decoded.roles.includes('ROLE_ADMIN')
    }
    if(!admin && (from?.route.id !='/logout'  && to.route.id != '/logout') ){
       goto('/logout', { replaceState: true })
    }
});




// beforeNavigate(({ from, to }) => {


//     const token = localStorage.getItem('token');
//     if(token){
//         const decoded = jwtDecode(token);
//         admin =  decoded.roles.includes('ROLE_ADMIN')
//         console.log('admin', admin)
//     }
//     if(!admin && (!to || to?.route.id != '/logout' )){
//     console.log('redirect to logout')
//        goto('/logout', { replaceState: true });
//      // return { path: '/mainlayout/logout', replaceState: true };
//     }
// });




</script>

{#if admin}
<Navbar/>
{/if}
{@render children()}

<!-- <SvelteToast options={{ classes: ['log'] }} /> -->




