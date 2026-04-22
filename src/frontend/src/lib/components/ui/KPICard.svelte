<script lang="ts">
	import { cn } from '$lib/utils';
	import { Minus, TrendingDown, TrendingUp } from 'lucide-svelte';

	let {
		title,
		value,
		change,
		changeType = 'neutral',
		icon: Icon,
		color = 'blue',
		subtitle
	} = $props();

	const colorMap = {
		blue: {
			icon: 'bg-blue-500/10 text-blue-400',
			glow: 'shadow-[0_0_20px_rgba(59,130,246,0.1)]',
			border: 'border-blue-500/20'
		},
		emerald: {
			icon: 'bg-emerald-500/10 text-emerald-400',
			glow: 'shadow-[0_0_20px_rgba(16,185,129,0.1)]',
			border: 'border-emerald-500/20'
		},
		amber: {
			icon: 'bg-amber-500/10 text-amber-400',
			glow: 'shadow-[0_0_20px_rgba(245,158,11,0.1)]',
			border: 'border-amber-500/20'
		},
		rose: {
			icon: 'bg-rose-500/10 text-rose-400',
			glow: 'shadow-[0_0_20px_rgba(244,63,94,0.1)]',
			border: 'border-rose-500/20'
		},
		violet: {
			icon: 'bg-violet-500/10 text-violet-400',
			glow: 'shadow-[0_0_20px_rgba(139,92,246,0.1)]',
			border: 'border-violet-500/20'
		},
		cyan: {
			icon: 'bg-cyan-500/10 text-cyan-400',
			glow: 'shadow-[0_0_20px_rgba(6,182,212,0.1)]',
			border: 'border-cyan-500/20'
		}
	};

	const colors = colorMap[color as keyof typeof colorMap] || colorMap.blue;
</script>

<div
	class={cn(
		'group relative cursor-default rounded-xl border p-5 transition-all duration-200 hover:scale-[1.02] hover:shadow-glass-elevated glass',
		colors.glow,
		colors.border
	)}
>
	<!-- Gradient overlay -->
	<div
		class="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-card/60 to-card/20"
	></div>

	<div class="relative flex items-start justify-between gap-3">
		<div class="flex min-w-0 flex-col gap-2">
			<p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
				{title}
			</p>
			<p class="font-display text-2xl font-bold leading-tight text-foreground">
				{value}
			</p>
			{#if subtitle}
				<p class="text-xs text-muted-foreground">{subtitle}</p>
			{/if}
			{#if change !== undefined}
				<div
					class={cn(
						'flex items-center gap-1 text-xs font-medium',
						changeType === 'up' && 'trend-up',
						changeType === 'down' && 'trend-down',
						changeType === 'neutral' && 'text-muted-foreground'
					)}
				>
					{#if changeType === 'up'}
						<TrendingUp class="h-3 w-3" />
					{:else}
						<TrendingDown class="h-3 w-3" />
					{/if}
					<span>
						{changeType !== 'neutral' ? (changeType === 'up' ? '+' : '-') : ''}
						{Math.abs(change)}% vs last month
					</span>
				</div>
			{/if}
		</div>
		<div
			class={cn(
				'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
				colors.icon
			)}
		>
			<Icon class="h-5 w-5" />
		</div>
	</div>
</div>
