<script>
import { onMount } from 'svelte';
import useFetch from '$lib/services/useFetch'
import { fade, fly, slide } from 'svelte/transition';
import Modal from '$lib/components/Modal.svelte';
import { Toaster, toast } from 'svelte-sonner';
import Icon from '$lib/components/Icon.svelte'
import { afterNavigate } from '$app/navigation';
import { jwtDecode } from 'jwt-decode';
import { goto } from '$app/navigation';

let admin = $state(false)

const API_URL = import.meta.env.VITE_API_URL;

let data = $state([]);
let error = $state();
let modalError = null;
let userData = $state([]);
let showModal = $state(false);
let closeModal = $state(false);
let modalContents = $state();
let modalHeader = $state();
let isOpen = $state(false);
let response = $state();
let refreshUser = null;
let modalOperation = $state();
let localAccount = $state(false)
let newPackage = $state()

let features = $state([])

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

onMount(getPackageList);

async function getPackageList(){
    try {
        data = await useFetch('/event_packages', 'GET', null, true);
        console.log('data', data)
    } catch (err) {
        error = err.message;
    }
}

// Fixed: This should be for event packages, not users
async function getEventPackage(id){
    newPackage = await useFetch('/event_packages/' + id, 'GET', null, true);
    modalContents = [newPackage]
    modalHeader = newPackage.name
    modalOperation = "Edit Event Package"
    showModal = true
}

// Fixed delete function for event packages
async function deleteEventPackage(id, name){
    let confirmDelete = confirm(`Delete event package "${name}"?`)
    if(!confirmDelete) return false

    try {
        const response = await useFetch('/event_packages/' + id, 'DELETE', null, true);
        if(!response || response.success !== false){
            toast.success("Event package deleted successfully")
            showModal = false
            await getPackageList() // Refresh the list after deletion
            return true
        } else {
            toast.error("Failed to delete event package")
            return false
        }
    } catch (err) {
        toast.error(err.message || "Failed to delete event package")
        return false
    }
}

// Fixed add function for event packages
async function addEventPackage(){
    showModal = true
    modalOperation = "New Event Package"
    
    newPackage = {
        "name": null,
        "price": null,
        "duration": null,
        "capacity": null,
        "features": [],
        "active": true
    }
    modalHeader = "New Package"
    modalContents = [newPackage]  
}

// Fixed save function for new event packages
async function saveNewEventPackage(){
    console.log('modalContents', modalContents[0])
    let eventPackage = modalContents[0]
    
    try {
        const response = await useFetch('/event_packages', 'POST', eventPackage, true);
        if(response.id){
            toast.success("Event package created successfully")
            await getPackageList()
            showModal = false
        } else {
            toast.error("Failed to create event package")
        }
    } catch (err) {
        toast.error(err.message || "Failed to create event package")
    }
}


async function saveEventPackage(eventPackage){

    const id = eventPackage.id
    delete eventPackage.id
    console.log('eventPackage before', eventPackage)
    eventPackage.price = parseFloat(eventPackage.price)
    try {

        response = await useFetch("/event_packages/" + id, 'PATCH', eventPackage, true);
        try {
            refreshUser = await useFetch("/event_packages/" + id, 'GET', null, true);
            data = data.map(pkg => pkg.id === id ? { ...pkg, ...refreshUser } : pkg)
            showModal = false
            toast.success("Changes saved successfully")
        } catch(err) {
            toast.error("Failed to save changes")
        }
    } catch (err) {
        toast.error(err.message || "Failed to save changes")
    }
}

function addFeature(){
    if(modalContents[0] && modalContents[0].features) {
        modalContents[0].features.push('')
    }
}


function deleteFeature(index){
    if(modalContents[0] && modalContents[0].features) {
        modalContents[0].features.splice(index, 1)
        // Force reactivity by reassigning
        modalContents = [...modalContents]
    }
}
</script>

