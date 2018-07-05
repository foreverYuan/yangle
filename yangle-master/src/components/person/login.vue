<template>
	<div class="login">
		<img src="../../assets/1x/login-top-background.png" class="top-login-img"/>
		<p class="login-top-text"><img src="../../assets/1x/login-top-text.png" /></p>
		<router-link :to="path">
			<span class="el-icon-arrow-left span-back"></span>
		</router-link>
		<!--<div style="display: flex;height: 3rem;">
			<router-link :to="path">
				<span class="el-icon-arrow-left span-back"></span>
			</router-link>
			<div style="width: 90%;">
				<div class='toggle toggle-on' id='switch'>
					<div class='toggle-text-off'>验证码登录</div>
					<div class='glow-comp'></div>
					<div class='toggle-button'></div>
					<div class='toggle-text-on'>密码登录</div>
				</div>
			</div>
		</div>-->
		<div class="div_content">
			<!-- 输入手机号和密码 -->
			<div class="div_account">
				<img src="../../assets/1x/login-person-normal.png" v-if="!phoneFocus" />
				<img src="../../assets/1x/login-person-normal.png" v-if="phoneFocus" />
				<!--<span class="bottom-line">-->
				<input placeholder="用户名/手机号" v-model="phone" type="number" @focus="focusPhone" @blur="blurPhone" />
				<!--<img v-if="isOnSwitch" style="padding-left: 3rem;"/>-->
				<span v-if="!isOnSwitch" style="color: #FC9FD7;" id="re-get-it" class="span-it" @click="getItCode">获取验证码</span>
				<!--</span>-->
			</div>

			<div class="div_password">
				<img src="../../assets/1x/login-password-normal.png" v-if="!pwdFocus" />
				<img src="../../assets/1x/login-password-normal.png" v-if="pwdFocus" />
				<!--<span class="bottom-line">-->
				<input placeholder="密码" v-model="pwd" :type="pwdType" @focus="focusPwd" @blur="blurPwd" v-if="isOnSwitch"/>
				<input placeholder="请输入验证码" v-model="itCode" :type="pwdType" @focus="focusPwd" @blur="blurPwd" v-if="!isOnSwitch"/>
				<img src="../../assets/login_eye_close.png" v-if="isEncrypt && isOnSwitch" @click="encrypt" class="float-right pwd-eye"/>
				<img src="../../assets/login_eye_open.png" v-if="!isEncrypt && isOnSwitch" @click="encrypt" class="float-right pwd-eye"/>
				<span v-if="!isOnSwitch" id="it-code" class="span-it" style="padding-left: 2.5rem;">600s</span>
				<!--</span>-->
			</div>
			<!-- 注册新用户&忘记密码 -->
			<p class="forget-pwd-idcode-login">
				<span class="forget-pwd" @click="goForgetPwd()">忘记密码?</span>
				<span class="float-right idCode-login" @click="">验证码登录</span>
			</p>

			<!-- 登录按钮 -->
			<button class="btn_login" @click="login" v-if="allowLogin == 0">登录</button>
			<button class="light_btn_login" @click="login" v-if="allowLogin == 1">登录</button>
            <!--<span class="register-pwd" @click="goRegister()">注册新用户</span>-->
			<!-- 第三方登录 -->
			<!--<div class="third-login">
				<p>第三方登录</p>
				<div style="display: flex;">
					<span @click="this.noOpen"><img src="../../assets/icon_QQ.png"/></span>
					<span @click="this.noOpen"><img src="../../assets/icon_WX.png"/></span>
					<span @click="this.noOpen"><img src="../../assets/icon_XL.png"/></span>
				</div>
			</div>-->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				phone: '',
				pwd: '',
				pwdType: 'password', //密码类型
				itCode: '', //验证码
				allowLogin: 0,

				isOnSwitch: true, //是否开启密码登录的开关，默认开启
				isEncrypt: true, //密码是否加密 默认加密
				phoneFocus: false, //手机获取焦点
				pwdFocus: false, //密码获取焦点
				/* login接口 start */
				/* 请求参数 */
				userRole: '1', //目前没有医生端，先固定孕妇的角色   
				loginType: '1', //登录方式   1:密码登录 2：验证码登录
				/* 返回参数 */
				/* login接口 end */

				/* 获取用户基本信息接口  start */
				/* 请求参数 */
				userId: "", //用户id
				/* 返回参数 */
				/* 获取用户基本信息接口  end */

				value1: true,
				value2: true,

				maxTime: 600, //倒计时的最大时间
				path: "",
			}
		},
		created() {
			this.goBack();
			//			this.back();
			//	         else if (id == this.jumpRouterIds[2]) {
			//	         	this.path = '/register';
			//	         }
		},
		mounted() {
			this.switchLogin();
		},
		watch: {
			phone: function(val, oldval) {
				if(this.phone != '' && this.pwd != '') {
					this.allowLogin = 1;
				} else {
					this.allowLogin = 0;
				}
			},
			pwd: function(val, oldval) {
				if(this.phone != '' && this.pwd != '') {
					this.allowLogin = 1;
				} else {
					this.allowLogin = 0;
				}
			},
			isOnSwitch: function(val, oldval) {
				console.log(this.isOnSwitch);
			}
		},
		methods: {
			/**
			 * 登录
			 */
			login() {
				console.log("loginType", this.loginType);
				if(this.phone == '' || this.phone.length != 11) {
					return alert('请输入正确的手机号');
				} else if(this.loginType == '1' && this.pwd == '') {
					return alert('请输入密码');
				} else if(this.loginType == '2' && this.itCode == '') {
					return alert('请输入验证码');
				}
				var that = this;
				this.axios.post('/userControllerAPI/userLogin', {
					userAccount: this.phone,
					userPassword: this.pwd,
					userRole: that.userRole,
					equipmentId: this.base_uuid(),
					smsCode: this.itCode,
					loginType: this.loginType //登录方式   1:密码登录 2：验证码登录
				}).then((response) => {
					console.log(response.data);
					if(response.data.resultCode == 200) {
						this.userId = response.data.data.userId, //用户id
							this.userRole = response.data.data.userRole, //用户角色
							localStorage.setItem('userId', response.data.data.userId);
						localStorage.setItem('userRole', response.data.data.userRole);
						localStorage.setItem('userName', response.data.data.userName);
						this.$router.push({
							path: '/home/homepage'
						});
					} else {
						alert(response.data.resultMsg);
					}

				}).catch((error) => {
					console.log(error);
				});
			},

			/**
			 * 获取验证码
			 */
			getItCode() {
				if(this.phone == '' || this.phone.length != 11) {
					return alert('请输入正确的手机号码');
				}
				this.countDownTime(); //开始倒计时
				this.axios.post('/userControllerAPI/getSmsCode', {
					userAccount: this.phone,
					smsType: '2'
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
			 * 跳转注册页
			 */
			goRegister() {
				this.jumpRouterById('/register', this.jumpRouterIds[1]);
			},

			/**
			 * 跳转忘记密码页
			 */
			goForgetPwd() {
				this.$router.push({
					path: '/retriPwd'
				});
			},

			goBack() {
				var id = localStorage.getItem('/login-id');
				if(id == this.jumpRouterIds[0]) {
					this.path = '/home/fetalheart';
				} else if(id == this.jumpRouterIds[1]) {
					this.path = '/home/person';
				} else {
					this.path = '/home/homepage';
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

			/**
			 * 手机号获取焦点事件
			 */
			focusPhone() {
				this.phoneFocus = true;
			},

			/**
			 * 验证码获取焦点事件
			 */
			focusPwd() {
				this.pwdFocus = true;
			},

			/**
			 * 手机号失去焦点事件
			 */
			blurPhone() {
				this.phoneFocus = false;
			},

			/**
			 * 验证码失去焦点事件
			 */
			blurPwd() {
				this.pwdFocus = false;
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

			switchLogin() {
				var that = this;
				$('.toggle').click(function(e) {
					e.preventDefault(); // The flicker is a codepen thing
					$(this).toggleClass('toggle-on');
					if(that.isOnSwitch) {
						that.isOnSwitch = false; //关闭开关
						that.loginType = '2';
						console.log("打开了验证码登录");
					} else {
						that.isOnSwitch = true; //开启开关
						that.loginType = '1';
						console.log("打开了密码登录");
					}
				});
			}
		}
	}
</script>

<style scoped>
	@import url("../../style/login.css");
</style>

<style scoped>

</style>