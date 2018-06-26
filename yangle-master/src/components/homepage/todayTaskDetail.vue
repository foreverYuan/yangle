<template>
	<div class="todayTaskDetail">
		<mt-header title="今日任务详情">
			<mt-button icon="back" slot="left" @click="goBack()"></mt-button>
		</mt-header>
		<div class="div-task-detail-background">
			<div class="div-task-desc">
				<h3>{{task.title}}</h3>
				<p>{{task.content}}</p>
			</div>
		</div>
		<button class="btn-completed" v-if="task.state == 1">已完成</button>
		<button class="btn-complete" v-if="task.state == 2" @click="goComplete()">完 成</button>
		<button class="btn-locking" v-if="task.state == 3">
			<img src="../../assets/task_locking.png" />
		</button>
	</div>
</template>

<script>export default {
	data() {
		return {
			task: JSON.parse(this.$route.query.task), //任务状态   1: 已完成   2: 未完成   3: 待解锁
			
			/* 获取任务详情 start */
			/* 请求参数 */
			userTaskId: this.$route.query.taskId, //用户任务id
			
			/* 返回参数 */
			taskDetailInfo: '', //任务详情信息
		}
	},

	methods: {
		goBack() {
			this.$router.go(-1);
		},

		/**
		 * 点击完成按钮
		 */
		goComplete() {

		},

		/**
		 * 获取任务详情
		 */
		getTaskDetail() {
			this.axios.post('/yTaskUser/ytaskuser/myTaskOne', {
				userTaskId: this.userTaskId, //用户任务id
			}).then((response) => {
				console.log(response.data);
				if(response.data.resultCode == 200) {
					//成功
					this.taskDetailInfo = response.data.yTaskUserOne, //任务详情信息
					console.log(this.taskList);
				}
			}).catch((error) => {
				//失败
				console.log(error);
			});
		}
	}
}</script>

<style scoped>@import url("../../style/todayTaskDetail.css");</style>

<style scoped>.mint-header {
	background: none;
}</style>