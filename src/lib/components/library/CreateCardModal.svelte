<script lang="ts">
  import { decksStore } from '$lib/stores/decks.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { X, HelpCircle, MessageSquareQuote } from 'lucide-svelte';

  let { isOpen, deckId, onclose } = $props<{ 
    isOpen: boolean, 
    deckId: string | null, 
    onclose: () => void 
  }>();

  let front = $state('');
  let back = $state('');
  let isLoading = $state(false);

  async function handleSubmit() {
    if (!front || !back || !deckId) return;
    isLoading = true;
    
    await decksStore.addCard(deckId, front, back);

    isLoading = false;
    onclose();
    front = '';
    back = '';
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-[2000] flex items-center justify-center p-4">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="absolute inset-0 bg-text-dark/40 backdrop-blur-sm" onclick={onclose}></div>
    
    <div class="bg-white rounded-[40px] w-full max-w-xl min-h-[650px] shadow-2xl relative z-10 overflow-hidden animate-fade-up border border-border-subtle flex flex-col">
      <!-- Header -->
      <div class="p-8 pb-0 flex items-center justify-between z-20">
        <h2 class="text-2xl font-black text-text-dark tracking-tight">Add New Card</h2>
        <button onclick={onclose} class="p-2 hover:bg-gray-100 rounded-full transition-colors text-muted">
          <X size={24} />
        </button>
      </div>

      <!-- Main Content Area - This will center the input boxes -->
      <div class="flex-1 px-10 flex flex-col justify-center gap-12">
        <div class="space-y-4">
          <label for="front" class="text-xs font-black text-primary/60 uppercase tracking-[0.25em] block text-center">Question</label>
          <div class="relative">
            <textarea 
              id="front"
              bind:value={front}
              placeholder="Type your question here..." 
              rows="3"
              class="w-full bg-gray-50 border-2 border-border-subtle rounded-[32px] py-8 px-8 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-2xl text-center placeholder:text-muted/30 shadow-inner"
            ></textarea>
          </div>
        </div>

        <div class="space-y-4">
          <label for="back" class="text-xs font-black text-primary/60 uppercase tracking-[0.25em] block text-center">Answer</label>
          <div class="relative">
            <textarea 
              id="back"
              bind:value={back}
              placeholder="Type the answer here..." 
              rows="3"
              class="w-full bg-gray-50 border-2 border-border-subtle rounded-[32px] py-8 px-8 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-2xl text-center placeholder:text-muted/30 shadow-inner"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-10 pt-0 flex gap-4">
        <Button variant="secondary" class="flex-1 py-5 rounded-2xl font-bold" onclick={onclose}>Cancel</Button>
        <Button variant="primary" class="flex-1 py-5 rounded-2xl font-bold shadow-2xl shadow-primary/30" onclick={handleSubmit} disabled={!front || !back || isLoading}>
          {#if isLoading}
            <span>Saving...</span>
          {:else}
            <span>Create Card</span>
          {/if}
        </Button>
      </div>
    </div>
  </div>
{/if}
