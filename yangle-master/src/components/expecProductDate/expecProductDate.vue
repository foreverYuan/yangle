<!--设置基本信息页面-->
<template>
	<div class="expecProductDate">
		<!--<img src="../../assets/pregnant_mother_background.png" style="position: absolute;width: 100%;height: 100%;left: 0;top: 0;" />-->
		<div class="div-content">
			<h2 class="epd-title">请设置您的基本信息</h2>
			<img src="../../assets/3x/epd-top-pic@3x.png" id="top-pic" />
			<div @click="openBirthPicker" class="div-input">
				<img src="../../assets/2x/epd-birth-icon@2x.png" class="icon" />
				<div>
					<input placeholder="您的生日" type="text" v-model="yourBirth" readonly="readonly" class="mt-field-yourBirth" />
					<span class="el-icon-arrow-right float-right right-arrow"></span>
				</div>
			</div>

			<div @click="countEPD" class="div-input">
				<img src="../../assets/2x/epd-calculate-icon@2x.png" class="icon" />
				<div id="epddd">
					<input placeholder="计算预产期" type="text" readonly="readonly" class="mt-field-yourBirth" />
					<span class="el-icon-arrow-right float-right right-arrow" v-if="countEPDFlag == false"></span>
					<span class="el-icon-arrow-down float-right right-arrow" v-if="countEPDFlag == true"></span>
				</div>
			</div>

			<div @click="openEndMensesPicker" class="div-input" v-if="countEPDFlag == true">
				<div>
					<input placeholder="设置末次月经" type="text" v-model="endMenses" readonly="readonly" class="mt-field-yourBirth" />
					<span class="el-icon-arrow-right float-right right-arrow"></span>
				</div>
			</div>
			<span class="span-no-know-epd">不知道预产期?</span>

			<div @click="openEPDPicker" class="div-input">
				<img src="../../assets/3x/epd-baby-icon@3x.png" class="icon" />
				<div>
					<input placeholder="设置预产期" type="text" v-model="expecDate" readonly="readonly" class="mt-field-yourBirth" />
					<span class="el-icon-arrow-right float-right right-arrow"></span>
				</div>
			</div>

			<button class="btn-start-use" @click="jumpHome">立即使用</button>
			<!--<p class="p-register" @click="goRegister">注册账号,进行绑定</p>-->

			<mt-datetime-picker ref="birthPicker" type="date" v-model="birthValues" :startDate="startBirthDate" :endDate="endBirthDate" @confirm="handleBirthConfirm">
			</mt-datetime-picker>

			<mt-datetime-picker ref="epdPicker" type="date" v-model="epdValues" :startDate="startEPDDate" :endDate="endEPDDate" @confirm="handleEPDConfirm">
			</mt-datetime-picker>

			<mt-datetime-picker ref="endMensesPicker" type="date" v-model="endMensesValues" :startDate='startEMDate' :endDate="endEMDate" @confirm="handleEndMensesConfirm">
			</mt-datetime-picker>
		</div>
	</div>
</template>

