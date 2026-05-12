<script lang="ts">
	import '@fontsource/plus-jakarta-sans/500.css';
	import '@fontsource/plus-jakarta-sans/600.css';
	import '@fontsource/plus-jakarta-sans/700.css';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import BottomNav from '$lib/components/ui/BottomNav.svelte';
	import Sidebar from '$lib/components/ui/Sidebar.svelte';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth.svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	let { children } = $props();

	$effect(() => {
		const isLoginPage = $page.url.pathname.includes('/login');
		if (!authStore.isLoading && !authStore.user && !isLoginPage) {
			goto(`${base}/login`);
		}
	});

	const hideNav = $derived($page.url.pathname.startsWith('/study') || $page.url.pathname.includes('/login'));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
	<title>Lumina</title>
</svelte:head>

<div class="h-[100dvh] w-full bg-background flex overflow-hidden">
	{#if authStore.isLoading}
		<div class="absolute inset-0 z-[1000] bg-background flex items-center justify-center">
			<div class="flex flex-col items-center gap-4">
				<div class="w-12 h-12 rounded-xl bg-primary animate-pulse"></div>
				<p class="text-muted font-bold animate-pulse">Lumina is loading...</p>
			</div>
		</div>
	{/if}

	<!-- Desktop Sidebar -->
	{#if !hideNav}
		<Sidebar />
	{/if}

	<!-- Main Content Area -->
	<div class="flex-1 flex flex-col relative w-full h-full overflow-hidden">
		<!-- Content -->
		<main class="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar {hideNav ? '' : 'pb-24 md:pb-0'}">
			<div class="w-full max-w-7xl mx-auto">
				{@render children()}
			</div>
		</main>

		<!-- Mobile Bottom Navigation -->
		{#if !hideNav}
			<div class="md:hidden block">
				<BottomNav />
			</div>
		{/if}
	</div>
</div>
