<script>
	import {dropzone} from "@sveu/actions"
	import { createEventDispatcher } from 'svelte'
	//import fileManagerState from '$lib/stores/fileManagerState.svelte.js'
	let isLoading= false
	const dispatch = createEventDispatcher()

	let over_dropzone = false
	let files_data = []
	let fileInput
	let rawFiles = []

	function hover(data) {
		over_dropzone = data.detail
	}

	function handleFiles(files) {
	  rawFiles =[...files]

		if (files) {
			files_data = Array.from(files).map((file) => ({
				name: file.name,
				size: file.size,
				type: file.type,
				last_modified: file.lastModified,
			}))

			dispatch('filesChanged', rawFiles)
		}
	}

	function on_file_drop(data) {
		handleFiles(data.detail)
	}

	function openFileDialog() {
		fileInput.click()
	}

	function onFileInputChange(e) {

		handleFiles(e.target.files)
		e.target.value = null // Reset input to allow selecting same file again
	}

  async function uploadFiles(e){
		isLoading = true

		await dispatch('upload', files_data)
		//files_data=[]
		isLoading = false

	}

</script>

<div class="flex z-900">
	<div class="h-full w-full lg:min-w-96" >
		{#if isLoading}
			<span class="absolute top-68 left-48 loading loading-spinner text-primary w-[50px]"></span>
		{/if}

		<!-- Hidden file input -->
		<div 
			use:dropzone 
			onhover={hover} 
			onfiles={on_file_drop}
			class="flex flex-col bg-gray-400/10 mt-6 w-full h-120  "
		>

		<div class="join">
				<button 
					onclick={openFileDialog}
					class="btn btn-primary rounded btn-soft w-1/3 join-item">
					Select Files
				</button>

				<button class="btn btn-warning btn-soft rounded w-1/3 " onclick="{()=>{files_data=[]}}">
					Clear
				</button>

				<button onclick={uploadFiles}
			   class="btn btn-secondary btn-soft rounded w-1/3">
			 		Upload
			 	</button>
			</div>
			

			<div class="grid grid-col">
				{#if files_data.length == 0 }
					<div class="grid grid-col justify-center items-center h-100">
			 		<div class="">Drop files here</div>
			 	</div>
				{/if}
				<div class="m-2">
				{#each files_data as file}
					<ul class="">
						<li>{file.name}</li>
					</ul>
				{/each}
			</div>
			</div>

			<input 
				type="file" 
				bind:this={fileInput}
				onchange={onFileInputChange}
				class="hidden"
				multiple
			/>
		</div>
	</div>
</div>