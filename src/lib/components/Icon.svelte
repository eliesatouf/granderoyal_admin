<script>
  export let name = "menu"; // default icon
  export let size = 24;
  export let fill = false;
</script>

<span 
  class="material-symbols-outlined"
  style:font-size={size + 'px'}
  style:font-variation-settings={`
    'FILL' ${fill ? 1 : 0}, 
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
  `}
>
  {name}
</span>

<style>
  /* Self-hosting the font */
  @font-face {
    font-family: 'Material Symbols Outlined';
    font-style: normal;
    src: url('/node_modules/material-symbols/material-symbols-outlined.woff2') format('woff2');
  }
  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    line-height: 1;
  }
</style>