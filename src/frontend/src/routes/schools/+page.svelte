<script lang="ts">
	import KPICard from '$lib/components/ui/KPICard.svelte';
	import PageHeader from '$lib/components/ui/PageHeader.svelte';
	import StatusBadge from '$lib/components/ui/StatusBadge.svelte';
	import { schoolStore } from '$lib/stores/school.svelte';
	import {
		Building2,
		CheckCircle2,
		AlertTriangle,
		TrendingUp,
		Search,
		MoreHorizontal,
		MapPin,
		Sparkles
	} from 'lucide-svelte';

	const totalCount = 2847;
	const activeCount = schoolStore.schools.filter((s) => s.status === 'Active').length;

	const planColors: Record<string, string> = {
		Enterprise: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
		Professional: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
		Basic: 'bg-muted text-muted-foreground border-border'
	};
</script>

<div class="space-y-6">
	<PageHeader
		title="Schools Management"
		description="Central dashboard for all registered schools across India"
	>
		{#snippet actions()}
			<button
				class="rounded-md border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
			>
				Export CSV
			</button>
			<button
				class="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
			>
				<Building2 class="h-3.5 w-3.5" />
				Add School
			</button>
		{/snippet}
	</PageHeader>

	<!-- KPI Row -->
	<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
		<KPICard
			title="Total Schools"
			value={totalCount.toLocaleString('en-IN')}
			subtitle="Across 28 states"
			icon={Building2}
			color="blue"
			change={12.5}
			changeType="up"
		/>
		<KPICard
			title="Active"
			value={activeCount.toLocaleString('en-IN')}
			subtitle="{Math.round((activeCount / schoolStore.schools.length) * 100)}% of registered"
			icon={CheckCircle2}
			color="emerald"
			change={3.2}
			changeType="up"
		/>
		<KPICard
			title="Expiring (30 days)"
			value="134"
			subtitle="Renewal action needed"
			icon={AlertTriangle}
			color="amber"
			change={8}
			changeType="down"
		/>
		<KPICard
			title="New This Month"
			value="47"
			subtitle="April 2026"
			icon={TrendingUp}
			color="violet"
			change={18}
			changeType="up"
		/>
	</div>

	<!-- Main Content Area -->
	<div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
		<!-- Table Column -->
		<div class="flex flex-col gap-4 lg:col-span-2">
			<!-- Filter Bar -->
			<div class="glass flex flex-wrap items-center gap-3 rounded-xl border border-border/30 px-4 py-3">
				<div class="relative max-w-xs flex-1 min-w-[180px]">
					<Search class="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
					<input
						placeholder="Search school, district…"
						bind:value={schoolStore.filters.search}
						class="h-8 w-full rounded-md border border-input/50 bg-muted/50 pl-8 text-xs focus:bg-background"
					/>
				</div>
				<div class="ml-auto text-xs text-muted-foreground">
					{schoolStore.filteredSchools.length} of {schoolStore.schools.length} schools
				</div>
			</div>

			<!-- Table Content -->
			<div class="glass overflow-hidden rounded-xl border border-border/30">
				<div class="overflow-x-auto">
					<table class="w-full text-left text-sm">
						<thead>
							<tr class="border-b border-border/30 bg-muted/30">
								<th class="px-4 py-3 font-medium text-muted-foreground">School Name</th>
								<th class="px-4 py-3 font-medium text-muted-foreground">State</th>
								<th class="px-4 py-3 font-medium text-muted-foreground">Plan</th>
								<th class="px-4 py-3 font-medium text-muted-foreground">Status</th>
								<th class="px-4 py-3 font-medium text-muted-foreground"></th>
							</tr>
						</thead>
						<tbody class="divide-y divide-border/20">
							{#each schoolStore.filteredSchools.slice(0, 10) as school}
								<tr class="transition-colors hover:bg-muted/10">
									<td class="px-4 py-3">
										<div class="flex flex-col">
											<span class="font-semibold text-foreground">{school.name}</span>
											<span class="text-[10px] text-muted-foreground">{school.district}</span>
										</div>
									</td>
									<td class="px-4 py-3 text-xs">{school.state}</td>
									<td class="px-4 py-3">
										<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-medium {planColors[school.subscriptionPlan]}">
											{#if school.subscriptionPlan === 'Enterprise'}
												<Sparkles class="h-2.5 w-2.5" />
											{/if}
											{school.subscriptionPlan}
										</span>
									</td>
									<td class="px-4 py-3">
										<StatusBadge status={school.status} />
									</td>
									<td class="px-4 py-3">
										<button class="text-muted-foreground hover:text-foreground">
											<MoreHorizontal class="h-4 w-4" />
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<!-- State Distribution Side Card (Simplified) -->
		<div class="glass flex flex-col rounded-xl border border-border/30 p-5">
			<h3 class="text-sm font-semibold text-foreground mb-4">State Distribution</h3>
			<div class="space-y-4">
				{#each schoolStore.schools.slice(0, 8) as s}
					<div class="flex flex-col gap-1">
						<div class="flex justify-between text-[11px]">
							<span>{s.state}</span>
							<span class="text-muted-foreground">{s.studentCount.toLocaleString('en-IN')} students</span>
						</div>
						<div class="h-1 w-full rounded-full bg-muted/50 overflow-hidden">
							<div class="h-full bg-accent" style:width="{Math.random() * 100}%"></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
