<script lang="ts">
	import KPICard from '$lib/components/ui/KPICard.svelte';
	import StatusBadge from '$lib/components/ui/StatusBadge.svelte';
	import {
		mockDashboardStats,
		mockLeads,
		mockMonthlyRevenue,
		mockNotifications,
		mockStateStats
	} from '$lib/data/mockData';
	import {
		AlertCircle,
		AlertTriangle,
		Bell,
		BellOff,
		CalendarClock,
		CheckCircle2,
		CreditCard,
		ExternalLink,
		Headphones,
		IndianRupee,
		Info,
		School,
		TrendingUp,
		UserPlus
	} from 'lucide-svelte';

	const stats = mockDashboardStats;
	const recentNotifs = mockNotifications.slice(0, 5);
	const recentLeads = mockLeads.slice(0, 5);

	const mockSupportTickets = [
		{
			id: 't1',
			title: 'Login issue after password reset',
			school: 'Scindia School, Gwalior',
			priority: 'High',
			status: 'Open',
			opened: '2026-04-21'
		},
		{
			id: 't2',
			title: 'Fee collection module not loading',
			school: 'DAV Public School, Kolkata',
			priority: 'High',
			status: 'In Progress',
			opened: '2026-04-20'
		},
		{
			id: 't3',
			title: 'Timetable export producing blank PDF',
			school: 'Ryan International School, Pune',
			priority: 'Medium',
			status: 'Open',
			opened: '2026-04-19'
		},
		{
			id: 't4',
			title: 'Bulk student import CSV error',
			school: 'Amity International School, Lucknow',
			priority: 'Medium',
			status: 'Open',
			opened: '2026-04-18'
		},
		{
			id: 't5',
			title: 'Parent app notifications delayed',
			school: 'G.D. Goenka Public School, Gurugram',
			priority: 'Low',
			status: 'Open',
			opened: '2026-04-17'
		}
	];

	const priorityConfig: Record<string, any> = {
		High: {
			dot: 'bg-rose-400',
			text: 'text-rose-400',
			badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
		},
		Medium: {
			dot: 'bg-amber-400',
			text: 'text-amber-400',
			badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
		},
		Low: {
			dot: 'bg-emerald-400',
			text: 'text-emerald-400',
			badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
		}
	};

	const maxSchools = Math.max(...mockStateStats.map((s) => s.schools));

	const quickStats = [
		{
			label: 'New Schools This Month',
			value: '47',
			icon: School,
			color: 'text-blue-400',
			bg: 'bg-blue-500/10'
		},
		{
			label: 'Demos Scheduled',
			value: '23',
			icon: CalendarClock,
			color: 'text-cyan-400',
			bg: 'bg-cyan-500/10'
		},
		{
			label: 'Renewals Due (30d)',
			value: '18',
			icon: TrendingUp,
			color: 'text-amber-400',
			bg: 'bg-amber-500/10'
		},
		{
			label: 'Avg Revenue / School',
			value: '₹20,200',
			icon: IndianRupee,
			color: 'text-emerald-400',
			bg: 'bg-emerald-500/10'
		}
	];

	function getRelativeTime(timestamp: string): string {
		const now = new Date('2026-04-22T10:00:00');
		const then = new Date(timestamp);
		const diffMs = now.getTime() - then.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		if (diffMins < 60) return `${diffMins} min ago`;
		const diffHours = Math.floor(diffMins / 60);
		if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
		const diffDays = Math.floor(diffHours / 24);
		return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
	}
</script>

