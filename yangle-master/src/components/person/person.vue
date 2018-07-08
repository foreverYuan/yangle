<template>
	<div class="person">
		<!--<button  class="btn-goLogin" @click="goLogin">请登录</button>
		<p style="color: #aaa;">您还没有登录，请登录</p>-->
		<!-- <clicked></clicked> -->
		<div class="div-top">
			<span class="float-right span-modify" @click="goUserInfo">修改</span>
			<div style="padding-top: 0.6rem;padding-bottom: 0.5rem;">
				<h3 style="margin-left: 5.5rem;font-size: 1.2rem;color: #333;">{{pregnancyWeek}}</h3>
				<img src="../../assets/default-header-pic.jpg" class="userIcon" v-if="userIcon == null && userIcon == ''"/>
				<img :src="userIcon" class="userIcon" v-if="userIcon != null && userIcon != ''"/>
				
				<p class="p-userName">{{userName}}</p>
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
				<div class="div-small-block div-padding-top" @click="this.noOpen">
					<img src="../../assets/my_order.png" style="height: 1.5rem;" />
					<p>我的订单</p>
				</div>
				<div class="div-small-block div-padding-top" @click="this.noOpen">
					<img src="../../assets/my_integral.png" style="height: 1.5rem;" />
					<p>我的积分</p>
				</div>
				<div class="div-small-block div-padding-top" @click="this.noOpen">
					<img src="../../assets/my_message.png" style="height: 1.5rem;" />
					<p>我的消息</p>
				</div>
				<div class="div-small-block div-padding-top" @click="this.noOpen">
					<img src="../../assets/my_collect.png" style="height: 1.5rem;" />
					<p>我的收藏</p>
				</div>
			</div>

			<div class="div-service-other">
				<div class="div-service">
					<p class="p-title">服务</p>
					<div class="div-big-block">
						<div class="div-small-block" @click="this.noOpen">
							<img src="../../assets/community.png" />
							<p>社区</p>
						</div>
						<div class="div-small-block" @click="this.noOpen">
							<img src="../../assets/shopping_mall.png" />
							<p>商城</p>
						</div>
					</div>
				</div>
				<div class="div-other">
					<p class="p-title">其他</p>
					<div class="div-big-block">
						<div class="div-small-block" @click="this.noOpen">
							<img src="../../assets/person_recommend.png" />
							<p>推荐</p>
						</div>
						<div class="div-small-block" @click="this.noOpen">
							<img src="../../assets/person_feedback.png" />
							<p>意见反馈</p>
						</div>
						<div class="div-small-block" @click="this.noOpen">
							<img src="../../assets/person_system_setting.png" />
							<p>系统设置</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import clicked from '../clickComponents/click'
	export default {
		name: 'person',
		components: {
			// clicked
		},
		data() {
			return {
				userId: localStorage.getItem('userId'), //用户id
				userName: localStorage.getItem('userName'), //用户昵称
				userIcon: localStorage.getItem('userIcon'), //用户头像
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
				pregnancyWeek: localStorage.getItem('pregnancyWeek'), //孕育时长
			}
		},
		created() {
			//如果userId为空就跳转登录页
			if(this.userId == null || this.userId == "") {
				this.jumpRouterById('/login', this.jumpRouterIds[1]);
			}
		},
		mounted() {

		},
		watch: {

		},
		methods: {
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
			}
		}
	}
</script>

<style scoped>
	@import url("../../style/person.css");
</style>

<style scoped>
	.person p {
		-webkit-margin-before: 0.5em;
	}
</style>