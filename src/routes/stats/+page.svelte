<script lang="ts">
  import RetentionCard from '$lib/components/stats/RetentionCard.svelte';
  import WeeklyVelocity from '$lib/components/stats/WeeklyVelocity.svelte';
  import { statsStore } from '$lib/stores/stats.svelte';
</script>

<div class="px-6 py-10 lg:py-12 flex flex-col gap-8 animate-fade-up">
  
  <header>
    <h1 class="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">Your Stats</h1>
    <p class="text-lg md:text-xl text-muted font-medium mt-1">Consistency is key.</p>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Momentum Score (Top Priority) -->
    <div class="lg:col-span-1 stagger-1 animate-fade-up h-full" style="animation-fill-mode: both;">
      <div class="bg-primary text-white rounded-[32px] p-8 shadow-floating flex flex-col items-center justify-center text-center h-full">
        <span class="text-sm font-bold text-white/80 uppercase tracking-widest mb-3">Momentum Score</span>
        <div class="text-6xl font-extrabold tracking-tight mb-2">{statsStore.momentumScore}</div>
        <p class="text-sm text-white/90 font-medium bg-white/20 px-4 py-1.5 rounded-full">Top 5% of all learners</p>
      </div>
    </div>

    <!-- Retention -->
    <div class="lg:col-span-1 stagger-2 animate-fade-up h-full" style="animation-fill-mode: both;">
      <RetentionCard />
    </div>

    <!-- Weekly Velocity -->
    <div class="md:col-span-2 lg:col-span-1 stagger-3 animate-fade-up h-full" style="animation-fill-mode: both;">
      <WeeklyVelocity />
    </div>
  </div>

</div>
