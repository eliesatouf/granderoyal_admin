<script>
  import { chart } from "svelte-apexcharts";
  import { onMount } from 'svelte';
  
  // Reactive state
  let dashboardData = {
    today: { total_orders: 0, total_revenue: 0, total_discounts: 0, average_order_value: 0, net_revenue: 0 },
    yesterday: { total_orders: 0, total_revenue: 0, total_discounts: 0, average_order_value: 0, net_revenue: 0 },
    this_week: { total_orders: 0, total_revenue: 0, total_discounts: 0, average_order_value: 0, net_revenue: 0 },
    this_month: { total_orders: 0, total_revenue: 0, total_discounts: 0, average_order_value: 0, net_revenue: 0 },
    top_items_today: []
  };

  let loading = true;
  let error = null;

  // Chart options
  let revenueChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Today', 'Yesterday', 'This Week', 'This Month']
    },
    yaxis: {
      title: {
        text: 'Amount (₱)'
      }
    },
    colors: ['#3B82F6', '#10B981'],
    legend: {
      position: 'top'
    }
  };

  let topItemsChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true
      }
    },
    dataLabels: {
      enabled: true
    },
    xaxis: {
      title: {
        text: 'Revenue (₱)'
      }
    },
    yaxis: {
      title: {
        text: 'Menu Items'
      }
    },
    colors: ['#8B5CF6']
  };

  let hourlyChartOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    markers: {
      size: 5
    },
    xaxis: {
      type: 'category',
      title: {
        text: 'Hour'
      }
    },
    yaxis: {
      title: {
        text: 'Orders'
      }
    },
    colors: ['#EF4444'],
    tooltip: {
      theme: 'dark'
    }
  };

  // Chart series
  let revenueSeries = [
    {
      name: 'Revenue',
      data: [0, 0, 0, 0]
    },
    {
      name: 'Net Revenue', 
      data: [0, 0, 0, 0]
    }
  ];

  let topItemsSeries = [{
    name: 'Revenue',
    data: []
  }];

  let hourlySeries = [{
    name: 'Orders',
    data: []
  }];

  // Fetch dashboard data
  async function loadDashboard() {
    loading = true;
    error = null;
    
    try {
      const token = localStorage.getItem('token')
      const headers = {};
      headers['Authorization'] = `Bearer ${token}`;
      const options = {
            headers: headers
        }

      const response = await fetch('http://localhost:9090/api/dining/sales/dashboard', options); // FIXED URL
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      dashboardData = data;
      
      // Update chart series
      revenueSeries = [
        {
          name: 'Revenue',
          data: [
            data.today.total_revenue,
            data.yesterday.total_revenue,
            data.this_week.total_revenue,
            data.this_month.total_revenue
          ]
        },
        {
          name: 'Net Revenue',
          data: [
            data.today.net_revenue,
            data.yesterday.net_revenue,
            data.this_week.net_revenue,
            data.this_month.net_revenue
          ]
        }
      ];

      topItemsSeries = [{
        name: 'Revenue',
        data: data.top_items_today.map(item => item.revenue)
      }];

      // For horizontal bar chart, we need to set categories for y-axis
      topItemsChartOptions = {
        ...topItemsChartOptions,
        chart: {
          ...topItemsChartOptions.chart,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        xaxis: {
          title: {
            text: 'Revenue (₱)'
          }
        },
        yaxis: {
          categories: data.top_items_today.map(item => item.name),
          title: {
            text: 'Menu Items'
          }
        }
      };

      // Generate hourly data
      const hourlyData = generateHourlyData(data.today.total_orders);
      hourlySeries = [{
        name: 'Orders',
        data: hourlyData.map(item => item.y)
      }];

      // Set hourly categories
      hourlyChartOptions = {
        ...hourlyChartOptions,
        xaxis: {
          categories: hourlyData.map(item => item.x),
          title: {
            text: 'Hour'
          }
        }
      };
      
    } catch (err) {
      error = err.message;
      console.error('Failed to load dashboard:', err);
    } finally {
      loading = false;
    }
  }

  function generateHourlyData(totalOrders) {
    const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
    const weights = [0.2, 0.1, 0.1, 0.1, 0.2, 0.5, 1.5, 2.0, 1.8, 1.5, 2.5, 3.0, 
                     3.5, 2.8, 2.0, 1.8, 2.2, 3.0, 4.0, 3.5, 2.8, 2.0, 1.2, 0.5];
    
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const scale = totalOrders / totalWeight;
    
    return hours.map((hour, index) => ({
      x: hour,
      y: Math.round(weights[index] * scale)
    }));
  }

  // Load data on component mount
  onMount(() => {
    loadDashboard();
  });

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  }

  function calculateChange(current, previous) {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  }
