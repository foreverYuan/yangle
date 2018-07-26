<template>
	<div class="person">
		<!--<button  class="btn-goLogin" @click="goLogin">请登录</button>
		<p style="color: #aaa;">您还没有登录，请登录</p>-->
		<!-- <clicked></clicked> -->
		<div class="div-top">
			<span class="float-right span-modify" @click="goUserInfo">修改</span>
			<div style="padding-top: 0.6rem;padding-bottom: 0.5rem;">
				<h3 style="margin-left: 5.5rem;font-size: 1.3rem;color: #FCFCFC;font-weight: normal;">{{pregnancyWeek}}</h3>
				<img src="../../assets/default-header-pic.jpg" class="userIcon" v-if="userInfo == '' || userInfo.userIcon == undefined || userInfo.userIcon == null || userInfo.userIcon == ''" />
				<img :src="userInfo.userIcon" class="userIcon" v-if="userInfo != '' && userInfo.userIcon != undefined && userInfo.userIcon != null && userInfo.userIcon != ''" />

				<p class="p-userName">{{userInfo.userName}}</p>
				<p class="p-state">孕育中</p>
			</div>
		</div>

		<!--<div class="div-detail">
			<p @click="goMyJf"><img src="../../assets/integral.png" /><span>我的积分</span><span class="el-icon-arrow-right float-right"></span></p>
			<p @click="goMyDd"><img src="../../assets/order.png" /><span>我的订单</span><span class="el-icon-arrow-right float-right"></span></p>
			<p @click="goMyXx"><img src="../../assets/message.png" /><span>我的消息</span><span class="el-icon-arrow-right float-right"></span></p>
			<p @click="goMySc"><img src="../../assets/collect.png" /><span>我的收藏</span><span class="el-icon-arrow-right float-right"></span></p>
			<p @click="goRecommend"><img src="../../assets/recommend.png" /><span>推荐给好友</span><span class="el-icon-arrow-right float-right"></span></p>
			<p @click="goYjfk"><img src="../../assets/feedback.png" /><span>意见反馈</span><span class="el-icon-arrow-right float-right"></span></p>
			<p @click="goSetting"><img src="../../assets/setting.png" /><span>系统设置</span><span class="el-icon-arrow-right float-right"></span></p>
		</div>-->

		<div class="div-detail" style="margin-top: -3rem;">
			<div class="div-my-info">
				<div class="div-small-block div-padding-top " @click="toast">
					<img src="../../assets/my_order.png" style="height: 1.5rem;" />
					<p>我的订单</p>
				</div>
				<div class="div-small-block div-padding-top" @click="toast">
					<img src="../../assets/my_integral.png" style="height: 1.5rem;" />
					<p>我的积分</p>
				</div>
				<div class="div-small-block div-padding-top" @click="toast">
					<img src="../../assets/my_message.png" style="height: 1.5rem;" />
					<p>我的消息</p>
				</div>
				<div class="div-small-block div-padding-top" @click="toast">
					<img src="../../assets/my_collect.png" style="height: 1.5rem;" />
					<p>我的收藏</p>
				</div>
			</div>

			<div class="div-service-other">
				<div class="div-service">
					<p class="p-title">服务</p>
					<div class="div-big-block">
						<div class="div-small-block" @click="toast">
							<img src="../../assets/community.png" />
							<p>社区</p>
						</div>
						<div class="div-small-block" @click="toast">
							<img src="../../assets/shopping_mall.png" />
							<p>商城</p>
						</div>
					</div>
				</div>
				<div class="div-other">
					<p class="p-title">其他</p>
					<div class="div-big-block">
						<div class="div-small-block" @click="toast">
							<img src="../../assets/person_recommend.png" />
							<p>推荐</p>
						</div>
						<div class="div-small-block" @click="toast">
							<img src="../../assets/person_feedback.png" />
							<p>意见反馈</p>
						</div>
						<div class="div-small-block" @click="toast">
							<img src="../../assets/person_system_setting.png" />
							<p>系统设置</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--<el-dialog title="提示" :visible.sync="dialogVisible" width="85%" style="margin-top: 15vh;">
		    <p style="font-size: 1.1rem;">此功能尚未开通，请耐心等待～</p>
			<el-button slot="footer" class="dialog-footer dialog-button" @click="hiddenDialog">确定</el-button>
		</el-dialog>-->
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		name: 'person',
		components: {
			// clicked
		},
		data() {
			return {
				userId: localStorage.getItem('userId'), //用户id
				userRole: localStorage.getItem('userRole'), //用户角色
				userName: localStorage.getItem('userName'), //用户昵称
				userIcon: localStorage.getItem('userIcon'), //用户头像
				userInfo: '', //用户信息
				personInfo: {
					myInfo: [{
							"image": "../../assets/my_order.png",
							"title": "我的订单"
						},
						{
							"image": "../../assets/my_integral.png",
							"title": "我的积分"
						},
						{
							"image": "../../assets/my_message.png",
							"title": "我的消息"
						},
						{
							"image": "../../assets/my_collect.png",
							"title": "我的收藏"
						}
					],
					service: [{
							"image": "../../assets/community.png",
							"title": "社区"
						},
						{
							"image": "../../assets/shopping_mall.png",
							"title": "商城"
						}
					],
					other: [{
							"image": "../../assets/person_recommend.png",
							"title": "推荐"
						},
						{
							"image": "../../assets/person_feedback.png",
							"title": "意见反馈"
						},
						{
							"image": "../../assets/person_system_setting.png",
							"title": "系统设置"
						}
					]

				},
				pregnancyWeek: !this.$route.query.pregnancyWeek ? localStorage.getItem('pregnancyWeek') : this.$route.query.pregnancyWeek, //孕育时长
				dialogVisible: false, //是否显示提示框
			}
		},
		created() {
			//如果userId为空就跳转登录页
			if(this.userId == null || this.userId == '' || this.userId == undefined) {
				this.jumpRouterById('/login', 4);
			} else {
				this.getUserInfo();
			}
			console.log("aaa", this.$route.query.pregnancyWeek);
		},

		methods: {
			toast() {
				let instance = Toast('此功能尚未开通，请耐心等待～');
				setTimeout(() => {
					instance.close();
				}, 2000);
			},
			/**
			 * 跳转登录页
			 */
			goLogin() {
				this.$router.push({
					path: '/login'
				});
			},

			/**
			 * 我的积分
			 */
			goMyJf() {
				this.noOpen();
			},

			/**
			 * 我的订单
			 */
			goMyDd() {
				this.noOpen();
			},

			/**
			 * 我的消息
			 */
			goMyXx() {
				this.noOpen();
			},

			/**
			 * 我的收藏
			 */
			goMySc() {
				this.noOpen();
			},

			/**
			 * 推荐给好友
			 */
			goRecommend() {
				this.noOpen();
			},

			/**
			 * 意见反馈
			 */
			goYjfk() {
				this.noOpen();
			},

			/**
			 * 系统设置
			 */
			goSetting() {
				this.noOpen();
			},

			/**
			 * 跳转至用户基本信息页
			 */
			goUserInfo() {
				this.$router.push({
					path: '/userInfo'
				})
			},

			/**
			 * 隐藏弹框
			 */
			hiddenDialog() {
				this.dialogVisible = false;
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
					} else {
						plus.nativeUI.alert(response.data.resultMsg);
					}
				}).catch((error) => {
					console.log(error);
				});
			},

		}
	}
</script>

<style scoped>
	@import url("../../style/person.css");
</style>

<style>
	.person .person p {
		-webkit-margin-before: 0.5em;
	}
	
	.person .el-dialog__body {
		padding: 0;
	}
	
	.person .el-dialog__headerbtn .el-dialog__close {
		display: none;
	}
	
	.person .el-dialog__footer {
		padding: 0;
		padding-bottom: 0.5rem;
	}
</style>