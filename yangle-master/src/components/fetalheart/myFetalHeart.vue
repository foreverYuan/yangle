<!--我的胎心页面-->
<template>
	<div class="myfetalheart">
		<mt-header title="我的胎心">
			<mt-button icon="back" slot="left" @click="goBack()"></mt-button>
		</mt-header>
		<div class="tab">
			<div style="display:flex;justify-content:space-around;">
				<div style="text-align: center;">
					<p>今日监测次数</p><span>{{todayTotal}}</span></div>
				<div style="text-align: center;">
					<p>总计监测次数</p><span>{{totalCount}}</span></div>
			</div>

			<div style="text-align:left;" v-if="allFhrList.length > 0">
				<mt-loadmore :autoFill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" :auto-fill="false" bottomPullText="上拉加载更多" :bottomLoadingText="bottomLoadingText" ref="loadmore">
					<ul>
						<li v-for="item in allFhrList">
							<p class="li1">{{item.startTime}}</p>
							<p @click="goDetail(item.moveId)" class="li2"><span><label>胎心率：</label><span>{{item.meanHeartRate}}bmp</span></span><span class="span-right">胎动：{{item.fetalMove}}次</span></p>
							<p @click="goDetail(item.moveId)" class="li2" style="border-top: 0.05rem solid rgb(239,239,239);">
								<span><label>监测时间：</label><span>{{item.monitoringTime}}</span></span>
								<span class="span-right" v-if="item.state == 1 || item.state == 2"><img src="../../assets/draft.png" /><span>草稿</span></span>
								<span class="span-right" v-if="item.state == 3"><img src="../../assets/uploaded.png" /><span>已提交</span></span>
								<span class="span-right" v-if="item.state == 4"><img src="../../assets/normal.png" /><span>正常</span></span>
								<span class="span-right" v-if="item.state == 5"><img src="../../assets/abnormal.png" /><span>异常</span></span>
							</p>
						</li>
					</ul>
				</mt-loadmore>
			</div>

			<div class="div-no-data" v-if="allFhrList.length <= 0">
				<p>您还未监测胎心，快去听听</p>
				<p>宝宝的心声吧～</p>
				<img src="../../assets/fhr_no_data.png" class="img-no-data" />
			</div>
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

				totalCount: '', //总条数
				totalPage: '', //总页数
				currPage: '', //当前页码
				todayTotal: '', //今日条数
				fhrList: '', //胎心列表
				allFhrList: [],
				allLoaded: false, //若为true,则bottom-method不会再次被触发
				topStatus: '',
				bottomLoadingText: '加载中......',
			}
		},

		created() {
			this.getMyFhrData();
			//		    this.back();
		},

		mounted() {
			this.getFileInfo();
		},

		methods: {
			goBack() {
				this.$router.go(-1);
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
			getMyFhrData() {
				this.axios.post('/yFetalMovement/yfetalmovement/myfetalHeart', {
					page: this.page, //页码
					limit: this.limit, //一页多少条
					userId: this.userId, //用户id
					userRole: this.userRole, //用户角色
				}).then((response) => {
					console.log(response.data);
					if(response.data.resultCode == 200) {
						this.totalCount = response.data.data.totalCount, //总条数
							this.totalPage = response.data.data.totalPage, //总页数
							this.page = response.data.data.currPage, //当前页码
							this.todayTotal = response.data.data.todayTotal //今日条数
						this.fhrList = response.data.data.list //胎心列表
						for(var i = 0; i < this.fhrList.length; i++) {
							this.allFhrList.push(this.fhrList[i]);
						}
						console.log('fhrList', this.fhrList)
						console.log('allFhrList', this.allFhrList)
					}

				}).catch((error) => {
					console.log(error);
				});
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
				this.getMyFhrData();
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
	.mint-header {
		background: #FC9FD7;
	}
	/* #app{
   text-align:left;
 } */
	
	.li1 {
		background: #E4F1FF;
		padding: 0.3rem 0.8rem;
	}
	
	.li2 {
		padding: 0.3rem 0.8rem;
		margin-top: 0.5rem;
		color: #888888;
		position: relative;
	}
	
	.span-right {
		position: absolute;
		right: 0;
		width: 6rem;
	}
	
	.span-right img {
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 0.3rem;
	}
</style>