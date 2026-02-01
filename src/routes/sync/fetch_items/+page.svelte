<div class="flex">
	<div class="w-3xl grid mx-auto gap-3">

		<div class="card w-96 bg-base-100 card-sm shadow-sm">
	  <div class="card-body">
	    <h2 class="card-title">Fetch Categories</h2>
	    <p>Will pull Categories from loyverse to the websit</p>
	    {#if categoryResponse}
	    	<p>{categoryResponse} </p>
	    {/if}
	    <div class="justify-end card-actions">
	      <button class="btn btn-primary btn-sm" onclick="{()=>{syncCategories()}}">
	      {#if categorySyncLoading}
	      	<span class="loading loading-xs loading-spinner"></span>
	      {/if}
	      Sync Now</button>
	    </div>
	  </div>
	</div>

	<div class="card w-96 bg-base-100 card-sm shadow-sm">
	  <div class="card-body">
	    <h2 class="card-title">Fetch Items</h2>
	    <p>Will pull Item and Variants from loyverse to the websit</p>
	    {#if ItemResponse}
	    	<p>{ItemResponse} </p>
	    {/if}
	    <div class="justify-end card-actions">
	      <button class="btn btn-primary btn-sm" onclick="{()=>{syncItems()}}">
	      	{#if itemSyncLoading}
	      	<span class="loading loading-xs loading-spinner"></span>
	      	{/if}
	      	Sync Now</button>
	    </div>
	  </div>
	</div>

	<div class="card w-96 bg-base-100 card-sm shadow-sm">
	  <div class="card-body">
	    <h2 class="card-title">Fetch Customers</h2>
	    <p>Will pull Customers from loyverse to the websit</p>
	    {#if customerResponse}
	    	<p>{customerResponse} </p>
	    {/if}
	    <div class="justify-end card-actions">
	      <button class="btn btn-primary btn-sm" onclick="{()=>{syncCustomers()}}">
	      {#if customerSyncLoading}
	      	<span class="loading loading-xs loading-spinner"></span>
	      {/if}Sync Now</button>
	    </div>
	  </div>
	</div>

	<div class="card w-96 bg-base-100 card-sm shadow-sm">
	  <div class="card-body">
	    <h2 class="card-title">Fetch Payment Types</h2>
	    <p>Will pull Payment Types from loyverse to the websit</p>
	    {#if paymentTypesResponse}
	    	<p>{paymentTypesResponse} </p>
	    {/if}
	    <div class="justify-end card-actions">
	      <button class="btn btn-primary btn-sm" onclick="{()=>{syncPaymentTypes()}}">
	      	{#if paymentTypesSyncLoading}
	      	<span class="loading loading-xs loading-spinner"></span>
	      {/if}Sync Now</button>
	    </div>
	  </div>
	</div>

	<div class="card w-96 bg-base-100 card-sm shadow-sm">
	  <div class="card-body">
	    <h2 class="card-title">Fetch Modifiers</h2>
	    <p>Will pull Modifiers from loyverse to the websit</p>
	    {#if modifiersResponse}
	    	<p>{modifiersResponse} </p>
	    {/if}
	    <div class="justify-end card-actions">
	      <button class="btn btn-primary btn-sm" onclick="{()=>{syncModifiers()}}">
	      	{#if modifiersSyncLoading}
	      	<span class="loading loading-xs loading-spinner"></span>
	      {/if}Sync Now</button>
	    </div>
	  </div>
	</div>


</div>
</div>

<Toaster richColors position="top-center" closeButton duration={10000} />



<script>
import { Toaster, toast } from 'svelte-sonner';
import useFetch from '$lib/services/useFetch.js';
import { base } from '$app/paths';
import Icon from'$lib/components/Icon.svelte';
const API_URL = import.meta.env.VITE_API_URL;

let itemSyncLoading =$state(false)
let ItemResponse = $state()

let categorySyncLoading = $state(false)
let categoryResponse = $state()

let customerSyncLoading = $state(false)
let customerResponse = $state()

let paymentTypesSyncLoading = $state(false)
let paymentTypesResponse = $state()

let modifiersSyncLoading = $state(false)
let modifiersResponse = $state()

let token =localStorage.getItem('token')

async function syncCategories(){
	categorySyncLoading= true
	//const response = await useFetch(`/syncCategories`, 'GET', null, false);

	const headers = {};
  	headers['Content-Type'] = 'application/json';
  	if (token) headers['Authorization'] = `Bearer ${token}`;

  	const response = await fetch(`${API_URL}/syncCategories`, {
      method: 'GET',
      headers: headers
      
    });

    if (response.ok) {
    	const data = await response.json();
      if(typeof data.message === 'number'){
		categoryResponse= data.message + " Categories synced."
	}
	console.log('response', response)
	categorySyncLoading= false
     
    }else{
    	 throw new Error(data.message || 'Sync failed!!');
    }

}

async function syncItems(){
	itemSyncLoading= true
	//const response = await useFetch(`/syncItems`, 'GET', null, false);

	const headers = {};
  	headers['Content-Type'] = 'application/json';
  	if (token) headers['Authorization'] = `Bearer ${token}`;

  	const response = await fetch(`${API_URL}/syncItems`, {
      method: 'GET',
      headers: headers
      
    });

    if (response.ok) {
    	const data = await response.json();
      if(typeof data.message === 'number'){
			ItemResponse= data.message + " Items synced."
		}
		itemSyncLoading= false
     
    }else{
    	 throw new Error(data.message || 'Sync failed!!');
    }

	
	
}

async function syncCustomers(){
	customerSyncLoading= true
	//const response = await useFetch(`/syncCustomer`, 'GET', null, false);

	const headers = {};
  	headers['Content-Type'] = 'application/json';
  	if (token) headers['Authorization'] = `Bearer ${token}`;

  	const response = await fetch(`${API_URL}/syncCustomer`, {
      method: 'GET',
      headers: headers
      
    });

    if (response.ok) {
    	const data = await response.json();
      if(typeof data.message === 'number'){
		customerResponse= data.message + " Customers synced."
		}
		customerSyncLoading= false
     
    }else{
    	 throw new Error(data.message || 'Sync failed!!');
    }
}

async function syncPaymentTypes(){
	paymentTypesSyncLoading= true
	//const response = await useFetch(`/syncPaymentTypes`, 'GET', null, false);
	
	const headers = {};
  	headers['Content-Type'] = 'application/json';
  	if (token) headers['Authorization'] = `Bearer ${token}`;

  	const response = await fetch(`${API_URL}/paymentTypes`, {
      method: 'GET',
      headers: headers
      
    });

    if (response.ok) {
    	const data = await response.json();
      if(typeof data.message === 'number'){
		paymentTypesResponse= data.message + " Customers synced."
		}
		paymentTypesSyncLoading= false
     
    }else{
    	 throw new Error(data.message || 'Sync failed!!');
    }

}

async function syncModifiers(){
	modifiersSyncLoading= true
	//const response = await useFetch(`/syncPaymentTypes`, 'GET', null, false);
	
	const headers = {};
  	headers['Content-Type'] = 'application/json';
  	if (token) headers['Authorization'] = `Bearer ${token}`;

  	const response = await fetch(`${API_URL}/syncModifiers`, {
      method: 'GET',
      headers: headers
      
    });

    if (response.ok) {
    const data = await response.json();
    console.log('data', data)
    if(typeof data.message === 'number'){
			modifiersResponse= data.message + " Modifiers synced."
		}
		modifiersSyncLoading= false
     
    }else{
    	 throw new Error(data.message || 'Sync failed!!');
    }

}


</script>