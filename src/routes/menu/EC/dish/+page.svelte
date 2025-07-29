<div in:fade out:fade class="grid grid-col justify-center items-center">

<div class="" in:fade out:fade>
	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box  border p-3 m-2 ">
	  <button class="btn btn-primary btn-soft btn-sm w-[100px]"	onclick="{()=>{createMenu(), showModal=true}}">	<Icon name="add" />new</button>
		 <div class="overflow-x-auto lg:hidden">

		  <table class="table table-xs  ">
		    <thead>
		      <tr>
		      	<th>Action</th>
		        <th>ID</th>
		        <th>Type</th>
		        <th>Name</th>
		      </tr>
		    </thead>
		    <tbody>
		      {#each menu as item, i}
		      	<tr><td><button class="btn btn-primary btn-soft btn-sm"	onclick="{()=>{getDish(item.id), showModal=true}}">edit	</button></td>
		      	<td>{i+1}
		      	</td>
		      	<td>{item.name} {item.active} <span class="{item.active? 'status status-success':'status'}"></span>
		      	</td>

		      </tr>
		      {/each}
		    </tbody>
		  </table>
		</div>

		<div class="overflow-x-auto hidden lg:block" in:fade out:fade>
		  <table class="table table-xs" in:fade out:fade>
		    <thead >
		      <tr in:scale out:fade>
		      	<th>Action</th>
		        <th>ID</th>
		        <th>Type</th>
		        <th>Menu</th>
		        <th>Name</th>
		        <th>Description</th>
		        <th>Tag</th>
		        <th>Price</th>
		        <th>Image</th>
		        <th>Brightness</th>
		        <th>Opacity</th>
		        <th>contrast</th>
		        <!-- <th>In Catering</th> -->
		        <th>status</th>
		        <th>active</th>
						<th>Updated On</th>
		      </tr>
		    </thead>
		    <tbody>

		      {#each menu as item, i}
		      	<tr in:fade out:fade>
		      	<td><button class="btn btn-primary btn-soft btn-sm"	
		      		onclick="{()=>{getDish(item.id,i), showModal=true}}">edit	</button>
		      		</td>
		      	<td>{i+1}</td>
		      	<td>{item.type}</td>
		      	<td>{item.menu}</td>
		      	<td>{item.name}</td>     	
		      	<td class="truncate md:text-clip">{item.description}</td>
		      	<td>{item.tag}</td>
		      	<td>{item.price}</td>
		      	<td class="truncate md:text-clip">{item.imageSource}</td>
		      	<td>{item.brightness}</td>
		      	<td>{item.opacity}</td>
		      	<td>{item.contrast}</td>
		      	<!-- <td>{item.availableInCatering}</td> -->
		      	<td>{item.status}</td>
		      	<td><span class="{item.active? 'status status-success':'status'}"></span></td>
		      	<td readonly>{item.updatedOn}</td>
		      	</tr>
					{/each}
					</tbody>
		  </table>  
		</div>
<!-- 
		<div class="grid mt-10" in:fade out:fade>
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
<div class="m-2 p-2 rounded md:rounded-lg bg-base-100 ">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-1">
    <legend class="fieldset-legend">{modalOperation}: {modalHeader}</legend>
    <div class="grid m-2 p-2">


      <label class="label">Type</label>
      <input readonly type="text" class="input" 
       bind:value="{record.type}"/>

      <label type="label" class="label">Menu </label>
          <select class="select" bind:value={record.menu}>
          {#each dishMenu as menu}
              <option value={menu}>{menu}</option>
          {/each}
        </select>

      <label class="label">Name</label>
      <input type="text" class="input" placeholder="name of dish " 
       bind:value="{record.name}"/>

      <label class="label">Description</label>
      <input type="text" class="input" placeholder="description of dish" 
       bind:value="{record.description}"/>

      <label type="label" class="label">Tag </label>
          <select class="select" bind:value={record.tag}>
          {#each tag as tag}
              <option value={tag}>{tag}</option>
          {/each}
        </select>

      <label class="label">Price</label>
      <input type="number" class="input validator" required placeholder="price > 0 " min="1"
       bind:value="{record.price}"/>


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
        <button class="btn btn-soft" onclick={()=>{showModalPreview=true}}>preview</button>
      </div>

      <label class="label">Brightness</label>
      <input type="text" class="input" placeholder="image brightness 50 to 150" 
       bind:value="{record.brightness}"/>

      <label class="label">Opacity</label>
      <input type="text" class="input" placeholder="image opacity 0 to 100" 
       bind:value="{record.opacity}"/>

      <label class="label">Contrast</label>
      <input type="text" class="input" placeholder="image contrast 0 to 100" 
       bind:value="{record.contrast}"/>

<!--       <div class="row p-2">
       <input type="checkbox" bind:checked="{record.availableInCatering}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       In catering
     </div> -->


      <label type="label" class="label">Status</label>
      <select class="select validator" required placeholder="select a status" bind:value={record.status}>
      	{#each status as status}
          <option value={status}>{status}</option>
        {/each}
      </select>


     <div class="row p-2">
       <input type="checkbox" bind:checked="{record.active}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       Active
     </div>
    </div>   

  <div class="flex justify-between">
   <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveDish())}>
    Save
  </button>

  <button class="btn btn-soft btn-default w-1/4" onclick={()=>showModal = false}>
    Close
  </button>

  <button disabled class="btn btn-soft btn-error w-1/4" onclick={()=>{deleteMainMenu(record.id), showModal = false}}>
    Delete
  </button>

</div>

  </fieldset>

</div>
</Modal>

<ModalPreview bind:showModalPreview
	class="rounded backdrop-blur-sm backdrop-brightness-150 z-1500 grid grid-col justify-center items-center  overflow-auto">

	{#snippet header()}
	{/snippet}

	{#snippet children()}
		<div class="card w-xs lg:w-md">
			<div class="card-title"><span class="text-xs text-right">{record.name}</span></div>
			<div class="card-body">
				<img src="{record.imageSource}" 
						style="filter: brightness({record.brightness}%) contrast({record.contrast}%); opacity:{record.opacity}%;"
				/>
		  </div>
		  <div class="card-actions">
		  	<div class="flex flex-row w-full m-2">
		  	<label class="label basis-1/4">Brightness</label>
		  	<input type="range" min="30" max="200" step="10" bind:value="{record.brightness}" 
  				class="range basis-2/4 text-stone-300 [--range-bg:grey] [--range-thumb:darkgrey] [--range-fill:0]" />
  				<input class="input input-xs basis-1/6 ml-5" type="number" bind:value={record.brightness}/>
  			</div>
  			<div class="flex flex-row w-full m-2">
  			<label class="label label basis-1/4">Opacity </label>
  			<input type="range" min="20" max="100" step="5" bind:value="{record.opacity}" 
  				class="range label basis-2/4 text-stone-300 [--range-bg:grey] [--range-thumb:darkgrey] [--range-fill:0]" />
  				<input class="input input-xs basis-1/6 ml-5" type="number" bind:value={record.opacity}/>
  			</div>
  			<div class="flex flex-row w-full m-2">
  			<label class="label label basis-1/4">Contrast </label>
  			<input type="range" min="20" max="200" step="5" bind:value="{record.contrast}" 
  				class="range label basis-2/4 text-stone-300 [--range-bg:grey] [--range-thumb:darkgrey] [--range-fill:0]" />
  				<input class="input input-xs basis-1/6 ml-5" type="number" bind:value={record.contrast}/>
  			</div>
		  </div>
		</div>
		
	{/snippet}

</ModalPreview>


<script>
	
import { onMount } from 'svelte';
import { fade, scale,fly } from 'svelte/transition';
import useFetch from '$lib/services/useFetch'
import { toast } from '$lib/stores/toast';
import Toast from '$lib/components/Toast.svelte';
import Filemanager from '$lib/components/Filemanager.svelte';
import Modal from '$lib/components/Modal.svelte';
import ModalPreview from '$lib/components/ModalEditRecord.svelte';
import Icon from '$lib/components/Icon.svelte'
import fileManagerState from '$lib/stores/fileManagerState.svelte.js'
import dayjs from 'dayjs';
import { goto } from '$app/navigation';
import userState from '$lib/stores/user.svelte.js';
import getDishMenu from '$lib/services/getDishMenu.js';

const API_URL = import.meta.env.VITE_API_URL;

let requestedSubMenu = $state()
let data = $state();
let menu = $state([]);
let showModal = $state(false);
let closeModal = $state(false);
let modalOperation = $state('');
let modalContents=$state([]);
let record=$state([]);
let newMainMenu=$state([]);
let modalHeader=$state('');
let dishMenu = $state([]);
let showModalPreview = $state(false)
//let imgBrightness= $derived(`brightness-${Math.round(record.brightness/10)*10}`);




let type=[
	'catering','dining'
]

let status=[
	'available','coming soon', 'unavailable'
]

let tag = [
	'popular','signature','new','spicy','plant based','gluten free','healthy'

]

onMount(() => {
  getDishList()
  getDishMenulist()

})

async function getDishMenulist(){
	const data = await getDishMenu('main_menu_ecs','main-course')
	dishMenu= data
}

async function getDishList(){
  const response = await useFetch('/dishes?type=catering', 'GET',null, true);
  menu = response
  console.log(data)
}

async function getDish(id){
	modalOperation= 'Edit'
    const menuData =  await useFetch( '/dishes/'+id,'GET',null,true);
    console.log(menuData)
    record={...menuData}
    modalHeader = record.name
    modalOperation="Edit Dish"

}

async function saveDish(){
	console.log(record)

	let saveItem=''
	if(modalOperation=='Create Dish'){
		try{
			saveItem =  await useFetch('/dishes', 'POST',record, true);
			console.log(saveItem.status)
			if(saveItem.status == 'available'){
				toast.success("Saved successfully",2000);	
				getDishList()
	  		showModal= false
			}
			else if(saveItem.status && saveItem.status != 200){
				toast.error("Failed to create menu",2000);
			}else{
				toast.success("Saved successfully",2000);	
	  		getDishList()
	  		showModal= false
			}
	  	
	  }
	  catch(e){

	  	toast.error("Failed to create menu 0 ",2000);	
	  }
	}
	else{
		try{
			console.log('edit')
			console.log(record)
  		let saveItem =  await useFetch('/dishes/' + record.id, 'PATCH',record, true);
  		//console.log(saveItem)
	  	toast.success("Saved successfully",2000);	
	  	getDishList()
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

async function deleteMenu(id){
  try{
  	let saveItem =  await useFetch('/dishes/' + id, 'DELETE',null, true);
  	toast.success("Deleted successfully",2000);	
  	getDishList()
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
	modalOperation='Create Dish'
	let allschema =  await useFetch('/docs.jsonld#/dishes', 'GET',null, false);

	const schema = allschema.supportedClass.find(schema=>schema.title==="SubMenu").supportedProperty

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
    console.log(record)
    record.type="catering"
    record.brightness="100"
    record.opacity="100"
    record.contrast="100"
	
}



</script>