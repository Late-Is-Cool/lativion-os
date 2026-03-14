<script lang="ts">
	interface Props {
		text: string;
	}
	let { text }: Props = $props();
</script>

<div class="start-menu_title"><span>{text}</span></div>
