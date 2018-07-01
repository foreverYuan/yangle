// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Animate from 'animate.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(MintUI)
Vue.use(VueAxios, axios)

import titleH from './components/commen/titleH'
Vue.component('title-h', titleH)

import base from './base'
Vue.use(base);
//axios.defaults.baseURL = 'https://192.168.0.109:8080/yangle'
// axios.defaults.baseURL = 'https:yl.atersoft.com:8080/yangle'
   axios.defaults.baseURL = 'https://yl.ibao365.net:8080/yangle'
 // 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(MintUI)
Vue.use(Animate)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
