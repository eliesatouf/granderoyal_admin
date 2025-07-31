<div  class="grid grid-col lg:flex lg:flex-wrap justify-center  w-full">
	<div class="">
		<button class="btn btn-primary btn-soft btn-sm"
		      			onclick="{()=>{createEvents(), showModal=true}}">
		      			<Icon name="add" />new</button>
		<div class="overflow-x-auto lg:hidden">

		  <table class="table table-xs  ">
		    <thead>
		      <tr>
		      	<th>Action</th>
		        <th>ID</th>
		        <th>Name</th>
		      </tr>
		    </thead>
		    <tbody>
		      {#each offerItems as item, i}
		      	<tr>
		      		<td><button class="btn btn-primary btn-soft btn-sm"
		      			onclick="{()=>{getOneEvents(item.id), showModal=true}}">edit	</button>
		      		</td>
		      	<td>
		      		{i+1}
		      	</td>
		      	<td>
		      		{item.name} {item.active} <span class="{item.active? 'status status-success':'status'}"></span>
		      	</td>

		      </tr>
		      {/each}
		    </tbody>
		  </table>
		</div>

		<div class="overflow-x-auto hidden lg:block">
		  <table class="table table-xs  ">
		    <thead>
		      <tr>
		      	<th>Action</th>
		        <th>ID</th>
		        <th>Name</th>
		        <th>Image</th>
		        <th>imageX</th>
		        <th>imageY/th>
		        <th>imageRotate</th>
		        <th>noteX</th>
		        <th>noteY</th>
		        <th>noteRotate</th>
		        <th>noteTextColor</th>
		        <th>noteBgColor</th>
						<th>Active</th>
		      </tr>
		    </thead>
		    <tbody>
		      {#each offerItems as item, i}
		      	<tr>
		      		<td><button class="btn btn-primary btn-soft btn-sm"
		      			onclick="{()=>{getOneEvents(item.id,i), showModal=true}}">edit	</button>
		      		</td>
		      	<td>
		      		{i+1}
		      	</td>
		      	<td>
		      		{item.name}
		      	</td>
		      	<td>
		      		{item.imageSource}
		      	</td>
		      	<td>
		      		{item.imageX}
		      	</td>
		      	<td>
		      		{item.imageY}
		      	</td>
		      	<td>
		      		{item.imageRotate}
		      	</td>
		      	<td>
		      		{item.noteX}
		      	</td>
		      	<td>
		      		{item.noteY}
		      	</td>
		      	<td>
		      		{item.noteRotate}
		      	</td>
		      	<td>
		      		{item.noteTextColor}
		      	</td>
		      	<td>
		      		{item.noteBgColor}
		      	</td><td>
		      		{item.dayTo}
		      	</td>
		      	<td>
		      		 <span class="{item.active? 'status status-success':'status'}"></span>
		      	</td>
		      	</tr>
					{/each}
					</tbody>
		  </table>
		    
		</div>
	</div>
</div>


<Modal bind:showModal>
<div class="m-2 p-2 rounded md:rounded-lg bg-base-100 ">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-1">
    <legend class="fieldset-legend">{modalOperation}: {modalHeader}</legend>
    <div class="grid m-2 p-2">
     

      <legend class="fieldset-legend">{record.name}</legend>

      <label class="label">Name</label>
      <input type="text" class="input" placeholder="name of event" 
       bind:value="{record.name}"/>
       
      <label class="label">Image Source</label>
      <div class="join mt-0" onmouseenter={()=>{defineSelectedImage(record.imageSource)}}>
        <div class="tooltip">
          <div class="tooltip-content m-0 p-0">
            <img src="{record.imageSource}" class="h-[250px] w-[250px]">
          </div>
          <input type="text " class="input" placeholder="iamge source" 
            bind:value="{record.imageSource}"  />
          </div>
        <Filemanager  selectedImage={handleSelectEvents} />
      </div>


        <legend class="fieldset-legend">imageXY</legend>

          <label class="label ">
            <span class="">image X</span></label>
          <input type="text" class="input" placeholder="" 
             bind:value="{record.imageX}"/>

             <label class="label ">
            <span class="">image Y</span></label>
          <input type="text" class="input" placeholder="" 
             bind:value="{record.imageY}"/>

             <label class="label ">
            <span class="">image Rotate</span></label>
          <input type="text" class="input" placeholder="" 
             bind:value="{record.imageRotate}"/>
          
          <div class="divider"></div>
   			
   				<label class="label ">
            <span class="">note X</span></label>
          <input type="text" class="input" placeholder="" 
             bind:value="{record.noteX}"/>

             <label class="label ">
            <span class="">note Y</span></label>
          <input type="text" class="input" placeholder="" 
             bind:value="{record.noteY}"/>

             <label class="label ">
            <span class="">note rotate</span></label>
          <input type="text" class="input" placeholder="" 
             bind:value="{record.noteRotate}"/>

           <div class="divider"></div>

          <label class="label ">
            <span class="">Note Text Color</span></label>
          <input type="text" class="input" placeholder="" 
             bind:value="{record.noteTextColor}"/> 

           <label class="label ">
            <span class="">Note BG Color</span></label>
          <textarea type="text" class="input text-wrap" placeholder="" 
             bind:value="{record.noteBgColor}"/> 


     <div class="row p-2">
       <input type="checkbox" bind:checked="{record.active}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       Active
     </div>
    </div> 

  <div class="flex justify-between">
   <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveOneEventsItem())}>
    Save
  </button>

  

  <button class="btn btn-soft btn-default w-1/4" onclick={()=>showModal = false}>
    Close
  </button>

  <button class="btn btn-soft btn-error w-1/4" onclick={()=>{deleteEventsItem(record.id), showModal = false}}>
    Delete
  </button>

