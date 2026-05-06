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

const initialDecks: Deck[] = [
  {
    id: '1',
    title: 'Advanced Neuroscience',
    description: 'Brain anatomy and functional systems',
    icon: 'Brain',
    color: 'bg-purple-100 text-purple-600',
    cards: [
      { id: '1-1', front: 'What is the function of the Amygdala?', back: 'Processing of emotions, especially fear and aggression.', mastery: 85 },
      { id: '1-2', front: 'Where is the visual cortex located?', back: 'Occipital lobe.', mastery: 60 },
      { id: '1-3', front: 'What neurotransmitter is primarily involved in reward?', back: 'Dopamine.', mastery: 90 },
      { id: '1-4', front: 'Define neuroplasticity.', back: 'The brain\'s ability to reorganize itself by forming new neural connections.', mastery: 40 },
    ]
  },
  {
    id: '2',
    title: 'Cognitive Psychology',
    description: 'Memory, perception, and learning',
    icon: 'BookOpen',
    color: 'bg-blue-100 text-blue-600',
    cards: [
      { id: '2-1', front: 'What is working memory?', back: 'A cognitive system with a limited capacity that can hold information temporarily.', mastery: 75 },
    ]
  },
  {
    id: '3',
    title: 'Organic Chemistry',
    description: 'Nomenclature and reactions',
    icon: 'Flame',
    color: 'bg-rose-100 text-rose-600',
    cards: [
      { id: '3-1', front: 'What is an alkane?', back: 'A saturated hydrocarbon with single bonds only.', mastery: 50 },
    ]
  }
];

export const decksStore = $state({
  decks: initialDecks,
  currentStudyDeckId: null as string | null,
});

export function getDeck(id: string) {
  return decksStore.decks.find(d => d.id === id);
}

export function startStudying(deckId: string) {
  decksStore.currentStudyDeckId = deckId;
}
