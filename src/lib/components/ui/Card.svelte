<script lang="ts">
  import type { Snippet } from 'svelte';

  let { 
    children, 
    class: className = '',
    interactive = false,
    ...rest 
  }: { 
    children: Snippet; 
    class?: string;
    interactive?: boolean;
    [key: string]: any;
  } = $props();
</script>

<div 
  class="bg-surface rounded-3xl shadow-card p-6 {interactive ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-floating active:scale-95' : ''} {className}"
  {...rest}
>
  {@render children()}
</div>
