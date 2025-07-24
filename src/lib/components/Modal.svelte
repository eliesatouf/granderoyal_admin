<script>
  let { showModal = $bindable(),closeModal = $bindable(), header, children } = $props();

  let dialog = $state(); // HTMLDialogElement

  $effect(() => {
    if (showModal) dialog.showModal();
    if(!showModal) dialog.close();
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog class="modal rounded md:rounded-lg mx-auto justify-center  backdrop-brightness-80 "
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={(e) => { if (e.target === dialog) dialog.close(); }}
>
  <div class=" flex justify-center flex row lg:w-[850px] w-[350px]">
    {@render header?.()}

      {@render children?.(closeModal)}

    <!-- svelte-ignore a11y_autofocus -->
    <!-- <button class="btn btn-soft m-1" autofocus onclick={() => dialog.close()}>close</button> -->
  </div>
</dialog>


