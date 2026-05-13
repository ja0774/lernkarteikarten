  import Card from '$lib/components/ui/Card.svelte';
  import { decksStore, type Deck } from '$lib/stores/decks.svelte';
  import { Brain, BookOpen, Flame, Plus, Trash2 } from 'lucide-svelte';
  import { base } from '$app/paths';

  let { deck, onAddCard }: { deck: Deck, onAddCard: (id: string) => void } = $props();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Brain': return Brain;
      case 'Flame': return Flame;
      default: return BookOpen;
    }
  };

  const IconComponent = $derived(getIcon(deck.icon));
  const overallMastery = $derived(deck.cards.length > 0 
    ? Math.round(deck.cards.reduce((acc, c) => acc + c.mastery, 0) / deck.cards.length)
    : 0
  );

  async function handleDelete(e: Event) {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${deck.title}" and all its cards?`)) {
      await decksStore.deleteDeck(deck.id);
    }
  }

  function handleAddCard(e: Event) {
    e.stopPropagation();
    onAddCard(deck.id);
  }
</script>

<Card interactive class="flex flex-col h-full cursor-pointer p-5 relative group" onclick={() => window.location.href = `${base}/study?deck=${deck.id}`}>
  <div class="flex items-center justify-between mb-4">
    <div class="w-12 h-12 rounded-[18px] {deck.color} flex items-center justify-center">
      <IconComponent size={24} />
    </div>
    
    <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button 
        onclick={handleAddCard}
        class="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
        title="Add Card"
      >
        <Plus size={18} />
      </button>
      <button 
        onclick={handleDelete}
        class="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
        title="Delete Deck"
      >
        <Trash2 size={18} />
      </button>
    </div>
  </div>

  <h3 class="font-bold text-text-dark text-lg leading-tight mb-1">{deck.title}</h3>
  <p class="text-muted text-sm font-medium leading-snug line-clamp-2">{deck.description}</p>
  
  <div class="mt-auto pt-4 flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <span class="text-xs font-bold text-muted uppercase tracking-wider">{deck.cards.length} cards</span>
      <span class="text-xs font-bold text-primary">{overallMastery}%</span>
    </div>
    <div class="w-full bg-border-subtle rounded-full h-1.5 overflow-hidden">
      <div class="bg-primary h-full rounded-full transition-all duration-500" style="width: {overallMastery}%"></div>
    </div>
  </div>
</Card>
