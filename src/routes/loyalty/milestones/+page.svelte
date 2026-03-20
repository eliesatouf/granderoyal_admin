<script>
  import { onMount } from 'svelte';
  import  useFetch  from '$lib/services/useFetch.js';
  import { Toaster, toast } from 'svelte-sonner';
  import { browser } from "$app/environment";
  import Icon from '$lib/components/Icon.svelte'

  let milestones = $state([]);
  let dishes = $state([]);
  let isLoading = $state(true);
  let showCreateModal = $state(false);
  let showEditModal = $state(false);
  let editingMilestone = $state(null);
  let preLoad = $state()
  let categories =$state()
  let activeCategory = $state();

 
  if(browser){
    preLoad = JSON.parse(localStorage.getItem('preLoad'))
    categories = preLoad.categories
    activeCategory = categories[0]
  }


   let selectedCategory = $derived.by(()=>{
      const cat = categories?.find(cat => cat.id == activeCategory.id)
        return cat?.name 
    })

  let dishesOfCategory = $derived.by(()=>{ 
      const items = dishes.filter(el => el.category.id == activeCategory.id)
      return items
    })

  const newMilestone = $state({
    name: '',
    visitCount: '',
    rewardType: 'percentage_discount',
    rewardValue: '',
    description: '',
    active: true
  });

  let newMilestoneEligibleServices = $state({});
  let editingMilestoneEligibleServices = $state({});

  onMount(async () => {
    await loadMilestones();
    await loadDishes();
  });


  async function loadMilestones() {
    try {
      const response = await useFetch('/loyalty_milestones','GET');
      milestones = response || [];
      console.log('milestones', milestones)
    } catch (error) {
      toast.error('Failed to load milestones');
    } finally {
      isLoading = false;
    }
  }

  // function filterDishesBySlugs(dishes, targetSlugs) {
  //   if (!Array.isArray(dishes)) return [];
  //   return dishes;

  //   return dishes.filter(dish => {
  //     // Check if dish has a category and the category has a slug
  //     const dishSlug = dish?.category?.slug;
  //     return dishSlug && targetSlugs.includes(dishSlug);

  //   });
  // }

  async function loadDishes() {
    const response = await useFetch('/dishes', 'GET');
    dishes = response
    // const targetSlugs = ['frappes-blended', 'iced-coffee-drinks', 'fruit-teas-sodas', 'hot-coffee-tea', 'non-coffee-specialty-drinks'];
    // const drinks = filterDishesBySlugs(dishes, targetSlugs); 
    // dishes = drinks
    return dishes;
  }

  async function createMilestone() {
    try {
      const payload = {
        ...newMilestone,
        visitCount: parseInt(newMilestone.visitCount),
        rewardValue: newMilestone.rewardType === 'free_service' ? null : parseFloat(newMilestone.rewardValue)
      };

      if (newMilestone.rewardType === 'free_service') {
        const eligibleServiceIds = Object.keys(newMilestoneEligibleServices)
          .filter(id => newMilestoneEligibleServices[id] && id && id !== 'undefined')
          .map(id => `/api/dishes/${id}`); // Convert to IRIs
        payload.eligibleServices = eligibleServiceIds;
      }

      await useFetch('/loyalty_milestones', 'POST', payload, true);
      toast.success('Milestone created successfully');
      showCreateModal = false;
      resetForm();
      await loadMilestones();
    } catch (error) {
      console.error('Create milestone error:', error);
      toast.error('Failed to create milestone');
    }
  }

  async function updateMilestone() {
    try {
      const payload = {
        ...editingMilestone,
        visitCount: parseInt(editingMilestone.visitCount),
        rewardValue: editingMilestone.rewardType === 'free_service' ? null : parseFloat(editingMilestone.rewardValue)
      };

      // Only include eligibleServices if reward type is free_service
      if (editingMilestone.rewardType === 'free_service') {
        const eligibleServiceIds = Object.keys(editingMilestoneEligibleServices)
          .filter(id => editingMilestoneEligibleServices[id] && id && id !== 'undefined')
          .map(id => `/api/dishes/${id}`); // Convert back to IRIs
        payload.eligibleDishes = eligibleServiceIds;
      }

      console.log('Updating milestone payload:', payload);

      const response = await useFetch(`/loyalty_milestones/${editingMilestone.id}`, 'PATCH', payload, true);
      toast.success('Milestone updated successfully');
      console.log('Updating milestone response', response)
      showEditModal = false;
      editingMilestone = null;
      await loadMilestones();
    } catch (error) {
      console.error('Update milestone error:', error);
      toast.error('Failed to update milestone');
    }
  }

  async function toggleMilestone(milestone) {
    console.log('toggleMilestone' , milestone)
    try {
      await useFetch(`/loyalty_milestones/${milestone.id}`, 'PATCH', {
        active: !milestone.active
      }, true);
      toast.success(`Milestone ${milestone.active ? 'deactivated' : 'activated'}`);
      await loadMilestones();
    } catch (error) {
      toast.error('Failed to update milestone');
    }
  }

  function resetForm() {
    newMilestone.name = '';
    newMilestone.visitCount = '';
    newMilestone.rewardType = 'percentage_discount';
    newMilestone.rewardValue = '';
    newMilestone.description = '';
    newMilestone.active = true;
    newMilestoneEligibleServices = {};
  }

  function startEdit(milestone) {
    console.log('milestone.eligibleDishes', milestone.eligibleDishes)
    editingMilestone = { ...milestone };
    editingMilestoneEligibleServices = {};
    
    // eligibleDishes is array of IRIs like ["/api/dishes/6", "/api/dishes/7"]
    if (milestone.eligibleDishes && Array.isArray(milestone.eligibleDishes)) {
      for (let i = 0; i < milestone.eligibleDishes.length; i++) {
        const serviceIri = milestone.eligibleDishes[i];
        
        // Extract ID from IRI like "/api/dishes/6"
        if (typeof serviceIri === 'string' && serviceIri.startsWith('/api/dishes/')) {
          const serviceId = serviceIri.split('/').pop(); // Get "6" from "/api/dishes/6"
          if (serviceId && !isNaN(serviceId)) {
            editingMilestoneEligibleServices[serviceId] = true;
            console.log('serviceId', serviceId)
          }
        }
      }
    }
    
    showEditModal = true;
  }

  function cancelEdit() {
    editingMilestone = null;
    editingMilestoneEligibleServices = {};
    showEditModal = false;
  }

  function handleNewServiceCheckboxChange(serviceId, event) {
    if (serviceId && serviceId !== 'undefined') {
      newMilestoneEligibleServices[serviceId] = event.target.checked;
    }
  }

  function handleEditServiceCheckboxChange(serviceId, event) {
   
    if (serviceId && serviceId !== 'undefined') {
      editingMilestoneEligibleServices[serviceId] = event.target.checked;
      
       console.log('editingMilestoneEligibleServices', editingMilestoneEligibleServices)
    }
  }

  // Helper function to get service name from IRI
  function getServiceNameFromIri(serviceIri) {
    if (typeof serviceIri === 'string' && serviceIri.startsWith('/api/dishes/')) {
      const serviceId = serviceIri.split('/').pop();
      const service = dishes.find(s => s.id == serviceId);
      return service ? service.name : 'Unknown Service';
    }
    return 'Invalid IRI';
  }

  // Helper function to get all service names from milestone
  function getServiceNamesFromMilestone(milestone) {
    //console.log('milestone', milestone)
    if (!milestone.eligibleDishes || !Array.isArray(milestone.eligibleDishes)) {
      return [];
    }
    return milestone.eligibleDishes.map(iri => getServiceNameFromIri(iri));
    //console.log('milestone.eligibleServices', milestone.eligibleServices)
    //return milestone.eligibleDishes;
  }

