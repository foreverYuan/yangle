<template>
	<div class="login">
		<!--<img src="../../assets/1x/login-top-background.png" class="top-login-img"/>-->
		<!--<p class="login-top-text"><img src="../../assets/1x/login-top-text.png" /></p>-->
		<router-link :to="path">
			<span class="el-icon-arrow-left span-back"></span>
		</router-link>
		<div class="div-login-register">
			<button class="btn-login normal" @click="switchLogin1" v-if="loginRegSwitch == 2">登录</button>
			<button class="btn-login selected" @click="switchLogin1" v-if="loginRegSwitch == 1">登录</button>
			<button class="btn-register normal" @click="switchRegister" v-if="loginRegSwitch == 1">注册</button>
			<button class="btn-register selected" @click="switchRegister" v-if="loginRegSwitch == 2">注册</button>
		</div>
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
				<img src="../../assets/1x/login-person-normal.png" class="person-icon-normal" v-if="!phoneFocus" />
				<img src="../../assets/1x/login-person-normal.png" class="person-icon-focus" v-if="phoneFocus" />
				<input placeholder="请输入手机号" v-model="phone" type="number" @focus="focusPhone" @blur="blurPhone" />
				<!--<img v-if="isOnSwitch" style="padding-left: 3rem;"/>-->
				<span v-if="loginOrIdCode == 2" style="color: #FC9FD7;" id="re-get-it" class="span-it" @click="getItCode">获取验证码</span>
			</div>
			<div class="div_password" v-if="loginRegSwitch == 1">
				<img src="../../assets/1x/login-password-normal.png" id="pwd-icon-normal" v-if="!pwdFocus" />
				<img src="../../assets/1x/login-password-normal.png" id="pwd-icon-focus" v-if="pwdFocus" />
				<input :placeholder="pwdPlaceHolder" v-model="pwd" :type="pwdType" @focus="focusPwd" @blur="blurPwd" />
				<span v-if="loginOrIdCode == 2" id="it-code" class="span-it" style="padding-left: 2.5rem;">600s</span>
			</div>
			<div class="div_password" v-if="loginRegSwitch == 2">
				<img src="../../assets/1x/login-password-normal.png" id="pwd-icon-normal" v-if="!pwdFocus" />
				<img src="../../assets/1x/login-password-normal.png" id="pwd-icon-focus" v-if="pwdFocus" />
				<input placeholder="请输入密码" v-model="regPwd" />
			</div>
			<div class="div_idCode">
				<div v-if="loginRegSwitch == 2" class="div-getIdCode">
					<input placeholder="请输入验证码" v-model="itCode" :type="pwdType" @focus="focusPwd" @blur="blurPwd" style="padding-left: 0;" />
					<button @click="clickGetIdCode" id="getIdCode">获取验证码</button>
				</div>
			</div>
			<!--<div class="div_password">
				<img src="../../assets/1x/login-password-normal.png" id="pwd-icon-normal" v-if="!pwdFocus" />
				<img src="../../assets/1x/login-password-normal.png" id="pwd-icon-focus" v-if="pwdFocus" />
				<input placeholder="请输入密码" v-model="pwd" :type="pwdType" @focus="focusPwd" @blur="blurPwd" v-if="isOnSwitch" />
				<input placeholder="请输入验证码" v-model="itCode" :type="pwdType" @focus="focusPwd" @blur="blurPwd" v-if="!isOnSwitch" />
				<img src="../../assets/login_eye_close.png" v-if="isEncrypt && isOnSwitch" @click="encrypt" class="float-right pwd-eye" />
				<img src="../../assets/login_eye_open.png" v-if="!isEncrypt && isOnSwitch" @click="encrypt" class="float-right pwd-eye" />
				<span v-if="!isOnSwitch" id="it-code" class="span-it" style="padding-left: 2.5rem;">600s</span>
			</div>-->
			<!-- 注册新用户&忘记密码 -->
			<p class="forget-pwd-idcode-login" v-if="loginRegSwitch == 1">
				<span class="forget-pwd" @click="goForgetPwd()">忘记密码?</span>
				<span class="float-right idCode-login" @click="switchPwdIdCode">{{loginText}}</span>
			</p>

			<!-- 登录按钮 -->
			<button class="btn_login" @click="login" v-if="loginRegSwitch == 1 && allowLogin == 0">登录</button>
			<button class="light_btn_login" @click="login" v-if="loginRegSwitch == 1 && allowLogin == 1">登录</button>
			<button class="btn_login" @click="register" v-if="loginRegSwitch == 2 && allowRegister == 0">注册</button>
			<button class="light_btn_login" @click="register" v-if="loginRegSwitch == 2 && allowRegister == 1">注册</button>
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
			<div class="div-third-login" v-if="loginRegSwitch == 1">
				<div>
					<img src="../../assets/1x/WX-ICON.png" />
					<span>微信登录</span>
				</div>
				<div>
					<img src="../../assets/1x/QQ-ICON.png" />
					<span>QQ登录</span>
				</div>
			</div>
		</div>
		<img src="../../assets/1x/login-register-bottom-pic.png" class="bottom-pic" />
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				phone: '', //登录或者注册时输入的手机号
				pwd: '', //登录时输入的密码或者验证码
				regPwd: '', //注册时输入的密码
				pwdType: 'password', //密码类型
				itCode: '', //验证码
				allowLogin: 0,
				allowRegister: 0,
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
				loginRegSwitch: 1, //登录和注册的选择开关，1：登录 2：注册   默认1
				btnText: '登录', //登录或注册按钮文本
				forbidClickRegId: false, //是否禁止点击注册的获取验证码
				forbidClickLoginId: false, //是否禁止点击登录的获取验证码
				loginOrIdCode: 1, //密码登录或者验证码登录   1:密码登录 2:验证码登录
				loginText: '验证码登录', //登录显示的文字   密码登录或者是验证码登录
				pwdPlaceHolder: '请输入密码', //输入密码的提示文案
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
			this.modifyLoginSoftPos();
		},
		watch: {
			phone: function(val, oldval) {
				this.allowLogin = this.phone.trim() != '' && this.pwd.trim() != '' ? 1 : 0;
				this.allowRegister = this.phone != '' && this.regPwd != '' && this.itCode.trim() != '' ? 1 : 0;
			},
			pwd: function(val, oldval) {
				this.allowLogin = this.phone.trim() != '' && this.pwd.trim() != '' ? 1 : 0;
			},
			regPwd: function(val, oldval) {
				this.allowRegister = this.phone != '' && this.regPwd != '' && this.itCode.trim() != '' ? 1 : 0;
			},
			itCode: function(val, oldval) {
				this.allowRegister = this.phone != '' && this.regPwd != '' && this.itCode.trim() != '' ? 1 : 0;
			},
			loginRegSwitch: function(val, oldval) {
				this.btnText = this.loginRegSwitch == 1 ? '登录' : '下一步';
			},
			isOnSwitch: function(val, oldval) {
				console.log(this.isOnSwitch);
			}
		},
		methods: {

			/**
			 * 点击获取验证码
			 */
			clickGetIdCode() {
				if(this.forbidClickRegId) {
					return;
				}
				if(this.phone == '' || this.phone.length != 11) {
					return alert('请输入正确的手机号码');
				}
				this.countDownTime1(); //开始倒计时
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
			countDownTime1() {
				this.forbidClickRegId = true;
				this.maxTime--;
				var idCodeBtn = document.getElementById('getIdCode');
				idCodeBtn.innerHTML = this.maxTime + 's';
				var time = setTimeout(() => {
					this.countDownTime1();
				}, 1000);
				if(this.maxTime == 0) {
					clearTimeout(time);
					this.maxTime = 600;
					idCodeBtn.innerHTML = '重新获取';
					this.forbidClickRegId = false;
				}
			},

			/**
			 * 登录
			 */
			login() {
				console.log("loginType", this.loginType);
				if(this.phone == '' || this.phone.length != 11) {
					return alert('请输入正确的手机号');
				} else if(this.loginType == '1' && this.pwd == '') {
					return alert('请输入密码');
				} else if(this.loginType == '2' && this.pwd == '') {
					return alert('请输入验证码');
				}
				var pwd, idCode;
				if(this.loginType == '1') {
					pwd = this.pwd;
					idCode = '';
				} else if(this.loginType == '2') {
					pwd = '';
					idCode = this.pwd;
				}
				var that = this;
				this.axios.post('/userControllerAPI/userLogin', {
					userAccount: this.phone,
					userPassword: pwd,
					userRole: that.userRole,
					equipmentId: this.base_uuid(),
					smsCode: idCode,
					loginType: this.loginType //登录方式   1:密码登录 2：验证码登录
				}).then((response) => {
					console.log(response.data);
					if(response.data.resultCode == 200) {
						this.userId = response.data.data.userId, //用户id
							this.userRole = response.data.data.userRole, //用户角色
							localStorage.setItem('userId', response.data.data.userId);
						localStorage.setItem('userRole', response.data.data.userRole);
						localStorage.setItem('userName', response.data.data.userName);
						localStorage.setItem('userIcon', response.data.data.userIcon);
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
			 * 切换登录
			 */
			switchLogin1() {
				this.loginRegSwitch = 1;
			},

			/**
			 * 切換注冊
			 */
			switchRegister() {
				this.loginRegSwitch = 2;
			},

			/**
			 * 获取验证码
			 */
			getItCode() {
				if(this.forbidClickLoginId) {
					return;
				}
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

			switchPwdIdCode() {
				if(this.loginOrIdCode == 1) {
					this.loginOrIdCode = 2;
					this.loginType = '2';
					this.loginText = '密码登录';
					this.pwdPlaceHolder = '请输入验证码'
					console.log("打开了验证码登录");
				} else {
					this.loginOrIdCode = 1;
					this.loginType = '1';
					this.loginText = '验证码登录';
					this.pwdPlaceHolder = '请输入密码'
					console.log("打开了密码登录");
				}
				//				if(this.isOnSwitch) {
				//					this.isOnSwitch = false; //关闭开关
				//					this.loginType = '2';
				//					console.log("打开了验证码登录");
				//				} else {
				//					this.isOnSwitch = true; //开启开关
				//					this.loginType = '1';
				//					console.log("打开了密码登录");
				//				}
			},

			/**
			 * 倒计时
			 */
			countDownTime() {
				this.forbidClickLoginId = true;
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
					reGetIt.innerHTML = '重新获取';
					this.forbidClickLoginId = false;
				}
			},
			/**
			 * 注册
			 */
			register() { //点击注册
				//				this.getDeviceInfo();
				if(this.phone == "") {
					return alert('请输如手机号');
				} else if(this.regPwd == "") {
					return alert('请输入密码');
				} else if(this.itCode == "") {
					return alert('请输入验证码');
				}
				var _this = this;
				this.axios.post('/userControllerAPI/userRegister', {
					userAccount: _this.phone,
					userPassword: _this.regPwd,
					userRole: '1',
					birthday: localStorage.getItem('yourBirth'),
					lastMenstruation: localStorage.getItem('endMenses'),
					pregnancyDate: localStorage.getItem('pregnancyDate'),
					equipmentId: _this.base_uuid(),
					smsCode: _this.itCode,
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
			},

			/**
			 * 修改软键盘定位问题(解决fixed或者absulute定位被软键盘顶起的问题)
			 */
			modifyLoginSoftPos() {
				var winHeight = $(window).height();
				$(window).resize(function() {
					var thisHeight = $(this).height();
					if(winHeight - thisHeight > 50) {
						$(".btn_login").css("display", "none");
						$(".light_btn_login").css("display", "none");
						$(".bottom-pic").css("display", "none");
					} else {
						$(".btn_login").css("display", "block");
						$(".light_btn_login").css("display", "block");
						$(".bottom-pic").css("display", "block");
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