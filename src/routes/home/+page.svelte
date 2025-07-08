<script>
	import userState from '$lib/stores/user.svelte.js';
</script>

{#if userState.user.isAuthenticated}
<h1>HOME</h1>
{/if}