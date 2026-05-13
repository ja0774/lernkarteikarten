<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { authStore } from '$lib/stores/auth.svelte';
  import { base } from '$app/paths';
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { Mail, Key, ArrowRight, Loader2, CheckCircle2 } from 'lucide-svelte';

  let email = $state('');
  let otpCode = $state('');
  let step = $state<'email' | 'otp' | 'success'>('email');
  let isLoading = $state(false);
  let errorMsg = $state<string | null>(null);

  async function handleSendOtp() {
    if (!email) return;
    isLoading = true;
    errorMsg = null;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true
      }
    });

    isLoading = false;
    if (error) {
      errorMsg = error.message;
    } else {
      step = 'otp';
    }
  }

  async function handleVerifyOtp() {
    if (!otpCode || (otpCode.length !== 6 && otpCode.length !== 8)) return;
    isLoading = true;
    errorMsg = null;

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: 'email'
    });

    isLoading = false;
    if (error) {
      errorMsg = error.message;
    } else {
      step = 'success';
      setTimeout(() => {
        window.location.href = base || '/';
      }, 1500);
    }
  }
</script>

<div class="min-h-[100dvh] w-full bg-background flex items-center justify-center p-6 relative overflow-hidden">
  <!-- Decorative background elements -->
  <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
  <div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full"></div>

  <div class="w-full max-w-md animate-fade-up">
    <!-- Logo area -->
    <div class="flex flex-col items-center gap-4 mb-10">
      <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-3xl shadow-soft">
        L
      </div>
      <div class="text-center">
        <h1 class="text-3xl font-bold text-text-dark tracking-tight">Welcome back</h1>
        <p class="text-muted font-medium mt-1">Start your daily study flow</p>
      </div>
    </div>

    <Card class="p-8 backdrop-blur-xl border-white/50 shadow-2xl relative overflow-hidden">
      {#if step === 'email'}
        <div class="space-y-6">
          <div>
            <label for="email" class="text-sm font-bold text-muted uppercase tracking-wider mb-2 block">Email Address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} class="text-muted/60" />
              </div>
              <input 
                id="email"
                type="email" 
                bind:value={email}
                placeholder="name@example.com" 
                class="w-full bg-gray-50/50 border border-border-subtle text-text-dark rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              />
            </div>
            {#if errorMsg}
              <p class="text-red-500 text-xs font-bold mt-2 ml-1">{errorMsg}</p>
            {/if}
          </div>

          <Button variant="primary" class="w-full py-4" onclick={handleSendOtp} disabled={isLoading || !email}>
            {#if isLoading}
              <Loader2 size={20} class="animate-spin mr-2" />
              <span>Sending code...</span>
            {:else}
              <span>Continue with Email</span>
              <ArrowRight size={18} class="ml-2" />
            {/if}
          </Button>
          
          <p class="text-center text-xs text-muted font-medium">
            We'll send you a 6-digit code to your inbox.
          </p>
        </div>

      {:else}
        <div class="space-y-6">
          <div class="flex flex-col items-center gap-3 mb-2">
            <div class="w-12 h-12 rounded-full bg-lavender flex items-center justify-center text-primary">
              <Key size={24} />
            </div>
            <div class="text-center">
              <h3 class="font-bold text-text-dark text-lg">Check your email</h3>
              <p class="text-sm text-muted font-medium">Sent to {email}</p>
            </div>
          </div>

          <div>
            <label for="otp" class="text-sm font-bold text-muted uppercase tracking-wider mb-2 block">Verification Code</label>
            <input 
              id="otp"
              type="text" 
              maxlength="8"
              bind:value={otpCode}
              placeholder="000 000" 
              class="w-full bg-gray-50/50 border border-border-subtle text-text-dark text-center text-2xl tracking-[0.2em] font-bold rounded-xl py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {#if errorMsg}
              <p class="text-red-500 text-xs font-bold mt-2 text-center">{errorMsg}</p>
            {/if}
          </div>

          <Button variant="primary" class="w-full py-4" onclick={handleVerifyOtp} disabled={isLoading || (otpCode.length !== 6 && otpCode.length !== 8)}>
            {#if isLoading}
              <Loader2 size={20} class="animate-spin mr-2" />
              <span>Verifying...</span>
            {:else if step === 'success'}
              <CheckCircle2 size={20} class="mr-2" />
              <span>Redirecting...</span>
            {:else}
              <span>Verify and Login</span>
            {/if}
          </Button>

          <button class="w-full text-center text-sm font-bold text-muted hover:text-primary transition-colors" onclick={() => step = 'email'}>
            Change email address
          </button>
        </div>
      {/if}
    </Card>

    <div class="mt-8 text-center">
      <p class="text-sm text-muted font-medium">
        Lumina Platform &copy; 2026. Premium EdTech.
      </p>
    </div>
  </div>
</div>
