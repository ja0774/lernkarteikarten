<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { Settings, Bell, Shield, LogOut, ChevronRight } from 'lucide-svelte';
</script>

<div class="px-6 py-10 lg:py-12 flex flex-col max-w-5xl gap-8 animate-fade-up mx-auto w-full">
  
  <header>
    <h1 class="text-3xl md:text-4xl font-bold text-text-dark tracking-tight">Account Settings</h1>
    <p class="text-lg md:text-xl text-muted font-medium mt-1">Manage your profile and preferences.</p>
  </header>

  <div class="flex flex-col md:flex-row gap-8 lg:gap-16">
    <!-- Left Sidebar Menu -->
    <div class="w-full md:w-64 flex flex-col gap-2 stagger-1 animate-fade-up" style="animation-fill-mode: both;">
      <button class="w-full flex items-center gap-3 p-3 rounded-xl bg-lavender text-primary font-bold transition-colors text-left">
        <Settings size={20} strokeWidth={2.5} />
        <span>General</span>
      </button>
      <button class="w-full flex items-center gap-3 p-3 rounded-xl text-muted hover:bg-gray-50 hover:text-text-dark font-medium transition-colors text-left">
        <Bell size={20} />
        <span>Notifications</span>
      </button>
      <button class="w-full flex items-center gap-3 p-3 rounded-xl text-muted hover:bg-gray-50 hover:text-text-dark font-medium transition-colors text-left">
        <Shield size={20} />
        <span>Privacy</span>
      </button>
      
      <div class="h-px bg-border-subtle my-2"></div>
      
      <button class="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-colors text-left">
        <LogOut size={20} />
        <span>Log Out</span>
      </button>
    </div>

    <!-- Right Content Area -->
    <div class="flex-1 flex flex-col gap-8 stagger-2 animate-fade-up" style="animation-fill-mode: both;">
      <!-- Profile Info -->
      <section>
        <h2 class="text-xl font-bold text-text-dark mb-4">Your Profile</h2>
        <Card class="p-6">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-accent shadow-soft border-4 border-white flex items-center justify-center text-white font-bold text-3xl shrink-0">
              JL
            </div>
            <div class="flex flex-col items-center sm:items-start flex-1 w-full">
              <h3 class="text-2xl font-bold text-text-dark tracking-tight">Jana Lindtner</h3>
              <p class="text-muted font-medium mb-4">jana.lindtner@student.uni.edu</p>
              
              <div class="flex items-center gap-3 w-full sm:w-auto">
                <span class="text-primary font-bold text-sm bg-lavender px-4 py-2 rounded-full">Pro Member</span>
                <Button variant="secondary" class="ml-auto sm:ml-0">Edit Profile</Button>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  </div>

</div>
