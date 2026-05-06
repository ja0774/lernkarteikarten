<script lang="ts">
	import '@fontsource/plus-jakarta-sans/500.css';
	import '@fontsource/plus-jakarta-sans/600.css';
	import '@fontsource/plus-jakarta-sans/700.css';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import BottomNav from '$lib/components/ui/BottomNav.svelte';
	import Sidebar from '$lib/components/ui/Sidebar.svelte';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
	<title>Lumina</title>
</svelte:head>

<div class="h-[100dvh] w-full bg-background flex overflow-hidden">
	<!-- Desktop Sidebar -->
	{#if !$page.url.pathname.startsWith('/study')}
		<Sidebar />
	{/if}

	<!-- Main Content Area -->
	<div class="flex-1 flex flex-col relative w-full h-full overflow-hidden">
		<!-- Content -->
		<main class="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar {$page.url.pathname.startsWith('/study') ? '' : 'pb-24 md:pb-0'}">
			<div class="w-full max-w-7xl mx-auto">
				{@render children()}
			</div>
		</main>

		<!-- Mobile Bottom Navigation -->
		{#if !$page.url.pathname.startsWith('/study')}
			<div class="md:hidden block">
				<BottomNav />
			</div>
		{/if}
	</div>
</div>
