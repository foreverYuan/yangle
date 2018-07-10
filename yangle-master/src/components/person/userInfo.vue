<template>
	<div class="userInfo">
		<mt-header title="基本信息">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div class="div-content">
			<p class="p-info" style="height: 5rem;line-height: 5rem;">
				<span>头像</span>
				<span class="el-icon-arrow-right float-right" style="margin-top: 1.5rem;margin-left: 0.5rem;"></span>
				<el-upload action="https://yl.ibao365.net:8080/yangle/pregnancy/fastdfsUpload" show-file-list="false" style="float: right;" v-model="userIcon" :on-success="handleSuccess">
					<img :src="userInfo.userIcon" v-if="userInfo.userIcon != null && userInfo.userIcon != ''" class="float-right header-pic" size="small" type="primary" width="55" height="55" />
					<img src="../../assets/default-header-pic.jpg" v-if="userInfo.userIcon == null || userInfo.userIcon == ''" class="float-right header-pic" width="55" height="55" />
				</el-upload>
			</p>
			<p class="p-info" style="clear: both;" @click="dialogVisible = true"><span>昵称</span><span class="float-right">
				<span>{{userInfo.userName}}</span>
				<span class="el-icon-arrow-right"></span></span>
			</p>
			<p class="p-info" style="clear: both;" @click="stateDialog = true"><span>状态</span><span class="float-right">
				<span>孕育中</span>
				<!--<select style="background: none;border: none;" v-model="state" id="stateSelect">
					<option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></option>
				</select>-->
				<span class="el-icon-arrow-right"></span></span>
			</p>
			<p class="p-info" style="clear: both;" v-on:click="openEndMensesPicker"><span>末次月经</span><span class="float-right">
				<span v-if="!isSelectEndMenses">{{this.getFormatDate(userInfo.lastMenstruation)}}</span>
				<span v-if="isSelectEndMenses">{{endMenses}}</span>
				<span class="el-icon-arrow-right"></span></span>
			</p>
			<p class="p-info" style="clear: both;" v-on:click="openBirthPicker"><span>出生日期</span><span class="float-right">
				<span v-if="!yourBirth">{{this.getFormatDate(userInfo.birthday)}}</span>
				<span v-if="yourBirth">{{yourBirth}}</span>
				<span class="el-icon-arrow-right"></span></span>
			</p>
			<lian-dong ref="liandong" v-on:pickCallBack='pickCall' :userAddress='userInfo.userAddress'></lian-dong>
			<!--<p class="p-info" style="clear: both;"><span>所在地</span><span class="float-right">
				<span>{{userInfo.userAddress}}</span>
				<span class="el-icon-arrow-right"></span></span>
			</p>-->
			<el-dialog title="昵称修改" :visible.sync="dialogVisible" width="90%">
				<el-input placeholder="请输入昵称" type="text" v-model="nickName" />
				<span slot="footer" class="dialog-footer">
               <el-button type="info" @click="modifyInfo(true)" style="width: 30%;background: #eee;color: black;border: none;">确定</el-button>
               </span>
			</el-dialog>

			<mt-datetime-picker ref="endMensesPicker" type="date" v-model="endMensesValues" @confirm="handleEndMensesConfirm">
			</mt-datetime-picker>

			<mt-datetime-picker ref="birthPicker" type="date" :startDate="startBirthDate" :endDate="endBirthDate" v-model="birthValues" @confirm="handleBirthConfirm">
			</mt-datetime-picker>

			<button class="btn-signOut" @click="signOut">退出登录</button>

			<!--//在父组件ok自定义事件中回调传入的是一个对象 {province:'天津市',city:河西区,town:''});//键名分别在左侧，如果town没有则返回一个空字符串-->
		</div>
	</div>
</template>

