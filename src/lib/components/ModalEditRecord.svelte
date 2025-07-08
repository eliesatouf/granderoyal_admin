<script>
  let { showModalRecord = $bindable(), header, children } = $props();

  let dialogRecord = $state(); // HTMLDialogElement

  $effect(() => {
    if (showModalRecord) dialogRecord.showModal();
    if (!showModalRecord) dialogRecord.close();
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog class="modal backdrop-blur-sm backdrop-brightness-75"
  bind:this={dialogRecord}
  onclose={() => (showModalRecord = false)}
  onclick={(e) => { if (e.target === dialogRecord) dialogRecord.close(); }}
>
  <div class="modal-box max-h-3/4">
    {@render header?.()}

      {@render children?.()}

    <!-- svelte-ignore a11y_autofocus -->
    <button class="btn btn-soft btn-sm m-1" autofocus onclick={() => dialogRecord.close()}>close</button>
  </div>
</dialog>