<div in:fade out:fade class="grid grid-col justify-center items-center mt-1 gap-2">
    <button class="btn btn-primary btn-xs btn-outline  mx-3 w-32" value="add"
            onclick={addEventPackage}>
        <Icon name="add" />New</button>
    {#if error}
        <p class="error">{error}</p>
    {:else if data}
        <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
        {#each data as eventPackage, key}
            <div class="card ring ring-1 ring-primary/20">
                <article class="card-body break-all text-wrap">
                    <p> <span class="font-bold">Name:</span> {eventPackage.name}</p>
                    <p><span class="font-bold">Price:</span>{eventPackage.price}</p>
                    <p><span class="font-bold">Duration:</span> {eventPackage.duration}</p>
                    <p><span class="font-bold">Capacity:</span>{eventPackage.capacity}</p>
                    <ul class="list-decimal list-inside">
                        <span class="font-bold">Features:</span>
                        {#each eventPackage.features as feature}
                            <li>
                                {feature}
                            </li>
                        {/each}
                    </ul>
                    <div class="flex flex-row gap-3 justify-start items-center">
                        <div aria-label="status" class="status status-lg {eventPackage.popular ? 'status status-success':''}"></div>
                        Popular
                    </div>

                    <div class="flex flex-row gap-3 justify-start items-center">
                        <div aria-label="status" class="status status-lg {eventPackage.active ? 'status status-success':''}"></div>
                        <button class="btn btn-sm btn-soft btn-primary"
                            onclick={() => getEventPackage(eventPackage.id)}>Edit</button>
                    </div>
                </article>
            </div>    
        {/each}
    </div>
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<Modal bind:showModal>
    {#snippet header()}
        <div class="text-lg font-bold">
            {modalOperation}
        </div>
    {/snippet}
 
    {#snippet children()}
        {#each modalContents as item}

            <form autocomplete="off" class="">
                <fieldset class="fieldset bg-base-200 border-base-300 rounded-box lg:min-w-100 lg:h-full overflow-auto p-7">
                    <label class="label">Name</label> 
                    <input type="text" class="input" placeholder="Name" 
                        bind:value="{item.name}"/>

                    <label class="label">Price</label> 
                    <input type="number" class="input" placeholder="Price" 
                        bind:value="{item.price}"/>

                    <label class="label">Duration</label>
                    <input type="text" class="input" placeholder="Duration" 
                        bind:value="{item.duration}"/>

                    <label class="label">Capacity</label>
                    <input type="text" class="input" placeholder="Capacity" 
                        bind:value="{item.capacity}"/>

                    <div class="card my-1">
                        <div class="card-actions">
                            <button class="btn btn-primary btn-sm btn-soft" type="button" onclick={addFeature}>
                                Add Feature
                            </button>
                            <div class="grid w-xs">
                                <ul>
                                    {#each item.features as feature, i}
                                        <li>
                                            <div class="flex items-center gap-2">
                                                <div class="badge badge-primary badge-outline rounded-full">{i+1}</div>
                                                <input type="text" class="input" placeholder="Feature" 
                                                    bind:value="{item.features[i]}"/>
                                                <button class="btn btn-square btn-soft btn-error" type="button"
                                                    onclick={() => deleteFeature(i)}>X</button>
                                            </div>
                                        </li>
                                    {/each}
                                </ul> 
                            </div>  
                        </div>

                        <label class="label text-md">
                            <input type="checkbox" class="toggle toggle-primary"
                                bind:checked={item.popular} />popular
                        </label>


                        <label class="label text-md">
                            <input type="checkbox" class="toggle toggle-primary"
                                bind:checked={item.active} />Active
                        </label>

                        <div class="card-actions justify-end p-1">
                            {#if modalOperation == 'Edit Event Package'}
                                <button class="btn btn-sm btn-soft btn-primary" type="button"
                                    onclick={() => saveEventPackage(item)}>Save
                                </button>
                                <button class="btn btn-sm btn-soft btn-warning" type="button"
                                    onclick={() => deleteEventPackage(item.id, item.name)}>Delete
                                </button>
                            {:else if modalOperation == 'New Event Package'}
                                <button class="btn btn-sm btn-soft btn-primary" type="button"
                                    onclick={() => saveNewEventPackage()}>Save
                                </button>
                            {/if}
                            <button class="btn btn-sm btn-soft btn-neutral" type="button"
                                onclick={() => {showModal = false}}>Close
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
        {/each}
    {/snippet}
</Modal>

<Toaster richColors position="top-center" />