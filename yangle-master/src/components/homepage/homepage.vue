<template>
	<div class="homepage" style="margin: 0;">
		<div class="top">
			<mt-header style="background: none;">
				<!--:title="babyStatus.pregnancyWeek"-->
				<mt-button @click="showSignDialog" slot="right" style="color: #fff;padding-right: 3px;">签到
					<img src="../../assets/red-point.png" v-if="isTodaySign == 0 && userId != null && userId != null" class="sign-red-point" /></mt-button>
				<!--<mt-button @click="" slot="right">
					<img src="../../assets/camera_icon.png" style="width: 1.5rem;" />
				</mt-button>-->
			</mt-header>
			<img src="../../assets/1x/search-icon.png" style="position: absolute;top: 1rem;left: 18%;z-index: 1;" />
			<input placeholder="宝宝老是闹肚子怎么办?" class="home-search" @focus="focusInput" @blur="blurInput"/>

			<img src="../../assets/3x/home-top-background@3x.png" style="width:100%;height:12rem;margin-top: -13%;" alt="">
			<div style="width:100%;text-align:center;margin-top:-15%;">
				<!--<img :src="babyStatus.badyPicture" style="width:20%;matgin-left:auto;margin-right:auto;" alt="">-->
				<img src="../../assets/1x/baby.png" style="width:20%;matgin-left:auto;margin-right:auto;" alt="">
				<span class="block baby-name">诺诺宝贝</span>
			</div>
			<!--<div class="tip-left">
				<p>我还没有<br> 形态呢
				</p>
			</div>
			<div class="tip-right">
				<p>请耐心<br>等候</p>
			</div>-->
			<span class="tip-left">
				<div style="transform: rotate(-10deg);color: #fcfcfc;font-size: 0.8rem;width: 65%;padding-top: 0.2rem;">
				<span>{{babyStatus.developFetal}}</span>
		</div>
		</span>
	</div>
	<div class="div_content">
		<!-- 孕期描述 start -->
		<transition enter-active-class="animated bounceInDown">
			<!--动画效果放于transition中 -->
			<div v-if='isShow' class="grad">
				<h3 class="h_pd_title">妈妈,我们还有<span style="color: #FF8BC3;">{{babyStatus.babyBirth}}</span>就能见面啦</h3>
				<div style="text-align: center;">
					<button style="background: none;border:0;" @click="c1"><img src="../../assets/3x/home-down-arrow@3x.png" style="width:1rem;" alt=""></button>
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
				<button style="background: none;border:0;" @click="c2"><img  src="../../assets/double-top-arrow.png" style="width:1.2rem;" alt=""></button>
			</div>
			<!-- 孕期描述 end -->
		</div>
		<!-- 任务列表  start -->
		<div style="padding: 0.6rem 0;" @click="goTask" v-if="taskList != null && taskList.length > 0">
			<!--taskList.length > 0-->
			<!--todo-->
			<p class="task-tip">
				<img src="../../assets/3x/guanai@3x.png" />
				<span>{{tip.tipContent}}</span>
			</p>
			<div style="background-color:white;padding: 0.6rem;">
				<p style="margin:0;">
					<span class="home-title">今日任务</span>
					<span style="float: right;">
							<span style="color: #FE6EB6;">{{showTaskNum}}</span>
					<!--todo-->
					<span>/{{taskList.length}}</span>
					<!--todo-->
					<!--<span style="color: #aaa;">开始任务</span>
						<span class="el-icon-arrow-right"></span>-->
					</span>
				</p>
				<ul v-for="item in taskList" class="ul-task">
					<li style="display: flex;">
						<div style="width: 20%;">
							<img src="../../assets/3x/hetao@3x.png" id="task-left-pic" />   <!--item.taskPicture-->
						</div>
						<div style="width: 62%;">
							<span style="display: block;color: #ED6EB6;font-weight: bold;font-size: 1.15rem;">{{item.taskName}}</span>
							<span style="display: block;margin-top: 0.3rem;color: #999;font-size: 1rem;">{{item.taskContent}}</span>
						</div>
						<div style="align-items: center;width: 18%;">
							<span v-if="item.taskStatus == 2">
							       <!--<img src="../../assets/icon_yes.png"/>-->
							       <span style="color: #999;">已完成</span>
							</span>
							<span v-if="item.taskStatus == 1">
							       <!--<img src="../../assets/go.png"/>-->
							       <span style="color: #fff;background: #FE6EB6;padding: 0.1rem;border-radius: 0.3rem;">去完成
							       	<img src="../../assets/3x/go-complete-right-arrow@3x.png" style="width: 0.5rem;height: auto;margin-right: 0;"/></span>
							</span>
							<span v-if="item.taskStatus == 0">
							       <!--<img src="../../assets/task_locking.png"/>-->
							       <span style="color: #fff;background: #999;padding: 0.1rem;border-radius: 0.3rem;">未解锁
							       <img src="../../assets/3x/go-complete-right-arrow@3x.png" style="width: 0.5rem;height: auto;margin-right: 0;"/></span>
							</span>
						</div>
					</li>
				</ul>

			</div>
		</div>
		<!-- 任务列表  end -->

		<!-- 孕期知识 start -->
		<div class="know-carousel">
			<mt-swipe :auto="3000">
				<!--<mt-swipe-item v-for="item in carouselList">   //todo
					<img :src="item.knowPicture" style="width: 100%;height: 100%;" />
				</mt-swipe-item>-->
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
					<span class="home-title" style="font-weight: bold;">今日知识</span>
					<!--<span style="float: right;"><span style="color: #aaa;" @click="goMoreKnow">更多知识</span><span class="el-icon-arrow-right"></span></span>-->
				</p>
				<ul v-for="item in knowledgeList">
					<li style="display: flex;">
						<img :src="item.knowPicture" width="120" height="120" />
						<div class="div_pg_know">
							<span class="knowledge-name">{{item.knowName}}</span>
							<p class="desc">{{item.knowContent}}</p>
							<span style="color: #ffd8d5;">{{item.tip}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- 孕期知识 end -->
	</div>

	<el-dialog :visible.sync="dialogVisible" id="sign-dialog" style="margin-top: 15%;">
		<div class="div-sign-dialog">
			<div class="div-days">
				<h1>{{lianxuSignDays}}</h1>
				<p>连续签到天数</p>
			</div>
			<div class="div-today">
				<span>今日{{getIntegralState}}获得</span>
				<span style="margin-left: 0.3rem;"><img src="../../assets/my_integral.png" style="width: 1rem;"/><span style="color: #FC9FD7;">x{{todayIntegral}}</span><span style="margin-left: 0.3rem;">积分</span></span>
			</div>
			<img src="../../assets/sign-close.png" style="position: absolute;top: -1rem;right: -1rem;" @click="dialogVisible = false" />
		</div>
		<canvas id="myCanvas" :width="canvasWidth * dpr" :height="canvasHeight * dpr" style=""></canvas>
		<!--<el-button @click="dialogVisible = false">已签到</el-button>-->
		<button @click="signIn" class="btn-sign sign" v-if="isTodaySign == 0" style="height: 2rem;border-radius: 0.5rem;">签到</button>
		<button @click="signIn" class="btn-sign signed" v-if="isTodaySign == 1" style="height: 2rem;border-radius: 0.5rem;">已签到</button>
		<div id="add-integral" class="div-add-integral">
			<h1 style="width: 33.3%;">
				<img src="../../assets/integral.png" style="text-align: center;"/>
			</h1>
			<h1 style="width: 33.3%;color: #FF6EA5;text-align: center;" id="text-integral">+</h1>
			<h1 style="width: 33.3%;color: #FF6EA5;text-align: left;">{{todayIntegral}}</h1>
		</div>
	</el-dialog>
	<div style="display: none;">
		<img src="../../assets/integral3-red.png" id="integral0-red" />
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

<script>export default {
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
					"taskContent": "专家提示:吃核桃对大脑发育",
					"taskStatus": "2"
				},
				{
					"taskName": "喝多少牛奶",
					"taskContent": "专家提示:吃核桃对大脑发育",
					"taskStatus": "1"
				},
				{
					"taskName": "睡几个钟头",
					"taskContent": "专家提示:吃核桃对大脑发育",
					"taskStatus": "0"
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
			canvasWidth: window.screen.availWidth * 7 / 10,
			canvasHeight: window.screen.height * 1 / 4,
			dpr: window.devicePixelRatio, //屏幕像素分辨率
			showTaskNum: 3, //显示任务数量
		}
	},

	created() {
		//获取首页数据
		this.getHomeData();
		this.aaa();
		//			alert(window.screen.width);
		//			alert(window.screen.height);
		//			alert(window.devicePixelRatio);
	},
	mounted() {
		this.isShow = true;
		this.getSignInfo(); //获取签到信息
		//						this.drawSignIntegral();
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
		aaa() {
			var a = '["aaa","bbb","ccc","ddd","eee"]';
			var b = JSON.parse(a);
			console.log("b", b);
			console.log("b.length", b.length);
		},

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
				userId: _this.userId, //用户id,非必填
			}).then((response) => {
				console.log(response.data);
				if(response.data.resultCode == 200) {
					//成功
					_this.carouselList = response.data.sowMapList, //轮播列表数据
						_this.tip = response.data.tip, //任务提示语
						_this.taskList = response.data.taskList, //任务列表
						_this.babyStatus = response.data.BabyStatus, //婴儿状态
						_this.knowledgeList = response.data.knowledgeList //知识列表
					_this.showTaskNum = _this.taskList.length >= 3 ? 3 : _this.taskList.length
					localStorage.setItem('pregnancyWeek', _this.babyStatus.pregnancyWeek);
				}
			}).catch((error) => {
				//失败
				console.log(error);
			});

		},

		/**
		 * 增加积分样式
		 */
		addIntegralStyle() {
			//积分动画效果，逐渐变大变淡往上平移
			var integral = document.getElementById("add-integral");
			integral.style.visibility = 'visible';
			integral.style.width = '60%';
			integral.style.opacity = 0;
			integral.style.bottom = '80%';
			integral.style.fontSize = '2rem';
			integral.style.marginLeft = '20%';
			var integralImg = integral.getElementsByTagName('img');
			integralImg[0].style.width = '3rem';
			//				integral.style.animation = "integral 5s";
		},

		/**
		 * 显示签到弹框
		 */
		showSignDialog() {
			if(this.userId == null || this.userId == '') {
				return this.jumpNormalRouter('/login');
			}
			this.dialogVisible = true;
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
			c.style.width = this.canvasWidth + "px";
			c.style.height = this.canvasHeight + "px";
			var ctx = c.getContext("2d");
			var index;
			var space = 5;
			for(var i = 0; i < this.imgReds.length; i++) {
				this.imgReds[i] = document.getElementById("integral" + i + "-red");
			}
			for(var i = 0; i < this.imgGrays.length; i++) {
				this.imgGrays[i] = document.getElementById("integral" + i + "-gray");
			}
			var canvasWidth = c.width / this.dpr;
			var canvasHeight = c.height / this.dpr;
			var xPicCoor = [space, canvasWidth / 2 - this.imgReds[0].width / 2, canvasWidth - this.imgReds[0].width - space];
			var yPicCoor = [0, canvasHeight / 2 - this.imgReds[0].height / 2, canvasHeight - this.imgReds[0].height];
			var xLineCoor = [this.imgReds[0].width, canvasWidth / 2 - this.imgReds[0].width / 2, canvasWidth / 2 + this.imgReds[0].width / 2 - space,
				canvasWidth - this.imgReds[0].width - space, canvasWidth - this.imgReds[0].width / 2 - space
			];
			var yLineCoor = [this.imgReds[0].height / 2, this.imgReds[0].height - 3, canvasHeight / 2 - this.imgReds[0].height / 2, canvasHeight / 2 + this.imgReds[0].height / 2 - 3,
				canvasHeight - this.imgReds[0].height, canvasHeight - this.imgReds[0].height / 2
			];
			var dayText = ['第1天', '第2天', '第3天', '第4天', '第5天', '第6天', '第7天'];
			var fontSpace = [15, 5];

			ctx.lineWidth = 3;
			ctx.strokeStyle = this.lineColor[0];
			ctx.font = "0.7rem  Arial";
			ctx.fillStyle = this.fontColor[0];
			ctx.save();
			ctx.scale(this.dpr, this.dpr);
			this.integralPic[0] = this.imgReds[0];
			/*第一天*/
			ctx.drawImage(this.integralPic[0], xPicCoor[0], yPicCoor[0]);
			ctx.fillText(dayText[0], xPicCoor[0], this.imgReds[0].height + fontSpace[0]);
			ctx.restore();
			this.setDrawStyle(1, 0, ctx);
			/*第二天*/
			ctx.moveTo(xLineCoor[0], yLineCoor[0]);
			ctx.lineTo(xLineCoor[1], yLineCoor[0]);
			ctx.drawImage(this.integralPic[1], xPicCoor[1], yPicCoor[0]);
			ctx.fillText(dayText[1], xPicCoor[1], this.imgReds[0].height + fontSpace[0]);
			ctx.stroke();
			ctx.fill();
			ctx.restore();
			this.setDrawStyle(2, 1, ctx);

			/*第三天*/
			ctx.moveTo(xLineCoor[2], yLineCoor[0]);
			ctx.lineTo(xLineCoor[3], yLineCoor[0]);
			ctx.drawImage(this.integralPic[2], xPicCoor[2], yPicCoor[0]);
			ctx.fillText(dayText[2], xPicCoor[2], this.imgReds[0].height + fontSpace[0]);
			ctx.stroke();
			ctx.fill();
			ctx.restore();

			this.setDrawStyle(3, 1, ctx);
			/*第四天*/
			ctx.moveTo(xLineCoor[4], yLineCoor[1]);
			ctx.lineTo(xLineCoor[4], yLineCoor[2]);
			ctx.drawImage(this.integralPic[3], xPicCoor[2], yPicCoor[1]);
			ctx.fillText(dayText[3], xPicCoor[2] - this.imgReds[0].width, yPicCoor[1] + fontSpace[0]);
			ctx.stroke();
			ctx.fill();
			ctx.restore();

			this.setDrawStyle(4, 2, ctx);
			/*第五天*/
			ctx.moveTo(xLineCoor[4], yLineCoor[3]);
			ctx.lineTo(xLineCoor[4], yLineCoor[4]);
			ctx.drawImage(this.integralPic[4], xPicCoor[2], yPicCoor[2]);
			ctx.fillText(dayText[4], xPicCoor[2], yPicCoor[2] - fontSpace[1]);
			ctx.stroke();
			ctx.fill();
			ctx.restore();

			this.setDrawStyle(5, 3, ctx);
			/*第六天*/
			ctx.moveTo(xLineCoor[2], yLineCoor[5]);
			ctx.lineTo(xLineCoor[3], yLineCoor[5]);
			ctx.drawImage(this.integralPic[5], xPicCoor[1], yPicCoor[2]);
			ctx.fillText(dayText[5], xPicCoor[1], yPicCoor[2] - fontSpace[1]);
			ctx.stroke();
			ctx.fill();
			ctx.restore();

			this.setDrawStyle(6, 4, ctx);
			/*第七天*/
			ctx.moveTo(xLineCoor[0], yLineCoor[5]);
			ctx.lineTo(xLineCoor[1], yLineCoor[5]);
			ctx.drawImage(this.integralPic[6], xPicCoor[0], yPicCoor[2]);
			ctx.fillText(dayText[6], xPicCoor[0], yPicCoor[2] - fontSpace[1]);
			ctx.stroke();
			ctx.fill();
			ctx.restore();
		},

		/**
		 * 设置绘制的样式
		 */
		setDrawStyle(lianxuDays, index, ctx) {
			if(this.lianxuSignDays < lianxuDays || (this.lianxuSignDays == lianxuDays && this.isTodaySign)) {
				this.integralPic[lianxuDays] = this.imgGrays[index];
				ctx.strokeStyle = this.lineColor[1];
				ctx.fillStyle = this.fontColor[1];
				ctx.save();
				ctx.scale(this.dpr, this.dpr);
			} else {
				this.integralPic[lianxuDays] = this.imgReds[index];
				ctx.strokeStyle = this.lineColor[0];
				ctx.fillStyle = this.fontColor[0];
				ctx.save();
				ctx.scale(this.dpr, this.dpr);
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
					this.lianxuSignDays = parseInt(response.data.signSerialTimes); //连续签到的天数
					this.isTodaySign = parseInt(response.data.isSign); //今日是否签到
					this.getSignIntegral();
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
		},

		/**
		 * input获取焦点事件
		 */
		focusInput() {

		},

		/**
		 * input失去焦点事件
		 */
		blurInput() {},

	}
}</script>

