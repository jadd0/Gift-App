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

	
</body>

<style>
	@import '/styles.css';

	body {
		height: 89vh !important;
		overflow: hidden;
	}

	
</style>
