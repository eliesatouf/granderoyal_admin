<!-- src/routes/reports/daily/+page.svelte -->
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
  
  let revenueChartOptions = $state();
  let topItemsChartOptions = $state();
  let hourlyChartOptions = $state();

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

  async function loadDailyReport(date) {
    loading = true;
    error = null;
    
  try {
      const data =  await useFetch(`/dining/sales/reports/daily/${date}`,'GET',null,true);
      reportData = data;
    
      // Revenue Chart
      revenueChartOptions = {
        options: {
          chart: { type: 'bar', height: 350, toolbar: { show: false } },
          series: [{
            name: 'Amount',
            data: [
              data.summary.total_revenue,
              data.summary.net_revenue,
              data.summary.total_discounts
            ]
          }],
          plotOptions: { bar: { borderRadius: 4 } },
          dataLabels: { enabled: false },
          xaxis: { categories: ['Revenue', 'Net Revenue', 'Discounts'] },
          yaxis: { title: { text: 'Amount (₱)' } },
          colors: ['#3B82F6']
        }
        
      };

      //==========================================================================



      const topItemsFormatted = data.top_items.slice(0, 10).map(item => ({
        x: item.name,    // Menu item name
        y: item.revenue  // Revenue amount
      }));

      topItemsChartOptions = {
        options: {
          chart: { 
            type: 'bar', 
            height: 400, // Increased height for better spacing
            toolbar: { show: false } 
          },
          series: [{
            name: 'Revenue',
            data: topItemsFormatted
          }],
          plotOptions: { 
            bar: { 
              borderRadius: 4, 
              horizontal: true,
              barHeight: '70%'
            } 
          },
          dataLabels: { 
            enabled: true,
            formatter: function(val) {
              return '₱' + val.toLocaleString(); // Format as currency
            },
            style: {
              fontSize: '12px',
              colors: ['#fff']
            }
          },
          xaxis: { 
            title: { text: 'Revenue (₱)' },
            labels: {
              formatter: function(val) {
                return '₱' + val.toLocaleString();
              }
            }
          },
          yaxis: { 
            title: { text: 'Menu Items' },
            labels: {
              style: {
                fontSize: '12px' // Smaller font for long names
              }
            }
          },
          grid: {
            padding: {
              left: 1 // Add left padding for long item names
            }
          },
          tooltip: {
            y: {
              formatter: function(val, { series, seriesIndex, dataPointIndex, w }) {
                // Show both item name and revenue in tooltip
                return topItemsFormatted[dataPointIndex].x + ': ₱' + val.toLocaleString();
              }
            }
          },
          colors: ['#8B5CF6']
        }
      };

      //==========================================================================


      // Hourly Chart
      hourlyChartOptions = {
        options: {
          chart: { type: 'line', height: 350, toolbar: { show: false } },
          series: [{
          name: 'Orders',
          data: Object.values(data.time_series || {}).map(hour => hour?.orders || 0)
        }],
          stroke: { curve: 'smooth', width: 3 },
          markers: { size: 5 },
          xaxis: { 
            categories: Object.keys(data.time_series || {}),
            title: { text: 'Hour' }
          },
          yaxis: { title: { text: 'Orders' } },
          colors: ['#EF4444']
        },
        
      };
      
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function handleDateChange() {
    loadDailyReport(selectedDate);
  }

  onMount(() => {
    loadDailyReport(selectedDate);
  });

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  }
</script>

<div class="min-h-screen bg-gray-100 p-6">
  <div class="max-w-7xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Daily Sales Report</h1>
      
      <div class="flex items-center gap-4 mt-4">
        <label class="text-sm font-medium text-gray-700">Select Date:</label>
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
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error loading report</h3>
            <p class="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
        <button on:click={() => loadDailyReport(selectedDate)} class="mt-3 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700">
          Retry
        </button>
      </div>
    {:else if reportData}

      <!-- Summary Cards -->
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
          <p class="text-sm font-medium text-gray-600">Discounts</p>
          <p class="text-2xl font-bold text-gray-900">{formatCurrency(reportData.summary.total_discounts)}</p>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <div use:renderChart={revenueChartOptions}></div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Selling Items</h3>
          <div use:renderChart={topItemsChartOptions}></div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Hourly Order Distribution</h3>
        <div use:renderChart={hourlyChartOptions}></div>
      </div>

      <!-- Order Details Table -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
        <div  class="overflow-x-auto">
          <table class="table table-xs">
            <thead class="bg-gray-50">
              <tr>
                <th >Order #</th>
                <th >Time</th>
                <th >Amount</th>
                <th >Items</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each reportData.details.slice(0, 10) as order}
                <tr>
                  <td >{order.order_number}</td>
                  <td >{new Date(order.order_date).toLocaleTimeString()}</td>
                  <td >{formatCurrency(order.grand_total)}</td>
                  <td >{order.items.length} items</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
  </div>
</div>