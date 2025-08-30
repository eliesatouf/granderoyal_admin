<div  class="grid grid-col lg:flex lg:flex-wrap justify-center  w-full">
<div class="w-sm">
<details class="collapse bg-base-100 border-base-300 border p-0 m-0">
  <summary class="collapse-title font-semibold w-xs ">Hero Section</summary>
  <div class="collapse-content text-sm w-xs p-0 m-0">

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-3 m-2 ">
  <legend class="fieldset-legend">Hero section</legend>

  <label class="label">hero header</label>
  <input type="text" class="input" placeholder="Header" 
  	bind:value="{data.hearoHeader}"/>

  <label class="label">hero text</label>
  <input type="text" class="input" placeholder="hearoText" 
   bind:value="{data.hearoText}"/>

  <label class="label">hero video</label>
  <div class="join mt-0" onmouseenter={()=>{defineSelectedImage(data.heroVideo)}}>
    <div class="tooltip">
      <div class="tooltip-content h-[250px] w-[150px] p-0 m-0">
        <video src="{data.heroVideo}" class="p-0 m-0">
      </div>
    <input type="text" class="input" placeholder="heroVideo" 
    bind:value="{data.heroVideo}"/>
  </div>
    <Filemanager selectedImage={handleSelectHeroVid} />
  </div>

  
  <label class="label pb-0">hero Image Fallback</label>
  <div class="join mt-0" onmouseenter={()=>{defineSelectedImage(data.heroImageFallback)}} >
    <div class="tooltip">
      <div class="tooltip-content">
        <img src="{data.heroImageFallback}">
      </div>
        <input type="text " class="input" placeholder="heroImageFallback"
          bind:value="{data.heroImageFallback}"  />
    </div>
    <Filemanager  selectedImage={handleSelectImage} />
  </div>

  <label class="label">hero Button text</label>
  <input type="text" class="input" placeholder="heroButtontext" 
   bind:value="{data.heroButtontext}"/>

  <div class="divider">Featured Items </div>

  <label class="label">featured Blocks header</label>
  <input type="text" class="input" placeholder="featuredBlocksheader" 
   bind:value="{data.featuredBlocksheader}"/>

  <label class="label">featured Blocks text</label>
  <input type="text" class="input" placeholder="featuredBlockstext" 
   bind:value="{data.featuredBlockstext}"/>

   <div class="divider">Offers</div>

   <label class="label">Offer header</label>
  <input type="text" class="input" placeholder="offerheader" 
   bind:value="{data.offerheader}"/>

  <label class="label">Offer text</label>
  <input type="text" class="input" placeholder="offertext" 
   bind:value="{data.offertext}"/>
  
  <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveHeroSection(data))}>
    Save
  </button>

 </fieldset>
</div>
</details>
</div>


<div class="w-sm">
<details class="collapse bg-base-100 border-base-300 border p-0 m-0">
  <summary class="collapse-title font-semibold w-xs ">Featured Items</summary>
  <div class="collapse-content text-sm w-xs p-0 m-0">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 m-2">
  <legend class="fieldset-legend">Featured block</legend>

  <div class="tabs tabs-lift ">
    {#each featuredItems as item,i}
    
      <input type="radio" name="my_tabs_3" class="tab" aria-label="{item.name}" 
        onclick="{()=>{activeTabFeautred = i}}"/>
      <div class="tab-content bg-base-100 border-base-300 p-6">
        <legend class="fieldset-legend">{item.name}</legend>
        <label class="label">{item.name}</label>
        <input type="text" class="input" placeholder="name of item" 
         bind:value="{item.name}"/>

        <label class="label">Image Source</label>
        <div class="join mt-0" onmouseenter={()=>{defineSelectedImage(item.imageSource)}}>
        <div class="tooltip">
          <div class="tooltip-content m-0 p-0">
            <img src="{item.imageSource}" class="h-[250px] w-[250px]">
          </div>
          <input type="text " class="input" placeholder="offer image" 
          bind:value="{item.imageSource}"  />
        </div>
          <Filemanager  selectedImage={handleSelectFeaturedItem} />
          <button class="btn btn-soft" onclick={()=>{selectedItem= item, showModalPreview=true}}>preview</button>
        </div>

         <label class="label">Image Name</label>
        <input type="text" class="input" placeholder="image name" 
         bind:value="{item.imageName}"/>

        <label class="label">Description</label>
        <input type="text" class="input" placeholder="item description" 
         bind:value="{item.description}"/>
       </div>
    {/each}

 </div>
 <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveFeaturedItems())}>
    Save
  </button>
</fieldset>


</details>
</div>

<div class="w-sm">
<details class="collapse bg-base-100 border-base-300 border p-0 m-0 ">
  <summary class="collapse-title font-semibold w-xs ">Offer Items</summary>
  <div class="collapse-content text-sm w-xs p-0 m-0">

 <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 m-2">
  <legend class="fieldset-legend">Offers Items</legend>
