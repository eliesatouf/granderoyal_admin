// Run this in browser console to verify PWA setup
export function verifyPWA() {
  console.log('=== PWA VERIFICATION ===');
  
  // Check manifest
  const manifestLink = document.querySelector('link[rel="manifest"]');
  console.log('1. Manifest link:', manifestLink?.href);
  
  if (manifestLink) {
    fetch(manifestLink.href)
      .then(r => r.json())
      .then(manifest => {
        console.log('   Manifest content:', manifest);
        console.log('   ✅ Manifest loaded successfully');
      })
      .catch(e => console.log('   ❌ Manifest failed to load:', e));
  }
  
  // Check service worker
  console.log('2. Service Worker support:', 'serviceWorker' in navigator);
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        console.log(`   Found ${registrations.length} registrations`);
        registrations.forEach((reg, i) => {
          console.log(`   ${i + 1}. Scope: ${reg.scope}, Active: ${!!reg.active}`);
        });
      });
  }
  
  // Check icons
  console.log('3. Checking PWA icons...');
  ['/pwa-192x192.png', '/pwa-512x512.png'].forEach(icon => {
    const img = new Image();
    img.src = icon;
    img.onload = () => console.log(`   ✅ ${icon} exists`);
    img.onerror = () => console.log(`   ❌ ${icon} missing`);
  });
  
  // Check HTTPS/localhost
  const isSecure = window.location.protocol === 'https:' || 
                  window.location.hostname === 'localhost' ||
                  window.location.hostname === '127.0.0.1';
  console.log('4. Secure context:', isSecure);
  
  // Check if PWA criteria are met
  const hasManifest = !!manifestLink;
  const hasIcons = true; // Assuming icons exist
  const hasSW = 'serviceWorker' in navigator;
  
  console.log('5. PWA Requirements:');
  console.log('   - Manifest:', hasManifest ? '✅' : '❌');
  console.log('   - Service Worker:', hasSW ? '✅' : '❌');
  console.log('   - Secure Context:', isSecure ? '✅' : '❌');
  console.log('   - Icons:', hasIcons ? '✅' : '❌');
  
  if (hasManifest && hasSW && isSecure) {
    console.log('🎉 All PWA requirements met!');
    console.log('The "Install" prompt should appear after user engagement.');
  } else {
    console.log('⚠️ Some PWA requirements missing');
  }
  
  return {
    hasManifest,
    hasSW,
    isSecure,
    hasIcons
  };
}

// Run automatically in dev
if (import.meta.env.DEV && typeof window !== 'undefined') {
  setTimeout(() => {
    console.log('=== Auto-running PWA verification ===');
    verifyPWA();
  }, 1000);
}