<script lang="ts">
	export let width: any = 300;
	export let widthType: string = 'px'
	export let height: any = 50;
	export let prop: string;
	export let value = '';
	export let type = 'text';

	const handleInput = (e) => {
		value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
	};

	let stylesInputHolder = `width: ${width}${widthType}; height: ${height}px`;
  let stylesUserInput = `width: calc(${width}${widthType} - 25px); min-height: ${height*.7}px`;
</script>

<div class="inputHolder" style={stylesInputHolder}>
	<input {type} class="userInput" on:input={handleInput} style={stylesUserInput} required />
	<span class="floatingLabel">{prop}</span>
</div>


<style>
	.inputHolder {
		padding-bottom: 5px;
		margin: 0 auto;
		margin-top: 10px;
		background: #212121;
		border-radius: 5px;
		color: white;
		text-align: left;
		border: 2px solid #333;
		transition: all 0.2s linear;
	}
	.userInput {
		width: 92.5%;
		font-size: 20px !important;
		max-height: 30px;
		margin-left: 10px;
		margin-top: 8px;
		background: #212121;
		color: white;
		text-align: left;
	}
	.inputHolder .userInput:focus {
		border-color: blue;
		border-width: medium medium 2px;
	}
	.inputHolder .floatingLabel {
		position: relative;
		pointer-events: none;
		top: -37px;
		left: 10px;
		transition: 0.2s ease all;
		font-size: 15px;
		color: #727272;
	}
	.inputHolder input:focus ~ .floatingLabel,
	.inputHolder input:not(:focus):valid ~ .floatingLabel {
		top: -54px;
		left: 10px;
		font-size: 10px;
		opacity: 1;
	}

	.inputHolder:focus-within {
		border: 2px solid rgb(90, 90, 90);
	}

	input {
		font-size: 17px !important;
	}
</style>
