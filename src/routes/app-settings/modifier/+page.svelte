<div in:fade  class="grid grid-col justify-center items-center">

<div class="" in:fade >
	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box  border p-3 m-2 ">
	  <legend class="fieldset-legend">Modifiers</legend>
	  <button class="btn btn-primary btn-soft btn-sm w-[100px]"	onclick="{()=>{createModifier(), showModal=true}}">	<Icon name="add" />new</button>
		 <div class="overflow-x-auto lg:hidden">

		  <table class="table table-xs  ">
		    <thead>
		      <tr>
		      	<th>Action</th>
		        <th>ID</th>
		        <th>Name</th>
		        <th>Position</th>
		        <th>Updated On</th>
		      </tr>
		    </thead>
		    <tbody>
		      {#each modifier as item, i}
		      	<tr><td><button class="btn btn-primary btn-soft btn-sm"	onclick="{()=>{getOneModifier(item.id), showModal=true}}">edit	</button>
		      	<td>{i+1}</td>
		      	<td>{item.name}</td>
		      	<td>{item.position}</td>
		      	<td readonly>{item.updatedAt}</td>
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
		        <th>Position</th>
		        <th>Updated at</th>
		      </tr>
		    </thead>
		    <tbody>

		      {#each modifier as item, i}
		      	<tr in:fade >
		      	<td><button class="btn btn-primary btn-soft btn-sm"	
		      		onclick="{()=>{getOneModifier(item.id,i), showModal=true}}">edit	</button>
		      		</td>
		      	<td>{i+1}</td>
		      	<td>{item.name}</td>
		      	<td>{item.position}</td>
		      	<td readonly>{item.updatedAt}</td>
		      	</tr>
					{/each}
					</tbody>
		  </table>  
		</div>
<!-- 
		<div class="grid mt-10" in:fade >
			{#each modifier as item}
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
      <input type="text" class="input" placeholder="" 
       bind:value="{record.name}"/>

      <label class="label">Position</label>
      <input type="number" class="input" placeholder="10" 
       bind:value="{record.position}"/>

       <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-3">
    		<legend class="fieldset-legend">Options</legend> 
    		{#each record.modifierOptions as modifierOption}
    			<div class="flex lg:h-10 my-2 gap-2">

    				<div class="grid">
		    			<label class="label ">Name</label>
				      <input type="text" class="input input-sm" placeholder="name of option ex: plain rice" 
				       bind:value="{modifierOption.name}"/>
				    </div>

				    <div class="grid">
		    			<label class="label ">Price</label>
				      <input type="number"  class="input input-sm" placeholder="price of option" 
				       bind:value="{modifierOption.price}"/>
				    </div>

				    <button class="btn btn-error btn-soft btn-square p-2 btn-xs mt-5"
				    				onclick="{()=>{removeOption(modifierOption)}}">
				    	<Icon name="delete" class="text-red-500"/>
				  	</button>
			    </div>
    		{/each}

    		<button class="btn btn-info btn-soft btn-square btn-sm mt-2" 
    						onclick="{()=>{addOption()}}">
    			<Icon name="add"/>
    		</button>
    	</fieldset>


      <label class="label mt-5">Updated At</label>
      <input type="text" readonly class="input " disabled
       value={record.updatedAt}/>

    </div>    
  <div class="flex justify-between">
   <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveOneModifier())}>
    Save
  </button>

  

  <button class="btn btn-soft btn-default w-1/4" onclick={()=>showModal = false}>
    Close
  </button>

  <button class="btn btn-soft btn-error w-1/4" onclick={()=>{deletemodifier(record.id), showModal = false}}>
    Delete
  </button>

</div>

  </fieldset>

</div>
</Modal>

<Toast />

<script>
import { onMount } from 'svelte';
import { fade, scale, fly } from 'svelte/transition';
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

let admin = $state(false)
const API_URL = import.meta.env.VITE_API_URL;

let modifier = $state([]);
let showModal = $state(false);
let closeModal = $state(false)
let modalOperation = $state('')
let modalContents = $state([])
let record = $state({ modifierOptions: [] })
let modalHeader = $state('')

afterNavigate(({ to, from }) => {
    const token = localStorage.getItem('token');
    if(token){
        const decoded = jwtDecode(token);
        admin = decoded.roles.includes('ROLE_ADMIN')
    }
    if(!admin && (from?.route.id != '/logout' && to.route.id != '/logout')){
        goto('/logout', { replaceState: true })
    }
});

onMount(() => {
    getModifiers()
})

function addOption() {
    if (!record.modifierOptions) {
        record.modifierOptions = [];
    }
    record.modifierOptions.push({
        name: '',
        price: 0,
        position: record.modifierOptions.length + 1
    });
}

function removeOption(option) {
    const index = record.modifierOptions.indexOf(option);
    if (index !== -1) {
        record.modifierOptions.splice(index, 1);
    }
    record.modifierOptions.forEach((opt, idx) => {
        opt.position = idx + 1;
    });
}

async function getModifiers() {
    const response = await useFetch('/modifiers', 'GET', null, true);
    modifier = response;
}

async function getOneModifier(id) {
    modalOperation = 'Edit';
    const modifierData = await useFetch('/modifiers/' + id, 'GET', null, true);
    record = JSON.parse(JSON.stringify(modifierData)); // Deep copy
    modalHeader = record.name;
}

async function saveOneModifier() {
    if (modalOperation === 'Create modifier') {
        try {
            const newModifier = {
                name: record.name,
                position: record.position,
                modifierOptions: record.modifierOptions?.map(opt => ({
                    name: opt.name,
                    price: opt.price,
                    position: opt.position
                })) || []
            };
            
            const saveItem = await useFetch('/modifiers', 'POST', newModifier, true);
            toast.success("Saved successfully", 2000);
            await getModifiers();
            showModal = false;
        } catch (e) {
            toast.error("Failed to create modifier", 2000);
            console.log(e);
        }
    } else {
        // EDIT MODE - Same pattern as your dish example
        try {
            const modifierToSave = {
                name: record.name,
                position: record.position,
                modifierOptions: record.modifierOptions?.map(opt => {
                    const cleanOpt = {
                        name: opt.name,
                        price: opt.price,
                        position: opt.position
                    };
                    if (opt.id) {
                        cleanOpt.id = opt.id;
                    }
                    return cleanOpt;
                }) || []
            };
            
            await useFetch('/modifiers/' + record.id, 'PATCH', modifierToSave, true);
            toast.success("Saved successfully", 2000);
            await getModifiers();
            showModal = false;
        } catch (e) {
            toast.error("Failed to save modifier", 2000);
            console.log(e);
        }
    }
}

async function deletemodifier(id) {
    try {
        await useFetch('/modifiers/' + id, 'DELETE', null, true);
        toast.success("Deleted successfully", 2000);
        await getModifiers();
        showModal = false;
    } catch(e) {
        toast.error("Failed to delete modifier", 2000);
        console.log(e);
    }
}

async function createModifier() {
    modalOperation = 'Create modifier';
    record = {
        name: '',
        position: 0,
        modifierOptions: []
    };
    modalHeader = 'New Modifier';
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