</script>

<Toaster richColors position="top-center" />

<div class="container mx-auto p-6">
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-gray-900">Loyalty Milestones</h1>
    <button class="btn btn-primary" onclick={() => showCreateModal = true}>
      Create Milestone
    </button>
  </div>

  <!-- Milestones Table -->
  <div class="card bg-white shadow-sm border">
    <div class="card-body p-0">
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Visits</th>
              <th class="hidden lg:table-cell">Reward Type</th>
              <th class="hidden lg:table-cell">Reward Value</th>
              <th class="hidden lg:table-cell">Eligible Items</th>
              <th class="hidden lg:table-cell">Description</th>
              <th class="hidden lg:table-cell">Status</th>
              <th class="hidden lg:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each milestones as milestone}
              <tr >
                <td>{milestone.name}</td>
                <td class="font-bold">{milestone.visitCount}</td>
                <td class="hidden lg:table-cell">
                  <span class="h-full badge badge-{milestone.rewardType === 'percentage_discount' ? 'info' : 'success'}">
                    {milestone.rewardType === 'percentage_discount' ? 'Discount' : 'Free Item'}
                  </span>
                </td>
                <td class="hidden lg:table-cell">
                  {milestone.rewardType === 'percentage_discount' ? `${milestone.rewardValue}%` : 'Free'}
                </td>
                <td class="hidden lg:table-cell">
                  {#if milestone.rewardType === 'free_service'} 
                    {#if milestone.eligibleDishes && milestone.eligibleDishes.length > 0}

                      <div class="text-xs">
                        {#each getServiceNamesFromMilestone(milestone) as serviceName}
                          <div class="badge badge-secondary badge-sm mr-1 mb-1 h-full">{serviceName}</div>
                        {/each}
                      </div>
                    {/if}
                  {:else}
                    <span class="text-gray-400 text-xs">-</span>
                  {/if}
                </td>
                <td class="hidden lg:table-cell">{milestone.description}</td>
                <td class="hidden lg:table-cell">
                  <span class="badge badge-{milestone.active ? 'success' : 'error'}">
                    {milestone.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td class="space-x-2 grid">
                  <button class="btn btn-primary btn-xs" onclick={() => startEdit(milestone)}>
                    Edit
                  </button>
                  <button 
                    class="btn btn-{milestone.active ? 'warning' : 'success'} btn-xs" 
                    onclick={() => toggleMilestone(milestone)}
                  >
                    {milestone.active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            {:else}
              <tr>
                <td colspan="8" class="hidden lg:table-cell lg:text-center lg:py-4 lg:text-gray-500">
                  No milestones found
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Create Milestone Modal -->
  {#if showCreateModal}
    <div class="modal modal-open ">
      <div class="modal-box max-w-2xl h-150 lg:h-3/4 overflow-auto">
        <h3 class="font-bold text-lg mb-4">Create New Milestone</h3>
        
        <div class="space-y-4">
          <div>
            <label class="label">Name</label>
            <input 
              type="text" 
              class="input input-bordered w-full" 
              bind:value={newMilestone.name}
              placeholder="Ex: 10th drink - free drink"
            />
          </div>

          <div>
            <label class="label">Order Count</label>
            <input 
              type="number" 
              class="input input-bordered w-full" 
              bind:value={newMilestone.visitCount}
              placeholder="5"
            />
          </div>

          <div>
            <label class="label">Reward Type</label>
            <select class="select select-bordered w-full" bind:value={newMilestone.rewardType}>
              <option value="percentage_discount">Percentage Discount</option>
              <option value="free_service">Free Item</option>
            </select>
          </div>

          <div>
            <label class="label">Reward Value</label>
            {#if newMilestone.rewardType === 'percentage_discount'}
              <input 
                type="number" 
                class="input input-bordered w-full" 
                bind:value={newMilestone.rewardValue}
                placeholder="10"
              />
            {:else}
              <input 
                type="text" 
                class="input input-bordered w-full" 
                value="Free Service" 
                disabled
              />
            {/if}
          </div>
          {#if browser && categories.length && dishesOfCategory}
          <div class="h-32">
            
            <div class="dropdown dropdown-top dropdown-end w-56">
              <div tabindex="0" role="button" class="btn btn-outline">
                <Icon name="menu_book_2" /> {selectedCategory || 'Select a category'}
              </div>
              <ul tabindex="0" class="dropdown-content dropdown-top menu bg-base-100 rounded-box z-[1]  p-2 shadow-lg h-64 overflow-auto grid">
                {#each categories as category}
                <li>
                  <button
                  type="button"
                  class="{activeCategory?.id === category.id ? 'btn-active' : ''}"
                  onclick={() => {
                    activeCategory = category;
                        // Close dropdown - blur the button
                    document.activeElement?.blur();
                  }}
                  >
                  {category.name}
                </button>
              </li>
              {/each}
            </ul>
          </div>
        </div>
        

        <div>
          <label class="label">Eligible Items</label>
          <div class="max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
            {#each dishesOfCategory as item}
            {#if item.id} 
            <label class="flex items-center space-x-2 py-1">
              <input 
              type="checkbox" 
              class="checkbox checkbox-sm" 
              checked={newMilestoneEligibleServices[item.id] || false}
              onchange={(e) => handleNewServiceCheckboxChange(item.id, e)}
              />
              <span class>{item.name}</span>
            </label>
            {/if}
            {/each}
          </div>
        </div>
        {/if}

          <div>
            <label class="label">Description</label>
            <input 
              type="text" 
              class="input input-bordered w-full" 
              bind:value={newMilestone.description}
              placeholder="free drink on 10th"
            />
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Active</span>
              <input 
                type="checkbox" 
                class="toggle toggle-primary" 
                bind:checked={newMilestone.active}
              />
            </label>
          </div>
        </div>

        <div class="modal-action">
          <button class="btn btn-primary" onclick={createMilestone}>Create</button>
          <button class="btn btn-ghost" onclick={() => showCreateModal = false}>Cancel</button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Edit Milestone Modal -->
  {#if showEditModal && editingMilestone}
    <div class="modal modal-open ">
      <div class="modal-box max-w-2xl h-150 lg:h-3/4 overflow-auto">
        <h3 class="font-bold text-lg mb-4">Edit Milestone</h3>
        
        <div class="space-y-4">
          <div>
            <label class="label">Name</label>
            <input 
              type="text" 
              class="input input-bordered w-full" 
              bind:value={editingMilestone.name}
            />
          </div>

          <div>
            <label class="label">Visit Count</label>
            <input 
              type="number" 
              class="input input-bordered w-full" 
              bind:value={editingMilestone.visitCount}
            />
          </div>

          <div>
            <label class="label">Reward Type</label>
            <select class="select select-bordered w-full" bind:value={editingMilestone.rewardType}>
              <option value="percentage_discount">Percentage Discount</option>
              <option value="free_service">Free Service</option>
            </select>
          </div>

          <div>
            <label class="label">Reward Value</label>
            {#if editingMilestone.rewardType === 'percentage_discount'}
              <input 
                type="number" 
                class="input input-bordered w-full" 
                bind:value={editingMilestone.rewardValue}
              />
            {:else}
              <input 
                type="text" 
                class="input input-bordered w-full" 
                value="Free Service" 
                disabled
              />
            {/if}
          </div>


          {#if browser && categories?.length && dishesOfCategory}
          <div>
  
            <div class="dropdown dropdown-top dropdown-end w-56">
              <div tabindex="0" role="button" class="btn btn-outline">
                <Icon name="menu_book_2" /> {selectedCategory || 'Select a category'}
              </div>
              <ul tabindex="0" class="dropdown-content dropdown-top menu bg-base-100 rounded-box z-[1]  p-2 shadow-lg h-64 overflow-auto grid">
                {#each categories as category}
                  <li>
                    <button
                      type="button"
                      class="{activeCategory?.id === category.id ? 'btn-active' : ''}"
                      onclick={() => {
                        activeCategory = category;
                        // Close dropdown - blur the button
                        document.activeElement?.blur();
                      }}
                    >
                      {category.name}
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
       

        <div>
          <label class="label">Eligible Items</label>
          <div class="max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
  
            {#each dishesOfCategory as dish}
                  {#if dish.id} 
                    <label class="flex items-center space-x-2 py-1">
                      <input 
                        type="checkbox" 
                        class="checkbox checkbox-sm" 
                        checked={editingMilestoneEligibleServices[dish.id] || false}
                        onchange={(e) => handleEditServiceCheckboxChange(dish.id, e)}
                      />
                      <span>{dish.name}</span>
                    </label>
                  {/if}
                {/each}
          </div>
        </div>
         {/if}

          <div>
            <label class="label">Description</label>
            <input 
              type="text" 
              class="input input-bordered w-full" 
              bind:value={editingMilestone.description}
            />
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Active</span>
              <input 
                type="checkbox" 
                class="toggle toggle-primary" 
                bind:checked={editingMilestone.active}
              />
            </label>
          </div>
        </div>

        <div class="modal-action">
          <button class="btn btn-primary" onclick={updateMilestone}>Save Changes</button>
          <button class="btn btn-ghost" onclick={cancelEdit}>Cancel</button>
        </div>
      </div>
    </div>
  {/if}
</div>