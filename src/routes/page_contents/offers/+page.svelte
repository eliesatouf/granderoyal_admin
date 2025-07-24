<div  class="grid grid-col lg:flex lg:flex-wrap justify-center  w-full">
	<div class="">
		<button class="btn btn-primary btn-soft btn-sm"
		      			onclick="{()=>{createOffer(), showModal=true}}">
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
		      			onclick="{()=>{getOneOffer(item.id), showModal=true}}">edit	</button>
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
		        <th>Description</th>
		        <th>Image</th>
		        <th>Price was</th>
		        <th>Price Now</th>
		        <th>Tag</th>
		        <th>Start Date</th>
		        <th>End Date</th>
		        <th>Hour From</th>
		        <th>Hour To</th>
		        <th>Day From</th>
		        <th>Day To</th>
		        <th>Assigned</th>
						<th>Active</th>
		      </tr>
		    </thead>
		    <tbody>
		      {#each offerItems as item, i}
		      	<tr>
		      		<td><button class="btn btn-primary btn-soft btn-sm"
		      			onclick="{()=>{getOneOffer(item.id,i), showModal=true}}">edit	</button>
		      		</td>
		      	<td>
		      		{i+1}
		      	</td>
		      	<td>
		      		{item.name}
		      	</td>
		      	<td>
		      		{item.description}
		      	</td>
		      	<td>
		      		{item.imageSource}
		      	</td>
		      	<td>
		      		{item.priceWas}
		      	</td>
		      	<td>
		      		{item.priceNow}
		      	</td>
		      	<td>
		      		{item.tag}
		      	</td>
		      	<td>
		      		{item.startDate}
		      	</td>
		      	<td>
		      		{item.endDate}
		      	</td>
		      	<td>
		      		{item.hoursFrom}
		      	</td>
		      	<td>
		      		{item.hoursTo}
		      	</td>
		      	<td>
		      		{item.dayFrom}
		      	</td><td>
		      		{item.dayTo}
		      	</td>
		      	<td>
		      		 <span class="{item.assignedToHomePage? 'status status-success':'status'}"></span>
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
      <input type="text" class="input" placeholder="name of record" 
       bind:value="{record.name}"/>

      <label class="label">Description</label>
      <input type="text" class="input" placeholder="description of record" 
       bind:value="{record.description}"/>

      <label class="label">Tag</label>
      <input type="text" class="input" placeholder="record description" 
       bind:value="{record.tag}"/>

      <label class="label">Image Source</label>
      <div class="join mt-0" onmouseenter={()=>{defineSelectedImage(record.imageSource)}}>
        <div class="tooltip">
          <div class="tooltip-content m-0 p-0">
            <img src="{record.imageSource}" class="h-[250px] w-[250px]">
          </div>
          <input type="text " class="input" placeholder="heroImageFallback" 
            bind:value="{record.imageSource}"  />
          </div>
        <Filemanager  selectedImage={handleSelectOffer} />
      </div>

      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-1">
        <legend class="fieldset-legend">Price</legend>
        <div class="flex row gap-1">
          <label class="input ">
            <span class="">Was</span>
            <input type="number" class=" " placeholder="price was" 
             bind:value="{record.priceWas}"/>
          </label>
          
          <label class="input">
            <span class="">Now</span>
            <input type="number" class="" placeholder="price now" 
             bind:value="{record.priceNow}"/>
          </label>
        </div>
      </fieldset>

     <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-1">
        <legend class="fieldset-legend">Date</legend>
        <div class="flex row gap-1">
          <label class="input ">

            <input type="date" id="startDate" name="start_date" placeholder="Start Date" 
            value={record.startDate ? dayjs(record.startDate).format('YYYY-MM-DD') : ''}
            oninput={(e) => {
                record.startDate = e.target.value ? new Date(e.target.value).toISOString() : null;
            }}/>
          </label>
          
          <label class="input" id="endDate">

            <input type="date" class="" placeholder="End Date" 
             value={record.endDate ? dayjs(record.endDate).format('YYYY-MM-DD') : ''}
            oninput={(e) => {
                record.endDate = e.target.value ? new Date(e.target.value).toISOString() : null;
            }}/>
          </label>
        </div>
      </fieldset>

      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-1">
        <legend class="fieldset-legend">Hours</legend>
        <div class="flex row gap-1">
          <label class="input ">
            <span class="">From</span>
            <input type="text" class=" " placeholder="price was" 
             bind:value="{record.hoursFrom}"/>
          </label>
          
          <label class="input">
            <span class="">To</span>
            <input type="text" class="" placeholder="price now" 
             bind:value="{record.hoursTo}"/>
          </label>
        </div>
      </fieldset>

        <div class="flex justify-content justify-between row gap-2">
          <fieldset class="fieldset bg-base-200 border-base-300 rounded-box  border px-7">
            <legend class="fieldset-legend">Day From</legend>  
            <select class="select" bind:value={record.dayFrom}>
              {#each days as day}
                <option value={day}>{day}</option>
              {/each}
            </select>
          </fieldset>
          
          <fieldset class="fieldset bg-base-200 border-base-300 rounded-box  border px-7">
            <legend class="fieldset-legend">Day To</legend>  
            <select class="select" bind:value={record.dayTo}>
              {#each days as day}
                <option value={day}>{day}</option>
              {/each}
            </select>
          </fieldset>
        </div>


      <div class="row p-2">
       <input type="checkbox" bind:checked="{record.assignedToHomePage}"
        class="toggle toggle-primary  toggle-sm checked:bg-indigo-300" />
       Assigned To Home Page
     </div>
     <div class="row p-2">
       <input type="checkbox" bind:checked="{record.active}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       Active
     </div>
    </div>    
  <div class="flex justify-between">
   <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveOneOfferItem())}>
    Save
  </button>

  

  <button class="btn btn-soft btn-default w-1/4" onclick={()=>showModal = false}>
    Close
  </button>

  <button class="btn btn-soft btn-error w-1/4" onclick={()=>{deleteOfferItem(record.id), showModal = false}}>
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
let newOffer=$state([])
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

  getOffers()

})

