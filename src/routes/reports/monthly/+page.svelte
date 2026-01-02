<script>
  import { onMount } from 'svelte';
  import { renderChart } from "svelte-chart-apex";
  import useFetch from '$lib/services/useFetch'
  import { afterNavigate} from '$app/navigation';
  import { jwtDecode } from 'jwt-decode';
  let admin =$state(false)

  let reportData = $state();
  let loading = $state(true);
  let error = $state();
  let selectedDate = $state(new Date().toISOString().split('T')[0]);
  
  let revenueChartOptions = {};
  let weeklyTrendChartOptions = {};

  afterNavigate(({ to, from }) => {
    const token = localStorage.getItem('token');
    if(token){
        const decoded = jwtDecode(token);
        admin =  decoded.roles.includes('ROLE_ADMIN')
    }
    if(!admin && (from?.route.id !='/logout'  && to.route.id != '/logout') ){
       goto('/logout', { replaceState: true })
    }
  });

  async function loadMonthlyReport(date) {
    loading = true;
    error = null;
    
    try {
          
     const data =  await useFetch(`/dining/sales/reports/monthly/${date}`,'GET',null,true);
      reportData = data;
      
      // Monthly Revenue Chart
      revenueChartOptions = {
        options: {
          chart: { type: 'bar', height: 350, toolbar: { show: false } },
          series: [{
            name: 'Amount',
            data: [
              data.summary.total_revenue,
              data.summary.net_revenue,
              data.summary.total_discounts,
              data.summary.average_order_value
            ]
          }],
          plotOptions: { bar: { borderRadius: 4 } },
          dataLabels: { enabled: false },
          xaxis: { categories: ['Revenue', 'Net Revenue', 'Discounts', 'Avg Order Value'] },
          yaxis: { title: { text: 'Amount (₱)' } },
          colors: ['#3B82F6']
        },
        
      };

      // Weekly Trend Chart
      weeklyTrendChartOptions = {
        options: {
          chart: { type: 'line', height: 350, toolbar: { show: false } },
          series: [{
            name: 'Weekly Revenue',
            data: Object.values(data.time_series || {}).map((week) => week.revenue || 0)
          }],
          stroke: { curve: 'smooth', width: 3 },
          markers: { size: 5 },
          xaxis: { 
            categories: Object.keys(data.time_series || {}),
            title: { text: 'Week' }
          },
          yaxis: { title: { text: 'Revenue (₱)' } },
          colors: ['#10B981']
        }
        
      };
      
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function handleDateChange() {
    loadMonthlyReport(selectedDate);
  }

  onMount(() => {
    loadMonthlyReport(selectedDate);
  });

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  }
</script>

<div class="min-h-screen bg-gray-100 p-6">
  <div class="max-w-7xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Monthly Sales Report</h1>
      
      <div class="flex items-center gap-4 mt-4">
        <label class="text-sm font-medium text-gray-700">Select Date in Month:</label>
        <input 
          type="date" 
          bind:value={selectedDate}
          on:change={handleDateChange}
          class="px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>

    {#if loading}
      <div class="flex justify-center items-center h-96">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    {:else if error}
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex items-center">
          <div class="text-red-400">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10L12.707 8.707a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error loading report</h3>
            <p class="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
        <button on:click={() => loadMonthlyReport(selectedDate)} class="mt-3 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700">
          Retry
        </button>
      </div>
    {:else if reportData}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm font-medium text-gray-600">Total Revenue</p>
          <p class="text-2xl font-bold text-gray-900">{formatCurrency(reportData.summary.total_revenue)}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm font-medium text-gray-600">Net Revenue</p>
          <p class="text-2xl font-bold text-gray-900">{formatCurrency(reportData.summary.net_revenue)}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm font-medium text-gray-600">Total Orders</p>
          <p class="text-2xl font-bold text-gray-900">{reportData.summary.total_orders}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm font-medium text-gray-600">Avg Order Value</p>
          <p class="text-2xl font-bold text-gray-900">{formatCurrency(reportData.summary.average_order_value)}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Monthly Summary</h3>
          <div use:renderChart={revenueChartOptions}></div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Weekly Revenue Trend</h3>
          <div use:renderChart={weeklyTrendChartOptions}></div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Selling Items This Month</h3>
       <div  class="overflow-x-auto">
          <table class="table table-xs">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each reportData.top_items.slice(0, 10) as item}
                <tr>
                  <td class="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{item.quantity}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{formatCurrency(item.revenue)}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{item.orders}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Sales by Channel</h3>
       <div  class="overflow-x-auto">
          <table class="table table-xs">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Order Value</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each Object.entries(reportData.channel_analysis || {}) as [channel, data]}
                <tr>
                  <td class="px-6 py-4 text-sm text-gray-900">{channel}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{data.orders}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{formatCurrency(data.revenue)}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{formatCurrency(data.average_order_value)}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
  </div>
</div>