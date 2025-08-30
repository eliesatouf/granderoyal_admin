<div in:fade  class="grid grid-col justify-center items-center">

<div class="" in:fade >
	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box  border p-3 m-2 ">
	  <button class="btn btn-primary btn-soft btn-sm w-[100px]"	
	  onclick="{()=>{createBundleObject('Bundle'), createBundleObject('BundleItem'),showModal=true }}">	
	  <Icon name="add" />new</button>
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
		      {#each BundleList as item, i}
		      	<tr><td><button class="btn btn-primary btn-soft btn-sm"	onclick="{()=>{getBundle(item.id), showModal=true}}">edit	</button></td>
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
		      <tr in:fade >
		      	<th>Action</th>
		        <th>ID</th>
		        <th>Name</th>
		        <th>Description</th>
		        <th>Price</th>
		        <th>active</th>
						<th>Updated On</th>
		      </tr>
		    </thead>
		    <tbody>

		      {#each BundleList as item, i}
		      	<tr in:fade >
		      	<td><button class="btn btn-primary btn-soft btn-sm"	
		      		onclick="{()=>{getBundle(item.id,i), showModal=true}}">edit	</button>
		      		</td>
		      	<td>{i+1}</td>
		      	<td>{item.name}</td>     	
		      	<td class="truncate md:text-clip">{item.description}</td>
		      	<td>{item.price}</td>
		      	<td><span class="{item.active? 'status status-success':'status'}"></span></td>
		      	<td readonly>{item.updatedOn}</td>
		      	</tr>
					{/each}
					</tbody>
		  </table>  
		</div>
	</fieldset>
</div>


</div>

<Modal bind:showModal>
<div class="m-2 lg:p-5 rounded md:rounded-lg bg-base-100 max-h-[500px] lg:max-h-[800px] overflow-auto lg:w-2xl">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border  w-[250px] lg:w-xl">
    <legend class="fieldset-legend">{modalOperation}: {modalHeader}</legend>
    <div class="grid m-2  lg:flex lg:gap-3">

    <div class="grid p-1">

      <label class="label">Name</label>
      <input type="text" class="input input-sm" placeholder="Name of bundle " 
       bind:value="{record.name}"/>	

      <label class="label">Description</label>
      <input type="text" class="input input-sm" placeholder="description of bundle" 
       bind:value="{record.description}"/>

      <label class="label">Price</label>
      <input type="text" class="input input-sm validator" required placeholder="price > 0 " min="0"
       bind:value="{record.price}"/>

      <label class="label">totalOriginalPrice</label>
      <div class="badge badge-soft badge-primary "> 
       {record.totalOriginalPrice}</div>	

      <label class="label">savings</label>
      <div class="badge badge-soft badge-primary "> 
       {record.savings}</div>

      <label class="label">savingsPercentage</label>
      <div class="badge badge-soft badge-primary "> 
      {record.savingsPercentage}</div>


    </div>
    <div class="grid mt-5 p-1 lg:w-[280px]">

       <button class="btn btn-sm btn-soft btn-primary" onclick="{()=>{showModalConfirm=true}}">Add/Remove Dish
        </button>

      <div class="h-32 bg-base-300 ">
		    <div class="h-32 overflow-y-auto ">
		     	{#each record.bundleItems  as dish,index}
		     		<div class="flex w-[310px] justify-between">
		     			<div class="truncate p-1 basis-1/2">
		     				{index+1}-
		     				{dishList.find(el=> el.id === parseInt(dish.dish.split('/')[3]))?.menu.toUpperCase() ?? 'na'}-
		     	    	{dishList.find(el=> el.id === parseInt(dish.dish.split('/')[3]))?.name.toUpperCase() ?? 'na'}
		     	    </div>
		     	    <div class=" basis-1/2">
		     	    	<span class=" indicator-item indicator-start badge badge-sm badge-info font-bold">
						    	{dishList.find(el=> el.id === parseInt(dish.dish.split('/')[3]))?.price ?? 'na'}
						  	</span>
						  	<span class="glass indicator-item indicator-start badge bg-stone-200 text-info btn-square  font-bold">
						    	{dish.quantity}
						  	</span>
		     				<button class="btn btn-soft btn-primary btn-xs btn-square" onclick="{()=>{dish.quantity+=1}}">+</button>
		     				<button class="btn btn-soft btn-secondary btn-xs btn-square" onclick="{()=>{dish.quantity> 1 ? dish.quantity-=1:null}}">-</button>
		     			 {#if dish}
		     				<button class="btn btn-soft btn-secondary btn-xs btn-square" 
									onclick="{()=>{removeDish(dish.dish.split('/')[3])}}"
									><Icon name="delete" size={18}/>
								</button>
							{/if}
		     		</div>
		     		</div>	
		     	{/each}
		   	</div>
	    </div>


     <div class="row p-2">
       <input type="checkbox" bind:checked="{record.active}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       Active
     </div>
    </div>   

    </div>



  <div class="flex justify-between">
   <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveBundle())}>
    Save
  </button>

  <button class="btn btn-soft btn-default w-1/4" onclick={()=>showModal = false}>
    Close
  </button>

  <button  class="btn btn-soft btn-error w-1/4" onclick={()=>{deleteBundle(record.id), showModal = false}}>
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

<ModalEditRecord bind:showModalConfirm>
<div class="max-h-200">

<label class="input">
    <span class="">Find dish:</span>
    <input type="text" class="" placeholder="EX. calamares" 
      bind:value={searchTerm} 
      onchange="{()=>{findDish()}}"/>
  </label>

<div class="h-56">
<div class="h-56 overflow-auto">
{#if searchResults && searchResults.length > 0}
	<ul class="list bg-base-100 rounded-box shadow-md">
	{#each searchResults as dish}
		<div class="flex gap-1">
		<li class="list-row">

		<badge 
		class="badge {dish.id ==getDiscountDishId(dish.id)? 'badge-success':'badge-default'}"
		>{dish.type}-{dish.name}, {dish.price}
	 </badge>

	 {#if dish.id != getDiscountDishId(dish.id) }
		<button class="btn btn-soft btn-success btn-xs" 
		disabled={dish.id ==getDiscountDishId(dish.id)}
		onclick="{()=>{addDish(dish.id)}}"
		>add</button>
		{/if}

		 {#if dish.id == getDiscountDishId(dish.id) }
		<button class="btn btn-soft btn-secondary btn-xs" 
		disabled={dish.id !=getDiscountDishId(dish.id)}
		onclick="{()=>{removeDish(dish.id)}}"
		>remove</button>
		{/if}
	</li>
	</div>
	{/each}
</ul>
{/if}
</div>
</div>


</div>
</ModalEditRecord>


<Toast />

<script>
	
import { onMount } from 'svelte';
import { fade, scale,fly } from 'svelte/transition';
import useFetch from '$lib/services/useFetch'
import { toast } from '$lib/stores/toast';
import Toast from '$lib/components/Toast.svelte';
import Filemanager from '$lib/components/Filemanager.svelte';
import Modal from '$lib/components/Modal.svelte';
import ModalPreview from '$lib/components/ModalEditRecord.svelte';
import ModalEditRecord from '$lib/components/ModalEditRecord.svelte';
import Icon from '$lib/components/Icon.svelte'
import fileManagerState from '$lib/stores/fileManagerState.svelte.js'
import dayjs from 'dayjs';
import { goto } from '$app/navigation';
import userState from '$lib/stores/user.svelte.js';


const API_URL = import.meta.env.VITE_API_URL;

let requestedSubMenu = $state()
let data = $state();
let BundleList = $state([]);
let showModal = $state(false);
let closeModal = $state(false);
let modalOperation = $state('');
let modalContents=$state([]);
let record=$state([]);
let newMainMenu=$state([]);
let modalHeader=$state('');
let bundleMenu = $state([]);
let showModalPreview = $state(false)
let dishList = $state([])
let showModalRecord = $state(fileManagerState)
let showModalConfirm = $state(false)
let searchTerm = $state('all');
let searchResults = $state([]);
let selectedDishes=$state([])
let timeoutId;
let bundleItem=$state([])


onMount(() => {
	getDishes()	
  getBundleList()
  //createBundleObject('Bundle')
  //createBundleObject('BundleItem')

})

$effect(() => {
  debouncedSearch(searchTerm);
});

function findDish(term){
	if(!term){
		return 0
	}
	if(term.toLowerCase() == 'all'){
		return dishList
	}else{
		return dishList.filter(el=>el.name.toLowerCase().includes(term.toLowerCase()) || 
			el.menu.toLowerCase().includes(term.toLowerCase()))
	}
}

async function getDishes(){
  const response = await useFetch('/dishes?active=true&type=dining', 'GET',null, true);
  dishList = response
}


async function getOneDish(iri){
	const id =iri.split('/')[3]
  const response = await useFetch(`/dishes/${id}`, 'GET',null, true);
  return response.name
}

function debouncedSearch(term) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      if (term.length > 2) {
        searchResults = await findDish(term);
      }
    }, 300);
}

function addDish(dishId){
	selectedDishes.push(`/api/dishes/${dishId}`)
	record.bundleItems.push(
		{
			"dish":`/api/dishes/${dishId}`,
			"quantity":1,
		}
	)
	record.dishes= selectedDishes
}

function removeDish(id){
		const newArray = record.dishes.filter(item => item !== `/api/dishes/${id}`);
		record.dishes = newArray
		selectedDishes = record.dishes
		const newItems =record.bundleItems.filter(item => item.dish !== `/api/dishes/${id}`);
		record.bundleItems = newItems
}

function getDiscountDishId(dishId){
	if (!record.dishes) return 0
	if(record.dishes.length > 0){
		let id = record.dishes.find(el=>el.split('/')[3] ==  dishList.find(el=>el.id == dishId).id)?.split('/')[3]
		return id
	}
}
  
// function increaseQuantity(dish){
// 	const dishId = dish.split('/')[3]
// 	const x = record.bundleItems.find(el=>el.dish == dish).quantity+=1
// }

// function decreaseQuantity(dish){
// 	const dishId = dish.split('/')[3]
// 	let  x = record.bundleItems.find(el=>el.dish == dish).quantity
// 	if(x > 0){
// 		record.bundleItems.find(el=>el.dish == dish).quantity-=1
// 	}
// }

async function getBundleList(){
  const response = await useFetch('/bundles', 'GET',null, true);
  BundleList = response
  //console.log(response)
}

async function getBundle(id){
	modalOperation= 'Edit'
  const bundleData =  await useFetch( '/bundles/'+id,'GET',null,true);
  record={...bundleData}
  modalHeader = record.name
  modalOperation="Edit Bundle"

}

async function saveBundle(){

	const id = record.id
	let saveItem=''
	if(modalOperation=='Create Bundle'){
		try{
			saveItem =  await useFetch('/bundles', 'POST',record, true);
			if(saveItem.status == 'available'){
				toast.success("Saved successfully",2000);	
				getBundleList()
	  		//showModal= false
			}
			else if(saveItem.status && saveItem.status != 200){
				toast.error("Failed to create bundle",2000);
			}else{
				toast.success("Saved successfully",2000);	
	  		getBundleList()
	  		//showModal= false
			}
	  	
	  }
	  catch(e){
	  	console.log(e)
	  	toast.error("Failed to create bundle ",2000);	
	  }
	}
	else{
		try{
  		let saveItem =  await useFetch('/bundles/' + record.id, 'PATCH',record, true);
				getBundle(id)
	  	toast.success("Saved successfully",2000);	
	  	getBundleList()
	  	//showModal= false
	  }
		catch(e) {
	  	toast.error("Failed to save bundle",2000);	
	  	console.log(e);
	  }
	}
  
}

async function handleSelectMenu(item){
	const index = BundleList.findIndex(item=>item.id == record.id)
  record.imageSource = item

}

async function deleteBundle(id){
  try{
  	let saveItem =  await useFetch('/bundles/' + id, 'DELETE',null, true);
  	toast.success("Deleted successfully",2000);	
  	getBundleList()
  	record=[]
  }
	catch(e) {
  	toast.error("Failed to delete bundle",2000);	
  	console.log(e);
  }
}


function defineSelectedImage(item){
  fileManagerState.store.tmpImagePath =item
}

async function createBundleObject(obj){
	modalOperation='Create Bundle'
	let allschema =  await useFetch('/docs.jsonld#/bundles', 'GET',null, false);
	const schema = allschema.supportedClass.find(schema=>schema.title==obj).supportedProperty
	const properties = schema.map(item => [item.title,item.property.range?.split(':')[1]]);

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
  if(obj =="Bundle"){
   	record = {...newObject}
	  record.brightness=100
	  record.opacity=100
	  record.contrast=100
	  record.bundleItems=[]
	  record.dishes=[]
	  record.bundleItemsDetails=[]
	  record.offers=[]
  }
  if(obj == "bundleItem"){
  	record.bundleItems = {...newObject}
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
</style>