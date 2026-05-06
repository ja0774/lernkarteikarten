<script lang="ts">
  import { Search, BookOpen } from 'lucide-svelte';
  import { decksStore } from '$lib/stores/decks.svelte';
  import DeckCard from '$lib/components/library/DeckCard.svelte';
  
  let searchQuery = $state('');
  
  const filteredDecks = $derived(
    searchQuery.trim() === '' 
      ? decksStore.decks 
      : decksStore.decks.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
</script>

<div class="px-6 py-10 lg:py-12 flex flex-col gap-8 animate-fade-up">
  
  <header class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
    <div>
      <h1 class="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">Library</h1>
      <p class="text-lg text-muted font-medium mt-1">Explore all your decks.</p>
    </div>

    <!-- Search Bar -->
    <div class="relative w-full sm:w-72 md:w-96 stagger-1 animate-fade-up" style="animation-fill-mode: both;">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search size={20} class="text-[#B8B5C7]" />
      </div>
      <input 
        type="text" 
        bind:value={searchQuery}
        placeholder="Search decks..." 
        class="w-full bg-white border border-[#E9E4F8] text-text-dark rounded-full py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-[#B8B5C7] font-medium"
      />
    </div>
  </header>

  <!-- Deck Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-2 animate-fade-up" style="animation-fill-mode: both;">
    {#each filteredDecks as deck (deck.id)}
      <div class="h-48"> <!-- Fixed height wrapper for the card to ensure consistent grid -->
        <DeckCard {deck} />
      </div>
    {/each}
    {#if filteredDecks.length === 0}
      <div class="col-span-full py-12 text-center flex flex-col items-center">
        <BookOpen size={48} strokeWidth={1.5} class="text-muted mb-4 opacity-30" />
        <p class="text-muted font-medium text-lg">No decks found matching "{searchQuery}"</p>
      </div>
    {/if}
  </div>

</div>
