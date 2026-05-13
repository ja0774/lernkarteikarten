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
    
    <div class="bg-white rounded-[32px] w-full max-w-lg shadow-2xl relative z-10 overflow-hidden animate-fade-up border border-border-subtle">
      <div class="p-8 pb-4 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-text-dark tracking-tight">Add New Card</h2>
        <button onclick={onclose} class="p-2 hover:bg-gray-100 rounded-full transition-colors text-muted">
          <X size={20} />
        </button>
      </div>

      <div class="p-8 pt-4 space-y-6">
        <div class="space-y-2">
          <label for="front" class="text-xs font-black text-muted uppercase tracking-[0.15em] flex items-center gap-2">
            <HelpCircle size={14} class="text-primary" /> Question (Front)
          </label>
          <textarea 
            id="front"
            bind:value={front}
            placeholder="e.g. What is the capital of France?" 
            rows="3"
            class="w-full bg-gray-50/50 border border-border-subtle rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none text-lg"
          ></textarea>
        </div>

        <div class="space-y-2">
          <label for="back" class="text-xs font-black text-muted uppercase tracking-[0.15em] flex items-center gap-2">
            <MessageSquareQuote size={14} class="text-primary" /> Answer (Back)
          </label>
          <textarea 
            id="back"
            bind:value={back}
            placeholder="e.g. Paris" 
            rows="3"
            class="w-full bg-gray-50/50 border border-border-subtle rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none text-lg"
          ></textarea>
        </div>

        <div class="pt-4 flex gap-3">
          <Button variant="secondary" class="flex-1 py-4" onclick={onclose}>Cancel</Button>
          <Button variant="primary" class="flex-1 py-4 shadow-lg shadow-primary/25" onclick={handleSubmit} disabled={!front || !back || isLoading}>
            {#if isLoading}
              <span>Saving...</span>
            {:else}
              <span>Save Card</span>
            {/if}
          </Button>
        </div>
      </div>
    </div>
  </div>
{/if}
