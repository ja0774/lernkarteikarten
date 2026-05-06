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
  class="relative w-full aspect-[3/4] perspective-1000 cursor-pointer"
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
    <Card class="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 text-center bg-surface border-2 border-transparent hover:border-border-subtle transition-colors shadow-floating m-0 rounded-[40px]">
      <span class="text-sm font-bold text-primary tracking-widest uppercase mb-auto opacity-70">Question</span>
      <h2 class="text-2xl font-bold text-text-dark leading-snug">{card.front}</h2>
      <div class="mt-auto opacity-40 text-sm font-medium text-muted">Tap to reveal</div>
    </Card>

    <!-- Back Face -->
    <Card class="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 text-center bg-lavender border-2 border-primary/20 shadow-floating m-0 rounded-[40px]">
      <span class="text-sm font-bold text-primary tracking-widest uppercase mb-auto opacity-70">Answer</span>
      <h2 class="text-xl font-bold text-text-dark leading-relaxed">{card.back}</h2>
    </Card>

  </div>
</div>
