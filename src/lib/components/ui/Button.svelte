<script lang="ts">
  import type { Snippet } from 'svelte';
  
  let { 
    children, 
    variant = 'primary', 
    size = 'md',
    class: className = '',
    onclick,
    ...rest 
  }: { 
    children: Snippet; 
    variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    class?: string;
    onclick?: (e: MouseEvent) => void;
    [key: string]: any;
  } = $props();

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 active:scale-95';
  
  const variants = {
    primary: 'bg-primary text-white shadow-soft hover:bg-primary/90',
    secondary: 'bg-lavender text-primary hover:bg-lavender/80',
    ghost: 'bg-transparent text-muted hover:bg-gray-100 hover:text-text-dark',
    icon: 'bg-white shadow-card text-text-dark hover:bg-gray-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    icon: 'p-3'
  };
</script>

<button 
  class="{baseStyles} {variants[variant]} {sizes[size]} {className}"
  {onclick}
  {...rest}
>
  {@render children()}
</button>
