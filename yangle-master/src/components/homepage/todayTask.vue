<template>
	<div class="todayTask">
		<mt-header title="今日任务">
			<mt-button icon="back" slot="left" @click="goBack()"></mt-button>
		</mt-header>

		<!--<div class="div-content">
			<div class="div-task-canvas" v-for="item in taskList">-->
		<!-- 已完成 -->
		<!--<div class="div-task" v-if="item.taskStatus == 2" @click="goTaskDetail(item)">
					<p>{{item.taskName}}</p>
					<p class="p-heart">
						<img src="../../assets/task_heart.png" />
						<img src="../../assets/task_heart.png" />
						<img src="../../assets/task_heart.png" />
					</p>
				</div>-->
		<!-- 去完成 -->
		<!--<div class="div-task" v-if="item.taskStatus == 1" style="background: #FF89D1;" @click="goTaskDetail(item)">
					<p>{{item.taskName}}</p>
					<p class="p-heart">去完成</p>
				</div>-->
		<!-- 待解锁 -->
		<!--<div class="div-task" v-if="item.taskStatus == 0" style="background: #ccc;border: none;" @click="goTaskDetail(item)">
					<p>{{item.taskName}}</p>
					<img src="../../assets/task_locking.png" class="img-locking" />
				</div>
				<canvas id="myCanvas" class="canvas"></canvas>
			</div>
		</div>-->
		<div class="div-content">

			<div v-for="(item, index) in taskList" @click="goTaskDetail(item)">
				<div v-if="index == 0">
					<div class="div-big-task">
						<img src="../../assets/3x/task-board@3x.png" class="img-task-background" />
						<div class="div-small-task">
							<span class="task-title" v-if="item.taskStatus == 1 || item.taskStatus == 2">{{item.taskName}}</span>
							<span class="task-title" style="color: #ccc;" v-if="item.taskStatus == 0">{{item.taskName}}</span>
							<div>
								<span v-for="(taskImg, index1) in taskImg" v-if="item.taskStatus == 1 || item.taskStatus == 2" class="task-pic">
							<img :src="item.taskPicture" v-if="!(index1 == 2 && item.taskStatus == 1)"/>   <!--todo 需要换成后台数据-->
							<img :src="item.taskPicture" v-if="index1 == 2 && item.taskStatus == 1" class="gray"/>
						</span>
								<span style="width: 1.5rem;margin-left: 35%;" v-if="item.taskStatus == 0">    <!--带解锁-->
						      <img src="../../assets/3x/task-lock@3x.png" width="100%"/>
						</span>
							</div>
						</div>
					</div>
					<img src="../../assets/3x/task-line-a@3x.png" style="width: 10rem;margin-top: -3rem;margin-left: 2rem;" v-if="index != taskList.length - 1" />
				</div>

				<div v-if="index == 1" style="margin-top: -5rem;margin-left: 3rem;">
					<div class="div-big-task">
						<img src="../../assets/3x/task-board@3x.png" class="img-task-background" />
						<div class="div-small-task">
							<span class="task-title" v-if="item.taskStatus == 1 || item.taskStatus == 2">{{item.taskName}}</span>
							<span class="task-title" style="color: #ccc;" v-if="item.taskStatus == 0">{{item.taskName}}</span>
							<div>
								<span v-for="(taskImg, index1) in taskImg" v-if="item.taskStatus == 1 || item.taskStatus == 2" class="task-pic">
							<img :src="item.taskPicture" v-if="!(index1 == 2 && item.taskStatus == 1)"/>   <!--todo 需要换成后台数据-->
							<img :src="item.taskPicture" v-if="index1 == 2 && item.taskStatus == 1" class="gray"/>
						</span>
								<span style="width: 1.5rem;margin-left: 35%;" v-if="item.taskStatus == 0">    <!--带解锁-->
						      <img src="../../assets/3x/task-lock@3x.png" width="100%"/>
						</span>
							</div>
						</div>
					</div>
					<img src="../../assets/3x/task-line-b@3x.png" style="width: 10rem;margin-top: -4.5rem;margin-left: 1rem;" v-if="index != taskList.length - 1" />
				</div>

				<div v-if="index % 2 == 0 && index != 0" style="margin-top: -4.3rem;margin-left: 7rem;">
					<div class="div-big-task">
						<img src="../../assets/3x/task-board@3x.png" class="img-task-background" />
						<div class="div-small-task">
							<span class="task-title" v-if="item.taskStatus == 1 || item.taskStatus == 2">{{item.taskName}}</span>
							<span class="task-title" style="color: #ccc;" v-if="item.taskStatus == 0">{{item.taskName}}</span>
							<div>
								<span v-for="(taskImg, index1) in taskImg" v-if="item.taskStatus == 1 || item.taskStatus == 2" class="task-pic">
							<img :src="item.taskPicture" v-if="!(index1 == 2 && item.taskStatus == 1)"/>   <!--todo 需要换成后台数据-->
							<img :src="item.taskPicture" v-if="index1 == 2 && item.taskStatus == 1" class="gray"/>
						</span>
								<span style="width: 1.5rem;margin-left: 35%;" v-if="item.taskStatus == 0">    <!--带解锁-->
						      <img src="../../assets/3x/task-lock@3x.png" width="100%"/>
						</span>
							</div>
						</div>
					</div>
					<img src="../../assets/3x/task-line-c@3x.png" style="width: 10rem;margin-top: -4rem;margin-left: -1rem;" v-if="index != taskList.length - 1" />
				</div>

				<div v-if="index % 2 == 1 && index != 1" style="margin-top: -4.5rem;margin-left: 3rem;">
					<div class="div-big-task">
						<img src="../../assets/3x/task-board@3x.png" class="img-task-background" />
						<div class="div-small-task">
							<span class="task-title" v-if="item.taskStatus == 1 || item.taskStatus == 2">{{item.taskName}}</span>
							<span class="task-title" style="color: #ccc;" v-if="item.taskStatus == 0">{{item.taskName}}</span>
							<div>
								<span v-for="(taskImg, index1) in taskImg" v-if="item.taskStatus == 1 || item.taskStatus == 2" class="task-pic">
							<img :src="item.taskPicture" v-if="!(index1 == 2 && item.taskStatus == 1)"/>   <!--todo 需要换成后台数据-->
							<img :src="item.taskPicture" v-if="index1 == 2 && item.taskStatus == 1" class="gray"/>
						</span>
								<span style="width: 1.5rem;margin-left: 35%;" v-if="item.taskStatus == 0">    <!--带解锁-->
						      <img src="../../assets/3x/task-lock@3x.png" width="100%" />
						</span>
							</div>
						</div>
					</div>
					<img src="../../assets/3x/task-line-b@3x.png" style="width: 10rem;margin-top: -4rem;margin-left: 1rem;" v-if="index != taskList.length - 1" />
				</div>
			</div>
		</div>
		<img src="../../assets/3x/todayTask-background@3x.png" class="todayTask-background" />
		<!--<img src="../../assets/todayTask-background.png" style="position: absolute;top: 100%;z-index: -1;" id="img-add-background" />-->
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
						"taskStatus": "2"
					},
					{
						"taskName": "喝多少牛奶",
						"taskContent": "由于核桃里边含有亚油酸。它是组成DHA的必备物质，而DHA的存在对大脑有很大的优点。",
						"taskStatus": "1"
					},
					{
						"taskName": "睡几个钟头",
						"taskContent": "由于核桃里边含有亚油酸。它是组成DHA的必备物质，而DHA的存在对大脑有很大的优点。",
						"taskStatus": "0"
					},
					{
						"taskName": "运动几分钟",
						"taskContent": "由于核桃里边含有亚油酸。它是组成DHA的必备物质，而DHA的存在对大脑有很大的优点。",
						"taskStatus": "0"
					},
				],
				//				
				/* 获取任务列表接口  start */
				/* 请求参数 */
				userId: localStorage.getItem('userId'), //用户id

				/* 返回参数 */
				taskList: [], //任务列表
				taskImg: ['a', 'b', 'c'],
				/* 获取任务列表接口  end */
			}
		},

		created() {
			this.getTaskList();
		},

		mounted() {
			//			this.addTask1();
			//			this.addTask();
		},

		updated() {
			//			this.addTask1();
			this.addTask();
//          this.setAddBackHeight();
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
				var tasks = document.getElementsByClassName('div-todayTask');
				var taskMarginTop, taskMarginLeft;
				for(var i = 0; i < tasks.length; i++) {
					switch(i) {
						case 0:

							break;

						case 1:
							taskMarginTop = '-5rem';
							taskMarginLeft = '3rem';
							break;

						case 2:
							taskMarginTop = '-4.3rem';
							taskMarginLeft = '7rem';
							break;

						case 3:
							taskMarginTop = '-4.5rem';
							taskMarginLeft = '3rem';
							break;
					}
					tasks[i].marginTop = taskMarginTop;
					tasks[i].marginLeft = taskMarginLeft;
				}
			},

            /**
             * 设置新增背景的高度
             */
			setAddBackHeight() {
				var addBackground = document.getElementById("img-add-background");
				var height = document.body.scrollHeight;
				var screenHeight = window.screen.height;
				var showHeight = height - screenHeight + 10;
				addBackground.style.height = showHeight + 'px';
			},

			/**
			 * 动态添加任务
			 */
			addTask1() {
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
						taskId: task.taskUserId, //任务id
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

<style>
	.todayTask .mint-header .mint-button {
		color: #333;
	}
	
	.todayTask .mint-header-title {
		color: #333;
	}
</style>