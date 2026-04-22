<script lang="ts">
	import { cn } from '$lib/utils';

	let { title, description, actions, className } = $props();
</script>

<div class={cn('mb-6 flex items-start justify-between gap-4', className)}>
	<div class="min-w-0">
		<h1 class="font-display text-2xl font-bold leading-tight text-foreground">
			{title}
		</h1>
		{#if description}
			<p class="mt-1 text-sm text-muted-foreground">{description}</p>
		{/if}
	</div>
	{#if actions}
		<div class="flex flex-wrap items-center gap-2 shrink-0">
			{@render actions()}
		</div>
	{/if}
</div>
