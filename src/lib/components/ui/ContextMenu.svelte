<script>
	let { x, y, items } = $props();
</script>

<div class="context-menu" style="top: {y}px; left: {x}px">
	<ul class="context-menu_container">
		{@render items()}
	</ul>
</div>
