<div class="container mx-auto flex justify-center align-center items-center h-150">
<div class="card">
   
    <div class="card-body">
    
    <div class="card-title">You have logged out of GRANDE ROYALE successfully </div>
  
  </div>
</div>
</div>

<script>
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import userState from '$lib/stores/user.svelte.js';

	load()
	export function load() {
		localStorage.removeItem('token')
		userState.user = {}	
		goto('/',{ replaceState: true });
	}
</script>