import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
// eslint-disable-next-line no-unused-vars
import animate from 'animate.css'

import VueRouter from "vue-router";
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import {Container, Header, Aside, Main, Footer,Row,Col,Message} from 'element-ui';
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Row);
Vue.use(Col);

Vue.prototype.$message = Message;
Vue.config.productionTip = false;



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
