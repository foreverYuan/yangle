<template>
	<div class="homepage" style="margin: 0;">
		<div class="top">
			<mt-header :title="babyStatus.pregnancyWeek" style="background: rgb(252, 159, 215);">
				<mt-button @click="showSignDialog" slot="left">签到</mt-button>
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
					<ul v-for="item in taskkList" class="ul-task">
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

		<el-dialog :visible.sync="dialogVisible">
			<div class="div-sign-dialog">
				<div class="div-days">
					<h1>{{lianxuSignDays}}</h1>
					<p>连续签到天数</p>
				</div>
				<div class="div-today">
					<span>今日{{getIntegralState}}获得</span>
					<span><img src="../../assets/my_integral.png" style="width: 1rem;"/><span style="color: #FC9FD7;">x{{todayIntegral}}</span><span>积分</span></span>
					<!--<div style="text-align: left;width: 80%;height: 10rem;position: absolute;">
						<img src="../../assets/integral3-red.png" id="integral3-red" />
						<img src="../../assets/integral_line_red.png" class="integral-horizontal-line" />
						<img src="../../assets/integral3-red.png" id="integral3-red" />
						<img src="../../assets/integral_line_red.png" class="integral-horizontal-line" />
						<img src="../../assets/integral3-red.png" id="integral3-red" />
						<img src="../../assets/integral_line_red.png" class="integral-vertical-line" />
						<img src="../../assets/integral3-red.png" id="integral3-red" class="integral-vertical-pic" />
						<img src="../../assets/integral_line_red.png" class="integral-vertical-line" />
						<img src="../../assets/integral3-red.png" id="integral3-red" class="integral-vertical-pic" />

						<div style="margin-top:-10%">
							<img src="../../assets/integral20-red.png" id="integral3-red" />
							<img src="../../assets/integral_line_red.png" class="integral-horizontal-line" style="margin-left: -7%;" />
							<img src="../../assets/integral15-red.png" id="integral3-red" />
							<img src="../../assets/integral_line_red.png" class="integral-horizontal-line" style="margin-left: -7%;" />
						</div>
						<img src="../../assets/integral3-red.png" />
					</div>-->
				</div>
				<img src="../../assets/sign-close.png" style="position: absolute;top: -1rem;right: -1rem;" @click="dialogVisible = false" />
			</div>
				<canvas id="myCanvas" width="screenWidth * 15/5 * 3" height="screenHeight * 7/4 * 3" style="width: screenWidth * 15/5;height: screenHeight * 7/4;"></canvas>
			<!--<el-button @click="dialogVisible = false">已签到</el-button>-->
			<el-button @click="signIn" class="btn-sign sign" v-if="isTodaySign == 0">签到</el-button>
			<el-button @click="signIn" class="btn-sign signed" v-if="isTodaySign == 1">已签到</el-button>
		</el-dialog>
		<div style="display: none;">
			<img src="../../assets/integral3-red.png" id="integral0-red"/>
			<img src="../../assets/integral3-gray.png" id="integral0-gray" />
			<img src="../../assets/integral5-red.png" id="integral1-red" />
			<img src="../../assets/integral5-gray.png" id="integral1-gray" />
			<img src="../../assets/integral10-red.png" id="integral2-red" />
			<img src="../../assets/integral10-gray.png" id="integral2-gray" />
			<img src="../../assets/integral15-red.png" id="integral3-red" />
			<img src="../../assets/integral15-gray.png" id="integral3-gray" />
			<img src="../../assets/integral20-red.png" id="integral4-red" />
			<img src="../../assets/integral20-gray.png" id="integral4-gray" />
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
						"taskName": "吃几个核桃",
						"taskStatus": "0"
					},
					{
						"taskName": "喝多少牛奶",
						"taskStatus": "1"
					},
					{
						"taskName": "睡几个钟头",
						"taskStatus": "2"
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
				dialogVisible: false,
				getIntegralState: '可',
				integralPic: new Array(7),
				imgReds: new Array(5),
				imgGrays: new Array(5),
				lineColor: ['#FF98E0', '#E8E8E8'],
				fontColor: ['#333333', '#aaaaaa'],
				todayIntegral: 3, //今日可获得的积分 
				lianxuSignDays: 2, //连续签到天数   需后台返回，暂时先写在这里   todo
				isTodaySign: 0, //今日是否已签到   需后台返回，暂时先写在这里   todo
				signPicRed: ["../../assets/integral3-red.png", "../../assets/integral5-red.png", "../../assets/integral10-red.png", "../../assets/integral15-red.png", "../../assets/integral20-red.png"],
				signPicGray: ["../../assets/integral3-gray.png", "../../assets/integral5-gray.png", "../../assets/integral10-gray.png", "../../assets/integral15-gray.png", "../../assets/integral20-gray.png"],
				screenWidth: window.screen.width,
				screenHeight: window.screen.height,
			}
		},

		created() {
			//获取首页数据
			this.getHomeData();
//			alert(window.screen.width);
//			alert(window.screen.height);
//			alert(window.devicePixelRatio);
		},
		mounted() {
			this.isShow = true;
			console.log('aaaaaa', window.screen.width); 
			console.log('bbbbbb', window.screen.height);
			//			this.drawSignIntegral();
		},
		updated() {
			this.$nextTick(function() {
				if(this.dialogVisible) {
					this.showSign();
				}
			})

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
				if(this.userId == null || this.userId == '') {
					return this.jumpNormalRouter('/login');
				}
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
							localStorage.setItem('pregnancyWeek', this.babyStatus.pregnancyWeek);
					}
				}).catch((error) => {
					//失败
					console.log(error);
				});

			},

			/**
			 * 显示签到弹框
			 */
			showSignDialog() {
				if(this.userId == null || this.userId == '') {
					return this.jumpNormalRouter('/login');
				}
				this.dialogVisible = true;
				this.getSignIntegral();
				this.getSignInfo();
			},

			/**
			 * 获取连续签到的积分
			 */
			getSignIntegral() {
				switch(this.lianxuSignDays) {
					case 0:
						this.todayIntegral = 3;
						break;

					case 1:
						this.todayIntegral = 3;
						break;

					case 2:
						this.isTodaySign == 1 ? this.todayIntegral = 3 : 5;
						break;

					case 3:
						this.isTodaySign == 1 ? this.todayIntegral = 5 : 5;
						break;

					case 4:
						this.isTodaySign == 1 ? this.todayIntegral = 5 : 10;
						break;

					case 5:
						this.isTodaySign == 1 ? this.todayIntegral = 10 : 15;
						break;

					case 6:
						this.isTodaySign == 1 ? this.todayIntegral = 15 : 20;
						break;

				}
				this.isTodaySign == 1 ? this.getIntegralState = '已' : '可';
			},

			/**
			 * 关于签到的显示
			 */
			showSign() {
				var c = document.getElementById("myCanvas");
				var ctx = c.getContext("2d");
//				ctx.scale(2, 2);
				var index;
				var space = 5;
				for(var i = 0; i < this.imgReds.length; i++) {
					this.imgReds[i] = document.getElementById("integral" + i + "-red");
				}
				for(var i = 0; i < this.imgGrays.length; i++) {
					this.imgGrays[i] = document.getElementById("integral" + i + "-gray");
				}
				var xPicCoor = [space, c.width / 2 - this.imgReds[0].width / 2, c.width - this.imgReds[0].width - space];
				var yPicCoor = [0, c.height / 2 - this.imgReds[0].height / 2, c.height - this.imgReds[0].height];
				var xLineCoor = [space + this.imgReds[0].width - space, c.width / 2 - this.imgReds[0].width / 2, c.width / 2 + this.imgReds[0].width / 2 - space,
					c.width - this.imgReds[0].width - space, c.width - this.imgReds[0].width / 2 - space
				];
				var yLineCoor = [this.imgReds[0].height / 2, this.imgReds[0].height - 3, c.height / 2 - this.imgReds[0].height / 2, c.height / 2 + this.imgReds[0].height / 2 - 3,
					c.height - this.imgReds[0].height, c.height - this.imgReds[0].height / 2
				];
				var dayText = ['第1天', '第2天', '第3天', '第4天', '第5天', '第6天', '第7天'];
				var fontSpace = [15, 5];

				ctx.lineWidth = 5;
				ctx.strokeStyle = this.lineColor[0];
				ctx.fillStyle = this.fontColor[0];
				this.integralPic[0] = this.imgReds[0];
				/*第一天*/
				ctx.drawImage(this.integralPic[0], xPicCoor[0], yPicCoor[0]);
				ctx.fillText(dayText[0], xPicCoor[0], this.imgReds[0].height + fontSpace[0]);

				this.setDrawStyle(1, 0, ctx);
				/*第二天*/
				ctx.moveTo(xLineCoor[0], yLineCoor[0]);
				ctx.lineTo(xLineCoor[1], yLineCoor[0]);
				ctx.drawImage(this.integralPic[1], xPicCoor[1], yPicCoor[0]);
				ctx.fillText(dayText[1], xPicCoor[1], this.imgReds[0].height + fontSpace[0]);
				ctx.stroke();
				ctx.fill();

				this.setDrawStyle(2, 1, ctx);
				/*第三天*/
				ctx.moveTo(xLineCoor[2], yLineCoor[0]);
				ctx.lineTo(xLineCoor[3], yLineCoor[0]);
				ctx.drawImage(this.integralPic[2], xPicCoor[2], yPicCoor[0]);
				ctx.fillText(dayText[2], xPicCoor[2], this.imgReds[0].height + fontSpace[0]);
				ctx.stroke();
				ctx.fill();

				this.setDrawStyle(3, 1, ctx);
				/*第四天*/
				ctx.moveTo(xLineCoor[4], yLineCoor[1]);
				ctx.lineTo(xLineCoor[4], yLineCoor[2]);
				ctx.drawImage(this.integralPic[3], xPicCoor[2], yPicCoor[1]);
				ctx.fillText(dayText[3], xPicCoor[2] - this.imgReds[0].width, yPicCoor[1] + fontSpace[0]);
				ctx.stroke();
				ctx.fill();

				this.setDrawStyle(4, 2, ctx);
				/*第五天*/
				ctx.moveTo(xLineCoor[4], yLineCoor[3]);
				ctx.lineTo(xLineCoor[4], yLineCoor[4]);
				ctx.drawImage(this.integralPic[4], xPicCoor[2], yPicCoor[2]);
				ctx.fillText(dayText[4], xPicCoor[2], yPicCoor[2] - fontSpace[1]);
				ctx.stroke();
				ctx.fill();

				this.setDrawStyle(5, 3, ctx);
				/*第六天*/
				ctx.moveTo(xLineCoor[2], yLineCoor[5]);
				ctx.lineTo(xLineCoor[3], yLineCoor[5]);
				ctx.drawImage(this.integralPic[5], xPicCoor[1], yPicCoor[2]);
				ctx.fillText(dayText[5], xPicCoor[1], yPicCoor[2] - fontSpace[1]);
				ctx.stroke();
				ctx.fill();

				this.setDrawStyle(6, 4, ctx);
				/*第七天*/
				ctx.moveTo(xLineCoor[0], yLineCoor[5]);
				ctx.lineTo(xLineCoor[1], yLineCoor[5]);
				ctx.drawImage(this.integralPic[6], xPicCoor[0], yPicCoor[2]);
				ctx.fillText(dayText[6], xPicCoor[0], yPicCoor[2] - fontSpace[1]);
				ctx.stroke();
				ctx.fill();
			},

			/**
			 * 设置绘制的样式
			 */
			setDrawStyle(lianxuDays, index, ctx) {
				if(this.lianxuSignDays < lianxuDays || (this.lianxuSignDays == lianxuDays && this.isTodaySign)) {
					this.integralPic[lianxuDays] = this.imgGrays[index];
					ctx.strokeStyle = this.lineColor[1];
					ctx.fillStyle = this.fontColor[1];
				} else {
					this.integralPic[lianxuDays] = this.imgReds[index];
					ctx.strokeStyle = this.lineColor[0];
					ctx.fillStyle = this.fontColor[0];
				}
				ctx.beginPath();
			},

			/**
			 * 获取签到信息的接口
			 */
			getSignInfo() {
				this.axios.post('/pregnancy/signInfo', {
					userId: this.userId, //用户id
					userRole: this.userRole, //用户角色
				}).then((response) => {
					if(response.data.resultCode == 200) {
						//成功
						this.lianxuSignDays = response.data.signSerialTimes; //连续签到的天数
						this.isTodaySign = response.data.isSign; //今日是否签到
//						alert(response.data.resultMsg);
					} else {
						//						alert(response.data.resultMsg);
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
				if(this.isTodaySign) {
					return alert('今日已签到');
				}
				this.axios.post('/pregnancy/sign', {
					userId: this.userId, //用户id
					userRole: this.userRole, //用户角色
				}).then((response) => {
					if(response.data.resultCode == 200) {
						//成功
//						alert(response.data.resultMsg);
                    this.getSignInfo();
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
</style>

<style>
	.homepage .grad {
		height: 100%;
		background: -webkit-linear-gradient(left, #FFF8FC, #FFC3E7, #FFF8FC);
		/* Safari 5.1 - 6.0 */
		/* background: -o-linear-gradient(right, red, blue); Opera 11.1 - 12.0 */
		/* background: -moz-linear-gradient(right, red, blue); Firefox 3.6 - 15 */
		background: linear-gradient(to right, #FFF8FC, #FFC3E7, #FFF8FC);
		/* 标准的语法 */
	}
	
	.homepage .grad2 {
		height: 5rem;
		background: -webkit-linear-gradient(left, #FFF9FD, #FDB7E1, #FFF9FD);
		/* Safari 5.1 - 6.0 */
		/* background: -o-linear-gradient(right, red, blue); Opera 11.1 - 12.0 */
		/* background: -moz-linear-gradient(right, red, blue); Firefox 3.6 - 15 */
		background: linear-gradient(to right, #FFF9FD, #FDB7E1, #FFF9FD);
		/* 标准的语法 */
	}
	
	.homepage .top {
		width: 100%;
		position: relative;
		/* background: url('../../assets/camera_icon.png'); */
	}
	
	.homepage .tip-left {
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
	
	.homepage .tip-right {
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
	
	.homepage .el-dialog {
		width: 80%;
		height: 53%;
		border-radius: 10px;
	}
	
	.homepage .el-dialog__headerbtn .el-dialog__close {
		display: none;
	}
</style>