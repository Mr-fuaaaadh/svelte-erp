<script lang="ts">
	import { appStore } from '$lib/stores/app.svelte';
	import { cn } from '$lib/utils';
	import {
		Bell,
		ChevronDown,
		LogOut,
		Menu,
		Moon,
		Search,
		Settings,
		Sun,
		User
	} from 'lucide-svelte';

	let { title = '' } = $props();

	const roles = [
		{ value: 'super_admin', label: 'Super Admin' },
		{ value: 'school_admin', label: 'School Admin' },
		{ value: 'teacher', label: 'Teacher' },
		{ value: 'parent', label: 'Parent' },
		{ value: 'student', label: 'Student' }
	];

	// For now, hardcode some state
	const currentRole = 'super_admin';
	const currentRoleLabel = roles.find((r) => r.value === currentRole)?.label ?? 'Super Admin';
	const unreadCount = 3;
</script>

<header
	class="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-4 shadow-xs"
>
	<!-- Left -->
	<div class="flex items-center gap-2 min-w-0">
		<button
			type="button"
			onclick={() => appStore.toggleSidebar()}
			class="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
			aria-label="Toggle sidebar"
		>
			<Menu class="h-4 w-4" />
		</button>
		{#if title}
			<h1 class="hidden truncate text-sm font-semibold text-foreground md:block">
				{title}
			</h1>
		{/if}
	</div>

	<!-- Search -->
	<div class="mx-auto max-w-sm flex-1">
		<div class="relative">
			<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<input
				placeholder="Search schools, students, leads…"
				class="h-8 w-full rounded-md border border-input/50 bg-muted/50 pl-9 text-sm focus:bg-background"
			/>
			<kbd
				class="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded bg-muted px-1 text-[10px] text-muted-foreground sm:flex"
			>
				⌘K
			</kbd>
		</div>
	</div>

	<!-- Right actions -->
	<div class="flex shrink-0 items-center gap-1">
		<!-- Role switcher -->
		<button
			type="button"
			class="hidden h-8 items-center gap-1 rounded-md border border-input/50 px-3 text-xs md:flex hover:bg-muted"
		>
			{currentRoleLabel}
			<ChevronDown class="h-3 w-3" />
		</button>

		<!-- Dark mode -->
		<button
			type="button"
			onclick={() => appStore.toggleDarkMode()}
			class="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
			aria-label="Toggle dark mode"
		>
			{#if appStore.isDarkMode}
				<Sun class="h-4 w-4" />
			{:else}
				<Moon class="h-4 w-4" />
			{/if}
		</button>

		<!-- Notifications -->
		<button
			type="button"
			class="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
			aria-label="Notifications"
		>
			<Bell class="h-4 w-4" />
			{#if unreadCount > 0}
				<span
					class="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground"
				>
					{unreadCount}
				</span>
			{/if}
		</button>

		<!-- User menu -->
		<button
			type="button"
			class="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
			aria-label="User menu"
		>
			<div class="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
				SP
			</div>
		</button>
	</div>
</header>
