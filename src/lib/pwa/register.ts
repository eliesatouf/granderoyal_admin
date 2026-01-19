import { browser } from '$app/environment';

export type RegisterSWOptions = {
  immediate?: boolean;
  onNeedRefresh?: () => void;
  onOfflineReady?: () => void;
  onRegistered?: (registration: ServiceWorkerRegistration | null) => void;
  onRegisterError?: (error: any) => void;
};

export async function registerSW(options: RegisterSWOptions = {}) {
  if (!browser) return;
  
  const {
    immediate = true,
    onNeedRefresh,
    onOfflineReady,
    onRegistered,
    onRegisterError
  } = options;

  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker not supported');
    return;
  }

  try {
    // Try to register service worker
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    });

    console.log('✅ Service Worker registered:', registration.scope);
    
    if (onRegistered) {
      onRegistered(registration);
    }

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed') {
          if (registration.waiting) {
            // Update available
            if (onNeedRefresh) onNeedRefresh();
          } else {
            // Content is cached
            if (onOfflineReady) onOfflineReady();
          }
        }
      });
    });

    // Check if there's already a waiting worker
    if (registration.waiting) {
      if (onNeedRefresh) onNeedRefresh();
    }

  } catch (error) {
    console.error('❌ Service Worker registration failed:', error);
    if (onRegisterError) {
      onRegisterError(error);
    }
  }
}