<div class="space-y-6 animate-in fade-in duration-500">
	<!-- Greeting Header -->
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="font-display text-2xl font-bold leading-tight text-foreground">
				Good morning, Rajesh Kumar 👋
			</h1>
			<p class="mt-1 text-sm text-muted-foreground">Here's what's happening with AIPSA today.</p>
		</div>
		<div class="flex shrink-0 gap-2">
			<button
				type="button"
				class="rounded-md border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
			>
				Export Report
			</button>
			<button
				type="button"
				class="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
			>
				+ Add School
			</button>
		</div>
	</div>

	<!-- KPI Tiles -->
	<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
		<KPICard
			title="Total Schools"
			value="2,847"
			change={stats.schoolGrowth}
			changeType="up"
			icon={School}
			color="blue"
			subtitle="Across 28 states"
		/>
		<KPICard
			title="Active Subscriptions"
			value="2,413"
			change={5.9}
			changeType="up"
			icon={CreditCard}
			color="emerald"
			subtitle="Enterprise + Pro + Basic"
		/>
		<KPICard
			title="Monthly Revenue"
			value="₹48.5L"
			change={stats.revenueGrowth}
			changeType="up"
			icon={IndianRupee}
			color="violet"
			subtitle="April 2026"
		/>
		<KPICard
			title="Support Tickets"
			value="23 open"
			change={14.3}
			changeType="down"
			icon={Headphones}
			color="amber"
			subtitle="Pending resolution"
		/>
	</div>

	<!-- Charts and Stats -->
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
		<!-- Revenue Placeholder -->
		<div class="glass flex h-64 flex-col rounded-xl border border-border/30 p-5 lg:col-span-2">
			<div class="flex items-center justify-between mb-4">
				<div>
					<h3 class="text-sm font-semibold text-foreground">Revenue Overview — FY 2024-25</h3>
					<p class="mt-0.5 text-[11px] text-muted-foreground">Monthly recurring revenue in ₹ Lakhs</p>
				</div>
				<span class="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
					↑ {stats.revenueGrowth}% YoY
				</span>
			</div>
			<div class="flex-1 flex items-center justify-center border border-dashed border-border/30 rounded-lg bg-muted/5">
				<p class="text-xs text-muted-foreground">Chart Implementation Pending</p>
			</div>
		</div>

		<!-- State Distribution -->
		<div class="glass flex flex-col rounded-xl border border-border/30">
			<div class="p-4 pb-2">
				<h3 class="text-sm font-semibold text-foreground">State-wise Distribution</h3>
				<p class="text-[11px] text-muted-foreground">Top 10 states by school count</p>
			</div>
			<div class="divide-y divide-border/30">
				{#each mockStateStats.slice(0, 10) as s}
					{@const pct = Math.round((s.schools / maxSchools) * 100)}
					{@const subPct = Math.round((s.schools / stats.totalSchools) * 100 * 10) / 10}
					<div class="flex flex-col gap-1 px-4 py-2.5">
						<div class="flex items-center justify-between text-xs">
							<span class="truncate font-medium text-foreground">{s.state}</span>
							<span class="ml-2 shrink-0 text-muted-foreground">{s.schools} sch · {subPct}%</span>
						</div>
						<div class="h-1.5 w-full rounded-full bg-muted/50">
							<div
								class="h-full rounded-full bg-gradient-to-r from-blue-500 to-accent transition-all duration-700"
								style:width="{pct}%"
							></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Notifications, Leads, Support -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<!-- Notifications -->
		<div class="glass flex flex-col rounded-xl border border-border/30">
			<div class="flex flex-row items-center justify-between p-4 pb-2">
				<div class="flex items-center gap-2">
					<Bell class="h-4 w-4 text-accent" />
					<h3 class="text-sm font-semibold">Notifications</h3>
				</div>
				<button type="button" class="text-[11px] text-muted-foreground hover:text-foreground">Mark all read</button>
			</div>
			<div class="divide-y divide-border/30 overflow-hidden">
				{#each recentNotifs as n}
					<div class="flex gap-3 px-4 py-3 transition-colors hover:bg-muted/10">
						<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 ring-accent/20 bg-accent/10">
							{#if n.type === 'success'}
								<CheckCircle2 class="h-4 w-4 text-emerald-400" />
							{:else if n.type === 'warning'}
								<AlertTriangle class="h-4 w-4 text-amber-400" />
							{:else}
								<Info class="h-4 w-4 text-blue-400" />
							{/if}
						</div>
						<div class="min-w-0 flex-1">
							<p class="truncate text-[12px] font-semibold leading-tight text-foreground">{n.title}</p>
							<p class="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">{n.message}</p>
							<p class="mt-1 text-[10px] text-muted-foreground/60">{getRelativeTime(n.timestamp)}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Leads -->
		<div class="glass flex flex-col rounded-xl border border-border/30">
			<div class="flex flex-row items-center justify-between p-4 pb-2">
				<div class="flex items-center gap-2">
					<UserPlus class="h-4 w-4 text-cyan-400" />
					<h3 class="text-sm font-semibold">New Leads This Week</h3>
				</div>
				<a href="/crm" class="flex items-center gap-1 text-[11px] text-accent">
					View CRM <ExternalLink class="h-3 w-3" />
				</a>
			</div>
			<div class="divide-y divide-border/30">
				{#each recentLeads as lead}
					<div class="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/10">
						<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 ring-cyan-500/20 bg-cyan-500/10">
							<School class="h-3.5 w-3.5 text-cyan-400" />
						</div>
						<div class="min-w-0 flex-1">
							<p class="truncate text-[12px] font-semibold leading-tight text-foreground">{lead.schoolName}</p>
							<p class="mt-0.5 text-[11px] text-muted-foreground">{lead.state} · {lead.assignedTo}</p>
							<div class="mt-1">
								<StatusBadge status={lead.stage} />
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Support -->
		<div class="glass flex flex-col rounded-xl border border-border/30">
			<div class="flex flex-row items-center justify-between p-4 pb-2">
				<div class="flex items-center gap-2">
					<Headphones class="h-4 w-4 text-amber-400" />
					<h3 class="text-sm font-semibold">Support Tickets</h3>
				</div>
				<a href="/settings" class="flex items-center gap-1 text-[11px] text-accent">
					Open Support <ExternalLink class="h-3 w-3" />
				</a>
			</div>
			<div class="divide-y divide-border/30">
				{#each mockSupportTickets as ticket}
					{@const p = priorityConfig[ticket.priority]}
					<div class="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/10">
						<div class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full {p.dot}"></div>
						<div class="min-w-0 flex-1">
							<p class="truncate text-[12px] font-semibold leading-tight text-foreground">{ticket.title}</p>
							<p class="mt-0.5 truncate text-[11px] text-muted-foreground">{ticket.school}</p>
							<div class="mt-1 flex items-center gap-2">
								<span class="rounded border px-1.5 py-0.5 text-[10px] font-medium {p.badge}">
									{ticket.priority}
								</span>
								<span class="text-[10px] text-muted-foreground/60">{ticket.opened}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Quick Stats Row -->
	<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
		{#each quickStats as qs}
			<div class="glass flex items-center gap-3 rounded-xl border border-border/30 p-4 transition-transform duration-200 hover:scale-[1.02]">
				<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg {qs.bg}">
					<qs.icon class="h-4 w-4 {qs.color}" />
				</div>
				<div class="min-w-0">
					<p class="font-display text-xl font-bold leading-tight text-foreground">{qs.value}</p>
					<p class="mt-0.5 text-[11px] leading-tight text-muted-foreground">{qs.label}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
