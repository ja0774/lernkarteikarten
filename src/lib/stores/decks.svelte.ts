import { supabase } from '$lib/supabaseClient';
import { authStore } from './auth.svelte';

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  mastery: number; // 0-100
};

export type Deck = {
  id: string;
  title: string;
  description: string;
  icon: string;
  cards: Flashcard[];
  color: string;
};

class DecksStore {
  decks = $state<Deck[]>([]);
  currentStudyDeckId = $state<string | null>(null);
  isLoading = $state(true);

  constructor() {
    this.init();
  }

  async init() {
    // Wait for auth to settle
    $effect.root(() => {
      $effect(() => {
        if (!authStore.isLoading) {
          if (authStore.user) {
            this.fetchDecks();
          } else {
            // Use static demo data if not logged in
            this.decks = [
              {
                id: 'demo-1',
                title: 'Advanced Neuroscience',
                description: 'Brain anatomy and functional systems',
                icon: 'Brain',
                color: 'bg-purple-100 text-purple-600',
                cards: [
                  { id: '1-1', front: 'What is the function of the Amygdala?', back: 'Processing of emotions, especially fear and aggression.', mastery: 85 },
                  { id: '1-2', front: 'Where is the visual cortex located?', back: 'Occipital lobe.', mastery: 60 },
                ]
              }
            ];
            this.isLoading = false;
          }
        }
      });
    });
  }

  async fetchDecks() {
    this.isLoading = true;
    const { data: decksData, error: decksError } = await supabase
      .from('decks')
      .select('*, cards(*)');

    if (decksError) {
      console.error('Error fetching decks:', decksError);
    } else {
      this.decks = (decksData || []).map(d => ({
        ...d,
        cards: d.cards || []
      }));
    }
    this.isLoading = false;
  }

  async createDeck(deck: Omit<Deck, 'id' | 'cards'>) {
    if (!authStore.user) return;
    
    const { data, error } = await supabase
      .from('decks')
      .insert([{ ...deck, user_id: authStore.user.id }])
      .select()
      .single();

    if (!error && data) {
      const newDeck = { ...data, cards: [] };
      this.decks = [...this.decks, newDeck];
      return newDeck;
    }
  }

  async updateCardMastery(cardId: string, mastery: number) {
    // If it's a demo card, just update locally
    if (cardId.startsWith('1-') || cardId.startsWith('demo-')) {
      this.decks = this.decks.map(d => ({
        ...d,
        cards: d.cards.map(c => c.id === cardId ? { ...c, mastery } : c)
      }));
      return;
    }

    // Otherwise update in DB
    const { error } = await supabase
      .from('cards')
      .update({ mastery })
      .eq('id', cardId);

    if (!error) {
      this.decks = this.decks.map(d => ({
        ...d,
        cards: d.cards.map(c => c.id === cardId ? { ...c, mastery } : c)
      }));
    }
  }

  getDeck(id: string) {
    return this.decks.find(d => d.id === id);
  }

  startStudying(deckId: string) {
    this.currentStudyDeckId = deckId;
  }
}

export const decksStore = new DecksStore();
