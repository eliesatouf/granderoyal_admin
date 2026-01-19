<script lang="ts">
import '../app.css';
import Navbar from '$lib/components/Navbar.svelte';
import Toast from '$lib/components/Toast.svelte';
import { beforeNavigate, afterNavigate } from '$app/navigation';
import userState from '$lib/stores/user.svelte.js';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
import { jwtDecode } from 'jwt-decode';
import { browser } from '$app/environment';

// Import our PWA registration
import { registerSW } from '$lib/pwa/register';

// PWA components
import PWAInstallPrompt from '$lib/components/pwa/PWAInstallPrompt.svelte';
import PWAReloadPrompt from '$lib/components/pwa/PWAReloadPrompt.svelte';

let { children } = $props();
let admin = $state(false);


  let deferredPrompt = null;
  let showInstallButton = false;


onMount(() => {
  if (!browser) return;

   console.log('=== ADMIN PWA DEBUG ===');
  
  // Direct event listener to check
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('🎯 ADMIN: beforeinstallprompt FIRED!', e);
    e.preventDefault();
    window.adminDeferredPrompt = e;
    
    // Also trigger your component
    window.dispatchEvent(new CustomEvent('admin-pwa-ready'));
  }, { once: true });
  
  // Check after 5 seconds
  setTimeout(() => {
    console.log('Check after 5s - deferredPrompt exists?', !!window.adminDeferredPrompt);
  }, 5000);


  if ('serviceWorker' in navigator) {
    const swPath = '/admin/sw.js';
    
    navigator.serviceWorker.register(swPath, {
      scope: '/admin/'
    }).then(registration => {
      console.log('✅ Service Worker registered:', registration.scope);
      
      // Force update
      registration.update();
      
    }).catch(error => {
      console.log('❌ Service Worker failed:', error);
      
      // Fallback: Try with different path
      navigator.serviceWorker.register('/sw.js', { scope: '/admin/' })
        .then(reg => console.log('Fallback SW registered:', reg.scope))
        .catch(e => console.log('Fallback also failed:', e));
    });
  }
      // Handle PWA install prompt
      console.log('browser')
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallButton = true;
      });

      // Detect if already installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('Running in standalone PWA mode');
      }
    
  
  async function installPWA() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('PWA installed');
        showInstallButton = false;
      }
      deferredPrompt = null;
    }
  }

  
afterNavigate(({ to, from }) => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    admin = decoded.roles.includes('ROLE_ADMIN');
  }
  if (!admin && (from?.route.id != '/logout' && to?.route.id != '/logout')) {
    // Handle non-admin access
  }
});
  
  // User authentication
  const token = localStorage.getItem('token');
  if (token) {
    userState.user.isAuthenticated = true;
    const decoded = jwtDecode(token);
    userState.user.name = decoded.username;
    admin = decoded.roles.includes('ROLE_ADMIN');
  }
});
</script>


<!-- PWA Prompts -->

  <PWAInstallPrompt />
  <PWAReloadPrompt />

{#if admin}
  <Navbar />
{/if}
{@render children()}

<style>
.passed {
  color: #10b981;
}
</style>