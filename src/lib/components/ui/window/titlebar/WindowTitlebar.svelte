<script lang="ts">
	interface TitlebarProps {
		icon?: string;
		title: string;
	}

	let { icon, title = 'New Window' }: TitlebarProps = $props();
</script>
