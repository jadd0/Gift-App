<script>
</script>

<body>
	<div id="loginForm">
		<div class="inputHolder">
			<input type="text" class="userInput" required />
			<span class="floatingLabel">Email address</span>
		</div>
		<div class="inputHolder">
			<input type="text" class="userInput" required />
			<span class="floatingLabel">Username</span>
		</div>
		<div class="inputHolder">
			<input type="text" class="userInput" required />
			<span class="floatingLabel">Name</span>
		</div>

		<div id="passwordHolder">
			<div class="inputHolder">
				<input type="text" class="userInput" required />
				<span class="floatingLabel">Password</span>
			</div>
			<div id="passwordProperties">
        <span class="smallText">Min. 8 characters</span>
        <span class="smallText">Min. 1 number</span>
      </div>
		</div>

		<button id="loginButton">Sign Up</button>
	</div>
</body>

<style>
	@import '/styles.css';

  #passwordProperties {
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;
    width: 300px;
    margin: 0 auto;
    margin-top: 10px;
  }

  #passwordProperties span{
    color: red;
  }
</style>
