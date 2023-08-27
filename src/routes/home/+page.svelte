<script lang="ts">
	import Nav from '../__newNav/+page.svelte';
	import InView from '../__components/isInView/+page.svelte';
	import Viewport from './viewport.svelte';
	import { onMount } from 'svelte';

	export let data: any;

	let d = [1,2,3,4,5,6,7,8,9,10,11,12]

</script>

<body>
	<Nav auth={data} />

	<div class="support-scrollsnap"></div>

<div class="scroll-container">
	{#each d as d}
		<div class="scroll-area">{d}</div>
	{/each}
</div>

</body>

<style>
	@import '/styles.css';

	body {
		height: 89vh !important;
		/* overflow: hidden; */
	}

	
.scroll-container,
.scroll-area {
  max-width: 850px;
  height: 89vh;
  font-size: 60px;
}

.scroll-container {
  overflow: auto;
  -webkit-scroll-snap-type: y mandatory;
  -ms-scroll-snap-type: y mandatory;
	scroll-snap-type: y mandatory;
}

.scroll-area {
  scroll-snap-align: start;
}

.scroll-container,
.scroll-area {
  margin: 0 auto;
}

.scroll-area {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

</style>
