<script>
	import useFetch from '$lib/services/useFetch'
	import { fade } from 'svelte/transition';
	import { Toaster, toast } from 'svelte-sonner';
	let {data} = $props();
	let settings = $state()
	let error = $state(false)
	let isLoading = $state(false);
	settings = data.appSettings

	async function save() {
		isLoading = true;
		
		try {
			for (const val of settings) {
				await useFetch(`/settings/${val.id}`, 'PATCH', { value: val.value }, true);
			}
			toast.success("Settings Saved");
		} catch {
			toast.error("Failed To Save");
		}
		
		isLoading = false;
	}
</script>




<div in:fade out:fade class="grid grid-col justify-center items-center mt-1 h-full">

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 h-150 overflow-auto">
  <legend class="fieldset-legend ">App Settings</legend>
  {#each settings as pair}
	  <label class="label font-semibold">{pair.settingKey}</label>
	  {#if pair.settingKey.toLowerCase().includes('date')}
	  <input type="date" class="input mb-2" placeholder="" bind:value = {pair.value}/>
	  {:else}
	  <input type="text" class="input mb-2" placeholder="" bind:value = {pair.value}/>
	  {/if}
  {/each}
</fieldset>

<div class="flex justify-start gap-4 m-4">
	<button class="btn btn-accent btn-soft">
		CANCEL
	</button>
	<button class="btn btn-success btn-soft {isLoading ? 'btn-disabled':''}" onclick="{save}">
		 {#if isLoading} <span class="loading loading-spinner"></span> {/if}
		SAVE
	</button>
</div>

<Toaster richColors position="top-center"  />
</div>