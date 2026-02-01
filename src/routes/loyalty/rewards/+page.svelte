<!-- src/routes/loyalty/rewards/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { toast } from 'svelte-sonner';
  import { apiFetch } from '$lib/utils/api';
  import dayjs from 'dayjs';

  let rewards = $state([]);
  let isLoading = $state(true);
  let filters = $state({
    status: 'all',
    customer: '',
    milestone: ''
  });

  onMount(async () => {
    await loadRewards();
  });

  async function loadRewards() {
    try {
      let url = '/loyalty_rewards';
      const params = new URLSearchParams();
      
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.customer) params.append('customer.name', filters.customer);
      
      if (params.toString()) url += `?${params.toString()}`;

      const response = await apiFetch(url);
      
      rewards = response || [];
    } catch (error) {
      toast.error('Failed to load rewards');
    } finally {
      isLoading = false;
    }
  }

  async function updateRewardStatus(reward, newStatus) {
    try {
      await apiFetch(`/loyalty_rewards/${reward.id}`, 'PATCH', {
        status: newStatus
      });

      toast.success('Reward status updated');
      await loadRewards();
    } catch (error) {
      toast.error('Failed to update reward');
    }
  }

  function formatDate(dateString) {
    return dayjs(dateString).format('MMM D, YYYY');
  }

  function isExpired(reward) {
    return new Date(reward.expiresAt) < new Date();
  }
</script>

<div class="p-6">
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-gray-900">Customer Rewards</h1>
  </div>

  <!-- Filters -->
  <div class="card bg-white shadow-sm border mb-6">
    <div class="card-body">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="label">Status</label>
          <select class="select select-bordered w-full" bind:value={filters.status}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="used">Used</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        
        <div>
          <label class="label">Customer Name</label>
          <input 
            type="text" 
            class="input input-bordered w-full" 
            bind:value={filters.customer}
            placeholder="Search customer..."
          />
        </div>

        <div class="flex items-end">
          <button class="btn btn-primary w-full" onclick={loadRewards}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Rewards Table -->
  <div class="card bg-white shadow-sm border">
    <div class="card-body p-0">
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Reward</th>
              <th>Status</th>
              <th>Created</th>
              <th>Expires</th>
              <th>Claimed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each rewards as reward}
              <tr>
                <td>
                  <div>
                    <p class="font-medium">{reward.customer?.name}</p>
                    <p class="text-sm text-gray-500">{reward.customer?.email}</p>
                    <p class="text-xs text-gray-400">{reward.customer?.visitCount} visits</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p class="font-medium">
                      {reward.milestone?.rewardType === 'percentage_discount' 
                        ? `${reward.milestone.rewardValue}% Discount`
                        : 'Free Service'}
                    </p>
                    <p class="text-sm text-gray-500">{reward.milestone?.description}</p>
                  </div>
                </td>
                <td>
                  <span class="badge badge-{
                    reward.status === 'active' ? 'success' : 
                    reward.status === 'used' ? 'info' : 'error'
                  }">
                    {reward.status}
                    {#if reward.status === 'active' && isExpired(reward)}
                      (Expired)
                    {/if}
                  </span>
                </td>
                <td>{formatDate(reward.createdAt)}</td>
                <td class="{isExpired(reward) ? 'text-error' : ''}">
                  {formatDate(reward.expiresAt)}
                </td>
                <td>
                  {#if reward.claimedAt}
                    {formatDate(reward.claimedAt)}
                  {:else}
                    <span class="text-gray-400">Not claimed</span>
                  {/if}
                </td>
                <td>
                  {#if reward.status === 'active'}
                    <button 
                      class="btn btn-success btn-sm" 
                      onclick={() => updateRewardStatus(reward, 'used')}
                    >
                      Mark as Used
                    </button>
                  {:else if reward.status === 'used'}
                    <button 
                      class="btn btn-warning btn-sm" 
                      onclick={() => updateRewardStatus(reward, 'active')}
                    >
                      Reactivate
                    </button>
                  {/if}
                </td>
              </tr>
            {:else}
              <tr>
                <td colspan="7" class="text-center py-4 text-gray-500">
                  No rewards found
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>