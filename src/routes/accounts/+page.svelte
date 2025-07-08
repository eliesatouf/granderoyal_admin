<div in:fade out:fade class="grid grid-col justify-center items-center mt-1">
    <button class="btn btn-primary btn-sm btn-outline btn-circle" value="add"
            onclick={addUser}>
        <Icon name="person_add" size={24}/></button>
{#if error}
    <p class="error">{error}</p>
{:else if data}
    {#each data as user}
    <div class="card bg-base-300 my-1 w-80 flex flex-row" >
       <div class="card-body p-4 basis-2/3">
        <p class="card-title">{user.email}</p>
        <p >{user.givenName}</p>
        <div aria-label="status" class="status status-lg {user.active ? 'status status-success':''}"></div>

<!--         <div class="flex justify-items-start gap-2">
            <ul>
                {#each user.roles as role}
                <li>{role}</li>
                {/each}
            </ul>
        </div> -->
      </div>
      <div class="card-actions justify-end basis-1/3 self-end p-1">

        <button class="btn btn-sm btn-soft btn-primary"
            onclick={()=>(getUser(user.id))}>Edit</button>
        </div>

    </div>    

  {/each}
{:else}
    <p>Loading...</p>
{/if}
</div>

<Modal bind:showModal>
  {#snippet header()}
  <div class="text-primary text-lg font-bold">
   {modalOperation}
  </div>
  {/snippet}

 {#snippet children()}

    {#each modalContents as item}
    <form  autocomplete="off">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box  border p-4 ">
        <label class="label text-md">
            <input type="checkbox" class="toggle toggle-primary"
                bind:checked={item.active}  />Active
        </label>
      <legend class="fieldset-legend">{modalHeader}</legend>

      <label class="label">Email</label>
      <input type="email" class="input" placeholder="Email"
        bind:value="{item.email}" autocomplete="new-email" 
        />

      {#if  modalOperation =='New User'}
      <label class="label">Password</label>
      <input type="password" class="input" placeholder="password"  
        bind:value="{item.password}" autocomplete="new-password" 
        />
      {/if}

      <label class="label">Name</label> 
      <input type="text" class="input " placeholder="Name" 
        bind:value="{item.givenName }"/>

      {#if modalOperation==='Edit User'}
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
                onclick={()=>(deleteUser(item.id))}>Delete
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
        {#if showModal}
        <Toast/>
        {/if}

 {/snippet}


</Modal>

{#if !showModal}
<Toast/>
{/if}



<script>
import { onMount } from 'svelte';
import useFetch from '$lib/services/useFetch'
import { fade, fly,slide } from 'svelte/transition';
import Modal from '$lib/components/Modal.svelte';
import { toast } from '$lib/stores/toast';
import Toast from '$lib/components/Toast.svelte';
import Icon from '$lib/components/Icon.svelte'


let data = null;
let error = null;
let modalError = null;
let userData = null;
let showModal = false;
let closeModal = false;
let modalContents= null;
let modalHeader =null;
let isOpen = false;
let response = null;
let refreshUser = null;
let modalOperation =null;

const rolesLov= [
    {"id":1, "role":"ROLE_USER"},
    {"id":2, "role":"ROLE_ADMIN"}
]

onMount(getUserList,
    
    );

async function getUserList(){
    try {
        data = await useFetch('/api/users','GET');
    } catch (err) {
        error = err.message;
    }
}


async function getUser(id){
    const userData =  await useFetch("/api/users/"+id,'GET');
    modalContents=[userData]
    modalHeader = userData.email
    modalOperation="Edit User"
    showModal = true
}

async function deleteUser(id){
    const response =  await useFetch("/api/users/"+id,'DELETE');
    if(response === null){
        toast.success("User deleted",5000)
        showModal = false
        getUserList()
    }else{
        toast.error("Failed to deleted",5000)
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
        const response = await useFetch('/api/register ','POST', user);
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
    if(user.roles[0]) {user.roles[0] = "ROLE_USER"}
    if(user.roles[1]) {user.roles[1] = "ROLE_ADMIN"}
    user.roles = user.roles.filter(Boolean);
    const id = user.id
    delete user.id
    try{
        response =  await useFetch("/api/users/"+id, 'PATCH',user);
        try{
            refreshUser = await useFetch("/api/users/"+id, 'GET');
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