</div>

  </fieldset>

</div>
</Modal>



<script>
import { onMount } from 'svelte';
import useFetch from '$lib/services/useFetch'
import { toast } from '$lib/stores/toast';
import Toast from '$lib/components/Toast.svelte';
import Filemanager from '$lib/components/Filemanager.svelte';
import Modal from '$lib/components/Modal.svelte';
import Icon from '$lib/components/Icon.svelte'
import fileManagerState from '$lib/stores/fileManagerState.svelte.js'
import dayjs from 'dayjs';

let showModal = $state(false);
let closeModal = $state(false)

let offerItems =$state('')
let modalOperation = $state('')
let modalContents=$state([])
let record=$state([])
let newEvents=$state([])
let modalHeader=$state('')

const days=[
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]


onMount(() => {

  getEvents()

})

async function getEvents(){
  const response = await useFetch('/events', 'GET',null, true);
  offerItems = response
}


async function getOneEvents(id){
	modalOperation= 'Edit'
    const offerData =  await useFetch( '/events/'+id,'GET',null,true);
    record=offerData
    modalHeader = record.name
    modalOperation="Edit offer"

}

async function handleSelectEvents(item){
	const index = offerItems.findIndex(item=>item.id == record.id)
  record.imageSource = item

}

async function saveOneEventsItem(index){
	
	let saveItem=''
	if(modalOperation=='Create Events'){
		try{
			saveItem =  await useFetch('/events', 'POST',record, true);
			if(saveItem.status && saveItem.status != 200){
				toast.error("Failed to create offer",2000);
			}else{
				toast.success("Saved successfully",2000);	
	  		getEvents()
	  		showModal= false
			}
	  	
	  }
	  catch(e){
	  	toast.error("Failed to create offer",2000);	
	  }
	}
	else{
		try{
  		let saveItem =  await useFetch('/events/' + record.id, 'PATCH',record, true);
	  	toast.success("Saved successfully",2000);	
	  	getEvents()
	  	showModal= false
	  }
		catch(e) {
	  	toast.error("Failed to save offer",2000);	
	  	console.log(e);
	  }
	}
  
}

async function deleteEventsItem(id){
  try{
  	let saveItem =  await useFetch('/events/' + id, 'DELETE',null, true);
  	toast.success("Deleted successfully",2000);	
  	getEvents()
  }
	catch(e) {
  	toast.error("Failed to delete offer",2000);	
  	console.log(e);
  }
}


function defineSelectedImage(item){
  fileManagerState.store.tmpImagePath =item
}

async function createEvents(){
	//record.name =''
	modalOperation='Create Events'
	let allschema =  await useFetch('/docs.jsonld#/Events', 'GET',null, false);

	const schema = allschema.supportedClass.find(schema=>schema.title==="Event").supportedProperty

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

