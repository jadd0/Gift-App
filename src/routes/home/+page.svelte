<script lang="ts">
	import Nav from '../__newNav/+page.svelte';
	import InView from '../__components/isInView/+page.svelte';
	import Viewport from './viewport.svelte';
	import { onMount } from 'svelte';

	export let data: any;

	let id = []
	for (let i = 0; i < 200; i++) {
				id.push(Math.floor(Math.random() * 10))
			}
	console.log(id)
	onMount(() => {
		
	})

</script>

<body>
	<Nav auth={data} />

		<div class="scroll-container">
		{#each id as src}
			<img src={`img/${src}.jpg`} alt="">
		{/each}
	</div>

	

</body>

<style>
	@import '/styles.css';

	body {
		height: 89vh !important;
		/* overflow: hidden; */
	}

	img {
		width: 236px;
		height: auto;
		border-radius: 15px;
	}

	.largeContainer {
		width: 100vw;
		height: 100vw;
		/* padding: 0 10vw; */
	}

	.scroll-container {
		display: grid;
		gap: 15px;
		grid-template-columns: repeat(auto-fill, minmax(236px, 236px));
		grid-template-rows: masonry;
		place-content: center;
	}
</style>
