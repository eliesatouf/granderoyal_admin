<div in:fade  class="grid grid-col justify-center items-center">

<div class="" in:fade >
	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box  border p-3 m-2 ">
	  <legend class="fieldset-legend">Catering Main Menu</legend>
	  <button class="btn btn-primary btn-soft btn-sm w-[100px]"	onclick="{()=>{createMenu(), showModal=true}}">	<Icon name="add" />new</button>
		 <div class="overflow-x-auto lg:hidden">

		  <table class="table table-xs  ">
		    <thead>
		      <tr>
		      	<th>Action</th>
		        <th>ID</th>
		        <th>Name</th>
		      </tr>
		    </thead>
		    <tbody>
		      {#each menu as item, i}
		      	<tr><td><button class="btn btn-primary btn-soft btn-sm"	onclick="{()=>{getOneMenu(item.id), showModal=true}}">edit	</button>
		      	{#if item.hasChild}
		      	<button class="btn btn-primary btn-soft btn-sm"	
		      		onclick="{()=>{goToSubMenu(item.name)}}">sub</button>
		      		{/if}</td>
		      	<td>{i+1}
		      	</td>
		      	<td>{item.name} {item.active} <span class="{item.active? 'status status-success':'status'}"></span>
		      	</td>

		      </tr>
		      {/each}
		    </tbody>
		  </table>
		</div>

		<div class="overflow-x-auto hidden lg:block" in:fade >
		  <table class="table table-xs" in:fade >
		    <thead >
		      <tr in:scale >
		      	<th>Action</th>
		        <th>ID</th>
		        <th>Name</th>
		        <th>Description</th>
		        <th>TAB Name</th>
		        <th>Category</th>
		        <th>Link</th>
		        <th>Has Child</th>
		        <th>Image</th>
		        <th>Price</th>
		        <th>Tag</th>
		        <th>Background Color</th>
		        <th>Text color</th>
						<th>Active</th>
						<th>Updated On</th>
		      </tr>
		    </thead>
		    <tbody>

		      {#each menu as item, i}
		      	<tr in:fade >
		      	<td><button class="btn btn-primary btn-soft btn-sm"	
		      		onclick="{()=>{getOneMenu(item.id,i), showModal=true}}">edit	</button>
		      	{#if item.hasChild}
		      	<button class="btn btn-primary btn-soft btn-sm"	
		      		onclick="{()=>{goToSubMenu(item.name)}}">sub</button>
		      		{/if}
		      		</td>
		      	<td>{i+1}</td>
		      	<td>{item.name}</td>
		      	<td>{item.description}</td>
		      	<td>{item.tabName}</td>
		      	<td>{item.category}</td>
		      	<td>{item.link}</td>
		      	<td><span class="{item.hasChild? 'status status-warning':'status'}"></span></td>
		      	<td>{item.imageSource}</td>
		      	<td>{item.price}</td>
		      	<td>{item.tag}</td>
		      	<td>{item.bgColor}</td>
		      	<td>{item.textColor}</td>	
		      	<td> <span class="{item.active? 'status status-success':'status'}"></span></td>
		      	<td readonly>{item.updatedOn}</td>
		      	</tr>
					{/each}
					</tbody>
		  </table>  
		</div>
<!-- 
		<div class="grid mt-10" in:fade >
			{#each menu as item}
				{#if !item.hasChild}
				<button class=" btn btn-primary btn-outline m-1 w-3xs">add dish in {item.name}</button>
				{/if}
			{/each}
		</div> -->


	</fieldset>
</div>


</div>

<Modal bind:showModal>
<div class="m-2 p-2 rounded md:rounded-lg bg-base-100 max-h-[500px] lg:max-h-[800px] overflow-auto">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-1  max-w-[250px]">
    <legend class="fieldset-legend">{modalOperation}: {modalHeader}</legend>
    <div class="grid m-2 p-2">
     

      <legend class="fieldset-legend">{record.name}</legend>

      <label class="label">Name</label>
      <input type="text" class="input" placeholder="name of menu" 
       bind:value="{record.name}"/>

      <label class="label">Description</label>
      <input type="text" class="input" placeholder="description of menu" 
       bind:value="{record.description}"/>

      <label class="label">Tab Name</label>
      <input type="text" class="input" placeholder="description of menu" 
       bind:value="{record.tabName}"/>

      <label class="label">Category</label>
      <input type="text" class="input" placeholder="menu category" 
       bind:value="{record.category}"/>

      <label class="label">Link</label>
      <input type="text" class="input" placeholder="menu link href" 
       bind:value="{record.link}"/>

      <div class="row p-2">
       <input type="checkbox" bind:checked="{record.hasChild}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       Has A Child
     </div>

      <label class="label">Tag</label>
      <input type="text" class="input" placeholder="tag" 
       bind:value="{record.tag}"/>

      <label class="label">Image Source</label>
      <div class="join mt-0" onmouseenter={()=>{defineSelectedImage(record.imageSource)}}>
      	{#if record.imageSource}
        <div class="tooltip">
          <div class="tooltip-content m-0 p-0">
            <img src="{record.imageSource}" class="h-[250px] w-[250px]">
          </div>
          <input type="text " class="" placeholder="menu image" 
            bind:value="{record.imageSource}"  />
          </div>
          {/if}
        <Filemanager  selectedImage={handleSelectMenu} />
      </div>

         <label class="input ">
            <span class="">Price</span>
            <input type="number" class=" " placeholder="0 PHP" 
             bind:value="{record.price}"/>
          </label>


      <label class="label">Bckgroung Color</label>
      <input type="text" class="input" placeholder="menu bg color" 
       bind:value="{record.bgColor}"/>

      <label class="label">Text Color</label>
      <input type="text" class="input" placeholder="menu text color" 
       bind:value="{record.textColor}"/>


     <div class="row p-2">
       <input type="checkbox" bind:checked="{record.active}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       Active
     </div>
    </div>    
  <div class="flex justify-between">
   <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveOneMainMenu())}>
    Save
  </button>

  

  <button class="btn btn-soft btn-default w-1/4" onclick={()=>showModal = false}>
    Close
  </button>

  <button class="btn btn-soft btn-error w-1/4" onclick={()=>{deleteMainMenu(record.id), showModal = false}}>
    Delete
  </button>

</div>

  </fieldset>

</div>
</Modal>


<script>
import { onMount } from 'svelte';
import { fade, scale,fly } from 'svelte/transition';
import useFetch from '$lib/services/useFetch'
import { toast } from '$lib/stores/toast';
import Toast from '$lib/components/Toast.svelte';
import Filemanager from '$lib/components/Filemanager.svelte';
import Modal from '$lib/components/Modal.svelte';
import Icon from '$lib/components/Icon.svelte'
import fileManagerState from '$lib/stores/fileManagerState.svelte.js'
import dayjs from 'dayjs';
import { goto } from '$app/navigation';
import userState from '$lib/stores/user.svelte.js';

const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL)
let menu = $state([]);
let showModal = $state(false);
let closeModal = $state(false)
let modalOperation = $state('')
let modalContents=$state([])
let record=$state([])
let newMainMenu=$state([])
let modalHeader=$state('')

onMount(() => {
  getMainMenu()
})

async function getMainMenu(){
  const response = await useFetch('/main_menu_cts', 'GET',null, true);
  menu = response
  console.log(menu)
}

async function getOneMenu(id){
	modalOperation= 'Edit'
    const menuData =  await useFetch( '/main_menu_cts/'+id,'GET',null,true);
    console.log(menuData)
    record={...menuData}
    modalHeader = record.name
    modalOperation="Edit Menu"

}

async function saveOneMainMenu(index){
	//console.log(record)
	let saveItem=''
	if(modalOperation=='Create menu'){
		try{
			saveItem =  await useFetch('/main_menu_cts', 'POST',record, true);
			if(saveItem.status && saveItem.status != 200){
				toast.error("Failed to create menu",2000);
			}else{
				toast.success("Saved successfully",2000);	
	  		getMainMenu()
	  		showModal= false
			}
	  	
	  }
	  catch(e){
	  	toast.error("Failed to create menu",2000);	
	  }
	}
	else{
		try{
			console.log('edit')
			console.log(record)
  		let saveItem =  await useFetch('/main_menu_cts/' + record.id, 'PATCH',record, true);
  		//console.log(saveItem)
	  	toast.success("Saved successfully",2000);	
	  	getMainMenu()
	  	//showModal= false
	  }
		catch(e) {
	  	toast.error("Failed to save menu",2000);	
	  	console.log(e);
	  }
	}
  
}

async function handleSelectMenu(item){
	const index = menu.findIndex(item=>item.id == record.id)
  record.imageSource = item

}

async function deleteMainMenu(id){
  try{
  	let saveItem =  await useFetch('/main_menu_cts/' + id, 'DELETE',null, true);
  	toast.success("Deleted successfully",2000);	
  	getMainMenu()
  }
	catch(e) {
  	toast.error("Failed to delete menu",2000);	
  	console.log(e);
  }
}


function defineSelectedImage(item){
  fileManagerState.store.tmpImagePath =item
}

async function createMenu(){
	//record.name =''
	modalOperation='Create menu'
	let allschema =  await useFetch('/docs.jsonld#/main_menu_cts', 'GET',null, false);

	const schema = allschema.supportedClass.find(schema=>schema.title==="MainMenuEc").supportedProperty

	const properties = schema.map(item => [item.title,item.property.range.split(':')[1]]);


	let newObject = {};
	let type = null;
      properties.forEach(item => {
      	if(item[1] == "string"){
      		type=""
      	}
      	else if(item[1] == "integer"){
      		type=0
      	}
      	else if (item[1] == "boolean"){
      		type= false
      	}else{
      		type= null
      	}
        newObject[item[0]] = type ;
      });
    record = {...newObject}
	
}

async function goToSubMenu(subMenu){

	userState.selectedSubMenu=subMenu
	goto('/menu/subMenu', { replaceState: true });
}

</script>

<style>
input{
	max-width:220px;
}

label{
	max-width:220px;
}


select{
	max-width:220px;
}

legend{
	max-width:220px;
}
</style>