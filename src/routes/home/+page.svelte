<script lang="ts">
	import Nav from '../__nav/+page.svelte';
	import Auth from '../__auth/+page.svelte';
</script>


<svelte:head>
	<title>Login</title>
</svelte:head>

<Auth let:user>
    <body>
  <Nav />

</body>

</Auth>

<style>
	@import '/styles.css';

  body {
    height: 1000vh ;
  }

  .shake {
		animation: shake2 0.2s linear;
	}

	.wrong {
		border: 2px solid red;
	}

	@keyframes shake2 {
		25% {
			transform: translateX(11px);
		}

		50% {
			transform: translateX(0px);
		}

		75% {
			transform: translateX(-11px);
		}
	}

  span {
    font-size: 15px;
  }
</style>
