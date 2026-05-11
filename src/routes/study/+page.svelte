<script lang="ts">
  import { decksStore } from '$lib/stores/decks.svelte';
  import Flashcard from '$lib/components/study/Flashcard.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { X, Flag, Pencil, RotateCcw } from 'lucide-svelte';
  import { base } from '$app/paths';
  
  // Use first deck if none selected (for demo)
  const activeDeck = $derived(
    decksStore.currentStudyDeckId 
      ? decksStore.decks.find(d => d.id === decksStore.currentStudyDeckId) 
      : decksStore.decks[0]
  );
  
  let currentCardIndex = $state(0);
  let isFlipped = $state(false);

  const currentCard = $derived(activeDeck?.cards[currentCardIndex]);
  const progress = $derived(activeDeck ? ((currentCardIndex + 1) / activeDeck.cards.length) * 100 : 0);

  function handleFlip() {
    isFlipped = !isFlipped;
  }

  function nextCard() {
    if (activeDeck && currentCardIndex < activeDeck.cards.length - 1) {
      isFlipped = false;
      setTimeout(() => {
        currentCardIndex++;
      }, 150); // wait for flip back animation before changing content
    } else {
      // Finished deck
      window.location.href = base || '/';
    }
  }
</script>

<div class="h-[100dvh] w-full bg-background relative overflow-y-auto z-[100] animate-fade-up">
  <div class="px-6 py-8 md:py-12 flex flex-col h-full max-w-xl mx-auto">
    <!-- Header with progress -->
    <header class="flex items-center gap-4 mb-8">
      <button class="p-2 -ml-2 text-muted hover:text-text-dark transition-colors" onclick={() => window.history.back()} aria-label="Close">
        <X size={24} />
      </button>
      <div class="flex-1 h-2 bg-border-subtle rounded-full overflow-hidden">
        <div class="h-full bg-primary transition-all duration-300 ease-out" style="width: {progress}%"></div>
      </div>
      <span class="text-sm font-bold text-muted min-w-[40px] text-right">
        {currentCardIndex + 1}/{activeDeck?.cards.length}
      </span>
    </header>

    <!-- Study Area -->
    <main class="flex-1 flex flex-col items-center justify-center relative w-full mb-8">
      {#if currentCard}
        <Flashcard 
          card={currentCard} 
          {isFlipped}
          onFlip={handleFlip}
        />
      {:else}
        <p>No cards found.</p>
      {/if}
    </main>

    <!-- Actions -->
    <footer class="mt-auto flex flex-col gap-4">
      <div class="flex items-center justify-between px-2 mb-2">
        <button class="text-muted hover:text-text-dark flex items-center gap-2 text-sm font-semibold transition-colors" aria-label="Flag">
          <Flag size={18} /> Flag
        </button>
        <button class="text-muted hover:text-text-dark flex items-center gap-2 text-sm font-semibold transition-colors" aria-label="Edit">
          <Pencil size={18} /> Edit
        </button>
      </div>

      {#if isFlipped}
        <div class="grid grid-cols-2 gap-3 animate-fade-up" style="animation-duration: 300ms;">
          <Button variant="secondary" onclick={nextCard}>Need Review</Button>
          <Button variant="primary" onclick={nextCard}>Got It</Button>
        </div>
      {:else}
        <Button variant="primary" class="w-full" onclick={handleFlip}>
          Show Answer
        </Button>
      {/if}
    </footer>
  </div>
</div>
