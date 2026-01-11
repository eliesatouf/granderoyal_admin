<div in:fade  class="grid grid-col lg:flex lg:flex-wrap justify-center ">

{#if isLoading }
<div in:fade out:fade 
class="grid grid-col justify-center items-center  
             z-1000  absolute top-1/3 left-1/2">
  <span class="loading loading-spinner loading-xl"></span>
</div>
{/if}

{#if userState.user.isAuthenticated}
<div class="static {isLoading ? 'blur-xs':''}">



<button class="btn btn-primary btn-soft btn-sm"
		      			onclick="{()=>{createOrder(), showModal=true}}">
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
		      {#each orderList as item, i}
		      	<tr>
		      		<td><a class="btn btn-primary btn-soft btn-sm" href="/orderEdit/{item.id}">edit	</a>
		      		</td>
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
		        <th>orderStatus</th>
		        <th>subtotal</th>
		        <th>deliveryFee</th>
		        <th>totalDiscount</th>
		        <th>grandTotal</th>
		        <th>customer</th>
		        <th>orderNumber</th>
		        <th>orderDate</th>
		        <th>orderChannel</th>
		        <th>discountType</th>
		        <th>discountStatus</th>
						<th>Updated On</th>
		      </tr>
		    </thead>
		    <tbody>
		    	{#if orderList.length > 0}
		      {#each orderList as item, i}
		      	<tr in:fade >
		      		<td><a class="btn btn-primary btn-soft btn-sm" href="/orderEdit/{item.id}">edit	</a>
		      		</td>
		      	<!-- <td><button class="btn btn-primary btn-soft btn-sm"	
		      		onclick="{()=>{getOrder(item.id,i), showModal=true}}">edit	</button>
		      		</td> -->
		      	<td>{item.id}</td>
		      	<td>{item.orderStatus}</td>
		      	<td>{item.subtotal}</td>
		      	<td>{item.deliveryFee}</td>     	
		      	<td>{item.totalDiscount}</td>
		      	<td>{item.grandTotal}</td>
		      	<td>{getCustomer(item.customer).name}</td>
		      	<td>{item.orderNumber}</td>
		      	<td>{item.orderDate}</td>
		      	<td>{orderChannels.find(el=>el.id == item.orderChannel)?.name ??''}</td>
		      	<td>{item?.discountStatus[0]?.type}</td>
		      	<td>{item?.discountStatus[0]?.status}</td>
		      	<td>{item.updatedOn}</td>
		      	</tr>
					{/each}
					{/if}
					</tbody>
		  </table>  
	</div>
</div>
{/if}
</div>

<Modal bind:showModal>
	{#if isLoading}
	<div class="absolute items-center z-1000 left-30 lg:left-220 top-40">
		<span class="loading loading-spinner text-secondary loading-xl w-[100px] h-100"></span>
	</div>
	{/if}

<div class="static flex justify-center items-center p-1 rounded md:rounded-lg bg-base-100 max-h-[500px] lg:max-h-[800px] lg:w-8xl overflow-auto">
	{#if isLoading }
<div in:fade out:fade 
		class="grid grid-col justify-center items-center absolute top-0  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50
             z-1000  lg:w-4xl h-800">
  <span class="loading loading-spinner loading-xl"></span>
</div>
{/if}

  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border m-3 w-[280px] lg:max-w-2xl overflow-hidden">
    <legend class="fieldset-legend">{modalOperation}: {modalHeader}</legend>
    <div class="grid m-2 p-2 lg:flex lg:gap-3">

    <div class="grid w-[250px] gap-4">
    	<div class="grid">
      <label class="label">Order#</label>
      <input readonly type="text" class="label text-[14px]" 
       bind:value="{record.orderNumber}"/>
    </div>
    <div class="grid ">
      <label class="label">Customer Name</label>
      <input type="text" readonly class="input input"
      value="{record.customer?getCustomer(record.customer).name:''}"/>
    </div>

    {#if modalOperation=='Create Order'}
    <div class="grid ">
	    <label class="label">Email</label>
	    <div class=" join">
	      	<input type="text" readonly class="input join-item"
	       				value="{record.customer?getCustomer(record.customer).email:''}"/>
	       	<button class="btn btn-soft m-0 join-item" 
	       	onclick="{()=>{showModalRecord =true,createOrder(),focusSearch('customerSearch')}}">
	       		<Icon name="search"/>
	       	</button> 
	    </div>
  	</div>
    {:else}
     <div class="grid">
      <label class="label">Email</label>
      <input type="text" class="input input"
       value="{record.customer?getCustomer(record.customer).email:''}"/>
    </div>
    {/if}


    <div class="grid">
      {#if modalOperation == "Create Order"}
      <label type="label" class="label">Order channel </label>
        <select class="select select" bind:value={record.orderChannel}>
          {#each orderChannels as channel}
            <option value={JSON.stringify(channel.id)}>{channel.name}</option>
          {/each}
      	</select>
      {:else if orderChannels.length > 0}
      	<label class="label">Order channel</label>
	      <input type="text" class="input" 
        value={orderChannels.find(el => el.id === Number(record?.orderChannel))?.name ?? ''}
       readonly />
      {/if}
    </div>	
    <div class="grid">
      <label type="label" class="label" >Status</label>
      <select class="select select" bind:value={record.orderStatus}>
      {#if record.orderStatus}
       	{#each statusList as stat}
          <option value="{JSON.stringify(stat.id)}">{stat.name}</option>
       	{/each}
      {/if}
      </select>
    </div>

    <div class="grid">
      <label type="label" class="label" >paymentTypes</label>
      <select class="select select" bind:value={record.paymentMethod}>
       	{#each paymentTypes as type}
          <option value="{JSON.stringify(type.id)}">{type.name}</option>
       	{/each}
      </select>
    </div>
    <div class="grid">
	    <select class="select" bind:value={record.orderType}>
			  <option>Delivery</option>
			  <option>Pickup</option>
			</select>
		</div>

    


    	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-1 w-[250px] ">
    		<legend class="fieldset-legend">Summary</legend>
    		<div class="grid m-2 p-2 lg:flex lg:gap-3">
    			{#if record.discountStatus}
    				{#each Object.keys(record.discountStatus) as key}
    					{#if key =="summary"}
    					<ul class="text-[14px]">
    							<li  class="list-row ">Base subtotal: {JSON.stringify(record.discountStatus["baseSubtotal"])}</li>
    							<li  class="list-row ">Final subtotal: {JSON.stringify(record.discountStatus[key]["finalSubtotal"])}</li>
    							<li  class="list-row ">Total discount: {JSON.stringify(record.discountStatus[key]["totalDiscount"])}</li>
    					</ul>
    					{/if}
    				{/each}
    			{/if}

    		</div>
    	</fieldset>

    	</div>

    	{#if modalOperation=='Create Order'}
    	<div class="grid  w-[250px]">
    	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border h-98 ">
    		<legend class="fieldset-legend">Order items</legend>
    			<button class="btn btn-soft m-0 " 
	       		onclick="{()=>{showModalSearch =true,focusSearch('dishSearch')}}">
	       		Dishes
	       	</button>

	       	<button class="btn btn-soft m-0 " 
	       		onclick="{()=>{showBundleModalSearch =true,focusSearch('bundleSearch')}}">
	       		Bundles
	       	</button> 

    	<ol class="list-decimal list-inside text-[14px]">
    		{#each record.orderItem as item}
    		{#if getDishName(item)}
    			<li>{getDishName(item)} x {item.quantity}</li>
    		{/if}
    		{/each}

    		{#each record.orderItem as item}
    		{#if getBundleName(item)}
    			<li>{getBundleName(item)} x {item.quantity}</li>
    		{/if}
    		{/each}
    	</ol>
    	</fieldset>
      </div>

      {/if}

    {#if modalOperation!='Create Order'}
    <div class="grid lg:w-4xl lg:flex">
    	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border h-98 ">
    		<legend class="fieldset-legend">Items</legend>
    		<div class="grid  w-[250px] lg:w-3xl lg:flex h-88">
    			{#if record.discountStatus}
    		
    			{#each Object.keys(record.discountStatus) as key}


    			{#if key !="summary"}
    
    			<div class="  m-3">
    			<ul class="grid  text-[14px] ">

    					{#if record.discountStatus[key].type == "bundle"}
    						<li>type: {record.discountStatus[key].type}</li>
    						<li>finalPrice: {record.discountStatus[key].finalPrice}</li>

    					{:else}

    					<li class="">{record.discountStatus[key].dish} x {record.discountStatus[key].quantity}</li>
   					<li>type: {record.discountStatus[key].type}</li>
    					<li>originalPrice: {record.discountStatus[key].originalPrice}</li>
    					<li>finalPrice: {record.discountStatus[key].finalPrice}</li>
    					<li>discountValue: {record.discountStatus[key].discountValue}</li>
    					<li>discountType: {record.discountStatus[key].discountType}</li>
    					<li>minOrderAmount: {record.discountStatus[key].minOrderAmount}</li>
    					<li>orderSubtotal: {record.discountStatus[key].orderSubtotal}</li>
    					<li>discountEligible: {record.discountStatus[key].discountEligible}</li>
    					<li>discountApplied: {record.discountStatus[key].discountApplied}</li>
    					<li>status: {record.discountStatus[key].status}</li>
    					{/if}
    			</ul>
    			</div>
    			{/if}
    			{/each}
    			
    			{/if}

    		</div>
    	</fieldset>
    </div>  
    {/if}



</div>

<div class="flex justify-end w-xs">
		   <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveOneOrder())}>
		    Save
		  	</button>
			  <button class="btn btn-soft btn-default w-1/4" onclick={()=>showModal = false}>
			    Close
			  </button>
  		</div>
  </fieldset>

</div>
<Toast/>
</Modal>


<ModalEditRecord bind:showModalRecord>
	{#if isLoading}
	<div class="absolute items-center z-1000 left-30 lg:left-220 top-40">
		<span class="loading loading-spinner text-secondary loading-xl w-[100px] h-100"></span>
	</div>
	{/if}
<div class="max-h-200">
	<label class="input input-bordered">
  <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input  id="customerSearch" type="search" class="grow" placeholder="Search" 
  	bind:value="{searchTerm}" onchange="{()=>{findCustomer()}}"/>

</label>
</div>

	<div class="flex gap-1 mt-3">
		<ul class="list p-3">
			{#each searchResults as customer}
			<li class="list-row p-1 m-1 gap-1" >
				<button class="btn btn-sm btn-outline m-0" onclick="{()=>{selectEmail(customer),showModalRecord=false}}">
					{customer.name} 
				</button>
				<button class="btn btn-sm btn-outline m-0" onclick="{()=>{selectEmail(customer),showModalRecord=false}}">
			   	{customer.email} 
				</button>
			</li>
			{/each}
		</ul>	
	</div>
<Toast/>
</ModalEditRecord>

<ModalSearch bind:showModalSearch>

	{#snippet children()}
		{#if isLoading}
	<div class="absolute items-center z-1000 left-30 lg:left-220 top-40">
		<span class="loading loading-spinner text-secondary loading-xl w-[100px] h-100"></span>
	</div>
	{/if}
<div class="max-h-200">
	<label class="input input-bordered">
  <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input  type="search" id="dishSearch" class="grow" placeholder="Search" 
  	bind:value="{dishTerm}" onkeydown="{()=>{findDish()}}"/>
</label>

<div class="flex gap-1 mt-3 h-56">

		<ul class="list p-3  overflow-auto">
			{#each dishList as dish}
			<li class="list-row justify-between" >

				<div class="flex p-1">
					<div class="badge p-1 m-1" >
						{dish.name} 
					</div>

					<button disabled="{dish.status!='available'}" 
						class="btn btn-sm btn-soft btn-square btn-primary"
						onclick="{()=>{addDish(dish)}}">+
					</button>

					<button disabled="{dish.status!='available'}" class="btn btn-sm btn-soft btn-square btn-secondary">-
					</button>
				</div>

				<div class="flex justify-end">
				{#if dish.discountedPrice}
				<label class="m-1">{dish.discountedPrice}</label>
				<label class="line-through  m-1">{dish.price}</label>
				{:else}
				<label class=" m-1">{dish.price}</label>
				{/if}

				{#if dish.promoStatus.active && dish.promoStatus.isBogo}
				<div class="badge badge-success m-1">BOGO</div>
				{/if}
			</div>

			</li>
			{/each}
		</ul>	
	</div>

</div>
<Toast/>
{/snippet}
</ModalSearch>


<ModalBundleSearch bind:showBundleModalSearch>
	{#snippet children()}
<div class="max-h-200">
	<label class="input input-bordered">
  <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input  type="search" id="bundleSearch" class="grow" placeholder="Search" 
  	bind:value="{bundleTerm}" onkeydown="{()=>{findBundle()}}"/>
</label>

<div class="flex gap-1 mt-3 h-56">

		<ul class="list p-3  overflow-auto">
			{#each offerList as offer}
			<li class="list-row justify-between" >

				<div class="flex p-1">
					<div class="badge p-1 m-1" >
						{offer.name} 
					</div>

					<button disabled="{!offer.active}" 
						class="btn btn-sm btn-soft btn-square btn-primary"
						onclick="{()=>{addBundle(offer.bundle)}}">+
					</button>

					<button disabled="{offer.status!='available'}" class="btn btn-sm btn-soft btn-square btn-secondary">-
					</button>
				</div>

				<div class="flex justify-end">
				{#if offer.discountedPrice}
				<label class="m-1">{offer.discountedPrice}</label>
				<label class="line-through  m-1">{offer.price}</label>
				{:else}
				<label class=" m-1">{offer.price}</label>
				{/if}

			</div>

			</li>
			{/each}
		</ul>	
	</div>

</div>
{/snippet}
</ModalBundleSearch>



<script>
import { onMount } from 'svelte';
import { fade, scale,fly } from 'svelte/transition';
import useFetch from '$lib/services/useFetch'
import { toast } from '$lib/stores/toast';
import Toast from '$lib/components/Toast.svelte';
import Filemanager from '$lib/components/Filemanager.svelte';
import Modal from '$lib/components/Modal.svelte';
import ModalEditRecord from '$lib/components/ModalEditRecord.svelte';
import ModalSearch from '$lib/components/ModalSearch.svelte';
import ModalBundleSearch from '$lib/components/BundleModalSearch.svelte';
import Icon from '$lib/components/Icon.svelte'
import fileManagerState from '$lib/stores/fileManagerState.svelte.js'
import dayjs from 'dayjs';
import { goto } from '$app/navigation';
import userState from '$lib/stores/user.svelte.js';
import { page } from '$app/stores';
import { afterNavigate} from '$app/navigation';
import { jwtDecode } from 'jwt-decode';
let {data} = $props();
let admin =$state(false)


let showModal = $state(false);
let closeModal = $state(false);
let modalOperation = $state('');
let modalContents=$state([]);
let record=$state([]);
let orderList = $state([])
let customerList = $state([])
let orderChannels = $state([])
let modalHeader = $state()
let statusList = $state()
let loading = $state(false)
let orgStatusList = $state()
let orgOrderChannels = $state()
let showModalRecord = $state(false)
let showModalSearch = $state(false)
let searchTerm = $state('');
let searchResults = $state([]);
let menuList = $state([])
let dishTerm = $state('')
let dishList = $state([])
let offerList = $state()
let bundleList = $state()
let bundleTerm = $state('')
let showBundleModalSearch = $state(false)
let timeoutId;
let isLoading = $state(false)
let paymentTypes= $state([])

dishList = data.dishList
statusList = data.statusList
orgStatusList = statusList
customerList =data.customerList
orderList = data.orderList
offerList = data.offerList
paymentTypes = data.paymentTypes
orderChannels = data.orderChannels
orgOrderChannels= data.orderChannels

const API_URL = import.meta.env.VITE_API_URL;

onMount(() => {
	//getStatusList()
	//getMenu()
	//getOfferList()
	// getCustomerList()
  // getOrderList()


})


function getDishName(item){
	let x = dishList.find(el=>el.id == item.dish?.split('/')[3])
  if(x){
		return x.name
	}
	return null
}

function getBundleName(item){
	if(item.bundle){
		let x = offerList.find(el=>el.id == item.bundle?.split('/')[3])
	  if(x){
			return x.name
		}
	}
	
	return null
}

function selectEmail(customer){

	record.customer = `/api/customers/${customer.id}`
	record.email = customer.email

	//console.log(record)
}

function findCustomer(term){
	if(!term){
		return 0
	}
	return emailSearch(term)
}

function debouncedSearch(term) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    if (term.length > 3) {
      searchResults = await findCustomer(term);
    }
  }, 300);
}
  
$effect(() => {
  debouncedSearch(searchTerm);
  
});

function focusSearch(id){
	setTimeout(async () => {
    document.getElementById(id).focus();
  }, 300);
}

async function emailSearch(term){
	isLoading=true
	const response = await useFetch(`/customers?name=${term}`, 'GET',null, true);
	if(response.length == 0){
		const response = await useFetch(`/customers?telephone=${term}`, 'GET',null, true);
		if(response.length > 0) {
			isLoading=false
			return response
		}
	}
	if(response.length == 0){
		const response = await useFetch(`/customers?email=${term}`, 'GET',null, true);
		if(response.length > 0) {
			isLoading=false
			return response
		}
	}
	isLoading=false
	return response
	
}

// async function getMenu(){
// 	isLoading=true
// 	const response = await useFetch(`/dishes?type=dining&active=true`, 'GET',null, false);
//     menuList = response
//     dishList=menuList
//     isLoading=false
// }

// async function getOfferList(){
// 	isLoading=true
// 	//const response = await useFetch('/offers?active=true&type=/api/offerTypes/3', 'GET',null, false);
// 	const response = await useFetch('/offers', 'GET',null, false);
//     offerList	 = response
//     isLoading=false
//     //console.log(response)
// }

// async function getBundles(){
// 	isLoading=true
// 	const response = await useFetch(`/offers?type=dining&active=true`, 'GET',null, false);
//     menuList = response
//     isLoading=false
// }

function findDish(){
	//if(dishTerm.length < 3) return ''
	let res =  menuList.filter(el=>el.name.toLowerCase().includes(dishTerm)? el : null)
	dishList = res
}

function findBundle(){
	//if(bundleTerm.length < 3) return ''
	let res =  offerList.filter(el=>el.name.toLowerCase().includes(bundleTerm)? el : null)
	bundleList = res
}

function addDish(dish){
	let di= record.orderItem.find(el=>parseInt(el.dish.split('/')[3]) == dish.id) 
	if(!di){
		record.orderItem.push(
		{
			"dish":`/api/dishes/${dish.id}`,
			"quantity": 1,
			"unitPrice":dish.price
		})
	}else{
		di.quantity+=1
	}
}

function removeDish(){
	
}

function addBundle(bundle){
	//console.log(bundle)
	let di= record.orderItem.find(el=>el.bundle == bundle) 
	//console.log(di?.quantity)
	if(!di){
		record.orderItem.push(
		{
			"bundle":`${bundle}`,
			"quantity": 1,
			"unitPrice":bundle.price
		})
	}else{
		di.quantity+=1
	}
}

// async function getStatusList(){
// 	isLoading=true
//   const response = await useFetch('/order_statuses?active=true', 'GET',null, true);
//   statusList = response
//   orgStatusList = [...statusList]
//   getChannels()
//   isLoading=false
// }

// async function getChannels(){
// 	isLoading=true
//   const response = await useFetch('/order_channels', 'GET',null, true);
//   orderChannels = response
//   orgOrderChannels = [...orderChannels]
//   //getCustomerList()
//   isLoading=false
//  // console.log('orderChannels', orderChannels)
// }

async function getOrder(id){
	statusList =orgStatusList
	//orderChannels = orgOrderChannels
	modalOperation='Edit Order'
	isLoading=true
  const response = await useFetch(`/orders/${id}`, 'GET',null, true);
  record = response
  modalHeader =record.orderNumber
  isLoading=false
 // console.log(response)
}

// async function getCustomerList(){
// 	isLoading=true
//   const response = await useFetch('/customers', 'GET',null, true);
//   customerList = response
//   getOrderList()
//   isLoading=false
//   //console.log(customerList)
// }

// async function getOrderList(){
// 	isLoading=true
//   const response = await useFetch('/orders', 'GET',null, true);
//   orderList = response
//   isLoading=false
//   console.log('orderList', orderList)
// }

function getCustomer(iri){
	const id = iri.split('/')[3]
	let customer = customerList.find(el =>el.id == id)
	return customer

}

function getOrderStatusName(id){
	let status = statusList.find(el => el.id == id)
	return status.name
}


async function saveOneOrder(){
//	console.log(record)
	//return 0
	let saveItem=''
	if(modalOperation=='Create Order'){
		//console.log('POST')

		try{
			isLoading=true
			saveItem =  await useFetch('/orders', 'POST',record, true);
			if(saveItem.status && saveItem.status != 200){
				toast.error("Failed to create Order",2000);
			}else{
				toast.success("Created successfully",2000);	
	  		showModal= false
			}
	  	isLoading=false
	  }
	  catch(e){
	  	toast.error("Failed to create Order",2000);	
	  }
	}
	else{
		console.log('PATCH')
		try{
			//console.log(record)
			
			//record.orderItem =[]
			delete record.orderItem
			isLoading=true
  		let saveItem =  await useFetch('/orders/' + record.id, 'PATCH',record, true);
  		//console.log(saveItem)
  		isLoading=false
	  	toast.success("Saved successfully",2000);	
	  	//showModal= false
	  }
		catch(e) {
	  	toast.error("Failed to save Order",2000);	
	  	console.log(e);
	  }
	}
}


async function createOrder(){
	
	statusList = statusList.filter(el=>el.name != 'confirmed'?el:'')
	orderChannels = orderChannels.filter(el=>el.name != 'web'?el:'')

  modalHeader='Create Order'
	modalOperation='Create Order'

	isLoading=true
	let allschema =  await useFetch('/docs.jsonld#', 'GET',null, false);
	const schema = allschema.supportedClass.find(schema=>schema.title==="Order").supportedProperty
	const properties = schema.map(item => [item.title,item.property.range?.split(':')[1]]);
	isLoading=false
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
    record.orderItem=[]
    record.orderChannel ="3"
    record.orderStatus ="1"
    record.deliveryAddress=""
    record.deliveryFee="0"

   // console.log(record)
}


</script>




