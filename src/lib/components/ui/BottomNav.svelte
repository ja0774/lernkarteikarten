<script lang="ts">
  import { Home, BookOpen, BarChart3, User } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { base } from '$app/paths';

  const navItems = [
    { id: 'dashboard', path: base || '/', icon: Home },
    { id: 'library', path: `${base}/library`, icon: BookOpen },
    { id: 'stats', path: `${base}/stats`, icon: BarChart3 },
    { id: 'profile', path: `${base}/profile`, icon: User }
  ];

  let currentPath = $derived($page.url.pathname);
</script>

<div class="absolute bottom-6 left-0 right-0 px-6 z-50 pointer-events-none">
  <nav class="bg-surface/90 backdrop-blur-md shadow-floating rounded-full px-2 py-2 flex justify-between items-center border border-white/50 pointer-events-auto">
    {#each navItems as item}
      {@const isActive = currentPath === item.path || (item.path !== (base || '/') && currentPath.startsWith(item.path))}
      <a 
        href={item.path}
        class="relative p-3 flex-1 flex justify-center items-center rounded-full transition-all duration-300 group"
        aria-label={item.id}
      >
        {#if isActive}
          <!-- Active Bubble Background -->
          <div class="absolute inset-0 bg-lavender rounded-full scale-100 transition-transform duration-300"></div>
        {/if}
        
        <div class="relative z-10 transition-transform duration-300 {isActive ? 'scale-110 text-primary' : 'text-muted group-hover:text-text-dark group-active:scale-95'}">
          <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
        </div>
      </a>
    {/each}
  </nav>
</div>
