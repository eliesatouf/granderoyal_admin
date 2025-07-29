<script>
  let { showModalRecord = $bindable(),
        showModalConfirm = $bindable(),
        showModalUpload = $bindable(),
        showModalPreview = $bindable(),
        header, children } = $props();

  let dialogRecord = $state(); // HTMLDialogElement
  let dialogConfirm = $state(); 
  let dialogUpload =$state();
  let dialogPreview=$state();

  $effect(() => {
    if (showModalRecord) dialogRecord.showModal();
    if (!showModalRecord) dialogRecord.close();

    if (showModalConfirm) dialogConfirm.showModal();
    if (!showModalConfirm) dialogConfirm.close();

    if (showModalUpload) dialogUpload.showModal();
    if (!showModalUpload) dialogUpload.close();

    if (showModalPreview) dialogPreview.showModal();
    if (!showModalPreview) dialogPreview.close();
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
    <button class="btn btn-soft btn rounded btn-sm m-1" autofocus onclick={() => dialogRecord.close()}>close</button>
  </div>
</dialog>

<dialog class="modal backdrop-blur-sm backdrop-brightness-75"
  bind:this={dialogConfirm}
  onclose={() => (showModalConfirm = false)}
  onclick={(e) => { if (e.target === dialogConfirm) dialogConfirm.close(); }}
>
  <div class="modal-box max-h-3/4">
    {@render header?.()}

      {@render children?.()}

    <!-- svelte-ignore a11y_autofocus -->
    <button class="btn btn-soft btn rounded btn-sm m-1" autofocus onclick={() => dialogConfirm.close()}>close</button>
  </div>
</dialog>

<dialog class="modal  mx-auto justify-center  backdrop-brightness-80 backdrop-blur-sm "
  bind:this={dialogUpload}
  onclose={() => (showModalUpload = false)}
  onclick={(e) => { if (e.target === dialogUpload) dialogUpload.close(); }}
>
  <div class="flex justify-center flex row rounded md:rounded-lg bg-base-200">
    {@render header?.()}

      {@render children?.()}

    <!-- svelte-ignore a11y_autofocus -->
    <!-- <button class="btn btn-soft btn rounded btn-sm m-1" autofocus onclick={() => dialogUpload.close()}>close</button> -->
  </div>
</dialog>

<dialog class="modal  mx-auto justify-center  backdrop-brightness-80 backdrop-blur-sm "
  bind:this={dialogPreview}
  onclose={() => (showModalPreview = false)}
  onclick={(e) => { if (e.target === dialogPreview) dialogPreview.close(); }}
>
  <div class="flex justify-center flex row rounded md:rounded-lg bg-base-200">
    {@render header?.()}

      {@render children?.()}

    <!-- svelte-ignore a11y_autofocus -->
    <!-- <button class="btn btn-soft btn rounded btn-sm m-1" autofocus onclick={() => dialogPreview.close()}>close</button> -->
  </div>
</dialog>