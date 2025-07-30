<script lang="ts">
	import type { Snippet } from 'svelte';

	interface TitlebarProps {
		icon?: string;
		title: string;
		buttons: Snippet;
	}

	let { icon, title = 'New Window', buttons }: TitlebarProps = $props();
</script>

<div></div>
