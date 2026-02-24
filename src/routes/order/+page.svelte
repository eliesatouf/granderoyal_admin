<div in:fade  class="grid grid-col lg:flex lg:flex-wrap justify-center ">

{#if isLoading }
<div in:fade out:fade 
class="grid grid-col justify-center items-center  
             z-1000  absolute top-1/3 left-1/2">
  <span class="loading loading-spinner loading-xl"></span>
</div>
{/if}

{#if processingOrder}
          <div class="absolute backdrop-brightness-5 bg-green-950 p-3 lg:p-10 lg:-top-10 lg:-mx-0 z-500">
            <div class="flex justify-center w-[300px]">
              <div> 
              <h3 class="text-lg lg:text-lg lg:text-left text-stone-100 ">Processing order, please don't close the window.</h3>
              </div>
              <div>
                <span class="loading loading-bars lg:w-[100px] text-amber-200 z-1000 "></span>
              </div>
            </div>
          </div>
        {/if}


{#if userState.user.isAuthenticated}
<div class="static {isLoading ? 'blur-xs':''}">



<button class="btn btn-primary btn-soft btn-sm"
		      			onclick="{()=>{createOrder(), showModal=true}}">
		      			<Icon name="add" />new</button>
	<div class="lg:hidden overflow-x-auto">

		<table class="table table-xs  overflow-x-auto ">
		    <thead>
		      <tr>
		      	<th>Action</th>
		        <th>orderNumber</th>
		        <th>grandTotal</th>
		        <th>orderDate</th>
		      </tr>
		    </thead>
		    <tbody>
		      {#each orderList as item, i}
		      	<tr>
		      		<td><a class="btn btn-primary btn-soft btn-sm" href="{base}/orderEdit/{item.id}">edit	</a>
		      	</td>
		      	<td>{item.orderNumber}</td>
		      	<td>{item.grandTotal}</td>
						<td>{dayjs(item.orderDate).format('YY-MM-DD')}</td>
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
		      		<td><a class="btn btn-primary btn-soft btn-sm" href="{base}/orderEdit/{item.id}">edit	</a>
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

<div class="static grid lg:flex lg:justify-center lg:items-center p-1 rounded md:rounded-lg bg-base-100 max-h-[700px] lg:max-h-[800px] lg:w-8xl overflow-auto">
	{#if isLoading }
		<div in:fade out:fade 
				class="grid grid-col justify-center items-center absolute top-0  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50
		             z-1000  lg:w-4xl h-800">
		  <span class="loading loading-spinner loading-xl"></span>
		</div>
	{/if}

  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border m-3 w-[280px] lg:max-w-2xl overflow-auto">
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
      value="{userState.user.name}"/>
    </div>

    {#if modalOperation=='Create Order'}
    <div class="grid ">
	    <label class="label">Email</label>
	    <div class=" join">
	      	<input type="text" readonly class="input join-item"
	       				value="{userState.user.email}"/>
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
       value="{userState.user.email}"/>
    </div>
    {/if}


<!--     <div class="grid">
      {#if modalOperation == "Create Order"}
      <label type="label" class="label">Order channel </label>
        <select class="select select" bind:value={userState.user.order.orderChannel}>
          {#each orderChannels as channel}
            <option value={JSON.stringify(channel.id)}>{channel.name}</option>
          {/each}
      	</select>
      {:else if orderChannels.length > 0}
      	<label class="label">Order channel</label>
	      <input type="text" class="input" 
        value={orderChannels.find(el => el.id === Number(userState.user.order.orderChannel))?.name ?? ''}
       readonly />
      {/if}
    </div>	 -->


    <div class="flex"> <div class="text-md m-2">Order by</div>
    	<label class="swap swap-flip">
			  <input type="checkbox" />
				  <div class="swap-on btn btn-primary btn-sm" 
				  	onclick="{()=>{ userState.user.order.orderChannels=orderChannels[1]?.id }}">
				  	<Icon name="receipt"/>{orderChannels[1]?.name.toUpperCase()}
				  </div>
				  <div class="swap-off btn btn-primary btn-sm" 
				  	onclick="{()=>{ userState.user.order.orderChannels=orderChannels[0]?.id }}">
			  		<Icon name="call"/> {orderChannels[0]?.name.toUpperCase()}
			  	</div>
			</label>
		</div>


    <div class="grid">
      <label type="label" class="label" >Status</label>
      <select class="select select" bind:value={userState.user.order.orderStatus}>
      {#if userState.user.order.orderStatus}
       	{#each statusList as stat}
          <option value="{JSON.stringify(stat.id)}">{stat.name}</option>
       	{/each}
      {/if}
      </select>
    </div>

    <div class="flex">
		  <label class="swap swap-flip flex-1">
			  <input type="checkbox" />
				  <div class="swap-off btn btn-secondary btn-sm" onclick="{()=>{userState.orderType='delivery'}}">
			  		<Icon name="takeout_dining_2"/> Pick up
			  	</div>
			  	<div class="swap-on btn btn-secondary btn-sm" onclick="{()=>{userState.orderType='pickup'}}">
				  	<Icon name="moped"/>Delivery
				  </div>
			</label>

<!-- 			<label class="swap swap-flip flex-1">
			  <input type="checkbox" />
			  	<div class="swap-off btn btn-info btn-sm" 
				  	onclick="{()=>{ userState.user.order.paymentMethod=paymentTypes[2]?.id.toString() }}">
			  		 {paymentTypes[2]?.name}
			  	</div>
				  <div class="swap-on btn btn-info btn-sm" 
				  	onclick="{()=>{ userState.user.order.paymentMethod=	paymentTypes[1]?.id.toString() }}">
				  	<Icon name="paid"/>{paymentTypes[1]?.name}
				  </div>
				  <div class="swap-off btn btn-info btn-sm" 
				  	onclick="{()=>{ userState.user.order.paymentMethod=paymentTypes[0]?.id.toString() }}">
			  		<Icon name="credit_card"/> {paymentTypes[0]?.name}
			  	</div>
			</label> -->


			<div class="dropdown dropdown-center">
			  <div tabindex="0" role="button" class="btn btn-primary btn-smm-1">{selectedPayment || 'Payment'} </div>
			  <ul tabindex="0" class="dropdown-content  menu z-1 w-36 rounded-box bg-base-100 p-2 shadow-sm">
			  	{#each paymentTypes as method}
			    <li>
			    		<button class="btn btn-accent btn-sm m-1" 
						  	onclick="{()=>{ userState.user.order.paymentMethod=method?.id.toString(), 
						  	selectedPayment=method.name,document.activeElement.blur()}}">
						  	{method.name}
					  	</button>
			    </li>
			    {/each}
			  </ul>
			</div>


		</div>
    	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-1 w-[250px] ">
    		<legend class="fieldset-legend">Summary</legend>
    		<div class="grid m-2 p-2 lg:flex lg:gap-3">
    			{#if orderPreviewResult}
    					<ul class="text-[14px]">
    							<li  class="list-row ">Base subtotal: {orderPreviewResult.calculationDetails.summary.baseSubtotal}</li>
    							<li  class="list-row ">Final grandTotal: {orderPreviewResult.calculationDetails.summary.grandTotal}</li>
    							<li  class="list-row ">Total discount: {orderPreviewResult.calculationDetails.summary.totalDiscount}</li>
    					</ul>
    			{/if}

    		</div>
    	</fieldset>

    	</div>

    	{#if modalOperation=='Create Order' && userState.user.order.customer}
    	<div class="grid  w-[250px] lg:w-xs">	
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
    		{#each orderPreviewResult?.order.orderItems as item,i}
    			<div class="m-3">
    			<ul class="list">
    				

    					{#if item.type == "bundle"}

    						<li class="list-row text-xs m-0 ">type: {item.type}</li>
    						<li class="list-row text-xs m-0">finalPrice: {item.finalPrice}</li>

    					{:else}

    					<li class="list-row text-sm  p-0 m-0">
    					<div class="text-xs opacity-30 tabular-nums">{i+1}</div>
    						{item.dish.name} x {item.quantity} - {item.unitPrice}</li>	
    					{/if}
    			</ul>
    			</div>
    			{/each}
    	</ol>
    	</fieldset>
      </div>

      {/if}

</div>

<div class="flex justify-end w-xs">
	<button class="btn btn-soft btn-primary w-1/4" onclick={()=>(confirmOrder())}>
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
				<button class="btn btn-sm btn-outline m-0 " 
					onclick="{()=>{selectEmail(customer),showModalRecord=false}}">
					{customer.name} 
				</button>
				<button class="btn btn-sm btn-outline m-0" 
					onclick="{()=>{selectEmail(customer),showModalRecord=false}}">
			   	{customer.email} 
				</button>
			</li>
			{/each}
		</ul>	
	</div>
<Toast/>
</ModalEditRecord>

<ModalAddon bind:showModalAddon>
	{#snippet children()}
		<div class="card bg-base-200 p-2">
				<div class="card-title">Add On</div>
				<div class="card-body">
				{#each modifiers?.filter(el => el.id == 1) as modifier}
				<div class="grid gap-1">
					{#each modifier.modifierOptions as option}
								<button class="btn btn-primary btn-soft btn-sm"
									onclick="{()=>{addAddon(option)}}">
									{option.name} - {option.price}
								</button>
					{/each}
				</div>
				{/each}
			</div>
		</div>
	{/snippet}
</ModalAddon>

<ModalSearch bind:showModalSearch>

	{#snippet children()}
		{#if isLoading}
	<div class="absolute items-center z-1000 left-30 lg:left-220 top-40">
		<span class="loading loading-spinner text-secondary loading-xl w-[100px] h-100"></span>
	</div>
	{/if}
<div class="max-h-200 max-w-xs  grid mx-auto">
	<label class="input input-bordered ">
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
				<div class="flex my-1">
					<button class="list-col-grow btn btn-primary btn-soft btn-sm" 
					onclick="{()=>{addToCart(dish)}}">
						{dish.name} 
					</button>
				</div>

				<div class="flex gap-1">
					<button disabled="{dish.status!='available'}" 
						class="btn btn-sm btn-soft btn-square btn-primary"
						onclick="{()=>{increaseQty(dish)}}">+
					</button>

					<button disabled="{dish.status!='available'}" 
					class="btn btn-sm btn-soft btn-square btn-secondary"
					onclick="{()=>{removeDish(dish.id)}}">-
					</button>

					{#if dish.variants.length > 0}
						{#each  dish.variants as variant}
							<button  
							class="btn btn-sm btn-soft btn-square btn-accent"
							onclick="{()=>{addToCart(dish, variant)}}"> {variant.size[0].toUpperCase()	}
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
			{#each bundleList as bundle}
			<li class="list-row justify-between" >
			<div>
				<div class="flex p-1">
					<div class="p-1 m-1" >
						{bundle.name} 
					</div>

					<button disabled="{!bundle.active}" 
						class="btn btn-sm btn-soft btn-square btn-primary"
						onclick="{()=>{addBundle(bundle.bundle)}}">+
					</button>

					<button  class="btn btn-sm btn-soft btn-square btn-secondary">-
					</button>

					{#if bundle.totalOriginalPrice}
					<label class="m-1">{bundle.price}</label>
					<label class="line-through m-1">{bundle.totalOriginalPrice}</label>
					
					{:else}
					<label class=" m-1">{bundle.price}</label>
				{/if}

				</div>


				<div>
					<ol class="list">
						{#each bundle.bundleItems as item}
							<li class="list-row">
									{dishList?.find(el => el.id == item.dish.split('/')[3] )?.name} - 
									{dishList?.find(el => el.id == item.dish.split('/')[3] )?.price}
							</li>
						{/each}
					</ol>

				</div>


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
import { browser } from '$app/environment';
import { fade, scale,fly } from 'svelte/transition';
import useFetch from '$lib/services/useFetch'
import { toast } from '$lib/stores/toast';
import Toast from '$lib/components/Toast.svelte';
import Filemanager from '$lib/components/Filemanager.svelte';
import Modal from '$lib/components/Modal.svelte';
import ModalAddon from '$lib/components/ModalAddon.svelte';
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
import { base } from '$app/paths';
import { invalidate } from '$app/navigation';

let {data} = $props();

let admin =$state(false)


let showModal = $state(false);
let showModalAddon = $state(false)
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
let dishListSearch= $state()
let modifiers =$state()
let selectedItem = $state()
let processingOrder=$state(false)
let orderPreviewResult = $state()
let selectedPayment= $state()

const API_URL = import.meta.env.VITE_API_URL;

onMount(() => {
invalidate('/order');
dishList = data.preLoad.dishList
dishListSearch = data.preLoad.dishList
statusList = data.preLoad.statusList
orgStatusList = statusList
customerList =data.preLoad.customerList
orderList = data.preLoad.orderList
offerList = data.preLoad.offerList
paymentTypes = data.preLoad.paymentTypes
orderChannels = data.preLoad.orderChannels
orgOrderChannels= data.preLoad.rderChannels
modifiers = data.preLoad.modifiers
bundleList = data.preLoad.bundleList

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

	userState.user.customerId = `/api/customers/${customer.id}`
	userState.user.order.customer = `/api/customers/${customer.id}`
	userState.user.email = customer.email
	userState.user.name = customer.name
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
    if (term.length > 2) {
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

function addAddon(option){
	let index =-1
	const itemOrderId = selectedItem.id


	//-- check if item in record
	if(record.orderItem){
		index = record.orderItem.findIndex(el => el.dish.split('/')[3] == itemOrderId)
	}
	
	if (index == -1){
		addToCart(selectedItem)
	}

	let index1 = record.orderItem.findIndex(el => el.dish.split('/')[3] == itemOrderId)
	if(!record.orderItem[index1].lineModifiers){
	 record.orderItem[index1].lineModifiers=[]
	}
	record.orderItem[index1].lineModifiers.push(option)

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
	dishListSearch = dishList

	let res =  dishListSearch.filter(el=>el.name.toLowerCase().includes( dishTerm)? el : null)
	dishListSearch = res
}

function findBundle(){
	//if(bundleTerm.length < 3) return ''
	// let res =  offerList.filter(el=>el.name.toLowerCase().includes(bundleTerm)? el : null)
	// bundleList = res
}

function addDish(dish){
	console.log('dish', dish)
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

function removeDish(id){
	record.orderItem = record.orderItem.filter(el => el.dish.split('/')[3] != String(id))
}

function addBundle(bundle){
	console.log('bundle', bundle)
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

async function addToCart(item, variant){
    // return 0 
     console.log('variant', variant)
    if(variant){
      item.price = variant.price
    }
    let foundItem = userState.user.order.dishes.find(el => el.id == item.id )

    if(foundItem){
      toast.warning("This item is already in your cart.",2000); 
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

  function increaseQty(item){
	  console.log('increaseQty', item)
	  //console.log('orderitem', userState.user.order.orderItem)
	  if(!item.promoStatus.active){ 
	    const dish =  userState.user.order.orderItem.find(el=>el.dish?.split('/')[3] == item.id)
	    console.log('dish', dish)
	    const qty = dish.quantity
	    dish.quantity+=1
	  }else{
	    const bundle =  userState.user.order.orderItem.find(el=>el.bundle?.split('/')[3] == item.id)
	    bundle.quantity+=1
	  }
	  userState.user.order.itemCount+=1
	  //console.log('orderItem',$state.snapshot( userState.user.order.orderItem))
	  orderPreview()
	}

	function decreaseQty(item){
	   if(item.dish){ 
	    const dish =  userState.user.order.orderItem.find(el=>el.dish?.split('/')[3] == item.dish.id)
	    const qty = dish.quantity
	    if(Number(dish.quantity) > 1){
	      dish.quantity-=1
	      userState.user.order.itemCount-=1
	      orderPreview()
	    }
	    
	  }else{
	    const bundle =  userState.user.order.orderItem.find(el=>el.bundle?.split('/')[3] == item.id)
	    if(bundle.quantity){
	      bundle.quantity-=1
	       userState.user.order.itemCount-=1
	       orderPreview()
	    }
	 }
	}

async function orderPreview(){
  const response = await useFetch('/orders/preview', 'POST',userState.user.order, false,false,true);
  userState.user.orderPreview = response
  orderPreviewResult = response
  console.log('userState.user.orderPreview', userState.user.orderPreview)

  localStorage.setItem('order',JSON.stringify(userState.user.order))
  localStorage.setItem('orderPreview',JSON.stringify(userState.user.orderPreview))

}

async function saveOneOrder(){
	console.log(record)
	return 0
	let saveItem=''
	if(modalOperation=='Create Order'){
		console.log('POST')

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
	modalOperation=='Create Order'
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


async function confirmOrder(){
   userState.user.order.paymentMethod=''
  //console.log('userState.user.order', userState.user.order)
  //return 0; 
  processingOrder= true
  const response = await useFetch('/orders', 'POST',userState.user.order, true,false);
  if(response.id){
    if(response.orderStatus == 2){
      toast.success("Order is posted successfully, please check your email for details",10000); 
    }else if(response.orderChannel == 7){
      toast.warning("Order is posted successfully, but we faced problem sending you mail. will contact you ASAP to confirm the status.",20000); 
    }

    userState.user.order.orderItem=[]
    userState.user.order.dishes=[]
    userState.user.order.itemCount=0
    localStorage.setItem('order',[])
    localStorage.setItem('orderPreview',[])
    clearCart()
  }else{
    toast.error("Error posting order please call us to check the issue",2000); 
  }
  showModal = false
  processingOrder= false
}

function clearCart(){

    localStorage.setItem('order',[])
    userState.user.order.dishes=[]
    userState.user.order.orderItem=[]
    userState.user.order.itemCount=0
    userState.user.order.orderStatus='1'
 
}

</script>




