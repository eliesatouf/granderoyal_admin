<!-- EditProfile.svelte -->
<script>
  import {fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Icon from '$lib/components/Icon.svelte';
  import useFetch from '$lib/services/useFetch.js';
  import userState from '$lib/stores/user.svelte.js';
  import { browser } from "$app/environment";
  import { afterNavigate, goto } from "$app/navigation";

  let {customerId} = $props()

  let customer = $state({
    name:'',
    telephone:'',
    address:''
  })

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  let isClosed = true;
  //let {name , phone, addredd} = $props()
  let currentPage = $state('/profile')
  let refreshPage = $state(false)

  onMount(() => {
    getCustomer()

  })


  async function getCustomer(){
    const response = await useFetch(`/customers/${customerId}`, 'GET',null, true)
    if(response.id){
      customer = response
    }
  }


  async function save(){
    const response = await useFetch(`/customers/${customerId}`, 'PATCH',customer,  true)
    console.log('save response', response)
    getCustomer()
  
  }
  
</script>


<label for="my_modal_6" class="btn  {!customerId ? 'btn-disabled': 'btn-accent btn-outline' }">
  <Icon name="person_edit"/>
</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my_modal_6" class="modal-toggle" />
<div class="modal" role="dialog">
  <div class="modal-box">
    <h3 class="text-lg font-bold">{customer.name}</h3>
    
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Name</legend>
      <input type="text" class="input" placeholder="user name" bind:value="{customer.name}"/>
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Phone</legend>
      <input type="text" class="input" placeholder="" bind:value="{customer.telephone}"/>
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Address</legend>
      <textarea type="text" class="input" placeholder="user name" bind:value="{customer.address}"/>
    </fieldset>


    <div class="modal-action">
      <label for="my_modal_6" class="btn btn-info btn-soft" onclick ="{()=>{save()}}">Save</label>
      <label for="my_modal_6" class="btn btn-accent btn-soft">Cancel</label>
    </div>
  </div>
</div>