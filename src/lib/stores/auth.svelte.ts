import { supabase } from '$lib/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

class AuthStore {
  user = $state<User | null>(null);
  session = $state<Session | null>(null);
  isLoading = $state(true);

  constructor() {
    this.init();
  }

  async init() {
    // Get initial session
    const { data } = await supabase.auth.getSession();
    this.session = data.session;
    this.user = data.session?.user ?? null;
    this.isLoading = false;

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      this.session = session;
      this.user = session?.user ?? null;
    });
  }

  async signOut() {
    await supabase.auth.signOut();
  }
}

export const authStore = new AuthStore();
