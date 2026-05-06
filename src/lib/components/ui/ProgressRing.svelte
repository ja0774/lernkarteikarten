<script lang="ts">
  let { 
    percentage = 0, 
    size = 120, 
    strokeWidth = 10,
    text = ''
  } = $props();

  const radius = $derived((size - strokeWidth) / 2);
  const circumference = $derived(radius * 2 * Math.PI);
  const offset = $derived(circumference - (percentage / 100) * circumference);
</script>

<div class="relative flex items-center justify-center" style="width: {size}px; height: {size}px;">
  <!-- Background ring -->
  <svg width={size} height={size} class="rotate-[-90deg]">
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      stroke="var(--color-border-subtle)"
      stroke-width={strokeWidth}
      fill="transparent"
      class="text-[#E9D5FF]"
      style="stroke: currentColor;"
    />
    <!-- Progress ring -->
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      stroke="var(--color-primary)"
      stroke-width={strokeWidth}
      fill="transparent"
      stroke-dasharray={circumference}
      stroke-dashoffset={offset}
      stroke-linecap="round"
      class="transition-all duration-1000 ease-out drop-shadow-md"
    />
  </svg>
  
  {#if text}
    <div class="absolute flex flex-col items-center justify-center font-bold text-primary">
      <span class="text-2xl">{percentage}%</span>
      <span class="text-[10px] tracking-wider uppercase text-muted font-semibold mt-0.5">{text}</span>
    </div>
  {/if}
</div>
