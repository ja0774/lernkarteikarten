<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import ProgressRing from '$lib/components/ui/ProgressRing.svelte';
  import { statsStore, getDailyGoalPercentage } from '$lib/stores/stats.svelte';

  const dailyGoalPercentage = $derived(getDailyGoalPercentage());
</script>

<Card class="flex items-center gap-6">
  <div class="flex-shrink-0">
    <ProgressRing percentage={dailyGoalPercentage} size={90} strokeWidth={8} text="GOAL" />
  </div>
  <div class="flex-1">
    <h2 class="text-lg font-bold text-text-dark mb-1 tracking-tight">Today's Goal</h2>
    <p class="text-muted text-sm font-medium leading-snug">
      You've mastered <span class="text-primary font-bold">{statsStore.dailyGoal.current}</span> out of {statsStore.dailyGoal.target} cards today. Keep it up!
    </p>
  </div>
</Card>
