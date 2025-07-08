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