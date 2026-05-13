<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import type { Flashcard } from '$lib/stores/decks.svelte';

  let { 
    card,
    isFlipped = false,
    onFlip
  }: { 
    card: Flashcard;
    isFlipped?: boolean;
    onFlip?: () => void;
  } = $props();
</script>

<!-- The outer container providing 3D perspective -->
<div 
  class="relative w-full max-w-xl mx-auto aspect-[3/2] perspective-1000 cursor-pointer"
  onclick={onFlip}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === 'Enter' && onFlip?.()}
>
  <!-- The inner wrapper that actually rotates -->
  <div 
    class="w-full h-full relative preserve-3d transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] {isFlipped ? 'rotate-y-180' : ''}"
  >
    
    <!-- Front Face -->
    <Card class="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-10 text-center bg-surface border-2 border-transparent hover:border-border-subtle transition-colors shadow-floating m-0 rounded-[40px]">
      <span class="absolute top-8 text-xs font-black text-primary/50 tracking-[0.2em] uppercase">Question</span>
      <h2 class="text-2xl md:text-3xl font-bold text-text-dark leading-tight">{card.front}</h2>
      <div class="absolute bottom-8 opacity-40 text-xs font-bold text-muted uppercase tracking-widest">Tap to reveal</div>
    </Card>

    <!-- Back Face -->
    <Card class="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-10 text-center bg-lavender border-2 border-primary/20 shadow-floating m-0 rounded-[40px]">
      <span class="absolute top-8 text-xs font-black text-primary/50 tracking-[0.2em] uppercase">Answer</span>
      <h2 class="text-2xl md:text-3xl font-bold text-text-dark leading-relaxed">{card.back}</h2>
    </Card>

  </div>
</div>
