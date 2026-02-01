<!-- src/routes/loyalty/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { toast } from 'svelte-sonner';
  import { apiFetch } from '$lib/utils/api.js';

  let stats = $state({
    totalCustomers: 0,
    activeRewards: 0,
    claimedRewards: 0,
    totalVisits: 0
  });

  let recentRewards = $state([]);
  let topCustomers = $state([]);
  let isLoading = $state(true);

  onMount(async () => {
    await loadDashboardData();
  });

  async function loadDashboardData() {
    try {
      isLoading = true;
      
      // Load stats
      const [customersRes, rewardsRes] = await Promise.all([
        apiFetch('/customers'),
        apiFetch('/loyalty_rewards')
      ]);
      console.log(customersRes)

      stats.totalCustomers = customersRes?.length || 0;
      
      const allRewards = rewardsRes || [];
      stats.activeRewards = allRewards.filter(r => r.status === 'active').length;
      stats.claimedRewards = allRewards.filter(r => r.status === 'used').length;
      
      // FIXED: Use customers data instead of rewards data for total visits
      stats.totalVisits = customersRes.reduce((sum, customer) => sum + (customer.visitCount || 0), 0);

      // Recent rewards
      recentRewards = allRewards
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

        console.log(recentRewards)

      // Top customers
      const customers = customersRes || [];
      topCustomers = customers
        .sort((a, b) => b.visitCount - a.visitCount)
        .slice(0, 5);

    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      isLoading = false;
    }
  }
</script>


<div class="p-6 space-y-6">
  <!-- Header -->
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold text-gray-900">Loyalty Program</h1>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="card bg-white shadow-sm border">
      <div class="card-body">
        <h3 class="card-title text-sm font-medium text-gray-500">Total Customers</h3>
        <p class="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
      </div>
    </div>

    <div class="card bg-white shadow-sm border">
      <div class="card-body">
        <h3 class="card-title text-sm font-medium text-gray-500">Active Rewards</h3>
        <p class="text-3xl font-bold text-green-600">{stats.activeRewards}</p>
      </div>
    </div>

    <div class="card bg-white shadow-sm border">
      <div class="card-body">
        <h3 class="card-title text-sm font-medium text-gray-500">Claimed Rewards</h3>
        <p class="text-3xl font-bold text-blue-600">{stats.claimedRewards}</p>
      </div>
    </div>

    <div class="card bg-white shadow-sm border">
      <div class="card-body">
        <h3 class="card-title text-sm font-medium text-gray-500">Total Visits</h3>
        <p class="text-3xl font-bold text-purple-600">{stats.totalVisits}</p>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Recent Rewards -->
    <!-- Replace the Recent Rewards section with this -->
<div class="card bg-white shadow-sm border">
  <div class="card-body">
    <h2 class="card-title text-lg font-semibold mb-4">
      <span class="material-icons-outlined mr-2">schedule</span>
      Recently Earned Rewards
    </h2>
    <div class="space-y-3">
      {#each recentRewards as reward}
        <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-l-4 border-{reward.status === 'active' ? 'green' : 'blue'}-500">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <p class="font-semibold text-gray-900">{reward.customer?.name || 'Unknown Customer'}</p>
              <span class="badge badge-{reward.status === 'active' ? 'success' : 'info'} badge-sm">
                {reward.status === 'active' ? 'Available' : 'Used'}
              </span>
            </div>
            
            <div class="space-y-1 text-sm">
              <p class="text-gray-700">
                <span class="font-medium">
                  {reward.milestone?.rewardType === 'percentage_discount' 
                    ? `${reward.milestone.rewardValue}% Discount`
                    : 'FREE Service'}
                </span>
                {#if reward.milestone?.description}
                  - {reward.milestone.description}
                {/if}
              </p>
              
              <div class="flex flex-wrap gap-4 text-xs text-gray-500">
                <span class="flex items-center gap-1">
                  <span class="material-icons-outlined text-xs">confirmation_number</span>
                  Earned at {new Date(reward.createdAt).toLocaleDateString()}
                </span>
                
                {#if reward.status === 'active'}
                  <span class="flex items-center gap-1 {new Date(reward.expiresAt) < new Date() ? 'text-red-500' : ''}">
                    <span class="material-icons-outlined text-xs">event</span>
                    {new Date(reward.expiresAt) < new Date() ? 'Expired' : 'Expires'} {new Date(reward.expiresAt).toLocaleDateString()}
                  </span>
                {:else}
                  <span class="flex items-center gap-1">
                    <span class="material-icons-outlined text-xs">check_circle</span>
                    Claimed {reward.claimedAt ? new Date(reward.claimedAt).toLocaleDateString() : 'Unknown'}
                  </span>
                {/if}
                
                <span class="flex items-center gap-1">
                  <span class="material-icons-outlined text-xs">person</span>
                  {reward.customer?.visitCount || 0} visits
                </span>
              </div>
            </div>
          </div>
          
          <div class="text-right ml-4">
            {#if reward.status === 'active' && new Date(reward.expiresAt) < new Date()}
              <span class="badge badge-error">Expired</span>
            {:else if reward.status === 'active'}
              <span class="badge badge-success">Active</span>
            {:else}
              <span class="badge badge-info">Used</span>
            {/if}
          </div>
        </div>
      {:else}
        <div class="text-center py-8 text-gray-500">
          <span class="material-icons-outlined text-4xl mb-2 text-gray-300">card_giftcard</span>
          <p>No rewards earned yet</p>
          <p class="text-sm mt-1">Rewards will appear here when customers reach milestones</p>
        </div>
      {/each}
    </div>
    
    {#if recentRewards.length > 0}
      <div class="mt-4 pt-4 border-t border-gray-200">
        <p class="text-xs text-gray-500 text-center">
          Showing {recentRewards.length} most recently earned rewards
        </p>
      </div>
    {/if}
  </div>
</div>

    <!-- Top Customers -->
    <div class="card bg-white shadow-sm border">
      <div class="card-body">
        <h2 class="card-title text-lg font-semibold mb-4">Top Customers</h2>
        <div class="space-y-3">
          {#each topCustomers as customer}
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p class="font-medium">{customer.name}</p>
                <p class="text-sm text-gray-500">{customer.email}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-lg">{customer.visitCount}</p>
                <p class="text-sm text-gray-500">visits</p>
              </div>
            </div>
          {:else}
            <p class="text-gray-500 text-center py-4">No customer data</p>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>