<button class="btn" onclick="{()=>{ (showModal = true),setTimeout(openCurrentFile(),2000)}}">change</button>

<ModalRecord bind:showModalRecord class=" backdrop-blur-sm backdrop-brightness-150 z-1000">
	<div class="card">
		<form onsubmit="{()=>{createFolder()}}">
		<div class="card-body">
			<p>Create new folder in <span class="text-warning font-bold">
			{currentFolderLevel ==1 ? SHRED_FOLDER : SHRED_FOLDER+'/'+selectedFolder}</span></p>
			<input type="input" class="input" bind:value="{newFolderName}" placeholder="Enter folder name" /> 
		</div>
		<div class="card-actions">
			<button class="btn btn-info btn-sm m-1 rounded" onclick="{()=>{createFolder()}}">
				OK
			</button>
		</div>
	</form>
	</div>
	{#if showModalConfirm && !showModal}
	 <Toast/>
	{/if}
</ModalRecord>

<ModalRecord bind:showModalConfirm class=" backdrop-blur-sm backdrop-brightness-150 z-1500">
	<div class="card">
		<div class="card-body">
			<div role="alert" class="alert alert-error">
				<p>folder {selectedSubFolder? selectedSubFolder: selectedFolder} will be deleted permenantlt!</p>
			</div>
			<p>Delete folder: <span class="text-warning font-bold">{selectedSubFolder? selectedSubFolder: selectedFolder} ?</span></p>
		</div>
		<div class="card-actions">
			<button class="btn btn-info btn-sm m-1 rounded" onclick="{()=>{ deleteFolder()}}">
				OK
			</button>
		</div>
	</div>

	{#if showModal}
	<Toast/>
	{/if}
	
</ModalRecord>

<ModalRecord bind:showModalUpload 
	class="rounded backdrop-blur-sm backdrop-brightness-150 z-1500 grid grid-col justify-center items-center  overflow-auto">
	<div class="card  ">

		<div class="card-body h-140 ">
			<FileUploader 
				on:filesChanged={handleFilesChanged}
				on:upload={handleUpload}
			/>

		</div>
		<div class="card-actions">
<!-- 			<button class="btn btn-info btn-sm m-1 rounded" >
				OK
			</button> -->
		</div>
	</div>

	{#if showModal}
	<Toast/>
	{/if}
	
</ModalRecord>



<Modal bind:showModal class=" backdrop-blur-sm backdrop-brightness-150">
  <div class="modal-box  max-w-5xl ">

    <h3 class="text-md font-bold">Click on a folder to see contents</h3>
    
		<div class="join flex-wrap ">
    	<!-- ADD folder  BUTTON -->
    	<button class="btn btn-info btn-soft rounded btn-sm mr-2" onclick="{()=>{currentFolderLevel = 1, showModalRecord=true}}">
    		<Icon name="create_new_folder" size={24}/>
    	</button>
    	<!-- First level DIR -->
			{#each modalHeader as item}
		 		<input class=" btn btn-sm  "  bind:group={selectedFolder}  value={item} type="radio" name="optionsHeader" aria-label="{item}" 
		 		onclick={()=>{modalSubFolders=null,selectedSubFolder=null,getFileList(item,1)}} />
			{/each}
		</div>

		 <div class="divider m-0"></div>

		 <!-- ADD sub folder  BUTTON -->
		<div class="join flex-wrap my-3 ">
			{#if selectedFolder}
			<button class="btn btn-info btn-soft rounded btn-sm " onclick="{()=>{currentFolderLevel = 2,showModalRecord=true}}">
    		<Icon name="create_new_folder" size={24}/>
    	</button>
    	{/if}

    	<!-- Sub folders -->
			{#each modalSubFolders as item}
		 		<input class=" btn btn-sm" type="radio" bind:group={selectedSubFolder}  value={item} name="optionsSubFolders" aria-label="{item}"
		 		 onclick={()=>{selectedSubFolder = item, getFileList(item,2)}} />
			{/each}
		</div>

		<div class="flex mb-0 pb-0">
			{#if selectedFolder}
				<!-- delete FOLDER / SUB FOLDER BUTTON -->
				<button class="btn btn-error btn-outline rounded btn-sm " onclick={()=>{showModalConfirm=true}}>
				<Icon name="cancel" size={16}/>Delete {selectedSubFolder? selectedSubFolder: selectedFolder} folder
				</button>
				<!-- add files to UPLOAD BUTTON  -->
				<button class="btn btn-info rounded btn-sm ml-8" onclick={()=>{showModalUpload=true}}>
					Add Files
					<!-- <Icon name="attach_file_add"/>{selectedSubFolder? selectedFolder +' > '+ selectedSubFolder: selectedFolder} -->
			</button>
			{/if}
		</div>	


			<div class="card-body m-0 p-0">
			<div class="card shadow-sm h-150 max-h-3/4 overflow-auto">
			<div class="card-actions">
		
		  </div>

				<div class="lg:flex lg:flex-wrap grid">

				{#each modalFiles as file}

					{#if getFileType(file) === 'image'}
						<div class="relative h-[200px] m-1">
							<img src={file} alt="{selectedSubFolder ? file.split('/')[4]: file.split('/')[3]}" class="relative top-0 left-0"
			        
			        	/>
			        	<div  dir="" class="w-full absolute start-0 top-0 bg-base-100 opacity-80 text-primary">

			        	<button class="btn btn-primary btn-sm btn-soft rounded" onclick="{()=>{selectedImage(file),showModal = false}}">
			        			<Icon name="add" class=" bg-error bottom-0"/>
			        	</button>
			        	<span>{selectedSubFolder ? file.split('/')[4]: file.split('/')[3]}</span>
			        </div>


			        	<div  dir="rtl" class="w-full absolute start-0 bottom-0 bg-base-100 opacity-50 text-primary">

			        	<button class="btn btn-error btn-soft btn-xs rounded" onclick="{()=>{deleteFile(file)}}">
			        			<Icon name="delete" class="bg-primary bottom-0"/>
			        	</button>
			        	
			        </div>
			      </div>

			    {:else if getFileType(file) === 'video'}
			    	<div  class="relative h-[200px] m-1 relative bg-base-300">
			        <video autoplay muted >
			            <source src={file} type="video/{file.split('.').pop()}" />
			        </video>

			        <div  dir="" class="w-full absolute start-0 top-0 bg-base-100 opacity-80 text-primary">
			        	<button class="btn btn-primary btn-soft btn-xs rounded" onclick="{()=>{selectedImage(file), showModal = false}}">
			        		<Icon name="add" class=" bg-error bottom-0"/>
			        	</button>
			        	<span>{selectedSubFolder ? file.split('/')[4]: file.split('/')[3]}</span>
			        </div>

			        <div  dir="rtl" class="w-full absolute start-0 bottom-0 bg-base-100 opacity-50 text-primary">

			        	<button class="btn btn-error btn-soft btn-xs rounded" onclick="{()=>{deleteFile(file)}}">
			        			<Icon name="delete" class="bg-primary bottom-0"/>
			        	</button>
			        	
			        </div>

			      </div>

			    {:else}
			        <a href={file} download>Download File</a>
			    {/if}
<!-- 					{#if selectedSubFolder}

						<img src="/shared/{selectedFolder}/{selectedSubFolder}/{item}" 
						 onclick="{()=>{selectedImage(`/shared/${selectedFolder}/${selectedSubFolder}/${item}`) }}">
					{:else}
						<img src="/shared/{selectedFolder}/{item}" 
						 onclick="{()=>{selectedImage(`/shared/${selectedFolder}/${item}`) }}">
					{/if} -->
				{/each}
			</div>
			
			</div>
		</div>

    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button, it will close the modal -->
        <button class="btn" onclick={()=>{clear()}}>Close</button>
      </form>
    </div>

</div>
{#if !showModalConfirm && !showModal}
<Toast/>
{/if}
</Modal>


<script>

import { onMount } from 'svelte';
import useFetch from '$lib/services/useFetch'
import { fade, fly,slide } from 'svelte/transition';
import Modal from '$lib/components/Modal.svelte';
import ModalRecord from '$lib/components/ModalEditRecord.svelte';

import { toast } from '$lib/stores/toast';
import Toast from '$lib/components/Toast.svelte';
import Icon from '$lib/components/Icon.svelte';
import { getFileType } from '$lib/utils/fileType';


import {dropzone} from "@sveu/actions"

import FileUploader from "$lib/utils/fileUploader/FileUploader.svelte"
//import fileManagerState from '$lib/stores/fileManagerState.svelte.js'
import fileManagerState from '$lib/stores/fileManagerState.svelte.js'



let ModalConfirm = ModalRecord
let {selectedImage}=$props();

let data = null;
let error = null;
let modalError = null;
let userData = null;


let closeModal = false;
let modalContents= $state(null);
let modalFolders= $state(null);
let modalSubFolders= $state(null);
let modalFiles= $state(null);
let modalHeader= $state(null);

let isOpen = false;
let response = null;
let refreshUser = null;
let modalOperation =null;

let showModal = $state(false);
let selectedFolder = $state(null);
let selectedSubFolder = $state(null);

let showModalRecord= $state(false);
let newFolderName = $state(null);

let showModalConfirm= $state(false)
let showModalUpload= $state(false)
let targetPath = $state()
let currentFolderLevel = $state()

const API_URL = import.meta.env.VITE_API_URL;
const SHRED_FOLDER = import.meta.env.VITE_SHARED
const targetBaseFolder = "/srv/projects/grande_royal/app/shared"
let requestedFolder = '';
let currentFiles = [];
let folderToDelete=$state();

const requestdata = {'targetFolder':targetBaseFolder};


onMount(() => {


//console.log('on mount')

})




function openCurrentFile(){

	if(!fileManagerState.store.tmpImagePath){
			getFileList()
	}else{
	//	console.log('openCurrentFile', fileManagerState.store.tmpImagePath)
		const arrPath = fileManagerState.store.tmpImagePath.split('/')
		// console.log(arrPath[arrPath.length-2], arrPath.length)

		targetPath = "/"+arrPath[1]+'/' + arrPath[2]+'/' + arrPath[3]
		currentFolderLevel = arrPath.length-1
		selectedFolder = arrPath[2]
		//selectedSubFolder = arrPath[3]
	//	console.log(arrPath[arrPath.length-2],arrPath.length-2)
		getFileList(arrPath[arrPath.length-2],arrPath.length-3)
	}
	//console.log(arrPath.shift())

//	///shared/events/weddings/06-6879b33657928.jpg
}

function formTargetPath(folderName,level){
	if(!folderName && !level){
		targetPath=null
	}
	else{
		if(folderName){
			if(level ==1){
				selectedFolder = folderName
			}if(level == 2){
				selectedSubFolder = folderName 
			}
		}
		const relativePath = selectedSubFolder?selectedFolder + '/' + selectedSubFolder:selectedFolder
		targetPath = relativePath? relativePath:null
	}
	
}

async function getFileList(dir,level){
	// console.log('getFileList')
	// console.log('dir', dir ,' level', level, 'currentLevel', currentFolderLevel)
	
	await formTargetPath(dir,level)
	
	//console.log('targetPath' , targetPath)
	modalFiles=null;

	const requestedDir = {'targetFolder':targetPath};


	if(dir === undefined){
		//requestedDir = {'targetFolder':null};
	}
		// const tmpSelectedFolder = ...selectedFolder
		// const tmpSelectedSubfolder = ...selectedSubFolder
    try {
      const data  = await useFetch('/getFilelist','POST',requestedDir,true);
      modalHeader = [...data.message.level1.folders] 
      if(!requestedDir ){
      	data.message.level1.files.forEach(prefix)
      }else{

      	modalSubFolders =[...data.message.level2.folders] 

      	data.message.level2.files.forEach(prefix)
      }
    } catch (err) {
        error = err.message;
    }
}


function prefix(item,index, arr){
	//console.log('selectedFolder', selectedFolder ,'selectedSubFolder', selectedSubFolder , 'item', item)
	let src='';
	if(selectedSubFolder){
		 src= "/shared/"+selectedFolder+"/"+selectedSubFolder+"/"+item

	}else{
		src= "/shared/"+	selectedFolder+"/"+item
	}
	 arr[index] = src;
	 modalFiles= arr
}

function clear(){
	modalFolders= null;
	modalSubFolders= null;
	modalFiles= null;
	modalHeader=  null; 
}

async function createFolder(parent){

	let creatIn='';

	try {
		if(selectedFolder){
			parent = selectedFolder
		}
		let path =''
		if(currentFolderLevel == 1){
			path = ""
		}
		if(currentFolderLevel == 2){
			path = selectedFolder
		}
		const requestedPath = {'requestedPath':path,"newFolderName":newFolderName};
		////console.log(requestedPath)

    const data  = await useFetch('/createFolder','POST',requestedPath,true);
    showModalRecord= false
    if(data.message.status ==0){
    	toast.success("Created successfully",5000);
    	getFileList()

    	if(currentFolderLevel == 1){
			  getFileList(selectedFolder,1)
			}
			if(currentFolderLevel == 2){
				getFileList(selectedSubFolder,2)
			}


    }
  }
  catch (err) {
        error = err.message;
        toast.error("Failed to create folder",5000);
  }
}

async function deleteFile	(filename){
	let basePath = selectedSubFolder? selectedFolder + '/' + selectedSubFolder: selectedFolder
	let requestedPath = {'requestedPath':filename};
	const data  = await useFetch('/deleteFile','POST',requestedPath,true);
	getFileList(selectedFolder)
}

async function deleteFolder(){
	folderToDelete =  selectedSubFolder ? selectedFolder + '/' +  selectedSubFolder : selectedFolder

	try {
		 
		let requestedFolder = {'requestedFolder':folderToDelete};
    const data  = await useFetch('/deleteFolder','POST',requestedFolder,true);
    showModalConfirm= false
    if(data.message.status ==0){

    	toast.success("Deleted successfully",5000);

    	getFileList(requestedFolder)
    	selectedFolder=null
    	// if(currentFolderLevel == 1){
			//   getFileList(selectedFolder,1)
			// }
			// if(currentFolderLevel == 2){
			// 	getFileList(selectedSubFolder,2)
			// }


    }
  }
  catch (err) {
        error = err.message;
        toast.error("Failed to delete folder",5000);
  }
}

function handleFilesChanged(event) {
	////console.log(event)
	currentFiles = Array.from(event.detail);
}
	
async function handleUpload(files_data) {


 const formData = new FormData();
    const requestedFolder = selectedSubFolder 
      ? `${selectedFolder}/${selectedSubFolder}` 
      : selectedFolder;

    // Append folder path first if needed
    if (requestedFolder) {
      formData.append('folder', requestedFolder);
    }

    // Append each file individually with proper keys
    currentFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file); // Symfony will parse this as array
    });

    // Debug: Log FormData contents
    for (let [key, value] of formData.entries()) {
      ////console.log(key, value);
    }

    const res = await useFetch('/uploadFiles', 'POST', formData, true, true);

    getFileList(requestedFolder)
  
    showModalUpload= false
}
	
</script>


<style>
img, video {
 
  border-radius: 4px;  /* Rounded border */

  width: 200px; /* Set a small width */
  height: 200px;
}

/* layer: default */
:global(.relative) {
  position: relative;
}
:global(.mt-6) {
  margin-top: 1.5rem;
}
:global(.h-auto) {
  height: auto;
}
:global(.min-h-200px) {
  min-height: 200px;
}
:global(.w-full) {
  width: 100%;
}
:global(.flex) {
  display: flex;
}
:global(.flex-col) {
  flex-direction: column;
}
:global(.flex-wrap) {
  flex-wrap: wrap;
}
:global(.items-center) {
  align-items: center;
}
:global(.justify-center) {
  justify-content: center;
}
:global(.bg-gray-400\/10) {
  background-color: rgba(156, 163, 175, 0.1);
}


.folder {
    width:70px;
    height: 40px;
    margin: 3px;
    margin-top: 3px;
    position: relative;
    background-color: oklch(70.5% 0.015 286.067);
    border-radius: 4px 4px 4px 4px;
    
}

.folder:before {
    content: '';
    width: 40%;
    height: 7px;
    border-radius: 10px 20px 4px 4px;
    background-color: oklch(70.8% 0 0);
    position: absolute;
    top: -5px;
    left: 0px;
}

</style>