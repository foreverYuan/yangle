<template>
	<div class="fetalheartDetail">
		<mt-header title="胎心详细情况">
			<mt-button icon="back" slot="left" @click="goBack()"></mt-button>
		</mt-header>

		<div class="div-content">
			<!-- 时间 -->
			<div class="div-time">
				<p><span>{{fhrObj.startTime}}</span></p>
				<p><span>监测时间:</span><span>{{fhrObj.monitoringTime}}</span></p>
			</div>

			<!-- 胎心折线图 -->
			<!--<div class="div-chart" id="div-chart"></div>-->

			<div id="myChart" :style="{width: '100%', height: '300px'}"></div>
			<!-- 平均心率 胎动次数 -->
			<div class="div-heart-rate-move">
				<div>
					<p>{{fhrObj.meanHeartRate}}</p>
					<p>平均胎心率 (bpm)</p>
				</div>

				<div>
					<p>{{fhrObj.fetalMove}}</p>
					<p>胎动次数 (次)</p>
				</div>
			</div>
			<div style="margin-top: 10%;" v-if="fhrObj.state == 2">
				<button class="btn-goLogin" @click="shenqing" v-if="button">申请医生判读</button>
			</div>
			<div class="div-read" v-if="fhrObj.state == 3">
				<span>已申请医生判读，请耐心等待医生判读结果。</span>
			</div>
			<div class="div-result" v-if="fhrObj.state == 4 || fhrObj.state == 5">
				<p><span>判读结果</span><span v-if="fhrObj.state == 4">(正常)</span><span v-if="fhrObj.state == 5">(正常)</span></p>
				<p>{{fhrObj.readContent}}</p>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: "fetalheartDetail",
		data() {
			return {
				button: true,
				userId: localStorage.getItem('userId'),
				fhrId: this.$route.query.fhrId, //胎心id
				fhrObj: '',
				state: '3', //已申请医生判断的状态
			}
		},
		created() {
			this.getFhrDetail();
//			this.fhrId = null;
		},
		mounted() {

		},
		methods: {
			/**
			 * 申请判读
			 */
			shenqing() {
				// this.button=false;
				// this.wait=true;
				var that = this;
				this.axios.post('/yFetalMovement/yfetalmovement/applicateRead', {
					moveId: this.fhrId, //胎心id
					state: this.state, //胎心状态  1：不合规  <20 分钟 、2：未提交>20分钟、3：待判读；4  判读后分为：：正常，5：异常
				}).then(function(response) {
					if(response.data.resultCode == 200) {
						alert(response.data.resultMsg); //提示申请成功
						that.getFhrDetail(); //申请成功重新刷新接口
					} else {
						alert(response.data.resultMsg);
					}
				}).catch(function(error) {
					console.log(error);
				});

			},
			goBack() {
				this.$router.go(-1);
			},
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('myChart'));
				// 绘制图表
				myChart.setOption({
					title: {},
					tooltip: {},
					xAxis: {
						data: this.xdata
					},
					yAxis: {
						min: 0,
						max: 210,
					},
					dataZoom: {
						show: true,
						realtime: true,
						y: 0,
						height: 20,
						start: 0,
						end: 20
					},
					series: [{
							name: '胎心率',
							type: 'line',
							stack: '胎心率',
							data: this.wdata
						},
						{
							name: '宫缩',
							type: 'line',
							stack: '宫缩',
							data: this.ydata
						}
					]
				});
			},
			getData(aa) {
				var arr = [
					[]
				]
				arr = JSON.parse(aa)
				this.wdata = []
				this.ydata = []
				this.xdata = []
				for(let i = 0; i < arr.length; i++) { //循环最外面的数组
					for(let j = 0; j < arr[i].length; j++) { //循环里面的数组
						if(j == 0) {
							this.wdata.push(arr[i][0]); //弹出数组中的每一项
						} else if(j == 1) {
							this.ydata.push(arr[i][1]); //弹出数组中的每一项
						} else {
							// alert("222222"+new Date(arr[i][2]).getHours()+'时'+new Date(arr[i][2]).getHours()+'分'+new Date(arr[i][2]).getSeconds()+'秒') 
							//						this.xdata.push(new Date(arr[i][2]).getHours() + '时' + new Date(arr[i][2]).getHours() + '分' + new Date(arr[i][2]).getSeconds() + '秒'); //弹出数组中的每一项
							this.xdata.push(this.getFormatDate(arr[i][2]));
						}
					}
				}
				console.log("time-----------", this.xdata);
			},
			
			convertTime(time) {
				var unixTime = new Date(time);
			    var commonTime = unixTime.toLocaleString().split(' ')[1];
			    return commonTime;
			},
            /**
			 * 换算时间为hh:mm:ss
			 * 
			 * time   毫秒时间戳
			 */
			getFormatDate(time) {
			    var data = new Date(time);
				var year = data.getFullYear();
				var month = data.getMonth() + 1;
				month= month < 10 ? ('0' + month) : month;
				var day = data.getDate();
				day = day < 10 ? ('0' + day) : day;
				var hour = data.getHours();
				hour = hour < 10 ? ('0' + hour) : hour;
				var minute = data.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				var second = data.getSeconds();
				second = second < 10 ? ('0' + second) : second;
				return hour + ':' + minute + ':' + second;
			},
			/**
			 * 请求胎心详细数据的接口
			 */
			getFhrDetail() {
				this.axios.post('/yFetalMovement/yfetalmovement/fetalMoveDetail', {
					moveId: this.fhrId, //胎心id
				}).then((response) => {
					if(response.data.resultCode == 200) {
						this.fhrObj = response.data.data;
						this.getData(this.fhrObj.heartRecord);
						this.drawLine();
					} else {
						alert(response.data.resultMsg);
					}
				}).catch((error) => {
					console.log(error);
				});
			},
		}
	}
</script>

<style scoped>
	@import url("../../style/fetalheartDetail.css");
	.mint-header {
		background: #FC9FD7;
	}
	
	.btn-goLogin {
		width: 100%;
		height: 3rem;
		background: rgb(252, 159, 215);
		border: none;
	}
</style>