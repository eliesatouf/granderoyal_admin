<script>
  import { onMount } from 'svelte';
  
  let connectionStatus = $state('Not connected');
  let itemsCount = $state(0);
  let sampleItem = $state(null);
  let error = $state('');
  
  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code) {
      connectionStatus = 'Exchanging code for token...';
      
      // Verify state (from your earlier sessionStorage)
      const savedState = sessionStorage.getItem('loyverse_oauth_state');
      sessionStorage.removeItem('loyverse_oauth_state');
      
      if (state !== savedState) {
        connectionStatus = '❌ Failed';
        error = 'Security validation failed';
        return;
      }
      
      try {
        // Call your Symfony backend - this MUST be publicly accessible!
        //const response = await fetch('http://localhost:7071/api/loyverse/token', {
          const response = await fetch('https://www.sandyscup.com/api/loyverse/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          connectionStatus = '✅ Connected!';
          itemsCount = data.items_fetched;
          sampleItem = data.first_item;
          window.history.replaceState({}, '', '/admin/loyverse');
        } else {
          connectionStatus = '❌ Failed';
          error = data.error || 'Unknown error';
        }
      } catch (err) {https://www.sandyscups.com/admin/loyverse
        connectionStatus = '❌ Network error';
        error = err.message;
        console.error('Error:', err);
      }
    }
  });
  
  function startLoyverseAuth() {
    const clientId = 'YY2RnBcUULqWzt4A7V_j';
    const redirectUri = window.location.origin + '/admin/loyverse'; // Redirect BACK to this page
    const state = Math.random().toString(36).substring(2);
    sessionStorage.setItem('loyverse_oauth_state', state);
    
    const authUrl = new URL('https://api.loyverse.com/oauth/authorize');
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('redirect_uri', redirectUri); // Same as current page
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', 'CUSTOMERS_READ ITEMS_READ INVENTORY_READ PAYMENT_TYPES_READ RECEIPTS_WRITE STORES_READ '); // Start with minimal scope
    authUrl.searchParams.append('state', state);
    
    window.location.href = authUrl.toString();
  }
</script>

<div class="p-8 max-w-2xl mx-auto">
  <h1 class="text-2xl font-bold mb-6">Loyverse Integration</h1>
  
  <div class="mb-8 p-4 bg-gray-100 rounded">
    <p class="font-semibold">Status: {connectionStatus}</p>
    {#if itemsCount > 0}
      <p class="mt-2">✅ Successfully fetched {itemsCount} items from Loyverse!</p>
    {/if}
    {#if error}
      <p class="mt-2 text-red-600">Error: {error}</p>
    {/if}
  </div>
  
  {#if sampleItem}
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-3">Sample Item (First in list):</h2>
      <pre class="bg-gray-800 text-white p-4 rounded overflow-auto text-sm">{JSON.stringify(sampleItem, null, 2)}</pre>
    </div>
  {/if}
  
  <div class="space-y-4">
    <button 
      onclick="{startLoyverseAuth}"
      class="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      🔗 Connect to Loyverse
    </button>
    
    <div class="text-sm text-gray-600">
      <p class="font-semibold">How to connect:</p>
      <ol class="list-decimal pl-5 mt-2 space-y-1">
        <li>Click "Connect to Loyverse"</li>
        <li>Authorize on Loyverse page</li>
        <li>You'll be redirected back here with a code</li>
        <li>The system will automatically exchange code for token and fetch items</li>
      </ol>
    </div>
  </div>
</div>