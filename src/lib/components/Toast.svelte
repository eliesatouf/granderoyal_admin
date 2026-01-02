<script>
  import { toast } from '$lib/stores/toast';
  import { fade, fly } from 'svelte/transition';
  
  let isVisible = false;
  
  $: if ($toast) {
    isVisible = true;
  } else {
    isVisible = false;
  }

</script>

{#if $toast}
<div class="toast-container text-wrap p-4 z-1000" in:fly={{ x: 100 }}  out:fade class:visible={isVisible}>

    <div class={{
        'toast bg-success text-black':$toast.type == 'success',
        'toast bg-success-content':$toast.type == 'successcontent',
        'toast bg-error text-black':$toast.type == 'error',
        'toast bg-warning text-black':$toast.type == 'warning',
        'toast bg-warning-content text-black':$toast.type == 'warningcontent',
        'toast bg-primary':$toast.type == 'primary',
        'toast bg-info':$toast.type == 'info',
        'toast bg-error-content':$toast.type == 'errorcontent'
      }}>

    <div class="toast-content m-2">
      {#if $toast.type === 'success'}
        <i class="pi pi-check-circle p-0 m-0"></i>
      {:else if $toast.type === 'error'}
        <i class="pi pi-times-circle p-0 m-0"></i>
      {:else if $toast.type === 'warning'}
       <i class="pi pi-exclamation-circle p-0 m-0"></i>
      {:else}
        <i class="pi pi-question p-0 m-0"></i>
      {/if}
      <span class="toast-message m-1">{$toast.message}</span>
    </div>

    <button class="toast-close m-1" on:click={toast.dismiss} aria-label="Dismiss">
      <i class="pi pi-times p-0 m-0"></i>
    </button>

    {#if $toast.duration > 0}
      <div class="toast-progress" 
           style={`animation-duration: ${$toast.duration}ms`}
           on:animationend={toast.dismiss}></div>
    {/if}
  </div>
</div>
{/if}

<style>
  .toast-container {
    position: fixed;
    top: 1.5rem;
    right:1.5rem;
    z-index: 1000;
    transform: translateY(100%);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);

  }

  .toast-container.visible {
    transform: translateY(0);
    opacity: 1;
  }

  .toast {
    position: relative;
    min-width: 250px;
    padding: 0.75rem 1rem;
    border-radius: 3px;
    /*box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);*/
    display: flex;
    align-items: center;
    justify-content: space-between;
    /*color: white;*/
    /*overflow: hidden;*/
  }

  .toast-content {
    display: flex;
    max-width: 400px;
    align-items: center;
    gap: 0.75rem;
    flex-grow: 1;
  }

  .toast-icon {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    position: relative;
    top: 10;
    left: 0;
  }

  .toast-message {
    font-size: 0.9375rem;
    line-height: 1.4;
  }

  .toast-close {
    background: transparent;

    color: inherit;
    cursor: pointer;
    padding: 0.5rem;
    margin-left: 0.5rem;
    opacity: 0.7;
    transition: opacity 0.2s;
    position: fixed;
    top: 0;
    right: 0;
  }

  .toast-close:hover {
    opacity: 1;
  }

  .toast-close svg {
    width: 1.25rem;
    height: 1.25rem;
    display: block;
  }

  .toast-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: rgba(255, 255, 255, 0.3);
    animation: progress linear forwards;
  }

  @keyframes progress {
    from { width: 100%; }
    to { width: 0%; }
  }

</style>