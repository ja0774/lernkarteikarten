<script lang="ts">
  import { decksStore } from '$lib/stores/decks.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { X, Plus, Brain, BookOpen, Flame, Atom } from 'lucide-svelte';

  let { isOpen, onclose } = $props<{ isOpen: boolean, onclose: () => void }>();

  let title = $state('');
  let description = $state('');
  let selectedIcon = $state('BookOpen');
  let isLoading = $state(false);

  const icons = [
    { name: 'BookOpen', icon: BookOpen },
    { name: 'Brain', icon: Brain },
    { name: 'Flame', icon: Flame },
    { name: 'Atom', icon: Atom },
  ];

  async function handleSubmit() {
    if (!title) return;
    isLoading = true;
    
    await decksStore.createDeck({
      title,
      description,
      icon: selectedIcon,
      color: 'bg-primary/10 text-primary'
    });

    isLoading = false;
    onclose();
    title = '';
    description = '';
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-[2000] flex items-center justify-center p-4">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="absolute inset-0 bg-text-dark/40 backdrop-blur-sm" onclick={onclose}></div>
    
    <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden animate-fade-up">
      <div class="p-6 border-b border-border-subtle flex items-center justify-between">
        <h2 class="text-xl font-bold text-text-dark">Create New Deck</h2>
        <button onclick={onclose} class="p-2 hover:bg-gray-100 rounded-full transition-colors text-muted">
          <X size={20} />
        </button>
      </div>

      <div class="p-6 space-y-6">
        <div>
          <label for="title" class="text-sm font-bold text-muted uppercase tracking-wider mb-2 block">Deck Title</label>
          <input 
            id="title"
            type="text" 
            bind:value={title}
            placeholder="e.g. Psychology 101" 
            class="w-full bg-gray-50 border border-border-subtle rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
          />
        </div>

        <div>
          <label for="desc" class="text-sm font-bold text-muted uppercase tracking-wider mb-2 block">Description</label>
          <textarea 
            id="desc"
            bind:value={description}
            placeholder="What is this deck about?" 
            rows="3"
            class="w-full bg-gray-50 border border-border-subtle rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none"
          ></textarea>
        </div>

        <div>
          <label class="text-sm font-bold text-muted uppercase tracking-wider mb-3 block">Choose Icon</label>
          <div class="flex gap-4">
            {#each icons as { name, icon: Icon }}
              <button 
                onclick={() => selectedIcon = name}
                class="w-12 h-12 rounded-xl flex items-center justify-center transition-all {selectedIcon === name ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-50 text-muted hover:bg-gray-100'}"
              >
                <Icon size={20} />
              </button>
            {/each}
          </div>
        </div>
      </div>

      <div class="p-6 bg-gray-50 flex gap-3">
        <Button variant="secondary" class="flex-1" onclick={onclose}>Cancel</Button>
        <Button variant="primary" class="flex-1" onclick={handleSubmit} disabled={!title || isLoading}>
          {isLoading ? 'Creating...' : 'Create Deck'}
        </Button>
      </div>
    </div>
  </div>
{/if}
