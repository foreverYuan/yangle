<template>
	<div class="register">
		<mt-header title="找回密码">
			<router-link :to="path" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="div-content">
			<div>
				<input placeholder="请输入手机号" v-model="phone" type="number" />
				<span class="float-right span-phone" id="re-get-id" @click="getItCode()">获取验证码</span>
			</div>
			<div>
				<input placeholder="请输入验证码" v-model="itCode" type="number" />
				<span class="float-right span-it" id="id-code">600s</span>
			</div>
			<div>
				<input placeholder="请输入新密码" v-model="pwd" :type="pwdType" />
				<span class="float-right" @click="encrypt">
					<img src="../../assets/login_eye_close.png" v-if="isEncrypt" class="img-eye"/>
				    <img src="../../assets/login_eye_open.png" v-if="!isEncrypt" class="img-eye"/>
				</span>
			</div>
			<div>
				<input placeholder="请确认密码" v-model="rePwd" :type="rePwdType" />
				<span class="float-right" @click="reEncrypt">
					<img src="../../assets/login_eye_close.png" v-if="isReEncrypt" class="img-eye"/>
				    <img src="../../assets/login_eye_open.png" v-if="!isReEncrypt" class="img-eye"/>
				</span>
			</div>
		</div>
		<button class="btn-register" @click="resetPwd()">提交</button>
		<p class="direct-login" @click="goLogin()">已有账号，直接登录 >></p>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				phone: '', //手机号
				itCode: '', //验证码
				pwd: '', //密码
				rePwd: '', //确认密码
				isReEncrypt: true, //密码是否加密 默认加密
				pwdType: 'password', //密码类型
				rePwdType: 'password', //密码类型
				/* 重置密码接口 start */
				/* 请求参数 */
				serRole: localStorage.getItem('userRole'), //用户角色
				/* 返回参数 */

				/* 重置密码接口 end */

				smsType: '3', //找回密码发送验证码的类型    1：注册发验证码 填1 2：登录发送验证码 填2 3：找回密码发送验证码 填3
				isEncrypt: true,
				path: '',
				forbidClickLoginId: false, //是否禁止点击登录的获取验证码
				maxTime: 600, //倒计时的最大时间
			}
		},

		created() {
            this.goBack();
		},

		methods: {
			goBack() {
				this.path = '/login';
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

			/**
			 * 注册
			 */
			register() {

			},

			/**
			 * 跳转登录
			 */
			goLogin() {
				this.$router.push({
					path: '/login'
				});
			},

			/**
			 * 忘记密码
			 */
			resetPwd() {
				var _this = this;
				if(this.pwd != this.rePwd) {
					plus.nativeUI.alert("两次输入的密码不一致，请重新输入");
				}
				this.axios.post('/userControllerAPI/resetPassword', {
					userAccount: _this.phone, //用户账号
					smsCode: _this.itCode, //验证码
					userRole: _this.serRole, //用户角色
					userPassword: _this.pwd, //新密码
				}).then(function(response) {
					console.log(response);
					if(response.data.resultCode == 200) {
						plus.nativeUI.alert("密码重置成功，请重新登录");
						//跳转登录页
						_this.$router.push({
							path: '/login'
						});
					} else {
                        plus.nativeUI.alert(response.data.resultMsg);
					}
				}).catch(function(error) {
					console.log(error);
				});

			},

			/**
			 * 获取验证码
			 */
			getItCode() {
				var that = this;
				if(this.forbidClickLoginId) {
					return;
				}
				if(this.phone == '' || this.phone.length != 11) {
					return plus.nativeUI.alert('请输入正确的手机号码');
				}
				this.axios.post('/userControllerAPI/getSmsCode', {
					userAccount: this.phone, //用户账号
					smsType: this.smsType //短信类型   1：注册发验证码 填1 2：登录发送验证码 填2 3：找回密码发送验证码 填3
				}).then(function(response) {
					if(response.data.resultCode == 200) {
					let instance = Toast('验证码已发送~');
					that.countDownTime(); //开始倒计时
					setTimeout(() => {
						instance.close();
					}, 2000);
				} else {
					let instance = Toast('验证码发送失败~');
						setTimeout(() => {
							instance.close();
						}, 2000);
				}
				}).catch(function(error) {
					plus.nativeUI.alert(error);
				});
			},
			
			/**
			 * 倒计时
			 */
			countDownTime() {
				this.forbidClickLoginId = true;
				this.maxTime--;
				var itCode = document.getElementById('id-code');
				var reGetIt = document.getElementById('re-get-id');
				itCode.innerHTML = this.maxTime + 's';
				var timeCountDown = setTimeout(() => {
					this.countDownTime();
				}, 1000);
				if(this.maxTime == 0) {
					clearTimeout(timeCountDown);
					this.maxTime = 600;
					reGetIt.innerHTML = '重新获取';
					this.forbidClickLoginId = false;
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