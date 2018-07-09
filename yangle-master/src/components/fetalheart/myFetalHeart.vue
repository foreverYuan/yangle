<!--我的胎心页面-->
<template>
	<div class="myfetalheart">
		<div class="div-title">
			<mt-header title="我的胎心">
				<mt-button icon="back" slot="left" @click="goBack()"></mt-button>
			</mt-header>
			<div class="div-big-tab">
				<div class="div-tab" id="yiti" @click="switchYtWt(1)">
					<p>已提交判读</p><span>{{yitiCount}}</span></div>
				<div class="div-tab" id="weiti" @click="switchYtWt(2)">
					<p>未提交判读</p><span>{{weitiCount}}</span></div>
			</div>
		</div>
		<div class="div-list" v-if="allFhrList.length > 0">
			<mt-loadmore :autoFill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" :auto-fill="false" bottomPullText="上拉加载更多" :bottomLoadingText="bottomLoadingText" ref="loadmore">
				<ul>
					<li v-for="item in allFhrList" style="display: flex;" @click="goDetail(item.moveId)">
						<div class="div-state" v-if="item.state == 1 || item.state == 2">
							<img src="../../assets/1x/weitijiao.png" style="width: 1.7rem;" />
							<p style="-webkit-margin-before: 0;color: #999;">未提交</p>
						</div>
						<div class="div-state" v-if="item.state == 3">
							<img src="../../assets/1x/panduzhong.png" style="width: 2rem;" />
							<p style="-webkit-margin-before: 0;color: #FF6DB7;">判读中</p>
						</div>
						<div class="div-state" v-if="item.state == 4 && item.resultState == 1">
							<img src="../../assets/3x/normal-icon3x.png" />
							<p style="-webkit-margin-before: 0;color: #FF6CB4;">正常</p>
						</div>
						<div class="div-state" v-if="item.state == 4 && item.resultState == 2">
							<img src="../../assets/3x/abnormal-icon@3x.png" />
							<p style="-webkit-margin-before: 0;color: #EA9926;">异常</p>
						</div>
						<div class="div-fhr-data">
							<p><img src="../../assets/1x/fhr-icon.png" /><span>胎心率 ： {{item.meanHeartRate}}bpm</span></p>
							<p><img src="../../assets/1x/fm-icon.png" /><span v-if="item.fetalMove > 0">胎动 ： {{item.fetalMove}}次</span><span v-if="item.fetalMove == 0">胎动 ： 无</span></p>
							<p><img src="../../assets/1x/duration-icon.png" /><span>检测时长 ： {{formatDuration(item.monitoringTime)}}</span></p>
							<!--<p class="li1">{{item.startTime}}</p>
							<p @click="goDetail(item.moveId)" class="li2"><span><label>胎心率：</label><span>{{item.meanHeartRate}}bmp</span></span><span class="span-right">胎动：{{item.fetalMove}}次</span></p>
							<p @click="goDetail(item.moveId)" class="li2" style="border-top: 0.05rem solid rgb(239,239,239);">
								<span><label>监测时间：</label><span>{{item.monitoringTime}}</span></span>
								<span class="span-right" v-if="item.state == 1 || item.state == 2"><img src="../../assets/draft.png" /><span>草稿</span></span>
								<span class="span-right" v-if="item.state == 3"><img src="../../assets/uploaded.png" /><span>已提交</span></span>
								<span class="span-right" v-if="item.state == 4"><img src="../../assets/normal.png" /><span>正常</span></span>
								<span class="span-right" v-if="item.state == 5"><img src="../../assets/abnormal.png" /><span>异常</span></span>
							</p>-->
						</div>
					</li>
				</ul>
			</mt-loadmore>
		</div>
		<!--背景-->
		<div class="my-fhr-background"></div>

		<div class="div-no-data" v-if="allFhrList.length <= 0">
			<p>您还未监测胎心，快去听听</p>
			<p>宝宝的心声吧～</p>
			<img src="../../assets/fhr_no_data.png" class="img-no-data" />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'myFetalHeart',
		data() {
			return {
				data: [{
					'number': 2
				}, {
					'number': 4
				}],

				page: 1, //页码
				limit: 10, //一页多少条
				userId: localStorage.getItem('userId'), //用户id
				userRole: localStorage.getItem('userRole'), //用户角色

				weitiCount: '', //未提交数量
				totalPage: '', //总页数
				currPage: '', //当前页码
				yitiCount: '', //已提交数量
				fhrList: '', //胎心列表
				allFhrList: [],
				allLoaded: false, //若为true,则bottom-method不会再次被触发
				topStatus: '',
				bottomLoadingText: '加载中......',
				ytOrWt: '3,4', //已提交或者未提交   1:已提交   2:未提交
			}
		},

		created() {
			this.getMyFhrData(false);
			//			this.switchYtWt(1);
			//		    this.back();
		},

		mounted() {
//			this.getFileInfo();
		},

		methods: {
			goBack() {
				this.$router.go(-1);
			},

			/**
			 * 切换已提交判读和未提交判读
			 */
			switchYtWt(ytOrWt) {
				var yiti = document.getElementById('yiti');
				var weiti = document.getElementById('weiti');
				if(ytOrWt == 1) {
					this.ytOrWt = '3,4';
					yiti.style.borderColor = '#fff';
					yiti.style.fontWeight = 'bold';
					weiti.style.borderColor = '#FE99CC';
					weiti.style.fontWeight = 'normal';
				} else {
					this.ytOrWt = '2';
					yiti.style.borderColor = '#FE99CC';
					yiti.style.fontWeight = 'normal';
					weiti.style.borderColor = '#fff';
					weiti.style.fontWeight = 'bold';
				}
				this.getMyFhrData(false);
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
			 * 跳转胎心详情
			 */
			goDetail(fhrId) {
				this.base_navidetail(fhrId);
			},

			/**
			 * 获取我的胎心数据
			 */
			getMyFhrData(isPush) {
				this.axios.post('/yFetalMovement/yfetalmovement/myfetalHeart', {
					page: this.page, //页码
					limit: this.limit, //一页多少条
					userId: this.userId, //用户id
					userRole: this.userRole, //用户角色
					state: this.ytOrWt, //判读的状态
				}).then((response) => {
					console.log(response.data);
					if(response.data.resultCode == 200) {
//						alert("获取成功");
						this.weitiCount = response.data.notSubmitTotal, //未提交数量
//							this.totalPage = response.data.data.totalPage, //总页数
//							this.page = response.data.data.currPage, //当前页码
							this.yitiCount = response.data.submitTotal //已提交数量
						this.fhrList = response.data.yFetalMovementList //胎心列表
						if(isPush) {
							for(var i = 0; i < this.fhrList.length; i++) {
								this.allFhrList.push(this.fhrList[i]);
							}
						} else {
							this.allFhrList = this.fhrList;
						}

						console.log('fhrList', this.fhrList)
						console.log('allFhrList', this.allFhrList)
					}

				}).catch((error) => {
					console.log(error);
				});
			},

			/**
			 * 把00:00格式化成00分00秒
			 */
			formatDuration(time) {
				var timee = time.split(':');
				return timee[0] + '分' + timee[1] + '秒';
			},

			//下拉刷新
			loadTop() {
				var _self = this;
				_self.page = 1;

				setTimeout(() => {
					this.allFhrList = [];
					_self.getMyFhrData();
					_self.allLoaded = false;
					_self.$refs.loadmore.onTopLoaded();
				}, 1000);

			},

			loadBottom() {
				this.page = this.page + 1;
				if(this.page > this.totalPage) {
					this.allLoaded = true; // 若数据已全部获取完毕
					this.bottomLoadingText = '没有更多内容';
					return;
				}
				this.getMyFhrData(true);
				this.$refs.loadmore.onBottomLoaded();
			},

			handleTopChange(status) {
				this.topStatus = status;
			},
		}

	}
</script>

<style scoped>
	@import url("../../style/myfetalheart.css");
</style>
<style>
	.div-list .mint-loadmore-top {
		margin-top: -1rem;
	}
	
	.div-list .mint-loadmore-top,
	.div-list s.mint-loadmore-bottom {
		text-align: center;
		height: 1rem;
		line-height: 1rem;
	}
</style>