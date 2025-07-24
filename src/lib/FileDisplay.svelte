<!-- src/lib/FileDisplay.svelte -->
<script>
    import { getFileTypeFromHeader } from '$lib/utils/fileType';
    import { onMount } from 'svelte';

    export let url;
    
    let fileType = 'unknown';
    let isLoading = true;
    
    // Load the file type when component mounts
    onMount(async () => {
        fileType = await getFileTypeFromHeader(url);
        isLoading = false;
    });
</script>

<div class="file-display">
    {#if isLoading}
        <div class="loading">Checking file type...</div>
    {:else}
        {#if fileType === 'image'}
            <img src={url} alt="Content image" class="file-preview" />
        {:else if fileType === 'video'}
            <video controls class="file-preview">
                <source src={url} type="video/{url.split('.').pop()}" />
            </video>
        {:else}
            <a href={url} target="_blank" class="file-link">{url}</a>
        {/if}
    {/if}
</div>

<style>
    .file-display {
        margin: 1rem 0;
    }
    .file-preview {
        max-width: 100%;
        max-height: 300px;
        display: block;
    }
    .loading {
        color: #666;
        font-style: italic;
    }
    .file-link {
        word-break: break-all;
    }
</style>