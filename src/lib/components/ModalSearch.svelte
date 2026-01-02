<dialog class="modal backdrop-blur-sm backdrop-brightness-75"
  bind:this={dialogSearch}
  onclose={() => (showModalSearch = false)}
  onclick={(e) => { if (e.target === dialogSearch) dialogSearch.close(); }}
>
  <div class="modal-box max-h-3/4">
    {@render header?.()}

      {@render children?.()}

    <!-- svelte-ignore a11y_autofocus -->
    <button class="btn btn-soft btn rounded btn-sm m-1" autofocus onclick={() => dialogSearch.close()}>close</button>
  </div>
</dialog>

<script>
  let {
        showModalSearch = $bindable(),
        header, children } = $props();

  let dialogSearch=$state();

  $effect(() => {
    if (showModalSearch) dialogSearch.showModal();
    if (!showModalSearch) dialogSearch.close();
  });
</script>