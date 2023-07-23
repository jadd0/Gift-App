<script lang='ts'>
  export let auth: any

  let open = false

  function click() {
    open = !open
    console.log(open)
  }
  console.log(auth)
</script>


<button id='profile' on:click={click}>
  <div id="profilePicture">
    <img src="https://www.dailypaws.com/thmb/DQfQglzyKWlVSlsDwKPprF2iMSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/golden-retriever-177213599-2000-a30830f4d2b24635a5d01b3c5c64b9ef.jpg" alt="">
  </div>
  <span>{auth.username}</span>
  <i class='bx bx-chevron-down' id="dropdownTag"></i>

  
</button>
<div id="profileDD" >

  </div>

<style>
  .open {
    display: block;
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
    display: flex;
  }

  #profilePicture {
    width: 32px;
    height: 32px;
    /* border: 1px solid white; */
    border-radius: 200px;
    margin: 2px 0 0 10px;
    display: flex;
  }

  img {
    width: 32px;
    height: 32px;
    object-fit: cover;
		border-radius: 100px;
  }

  span {
    font-size: 18px;
    color: rgb(215, 218, 220);
    margin: 7px 0 0 10px;
  }

	#profileDD {
		width: 170px !important;
		height: 150px;
		background: red;
		margin: 0 auto;
    display: block;
    position: relative;
	}
</style>