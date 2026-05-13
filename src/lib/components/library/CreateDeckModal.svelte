<script lang="ts">
  import { decksStore } from '$lib/stores/decks.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { X, Plus, Brain, BookOpen, Flame, Atom, Languages, Music, Calculator, Globe } from 'lucide-svelte';

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
    { name: 'Languages', icon: Languages },
    { name: 'Music', icon: Music },
    { name: 'Calculator', icon: Calculator },
    { name: 'Globe', icon: Globe },
  ];

  const emojis = ['🚀', '🎨', '⚽', '🍕', '💡', '🧪', '🌍', '🎸', '📱', '🎮'];

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
    
    <div class="bg-white rounded-[40px] w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 animate-fade-up border border-border-subtle flex flex-col my-auto">
      <!-- Header -->
      <div class="p-8 pb-4 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20">
        <h2 class="text-2xl font-black text-text-dark tracking-tight">Create New Deck</h2>
        <button onclick={onclose} class="p-2 hover:bg-gray-100 rounded-full transition-colors text-muted">
          <X size={24} />
        </button>
      </div>

      <div class="p-8 space-y-8">
        <div class="space-y-3">
          <label for="title" class="text-xs font-black text-primary/60 uppercase tracking-[0.2em] block text-center">Deck Title</label>
          <input 
            id="title"
            type="text" 
            bind:value={title}
            placeholder="e.g. Psychology 101" 
            class="w-full bg-gray-50 border-2 border-border-subtle rounded-[24px] py-5 px-6 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-xl text-center placeholder:text-muted/30"
          />
        </div>

        <div class="space-y-3">
          <label for="desc" class="text-xs font-black text-primary/60 uppercase tracking-[0.2em] block text-center">Description</label>
          <textarea 
            id="desc"
            bind:value={description}
            placeholder="What is this deck about?" 
            rows="2"
            class="w-full bg-gray-50 border-2 border-border-subtle rounded-[24px] py-5 px-6 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-lg text-center resize-none placeholder:text-muted/30"
          ></textarea>
        </div>

        <div class="space-y-4">
          <label class="text-xs font-black text-primary/60 uppercase tracking-[0.2em] block text-center">Choose Icon or Emoji</label>
          <div class="flex flex-wrap justify-center gap-3">
            {#each icons as { name, icon: Icon }}
              <button 
                onclick={() => selectedIcon = name}
                class="w-10 h-10 rounded-2xl flex items-center justify-center transition-all {selectedIcon === name ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110' : 'bg-gray-50 text-muted hover:bg-gray-100'}"
              >
                <Icon size={18} />
              </button>
            {/each}
            
            <div class="w-full h-px bg-border-subtle my-1"></div>
            
            <div class="flex flex-wrap justify-center gap-2">
              {#each emojis as emoji}
                <button 
                  onclick={() => selectedIcon = emoji}
                  class="w-10 h-10 rounded-2xl flex items-center justify-center text-xl transition-all {selectedIcon === emoji ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110' : 'bg-gray-50 hover:bg-gray-100'}"
                >
                  {emoji}
                </button>
              {/each}
            </div>
          </div>
        </div>

        <div class="pt-2 flex gap-4">
          <Button variant="secondary" class="flex-1 py-4 rounded-2xl font-bold" onclick={onclose}>Cancel</Button>
          <Button variant="primary" class="flex-1 py-4 rounded-2xl font-bold shadow-xl shadow-primary/25" onclick={handleSubmit} disabled={!title || isLoading}>
            {isLoading ? 'Creating...' : 'Create Deck'}
          </Button>
        </div>
      </div>
    </div>
  </div>
{/if}