</script>

<svelte:head>
  <title>Sales Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
      <p class="text-gray-600">Real-time sales performance metrics</p>
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
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error loading dashboard</h3>
            <p class="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
        <button on:click={loadDashboard} class="mt-3 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700">
          Retry
        </button>
      </div>
    {:else}
      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Today's Revenue</p>
              <p class="text-2xl font-bold text-gray-900">{formatCurrency(dashboardData.today.total_revenue)}</p>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          {#if dashboardData.yesterday.total_revenue > 0}
            <p class="text-sm {calculateChange(dashboardData.today.total_revenue, dashboardData.yesterday.total_revenue) >= 0 ? 'text-green-600' : 'text-red-600'} mt-2">
              {calculateChange(dashboardData.today.total_revenue, dashboardData.yesterday.total_revenue).toFixed(1)}% from yesterday
            </p>
          {/if}
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Today's Orders</p>
              <p class="text-2xl font-bold text-gray-900">{dashboardData.today.total_orders}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          {#if dashboardData.yesterday.total_orders > 0}
            <p class="text-sm {calculateChange(dashboardData.today.total_orders, dashboardData.yesterday.total_orders) >= 0 ? 'text-green-600' : 'text-red-600'} mt-2">
              {calculateChange(dashboardData.today.total_orders, dashboardData.yesterday.total_orders).toFixed(1)}% from yesterday
            </p>
          {/if}
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p class="text-2xl font-bold text-gray-900">{formatCurrency(dashboardData.today.average_order_value)}</p>
            </div>
            <div class="bg-purple-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          {#if dashboardData.yesterday.average_order_value > 0}
            <p class="text-sm {calculateChange(dashboardData.today.average_order_value, dashboardData.yesterday.average_order_value) >= 0 ? 'text-green-600' : 'text-red-600'} mt-2">
              {calculateChange(dashboardData.today.average_order_value, dashboardData.yesterday.average_order_value).toFixed(1)}% from yesterday
            </p>
          {/if}
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Discounts Given</p>
              <p class="text-2xl font-bold text-gray-900">{formatCurrency(dashboardData.today.total_discounts)}</p>
            </div>
            <div class="bg-yellow-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-2">Promotional impact</p>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Revenue Comparison Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Revenue Comparison</h3>
          <div use:chart={revenueChartOptions} series={revenueSeries} />
        </div>

        <!-- Top Items Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Selling Items Today</h3>
          <div use:chart={topItemsChartOptions} series={topItemsSeries} />
        </div>
      </div>

      <!-- Hourly Sales Chart -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Hourly Order Distribution</h3>
        <div use:chart={hourlyChartOptions} series={hourlySeries} />
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/reports/daily" class="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg text-center hover:bg-blue-100 transition-colors">
            <div class="font-medium">Daily Report</div>
            <div class="text-sm opacity-75">View today's details</div>
          </a>
          <a href="/reports/weekly" class="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-center hover:bg-green-100 transition-colors">
            <div class="font-medium">Weekly Report</div>
            <div class="text-sm opacity-75">This week's performance</div>
          </a>
          <a href="/reports/monthly" class="bg-purple-50 text-purple-700 px-4 py-3 rounded-lg text-center hover:bg-purple-100 transition-colors">
            <div class="font-medium">Monthly Report</div>
            <div class="text-sm opacity-75">Monthly overview</div>
          </a>
          <a href="/reports/custom" class="bg-orange-50 text-orange-700 px-4 py-3 rounded-lg text-center hover:bg-orange-100 transition-colors">
            <div class="font-medium">Custom Report</div>
            <div class="text-sm opacity-75">Custom date range</div>
          </a>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .apexcharts-tooltip {
    background: #1F2937 !important;
    color: #FFF !important;
    border: none !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
  }
  
  .apexcharts-tooltip-title {
    background: #374151 !important;
    border-bottom: 1px solid #4B5563 !important;
    color: #FFF !important;
  }
</style>