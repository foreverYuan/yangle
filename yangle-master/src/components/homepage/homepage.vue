<template>
	<div class="homepage" style="margin: 0;">
		<div class="top">
			<mt-header :title="babyStatus.pregnancyWeek" style="background: rgb(252, 159, 215);">
				<mt-button @click="signIn()" slot="left">签到</mt-button>
				<!--<mt-button @click="" slot="right">
					<img src="../../assets/camera_icon.png" style="width: 1.5rem;" />
				</mt-button>-->
			</mt-header>
			<img src="../../assets/image/tuiYuanXing.png" style="width:100%;margin-top: -9%;" alt="">
			<div style="width:100%;text-align:center;">
				<img :src="babyStatus.badyPicture" style="width:25%;margin-top:-15%;matgin-left:auto;margin-right:auto;" alt="">
			</div>
			<div class="tip-left">
				<p>我还没有<br> 形态呢
				</p>
			</div>
			<div class="tip-right">
				<p>请耐心<br>等候</p>
			</div>
		</div>
		<div class="div_content">
			<!-- 孕期描述 start -->
			<transition enter-active-class="animated bounceInDown">
				<!--动画效果放于transition中 -->
				<div v-if='isShow' class="grad">
					<h3 class="h_pd_title">妈妈，我们还有{{babyStatus.babyBirth}}就能见面啦</h3>
					<div style="text-align: center;">
						<button style="background: none;border:0;" @click="c1"><img  src="../../assets/image/xiangXIAJianTou.png" style="width:1rem;" alt=""></button>
					</div>
				</div>
			</transition>
			<div class="div_pg_desc_task" v-if="isShow2">
				<!--<div v-for="item in pregnancyDesc" class="grad2">
					<span>{{item.title}}</span>
					<span>{{item.content}}</span>
				</div>-->
				<div class="grad2">
					<span>胎儿发育:</span>
					<span>{{babyStatus.developFetal}}</span>
				</div>
				<div class="grad2">
					<span>妈妈变化:</span>
					<span>{{babyStatus.motherChange}}</span>
				</div>
				<div style="text-align: center;">
					<button style="background: none;border:0;" @click="c2"><img  src="../../assets/image/xiangShangJianTou.png" style="width:1rem;" alt=""></button>
				</div>
				<!-- 孕期描述 end -->
			</div>
			<!-- 任务列表  start -->
			<div style="background-color:rgb(246,246,246);padding: 0.6rem 0;" @click="goTask">
				<div style="background-color:white;padding: 0.6rem;">
					<p style="margin:0;">
						<span style="color: #ffd8d5;">今日任务</span>
						<span style="float: right;">
					<!--<span style="color: #aaa;">开始任务</span>
						<span class="el-icon-arrow-right"></span>-->
						</span>
					</p>
					<ul v-for="item in taskList" class="ul-task">
						<li>
							<span>{{item.taskName}}</span>
							<div style="float: right;align-items: center;">
								<span v-if="item.taskStatus == 2">
							       <img src="../../assets/icon_yes.png"/>
							       <span style="color: #EC9FDC;">已完成</span>
								</span>
								<span v-if="item.taskStatus == 1">
							       <img src="../../assets/go.png"/>
							       <span style="color: #EC9FDC;">去完成</span>
								</span>
								<span v-if="item.taskStatus == 0">
							       <img src="../../assets/task_locking.png"/>
							       <span style="color: #AAA;">未解锁</span>
								</span>
							</div>
						</li>
					</ul>
					<p style="color: #bbb;margin-top: 2rem;align-items: center;">
						<img src="../../assets/horn.png" style="width: 1rem;height: 1rem;" />
						<span style="font-size: 0.9rem;">{{tip.tipContent}}</span>
					</p>
				</div>
			</div>
			<!-- 任务列表  end -->

			<!-- 孕期知识 start -->
			<div style="width: 100%;height: 10rem;">
				<mt-swipe :auto="3000">
					<mt-swipe-item>
						<img src="../../assets/pregnancy_knowledge_big.png" style="width: 100%;height: 100%;" />
					</mt-swipe-item>
					<mt-swipe-item>
						<img src="../../assets/pregnancy_knowledge_big.png" style="width: 100%;height: 100%;" />
					</mt-swipe-item>
					<mt-swipe-item>
						<img src="../../assets/pregnancy_knowledge_big.png" style="width: 100%;height: 100%;" />
					</mt-swipe-item>
				</mt-swipe>
				<!--<img src="../../assets/pregnancy_knowledge_big.png" style="width: 100%;" />-->
				<div class="div_pg_know_list">
					<p>
						<span class="span_today_knowledge" style="font-weight: bold;">今日知识</span>
						<!--<span style="float: right;"><span style="color: #aaa;" @click="goMoreKnow">更多知识</span><span class="el-icon-arrow-right"></span></span>-->
					</p>
					<ul v-for="item in knowledgeList">
						<li style="display: flex;">
							<img :src="item.knowPicture" class="img_pg_konw" />
							<div class="div_pg_know">
								<h3>{{item.knowName}}</h3>
								<p class="desc">{{item.knowContent}}</p>
								<span style="color: #ffd8d5;">{{item.tip}}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<!-- 孕期知识 end -->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'homepage',
		data() {
			return {
				isShow: false,
				isShow2: false,
				borthday: '12',
				//孕期描述
				pregnancyDesc: [{
						"title": "胎儿发育:",
						"content": "现在精子和卵子尚未结合,胎儿尚未形成。卵子直径约0.2毫米,成熟的精子约50微米长，它们分别存在于你和你的伴侣体内。"
					},
					{
						"title": "妈妈变化:",
						"content": "此时的你还处于末次月经进行的时候，没有怀孕，所以并没有明显的形状。胎儿现在还是以精子和卵子的状态存在你和准爸爸的体内，如果这个月受孕成功，那么下次来月经将。"
					}
				],
				//今日任务
				taskkList: [{
						"title": "吃几个核桃",
						"finish_state": "1"
					},
					{
						"title": "喝多少牛奶",
						"finish_state": "2"
					},
					{
						"title": "睡几个钟头",
						"finish_state": "3"
					},
				],
				//今日知识
				knowList: [{
						"img": "../../assets/pregnancy_knowledge_small.png",
						"title": "孕期的日常运动是不是必要的?",
						"desc": "经专家分析，孕妇怀孕期间可以进行适量的运动，这样有利于胎儿的健康，也能减少母亲分娩",
						"tip": "孕期护理#"
					},
					{
						"img": "../../assets/pregnancy_knowledge_small.png",
						"title": "孕期的日常运动是不是必要的?",
						"desc": "经专家分析，孕妇怀孕期间可以进行适量的运动，这样有利于胎儿的健康，也能减少母亲分娩",
						"tip": "孕期护理#"
					},
					{
						"img": "../../assets/pregnancy_knowledge_small.png",
						"title": "孕期的日常运动是不是必要的?",
						"desc": "经专家分析，孕妇怀孕期间可以进行适量的运动，这样有利于胎儿的健康，也能减少母亲分娩",
						"tip": "孕期护理#"
					}
				],

				/* 首页接口  start */
				/* 请求参数 */
				//				pregnancyDate: localStorage.getItem("pregnancyDate"), //预产日期
				userId: localStorage.getItem('userId'), //用户id
				userRole: localStorage.getItem('userRole'), //用户角色
				/* 返回参数 */
				carouselList: '', //轮播列表数据
				tip: '', //任务提示语
				babyStatus: '', //婴儿状态
				knowledgeList: '', //知识列表
				taskList: '', //任务列表
				/* 首页接口  end */
			}
		},

		created() {
			//获取首页数据
			this.getHomeData();
		},
		mounted() {
			this.isShow = true;
		},
		watch: {

		},
		methods: {
			c1() {
				this.isShow = false;
				this.isShow2 = true;
			},
			c2() {
				this.isShow = true;
				this.isShow2 = false;
			},
			/**
			 * 跳转任务页
			 */
			goTask() {
				this.$router.push({
					path: '/todayTask'
				})
			},
			getPregnancyDate() {

			},
			/**
			 * 跳转更多知识
			 */
			goMoreKnow() {
				this.noOpen();
			},
			/**
			 * 首页
			 */
			getHomeData() {
				var _this = this;
				this.axios.post('/pregnancy/firstMenu', {
					birthday: localStorage.getItem('yourBirth'),
					lastMenstruation: localStorage.getItem('endMenses'),
					pregnancyDate: localStorage.getItem("pregnancyDate"), //预产日期,必填
					equipmentId: _this.base_uuid,
					userId: this.userId, //用户id,非必填
				}).then((response) => {
					console.log(response.data);
					if(response.data.resultCode == 200) {
						//成功
						this.carouselList = response.data.sowMapList, //轮播列表数据
							this.tip = response.data.tip, //任务提示语
							this.taskList = response.data.taskList, //任务列表
							this.babyStatus = response.data.BabyStatus, //婴儿状态
							this.knowledgeList = response.data.knowledgeList //知识列表
					}
				}).catch((error) => {
					//失败
					console.log(error);
				});

			},

			/**
			 * 签到
			 */
			signIn() {
				this.axios.post('/pregnancy/sign', {
					userId: this.userId, //用户id
					userRole: this.userRole, //用户角色
				}).then((response) => {
					if(response.data.resultCode == 200) {
						//成功
						alert(response.data.resultMsg);
					} else {
						alert(response.data.resultMsg);
					}
				}).catch((error) => {
					//失败
					console.log(error);
				});
			}
		}
	}
