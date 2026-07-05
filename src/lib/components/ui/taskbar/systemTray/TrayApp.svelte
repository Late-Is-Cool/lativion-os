<script lang="ts">
	let {
		icon,
		name,
		action
	}: {
		icon: string | undefined;
		name: string | undefined;
		action: () => void;
	} = $props();
</script>

<button onclick={action}>
	<img src={icon} alt={name} draggable="false" />
</button>

<style lang="scss">
	button {
		background: none;
	}
</style>
