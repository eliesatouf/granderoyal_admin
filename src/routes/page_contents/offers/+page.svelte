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
		        <th>Type</th>
		        <th>Name</th>
		        <th>Description</th>
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
						<th>Add To Cart</th>
						<th>Discount</th>
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
		      			{#if item.type}
		      			{ offerTypes.find(type=> type.id === parseInt(item.type.split('/')[3]))?.label.toUpperCase() ?? 'na'}
		      			{/if}
		      		<!-- {offerTypes.find(type => type.id === item.type)?.label ?? 'Not found'} -->
		      	</td>
		      	<td>
		      		{item.name}
		      	</td>
		      	<td>
		      		{item.description}
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
		      	</td>
		      	<td>
		      		{item.dayTo}
		      	</td>
		      	<td>
		      		 <span class="{item.assignedToHomePage? 'status status-success':'status'}"></span>
		      	</td>
		      	<td>
		      		 <span class="{item.active? 'status status-success':'status'}"></span>
		      	</td>
		      	<td>
		      		<span class="{item.enableAddToCart? 'status status-success':'status'}"></span>
		      	</td>
		      	<td>
		      		{#if item.discount}
		      			{ discounts.find(type=> type.id === parseInt(item.discount.split('/')[3]))?.code.toUpperCase() ?? 'na'}
		      			{/if}
		      	</td>
		      	</tr>
					{/each}
					</tbody>
		  </table>
		    
		</div>
	</div>
</div>


<Modal bind:showModal>
<div class="lg:w-7xl ">
<div class="m-2 p-2 rounded md:rounded-lg bg-base-100 max-h-[600px] overflow-auto lg:overflow-hidden">
  <fieldset class="fieldset bg-base-200 border-base-300 max-h-[600px] rounded-box getDiscountDishId  border p-1  ">
    <legend class="fieldset-legend">{modalOperation}: {modalHeader}</legend>
    <div class="grid m-2 p-2 lg:flex lg:gap-1 ">
	     <div class="grid ">	
      	<fieldset class="fieldset bg-base-300 border-base-300 rounded-box w-[250px]  border p-4">

      	<label type="label" class="label">Offer type</label>
	          <select class="select" bind:value={record.type} onchange="{()=>{checkBogo()}}"  disabled="{modalOperation!='Create Offer'}">
	          {#each offerTypes as type}
	              <option value="/api/offerTypes/{type.id}">{type.label}</option>
	          {/each}
	        </select>  
	      {#if record.type && getOfferName() != 'bundle'}
      	<label type="label" class="label" >Discount</label>
          <select class="select select" bind:value={record.discount}
           disabled="{modalOperation!='Create Offer'}" onchange={()=>{getBogoTypeName()}}>
          {#each discounts as discount}
              <option value="/api/discounts/{discount.id}">{discount.code}</option>
          {/each}
        </select>
        {/if}

	      

	      {#if getOfferName() == 'bogo'}

	      <div class="flex">
	      <label class="label text text-orange-700">BOGO Type: </label>
	      <div class="label text text-orange-700 mx-2" placeholder="bogo  type" 
	       >{record.bogoType?record.bogoType.toUpperCase():''}</div>
	     </div>
	       {/if}
	        
	      <label class="label">Name</label>
	      <input type="text" class="input" placeholder="name of offer" 
	       bind:value="{record.name}"/>

	      <label class="label">Description</label>
	      <input type="text" class="input" placeholder="description of offer" 
	       bind:value="{record.description}"/>

	      <label class="label">Tag</label>
	      <input type="text" class="input" placeholder="offer tag" 
	       bind:value="{record.tag}"/>
	       
	      <label class="label">Image Source</label>
	      <div class="join mt-0" onmouseenter={()=>{defineSelectedImage(record.imageSource)}}>
        <div class="tooltip">
          <div class="tooltip-content m-0 p-0">
            <img src="{record.imageSource}" class="h-[250px] w-[250px]">
          </div>
          <input type="text " class="input" placeholder="offerImage" 
            bind:value="{record.imageSource}"  />
          </div>
        <Filemanager  selectedImage={handleSelectOffer} />
      </div>
    </fieldset>
    </div>

    <div class="grid bg-base-300 border-base-300 rounded-box w-[250px] lg:w-[280px]  lg:p-1  border p-1">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box  w-[230px] p-1">
        <legend class="fieldset-legend ">Price</legend>
        <div class="flex row gap-1">
          <label class="input">
            <span class="">Was</span>
            <input type="number" class="" placeholder="price was" 
             bind:value="{record.priceWas}"/>
          </label>
          
          <label class="input">
            <span class="">Now</span>
            <input type="number" class="" placeholder="price now" 
             bind:value="{record.priceNow}"/>
          </label>
        </div>
      </fieldset>

     <fieldset class="fieldset bg-base-200 border-base-300 rounded-box  w-[240px]">
        <legend class="fieldset-legend">Date</legend>
        <div class="flex row justify-center gap-1 w-[240px]">
          <label class="input w-[110px]">

            <input type="date" id="startDate" name="start_date" placeholder="Start Date"  class=""
            value={record.startDate ? dayjs(record.startDate).format('YYYY-MM-DD') : ''}
            oninput={(e) => {
                record.startDate = e.target.value ? new Date(e.target.value).toISOString() : null;
            }}/>
          </label>
          
          <label class="input w-[110px]" id="endDate">

            <input type="date" class="" placeholder="End Date" 
             value={record.endDate ? dayjs(record.endDate).format('YYYY-MM-DD') : ''}
            oninput={(e) => {
                record.endDate = e.target.value ? new Date(e.target.value).toISOString() : null;
            }}/>
          </label>
        </div>
      </fieldset>

      <div class="flex justify-content justify-between row gap-1 m-1 w-[240px]">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box p-1">
        <legend class="fieldset-legend">Hours</legend>
        <div class="flex row gap-1">
          <label class="input  w-[110px]">
            <span class="">From</span>
            <input type="text" class=" " placeholder="" 
             bind:value="{record.hoursFrom}"/>
          </label>
          
          <label class="input w-[110px]">
            <span class="">To</span>
            <input type="text" class="" placeholder="" 
             bind:value="{record.hoursTo}"/>
          </label>
        </div>
      </fieldset>
    	</div>

        <div class="flex justify-content justify-between row gap-1 w-[240px]">
          <fieldset class="fieldset bg-base-200 border-base-300 rounded-box p-1">
            <legend class="fieldset-legend">Day From</legend>  
            <select class="select w-[110px]" bind:value={record.dayFrom}>
              {#each days as day}
                <option value={day}>{day}</option>
              {/each}
            </select>
          </fieldset>
          
          <fieldset class="fieldset bg-base-200 border-base-300 rounded-box p-1">
            <legend class="fieldset-legend">Day To</legend>  
            <select class="select w-[110px]" bind:value={record.dayTo}>
              {#each days as day}
                <option value={day}>{day}</option>
              {/each}
            </select>
          </fieldset>
        </div>
      </div>

      <div class="grid">
      {#if getOfferName() != 'bundle' && record.discount}	
      	<div class="grid">
      	<fieldset class="fieldset bg-base-300 border-base-300 rounded-box  w-[250px]  p-4">
        

        
        {#if  isBogo || record.bogoType =='free_item' }
      	<div class="h-32 w-xxs bg-base-200">
		    <div class="h-32 overflow-y-auto p-3">
		    	<button class="btn btn-sm btn-soft btn-primary" onclick="{()=>{addingDishTo ='bogoDishes', showModalRecord=true}}">BOGO Dish
        </button>
		     	{#each record.bogoEligibleDishes  as dish,index}
		     		<div>{index+1}- {dish.name}
		     			{dishes.find(el=> el.id === parseInt(dish.split('/')[3]))?.type.toUpperCase() ?? 'na'}
		     			{dishes.find(el=> el.id === parseInt(dish.split('/')[3]))?.name.toUpperCase() ?? 'na'}
		     		</div>	
		     	{/each}
		   		</div>
	    	</div>
	    	{/if}

	    	
	    	{#if (record.type  && !isBogo) || (isBogo && record.bogoType != 'same') }
	    	<div class="h-32 w-xxs bg-base-200">
	    		<div class="h-32 overflow-y-auto p-3">
		     	<button class="btn btn-sm btn-soft btn-primary" onclick="{()=>{addingDishTo ='discountedDishes',showModalRecord=true}}">Discounted Dish
        </button>
		     	{#each record.discountedDishes  as dish,index}
		     		<div>{index+1}- 
		     			{dishes.find(el=> el.id === parseInt(dish.split('/')[3]))?.type.toUpperCase() ?? 'na'}
		     			{dishes.find(el=> el.id === parseInt(dish.split('/')[3]))?.name.toUpperCase() ?? 'na'}
		     		
		     		</div>	
		     	{/each}
		   		</div>
		   	</div>
		   	{/if}

	    	</fieldset>
	    	</div>
	    {/if}

	    {#if getOfferName() == 'bundle'}
      	<div class="grid">
	      	<fieldset class="fieldset bg-base-300 border-base-300 rounded-box  w-[250px]  p-4">
	        <label type="label" class="label">Bundles</label>
	          <select class="select select" bind:value={record.bundle} onchange="{()=>{getSelectedBudleDishes()}}">
		          {#each bundleList as bundle}
		              <option value="/api/bundles/{bundle.id}">{bundle.name}</option>
		          {/each}
	        	</select>

	      		<div class="h-32 w-xxs bg-base-200">
			    		<div class="h-32 overflow-y-auto p-3">
			     		{#each bundleSelectedDishes  as dish,index}
			     			<div>{index+1}- {dish}
			     			</div>	
			     		{/each}
			     		</div>
		    		</div>
	    		</fieldset>
	    	</div>
	    {/if}
	    </div>
	    <div class="grid">
      	<fieldset class="fieldset bg-base-300 border-base-300 rounded-box  w-[250px]  p-4">

      	<label class="label">Delivery Fee</label>
	      <input type="number" class="input" placeholder="delivery fee" 
	       bind:value="{record.deliveryFee}"/>


	      <div class="row p-1">
	       <input type="checkbox" bind:checked="{record.freeShipping}"
	        class="toggle toggle-primary  toggle-sm checked:bg-indigo-300" />
	       Free Shipping
     		</div>

	      <div class="row p-1">
	       <input type="checkbox" bind:checked="{record.assignedToHomePage}"
	        class="toggle toggle-primary  toggle-sm checked:bg-indigo-300" />
	       Assigned To Home Page
	     	</div>
	     	<div class="row p-1">
	       <input type="checkbox" bind:checked="{record.active}"
	        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
	       Active
	     	</div>
	     	<div class="row p-1">
		      <input type="checkbox" bind:checked="{record.enableAddToCart}"
		        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
		       Add to cart
		    </div>
	     </fieldset>
	    </div>
   	</div>
    
    	
    

  <div class="flex justify-center gap-4 pb-2">
   <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveOneOfferItem(record))}>
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
</div>
</Modal>

<ModalEditRecord bind:showModalRecord>
<div class="max-h-200">

<label class="input">
    <span class="">Find dish:</span>
    <input type="text" class="" placeholder="EX. calamares" 
      bind:value={searchTerm} 
      onchange="{()=>{findDish()}}"/>
  </label>


{#if addingDishTo =='discountedDishes'}
<div class="h-56">
<div class="h-56 overflow-auto">
	<ul class="list bg-base-100 rounded-box shadow-md">
	{#each searchResults as dish}
		<div class="flex gap-1">
		<li class="list-row">

		<badge 
		class="badge {dish.id ==getDiscountDishId(dish.id)? 'badge-success':'badge-default'}"
		>{dish.type} {dish.name}
	 </badge>

	 {#if dish.id != getDiscountDishId(dish.id) }
		<button class="btn btn-soft btn-success btn-xs" 
		disabled={dish.id ==getDiscountDishId(dish.id)}
		onclick="{()=>{addDish(dish.id)}}"
		>add</button>
		{/if}

		{#if dish.id == getDiscountDishId(dish.id) }
		<button class="btn btn-soft btn-secondary btn-xs" 
		disabled={dish.id !=getDiscountDishId(dish.id)}
		onclick="{()=>{removeDish(dish.id)}}"
		>remove</button>
		{/if}

	</li>
	</div>
	{/each}
</ul>
</div>
</div>
{/if}



{#if addingDishTo =='bogoDishes' }
<div class="h-56">
<div class="h-56 overflow-auto">
<ul class="list bg-base-100 rounded-box shadow-md">
	{#each searchResults as dish}
		<div class="flex gap-1">
		<li class="list-row">

		<badge 
		class="badge {dish.id ==getBogoDishId(dish.id) ? 'badge-success':'badge-default'}"
		>{dish.type}-{dish.name}
	 </badge>

	 {#if dish.id != getBogoDishId(dish.id) }
		<button class="btn btn-soft btn-success btn-xs" 
		disabled={dish.id ==getBogoDishId(dish.id)}
		onclick="{()=>{addDish(dish.id)}}"
		>add</button>
		{/if}

		{#if dish.id == getBogoDishId(dish.id) }
		<button class="btn btn-soft btn-secondary btn-xs" 
		disabled={dish.id !=getBogoDishId(dish.id)}
		onclick="{()=>{removeDish(dish.id)}}"
		>remove</button>
		{/if}

	</li>
	</div>
	{/each}
</ul>
</div>
</div>
{/if}

</div>
</ModalEditRecord>



<script>
import { onMount } from 'svelte';
import useFetch from '$lib/services/useFetch'
import { toast } from '$lib/stores/toast';
import Toast from '$lib/components/Toast.svelte';
import Filemanager from '$lib/components/Filemanager.svelte';
import Modal from '$lib/components/Modal.svelte';
import ModalEditRecord from '$lib/components/ModalEditRecord.svelte';
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
let offerTypes= $state()
let discounts=$state()
let dishes =$state()
let showModalRecord=$state(false)
let discountedDishes=$state([])
let isBogo = $state(false)
let bundleSelectedDishes = $state([])
let bundleList = $state([])
let addingDishTo = $state()

const days=[
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

let searchTerm = $state('all');
let searchResults = $state([]);
let timeoutId;


onMount(() => {
	getOfferType()
	getDiscounts()
	getDishes()
	getBundleList()
  getOffers()
})

function findDish(term){
	if(!term){
		return 0
	}
	if(term.toLowerCase() == 'all'){
		return dishes
	}else{
		return dishes.filter(el=>el.name.toLowerCase().includes(term.toLowerCase()) ||
		el.menu.toLowerCase().includes(term.toLowerCase()))
	}
}

function debouncedSearch(term) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    if (term.length > 2) {
      searchResults = await findDish(term);
    }
  }, 300);
}
  
$effect(() => {
  debouncedSearch(searchTerm);
});

function checkBogo(){
	let name = offerTypes.find(type=> type.id === parseInt(record.type.split('/')[3]))?.name ?? 'na'
	getBogoTypeName()
	name.toLowerCase()=='bogo'? isBogo = true: isBogo = false 
	record.isBogo = isBogo
	if(isBogo && !record.bogoEligibleDishes){
		record.bogoEligibleDishes=[]
	}else if(!record.discountedDishes){
		record.discountedDishes=[]
		record.bogoEligibleDishes=[]
	}

}


function getBogoDishId(dishId){
	if(record.bogoEligibleDishes && record.bogoEligibleDishes.length >0 ){
		return record.bogoEligibleDishes.find(el=>el.split('/')[3] ==  dishes.find(el=>el.id ==dishId).id)?.split('/')[3]
	}
}

function getDiscountDishId(dishId){
	if(record.discountedDishes){
		let id = record.discountedDishes.find(el=>el.split('/')[3] ==  dishes.find(el=>el.id == dishId).id)?.split('/')[3]
		return id
	}
}

function test(){
	let y = record.discountedDishes.find(el=>el.split('/')[3] ==  dishes.find(el=>el.id == 11).id).split('/')[3]
	console.log(y)
}

function addDish(dishId){
	if(addingDishTo =='bogoDishes'){
		record.bogoEligibleDishes.push(`/api/dishes/${dishId}`)
	}
	else if(addingDishTo =='discountedDishes'){
		discountedDishes.push(`/api/dishes/${dishId}`)
		record.discountedDishes= discountedDishes
	}
}

function removeDish(id){

	if(addingDishTo =='discountedDishes'){
		const newArray = record.discountedDishes.filter(item => item !== `/api/dishes/${id}`);
		record.discountedDishes = newArray
		discountedDishes = record.discountedDishes
	}else if(addingDishTo =='bogoDishes'){
		const newArray = record.bogoEligibleDishes.filter(item => item !== `/api/dishes/${id}`);
		record.bogoEligibleDishes = newArray
		//discountedDishes = record.discountedDishes
	}
}

function getOfferLabel(item){
	//console.log(item.type)
	const id = item.type.split('/')[3]
	// console.log(typeof(id))
	const label = offerTypes.find(type=> type.id === parseInt(item.type.split('/')[3]))?.label ?? 'na'
 // console.log(label)
	return label
}

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
  discountedDishes = record.discountedDishes

  const typeid = record.type.split('/')[3]
  let offerName = offerTypes.find(el=> el.id === parseInt(typeid))
  checkBogo()
  if(getOfferName() =='bundle'){
  	getSelectedBudleDishes()
  }
}

async function handleSelectOffer(item){
	const index = offerItems.findIndex(item=>item.id == record.id)
  record.imageSource = item

}

async function saveOneOfferItem(item){
	// console.log(item)
	// return 0
	let saveItem=''
	const iris = discountedDishes.find(item=>`/api/dishes/${item.id}`)
	record.discountedDishes=discountedDishes
	
	if(record.type == 'bundle'){
		//record.bundle = `/api/bundles/`
	}

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
  	let deleteItem =  await useFetch('/offers/' + id, 'DELETE',null, true);
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
    //console.log(record)
	
}

async function getOfferType(){
	const response =  await useFetch('/offer_types?active=true', 'GET',null, true);
  offerTypes = response
  //console.log(offerTypes)
}

function getOfferName(){
	if (!record.type) return null
	let offerName = offerTypes.find(type=> type.id === parseInt(record.type.split('/')[3]))?.name.toLowerCase()
	return offerName
	//console.log(offerName)
}

async function getDiscounts(){
  const response = await useFetch('/discounts?active=true', 'GET',null, true);
  discounts = response

}

async function getDishes(){
  const response = await useFetch('/dishes?active=true&type=dining', 'GET',null, true);
  dishes = response
}

async function getOneDish(iri){
	const id =iri.split('/')[3]
  const response = await useFetch(`/dishes/${id}`, 'GET',null, true);
  return response.name
}

async function getBundleList(){
	const response = await useFetch('/bundles', 'GET',null, true);
	bundleList = response
	//console.log(bundleList)
}

async function getSelectedBudleDishes(){
	bundleSelectedDishes=[]
	if(!record.bundle) return 0
	let id = record.bundle.split('/')[3]
	const bundle = await useFetch(`/bundles/${id}`, 'GET',null, true);

	for(let i =0; i<bundle.dishes.length; i++){
		let xx = await getOneDish(bundle.dishes[i])
		bundleSelectedDishes.push(xx)
	}
}

async function getBogoTypeName(){
	//console.log(record)
	if(!record.discount) return 0
	const discountId = record.discount.split('/')[3]
	const discount = await useFetch(`/discounts/${discountId}`, 'GET',null, true);
	const offName = offerTypes.find(type=> type.id === parseInt(record.type.split('/')[3]))?.name.toLowerCase()
	console.log(offName)
	record.bogoType = discount.bogoType
}


</script>

