<template>
	<div class="todayTask">
		<mt-header title="今日任务">
			<mt-button icon="back" slot="left" @click="goBack()"></mt-button>
		</mt-header>

		<div class="div-content">
			<div class="div-task-canvas" v-for="item in taskkList">
					<!-- 已完成 -->
					<div class="div-task" v-if="item.taskStatus == 2" @click="goTaskDetail(item)">
						<p>{{item.taskName}}</p>
						<p class="p-heart">
							<img src="../../assets/task_heart.png" />
							<img src="../../assets/task_heart.png" />
							<img src="../../assets/task_heart.png" />
						</p>
					</div>
					<!-- 去完成 -->
					<div class="div-task" v-if="item.taskStatus == 1" style="background: #FF89D1;" @click="goTaskDetail(item)">
						<p>{{item.taskName}}</p>
						<p class="p-heart">去完成</p>
					</div>
					<!-- 待解锁 -->
					<div class="div-task" v-if="item.taskStatus == 0" style="background: #ccc;border: none;" @click="goTaskDetail(item)">
						<p>{{item.taskName}}</p>
						<img src="../../assets/task_locking.png" class="img-locking" />
					</div>
				<canvas id="myCanvas" class="canvas"></canvas>
			</div>
		</div>
		<img src="../../assets/task_background.png" class="todayTask-background" />
	</div>

</template>

<script>
	export default {
		name: "todayTask",
		data() {
			return {
				//今日任务   state-任务状态   0：待解锁 1：未完成 2 已完成          
				taskkList: [{
						"taskName": "吃几个核桃",
						"taskContent": "由于核桃里边含有亚油酸。它是组成DHA的必备物质，而DHA的存在对大脑有很大的优点。",
						"taskStatus": "0"
					},
					{
						"taskName": "喝多少牛奶",
						"taskContent": "由于核桃里边含有亚油酸。它是组成DHA的必备物质，而DHA的存在对大脑有很大的优点。",
						"taskStatus": "0"
					},
					{
						"taskName": "睡几个钟头",
						"taskContent": "由于核桃里边含有亚油酸。它是组成DHA的必备物质，而DHA的存在对大脑有很大的优点。",
						"taskStatus": "1"
					},
					{
						"taskName": "运动几分钟",
						"taskContent": "由于核桃里边含有亚油酸。它是组成DHA的必备物质，而DHA的存在对大脑有很大的优点。",
						"taskStatus": "2"
					},
				],
				//				
				/* 获取任务列表接口  start */
				/* 请求参数 */
				userId: localStorage.getItem('userId'), //用户id

				/* 返回参数 */
				taskList: [], //任务列表
				/* 获取任务列表接口  end */
			}
		},

		created() {
			this.getTaskList();
		},

		mounted() {
			this.addTask();
		},
		
		updated() {
			this.addTask();
		},

		methods: {
			/**
			 * 返回上一级路由
			 */
			goBack() {
				this.$router.go(-1);
			},

			/**
			 * 动态添加任务
			 */
			addTask() {
				var content = document.getElementsByClassName("div-task");
				var myCanvas = document.getElementsByClassName("canvas");
				for(var i = 0; i < content.length; i++) {
					console.log("---------------", i + "");
					myCanvas[i].id = "myCanvas" + i;
					var canvas = document.getElementById(myCanvas[i].id);
					var cxt = canvas.getContext("2d");
					cxt.lineWidth = 7;
					cxt.strokeStyle = "#FAAADB";
					content[i].style.bottom = 2 + (i * 9) + 'rem';
					myCanvas[i].style.bottom = 8 + (i * 9) + 'rem';
					//图的位置变换
					if(i % 2) { //奇数
						content[i].style.left = '4rem';
					} else { //偶数
						content[i].style.right = '4rem';
					}
					//线的位置变换，最后一个不用画线
					if(i != content.length - 1) {
						if(i % 2) { //奇数
							cxt.moveTo(myCanvas[i].width / 3 * 1.7, 0);
							cxt.lineTo(myCanvas[i].width / 2.5, myCanvas[i].height);
							cxt.stroke();
						} else { //偶数
							cxt.moveTo(myCanvas[i].width / 2.5, 0);
							cxt.lineTo(myCanvas[i].width / 3 * 1.7, myCanvas[i].height);
							cxt.stroke();
						}
					}
				}
			},

			/**
			 * 跳转任务详情
			 */
			goTaskDetail(task) {
				this.$router.push({
					path: '/todayTaskDetail',
					query: {
						task: JSON.stringify(task),
						taskId: JSON.stringify(task.taskId), //任务id
					}
				})
				console.log("task", task);
			},

			/**
			 * 获取任务列表数据
			 */
			getTaskList() {
				this.axios.post('/yTaskUser/ytaskuser/myTaskList', {
					userId: this.userId, //用户id,非必填
				}).then((response) => {
					console.log(response.data);
					if(response.data.resultCode == 200) {
						//成功
						this.taskList = response.data.yTaskUserList //任务列表
						console.log("哈哈哈", this.taskList);
						for(var i = 0; i < this.taskList.length; i++) {
							console.log("aaa", this.taskList[i].taskStatus == 0);
						}
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
	@import url("../../style/todayTask.css");
</style>