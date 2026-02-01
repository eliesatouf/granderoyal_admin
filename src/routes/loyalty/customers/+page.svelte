<script>
  import { onMount } from 'svelte';
  import { toast } from 'svelte-sonner';
  import { apiFetch } from '$lib/utils/api';

  let customers = $state([]);
  let isLoading = $state(true);
  let searchTerm = $state('');

  onMount(async () => {
    await loadCustomers();
  });

  async function loadCustomers() {
    try {
      let url = '/customers';
      if (searchTerm) {
        url += `?name=${encodeURIComponent(searchTerm)}`;
      } 

      const response = await apiFetch(url);
      customers = response || [];
    } catch (error) {
      toast.error('Failed to load customers');
    } finally {
      isLoading = false;
    }
  }

  function getNextMilestone(customer) {
    const currentVisits = customer.visitCount;
    if (currentVisits < 5) return 5;
    if (currentVisits < 7) return 7;
    if (currentVisits < 10) return 10;
    return null;
  }
</script>

<div class="p-6 container mx-auto">
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-gray-900">Customer Loyalty</h1>
    <a href="/appointments/new" class="btn btn-primary">
      Book Appointment
    </a>
  </div>

  <!-- Search -->
  <div class="card bg-white shadow-sm lg:w-1/3 mx-auto mb-6">
    <div class="card-body">
      <div class="flex gap-4">
        <input 
          type="text" 
          class="input input-bordered flex-1" 
          placeholder="Search customers by name..."
          bind:value={searchTerm}
        />
        <button class="btn btn-primary" onclick={loadCustomers}>
          Search
        </button>
      </div>
    </div>
  </div>

  <!-- Customers Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each customers as customer}
      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="card-title text-lg">{customer.name}</h3>
              <p class="text-sm text-gray-500">{customer.email}</p>
              <p class="text-sm text-gray-500">{customer.telephone}</p>
            </div>
            <!-- REMOVED the "Add Visit" button -->
          </div>

          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="font-medium">Total Visits:</span>
              <span class="font-bold text-primary">{customer.visitCount}</span>
            </div>

            <div class="flex justify-between">
              <span class="font-medium">Active Rewards:</span>
              <span class="font-bold text-success">{customer.activeRewards?.length || 0}</span>
            </div>

            {#if getNextMilestone(customer)}
              <div class="flex justify-between">
                <span class="font-medium">Next Milestone:</span>
                <span class="font-bold text-warning">{getNextMilestone(customer)} visits</span>
              </div>
            {/if}

            <!-- Progress Bar -->
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-primary h-2 rounded-full" 
                style={`width: ${Math.min((customer.visitCount / 10) * 100, 100)}%`}
              ></div>
            </div>
            <div class="text-xs text-gray-500 text-center">
              Progress to next reward
            </div>
          </div>

          <!-- Active Rewards -->
          {#if customer.activeRewards?.length > 0}
            <div class="mt-4">
              <h4 class="font-medium mb-2">Active Rewards:</h4>
              <div class="space-y-2">
                {#each customer.activeRewards as reward}
                  <div class="p-2 bg-green-50 rounded border border-green-200">
                    <p class="font-medium text-sm">
                      {reward.milestone?.rewardType === 'percentage_discount' 
                        ? `${reward.milestone.rewardValue}% Discount`
                        : 'Free Service'}
                    </p>
                    <p class="text-xs text-gray-500">
                      Expires: {new Date(reward.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <div class="col-span-full text-center py-8 text-gray-500">
        No customers found
      </div>
    {/each}
  </div>
</div>