async function getOffers(){
  const response = await useFetch('/offers', 'GET',null, true);
  offerItems = response
}


async function getOneOffer(id){
	modalOperation= 'Edit'
    const offerData =  await useFetch( '/offers/'+id,'GET',null,true);
    record=offerData
    modalHeader = record.name
    modalOperation="Edit offer"

}

async function handleSelectOffer(item){
	const index = offerItems.findIndex(item=>item.id == record.id)
  record.imageSource = item

}

async function saveOneOfferItem(index){
	
	let saveItem=''
	if(modalOperation=='Create Offer'){
		try{
			saveItem =  await useFetch('/offers', 'POST',record, true);
			if(saveItem.status && saveItem.status != 200){
				toast.error("Failed to create offer",2000);
			}else{
				toast.success("Saved successfully",2000);	
	  		getOffers()
	  		showModal= false
			}
	  	
	  }
	  catch(e){
	  	toast.error("Failed to create offer",2000);	
	  }
	}
	else{
		try{
  		let saveItem =  await useFetch('/offers/' + record.id, 'PATCH',record, true);
	  	toast.success("Saved successfully",2000);	
	  	getOffers()
	  	showModal= false
	  }
		catch(e) {
	  	toast.error("Failed to save offer",2000);	
	  	console.log(e);
	  }
	}
  
}

async function deleteOfferItem(id){
  try{
  	let saveItem =  await useFetch('/offers/' + id, 'DELETE',null, true);
  	toast.success("Deleted successfully",2000);	
  	getOffers()
  }
	catch(e) {
  	toast.error("Failed to delete offer",2000);	
  	console.log(e);
  }
}


function defineSelectedImage(item){
  fileManagerState.store.tmpImagePath =item
}

async function createOffer(){
	//record.name =''
	modalOperation='Create Offer'
	let allschema =  await useFetch('/docs.jsonld#/Offer', 'GET',null, false);

	const schema = allschema.supportedClass.find(schema=>schema.title==="Offer").supportedProperty

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

