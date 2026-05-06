<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import { statsStore } from '$lib/stores/stats.svelte';

  const maxCount = $derived(Math.max(...statsStore.weeklyVelocity.map(d => d.count), 1));
</script>

<Card class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <h2 class="text-lg font-bold text-text-dark tracking-tight">Weekly Velocity</h2>
    <span class="text-sm font-bold text-primary bg-lavender px-3 py-1 rounded-full">{statsStore.cardsMastered} Total</span>
  </div>

  <div class="flex items-end justify-between h-32 mt-2 gap-2">
    {#each statsStore.weeklyVelocity as day, i}
      {@const height = (day.count / maxCount) * 100}
      {@const isToday = i === 4} <!-- Mocking 'Fri' as today for demonstration -->
      
      <div class="flex flex-col items-center gap-2 flex-1 group">
        <div class="w-full relative flex justify-center h-full items-end">
          <div 
            class="w-full max-w-[24px] rounded-t-md transition-all duration-500 ease-out {isToday ? 'bg-primary' : 'bg-border-subtle group-hover:bg-accent/50'}"
            style="height: {height}%"
          ></div>
        </div>
        <span class="text-xs font-bold {isToday ? 'text-text-dark' : 'text-muted'}">{day.day}</span>
      </div>
    {/each}
  </div>
</Card>
