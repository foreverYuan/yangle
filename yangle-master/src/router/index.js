import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import homepage from '@/components/homepage/homepage'
import knowledgeDetail from '@/components/homepage/knowledgeDetail'
import consult from '@/components/consult/consult'
import fetalheart from '@/components/fetalheart/fetalheart'
import assistant from '@/components/assistant/assistant'
import person from '@/components/person/person'
import login from '@/components/person/login'
import register from '@/components/person/register'
import retriPwd from '@/components/person/retriPwd'
import userInfo from '@/components/person/userInfo'
import myFetalHeart from '@/components/fetalheart/myFetalHeart'
import expecProductDate from '@/components/expecProductDate/expecProductDate'
import fetalheartDetail from '@/components/fetalheart/fetalheartDetail'
import todayTask from '@/components/homepage/todayTask'
import todayTaskDetail from '@/components/homepage/todayTaskDetail'
import lianDong from '@/components/person/lianDong'
Vue.use(Router)

export default new Router({
	routes: [{
		path: '/home',
		name: 'home',
		component: home,
		children: [{
			path: 'homepage', //首页
			component: homepage,
		},
		{
			path: 'consult', //咨询
			component: consult,
		},
		{
			path: 'fetalheart', //胎心
			component: fetalheart,
		},
		{
			path: 'assistant', //助手
			component: assistant,
		},
		{
			path: 'person', //个人
			component: person,
		}
		]
	},
	{
		path: '/knowledgeDetail', //知识详情
		name: 'knowledgeDetail',
		component: knowledgeDetail
	},
	{
		path: '/login',//登录
		name: 'login',
		component: login
	},
	{
		path: '/register',//注册
		name: 'register',
		component: register
	},
	{
		path: '/retriPwd',//忘记密码
		name: 'retriPwd',
		component: retriPwd
	},
	{
		path: '/userInfo',//用户基本信息
		name: 'userInfo',
		component: userInfo
	},
	{
		path: '/myFetalHeart',//我的胎心
		name: 'myFetalHeart',
		component: myFetalHeart

	},
	{
		path: '/', //预产期
		name: 'expecProductDate',
		component: expecProductDate
	},
	{
		path: '/fetalheartDetail', //胎心详情
		name: 'fetalheartDetail',
		component: fetalheartDetail
	},
	{
		path: '/todayTask', //今日任务
		name: 'todayTask',
		component: todayTask
	},
	{
		path: '/todayTaskDetail', //今日任务详情
		name: 'todayTaskDetail',
		component: todayTaskDetail
	},
	{
		path: '/lianDong', //今日任务详情
		name: 'lianDong',
		component: lianDong
	},
	]
})