<h1>Landing Page</h1>

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend class="fieldset-legend">Page details</legend>

  <label class="label">hero header</label>
  <input type="text" class="input" placeholder="Header" 
  	bind:value="{data.hearoHeader}"/>

  <label class="label">hero text</label>
  <input type="text" class="input" placeholder="hearoText" 
   bind:value="{data.hearoText}"/>

  <label class="label">hero video</label>
  <input type="text" class="input" placeholder="heroVideo" 
   bind:value="{data.heroVideo}"/>

  <label class="label">hero Image Fallback</label>
  <input type="text" class="input" placeholder="heroImageFallback" 
   bind:value="{data.heroImageFallback}"/>

  <label class="label">hero Button text</label>
  <input type="text" class="input" placeholder="heroButtontext" 
   bind:value="{data.heroButtontext}"/>

  <label class="label">featured Blocks header</label>
  <input type="text" class="input" placeholder="featuredBlocksheader" 
   bind:value="{data.featuredBlocksheader}"/>

  <label class="label">Featured Blocks text</label>
  <input type="text" class="input" placeholder="FeaturedBlockstext" 
   bind:value="{data.FeaturedBlockstext}"/>

  <label class="label">FeaturedBlocksitem1</label>
  <input type="text" class="input" placeholder="FeaturedBlocksitem1" 
   bind:value="{data.FeaturedBlocksitem1}"/>

  <label class="label">Featured Blocks item2</label>
  <input type="text" class="input" placeholder="FeaturedBlocksitem2" 
   bind:value="{data.FeaturedBlocksitem2}"/>

  <label class="label">Featured Blocks item3</label>
  <input type="text" class="input" placeholder="FeaturedBlocksitem3" 
   bind:value="{data.FeaturedBlocksitem3}"/>

  <label class="label">Offer header</label>
  <input type="text" class="input" placeholder="Offerheader" 
   bind:value="{data.Offerheader}"/>

  <label class="label">Offer text</label>
  <input type="text" class="input" placeholder="Offertext" 
   bind:value="{data.Offertext}"/>

  <label class="label">Offer item1</label>
  <input type="text" class="input" placeholder="Offeritem1" 
   bind:value="{data.Offeritem1}"/>

  <label class="label">Offer item2</label>
  <input type="text" class="input" placeholder="Offeritem2" 
   bind:value="{data.Offeritem2}"/>

  <label class="label">featured Blocks text</label>
  <input type="text" class="input" placeholder="featuredBlockstext" 
   bind:value="{data.featuredBlockstext}"/>

  <label class="label">featured Blocks item1</label>
  <input type="text" class="input" placeholder="featuredBlocksitem1" 
   bind:value="{data.featuredBlocksitem1}"/>

  <label class="label">featured Blocks item2</label>
  <input type="text" class="input" placeholder="featuredBlocksitem2" 
   bind:value="{data.featuredBlocksitem2}"/>

  <label class="label">featured Blocks item3</label>
  <input type="text" class="input" placeholder="featuredBlocksitem3" 
   bind:value="{data.featuredBlocksitem3}"/>

  <label class="label">offer header</label>
  <input type="text" class="input" placeholder="offerheader" 
   bind:value="{data.offerheader}"/>

  <label class="label">offert ext</label>
  <input type="text" class="input" placeholder="offertext" 
   bind:value="{data.offertext}"/>

  <label class="label">offer item1</label>
  <input type="text" class="input" placeholder="offeritem1" 
   bind:value="{data.offeritem1}"/>

  <label class="label">offer item2</label>
  <input type="text" class="input" placeholder="offeritem2" 
   bind:value="{data.offeritem2}"/>

   <button class="btn btn-soft btn-primary" onclick={()=>(save(data))}>
     Save
   </button>

</fieldset>
<Toast />
<script>
import { onMount } from 'svelte';
import useFetch from '$lib/services/useFetch'
import { toast } from '$lib/stores/toast';
import Toast from '$lib/components/Toast.svelte';
let data = $state([]);

onMount(() => {
	getLandingPage()
})
let token =localStorage.getItem('token')
async function getLandingPage(){
	
	//if(localStorage.getItem('token')){

		const headers = {};
  	headers['Content-Type'] = 'application/json';
  	//if (token) headers['Authorization'] = `Bearer ${token}`;

  	const response = await fetch('/api/landingpages', {
      method: 'GET',
      headers: headers
      
    });

    if (!response.ok) {
      const errdata = await response.json();

      throw new Error(errdata.message || 'Login failed!!');
    }else{
    	 data = await response.json().catch(() => response);
    	 data = data[0]
    }

}

async function save(page){

  const id = data.id
  try{
        let response =  await useFetch("/api/landingpages/"+id, 'PATCH',data);
        //console.log(response)
        try{
            let refresRecord = await useFetch("/api/landingpages/"+id, 'GET');
            data = refresRecord
            //showModal = false
            toast.success("Changes saved",5000);

        }catch(err){
            console.log(err)
            toast.error("Failed to save changes",5000);
        }
    } catch (err){

      console.log(err)
       toast.error(err.message,5000);
    }

}

</script>