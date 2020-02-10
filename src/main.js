import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import axios from 'axios';
Vue.prototype.$axios = axios;

import 'element-ui/lib/theme-chalk/index.css'
// eslint-disable-next-line no-unused-vars
import animate from 'animate.css'

import API from './config/api'
Vue.prototype.$API = API;

// 解决两次访问相同路由地址报错
import VueRouter from "vue-router";
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import {Container, Header, Aside, Main, Footer,Row,Col,Message,MessageBox,Loading} from 'element-ui';
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Row);
Vue.use(Col);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox;
Vue.prototype.$loading = Loading;
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
