<!--三级联动选择器组件-->
<template>
  <div>
    <div class="btnbox">
      <!-- <div class="btn" @click="toShow">打开picker</div> -->
    </div>
    <p class="p-info" style="clear: both;" v-on:click="toShow"><span>所在地</span><span class="float-right">
				<span >{{pickData.default}}</span>
				<!-- <span >123</span> -->
				<span class="el-icon-arrow-right"></span></span>
			</p>
    <!-- <div class="result">
         <p class="p-info" style="clear: both;" ><span></span><span class="float-right">
				<span class="el-icon-arrow-right"></span></span>
			</p> 
      <p></p>
    </div> -->
    <vue-pickers
      :show="show"
      :link="link"
      :columns="columns"
      :selectData="pickData"
      @cancel="close"
      @confirm="confirmFn"></vue-pickers>
  </div>
</template>

<script>
import vuePickers from 'vue-pickers'
import {provs_data, citys_data, dists_data} from 'vue-pickers/lib/areaData'
export default {
  components: {
    vuePickers
  },
  data() {
    return {
      isCopy: '',
      res: null,
      show: false,
      columns: 3,
      link: true,
      pickData: {
        data1: provs_data,
        data2: citys_data,
        data3: dists_data
      }
    }
  },
  methods: {
    close() {
      this.show = false
    },
    confirmFn(val) {
      this.show = false
      console.log(val)
      this.res = val
      this.pickData.default = `${val.select1.text}-${val.select2.text}-${val.select3.text}`
      debugger
    },
    toShow() {
      this.show = true
    }
  }
}
</script>
<style>
@import url("../../style/userInfo.css");
</style>

<style>
.btnbox{
  display: flex;
  justify-content: center;
}
.btn{
  background: #2e68fa;
  color: #fff;
  padding: 5px 10px;
  display: inline-block;
  margin: 0 10px;
  font-size: 14px;
  border-radius: 4px;
}
.result{
  text-align: center;
  padding: 10px;
}
.isCopy{
  margin: 10px;
  border: 1px dashed red;
  text-align: center
}
</style>

