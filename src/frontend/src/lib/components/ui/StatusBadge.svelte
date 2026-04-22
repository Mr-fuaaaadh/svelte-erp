<script lang="ts">
	import { cn } from '$lib/utils';

	let { status } = $props();

	const statusMap: Record<string, { label: string; class: string }> = {
		active: {
			label: 'Active',
			class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
		},
		inactive: {
			label: 'Inactive',
			class: 'bg-muted/10 text-muted-foreground border-muted/20'
		},
		pending: {
			label: 'Pending',
			class: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
		},
		expired: {
			label: 'Expired',
			class: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
		}
	};

	const s = statusMap[status.toLowerCase()] || statusMap.pending;
</script>

<span
	class={cn(
		'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors',
		s.class
	)}
>
	{s.label}
</span>