</script>

<style scoped>
	@import url("../../style/homepage.css");
	.grad {
		height: 100%;
		background: -webkit-linear-gradient(left, #FFF8FC, #FFC3E7, #FFF8FC);
		/* Safari 5.1 - 6.0 */
		/* background: -o-linear-gradient(right, red, blue); Opera 11.1 - 12.0 */
		/* background: -moz-linear-gradient(right, red, blue); Firefox 3.6 - 15 */
		background: linear-gradient(to right, #FFF8FC, #FFC3E7, #FFF8FC);
		/* 标准的语法 */
	}
	
	.grad2 {
		height: 5rem;
		background: -webkit-linear-gradient(left, #FFF9FD, #FDB7E1, #FFF9FD);
		/* Safari 5.1 - 6.0 */
		/* background: -o-linear-gradient(right, red, blue); Opera 11.1 - 12.0 */
		/* background: -moz-linear-gradient(right, red, blue); Firefox 3.6 - 15 */
		background: linear-gradient(to right, #FFF9FD, #FDB7E1, #FFF9FD);
		/* 标准的语法 */
	}
	
	.top {
		width: 100%;
		position: relative;
		/* background: url('../../assets/camera_icon.png'); */
	}
	
	.tip-left {
		background: rgb(252, 197, 230);
		text-align: center;
		font-size: 0.85rem;
		padding: 0.5rem;
		width: 4rem;
		height: 4rem;
		position: absolute;
		left: 10%;
		top: 18%;
		border-radius: 50%;
		animation: float13 20s infinite linear;
	}
	
	.tip-right {
		background: rgb(252, 197, 230);
		text-align: center;
		font-size: 0.85rem;
		padding: 0.5rem;
		width: 4rem;
		height: 4rem;
		position: absolute;
		right: 10%;
		top: 25%;
		border-radius: 50%;
		animation: float13 20s infinite linear;
	}
</style>