<script>
	let { text, onclick = undefined } = $props();
</script>

<button {onclick} class="button-9x">
	{@render text()}
</button>
