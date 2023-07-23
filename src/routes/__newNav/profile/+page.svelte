<script lang="ts">
	export let auth: any;

	let open = false;

	function click() {
		open = !open;
		console.log(open);
	}
	console.log(auth);
</script>

<div id="profile" class={`${open ? 'profileOpen' : ''}`}>
	<button class={`holder ${open ? 'holderOpen' : ''}`} on:click={click}>
		<div id="profilePicture">
			<img
				src="https://www.dailypaws.com/thmb/DQfQglzyKWlVSlsDwKPprF2iMSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/golden-retriever-177213599-2000-a30830f4d2b24635a5d01b3c5c64b9ef.jpg"
				alt=""
			/>
		</div>
		<span id="username">{auth.username}</span>
		<i class={`bx bx-chevron-down ${open ? ' closed' : ''}`} id="dropdownTag" />
    <i class={`bx bx-chevron-up ${open ? '' : 'closed'}`} id="dropdownTag" />
	</button>

	<div id="profileDD" class={`${open ? 'open' : ''} `}>
    <div class="option">
      <button class={`holder ${open ? 'holderOpen' : ''}`} on:click={click}>
        <div id="profilePicture">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            alt=""
          />
        </div>
        <span>Add account</span>
      
      <!-- <span>Add alt account</span> -->
    </div>
    <div class="option">
      <i class='bx bxs-cog' style='color:#ffffff' ></i>
      <span>Settings</span>
      
    </div>
    <div class="option"></div>
    <div class="option"></div>
    <div class="option"></div>


  </div>
</div>
<style>
	.holder {
		width: 100%;
		height: 38px !important;
		display: flex;
		background: none;
    cursor: pointer;
	}

  #profile:hover {
		border: 2px solid rgb(90, 90, 90) !important;

  }

  .holderOpen {
		border-bottom: 2px solid rgb(90, 90, 90) !important;
  }

	.open {
		display: block !important;
	}

	.closed {
		display: none;
	}

	#dropdownTag {
		font-size: 25px;
		color: rgb(215, 218, 220);
		float: right;
		margin: auto 50px;
	}

	#profile {
		width: 170px;
		height: 40px;
		margin: 0 auto;
		margin-top: 5px;
		background: #212121;
		border-radius: 10px;
		border: 2px solid #333;
		/* display: flex; */
		transition: border 0.2s linear;
	}

	#profilePicture {
		width: 32px;
		height: 32px;
		/* border: 1px solid white; */
		border-radius: 200px;
		margin: 2px 0 0 10px;
		display: flex;
	}

	.profileOpen {
		border: 2px solid rgb(90, 90, 90) !important;
		height: 250px !important;
		width: 170px;
	}

  .borderTransition {
    transition: width 0.2s linear;
  }

	img {
		width: 32px;
		height: 32px;
		object-fit: cover;
		border-radius: 100px;
	}

	span {
		font-size: 14px;
		color: rgb(215, 218, 220);
    margin: 10px auto;
	}

  #username {
    font-size: 18px !important;
		color: rgb(215, 218, 220);
		margin: 7px 0 0 10px;
  }

	#profileDD {
		height: 100%;
		margin: 0 auto;
		display: none;
	}

  .option {
    height: 38px;
    /* border-bottom: 1px solid rgb(90, 90, 90); */
  }
</style>
