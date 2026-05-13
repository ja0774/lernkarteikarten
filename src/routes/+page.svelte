<script lang="ts">
  import DailyGoal from '$lib/components/dashboard/DailyGoal.svelte';
  import UpNextDeck from '$lib/components/dashboard/UpNextDeck.svelte';
  import GlobalRanking from '$lib/components/dashboard/GlobalRanking.svelte';
  import { authStore } from '$lib/stores/auth.svelte';
  import { decksStore } from '$lib/stores/decks.svelte';
  import { base } from '$app/paths';
  
  // Just grabbing the first deck for 'Up Next'
  const nextDeck = $derived(decksStore.decks[0]);
  const userName = $derived(authStore.user?.email?.split('@')[0] ?? 'Explorer');
  const userInitial = $derived(authStore.user?.email?.[0].toUpperCase() ?? 'U');
</script>

<div class="px-6 py-10 lg:py-12 flex flex-col gap-8 animate-fade-up">
  
  <!-- Header -->
  <header class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">
        Good morning, <span class="text-primary">{userName}</span>
      </h1>
      <p class="text-lg md:text-xl text-muted font-medium mt-1">Ready to build momentum?</p>
    </div>
    <!-- Profile avatar only visible on mobile as it is in the sidebar on desktop -->
    <div class="md:hidden w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent shadow-soft border-2 border-white flex items-center justify-center text-white font-bold text-lg">
      {userInitial}
    </div>
  </header>

  <!-- Responsive Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
    
    <!-- Left Column (Main Content) -->
    <div class="lg:col-span-2 flex flex-col gap-8">
      <section class="stagger-1 animate-fade-up" style="animation-fill-mode: both;">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-muted uppercase tracking-wider">Up Next</h2>
          <button class="text-sm font-bold text-primary hover:text-accent transition-colors">View all</button>
        </div>
        {#if nextDeck}
          <UpNextDeck deck={nextDeck} />
        {/if}
      </section>
      
      <section class="stagger-2 animate-fade-up" style="animation-fill-mode: both;">
         <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-muted uppercase tracking-wider">Recent Activity</h2>
         </div>
         <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {#each decksStore.decks.slice(0, 2) as deck}
             <div class="bg-white border border-border-subtle rounded-[24px] p-5 shadow-sm hover:shadow-floating transition-all cursor-pointer" onclick={() => window.location.href=`${base}/study?deck=${deck.id}`}>
               <div class="flex items-center gap-3 mb-3">
                 <div class="w-12 h-12 rounded-[18px] {deck.color} flex items-center justify-center">
                    <span class="text-white font-bold text-xl">{deck.title.charAt(0)}</span>
                 </div>
                 <h3 class="font-bold text-text-dark text-lg leading-tight">{deck.title}</h3>
               </div>
               <div class="flex items-center justify-between mt-auto pt-2">
                 <span class="text-xs font-bold text-muted uppercase tracking-wider">{deck.cards.length} Cards</span>
                 <div class="w-1/2 bg-border-subtle h-1.5 rounded-full overflow-hidden">
                   <div class="bg-primary h-full rounded-full" style="width: {Math.random() * 100}%"></div>
                 </div>
               </div>
             </div>
           {/each}
         </div>
      </section>
    </div>

    <!-- Right Column (Stats panel) -->
    <div class="lg:col-span-1 flex flex-col gap-6 stagger-3 animate-fade-up" style="animation-fill-mode: both;">
      <h2 class="text-lg font-bold text-muted uppercase tracking-wider">Your Progress</h2>
      <DailyGoal />
      <GlobalRanking />
    </div>

  </div>
</div>
