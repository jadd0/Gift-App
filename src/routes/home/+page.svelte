<script lang="ts">
	import Nav from '../__newNav/+page.svelte';
	import InView from '../__components/isInView/+page.svelte';
	import Viewport from './viewport.svelte';
	import { onMount } from 'svelte';

	export let data: any;

	function randomWidth() {
		const min = 100;
		const max = 400;

		const randomWidth = Math.floor(Math.random() * (max - min + 1)) + min;

		return `${randomWidth}px`;
	}

	function randomWidthWithout() {
		const min = 100;
		const max = 400;

		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	let columnHeights
	let columns: any;

	let items = 200

	let width = 10;
	$: columns = Array.from({ length: width }, randomWidth).join(' ');


	columnHeights = Array.from({ length: items }, randomWidthWithout);

	
	

	let inView: Boolean[] = [];
	$: width = width + 5;

	let newE: any
	$: console.log("hello")

	function handleScroll() {
		width+=5
		console.log("hello")
	}

	onMount(() => {
    window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  });

</script>

<svelte:window bind:scrollY={newE}/>

<body>
	<Nav auth={data} />

	<div id="searchHolder">
		 <Viewport bind:width> 
			<div class="viewport">
				<ul style={`grid-template-columns: ${columns};`}>
					{#each columnHeights as h, i}
						{#if i % width == 0}
						
							<InView bind:data={inView[i]}>
								<li style={`height: ${h}px`} />
							</InView>
						{:else}
							<li style={`height: ${h}px`} />
						{/if}
					{/each}
				</ul>
			</div>
		 </Viewport> 
	</div>
</body>

<style>
	@import '/styles.css';

	body {
		height: 89vh !important;
		overflow: hidden;
	}

	.coverOpen {
		display: none;
	}

	.inputCover {
		background: none;
		width: 300px;
		height: 50px;
		z-index: 300;
		position: absolute;
		top: 5px;
	}

	.viewport {
		/* background-color: #f8f8f8; */
		/* margin-top: 50px; */
		height: 120vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	ul {
		padding: 1rem;
		display: grid;
		grid-column-gap: 1rem;
		grid-row-gap: 1rem;
		overflow: scroll;
		height: 120vh;
		scroll-snap-type: both mandatory;
		scroll-snap-stop: always;
		scroll-snap-align: center;
		scroll-padding: 1rem;
		-ms-overflow-style: none;
		scrollbar-width: none;
		grid-template-rows: masonry;

		/* grid-gap: 1rem 3rem; */
	}

	ul::-webkit-scrollbar {
		display: none;
	}

	li {
		scroll-snap-align: center;
		display: inline-block;
		border-radius: 3px;
		font-size: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: red;
		transition: all 0.1s linear;
	}

	li:hover {
		transform: scale(1.15);
	}

	li:nth-child(4n + 1) {
		background: #104f55;
	}
	li:nth-child(4n + 2) {
		background: #32746d;
	}
	li:nth-child(4n + 3) {
		background: #9ec5ab;
	}
	li:nth-child(4n + 4) {
		background: #01200f;
	}

	#searchHolder {
		background: none;
		width: 100vw;
		height: 230px;
		position: relative;
		/* top: -50px; */
		margin: 0 auto;
		border-radius: 10px;
	}

	.open {
		width: 85vw !important;
		height: 75vh !important;
	}

	.options {
		/* display: flex; */
		width: 100vw;
		height: 60vh;
	}

	.optionHolder {
		min-width: 100vw !important;
		max-width: 100%;
		/* background: red; */
	}

	.circlesHolder {
		max-width: 100%;
		max-height: 150px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20vw, 1fr));
		/* grid-auto-columns: 150px; */
		/* grid-column-start: 50px; */
		grid-template-rows: 150px 150px 150px 150px 150px 150px 150px;
		/* gap: px; */

		overflow: hidden;
	}

	.circle {
		background: red;
		/* max-width: 200px;
    min-width: 140px; */
		/* width: 150px; */
		margin: 10px 10px 0 10px;
	}
</style>
