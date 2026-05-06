<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import type { Deck } from '$lib/stores/decks.svelte';
  import { Brain, BookOpen, Flame } from 'lucide-svelte';

  let { deck }: { deck: Deck } = $props();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Brain': return Brain;
      case 'Flame': return Flame;
      default: return BookOpen;
    }
  };

  const IconComponent = $derived(getIcon(deck.icon));
  const overallMastery = $derived(Math.round(deck.cards.reduce((acc, c) => acc + c.mastery, 0) / deck.cards.length));
</script>

<Card interactive class="flex flex-col h-full cursor-pointer p-5" onclick={() => window.location.href = `/study?deck=${deck.id}`}>
  <div class="flex items-center justify-between mb-4">
    <div class="w-12 h-12 rounded-[18px] {deck.color} flex items-center justify-center">
      <IconComponent size={24} />
    </div>
    
    <!-- Mastery Badge -->
    <div class="bg-gray-100 text-muted px-2.5 py-1 rounded-full text-xs font-bold">
      {deck.cards.length} cards
    </div>
  </div>

  <h3 class="font-bold text-text-dark text-lg leading-tight mb-1">{deck.title}</h3>
  <p class="text-muted text-sm font-medium leading-snug line-clamp-2">{deck.description}</p>
  
  <div class="mt-auto pt-4 flex items-center gap-2">
    <div class="w-full bg-border-subtle rounded-full h-1.5">
      <div class="bg-primary h-1.5 rounded-full" style="width: {overallMastery}%"></div>
    </div>
    <span class="text-xs font-bold text-primary min-w-[32px] text-right">{overallMastery}%</span>
  </div>
</Card>
