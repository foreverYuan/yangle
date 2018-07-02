<template>
	<div class="todayTaskDetail">
		<mt-header title="今日任务详情">
			<mt-button icon="back" slot="left" @click="goBack()"></mt-button>
		</mt-header>
		<div class="div-task-detail-background">
			<div class="div-task-desc">
				<h3>{{task.taskName}}</h3>
				<p>{{task.taskContent}}</p>
			</div>
			<img src="../../assets/task_board.png" class="task-board-style" />
		</div>
		<button class="btn-completed" v-if="task.taskStatus == 2">已完成</button>
		<button class="btn-complete" v-if="task.taskStatus == 1" @click="goComplete()">完 成</button>
		<button class="btn-locking" v-if="task.taskStatus == 0">
			<img src="../../assets/task_locking.png" />
		</button>
		<div id="div-add-integral" class="div-add-integral">
			<h1 style="width: 33.3%;">
				<img src="../../assets/integral.png" style="text-align: center;"/>
			</h1>
			<h1 style="width: 33.3%;color: #FF6EA5;text-align: center;" id="text-integral">+</h1>
			<h1 style="width: 33.3%;color: #FF6EA5;text-align: left;">{{addedIntegral}}</h1>
		</div>
		<!--点击完成按钮弹框提示-->
		<div v-if="isFinish" class="div-finish-remind">
			<p>{{finishTaskText}}</p>
			<img src="../../assets/task-remind-background.png" />
		</div>
		<!--背景图-->
		<img src="../../assets/task_detail_background.png" class="todayTaskDetail-background" />
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
			userId: localStorage.getItem("userId"), //用户id
			isFinish: false,
			finishTaskText: "",
			isEnd: false, //是否只剩下最后一个未完成任务
			addedIntegral: '', //完成任务增加的积分
		}
	},

	created() {
		this.setRemindText();
		console.log("task", JSON.parse(this.$route.query.task));
	},

	methods: {
		goBack() {
			this.$router.go(-1);
		},

		/**
		 * 设置点击完成按钮的提示文本
		 */
		setRemindText() {
			if(this.isEnd) {
				this.finishTaskText = "太棒了妈妈,任务都完成了奥，我越来越健康了呢。";
			} else {
				this.finishTaskText = "妈妈好厉害，任务完成了哟，再接再励把其他任务也完成了吧";
			}
		},

		/**
		 * 点击完成按钮
		 */
		goComplete() {
			console.log("this.userTaskId", this.userTaskId);
			this.axios.post('/yTaskUser/ytaskuser/toFinish', {
				taskUserId: this.userTaskId, //任务id
				userId: this.userId, //用户id
				taskStatus: "2", //完成状态
			}).then((response) => {
				if(response.data.resultCode == 200) {
					this.isFinish = true;
					this.addIntegralStyle();
					this.addedIntegral = response.data.point; //完成任务增加的积分
					//成功
					this.getTaskDetail(); //刷新详情页信息
				} else {
					alert(response.data.resultMsg);
				}
			}).catch((error) => {
				//失败
				console.log(error);
			});
			this.isFinish = false;
		},

		/**
		 * 增加积分样式
		 */
		addIntegralStyle() {
			//积分动画效果，逐渐变大变淡往上平移
			var integral = document.getElementById("div-add-integral");
			integral.style.visibility = 'visible';
			integral.style.width = '60%';
			integral.style.opacity = 0;
			integral.style.bottom = '60%';
			integral.style.fontSize = '2rem';
			integral.style.marginLeft = '20%';
			var integralImg = integral.getElementsByTagName('img');
			integralImg[0].style.width = '3rem';
			//				integral.style.animation = "integral 5s";
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