<script>
  import { onMount } from 'svelte';

  let deferredPrompt = $state(null);
  let showInstallPrompt = $state(false);

  onMount(() => {
    console.log('PWAInstallPrompt mounted for /admin/');
    
    // FIRST: Check if event already fired (might have fired before component mounted)
    if (window.deferredPrompt) {
      console.log('Found existing deferredPrompt');
      deferredPrompt = window.deferredPrompt;
      showInstallPrompt = true;
    }
    
    if (window.adminDeferredPrompt) {
      console.log('Found adminDeferredPrompt');
      deferredPrompt = window.adminDeferredPrompt;
      showInstallPrompt = true;
    }

    // Listen for the beforeinstallprompt event
    const handleInstallPrompt = (e) => {
      console.log('PWA install prompt available for /admin/');
      e.preventDefault();
      deferredPrompt = e;
      showInstallPrompt = true;
      
      // Store in multiple places for reliability
      window.deferredPrompt = e;
      window.adminDeferredPrompt = e;
    };
    
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    
    // Also listen for custom event from layout
    window.addEventListener('admin-pwa-ready', () => {
      console.log('Custom admin-pwa-ready event received');
      if (window.adminDeferredPrompt) {
        deferredPrompt = window.adminDeferredPrompt;
        showInstallPrompt = true;
      }
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      showInstallPrompt = false;
      deferredPrompt = null;
      window.deferredPrompt = null;
      window.adminDeferredPrompt = null;
    });
    
    // DEBUG: Auto-show after 10 seconds in dev
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
      setTimeout(() => {
        if (!showInstallPrompt) {
          console.log('DEV: Simulating prompt for testing');
          showInstallPrompt = true;
          // Create mock for testing
          deferredPrompt = {
            prompt: () => {
              console.log('Mock prompt called');
              return Promise.resolve({ outcome: 'accepted' });
            },
            userChoice: Promise.resolve({ outcome: 'accepted' })
          };
        }
      }, 10000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  });

  async function installPWA() {
    if (!deferredPrompt) {
      console.log('No deferred prompt, checking window...');
      if (window.deferredPrompt) {
        deferredPrompt = window.deferredPrompt;
      } else if (window.adminDeferredPrompt) {
        deferredPrompt = window.adminDeferredPrompt;
      }
    }
    
    if (!deferredPrompt) {
      console.log('Still no prompt available');
      return;
    }
    
    console.log('Calling prompt()...');
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User ${outcome} the install prompt`);
    showInstallPrompt = false;
    deferredPrompt = null;
    window.deferredPrompt = null;
    window.adminDeferredPrompt = null;
  }

  function dismissPrompt() {
    showInstallPrompt = false;
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  }
</script>

{#if showInstallPrompt}
  <div class="fixed top-10 right-4 z-500 max-w-sm animate-fade-in">
    <div class="bg-base-100 border-2 border-primary rounded-xl shadow-2xl p-4">
      <div class="flex items-start gap-3">
        <div class="text-2xl text-primary">📱</div>
        <div class="flex-1">
          <h3 class="font-bold text-sm">Install GRANDE ROYALE Admin</h3>
          <p class="text-xs opacity-70 mt-1">Get the full admin app experience</p>
        </div>
      </div>
      <div class="flex gap-2 mt-3">
        <button 
          class="btn btn-primary btn-sm flex-1"
          on:click={installPWA}
        >
          Install
        </button>
        <button 
          class="btn btn-ghost btn-sm"
          on:click={dismissPrompt}
        >
          Later
        </button>
      </div>
      <div class="text-xs text-gray-500 mt-2">
        Path: {window.location.pathname}
      </div>
    </div>
  </div>
{/if}

<style>
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>

<!-- WORKING VERSION -->