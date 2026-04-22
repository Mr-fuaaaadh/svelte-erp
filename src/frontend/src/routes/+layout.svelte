<script lang="ts">
	import { appStore } from '$lib/stores/app.svelte';
	import { cn } from '$lib/utils';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import './layout.css';

	let { children } = $props();

	$effect(() => {
		if (appStore.isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
</script>

<div class="flex h-screen overflow-hidden bg-background text-foreground">
	<Sidebar />
	<div class="flex flex-1 flex-col overflow-hidden transition-all duration-300">
		<Navbar title="AIPSA ERP" />
		<main class="flex-1 overflow-y-auto bg-background p-6">
			<div class="mx-auto max-w-[1600px]">
				{@render children()}
			</div>
		</main>
	</div>
</div>
