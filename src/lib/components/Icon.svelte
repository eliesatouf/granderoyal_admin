<!-- Icon.svelte -->
<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  
  let {name = '', size = 'w-5 h-5',  class: className = ''} = $props()
  

  
  // Only load icons.svg once
  let iconsLoaded = false;
  
  onMount(() => {
    if (!iconsLoaded && typeof window !== 'undefined') {
      // Check if icons.svg is already in DOM
      const existingIcons = document.getElementById('icons-svg');
      if (!existingIcons) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.display = 'none';
        svg.id = 'icons-svg';
        
        fetch(`${base}/icons.svg`)
          .then(response => response.text())
          .then(svgContent => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgContent, 'image/svg+xml');
            const symbols = doc.querySelectorAll('symbol');
            
            symbols.forEach(symbol => {
              svg.appendChild(document.importNode(symbol, true));
            });
            
            document.body.appendChild(svg);
            iconsLoaded = true;
          })
          .catch(console.error);
      } else {
        iconsLoaded = true;
      }
    }
  });
</script>

<svg class="inline-block {size} {className}" fill="currentColor">
  <use href="#{name}" />
</svg>