<script>
	export default {
		name: "expecProductDate",
		data() {
			return {
				expecDate: "", //预产期
				birthValues: new Date(),
				epdValues: new Date(),
				endMensesValues: new Date(),
				countEPDFlag: false, //是否点击计算预产期，默认没有点击

				/* 计算预产期接口 start */
				/* 请求参数 */
				yourBirth: '', //生日
				endMenses: '', //末次月经
				startBirthDate: new Date('1970-01-01'),
				endBirthDate: new Date('2002-12-12'),
				startEPDDate: new Date(),
				endEPDDate: new Date('2050-01-01'),
				startEMDate: new Date('2017-06-06'),
				endEMDate: new Date(),
				/* 返回参数 */
				/* 计算预产期接口 end */
			}
		},

		created() {
//			if(!localStorage.getItem("uuid")) {
//				localStorage.setItem("uuid", plus.device.uuid);
//				alert(plus.device.uuid);
//			}
//			alert("哈哈哈");
			if(localStorage.getItem("pregnancyDate") != null && localStorage.getItem("pregnancyDate") != "") {
				sessionStorage.setItem('homeSelect', 1);
				this.$router.push({
					path: '/home/homepage'
				})
			}
			//			this.yourBirth = this.getFormatDate(new Date());
			//			this.endMenses = this.getFormatDate(new Date());
			//			this.expecDate = this.getFormatDate(new Date());
		},
		methods: {

			openBirthPicker() {
				this.$refs.birthPicker.open();
			},
			openEPDPicker() {
				this.$refs.epdPicker.open();
			},
			openEndMensesPicker() {
				this.$refs.endMensesPicker.open();
			},

			handleBirthConfirm(value) {
				this.yourBirth = this.getFormatDate(value);
			},
			handleEPDConfirm(value) {
				this.expecDate = this.getFormatDate(value);
			},
			handleEndMensesConfirm(value) {
				this.endMenses = this.getFormatDate(value);
				this.countPreProdPeriod();
			},
			/**
			 * 获取格式化后的日期
			 * @param data
			 * @returns {string}
			 */
			getFormatDate(data) {
				var y = data.getFullYear();
				var m = data.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = data.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = data.getHours();
				var minute = data.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				return y + '-' + m + '-' + d + ' ';
			},

			/**
			 * 计算预产期
			 */
			countEPD() {
				if(this.countEPDFlag) {
					this.countEPDFlag = false;
				} else {
					this.countEPDFlag = true;
				}
			},

			/**
			 * 开始使用
			 */
			goStartUse() {
				sessionStorage.setItem('homeSelect', 1);
				this.$router.push({
					path: '/home/homepage'
				})
			},

			/**
			 * 注册账号
			 */
			goRegister() {
				this.jumpRouterById('/login', 5);
				this.cacheData();
			},

			//			this.$router.push({
			//				path: '/home/homepage'
			//			});
			/**
			 * 计算预产期
			 */
			countPreProdPeriod() {
				this.axios.post('/userControllerAPI/preProdPeriod', {
					equipmentId: this.base_uuid(), //设备id
					birthday: this.yourBirth, //生日
					lastMenstruation: this.endMenses, //末次月经
				}).then((response) => {
					console.log(response.data);
					if(response.data.resultCode == 200) {
						this.expecDate = response.data.pregnancyDate;
					} else {
						plus.nativeUI.alert(response.data.resultMsg);
					}

				}).catch((error) => {
					console.log(error);
				});
			},

			jumpHome() {
				if(this.yourBirth.trim() == '') {
					return plus.nativeUI.alert("请设置您的生日");
				}
				if(this.expecDate.trim() == '') {
					return plus.nativeUI.alert("请设置您的预产期");
				}
				sessionStorage.setItem('homeSelect', 1);
				this.$router.push({
					path: '/home/homepage'
				});
				this.cacheData();
			},

			/**
			 * 把生日预产期末次月经的数据放缓存
			 */
			cacheData() {
				localStorage.setItem('pregnancyDate', this.expecDate); //预产期放入本地缓存
				localStorage.setItem('yourBirth', this.yourBirth); //生日放入本地缓存
				localStorage.setItem('endMenses', this.endMenses); //末次月经放入本地缓存
			}

		}
	}
</script>

<style scoped>
	@import url("../../style/expecProductDate.css");
</style>

<style>
	.expecProductDate .mint-field .mint-cell-title {
		width: 70%;
	}
	
	.expecProductDate .mintui {
		font-size: 0px;
	}
	
	.expecProductDate .mint-field-core {
		margin-left: -0.5rem;
	}
	
	.expecProductDate .mint-cell-wrapper {
		padding: 0 0 0 10px;
		line-height: 0;
	}
	
	.expecProductDate ::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #ccc;
		font-size: 1.1rem;
		height: 2rem;
	}
	
	.expecProductDate :-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #ccc;
		font-size: 1.1rem;
		height: 2rem;
	}
	
	.expecProductDate ::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #ccc;
		font-size: 1.1rem;
		height: 2rem;
	}
	
	.expecProductDate :-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #ccc;
		font-size: 1.1rem;
		height: 2rem;
	}
	
	#epddd ::-webkit-input-placeholder {
		color: #333;
	}
	
	#epddd :-moz-placeholder {
		color: #333;
	}
	
	#epddd ::-moz-placeholder {
		color: #333;
	}
	
	#epddd :-ms-input-placeholder {
		color: #333;
	}
</style>