<template>
	<div class="fetalheart">
		<mt-header title="胎心监测">
			<mt-button @click="goMyFh()" slot="right">我的胎心</mt-button>
		</mt-header>
		<div class="div-content">
			<div class="div-connect-bt">
				<ul v-if="tip == 0" class="ul-big">
					<li><img src="../../assets/image/jiaoCheng.png" class="img-connect-bt" @click="goNativeBt()" /></li>
					<li><img src="../../assets/image/dian1.png" class="yuanDian" id="yuanDian1" /></li>
					<li><img src="../../assets/image/dian1.png" class="yuanDian" id="yuanDian2" /></li>
					<li><img src="../../assets/image/dian1.png" class="yuanDian" id="yuanDian3" /></li>
					<li><img src="../../assets/image/lanYa.png" class="img-connect-bt" @click="goNativeBt()" />
						<p class="p-bt-tip">点击连接胎心设备</p>
					</li>
				</ul>

				<ul v-if="tip == 1" class="ul-small">
					<li><img src="../../assets/image/jiaoCheng.png" class="img-connect-bt" @click="goNativeBt()" /></li>
					<li><img src="../../assets/image/dian1.png" class="yuanDian" /></li>
					<li><img src="../../assets/image/dian1.png" class="yuanDian" /></li>
					<li><img src="../../assets/image/dian1.png" class="yuanDian" /></li>
					<li><img src="../../assets/image/lanYa.png" class="img-connect-bt" @click="goNativeBt()" />
						<p class="p-bt-tip">点击连接胎心设备</p>
					</li>
				</ul>

			</div>
			<div style="text-align: right;" v-if="tip == 0" @click="clickhelp">
				<span class="tip" @click="help">找不到胎心？看这里～</span>
				<img class="img-doctor" src="../../assets/image/doctor.png" alt="">
			</div>
			<!--<p class="p-shadow" v-if="tip == 1">www</p>-->
			<p v-if="tip == 1" class="p-shadow" style="text-align: left;padding: 1rem 0.5rem 0 0.5rem;font-size: 1rem;margin-top: 1.5rem;"><span>找不到胎心?看这里～</span><span class="el-icon-arrow-down float-right" @click="goHide"></span></p>
			<div class="div-fhr-course scorll-container" v-if="tip == 1" style="position: absolute;height: 30%;overflow: auto;margin-bottom: 2.5rem;">
				<img src="../../assets/fhr_course1.png" />
				<img src="../../assets/fhr_course2.png" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'fetalheart',
		data() {
			return {
				tip: 0,
//				jumpId: localStorage.getItem('/home/fetalheart-id'),
				jumpId: this.$route.query.id,
				userId: localStorage.getItem('userId'),
			}
		},
		created() {
			if(this.jumpId == 0) { //我的胎心
				//				alert("我的胎心");
				//				console.log("heart", "我的胎心");
				this.goMyFh();
			} else if(this.jumpId == 1) { //蓝牙
				//				alert("我的蓝牙");
				//				console.log("heart", "我的蓝牙");
				this.goNativeBt();
			}
			localStorage.setItem("/home/fetalheart-id", null);
			var userId = localStorage.getItem('userId');
			var userInfor = {
				userId: userId,
				userRole: "test",
				phone: "test"
			};
			this.base_saveUserInfo(userInfor);
			//			this.receiveParam();
			//			alert(this.fhrId);
			//			if(this.fhrId != null) {
			//			   this.$router.push({
			//			   	path: '/fetalheartDetail',
			//			   	query: {
			//			   		fhrId: this.fhrId
			//			   	}
			//			   })
			//			}
		},

		mounted() {

		},
		watch: {

		},
		methods: {
			/**
			 * 点击右下角的医生图片展开胎心教程
			 */
			clickhelp() {
				this.tip = 1;
			},

			/**
			 * 点击帮助右上角的向下按钮
			 */
			goHide() {
				this.tip = 0;
			},

			/**
			 * 跳转原生蓝牙页面
			 */
			goNativeBt() {
				if(this.userId == null || this.userId == '' || this.userId == undefined) {
					this.jumpRouterById('/login', 3);
					return;
				}

				this.base_naviblue();
			},

			/**
			 * 还没有设备
			 */
			goNoDevice() {

			},

			/**
			 * 跳转使用教程
			 */
			goUseCourse() {

			},

			/**
			 * 跳转注意事项
			 */
			goAttention() {

			},

			/**
			 * 跳转胎心知识
			 */
			goFhKnowledge() {

			},

			goMyFh() {
				if(this.userId == null || this.userId == '' || this.userId == undefined) {
					this.jumpRouterById('/login', 2);
					return;
				}
				this.$router.push({
					path: '/myFetalHeart'
				});
			}

		}
	}
</script>

<style scoped>
	@import url("../../style/fetalheart.css");
</style>

<style scoped>
	.scorll-container::-webkit-scrollbar {
		display: none;
	}
</style>