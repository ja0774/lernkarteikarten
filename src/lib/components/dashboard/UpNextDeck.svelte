<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { Brain, ChevronRight } from 'lucide-svelte';
  import type { Deck } from '$lib/stores/decks.svelte';

  let { deck }: { deck: Deck } = $props();
</script>

<Card interactive class="flex flex-col gap-4">
  <div class="flex items-start justify-between">
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 rounded-2xl {deck.color} flex items-center justify-center">
        <!-- Would normally dynamically render icon component, but using Brain as fallback for MVP -->
        <Brain size={24} />
      </div>
      <div>
        <h3 class="text-sm font-bold text-text-dark tracking-tight leading-tight">{deck.title}</h3>
        <p class="text-xs text-muted font-medium mt-0.5">{deck.cards.length} cards to review</p>
      </div>
    </div>
  </div>
  
  <Button variant="primary" class="w-full mt-2" onclick={() => window.location.href = '/study'}>
    <span>Study Now</span>
    <ChevronRight size={18} class="ml-1" />
  </Button>
</Card>
