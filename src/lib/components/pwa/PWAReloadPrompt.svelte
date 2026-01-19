<script lang="ts">
  import { onMount } from 'svelte';
  
  let needRefresh = $state(false);
  let registration = $state<any>(null);

  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        needRefresh = true;
      });
    }
  });

  function reloadApp() {
    needRefresh = false;
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  }
</script>

{#if needRefresh}
  <div class="fixed top-4 right-4 z-50 max-w-sm">
    <div class="bg-warning text-warning-content rounded-lg shadow-lg p-4">
      <div class="flex items-center gap-3">
        <div class="text-xl">🔄</div>
        <div class="flex-1">
          <p class="text-sm font-bold">New version available!</p>
        </div>
        <button 
          class="btn btn-sm btn-warning"
          onclick={reloadApp}
        >
          Reload
        </button>
      </div>
    </div>
  </div>
{/if}