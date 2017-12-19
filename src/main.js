// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from '@/common/vue'
import App from './App'
import router from './router'
import http from '@/common/http'


//将 axios 改写为 Vue 的原型属性
//时间戳转换
Vue.prototype.$http = http
Vue.filter('time', function (format) {
  var timestamp4 = new Date(format * 1000);
  return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})