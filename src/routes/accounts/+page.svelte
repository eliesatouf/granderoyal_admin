<div in:fade out:fade class="grid grid-col justify-center items-center mt-1">
    <button class="btn btn-primary btn-xs btn-outline btn-circle mx-3" value="add"
            onclick={addUser}>
        <Icon name="person_add" /></button>
{#if error}
    <p class="error">{error}</p>
{:else if data}
    {#each data as user}
    <div class="card bg-base-300 my-1 flex flex-row m-3 lg:w-xs" >
       <article class="card-body break-all text-wrap">
        <p class="">{user.email}</p>
        <p >{user.givenName}</p>
        <div class="flex flex-row justify-start items-center">
        <div aria-label="status" class="status status-lg {user.active ? 'status status-success':''}"></div>
        <button class="btn btn-sm btn-soft btn-primary"
            onclick={()=>(getUser(user.id))}>Edit</button>
        </div>
      </article>
    </div>    
  {/each}
{:else}
    <p>Loading...</p>
{/if}
</div>

<Modal bind:showModal>
  {#snippet header()}
  <div class="text-primary text-lg font-bold ">
   {modalOperation}
  </div>
  {/snippet}
 
 {#snippet children()}
    {#each modalContents as item}
    <form  autocomplete="off" class="">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box lg:min-w-100 lg:h-full overflow-auto p-7">
        <label class="label text-md">
            <input type="checkbox" class="toggle toggle-primary"
                bind:checked={item.active}  />Active
        </label>
      <input disabled type="text" class="input " placeholder="ID" 
        bind:value="{item.id }"/>



      <label class="label">Email</label>
      <textarea class="textarea  break-all text-wrap" placeholder="Email"
        bind:value="{item.email}" autocomplete="new-email" 
        />

        <label class="label">Name</label> 
      <input type="text" class="input " placeholder="Name" 
        bind:value="{item.givenName }"/>

      {#if  modalOperation =='New User'}
      <label class="label">Password</label>
      <input type="password" class="input" placeholder="password"  
        bind:value="{item.password}" autocomplete="new-password" 
        />
      {/if}

      {#if modalOperation==='Edit User'}
      
      <label class="label">Name</label> 
      <input type="text" class="input " placeholder="Name" 
        bind:value="{item.givenName }"/>

      <label class="label">Family Name</label>
      <input type="text" class="input " placeholder="Family Name" 
        bind:value="{item.familyName }"/>

      <label class="label">Telephone</label>
      <input type="text" class="input " placeholder="Telephone" 
        bind:value="{item.telephone }"/>

      <label class="label">Job Title</label>
      <input type="text" class="input " placeholder="Job Title" 
        bind:value="{item.jobTitle }"/>

      <label class="label">Department</label>
      <input type="text" class="input " placeholder="Department" 
        bind:value="{item.department }"/>
      {/if}

      <div class="card  my-1" >
        <div class="card-actions">
          {#each rolesLov as role,i}
            <la>
                <label class="label text-md">
                    <input type="checkbox" class="checkbox "
                        bind:checked={item.roles[i]}  />
                    {role.role}
                  </label>
            </la>
          {/each}
        </div>

      <div class=" card-actions justify-end p-1">
          {#if modalOperation =='Edit User'}
              <button class="btn btn-sm btn-soft btn-primary"
                onclick={()=>(saveUser(item))}>Save
              </button>
              <button class="btn btn-sm btn-soft btn-warning"
                onclick={()=>(deleteUser(item.id, item.email))}>Delete
              </button>
          {:else if modalOperation =='New User'}
              <button class="btn btn-sm btn-soft btn-primary"
                onclick={()=>(saveNewUser(item))}>Save
              </button>
          {/if}
          <button class="btn btn-sm btn-soft btn-nutral"
                onclick={()=>{showModal=false}}>Close
              </button>
      </div>
 
      </div>

    </fieldset>
    </form>
    {/each}
 {/snippet}


</Modal>


<Toaster richColors position="top-center" />




<script>
import { onMount } from 'svelte';
import useFetch from '$lib/services/useFetch'
import { fade, fly,slide } from 'svelte/transition';
import Modal from '$lib/components/Modal.svelte';
import { Toaster, toast } from 'svelte-sonner';
import Icon from '$lib/components/Icon.svelte'
import { afterNavigate} from '$app/navigation';
import { jwtDecode } from 'jwt-decode';
let admin =$state(false)

const API_URL = import.meta.env.VITE_API_URL;

let data = $state([]);
let error = $state();
let modalError = null;
let userData = $state([]);
let showModal = $state(false);
let closeModal = $state(false);
let modalContents= $state();
let modalHeader =$state();
let isOpen = $state(false);
let response = $state();
let refreshUser = null;
let modalOperation =$state();

const rolesLov= [
    {"id":1, "role":"ROLE_USER"},
    {"id":2, "role":"ROLE_ADMIN"}
]

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


onMount(getUserList,
    
    );

async function getUserList(){
    try {
        data = await useFetch('/users','GET',null,true);
        console.log('data', data)
    } catch (err) {
        error = err.message;
    }
}


async function getUser(id){
    const userData =  await useFetch( '/users/'+id,'GET',null,true);
    modalContents=[userData]
    modalHeader = userData.email
    modalOperation="Edit User"
    showModal = true
}

async function deleteUser(id,name){
    let confirmDelete = confirm(`Delete user ${name}`)
    if(!confirmDelete) return 0

    const response =  await useFetch('/users/'+id,'DELETE',null,true);
    //console.log('response', response)
    if(!response){
        toast.success("User deleted")
        showModal = false
        getUserList()
    }else{
        toast.error("Failed to deleted")
    }

}

async function addUser(){
    showModal = true
    modalOperation= "New User"
    
    let newUser = {
        "email": null,
        "password":null,
        "givenName": null,
        // "familyName":null,
        "roles": [
            "ROLE_USER"
        ],
        "active":false
        // "telephone": null,
        // "jobTitle": null,
        // "department": null
    }
    modalHeader="New User"
    modalContents = [newUser]

    // const userData =  await useFetch("/api/users/"+id,'GET');
    // modalContents=[userData]
    // modalHeader = userData.email    
}

async function saveNewUser(){
   

    let user = modalContents[0]
    if(user.roles[0]) {user.roles[0] = "ROLE_USER"}
    if(user.roles[1]) {user.roles[1] = "ROLE_ADMIN"}
    user.roles = user.roles.filter(Boolean);
    try {
        const response = await useFetch('/register','POST', user, true);
        if(response.id){
            toast.success("User created",5000);
            getUserList()
            showModal = false

        }else{
            toast.error("Failed to create user",5000);
        }
    } catch (err) {
        toast.error(err,5000);
    }

}

async function saveUser(user){
    console.log(API_URL)
    if(user.roles[0]) {user.roles[0] = "ROLE_USER"}
    if(user.roles[1]) {user.roles[1] = "ROLE_ADMIN"}
    user.roles = user.roles.filter(Boolean);
    const id = user.id
    delete user.id
    try{
        response =  await useFetch("/users/"+id, 'PATCH',user, true);
        try{
            refreshUser = await useFetch("/users/"+id, 'GET',null, true);
            data = data.map(user => user.id === id ? { ...user, ...refreshUser } : user)
            showModal = false
            toast.success("Changes saved",5000);

        }catch(err){

            toast.error("Failed to save changes",5000);
        }
    } catch (err){

        toast.error(err.message,5000);
    }
    
}


</script>

<style>
    
label{
    margin-top:10px;
}

::placeholder {
    color:orange;
    opacity:30%;
}

</style>