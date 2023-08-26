<script lang="ts">
  export let data: Boolean = false

  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  let loaded = false,
      root: HTMLDivElement,
      observer: IntersectionObserver | undefined;

  onMount(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loaded = true;
          if (observer) {
            observer.disconnect();
            
          }
          data = true;
          console.log("poo")
        }
      });
    });
    observer.observe(root);
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<div bind:this={root}>
  {#if loaded}
    <div>
      <slot />
    </div>
  {/if}
</div>