<div class="tabs tabs-lift w-[350px]">
  {#each offerItems as item,i}
    <input type="radio" name="my_tabs_1" class="tab" aria-label="Offer {i+1}" 
        onclick="{()=>{activeTabOffer = i}}"/>
    <div class="tab-content bg-base-100 border-base-300 p-4">
      <legend class="fieldset-legend">{item.name}</legend>

      <label class="label">Name</label>
      <input type="text" class="input" placeholder="name of item" 
       bind:value="{item.name}"/>

      <label class="label">Description</label>
      <input type="text" class="input" placeholder="description of item" 
       bind:value="{item.description}"/>

      <label class="label">Tag</label>
      <input type="text" class="input" placeholder="item description" 
       bind:value="{item.tag}"/>

      <label class="label">Image Source</label>
      <div class="join mt-0" onmouseenter={()=>{defineSelectedImage(item.imageSource)}}>
        <div class="tooltip">
          <div class="tooltip-content m-0 p-0">
            <img src="{item.imageSource}" class="h-[250px] w-[250px]">
          </div>
          <input type="text " class="input" placeholder="heroImageFallback" 
            bind:value="{item.imageSource}"  />
          </div>
        <Filemanager  selectedImage={handleSelectOffer} />
      </div>

      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-1">
        <legend class="fieldset-legend">Price</legend>
        <div class="flex row gap-1">
          <label class="input ">
            <span class="">Was</span>
            <input type="text" class=" " placeholder="price was" 
             bind:value="{item.priceWas}"/>
          </label>
          
          <label class="input">
            <span class="">Now</span>
            <input type="text" class="" placeholder="price now" 
             bind:value="{item.priceNow}"/>
          </label>
        </div>
      </fieldset>

     <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-1">
        <legend class="fieldset-legend">Date</legend>
        <div class="flex row gap-1">
          <label class="input ">
            <!-- <span class="">Start</span> -->
            <input type="date" id="startDate" name="start_date" placeholder="Start Date" 
            value={item.startDate ? dayjs(item.startDate).format('YYYY-MM-DD') : ''}
            oninput={(e) => {
                item.startDate = e.target.value ? new Date(e.target.value).toISOString() : null;
            }}/>
          </label>
          
          <label class="input" id="endDate">
            <!-- <span class="">End</span> -->
            <input type="date" class="" placeholder="End Date" 
             value={item.endDate ? dayjs(item.endDate).format('YYYY-MM-DD') : ''}
            oninput={(e) => {
                item.endDate = e.target.value ? new Date(e.target.value).toISOString() : null;
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
             bind:value="{item.hoursFrom}"/>
          </label>
          
          <label class="input">
            <span class="">To</span>
            <input type="text" class="" placeholder="price now" 
             bind:value="{item.hoursTo}"/>
          </label>
        </div>
      </fieldset>

        <div class="flex justify-content justify-between row gap-2">
          <fieldset class="fieldset bg-base-200 border-base-300 rounded-box  border px-2">
            <legend class="fieldset-legend">Day From</legend>  
            <select class="select" bind:value={item.dayFrom}>
              {#each days as day}
                <option value={day}>{day}</option>
              {/each}
            </select>
          </fieldset>
          
          <fieldset class="fieldset bg-base-200 border-base-300 rounded-box  border px-2">
            <legend class="fieldset-legend">Day To</legend>  
            <select class="select" bind:value={item.dayTo}>
              {#each days as day}
                <option value={day}>{day}</option>
              {/each}
            </select>
          </fieldset>
        </div>


      <div class="row p-2">
       <input type="checkbox" bind:checked="{item.assignedToHomePage}"
        class="toggle toggle-primary  toggle-sm checked:bg-indigo-300" />
       Assigned To Home Page
     </div>
     <div class="row p-2">
       <input type="checkbox" bind:checked="{item.active}"
        class="toggle toggle-amber-500  toggle-sm checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 " />
       Active
     </div>

    </div>    

  {/each}
</div>
  <div class="flex justify-between">
   <button class="btn btn-soft btn-primary w-1/4" onclick={()=>(saveOfferItems())}>
    Save
  </button>

  <a href="/page_contents/offers" class="btn btn-soft btn-info justify-end self-end">
    Go to offers
  </a>

</div>
</fieldset>
</div>
</details>
</div>

</div>

<Toast />

<ModalPreview bind:showModalPreview
  class="rounded backdrop-blur-sm backdrop-brightness-150 z-1500 grid grid-col justify-center items-center  overflow-auto">

  {#if selectedItem}
    <div class="card w-xs lg:w-md">
      <div class="card-title"><span class="text-xs text-right">{selectedItem.name}</span></div>
      <div class="card-body">
        <img src="{selectedItem.imageSource}" 
            style="filter: brightness({selectedItem.brightness}%) contrast({selectedItem.contrast}%); opacity:{selectedItem.opacity}%;"
        />
      </div>
      <div class="card-actions">
        <div class="flex flex-row w-full m-2">
        <label class="label basis-1/4">Brightness</label>
        <input type="range" min="30" max="200" step="10" bind:value="{selectedItem.brightness}" 
          class="range basis-2/4 text-stone-300 [--range-bg:grey] [--range-thumb:darkgrey] [--range-fill:0]" />
          <input class="input input-xs basis-1/6 ml-5" type="number" bind:value={selectedItem.brightness}/>
        </div>
        <div class="flex flex-row w-full m-2">
        <label class="label label basis-1/4">Opacity </label>
        <input type="range" min="20" max="100" step="5" bind:value="{selectedItem.opacity}" 
          class="range label basis-2/4 text-stone-300 [--range-bg:grey] [--range-thumb:darkgrey] [--range-fill:0]" />
          <input class="input input-xs basis-1/6 ml-5" type="number" bind:value={selectedItem.opacity}/>
        </div>
        <div class="flex flex-row w-full m-2">
        <label class="label label basis-1/4">Contrast </label>
        <input type="range" min="20" max="200" step="5" bind:value="{selectedItem.contrast}" 
          class="range label basis-2/4 text-stone-300 [--range-bg:grey] [--range-thumb:darkgrey] [--range-fill:0]" />
          <input class="input input-xs basis-1/6 ml-5" type="number" bind:value={selectedItem.contrast}/>
        </div>
      </div>
    </div>
{/if}


</ModalPreview>




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
import ModalPreview from '$lib/components/ModalEditRecord.svelte';

console.log('filemanage', fileManagerState.store.tmpImagePath)
const API_URL = import.meta.env.VITE_API_URL;
let data = $state([]);
let assignImageTo = $state();

let selectedImage1= $state();
let selectedVideo= $state();

let featuredItems =$state()
let activeTabFeautred =$state()
let offerItems = $state()
let activeTabOffer = $state()
let showModalPreview = $state(false)
let selectedItem = $state(false)

let tmpImagePath = fileManagerState.store.tmpImagePath

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
	getLandingPage()
  getFeaturedItems()
  getOffers()

})

function defineSelectedImage(item){
  console.log('defineSelectedImage' , item)
  fileManagerState.store.tmpImagePath =item
}

function preview(item){
  console.log('review')
  console.log(item)
}

function handleSelectImage(item){

  let arr = item.split('/')
  arr.shift()
  //arr.shift()
  const selectedImage1 = '/'+arr.join('/')
  data.heroImageFallback = selectedImage1


  console.log(selectedImage1)
}

function handleSelectHeroVid(item){
  let arr = item.split('/')
  arr.shift()
  //arr.shift()
  const selectedVideo = '/'+arr.join('/')
  data.heroVideo = selectedVideo
  console.log(selectedVideo)
}

async function handleSelectOffer(item){
  offerItems[activeTabOffer].imageSource = item

}

function handleSelectFeaturedItem(item){
  console.log(item)
  featuredItems[activeTabFeautred].imageSource= item
  // let arr = item.split('/')
  // arr.shift()
  // //arr.shift()
  // const selectedImage = '/'+arr.join('/')
  // data.heroVideo = selectedVideo
  // console.log(selectedVideo)
}


// function heroImageFallbackChange(){ 
//   if(selectedImage){
//     data.heroImageFallback = selectedImage
//   }
// }

// function heroVideoChange(){
//   if(selectedImage){
//     data.heroVideo = selectedImage
//   }
// }


async function getLandingPage(){
	const response = await useFetch('/landingpages', 'GET',null, true);
  data = response[0]

}


async function getFeaturedItems(){
  const response = await useFetch('/featured_items', 'GET',null, true);
  featuredItems = response
  console.log(response)
  
}

async function getOffers(){
  const response = await useFetch('/offers?assignedToHomePage=true', 'GET',null, true);
  offerItems = response
  console.log(response)
}


async function saveHeroSection(page){

  const id = data.id
  try{
        let response =  await useFetch("/landingpages/"+id, 'PATCH',data, true);
        //console.log(response)
        try{
            let refresRecord = await useFetch( "/landingpages/"+id, 'GET', null, false);
            data = refresRecord
            //showModal = false
            toast.success("Changes saved",2000);

        }catch(err){
            console.log(err)
            toast.error("Failed to save changes",2000);
        }
    } catch (err){

      console.log(err)
       toast.error(err.message,2000);
    }
}

async function saveFeaturedItems(){
  featuredItems.forEach((item)=>{
    try {
       saveOneFeaturedItem(item)
      toast.success("Created successfully",2000);
    }catch(e){
      toast.error("Failed to save",2000);
    }
  })
  selectedItem= false
}

async function saveOneFeaturedItem(item){
  let saveItem =  await useFetch('/featured_items/' + item.id, 'PATCH',item, true);
}

async function saveOfferItems(){
  offerItems.forEach((item)=>{
    try {
      saveOneOfferItem(item)
      toast.success("Created successfully",2000);
    }
    catch(err){
      toast.error("Failed to save",2000);
    }
  })
}

async function saveOneOfferItem(item){
  console.log(item)
  let saveItem =  await useFetch('/offers/' + item.id, 'PATCH',item, true);
  console.log(saveItem)
}


</script>

<style>

</style>