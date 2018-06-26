<template>
	<div class="home">
		<router-view></router-view>
		<mt-tabbar v-model="selected" style="position:fixed;height: 3.5rem;">
			<mt-tab-item id="1">
				<img src="../../assets/home_selected.png" v-if="selected==1">
				<img src="../../assets/home_normal.png" v-else>
				<p style="-webkit-margin-before:0.3rem;">首页</p>
			</mt-tab-item>
			<!-- <mt-tab-item id="2">
				<img src="../../assets/consult_selected.png" v-if="selected==2">
				<img src="../../assets/consult_normal.png" v-else>
				<p>咨询</p>
			</mt-tab-item> -->
			<mt-tab-item id="3">
				<img src="../../assets/fetal_heart.png" v-if="selected==3" style="margin-top: -2rem;width: 4.3rem;height: 4.3rem;">
				<img src="../../assets/fetal_heart.png" v-else style="margin-top: -2rem;width: 4.3rem;height: 4.3rem;">
				<!--<p style="-webkit-margin-before:1.1rem;">胎心</p>-->
			</mt-tab-item>
			<!-- <mt-tab-item id="4">
				<img src="../../assets/assistant_selected.png" v-if="selected==4">
				<img src="../../assets/assistant_normal.png" v-else>
				<p>助手</p>
			</mt-tab-item> -->
			<mt-tab-item id="5">
				<img src="../../assets/person_selected.png" v-if="selected==5">
				<img src="../../assets/person_normal.png" v-else>
				<p style="-webkit-margin-before:0.3rem;">个人</p>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				selected: 1,
			}
		},

		created() {
			//如果本地缓存的预产期不为空则直接跳转首页
				this.$router.push({
					path: '/home/homepage'
				});
		},

		watch: {
			selected() {
				if(this.selected == 1) {
					this.$router.push({
						path: '/home/homepage' //首页
					});
				} else if(this.selected == 2) {
					this.$router.push({
						path: '/home/consult' //咨询
					});
				} else if(this.selected == 3) {
					this.$router.push({
						path: '/home/fetalheart' //胎心
					});
				} else if(this.selected == 4) {
					this.$router.push({
						path: '/home/assistant' //助手
					});
				} else if(this.selected == 5) {
					this.$router.push({
						path: '/home/person' //个人
					});
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../../style/home.css");
</style>

<style scoped>
	.mint-tabbar>.mint-tab-item.is-selected {
		background: none;
		color: rgb(252, 159, 215);
	}
</style>