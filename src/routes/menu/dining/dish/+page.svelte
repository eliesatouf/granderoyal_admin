<div in:fade  class="grid grid-col justify-center items-center">

<div class="" in:fade >
	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box  border p-3 m-2 ">
		<div class="flex">
			<button class="btn btn-primary btn-soft btn-sm w-[100px]"	onclick="{()=>{createMenu(), showModal=true}}">	<Icon name="add" />new</button>

			{#if browser }
				<div class="dropdown dropdown-bottom dropdown-end  w-56">
					<div tabindex="0" role="button" class="btn btn-primary  btn-sm btn-outline mx-2">
						<Icon name="menu_book_2" /> {selectedCategory || 'Select a category'} 
						<div class="badge badge-accent badge-sm badge-outline rounded-full">{dishesOfCategory.length}</div>
					</div>
					<ul tabindex="0" class="dropdown-content dropdown-bottom menu bg-base-100 rounded-box z-[1]  p-2 shadow-lg h-64 overflow-auto grid">
						{#each categories as category}
						<li>
							<button
							type="button"
							class="btn btn-secondary btn-sm w-52 {activeCategory?.id === category.id ? 'btn-active' : ''}"
							onclick={() => {
								activeCategory = category;
								document.activeElement?.blur();
							}}
							>
							{category.name}
						</button>
					</li>
					{/each}
				</ul>
			</div>
		{/if}

	</div>
		 <div class="overflow-x-auto lg:hidden">

		  <table class="table table-xs">
		    <thead>
		      <tr>
		      	<th>Action</th>
		        <th>ID</th>
		        <th>Name</th>
		      </tr>
		    </thead>
		    <tbody
		    	 use:dndzone={{
		    	items: dishesOfCategory,
		    	flipDurationMs,
		    	type: 'dish'
		    }}
		    onconsider={handleDndConsider}
		    onfinalize={handleDndFinalize}
		    >
		      {#each dishesOfCategory as item, i (item.id)}
		      	<tr animate:flip={{ duration: flipDurationMs }}
				      class="cursor-move hover:bg-base-300 transition-colors"
				      data-id={item.id}
				      >
				    <td>
				    	<div class="btn btn-disabled btn-square btn-info btn-xs btn-soft cursor-grab active:cursor-grabbing">
								<Icon name="ios-menu" />
							</div>
							<button class="btn btn-primary btn-soft btn-sm"	onclick="{()=>{getDish(item.id), showModal=true}}">edit	</button></td>
		      	<td>{i+1}
		      	</td>
		      	<td>{item.name} {item.active} <span class="{item.active? 'status status-success':'status'}"></span>
		      	</td>

		      </tr>
		      {/each}
		    </tbody>
		  </table>
		</div>

		<div class="overflow-x-auto hidden lg:block lg:" in:fade >
		  <table class="table table-xs w-full" in:fade >
		    <thead >
		      <tr in:fade >
		      	<th>Action</th>
		        <th>SordId</th>
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
		        <th>status</th>
		        <th>active</th>
		        <th>Add To Cart</th>
						<th>Updated On</th>
		      </tr>
		    </thead>
		    <tbody 
		    use:dndzone={{
		    	items: dishesOfCategory,
		    	flipDurationMs,
		    	type: 'dish'
		    }}
		    onconsider={handleDndConsider}
		    onfinalize={handleDndFinalize}>

		      {#each dishesOfCategory as item, i (item.id)}
		      <tr in:fade 
				      animate:flip={{ duration: flipDurationMs }}
				      class="cursor-move hover:bg-base-300 transition-colors"
				      data-id={item.id}>
		      	<td>
		      		<div class="btn btn-disabled btn-square btn-info btn-xs btn-soft cursor-grab active:cursor-grabbing">
								<Icon name="ios-menu" />
							</div>
		      		<button class="btn btn-primary btn-soft btn-sm "	
		      		onclick="{()=>{getDish(item.id,i), showModal=true}}">Edit	</button>
		      		</td>
		      	<td>{item.sortId}</td>
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
		      	<td>{item.status}</td>
		      	<td><span class="{item.active? 'status status-success':'status'}"></span></td>
		      	<td><span class="{item.enableAddToCart? 'status status-success':'status'}"></span></td>
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
<div class="m-2 p-2 rounded md:rounded-lg bg-base-100 max-h-[800px] lg:max-h-[800px] overflow-auto ">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-1 w-[280px] lg:w-3xl">
    <legend class="fieldset-legend">{modalOperation}: {modalHeader}</legend>
    <div class="grid m-2 lg:p-2 lg:flex lg:max-w-3xl lg:gap-3  overflow-auto">

    <div class="grid p-3 lg:w-1/3 ">
      <label class="label">Type</label>
      <input readonly type="text" class="input input-sm" 
       bind:value="{record.type}"/>

<!--       <label type="label" class="label">Menu </label>
          <select class="select select-sm" bind:value={record.menu}>
          {#each dishMenu as menu}
              <option value={menu}>{menu}</option>
          {/each}
        </select> -->
        {#if record.category}
      	<label type="label" class="label">Category </label>
        <select class="select select-sm" bind:value={record.category.id}>
          
          {#each categories as category}
              <option value={category.id}>{category.name}</option>
          {/each}
        </select>
        {/if}

      <label class="label">Name</label>
      <input type="text" class="input input-sm" placeholder="name of dish " 
       bind:value="{record.name}"/>

      <label class="label">Description</label>
      <input type="text" class="input input-sm" placeholder="description of dish" 
       bind:value="{record.description}"/>

      <label type="label" class="label">Tag </label>
          <select class="select select-sm" bind:value={record.tag}>
          {#each tag as tag}
              <option value={tag}>{tag}</option>
          {/each}
        </select>

      <label class="label">Price</label>
      <input type="number" class="input input-sm validator" required placeholder="price > 0 " min="1"
       bind:value="{record.price}"/>
    </div>
    <div class="grid p-3  lg:w-1/3">

      <label class="label">Brightness</label>
      <input type="text" class="input input-sm" placeholder="image brightness 50 to 150" 
       bind:value="{record.brightness}"/>

      <label class="label">Opacity</label>
      <input type="text" class="input input-sm" placeholder="image opacity 0 to 100" 
       bind:value="{record.opacity}"/>

      <label class="label">Contrast</label>
      <input type="text" class="input input-sm" placeholder="image contrast 0 to 100" 
       bind:value="{record.contrast}"/>

       <label class="label">Image Source</label>
      <div class="grid mt-0" onmouseenter={()=>{defineSelectedImage(record.imageSource)}}>
      	{#if record.imageSource}
        <div class="tooltip">
          <div class="tooltip-content m-0 p-0">
            <img src="{record.imageSource}" class="h-[250px] w-[250px]">
          </div>
          <input type="text " class="" placeholder="menu image" 
            bind:value="{record.imageSource}"  />
          </div>
          {/if}
        <Filemanager selectedImage={handleSelectMenu} />
        <button class="btn btn-sm btn-soft w-[220px]" onclick={()=>{showModalPreview=true}}>preview</button>
      </div>

<!--       	<div class="row p-2">
       <input type="checkbox" bind:checked="{record.availableInCatering}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       In catering
     </div> -->


      <label type="label" class="label">Status</label>
      <select class="select select-sm validator" required placeholder="select a status" bind:value={record.status}>
      	{#each status as status}
          <option value={status}>{status}</option>
        {/each}
      </select>


     <div class="row p-2">
       <input type="checkbox" bind:checked="{record.active}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       Active
     </div>

      <div class="row p-2">
       <input type="checkbox" bind:checked="{record.enableAddToCart}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       Add to cart
     </div>

    </div>   

    <div class="grid p-4 lg:w-1/3">

    	<label class="label ">Preperation Time
				      <input type="number" class="input input-sm" placeholder="Minutes" 
				       bind:value="{record.prepTime}"/></label>

    	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-3">
    	<legend class="fieldset-legend">Variants</legend> 
    		{#each record.variants as variant}
    			<div class="flex lg:h-10 my-2 gap-2">

    				<div class="grid">
		    			<label class="label ">Size</label>
				      <input type="text" disabled class="input input-sm" placeholder="price variante" 
				       bind:value="{variant.size}"/>
				    </div>

				    <div class="grid">
		    			<label class="label ">Price</label>
				      <input type="text" disabled readonly class="input input-sm" placeholder="price variante" 
				       bind:value="{variant.price}"/>
				    </div>
<!-- 
				    <button class="btn btn-error btn-soft btn-square p-2 btn-xs mt-5"
				    				onclick="{()=>{removePrice(variant)}}">
				    	<Icon name="delete" class="text-red-500"/>
				  	</button> -->
			    </div>
    		{/each}

<!--     		<button class="btn btn-info btn-soft btn-square btn-sm mt-2" 
    						onclick="{()=>{addVariant()}}">
    			<Icon name="add"/>
    		</button> -->
    	</fieldset>
    </div>
  </div>



  <div class="flex justify-between">
   <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveDish())}>
    Save
  </button>

  <button class="btn btn-soft btn-default w-1/4" onclick={()=>showModal = false}>
    Close
  </button>

  <button  class="btn btn-soft btn-error w-1/4" onclick={()=>{deleteDish(record.id), showModal = false}}>
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
  				<input class="input input-sm input-xs basis-1/6 ml-5" type="number" bind:value={record.brightness}/>
  			</div>
  			<div class="flex flex-row w-full m-2">
  			<label class="label label basis-1/4">Opacity </label>
  			<input type="range" min="20" max="100" step="5" bind:value="{record.opacity}" 
  				class="range label basis-2/4 text-stone-300 [--range-bg:grey] [--range-thumb:darkgrey] [--range-fill:0]" />
  				<input class="input input-sm input-xs basis-1/6 ml-5" type="number" bind:value={record.opacity}/>
  			</div>
  			<div class="flex flex-row w-full m-2">
  			<label class="label label basis-1/4">Contrast </label>
  			<input type="range" min="20" max="200" step="5" bind:value="{record.contrast}" 
  				class="range label basis-2/4 text-stone-300 [--range-bg:grey] [--range-thumb:darkgrey] [--range-fill:0]" />
  				<input class="input input-sm input-xs basis-1/6 ml-5" type="number" bind:value={record.contrast}/>
  			</div>
		  </div>
		</div>
		
	{/snippet}

</ModalPreview>
<Toaster richColors position="top-center" />

<script>
	
import { onMount } from 'svelte';
import { fade, scale,fly } from 'svelte/transition';
import useFetch from '$lib/services/useFetch'
import { Toaster, toast } from 'svelte-sonner';
import Filemanager from '$lib/components/Filemanager.svelte';
import Modal from '$lib/components/Modal.svelte';
import ModalPreview from '$lib/components/ModalEditRecord.svelte';
import Icon from '$lib/components/Icon.svelte'
import fileManagerState from '$lib/stores/fileManagerState.svelte.js'
import dayjs from 'dayjs';
import { goto } from '$app/navigation';
import userState from '$lib/stores/user.svelte.js';
import getDishMenu from '$lib/services/getDishMenu.js';
import { afterNavigate} from '$app/navigation';
import { jwtDecode } from 'jwt-decode';
import { browser } from "$app/environment";
import { dndzone } from 'svelte-dnd-action';
import { flip } from 'svelte/animate';

let admin =$state(false)

let {data} = $props();
console.log('data', data)

const API_URL = import.meta.env.VITE_API_URL;

let requestedSubMenu = $state()
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
let preLoad= $state()
let dishes = $state([]);

const categories = data.categories
dishes = data.menu
console.log('dishes', dishes)

let activeCategory = $state();
activeCategory = categories[0]

console.log('activeCategory', activeCategory)
menu = data.menu

let selectedCategory = $derived.by(()=>{
	const cat = categories.find(cat => cat.id == activeCategory.id)
	return cat?.name 
})

let dishesOfCategory = $derived.by(()=>{ 
	const items = dishes.filter(el => el.category.id == activeCategory.id)
	return items
})


// async function loadDishes() {
// 	const response = await useFetch('/dishes', 'GET');
// 	dishes = response
// 	return dishes;
// }

//let imgBrightness= $derived(`brightness-${Math.round(record.brightness/10)*10}`);

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

let type=[
	'catering','dining'
]

let status=[
	'available','coming soon', 'unavailable'
]

let tag = [
	null,'popular','signature','new','spicy','plant based','gluten free','healthy'

]

onMount(() => {
  getDishMenulist()
})

function removePrice(variant){
	record.variants= record.variants.filter(el => el.id !== variant.id)
}

function addVariant(){
	if(!record.variants){
		record.variants=[{'size':'', 'price':0}]
	}else{
		let obj = {...record.variants[0]}
		obj.id=null
		obj.price=0
		obj.size=""
		record.variants.push(obj)
	}

}


async function getDishMenulist(){
	const data = await getDishMenu('main_menu_ecs','main-course')
	dishMenu= data
}

async function getDishList(){
  const response = await useFetch('/dishes?type=dining', 'GET',null, true);
  menu = response
}

async function getDish(id){
	modalOperation= 'Edit'
    const menuData =  await useFetch( '/dishes/'+id,'GET',null,true);
    record={...menuData}
    modalHeader = record.name
    modalOperation="Edit Dish"

}

async function saveDish(){

	record.category = `/api/categories/${record.category.id}`
	// console.log('save record', record)
	// return 0
	let saveItem=''
	if(modalOperation=='Create Dish'){
		console.log('Create New Dish')
		try{
			saveItem =  await useFetch('/dishes', 'POST',record, true);

			if(saveItem.status == 'available'){
				toast.success("Saved successfully",2000);	
				//getDishList()
	  		showModal= false
			}
			else if(saveItem.status && saveItem.status != 200){
				toast.error("Failed to create menu",2000);
			}else{
				toast.success("Saved successfully",2000);	
	  		//getDishList()
	  		showModal= false
			}
	  }
	  catch(e){
	  	toast.error("Failed to create menu 0 ",2000);	
	  }
	}
	else{
		console.log('Edit Dish')
		try{
  		let saveItem =  await useFetch('/dishes/' + record.id, 'PATCH',record, true);
  		//console.log(saveItem)
	  	toast.success("Saved successfully",2000);	
	  	getDishList()
	  	getDish(record.id)
	  	showModal= false
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

async function deleteDish(id){
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
    record.type="dining"
    record.brightness=100
    record.opacity=100
    record.contrast=100
    record.category = { id: 1, slug: "specials", name: "Specials" }
    
    console.log('create record', record)
	
}


const flipDurationMs = 300;
	// Handle drag-and-drop events
	function handleDndConsider(e) {
		// Update the local dishes array when items are being dragged
		dishes = e.detail.items;
	}
	function handleDndFinalize(e) {
		// Final update and save to backend
		dishes = e.detail.items;
		
		// Update sortId based on new order and save to backend
		updateDishOrder(e.detail.items);
	}
	

async function updateDishOrder(orderedItems) {
	// Prepare batch update
	const items = orderedItems.map((item, index) => ({
		id: item.id,
		sortId: index + 1
	}));
	try {
		// Single API call to the new endpoint
		const response = await useFetch('/dishes/reorder', 'POST', { items }, true);
		
		if (response && response.success) {
			getDishList()
			toast.success("Order updated successfully", 2000);
			
			// Update local dishes with new sortIds
			dishes = dishes.map(dish => {
				const update = items.find(u => u.id === dish.id);
				if (update) {
					return { ...dish, sortId: update.sortId };
				}
				return dish;
			});
		} else {
			toast.error(response?.error || "Failed to update order", 2000);
		}
		
	} catch (error) {
		toast.error("Failed to update order", 2000);
		console.error(error);
	}
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

/* DND Styles */
.dnd-zone {
	min-height: 20px;
}
.dnd-drag-over {
	background-color: rgba(59, 130, 246, 0.1);
	border: 2px dashed #3b82f6;
}
.dnd-item {
	transition: all 0.3s ease;
	user-select: none;
}
.dnd-item.dragging {
	opacity: 0.5;
	transform: scale(1.02);
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
/* Make rows more draggable */
tr {
	position: relative;
}
tr::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
}

</style>