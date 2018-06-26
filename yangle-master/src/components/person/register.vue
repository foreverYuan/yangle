<template>
	<div class="register">
		<mt-header title="注册">
			<router-link :to="path" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="div-content">
			<div>
				<input placeholder="请输入手机号" v-model="phone" type="number" />
				<span id="re-get-it" class="float-right span-phone" @click="getItCode()">获取验证码</span>
			</div>
			<div>
				<input placeholder="请输入验证码" v-model="itCode" type="number" />
				<span id="it-code" class="float-right span-it">600s</span>
			</div>
			<div>
				<input placeholder="请输入密码" v-model="pwd" :type="pwdType"/>
				<span class="float-right" @click="encrypt">
					<img src="../../assets/login_eye_close.png" v-if="isEncrypt" class="img-eye"/>
				    <img src="../../assets/login_eye_open.png" v-if="!isEncrypt" class="img-eye"/>
				</span>
			</div>
			<div>
				<input placeholder="请确认密码" v-model="rePwd" :type="rePwdType"/>
				<span class="float-right" @click="reEncrypt">
					<img src="../../assets/login_eye_close.png" v-if="isReEncrypt" class="img-eye"/>
				    <img src="../../assets/login_eye_open.png" v-if="!isReEncrypt" class="img-eye"/>
				</span>
			</div>
		</div>
		<button class="btn-register" @click="register()">注册</button>
		<p class="direct-login" @click="goLogin()">已有账号，直接登录 >></p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				phone: '', //手机号
				itCode: '', //验证码
				pwd: '', //密码
				isEncrypt: true,
				isReEncrypt: true, //密码是否加密 默认加密
				pwdType: 'password', //密码类型
				rePwdType: 'password', //密码类型
				rePwd: '', //确认密码
				phoneId: '',
				isClickItCode: false, //是否点击了获取验证码   默认没有点击
				maxTime: 600,
				path: '',
			}
		},
		
		created() {
			this.goBack();
//			this.back();
		},

		methods: {
			goBack() {
				var id = localStorage.getItem('/register-id');
	         if(id == this.jumpRouterIds[0]) {
	         	this.path = '/';
	         } else if (id == this.jumpRouterIds[1]){
	         	this.path = '/login';
	         }
			},
			
			/**
             * 监听物理按键返回
             */
//			back() {
//				var _this = this;
//				if(plus.os.name == "Android") {
//					plus.key.addEventListener("backbutton", function() {
//						_this.goBack();
//					});
//				}
//			},
			
			getDeviceInfo() { //获取移动设备信息
				this.phoneId = plus.device.uuid;
				//				alert(plus.device.uuid);
			},

			/**
			 * 注册
			 */
			register() { //点击注册
				//				this.getDeviceInfo();
				if(this.phone == "") {
					return alert('请输如手机号');
				} else if(this.itCode == "") {
					return alert('请输入验证码');
				} else if(this.pwd == "") {
					return alert('请输入密码');
				} else if(this.rePwd == "") {
					return alert('请再次输入密码');
				}
				if(this.pwd != this.rePwd) {
					return alert('两次密码输入不一致');
				}
				var that = this;
				this.axios.post('/userControllerAPI/userRegister', {
					userAccount: this.phone,
					userPassword: this.pwd,
					userRole: '1',
					birthday: localStorage.getItem('yourBirth'),
					lastMenstruation: localStorage.getItem('endMenses'),
					pregnancyDate: localStorage.getItem('pregnancyDate'),
					equipmentId: this.base_uuid(),
					smsCode: this.itCode,
				}).then(function(response) {
					if(response.data.resultCode == 200) {
						that.$router.push({
							path: '/login'
						})
						alert('注册成功，即将跳转登录页');
					} else {
						alert(response.data.resultMsg);
					}
				}).catch(function(error) {
					console.log(error);
				});

			},

			/**
			 * 跳转登录
			 */
			goLogin() {
				this.jumpNormalRouter('/login');
			},

			getItCode() { /** * 获取验证码*/
				// 		var params = new URLSearchParams();
				// params.append('userAccount', this.phone);
				// params.append('param2', 'value2');
				if(this.phone == '' || this.phone.length != 11) {
					return alert('请输入正确的手机号码');
				}
				this.countDownTime(); //开始倒计时
				this.axios.post('/userControllerAPI/getSmsCode', {
					userAccount: this.phone,
					smsType: '1'
				}).then(function(response) {
					//					alert(response);
				}).catch(function(error) {
					alert(error);
				});

			},

			/**
			 * 倒计时
			 */
			countDownTime() {
				this.maxTime--;
				var itCode = document.getElementById('it-code');
				var reGetIt = document.getElementById('re-get-it');
				itCode.innerHTML = this.maxTime + 's';
				var time = setTimeout(() => {
					this.countDownTime();
				}, 1000);
				if(this.maxTime == 0) {
					clearTimeout(time);
					this.maxTime = 600;
					reGetIt.innerHTML = '重新获取验证码';
				}
			},
			
			/**
			 * 密码加密情况
			 */
			encrypt() {
				if(this.isEncrypt) {
					this.isEncrypt = false;
					this.pwdType = 'text';
				} else {
					this.isEncrypt = true;
					this.pwdType = 'password';
				}
			},
			
			/**
			 * 确认密码加密情况
			 */
			reEncrypt() {
				if(this.isReEncrypt) {
					this.isReEncrypt = false;
					this.rePwdType = 'text';
				} else {
					this.isReEncrypt = true;
					this.rePwdType = 'password';
				}
			}

		}
	}
</script>

<style scoped>
	@import url("../../style/register.css");
</style>