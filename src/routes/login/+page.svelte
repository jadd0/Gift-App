<script lang="ts">
	import { onMount } from "svelte";
	let username = "";
	let password = "";
	let wrong = false;
	let shake = false
	let loading = false

	

	function enterQuery(event: Event) {
		if (event.key == "Enter") {
			submit();
		}
		wrong = false

	}

	const submit = async () => {
		loading = true
		const response = await fetch("/api/login", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});

		if (response.ok) {
			window.location = "/home";
		}

		if (response.ok == false) {
			loading = false
			wrong = true;
			shake = true
		}
		setTimeout(() => {
			shake = false
		}, 300);		
	};
</script>

<svelte:window on:keyup={enterQuery} />

<svelte:head>
	<title>Login</title>
</svelte:head>

<body>
	<div id="loginForm">
		<div class="inputHolder"class:wrong={wrong} class:shake={shake}>
			<input type="text" class="userInput" bind:value={username} required  />
			<span class="floatingLabel">Username</span>
		</div>
		<div class="inputHolder" class:wrong={wrong} class:shake={shake}>
			<input type="text" class="userInput" bind:value={password} required  />
			<span class="floatingLabel">Password</span>
		</div>
		
    <a href="/forgotpassword"><span>Forgotten password?</span></a>

		<button id="loginButton" on:click={submit}>Login</button>
	</div>
</body>

<style>
	@import '/styles.css';

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
