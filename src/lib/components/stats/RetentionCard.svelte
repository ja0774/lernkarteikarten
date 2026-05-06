<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import ProgressRing from '$lib/components/ui/ProgressRing.svelte';
  import { statsStore } from '$lib/stores/stats.svelte';
</script>

<Card class="flex items-center gap-6 bg-gradient-to-br from-surface to-lavender/30 border-0">
  <div class="flex-1">
    <h2 class="text-lg font-bold text-text-dark mb-1 tracking-tight">Retention Rate</h2>
    <p class="text-sm text-muted font-medium">Your long-term memory score based on recent performance.</p>
  </div>
  <div class="flex-shrink-0">
    <!-- Using a slightly different style for the retention ring -->
    <ProgressRing percentage={statsStore.accuracy} size={80} strokeWidth={8} />
  </div>
</Card>