<script>
	import lianDong from '@/components/person/lianDong';
	export default {
		data() {
			return {
				userId: localStorage.getItem('userId'), //用户id
				userRole: localStorage.getItem('userRole'), //用户角色

				userInfo: '', //用户信息
				userIcon: '', //用户头像
				userName: '', //昵称
				userAddress: '', //地址
				lastMenstruation: '', //末次月经
				userBirthday: '', //生日
				dialogVisible: false,
				nickName: localStorage.getItem('userName'), //昵称
				state: '',
				stateDialog: false,
				birthValues: '',
				endMensesValues: '',
				yourBirth: '', //生日
				endMenses: '', //末次月经
				isSelectEndMenses: false,
				isSelectBirth: false,
				startBirthDate: new Date('1970-01-01'),
				endBirthDate: new Date(),
				states: [{
					value: '选项1',
					label: '孕育中'
				}],
			}
		},
		components: {
			lianDong,

		},

		created() {
			this.state = this.states[0];
		},

		mounted() {
			this.getUserInfo();
		},

		updated() {

		},

		methods: {
			/**
			 * 返回上一级路由
			 */
			goBack() {
				this.modifyInfo(false);
				this.$router.go(-1);
			},

			/**
			 * 退出登录
			 */
			signOut() {
				localStorage.clear();
//				localStorage.removeItem('userId');
				this.$router.push({
					path: '/'
				})
			},

			/**
			 * 获取用户基本信息接口
			 */
			getUserInfo() {
				this.axios.post('/userControllerAPI/fourthMenu', {
					userId: this.userId, //用户id
					userRole: this.userRole, //用户角色
				}).then((response) => {
					console.log(response.data);
					if(response.data.resultCode == 200) {
						//获取信息成功
						this.userInfo = response.data.user
					}

				}).catch((error) => {
					console.log(error);
				});
			},

			/**
			 * 信息编辑接口
			 */
			infoEdit() {
				this.axios.post('/userControllerAPI/userInfoEdit', {
					userId: this.userId, //用户id
					userRole: this.userRole, //用户角色
					userName: this.userName, //昵称
					userAddress: this.userAddress, //地址
					lastMenstruation: this.lastMenstruation, //末次月经
					userBirthday: this.userBirthday, //生日
				}).then((response) => {
					console.log(response.data);
					if(response.data.resultCode == 200) {
						//获取信息成功
						alert('修改信息成功');
					} else {
						alert('修改信息失败');
					}

				}).catch((error) => {
					console.log(error);
				});
			},

			/**
			 * 上传头像成功后修改个人头像信息
			 */
			handleSuccess(response, file, fileList) {
				this.userIcon = response.filepath;
				this.modifyInfo(true); //上传头像
				console.log(response.url);
			},
			/**
			 * 修改个人信息
			 */
			modifyInfo(isShow) {
				var _this = this;
				if(_this.dialogVisible && _this.nickName == '') {
					return alert('请输入昵称');
				}
				this.axios.post('/userControllerAPI/userInfoEdit', {
					userId: _this.userId, //用户id
					userRole: _this.userRole, //用户角色
					userIcon: _this.userIcon, //用户头像
					userName: _this.nickName, //用户名称
					userAddress: _this.userAddress, //用户地址
					lastMenstruation: _this.endMenses, //末次月经
					userBirthday: _this.yourBirth, //用户生日
				}).then(function(response) {
					if(response.data.resultCode == 200) {
						if(isShow) {
							alert('修改成功');
						}
						localStorage.setItem('userName', _this.nickName);
						_this.getUserInfo(); //刷新数据源
						_this.dialogVisible = false; //隐藏修改昵称的弹框
					} else {
						alert(response.data.resultMsg)
					}
				}).catch(function(error) {
					alert(error);
				});
			},

			openBirthPicker() {
				this.$refs.birthPicker.open();
			},

			handleBirthConfirm(value) {
				this.yourBirth = this.getFormatDate(value);
				this.isSelectBirth = true;
			},
			openEndMensesPicker() {
				this.$refs.endMensesPicker.open();
			},
			handleEndMensesConfirm(value) {
				this.endMenses = this.getFormatDate(value);
				this.isSelectEndMenses = true;
			},

			/**
			 * 获取格式化后的日期
			 * @param data
			 * @returns {string}
			 */
			getFormatDate(data) {
				var y = data.getFullYear();
				var m = data.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = data.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = data.getHours();
				var minute = data.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				return y + '-' + m + '-' + d + ' ';
			},

			/**
			 * 换算时间为hh:mm:ss
			 * 
			 * time   毫秒时间戳
			 */
			getFormatDate(time) {
				var data = new Date(time);
				var year = data.getFullYear();
				var month = data.getMonth() + 1;
				month = month < 10 ? ('0' + month) : month;
				var day = data.getDate();
				day = day < 10 ? ('0' + day) : day;
				var hour = data.getHours();
				hour = hour < 10 ? ('0' + hour) : hour;
				var minute = data.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				var second = data.getSeconds();
				second = second < 10 ? ('0' + second) : second;
				return year + '-' + month + '-' + day;
			},

			pickCall: function(address) {
				this.userAddress = address;
			}

		}
	}
</script>

<style scoped>
	@import url("../../style/userInfo.css");
</style>

<style scoped>
	.el-upload-list {
		display: none;
	}
</style>