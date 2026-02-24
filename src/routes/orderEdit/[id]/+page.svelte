<div in:fade  class="grid grid-col lg:flex lg:flex-wrap justify-center ">
{#if userState.user.isAuthenticated}
<div class="static m-3">

	{#if loading }
	<div in:fade out:fade 
	class="grid grid-col justify-center items-center absolute top-0  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50
	             z-1000  w-full h-800">
	  <span class="loading loading-spinner loading-xl"></span>
	</div>
	{/if}

	{#if isLoading}
	<div class="absolute items-center z-1000 left-30 lg:left-220 top-40">
		<span class="loading loading-spinner text-secondary loading-xl w-[100px] h-100"></span>
	</div>
	{/if}

	<div class="static flex justify-center items-center p-1 rounded md:rounded-lg bg-base-100 ">
	{#if loading }
		<div in:fade out:fade 
			class="grid grid-col justify-center items-center absolute top-0  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50
             z-1000  ">
  		<span class="loading loading-spinner loading-xl"></span>
		</div>
	{/if}

  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border m-3 ">
    <legend class="fieldset-legend">{modalOperation}: {modalHeader}</legend>
    <div class="grid m-2 p-2 lg:flex lg:gap-3 ">

    <div class="grid place-content-start gap-2 ">
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

    <div class="grid ">
      <label class="label">Customer Email</label>
      <input type="text" readonly class="input input"
      value="{record.customer?getCustomer(record.customer).email:''}"/>
    </div>

    <div class="grid">
      	<label class="label">Order channel</label>
	      <input type="text" class="input" 
       value={orderChannels?.find(el => el.id === Number(record.orderChannel))?.name ?? ''}
       readonly />

    </div>	
    <div class="grid">
      <label type="label" class="label" >Status</label>
      <select class="select select" bind:value={record.orderStatus}>
       	{#each statusList as stat}
          <option value="{JSON.stringify(stat.id)}">{stat.name}</option>
       	{/each}
      </select>
    </div>

    <div class="grid">
      <label type="label" class="label" >Payment Type</label>
      <select class="select select" bind:value={record.paymentMethod}>
       	{#each paymentTypes as type}
          <option value="{JSON.stringify(type.id)}">{type.name}</option>
       	{/each}
      </select>
    </div>

     <div class="grid">
      <label type="label" class="label" >Order Type</label>
		    <select class="select" bind:value={record.orderType}>
		  		<option>delivery</option>
		  		<option>pickup</option>
		  		<option>advanced</option>
				</select>
			</div>

			{#if record.isAdvancedOrder}
				<div class="grid mt-5">
		      <label class="label font-bold text-info">Advanced Order</label>
       		 <div class="space-y-4 mb-6">
		        <div class="form-control">
		          <label class="label">
		            <span class="label-text">Pickup Date</span>
		          </label>
		          <input 
		            type="date" 
		            bind:value={selectedDate}
		            min={minDate}
		            max={maxDate}
		            class="input input-bordered w-full"
		          />
		        </div>
		        <div class="form-control">
		          <label class="label">
		            <span class="label-text">Pickup Time</span>
		          </label>
		          <input 
		            type="time" 
		            bind:value={selectedTime}
		            class="input input-bordered w-full"
		          />
		        </div>
		      </div>

		    </div>
			{/if}

    	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-1  ">
    		<legend class="fieldset-legend">Summary</legend>
    		<div class="grid m-2 p-2 lg:flex lg:gap-3">
    			{#if record.discountStatus}
    				{#each Object.keys(record.discountStatus) as key}
    					{#if key =="summary"}
    					<ul class="text-[14px]">
    							<li  class="list-row ">Base Subtotal: {JSON.stringify(record.discountStatus[key]["baseSubtotal"])}</li>
    							<li  class="list-row font-bold">Final Grand Total: {JSON.stringify(record.discountStatus[key]["grandTotal"])}</li>
    							<li  class="list-row ">Total Discount: {JSON.stringify(record.discountStatus[key]["totalDiscount"])}</li>
    					</ul>
    					{/if}
    				{/each}
    			{/if}

    			{#if orderPreviewResult}
    					<ul class="text-[14px]">
    							<li  class="list-row ">Base subtotal: {orderPreviewResult.calculationDetails.summary.baseSubtotal}</li>
    							<li  class="list-row ">Final grandTotal: {orderPreviewResult.calculationDetails.summary.grandTotal}</li>
    							<li  class="list-row ">Total discount: {orderPreviewResult.calculationDetails.summary.totalDiscount}</li>
    					</ul>
    			{/if}

    		</div>
    	</fieldset>
    	<div class="flex gap-5 w-xs">
		   <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveOneOrder())}>
		    Save
		  	</button>
			  <button class="btn btn-soft btn-default w-1/4" onclick={()=> { previousPath == '/order/order_monitor' ? goto(`${base}/order/order_monitor`) : goto(`${base}/order`)}}>
			    Close
			  </button>
  		</div>

    	</div>

<!--     	{#if modalOperation=='Create Order'}
    	<div class="grid  w-[250px]">
    	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border ">
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

      {/if} -->

    <div class="grid">

    	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border  ">
    		<div class="flex gap-2">
    		<button class="btn btn-primary btn-soft m-0 " 
	       		onclick="{()=>{showModalSearch =true,focusSearch('dishSearch')}}">
	       		Items
	       	</button>

	       	<button class="btn btn-secondary btn-soft m-0 " 
	       		onclick="{()=>{showBundleModalSearch =true,focusSearch('bundleSearch')}}">
	       		Bundles
	       	</button> 
	       </div>

    		<legend class="fieldset-legend">Items <button class="btn btn-info btn-sm btn-outline" onclick={()=>{detailedView=!detailedView}}>
    			Show details </button></legend>

    		<div class="grid lg:grid-cols-3  ">

    			{#if record.discountStatus}
    			{#each Object.keys(record.discountStatus) as key,index}


    			{#if key !="summary" && record.orderItem}
    			
    			<div class="m-3">
    			<ul class="grid  text-[14px] ">

    		
    					{#if record.discountStatus[key].type == "bundle"}

    						<li><div class="badge badge-rounded badge-info badge-outline">{index+1}</div> 
    						  <span class="font-bold">{record.discountStatus[key].type.toUpperCase()}: {record.discountStatus[key].bundle} x {record.discountStatus[key].quantity}
    						  </span>
    						</li>
    						<li>finalPrice: {record.discountStatus[key].finalPrice}
    						
								<button 
									class="btn btn-soft btn-square btn-error"
									onclick="{()=>{removeBundle(record.discountStatus[key])}}"><Icon name="delete"/>
								</button>
							

								</li>

    					{:else}	

    					<li class=" font-bold"><div class="badge badge-rounded badge-info badge-outline">{index+1}</div> 
    					{record.discountStatus[key].dish} - {record.orderItem[key]?.variantName}
    					 x {record.discountStatus[key].quantity}</li>
    					
    					
   						<li>type: {record.discountStatus[key].type}
   						<button  
								class="btn btn-soft btn-square btn-warning"
								onclick="{()=>{deccreaseQty(record.orderItem[key])}}">-
							</button>
							<button 
								class="btn btn-soft btn-square btn-success"
								onclick="{()=>{increaseQty(record.orderItem[key])}}">+
							</button>
							<button 
								class="btn btn-soft btn-square btn-error"
								onclick="{()=>{removeDish(record.orderItem[key])}}"><Icon name="delete"/>
							</button>
						</li>

    					<li>originalPrice: {record.discountStatus[key].originalPrice}</li>
    					<li>finalPrice: {record.discountStatus[key].finalPrice}</li>
    					<li>
    						{#each record.orderItem as item}
    							{#each item.lineModifiers as element}
    								{element.name} {element.price}
    							{/each}
    						{/each}
    					</li>
    					<li>
    					status: <span class="{record.discountStatus[key].status ==='free_item' ? 'text-secondary': 'text-primary'}">{record.discountStatus[key].status}</span></li>

    					{#if detailedView}
    					<li>discountValue: {record.discountStatus[key].discountValue}</li>
    					<li>discountType: {record.discountStatus[key].discountType}</li>
    					<li>minOrderAmount: {record.discountStatus[key].minOrderAmount}</li>
    					<li>orderSubtotal: {record.discountStatus[key].orderSubtotal}</li>
    					<li>discountEligible: {record.discountStatus[key].discountEligible}</li>
    					<li>discountApplied: {record.discountStatus[key].discountApplied}</li>
    					
    					{/if}
    					{/if}
    			</ul>
    			</div>
    			{/if}
    			{/each}
    			
    			{/if}

    		</div>
    	</fieldset>
    </div>  
</div>


  </fieldset>

</div>
</div>
{/if}
</div>

<Toaster richColors position="top-center" closeButton duration={10000} />



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
<Toaster richColors position="top-center" closeButton duration={10000} />
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

<div class="flex gap-1 mt-3 h-56 ">

		<ul class="list overflow-auto">
			{#each dishListSearch as dish}
			<li class="list list-row justify-between gap-1" >
				<div>
				{#if dish.variants.length == 0}
				<div class="flex my-1">
					<button class="list-col-grow btn btn-primary btn-sm" 
					onclick="{()=>{addDish(dish)}}">
						{dish.name} 
					</button>
				</div>
				{:else}
				<div class="flex my-1">
					<div class="list-col-grow badge badge-primary badge-soft" >
						{dish.name} 
					</div>
				</div>
				{/if}

				<div class="flex gap-1">

					<button disabled="{dish.status!='available'}" 
					class="btn btn-sm btn-soft btn-square btn-secondary"
					onclick="{()=>{deccreaseQty(dish)}}">-
					</button>

					{#if dish.variants.length > 0}
						{#each  dish.variants as variant}
							<button  
							class="btn btn-sm btn-square btn-accent"
							onclick="{()=>{addDish(dish, variant)}}"> {variant.size[0].toUpperCase()}
							</button>
							{/each}
					{/if}

					{#if dish.loyverseModifiersIds.length > 0}
					<div class="tooltip" data-tip="Add On">
						<button 
							class="btn btn-sm btn-soft btn-square btn-warning {userState.user.order.orderItem.find(el =>el.dish.split('/')[3] === dish.id) ? '': 'btn-disabled	'}"
							onclick="{()=>{selectedItem = dish, showModalAddon=true}}">
							<Icon name="family_star"/>
						</button>
					</div>
					{/if}

					{#if dish.discountedPrice}
						<label class="m-1">{dish.discountedPrice}</label>
						<label class="line-through  m-1">{dish.price}</label>
						{:else}
						<label class="">{dish.price}</label>
						{/if}

						{#if dish.promoStatus.active && dish.promoStatus.isBogo}
						<div class="badge badge-success m-1">BOGO</div>
					{/if}
				
			</div>
		</div>
			</li>
			{/each}
		</ul>	
	</div>

</div>
<Toaster richColors position="top-center" closeButton duration={10000} />
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

<div class="flex gap-1 mt-3 h-56 ">

		<ul class="list p-3 w-full overflow-auto">
			{#each offerList as offer}
			<li class="list-row justify-between" >
				<div class="flex p-1 gap-1">
						<button disabled="{!offer.active}" 
						class="btn btn-primary btn-sm"
						onclick="{()=>{addBundle(offer.bundle)}}">+
						{offer.name} 
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
import { afterNavigate,beforeNavigate } from '$app/navigation';
import { jwtDecode } from 'jwt-decode';
import { base } from '$app/paths';
import { Toaster, toast } from 'svelte-sonner';
import  utc from "dayjs/plugin/utc.js";


let {data} = $props();

let preLoad = data.preLoad

let recordId = $derived($page.url.searchParams.get('id'));
let previousPath = $state();


let showModal = $state(false);
let closeModal = $state(false);
let modalOperation = $state('');
let modalContents=$state([]);
let record=$state([]);

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
let IdParameter= $state()
let detailedView = $state(false)
//let orderList = $state()
let paymentTypes= $state()
let dishListSearch = $state()
let admin =$state(false)
let orderPreviewResult = $state()

let selectedDate = $state()
let selectedTime = $state()
let minDate = $state()
let maxDate = $state()

dishList = preLoad.dishList
statusList = preLoad.statusList
orgStatusList = statusList
customerList =preLoad.customerList
//orderList = data.orderList
offerList = preLoad.offerList
paymentTypes = preLoad.paymentTypes
orderChannels = preLoad.orderChannels
orgOrderChannels= preLoad.orderChannels
dishListSearch = data.preLoad.dishList

menuList = dishList

const API_URL = import.meta.env.VITE_API_URL;

afterNavigate(({ to, from }) => {
		if(from){
			previousPath = from.route.id
		}
		
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
	IdParameter =  $page.url.pathname.split('/').slice(-1).pop();

	getOrder()



	// getCustomerList()
	// getStatusList()
	// getMenu()
	// getOfferList()

})

function getDishName(item){
	let x = dishList.find(el=>el.id == item.dish?.split('/')[3])
  if(x){
		return x.name
	}
	return null
}

function getBundleName(item){
	console.log('getBundleName', item)
	if(item.bundle){
		let x = offerList.find(el=>el.id == item.bundle?.split('/')[3])
	  if(x){
			return x.name
		}
	}
	
	return null
}




// function selectEmail(customer){
// 	// console.log('customer', customer)
// 	// record.customer = `/api/customers/${customer.id}`
// 	// record.email = customer.email
// 	userState.user.customerId = `/api/customers/${customer.id}`
// 	userState.user.order.customer = `/api/customers/${customer.id}`
// 	userState.user.email = customer.email
// 	userState.user.name = customer.name
// }

// function findCustomer(term){
// 	if(!term){
// 		return 0
// 	}
// 	return emailSearch(term)
// }

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

// async function emailSearch(name){
// //	isLoading= true
// 	const response = await useFetch(`/customers?name=${name}`, 'GET',null, true);
// 	return response

// }

// async function getMenu(){
// 	isLoading= true
// 	const response = await useFetch(`/dishes?type=dining&active=true`, 'GET',null, false);
//     menuList = response
//     isLoading= false
// }

// async function getOfferList(){
// 	isLoading= true
// 	//const response = await useFetch('/offers?active=true&type=/api/offerTypes/3', 'GET',null, false);
// 	const response = await useFetch('/offers', 'GET',null, false);
//     offerList	 = response
//     //console.log(response)
//     isLoading= false

// }

// async function getBundles(){
// 	const response = await useFetch(`/offers?type=dining&active=true`, 'GET',null, false);
//     menuList = response
// }


function findDish(){
	dishListSearch = dishList

	let res =  dishListSearch.filter(el=>el.name.toLowerCase().includes( dishTerm)? el : null)
	dishListSearch = res
}

// function findDish(){
// 	if(dishTerm.length < 3) return ''
// 	let res =  menuList.filter(el=>el.name.toLowerCase().includes(dishTerm)? el : null)
// 	dishList = res
// }

function findBundle(){
	if(bundleTerm.length < 3) return ''
	let res =  offerList.filter(el=>el.name.toLowerCase().includes(bundleTerm)? el : null)
	bundleList = res
}

function addDish(dish, variant){

	if(variant){
      dish.price = variant.price
    }
    //let foundItem = userState.user.order.dishes.find(el => el.id == item.id )
    let foundItem = userState.user.order.dishes.find(el => el.id == dish.id &&  el.variantId == variant.id)

    if(foundItem){
      toast.warning("This item is in cart already."); 
      return 0;
    }

    let variantId=null
    if(variant){
      variantId = variant.id
    }

		record.orderItem.push(
		{
			// "dish":`/api/dishes/${dish.id}`,
			// "quantity": 1,
			// "unitPrice":dish.price

			"dish":`/api/dishes/${dish.id}`,
			"quantity":1,
			"unitPrice":dish.discountedPrice,
			"variantId":variantId,
			"category":dish.category,
			"loyverseModifiersIds":dish.loyverseModifiersIds
		})

		console.log('addDish record.orderItem', record.orderItem)
		saveOneOrder()
	}


function removeDish(dish) {
	console.log('removeDish',dish)
	const filtered = record.orderItem.filter(el => el.id != dish.id && el.variantId != dish.variantId)
	const plainItems = JSON.parse(JSON.stringify(filtered));
	console.log('plainItems', plainItems)
	record.orderItem=plainItems
	saveOneOrder()
}

async function increaseQty(item){

	if(!item.pbundle){ 
		record.orderItem.find(el => el.dish == item.dish && el.variantId == item.variantId).quantity+=1;
	}else{
		const bundle =  urecord.orderItem.find(el=>el.bundle?.split('/')[3] == item.id)
		bundle.quantity+=1
	}
	saveOneOrder()
}

async function deccreaseQty(item){

	if(!item.pbundle){ 
		const qty = record.orderItem.find(el => el.dish == item.dish && el.variantId == item.variantId).quantity
		console.log('qty', qty)
		if(qty > 1){
			record.orderItem.find(el => el.dish == item.dish && el.variantId == item.variantId).quantity-=1;
		}
		
	}else{
		const bundle =  urecord.orderItem.find(el=>el.bundle?.split('/')[3] == item.id)
		bundle.quantity-=1
	}
	saveOneOrder()
}


function addBundle(bundle){
console.log('addBundle',bundle)
console.log('record.orderItem', record.orderItem)
	let di= record.orderItem.find(el=>el.bundle?.id == parseInt(bundle.split('/')[3])) 
	console.log('di', di)
	//return 0

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
	saveOneOrder()
}

function removeBundle(bundle){
	console.log('removeBundle', bundle)
	const filtered = record.orderItem.filter(el => el.bundle?.id != bundle.bundleId)
	const plainItems = JSON.parse(JSON.stringify(filtered));
	record.orderItem=plainItems
	saveOneOrder()
}

// async function getStatusList(){
//   const response = await useFetch('/order_statuses?active=true', 'GET',null, true);
//   statusList = response
//   orgStatusList = [...statusList]
  	
//  getChannels()
// }

// async function getChannels(){
//   const response = await useFetch('/order_channels', 'GET',null, true);
//   orderChannels = response
//   orgOrderChannels = [...orderChannels]
//   getOrder()
// }

async function getOrder(){
	
	isLoading= true
	statusList =orgStatusList
	//statusList = statusList?.filter(el=>el.name != 'new'?el:'')

	orderChannels = orgOrderChannels
	modalOperation='Edit Order'
  const response = await useFetch(`/orders/${IdParameter}`, 'GET',null, true);
  record = response
  modalHeader =record.orderNumber
  console.log('response', response)

  if(response.isAdvancedOrder){
  	 const today = new Date();
    //tomorrow.setDate(tomorrow.getDate() + 1);
  	const selectedDateObj = new Date(response.advancedOrder.scheduledFor)
    selectedDate = dayjs(selectedDateObj).format('YYYY-MM-DD');
    console.log('selectedDateObj', selectedDateObj)
    selectedTime = dayjs(selectedDateObj).format('HH:mm')

    console.log('selectedTime', response.advancedOrder.scheduledFor)

    // Set min date to today
    const min = new Date();
    min.setDate(min.getDate());
    minDate = min.toISOString().split('T')[0];
    
    // Set max date to 30 days from now (adjust as needed)
    const max = new Date();
    max.setDate(max.getDate() + 6);
    maxDate = max.toISOString().split('T')[0];
    
  }
  isLoading= false
}



function getCustomer(iri){
	const id = iri.split('/')[3]
	let customer = customerList?.find(el =>el.id == id)
	if(customer){return customer }
		return 0;

}

function getOrderStatusName(id){
	let status = statusList.find(el => el.id == parseInt(id))
}

function getOrderPaymentName(id){
	let payment = paymentList.find(el => el.id == parseInt(id))
}


async function saveOneOrder(){
	console.log('saveOneOrder', record)
	if(record.isAdvancedOrder){

		dayjs.extend(utc)
		let a = dayjs.utc()

		const scheduledFor = dayjs.utc(`${selectedDate} ${selectedTime}`)
		record.advancedOrder = {
      scheduledFor: scheduledFor
    };

	}
	//return 0
	isLoading= true
	//return 0
	let saveItem=''
		//console.log('PATCH')
		try{
			//console.log(record)
			isLoading= true
			//record.orderItem =[]
			//delete record.orderItem
			console.log('record on saving', record)
  		let saveItem =  await useFetch('/orders/' + record.id, 'PATCH',record, true);
  		console.log('saveItem', saveItem)
	  	toast.success("Saved successfully");	
	  	record = saveItem
	  	isLoading= false
	  	//showModal= false
	  }
		catch(e) {
	  	toast.error("Failed to save Order");	
	  	console.log(e);
	  	isLoading= false
	  }
	
}


// async function createOrder(){
	
// 	statusList = statusList.filter(el=>el.name != 'confirmed'?el:'')
// 	console.log('orderChannels', orderChannels)
// 	return 0
// 	if(orderChannels){

// 	}  orderChannels.filter(el=>el.name != 'web'?el:'')

//   modalHeader='Create Order'
// 	modalOperation='Create Order'


// 	let allschema =  await useFetch('/docs.jsonld#', 'GET',null, false);
// 	const schema = allschema.supportedClass.find(schema=>schema.title==="Order").supportedProperty
// 	const properties = schema.map(item => [item.title,item.property.range?.split(':')[1]]);

// 	let newObject = {};
// 	let type = null;
//     properties.forEach(item => {
//      	if(item[1] == "string"){
//      		type=""
//      	}
//      	else if(item[1] == "integer"){
//      		type=0
//      	}
//      	else if (item[1] == "boolean"){
//      		type= false
//      	}else{
//      		type= null
//      	}
//        newObject[item[0]] = type ;
//     });
//     record = {...newObject}
//     record.orderItem=[]
//     record.orderChannel ="3"
//     record.orderStatus ="1"
//     record.deliveryAddress=[]
//     record.deliveryFee="0"

//    // console.log(record)
// }


async function addToCart(item, variant){
  
	//console.log('record', record)

	userState.user.order.email = record.email
	userState.user.order.name = record.name
	userState.user.order.customer = record.customer

    if(variant){
      item.price = variant.price
    }
    let foundItem = userState.user.order.dishes.find(el => el.id == item.id )

    if(foundItem){
      toast.warning("This item is already included."); 
      return 0;
    }
    let variantId=null
    if(variant){
      variantId = variant.id
    }
		
		 console.log('item', item)
     //return 0 

      if(item.type){
        userState.user.order.dishes.push(item)
      
        userState.user.order.orderItem.push(
          {"dish":`/api/dishes/${item.id}`,
            "quantity":1,
            "unitPrice":item.discountedPrice,
            "variantId":variantId,
            "category":item.category,
            "loyverseModifiersIds":item.loyverseModifiersIds
          }
        )
      }else{
        userState.user.order.bundles.push(item)
      
        userState.user.order.orderItem.push(
          {"dish":`/api/bundles/${item.id}`,
            "quantity":1,
            "unitPrice":item.price,
            "variantId":variantId,
            "category":item.category,
            "loyverseModifiersIds":item.loyverseModifiersIds
          }
        )
      }
      //console.log('MENU - item', item)
      console.log('userState.user.order.orderItem', userState.user.order.orderItem)
      //userState.selectedDish = item
      

      userState.user.order.orderItem.quantity=1
      userState.user.order.itemCount+=1
      
      console.log('addToCart userState.user.order', userState.user.order)

      const response = await useFetch('/orders/preview', 'POST',userState.user.order, false,false,true);
      userState.user.orderPreview = response
      orderPreviewResult = response
      console.log('addToCart response', response)
      return 0 

      toast.success("Item added successfully to your cart",2000); 

      localStorage.setItem('order',JSON.stringify(userState.user.order))
      localStorage.setItem('orderPreview',JSON.stringify(userState.user.orderPreview))

  }

</script>
