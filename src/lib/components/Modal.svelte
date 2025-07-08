<script>
  let { showModal = $bindable(),closeModal = $bindable(), header, children } = $props();

  let dialog = $state(); // HTMLDialogElement

  $effect(() => {
    if (showModal) dialog.showModal();
    if(!showModal) dialog.close();
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog class="modal backdrop-blur-sm backdrop-brightness-75"
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={(e) => { if (e.target === dialog) dialog.close(); }}
>
  <div class="modal-box max-h-3/4 backdrop-blur-sm backdrop-brightness-75">
    {@render header?.()}

      {@render children?.(closeModal)}

    <!-- svelte-ignore a11y_autofocus -->
    <!-- <button class="btn btn-soft m-1" autofocus onclick={() => dialog.close()}>close</button> -->
  </div>
</dialog>

