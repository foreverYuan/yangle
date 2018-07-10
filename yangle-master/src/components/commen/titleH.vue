<template>
	<!--   <div class="titleH">
    <span class="tl1"><img src="../../assets/topreturn.png" @click="getHis"></span>
    <span class="tl2">{{title}}</span>
  </div> -->
	<div class="titleH">
		<mt-header :title="title">
			<router-link to="" slot="left" v-if="isLeft==0">
				<mt-button icon="back" @click="getHis()"></mt-button>
			</router-link>
		</mt-header>
	</div>
</template>

<script>
	export default {
		name: 'titleH',
		props: ['title', 'isLeft'],
		data() {
			return {}
		},
		created() {},
		components: {},
		methods: {
			getHis() {
				this.$router.go(-1);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<style>
	.mint-header {
		background: #FF6DB6;
	}
	
	.mintui {
		font-size: 22px;
	}
	
	.mint-header .mint-button {
		font-size: 1.05rem;
		color: #FCFCFC;
	}
	
	.mint-header-title {
		font-weight: bold;
		font-size: 1.2rem;
		color: #FCFCFC;
		overflow: auto;
		height: 1.5rem;
	}
</style>