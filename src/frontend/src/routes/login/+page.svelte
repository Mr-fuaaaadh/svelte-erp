<script lang="ts">
	import { fade, slide, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let isLoading = $state(false);
	let isAuthenticated = $state(false);

	function login() {
		isLoading = true;
		// Mock login delay
		setTimeout(() => {
			isLoading = false;
			isAuthenticated = true;
			goto('/dashboard');
		}, 1500);
	}

	onMount(() => {
		if (isAuthenticated) {
			goto('/dashboard');
		}
	});
</script>

<div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
	<!-- Animated gradient orbs (Simplified) -->
	<div class="absolute inset-0 bg-gradient-to-br from-[oklch(0.12_0.02_264)] via-[oklch(0.09_0.01_280)] to-[oklch(0.07_0.005_240)]"></div>
	<div class="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 bg-[oklch(0.45_0.22_258)]"></div>
	<div class="absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full blur-[120px] opacity-15 bg-[oklch(0.4_0.2_280)]"></div>

	<!-- Login card -->
	<div
		in:scale={{ duration: 550, start: 0.97, easing: quintOut }}
		class="relative z-10 w-full max-w-md mx-4"
	>
		<!-- Glassmorphism card -->
		<div class="glass rounded-2xl p-10 shadow-2xl shadow-black/40 border border-white/10">
			<!-- Logo & branding -->
			<div class="flex flex-col items-center gap-5 mb-8">
				<div class="relative" in:scale={{ delay: 150, duration: 450, start: 0.8 }}>
					<!-- Logo shield -->
					<div class="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[oklch(0.45_0.22_258)] to-[oklch(0.35_0.28_280)] shadow-lg shadow-[oklch(0.45_0.22_258)]/30 border border-white/20">
						<svg width="44" height="44" viewBox="0 0 44 44" fill="none">
							<rect x="8" y="20" width="28" height="18" rx="1" fill="white" fill-opacity="0.9" />
							<polygon points="4,22 22,6 40,22" fill="white" fill-opacity="0.7" />
							<rect x="18" y="28" width="8" height="10" rx="1" fill="white" fill-opacity="0.3" />
							<line x1="22" y1="6" x2="22" y2="2" stroke="white" stroke-width="1.5" stroke-opacity="0.8" />
							<polygon points="22,2 30,4 22,6" fill="white" fill-opacity="0.8" />
							<rect x="11" y="24" width="5" height="5" rx="0.5" fill="white" fill-opacity="0.4" />
							<rect x="28" y="24" width="5" height="5" rx="0.5" fill="white" fill-opacity="0.4" />
						</svg>
					</div>
					<!-- Glow ring -->
					<div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-[oklch(0.55_0.22_258)] to-[oklch(0.4_0.28_280)] blur-xl opacity-30 -z-10 scale-110"></div>
				</div>

				<div class="text-center" in:fade={{ delay: 250, duration: 400 }}>
					<h1 class="font-display text-3xl font-bold tracking-tight text-foreground">AIPSA ERP</h1>
					<p class="mt-1.5 text-sm text-muted-foreground leading-snug max-w-xs">
						All India Private School Association<br />
						<span class="text-xs opacity-70">School Management Platform</span>
					</p>
				</div>
			</div>

			<!-- Divider -->
			<div class="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>

			<!-- Sign in section -->
			<div class="flex flex-col gap-4" in:fade={{ delay: 350, duration: 400 }}>
				<p class="text-center text-sm text-muted-foreground">Sign in to access your school management dashboard</p>

				<button
					type="button"
					onclick={login}
					disabled={isLoading || isAuthenticated}
					class="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[oklch(0.55_0.22_258)] to-[oklch(0.48_0.25_275)] hover:from-[oklch(0.62_0.22_258)] hover:to-[oklch(0.55_0.25_275)] text-white font-semibold text-sm tracking-wide shadow-lg shadow-[oklch(0.5_0.22_258)]/30 border border-white/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.65_0.22_258)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
				>
					{#if isLoading}
						<svg class="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
							<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-opacity="0.25" />
							<path d="M8 2A6 6 0 0 1 14 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						</svg>
						<span>Authenticating…</span>
					{:else}
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
							<circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.5" />
							<path d="M9 1C9 1 6 5 6 9C6 13 9 17 9 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							<path d="M9 1C9 1 12 5 12 9C12 13 9 17 9 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							<path d="M1 9H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
						</svg>
						<span>Sign in with Internet Identity</span>
					{/if}
				</button>

				{#if isLoading}
					<p class="text-center text-xs text-muted-foreground" in:fade>Opening Internet Identity window…</p>
				{/if}
			</div>

			<!-- Feature badges -->
			<div class="mt-8 flex flex-wrap justify-center gap-2" in:fade={{ delay: 500, duration: 400 }}>
				{#each ['Multi-School', 'GST Billing', 'Analytics', 'Portals'] as badge}
					<span class="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border/40">{badge}</span>
				{/each}
			</div>
		</div>

		<!-- Footer text -->
		<p class="text-center text-xs text-muted-foreground/60 mt-5 tracking-wide" in:fade={{ delay: 600, duration: 400 }}>
			Powered by Internet Identity • Secure & Password-Free
		</p>
	</div>
</div>
