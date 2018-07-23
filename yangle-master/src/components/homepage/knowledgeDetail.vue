<template>
	<div class="knowledgeDetail">
		<mt-header style="background: none;">
			<mt-button icon="back" slot="left" style="color: #333;" @click="goBack"></mt-button>
		</mt-header>

		<div class="content">
			<div class="detail-top">
				<img src="../../assets/default-header-pic.jpg" class="userIcon" v-if="userIcon == undefined || userIcon == null || userIcon == ''"/>
				<img :src="userIcon" class="userIcon" v-if="userIcon != undefined && userIcon != null && userIcon != ''" />
				<div>
					<span v-if="userName == null || userName == ''">宝贝</span>
					<span v-if="userName != null && userName != ''">{{userName}}</span>
					<span>进入社区能看到更多同类话题哟</span>
				</div>
				<button @click="toast">进入社区</button>
			</div>
			<div class="detail-bottom">
				<p class="know-title">{{knowObj.knowName}}</p>
				<p class="know-suoshu-time"><span>{{knowObj.author}}</span><span>{{knowObj.gmtCreate.split(" ")[0]}}</span></p>
				<!--<img :src="knowObj.knowBigPicture" />-->
				<div v-html='knowObj.knowContent' style="width: 100%;margin-top: 2rem;" id="know-content"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		name: "knowledgeDetail",
		data() {
			return {
				userName: localStorage.getItem('userName'), //用户昵称
				userIcon: localStorage.getItem('userIcon'), //用户头像
				knowObj: JSON.parse(this.$route.query.knowObj), //知识
			}

		},

		created() {

		},

		mounted() {

		},

		updated() {

		},

		methods: {
			toast() {
				let instance = Toast('此功能尚未开通，请耐心等待～');
				setTimeout(() => {
					instance.close();
				}, 2000);
			},
			/**
			 * 返回上一级路由
			 */
			goBack() {
				this.$router.go(-1);
			},

		}
	}
</script>

<style scoped>
	@import url("../../style/knowledgeDetail.css");
</style>