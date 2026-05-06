<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import { Trophy, Flame } from 'lucide-svelte';
  import { statsStore } from '$lib/stores/stats.svelte';
</script>

<div class="grid grid-cols-2 gap-4">
  <Card class="flex flex-col items-center justify-center p-5 relative overflow-hidden">
    <div class="absolute -right-4 -top-4 w-16 h-16 bg-orange-50 rounded-full opacity-50"></div>
    <Flame size={28} class="text-orange-500 mb-2" strokeWidth={2.5} />
    <span class="text-2xl font-bold text-text-dark">{statsStore.streak}</span>
    <span class="text-[11px] font-bold text-muted uppercase tracking-wider mt-1">Day Streak</span>
  </Card>

  <Card class="flex flex-col items-center justify-center p-5 relative overflow-hidden bg-primary text-white border-0">
    <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full"></div>
    <Trophy size={28} class="text-yellow-300 mb-2" strokeWidth={2.5} />
    <span class="text-2xl font-bold">Top 5%</span>
    <span class="text-[11px] font-bold text-white/80 uppercase tracking-wider mt-1">Global Rank</span>
  </Card>
</div>
