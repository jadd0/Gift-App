<script lang="ts">
	import Nav from '../__newNav/+page.svelte';
	import Input from '../__input/+page.svelte';
	import { onMount } from 'svelte'

	export let data: any;
	export let following: CircleType[] = [
		{
			name: 'one',
		},
		{
			name: 'two',
		},
		{
			name: 'three',
		},
		{
			name: 'four',
		},
		{
			name: 'five',
		},
		{
			name: 'six',
		},
	];
	export let recommended: CircleType[] = [];

	let open: Boolean = false;

	let search;

	const openFn = () => {
		open = !open;
	};

	console.log(data);
</script>

<body>
	<Nav auth={data} />

	<div id="searchHolder">
		<Input prop="Search for circles..." />

		<!-- <div class="circlesHolder">
				{#each following as circle}
					<div class="circle">
						<span class="circleName">{circle.name}</span>
					</div>
				{/each}

		</div> -->

		<div class="viewport">
			<ul>
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
			</ul>
		</div>
	</div>

	
</body>

<style>
	@import '/styles.css';

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
		height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}


	ul {
		padding: 1rem;
		display: grid;
		grid-template-columns: repeat(10, 150px);
		grid-template-rows: repeat(10, 150px);
		grid-column-gap: 1rem;
		grid-row-gap: 1rem;
		overflow: scroll;
		height: 80vh;
		scroll-snap-type: both mandatory;
		scroll-snap-stop: always;
		scroll-snap-align: center;
		scroll-padding: 1rem;
		-ms-overflow-style: none; 
  	scrollbar-width: none;
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
		width: 60vw;
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