<style scoped>@import url("../../style/homepage.css");</style>

<style>.homepage input::-webkit-input-placeholder {
	color: #fcfcfc;
}

.homepage input::-moz-placeholder {
	/* Mozilla Firefox 19+ */
	color: #fcfcfc;
}

.homepage input:-moz-placeholder {
	/* Mozilla Firefox 4 to 18 */
	color: #fcfcfc;
}

.homepage input:-ms-input-placeholder {
	/* Internet Explorer 10-11 */
	color: #fcfcfc;
}

.homepage .grad {
	height: 100%;
	/*background: -webkit-linear-gradient(left, #FFF8FC, #FFC3E7, #FFF8FC);*/
	/* Safari 5.1 - 6.0 */
	/* background: -o-linear-gradient(right, red, blue); Opera 11.1 - 12.0 */
	/* background: -moz-linear-gradient(right, red, blue); Firefox 3.6 - 15 */
	/*background: linear-gradient(to right, #FFF8FC, #FFC3E7, #FFF8FC);*/
	/* 标准的语法 */
}

.homepage .grad2 {
	height: 5rem;
	background: none;
	/*background: -webkit-linear-gradient(left, #FFF9FD, #FF6DB7, #FFF9FD);*/
	/* Safari 5.1 - 6.0 */
	/* background: -o-linear-gradient(right, red, blue); Opera 11.1 - 12.0 */
	/* background: -moz-linear-gradient(right, red, blue); Firefox 3.6 - 15 */
	/*background: linear-gradient(to right, #FFF9FD, #FF6DB7, #FFF9FD);*/
	/* 标准的语法 */
}

.homepage .top {
	width: 100%;
	position: relative;
	/* background: url('../../assets/camera_icon.png'); */
}

.homepage .tip-left {
	background: url(../../assets/1x/qipao.png) no-repeat;
	text-align: center;
	font-size: 0.85rem;
	padding: 0.5rem;
	width: 9rem;
	height: 7rem;
	position: absolute;
	left: 10%;
	top: 28%;
	/*border-radius: 50%;*/
	/*animation: float13 20s infinite linear;*/
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
	height: 60%;
	border-radius: 10px;
}

.homepage .el-dialog__headerbtn .el-dialog__close {
	display: none;
}</style>