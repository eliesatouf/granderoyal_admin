<div in:fade  class="grid grid-col justify-center items-center">
{#if isLoading}
	<div class="absolute items-center left-35 md:left-80 lg:left-200 z-100">
		<span class="loading loading-spinner text-info loading-xl w-[100px] h-100"></span>
	</div>
	{/if}
<div class="" in:fade >
	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box  border p-3 m-2 ">
	  <legend class="fieldset-legend">Discount</legend>
	  <button class="btn btn-primary btn-soft btn-sm w-[100px]"	onclick="{()=>{createDiscount(), showModal=true}}">	<Icon name="add" />new</button>
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
		      {#each discount as item, i}
		      	<tr><td><button class="btn btn-primary btn-soft btn-sm"	onclick="{()=>{getOneDiscount(item.id), showModal=true}}">edit	</button>
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
		        <th>Code</th>
		        <th>Discount Type</th>
		        <th>value</th>
		        <th>Min Order Amount</th>
<!-- 		        <th>Start Date</th>
		        <th>End Date</th> -->
		        <th>Active</th>
		        <th>Last Update</th>
		        <th>Created On</th>
		      </tr>
		    </thead>
		    <tbody>

		      {#each discount as item, i}
		      	<tr in:fade >
		      	<td><button class="btn btn-primary btn-soft btn-sm"	
		      		onclick="{()=>{getOneDiscount(item.id,i), showModal=true}}">edit	</button>
		      	{#if item.hasChild}
		      	<button class="btn btn-primary btn-soft btn-sm"	
		      		onclick="{()=>{goToSubDiscount(item.name)}}">sub</button>
		      		{/if}
		      		</td>
		      	<td>{i+1}</td>
		      	<td>{item.code}</td>
		      	<td>{item.discountType}</td>
		      	<td>{item.value}</td>
		      	<td>{item.minOrderAmount}</td>
<!-- 		      	<td>{item.startDate}</td>
		      	<td>{item.endDate}</td> -->
		      	<td> <span class="{item.active? 'status status-success':'status'}"></span></td>
		      	<td readonly>{item.updatedOn}</td>
		      	<td readonly>{item.createdOn}</td>
		      	</tr>
					{/each}
					</tbody>
		  </table>  
		</div>
<!-- 
		<div class="grid mt-10" in:fade >
			{#each discount as item}
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
    <div class="grid m-2 p-2 lg:flex lg:gap-3">
     
    	<div class="grid w-[220px] p-1 m-3">
    	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-1  max-w-[250px]">
    		<legend class="fieldset-legend">General</legend>
      <label class="label">code</label>
      <input type="text" class="input" placeholder="code of discount" 
       bind:value="{record.code}"/>


      <label type="label" class="label">Discount Type </label>
          <select class="select select" bind:value={record.discountType}>
          {#each discountType as type}
              <option value={type.name}>{type.label}</option>
          {/each}
        </select>

      <label class="label">value</label>
      <input type="text" class="input" placeholder="value of discount" 
       bind:value="{record.value}"/>

      <label class="label">Min Order Amount</label>
      <input type="text" class="input" placeholder="Minimum order amount" 
       bind:value="{record.minOrderAmount}"/>
     </fieldset>
     </div>


     <div class="grid w-[220px] p-1 m-3">	
     	 <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-1  max-w-[250px]">
    		<legend class="fieldset-legend">BOGO</legend>

      <label type="label" class="label">bogoType </label>
        <select class="select select" bind:value={record.bogoType}>
          {#each bogoTypes as type}
            <option value={type.name}>{type.label}</option>
        {/each}
      </select>

      <label class="label">bogoBuyQuantity</label>
      <input type="number" class="input" placeholder="" 
       bind:value="{record.bogoBuyQuantity}"/>

      <label class="label">bogoGetQuantity</label>
      <input type="number" class="input" placeholder="" 
       bind:value="{record.bogoGetQuantity}"/>

      <label class="label">bogoDiscountValue</label>
      <input type="text" class="label" placeholder="" 
       bind:value="{record.bogoDiscountValue}"/>
     </fieldset>
   </div>

   	<div class="grid w-[220px] p-1 m-3">	
     	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-1  max-w-[250px]">
    		<legend class="fieldset-legend">BUY X GET Y</legend>

	     	<label class="label">Buy Quantity</label>
      	<input type="number" class="input" placeholder="" 
       		bind:value="{record.buyQuantity}"/>

       	<label class="label">Get Quantity</label>
      	<input type="number" class="input" placeholder="" 
       		bind:value="{record.getQuantity}"/>

    
       		</fieldset>

    	<label class="label">offer</label>
      <input readonly type="text" class="label" placeholder="" 
       bind:value="{record.offer}"/>

     	<div class="row p-2">
       	<input type="checkbox" bind:checked="{record.active}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       	Active
     	</div>

   
	  <div class="flex justify-between">
	  	<button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveOneDiscount())}>
	    	Save
	  	</button>
	  	<button class="btn btn-soft btn-default w-1/4" onclick={()=>showModal = false}>
	    Close
	  	</button>
	  	<button class="btn btn-soft btn-error w-1/4" onclick={()=>{deleteDiscount(record.id), showModal = false}}>
	    	Delete
	  	</button>
		</div>

  

</div>
</Modal>

<Toast />


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
import { afterNavigate} from '$app/navigation';
import { jwtDecode } from 'jwt-decode';
let admin =$state(false)

const API_URL = import.meta.env.VITE_API_URL;

//console.log(API_URL)
let discount = $state([]);
let showModal = $state(false);
let closeModal = $state(false)
let modalOperation = $state('')
let modalContents=$state([])
let record=$state([])
let newDiscount=$state([])
let modalHeader=$state('')
let discountType = $state()
let isLoading= $state(false)

let bogoTypes = [
	{id:1,"name":"same","label":"Same"},
	{id:1,"name":"free_item","label":"Free Item"},
]
onMount(() => {
  getDiscount()
  getDiscountType()
})

async function getDiscount(){
	isLoading= true
  const response = await useFetch('/discounts', 'GET',null, true);
  discount = response
  isLoading= false

}

async function getOneDiscount(id){
	isLoading= true
	modalOperation= 'Edit'
    const discountData =  await useFetch( '/discounts/'+id,'GET',null,true);
    record={...discountData}
    modalHeader = record.name
    modalOperation="Edit Discount"
    isLoading= false

}

async function saveOneDiscount(index){
	//console.log(record)
	isLoading= true
	let saveItem=''
	if(modalOperation=='Create discount'){
		try{
			saveItem =  await useFetch('/discounts', 'POST',record, true);
			if(saveItem.status && saveItem.status != 200){
				toast.error("Failed to create discount",2000);
			}else{
				toast.success("Saved successfully",2000);	
	  		getDiscount()
	  		showModal= false
			}
	  	
	  }
	  catch(e){
	  	toast.error("Failed to create discount",2000);	
	  }
	}
	else{
		try{
  		let saveItem =  await useFetch('/discounts/' + record.id, 'PATCH',record, true);
  		//console.log(saveItem)
	  	toast.success("Saved successfully",2000);	
	  	getDiscount()
	  	//showModal= false
	  }
		catch(e) {
	  	toast.error("Failed to save discount",2000);	
	  	console.log(e);
	  }
	}
	isLoading= false
  
}

async function handleSelectDiscount(item){
	const index = discount.findIndex(item=>item.id == record.id)
  record.imageSource = item

}

async function deleteDiscount(id){
  try{
  	isLoading= true
  	let saveItem =  await useFetch('/discounts/' + id, 'DELETE',null, true);
  	toast.success("Deleted successfully",2000);	
  	getDiscount()
  	isLoading= false
  }
	catch(e) {
		isLoading= false
  	toast.error("Failed to delete discount",2000);	
  	console.log(e);
  }
}
	

function defineSelectedImage(item){
  fileManagerState.store.tmpImagePath =item
}

async function createDiscount(){

	//record.name =''
	record =[]
	modalOperation='Create discount'

	let allschema =  await useFetch('/docs.jsonld', 'GET',null, false);
	const schema = allschema.supportedClass.find(schema=>schema.title==="Discount").supportedProperty
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
    record.bogoDiscountValue =0
    console.log(record)
}

async function getDiscountType(){
	const response =  await useFetch('/discount_types', 'GET',null, true);
  discountType = response
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