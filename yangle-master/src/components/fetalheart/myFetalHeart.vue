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
					<p style="display: inline-block;position: relative;">未提交判读<img src="../../assets/red-point.png" v-if="weitiCount > 0" class="red-point" /></p>
					<span style="display: block;">{{weitiCount}}</span>
				</div>
			</div>
		</div>
		<img src="../../../static/loading-icon-closeEye.png" class="loadingImg" id="loading-img1" v-if="netStatus" />
		<img src="../../../static/loading-icon-openEye.png" class="loadingImg" id="loading-img2" v-if="netStatus" />
		<div class="div-list" v-if="allFhrList.length > 0 && netStatus">
			<mt-loadmore :autoFill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" :auto-fill="false" bottomPullText="上拉加载更多" :bottomLoadingText="bottomLoadingText" ref="loadmore">
				<ul>
					<li v-for="item in allFhrList" @click="goDetail(item.moveId)">
						<div class="div-li">
							<div class="div-state" v-if="item.state == 1 || item.state == 2">
								<img src="../../assets/1x/weitijiao.png" style="width: 1.7rem;" />
								<p style="-webkit-margin-before: 0;color: #999;">未提交</p>
							</div>
							<div class="div-state" v-if="item.state == 3">
								<img src="../../assets/1x/panduzhong.png" style="width: 2rem;" />
								<p style="-webkit-margin-before: 0;color: #FF6DB7;">判读中</p>
							</div>
							<div class="div-state" v-if="item.state == 4 && item.resultState == 1">
								<img src="../../assets/3x/normal-icon3x.png" style="width: 2rem;"/>
								<p style="-webkit-margin-before: 0;color: #FF6CB4;">正常</p>
							</div>
							<div class="div-state" v-if="item.state == 4 && item.resultState == 2">
								<img src="../../assets/3x/abnormal-icon@3x.png" style="width: 2rem;"/>
								<p style="-webkit-margin-before: 0;color: #EA9926;">异常</p>
							</div>
							<div class="div-fhr-data">
								<p><img src="../../assets/2x/fhr-icon@2x.png" /><span>胎心率 ： {{item.meanHeartRate}}bpm</span></p>
								<p><img src="../../assets/2x/fm-icon@2x.png" /><span v-if="item.fetalMove > 0">胎动 ： {{item.fetalMove}}次</span><span v-if="item.fetalMove == 0">胎动 ： 无</span></p>
								<p><img src="../../assets/2x/duration-icon@2x.png" /><span>检测时长 ： {{formatDuration(item.monitoringTime)}}</span></p>
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
						</div>

						<div class="order" v-if="item.startTime != null">
							<span class="line"></span>
							<span class="txt">{{item.startTime.split(" ")[0]}}</span>
							<span class="line"></span>
						</div>
						<p></p>
					</li>
				</ul>
			</mt-loadmore>
		</div>
		<!--背景-->
		<div class="my-fhr-background"></div>

		<div class="div-no-data" v-if="allFhrList.length <= 0 && netStatus">
			<p>您还未监测胎心，快去听听</p>
			<p>宝宝的心声吧～</p>
			<img src="../../assets/fhr_no_data.png" class="img-no-data" />
		</div>

		<div v-if="!netStatus">
			<img src="../../assets/net-error-icon.png" style="margin-top: 50%;width: 40%;" />
			<p style="margin-top: 10%;font-size: 1.1rem;color: #ccc;">呀～网络崩溃了</p>
			<mt-button style="width: 70%;margin-top: 10%;box-shadow: #aaa 0px 0px 5px;" @click="reLoadd">重新加载</mt-button>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
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

				weitiCount: 0, //未提交数量
				totalPage: '', //总页数
				currPage: '', //当前页码
				yitiCount: 0, //已提交数量
				fhrList: '', //胎心列表
				allFhrList: [],
				allLoaded: false, //若为true,则bottom-method不会再次被触发
				topStatus: '',
				bottomLoadingText: '加载中......',
				ytOrWt: '3,4', //已提交或者未提交   1:已提交   2:未提交
				netStatus: window.navigator.onLine, //是否有网络
				isShowOpen: 1,
			}
		},

		created() {
			this.getMyFhrData(false, true);
			//			this.switchYtWt(1);
			//		    this.back();
		},

		mounted() {
			this.showLoading();
			var _this = this;
			this.loadingTimerId = window.setInterval(function() {
				if(this.isShowOpen == 1) {
					this.isShowOpen = 0;
					$("#loading-img1").css("visibility", "hidden");
					$("#loading-img2").css("visibility", "visible");
				} else {
					this.isShowOpen = 1;
					$("#loading-img1").css("visibility", "visible");
					$("#loading-img2").css("visibility", "hidden");
				}
			}, 500);
			this.getFileInfo();
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
				this.page = 1;
				this.allLoaded = false;
				if(ytOrWt == 1) {
					this.ytOrWt = '3,4';
					yiti.style.borderColor = '#fff';
					yiti.style.fontWeight = 'bold';
					weiti.style.borderColor = '#FE99CC';
					weiti.style.fontWeight = 'normal';
				} else {
					this.ytOrWt = '1,2';
					yiti.style.borderColor = '#FE99CC';
					yiti.style.fontWeight = 'normal';
					weiti.style.borderColor = '#fff';
					weiti.style.fontWeight = 'bold';
				}
				this.getMyFhrData(false, true);
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
			getMyFhrData(isPush, errorTip) {
				var _this = this;
				this.axios.post('/yFetalMovement/yfetalmovement/myfetalHeart', {
					page: this.page, //页码
					limit: this.limit, //一页多少条
					userId: this.userId, //用户id
					userRole: this.userRole, //用户角色
					state: this.ytOrWt, //判读的状态
				}).then((response) => {
					console.log(response.data);
					if(response.data.resultCode == 200) {
						_this.hiddenLoading();
						_this.weitiCount = response.data.pageUtil.notSubmitTotal, //未提交数量
							_this.totalPage = response.data.pageUtil.totalPage, //总页数
							_this.page = response.data.pageUtil.currPage, //当前页码
							_this.yitiCount = response.data.pageUtil.submitTotal //已提交数量
						_this.fhrList = response.data.pageUtil.list //胎心列表
						if(isPush) {
							for(var i = 0; i < _this.fhrList.length; i++) {
								_this.allFhrList.push(_this.fhrList[i]);
							}
						} else {
							_this.allFhrList = _this.fhrList;
						}
						console.log('fhrList', _this.fhrList)
						console.log('allFhrList', _this.allFhrList)
						$(".div-no-data").css("visibility", "visible");
					} else {
						_this.hiddenLoading();
						if(errorTip) {
							let instance = Toast(response.data.resultMsg);
							setTimeout(() => {
								instance.close();
							}, 2000);
						}
						//						plus.nativeUI.alert(response.data.resultMsg);
					}

				}).catch((error) => {
					_this.hiddenLoading();
					console.log(error);
				});
			},

			showLoading() {
				$(".loadingImg").css("display", "block");
			},

			hiddenLoading() {
				$(".myfetalheart").css("display", "block");
				$(".loadingImg").css("display", "none");
				window.clearInterval(this.loadingTimerId);
			},

			reLoadd() {
				window.location.reload()
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
					_self.getMyFhrData(false, true);
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
				this.getMyFhrData(true, true);
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