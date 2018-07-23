<template>
	<div>
		<mt-header title="知识列表">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div class="knowledgeList" v-if="netStatus">
			<mt-loadmore :autoFill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" :auto-fill="false" bottomPullText="上拉加载更多" :bottomLoadingText="bottomLoadingText" ref="loadmore">
				<ul v-for="item in allKnowList">
					<li style="display: flex;border-bottom: 1px solid #eee;padding-bottom: 0.5rem;" @click="goKnowDetail(item)">
						<div style="width: 8rem;">
							<img :src="item.knowPicture" style="width: 7rem;height: 7rem;" />
						</div>

						<div class="div_pg_know">
							<span class="knowledge-name">{{item.knowName}}</span>
							<p class="desc" style="overflow: hidden;">{{item.knowBrief}}</p>
							<span style="color: #FC9FD7;font-size: 0.8rem;" v-if="item.knowTip != undefined && item.knowTip != null && item.knowTip != ''">{{item.knowTip}}</span>
						</div>
					</li>
				</ul>
			</mt-loadmore>
		</div>
		<div v-if="!netStatus">
			<img src="../../assets/net-error-icon.png" style="margin-top: 20%;width: 50%;" />
			<p style="margin-top: 10%;font-size: 1.1rem;color: #ccc;">呀～网络崩溃了</p>
			<mt-button style="width: 70%;margin-top: 10%;box-shadow: #aaa 0px 0px 5px;" @click="reLoad">重新加载</mt-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'knowledgeList',
		data() {
			return {
				knowledgeList: [], //知识列表
				page: 1,
				limit: 10,
				allKnowList: [],
				allLoaded: false, //若为true,则bottom-method不会再次被触发
				topStatus: '',
				bottomLoadingText: '加载中......',
				netStatus: window.navigator.onLine, //是否有网络
			}
		},

		created() {
			this.getKnowList();
		},

		methods: {
			/**
			 * 返回上一级路由
			 */
			goBack() {
				this.$router.go(-1);
			},

			/**
			 * 重新加载页面
			 */
			reLoad() {
				window.location.reload()
			},

			/**
			 * 获取知识列表数据
			 */
			getKnowList() {
				var _this = this;
				this.axios.post('/pregnancy/knowledgeList', {
					page: this.page, //用户id
					limit: this.limit, //用户角色
				}).then((response) => {
					if(response.data.resultCode == 200) {
						_this.knowledgeList = response.data.data.list;
						for(var i = 0; i < _this.knowledgeList.length; i++) {
							_this.allKnowList.push(_this.knowledgeList[i]);
						}
						console.log("allKnowList", _this.allKnowList);
					} else {
						//						plus.nativeUI.alert(response.data.resultMsg);
					}
				}).catch((error) => {
					//失败
					console.log(error);
				});
			},

			/**
			 * 跳转知识详情页
			 */
			goKnowDetail(knowObj) {
				this.$router.push({
					path: "/knowledgeDetail",
					query: {
						knowObj: JSON.stringify(knowObj)
					}
				});
			},

			//下拉刷新
			loadTop() {
				var _self = this;
				_self.page = 1;

				setTimeout(() => {
					this.allKnowList = [];
					_self.getKnowList();
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
				this.getKnowList();
				this.$refs.loadmore.onBottomLoaded();
			},

			handleTopChange(status) {
				this.topStatus = status;
			},
		}
	}
</script>

<style>
	@import url("../../style/homepage.css");
</style>

<style>
	.knowledgeList {
		text-align: left;
	}
	
	.knowledgeList ul {
		padding: 0 0.7rem;
	}
</style>