<div in:fade  class="grid grid-col justify-center items-center">
{#if userState.user.isAuthenticated}
		
{/if}
</div>



<script>
 import { onMount } from 'svelte';
 import { fade, scale,fly } from 'svelte/transition';
// import useFetch from '$lib/services/useFetch'
// import { toast } from '$lib/stores/toast';
// import Toast from '$lib/components/Toast.svelte';
// import Filemanager from '$lib/components/Filemanager.svelte';
// import Modal from '$lib/components/Modal.svelte';
// import ModalPreview from '$lib/components/ModalEditRecord.svelte';
// import Icon from '$lib/components/Icon.svelte'
// import fileManagerState from '$lib/stores/fileManagerState.svelte.js'
// import dayjs from 'dayjs';
import { goto } from '$app/navigation';
import userState from '$lib/stores/user.svelte.js';
// import getDishMenu from '$lib/services/getDishMenu.js';

onMount(() => {
	goto('/dashboard',{ replaceState: true });
})


</script>




