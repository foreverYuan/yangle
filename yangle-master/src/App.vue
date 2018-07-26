<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	#app {
		width: 100%;
		height: 100%;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0;
		-webkit-margin-before: 0;
	}
	
	ul {
		list-style: none;
		-webkit-padding-start: 0;
	}
	
	.float-right {
		float: right;
	}
	
	.block {
		display: block;
	}
	
	/*.mint-header {
		background: none;
	}*/
	
	.mint-header {
		background: #FF6DB6;
		height: 3.5rem;
		z-index: 1;
	}
	
	.mint-header-title {
		/*font-weight: bold;*/
		font-size: 1.3rem;
		color: #FCFCFC;
		overflow: auto;
		height: 1.6rem;
		line-height: 1.6rem;
	}
	
	.mintui {
		font-size: 1.5rem;
	}
	
	.mint-header .mint-button {
		font-size: 1.05rem;
		color: #FCFCFC;
		height: 2rem;
	}
	
	.el-upload-list {
		display: none;
	}
</style>