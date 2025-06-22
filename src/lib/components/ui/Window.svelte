<script>
	let { icon = undefined, title = '', height_ = 640, width = 320 } = $props();

	// size of the window (in pixels)
	let height = $state();
</script>

<div class="window">
	<div class="window_titlebar">
		{#if icon}
			<img src="icon" alt="icon" />
		{/if}
		<span>{title}</span>
	</div>
	<div class="window_body"></div>
</div>
