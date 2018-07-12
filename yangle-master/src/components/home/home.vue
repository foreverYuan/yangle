<template>
	<div class="home">
		<router-view></router-view>
		<!--<img src="../../assets/bottom_navibar.png" width="100%" style="position: fixed;left: 0;bottom: -1rem;"/>-->
		<mt-tabbar v-model="selected" class="tabbar">
			<mt-tab-item id="1">
				<img src="../../assets/3x/home-icon-selected@3x.png" style="width: 1.5rem;" v-if="selected==1">
				<img src="../../assets/3x/home-icon-normal@3x.png" style="width: 1.5rem;" v-else>
				<p class="selected" style="-webkit-margin-before: 0.3rem;" v-if="selected==1">首页</p>
				<p class="normal" style="-webkit-margin-before: 0.3rem;" v-else>首页</p>
			</mt-tab-item>
			<!-- <mt-tab-item id="2">
				<img src="../../assets/consult_selected.png" v-if="selected==2">
				<img src="../../assets/consult_normal.png" v-else>
				<p>咨询</p>
			</mt-tab-item> -->
			<mt-tab-item id="3">
				<img src="../../assets/3x/heart-icon@3x.png" v-if="selected==3" style="margin-top: -0.7rem;width: 2rem;">
				<img src="../../assets/3x/heart-icon@3x.png" v-else style="margin-top: -0.7rem;width: 2rem;">
				<p class="selected" style="-webkit-margin-before: 0.3rem;" v-if="selected==3">胎心</p>
				<p class="normal" style="-webkit-margin-before: 0.3rem;" v-else>胎心</p>
			</mt-tab-item>
			<!-- <mt-tab-item id="4">
				<img src="../../assets/assistant_selected.png" v-if="selected==4">
				<img src="../../assets/assistant_normal.png" v-else>
				<p>助手</p>
			</mt-tab-item> -->
			<mt-tab-item id="5">
				<img src="../../assets/3x/person-icon-selected@3x.png" style="width: 1.5rem;" v-if="selected==5">
				<img src="../../assets/3x/person-icon-normal@3x.png" style="width: 1.5rem;" v-else>
				<p class="selected" style="-webkit-margin-before: 0.3rem;" v-if="selected==5">个人</p>
				<p class="normal" style="-webkit-margin-before: 0.3rem;" v-else>个人</p>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				selected: sessionStorage.getItem('homeSelect') == null ? 1 : sessionStorage.getItem('homeSelect'),
			}
		},

		created() {
			//如果本地缓存的预产期不为空则直接跳转首页
			this.getIndex();
		},

		mounted() {
			this.modifyHomeSoftPos();
		},

		watch: {
			selected() {
				if(this.selected == 1) {
					sessionStorage.setItem('homeSelect', 1)
					this.$router.push({
						path: '/home/homepage' //首页
					});
				} else if(this.selected == 2) {
					sessionStorage.setItem('homeSelect', 2)
					this.$router.push({
						path: '/home/consult' //咨询
					});
				} else if(this.selected == 3) {
					sessionStorage.setItem('homeSelect', 3)
					this.$router.push({
						path: '/home/fetalheart' //胎心
					});
				} else if(this.selected == 4) {
					sessionStorage.setItem('homeSelect', 4)
					this.$router.push({
						path: '/home/assistant' //助手
					});
				} else if(this.selected == 5) {
					sessionStorage.setItem('homeSelect', 5)
					this.$router.push({
						path: '/home/person' //个人
					});
				}
			},
		},

		methods: {
			getIndex() {
				var b = sessionStorage.getItem('homeSelect')
				if(b == 1) {
					this.selected == 1
				} else if(b == 2) {
					this.selected == 2
				} else if(b == 3) {
					this.selected == 3
				} else if(b == 4) {
					this.selected == 4
				} else if(b == 5) {
					this.selected == 5
				}
			},

			/**
			 * 修改软键盘定位问题(解决fixed或者absulute定位被软键盘顶起的问题)
			 */
			modifyHomeSoftPos() {
				/*var oHeight = $(document).height(); //浏览器当前的高度
				var windowHeight = $(window).height();
				$(window).resize(function() {
					if(windowHeight < oHeight) {
						alert("软键盘弹出");
						$("#tabbar").css("position", "static");
					} else {
						alert("软键盘收起");
						$("#tabbar").css("position", "fixed");
					}
				});*/
				/*$(document).on('focusin', function() {　　 //软键盘弹出的事件处理
					alert("触发了软键盘弹出事件")
					$("#tabbar").css("position", "static");
				});

				$(document).on('focusout', function() {　　 //软键盘收起的事件处理
					alert("触发了软键盘收起事件")
					$("#tabbar").css("position", "fixed");
				});*/
				var winHeight = $(window).height();
				$(window).resize(function() {
					var thisHeight = $(this).height();
					if(winHeight - thisHeight > 50) {
						$(".tabbar").css("visibility", "hidden");
					} else {
						$(".tabbar").css("visibility", "visible");
					}
				});
			}
		}
	}
</script>

<style scoped>
	@import url("../../style/home.css");
</style>