<script lang="ts">
	import { page } from '$app/state';
	import { appStore } from '$lib/stores/app.svelte';
	import { cn } from '$lib/utils';
	import {
		Baby,
		BarChart3,
		BookOpen,
		Building2,
		ChevronLeft,
		ChevronRight,
		DollarSign,
		GraduationCap,
		LayoutDashboard,
		School,
		Settings,
		TrendingUp,
		Users
	} from 'lucide-svelte';

	const navGroups = [
		{
			title: 'Overview',
			items: [
				{
					label: 'Dashboard',
					path: '/dashboard',
					icon: LayoutDashboard,
					roles: ['super_admin', 'school_admin']
				}
			]
		},
		{
			title: 'Management',
			items: [
				{
					label: 'Schools',
					path: '/schools',
					icon: School,
					roles: ['super_admin']
				},
				{
					label: 'Students',
					path: '/students',
					icon: GraduationCap,
					roles: ['super_admin', 'school_admin', 'teacher']
				},
				{
					label: 'Teachers',
					path: '/teachers',
					icon: Users,
					roles: ['super_admin', 'school_admin']
				}
			]
		},
		{
			title: 'Operations',
			items: [
				{ label: 'CRM', path: '/crm', icon: TrendingUp, roles: ['super_admin'] },
				{
					label: 'Finance',
					path: '/finance',
					icon: DollarSign,
					roles: ['super_admin', 'school_admin']
				},
				{
					label: 'Analytics',
					path: '/analytics',
					icon: BarChart3,
					roles: ['super_admin', 'school_admin']
				}
			]
		},
		{
			title: 'Portals',
			items: [
				{
					label: 'Parent Portal',
					path: '/portal/parent',
					icon: Baby,
					roles: ['super_admin', 'school_admin', 'parent']
				},
				{
					label: 'Student Portal',
					path: '/portal/student',
					icon: BookOpen,
					roles: ['super_admin', 'school_admin', 'student', 'teacher']
				}
			]
		},
		{
			title: 'System',
			items: [
				{
					label: 'Settings',
					path: '/settings',
					icon: Settings,
					roles: ['super_admin', 'school_admin']
				}
			]
		}
	];

	// For now, assume super_admin
	const currentRole = 'super_admin';

	const visibleGroups = navGroups
		.map((group) => ({
			...group,
			items: group.items.filter((item) => item.roles.includes(currentRole))
		}))
		.filter((group) => group.items.length > 0);
</script>

<aside
	class={cn(
		'relative z-20 flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out',
		appStore.sidebarCollapsed ? 'w-16' : 'w-64'
	)}
>
	<!-- Logo -->
	<div
		class={cn(
			'flex items-center gap-3 border-b border-sidebar-border px-4 py-5',
			appStore.sidebarCollapsed && 'justify-center px-0'
		)}
	>
		<div
			class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground"
		>
			<Building2 class="h-5 w-5" />
		</div>
		{#if !appStore.sidebarCollapsed}
			<div class="min-w-0">
				<p class="font-display text-sm font-bold leading-tight text-sidebar-foreground">AIPSA ERP</p>
				<p class="truncate text-xs text-muted-foreground">Enterprise Platform</p>
			</div>
		{/if}
	</div>

	<!-- Nav -->
	<nav class="flex-1 space-y-1 overflow-y-auto px-2 py-4">
		{#each visibleGroups as group (group.title)}
			<div class="mb-4">
				{#if !appStore.sidebarCollapsed}
					<p
						class="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
					>
						{group.title}
					</p>
				{/if}
				{#each group.items as item (item.path)}
					{@const isActive = page.url.pathname === item.path || page.url.pathname.startsWith(`${item.path}/`)}
					<a
						href={item.path}
						class={cn(
							'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
							appStore.sidebarCollapsed && 'mx-auto w-10 justify-center px-0',
							isActive
								? 'bg-accent text-accent-foreground shadow-glass-subtle'
								: 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
						)}
					>
						<item.icon class={cn('shrink-0', appStore.sidebarCollapsed ? 'h-5 w-5' : 'h-4 w-4')} />
						{#if !appStore.sidebarCollapsed}
							<span class="truncate">{item.label}</span>
						{/if}
					</a>
				{/each}
			</div>
		{/each}
	</nav>

	<!-- User profile -->
	<div
		class={cn(
			'flex items-center gap-3 border-t border-sidebar-border p-3',
			appStore.sidebarCollapsed && 'justify-center'
		)}
	>
		<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
			SA
		</div>
		{#if !appStore.sidebarCollapsed}
			<div class="min-w-0 flex-1">
				<p class="truncate text-xs font-semibold text-sidebar-foreground">Suresh Prasad</p>
				<div class="mt-0.5 inline-flex h-4 items-center rounded-full border border-border px-1 text-[10px]">
					Super Admin
				</div>
			</div>
		{/if}
	</div>

	<!-- Collapse toggle -->
	<button
		type="button"
		onclick={() => appStore.toggleSidebar()}
		class="absolute -right-3 top-20 z-30 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card shadow-md transition-colors hover:bg-accent"
		aria-label={appStore.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
	>
		{#if appStore.sidebarCollapsed}
			<ChevronRight class="h-3 w-3 text-foreground" />
		{:else}
			<ChevronLeft class="h-3 w-3 text-foreground" />
		{/if}
	</button>
</aside>
