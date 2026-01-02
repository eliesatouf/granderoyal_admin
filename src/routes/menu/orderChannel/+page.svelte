<div in:fade  class="grid grid-col justify-center items-center">

<div class="" in:fade >
	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box  border p-3 m-2 ">
	  <legend class="fieldset-legend">OrderChannel</legend>
	  <button class="btn btn-primary btn-soft btn-sm w-[100px]"	onclick="{()=>{createOrderChannel(), showModal=true}}">	<Icon name="add" />new</button>
		 <div class="overflow-x-auto lg:hidden">
		  <table class="table table-xs  ">
		    <thead>
		      <tr>
		      	<th>Action</th>
		        <th>ID</th>
		        <th>Name</th>
		        <th>Label</th>
		        <th>Active</th>
		        <th>Updated On</th>
		      </tr>
		    </thead>
		    <tbody>
		      {#each Order as item, i}
		      	<tr><td><button class="btn btn-primary btn-soft btn-sm"	onclick="{()=>{getOneOrderChannel(item.id), showModal=true}}">edit	</button>
		      	<td>{i+1}
		      	</td>
		      	<td readonly>{item.updatedOn}</td>
		      	<td>{item.name} {item.active} <span class="{item.active? 'status status-success':'status'}"></span>
		      	</td>
		      	<td>{item.label}</td>
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
		        <th>Label</th>
		        <th>Active</th>
		        <th>Updated On</th>
		      </tr>
		    </thead>
		    <tbody>

		      {#each Order as item, i}
		      	<tr in:fade >
		      	<td><button class="btn btn-primary btn-soft btn-sm"	
		      		onclick="{()=>{getOneOrderChannel(item.id,i), showModal=true}}">edit	</button>
		      		</td>
		      	<td>{i+1}</td>
		      	<td>{item.name}</td>
		      	<td>{item.label}</td>
		      	<td> <span class="{item.active? 'status status-success':'status'}"></span></td>
		      	<td readonly>{item.updatedOn}</td>
		      	</tr>
					{/each}
					</tbody>
		  </table>  
		</div>
<!-- 
		<div class="grid mt-10" in:fade >
			{#each Order as item}
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
      <input type="text" class="input" placeholder="code of Order" 
       bind:value="{record.name}"/>

      <label class="label">Label</label>
      <input type="text" class="input" placeholder="label of Order" 
       bind:value="{record.label}"/>

      <label class="label">Updated On</label>
      <input type="text" readonly class="input" placeholder="Last update" 
       bind:value="{record.updatedOn}"/>

     <div class="row p-2">
       <input type="checkbox" bind:checked="{record.active}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       Active
     </div>
    </div>    
  <div class="flex justify-between">
   <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveOneOrderChannel())}>
    Save
  </button>

  

  <button class="btn btn-soft btn-default w-1/4" onclick={()=>showModal = false}>
    Close
  </button>

  <button class="btn btn-soft btn-error w-1/4" onclick={()=>{deleteOrderChannel(record.id), showModal = false}}>
    Delete
  </button>

</div>

  </fieldset>

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

console.log(API_URL)
let Order = $state([]);
let showModal = $state(false);
let closeModal = $state(false)
let modalOperation = $state('')
let modalContents=$state([])
let record=$state([])
let newOrderChannel=$state([])
let modalHeader=$state('')
let dishModal=$state(true)
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

onMount(() => {
  getOrderChannel()
})

async function getOrderChannel(){
  const response = await useFetch('/order_channels', 'GET',null, true);
  Order = response

}

async function getOneOrderChannel(id){
	modalOperation= 'Edit'
    const OrderData =  await useFetch( '/order_channels/'+id,'GET',null,true);
    record={...OrderData}
    modalHeader = record.name
    modalOperation="Edit OrderChannel"

}

async function saveOneOrderChannel(index){
	//console.log(record)
	let saveItem=''
	if(modalOperation=='Create Order'){
		try{
			saveItem =  await useFetch('/order_channels', 'POST',record, true);
			if(saveItem.status && saveItem.status != 200){
				toast.error("Failed to create Order",2000);
			}else{
				toast.success("Saved successfully",2000);	
	  		getOrderChannel()
	  		showModal= false
			}
	  	
	  }
	  catch(e){
	  	toast.error("Failed to create Order",2000);	
	  }
	}
	else{
		try{
  		let saveItem =  await useFetch('/order_channels/' + record.id, 'PATCH',record, true);
  		//console.log(saveItem)
	  	toast.success("Saved successfully",2000);	
	  	getOrderChannel()
	  	//showModal= false
	  }
		catch(e) {
	  	toast.error("Failed to save Order",2000);	
	  	console.log(e);
	  }
	}
  
}

async function handleSelectOrderChannel(item){
	const index = Order.findIndex(item=>item.id == record.id)
  record.imageSource = item

}

async function deleteOrderChannel(id){
  try{
  	let saveItem =  await useFetch('/order_channels/' + id, 'DELETE',null, true);
  	toast.success("Deleted successfully",2000);	
  	getOrderChannel()
  }
	catch(e) {
  	toast.error("Failed to delete Order",2000);	
  	console.log(e);
  }
}


function defineSelectedImage(item){
  fileManagerState.store.tmpImagePath =item
}

async function createOrderChannel(){
	//record.name =''
	modalOperation='Create Order'

	let allschema =  await useFetch('/docs.jsonld#/order_channels', 'GET',null, false);
	const schema = allschema.supportedClass.find(schema=>schema.title==="OrderChannel").supportedProperty
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