<script lang="ts">
  import { Home, BookOpen, BarChart3, User, LogOut, Settings } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { authStore } from '$lib/stores/auth.svelte';

  const navItems = [
    { id: 'dashboard', path: base || '/', icon: Home, label: 'Dashboard' },
    { id: 'library', path: `${base}/library`, icon: BookOpen, label: 'Library' },
    { id: 'stats', path: `${base}/stats`, icon: BarChart3, label: 'Statistics' },
  ];

  let currentPath = $derived($page.url.pathname);
  
  async function handleLogout() {
    await authStore.signOut();
    window.location.href = `${base}/login`;
  }
</script>

<aside class="w-64 bg-surface border-r border-border-subtle h-full flex-col hidden md:flex">
  <!-- Logo Area -->
  <div class="h-20 flex items-center px-6 border-b border-border-subtle/50">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-soft">
        L
      </div>
      <span class="font-bold text-xl tracking-tight text-text-dark">Lumina</span>
    </div>
  </div>

  <!-- Navigation Links -->
  <nav class="flex-1 px-4 py-6 flex flex-col gap-2">
    <div class="text-xs font-bold text-muted uppercase tracking-wider px-2 mb-2">Menu</div>
    {#each navItems as item}
      {@const isActive = currentPath === item.path || (item.path !== (base || '/') && currentPath.startsWith(item.path))}
      <a 
        href={item.path}
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden {isActive ? 'bg-lavender text-primary font-bold' : 'text-muted hover:bg-gray-50 hover:text-text-dark font-medium'}"
      >
        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} class="relative z-10" />
        <span class="relative z-10">{item.label}</span>
      </a>
    {/each}
  </nav>

  <!-- User Profile & Settings Area at Bottom -->
  <div class="p-4 border-t border-border-subtle/50">
    <div class="flex flex-col gap-2">
      <a href="{base}/profile" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer {currentPath.startsWith(`${base}/profile`) ? 'bg-lavender text-primary' : 'text-text-dark'}">
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent text-white flex items-center justify-center text-xs font-bold shadow-sm">
          {authStore.user?.email?.[0].toUpperCase() ?? 'J'}
        </div>
        <div class="flex flex-col overflow-hidden">
          <span class="text-sm font-bold leading-tight truncate">{authStore.user?.email?.split('@')[0] ?? 'User'}</span>
          <span class="text-[10px] text-muted font-bold leading-tight truncate">{authStore.user?.email ?? 'Free Tier'}</span>
        </div>
      </a>
      <button class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted hover:bg-gray-50 hover:text-text-dark transition-colors font-medium">
        <Settings size={18} strokeWidth={2} />
        <span class="text-sm">Settings</span>
      </button>
      <button class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors font-medium" onclick={handleLogout}>
        <LogOut size={18} strokeWidth={2} />
        <span class="text-sm">Log out</span>
      </button>
    </div>
  </div>
</aside>
