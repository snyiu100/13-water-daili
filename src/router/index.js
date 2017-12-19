import Vue from 'vue'
import Router from 'vue-router'
import { isfooter, userInfo, isHeader } from '@/common/state'
import storage from '@/common/localStorage'
import service from '@/common/service'


import Home from '@/views/Home'

import agentList from '@/views/agentList'
import agentSearch from '@/views/agentSearch'
import login from '@/views/login'
import agentEdit from '@/views/agentEdit'
import changePsw from '@/views/changePsw'
import createAgent from '@/views/createAgent'
import giftRecordsearch from '@/views/giftRecordsearch'
import giftRecord from '@/views/giftRecord'
import myData from '@/views/myData'
import propsGifts from '@/views/propsGifts'
import userSearch from '@/views/userSearch'
import userList from '@/views/userList'

Vue.use(Router)

const routes = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: login
    },
    {
      path: '/home',
      name: '登录',
      component: Home
    },
    {
      path: '/agentList',
      name: 'agentList',
      component: agentList
    },
    {
      path: '/agentSearch',
      name: 'agentSearch',
      component: agentSearch
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/agentEdit',
      name: 'agentEdit',
      component: agentEdit
    },
    {
      path: '/changePsw',
      name: 'changePsw',
      component: changePsw
    },
    {
      path: '/createAgent',
      name: 'createAgent',
      component: createAgent
    },
    {
      path: '/giftRecordsearch',
      name: 'giftRecordsearch',
      component: giftRecordsearch
    },
    {
      path: '/giftRecord',
      name: 'giftRecord',
      component: giftRecord
    },
    {
      path: '/myData',
      name: 'myData',
      component: myData
    },
    {
      path: '/propsGifts',
      name: 'propsGifts',
      component: propsGifts
    },
    {
      path: '/userSearch',
      name: 'userSearch',
      component: userSearch
    },
    {
      path: '/userList',
      name: 'userList',
      component: userList
    }
  ]
})

//const path=['/home','/lotteryIndex','/userIndex','/betLianMa','/betLianMa','/betzhengMaSix','/betQuanBuZhong','/betQuanBuXuan','/betHeXiao','/betWeiShuLian','/betBanBo','/betTeMaShengXiao','/betYiXiao','/betWeiShu','/betTeMa/1','/betTeMa/2','/betzhengMaZhengA/3','/betzhengMaZhengA/4','/betZhengMaTe','/betZhengMaSix','/betShengXiaoLian'];
//判断底部导航是否显示
routes.beforeEach((to, from, next) => {
  // console.log(to.path.indexOf('/login'));
  //路由显示底部菜单
  if (to.path.indexOf('/login') < 0) {
    if (storage.getItem('agent_account')) {
      next();
    } else {
      service.openToast(true, "请登录谢谢");
      next({
        path: '/login',//query: {redirect: to.fullPath}
      })
    }
  } else {
    next();
  }
})

export default routes;