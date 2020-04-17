import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import axios from 'axios';
Vue.prototype.$axios = axios;

import 'element-ui/lib/theme-chalk/index.css'
// eslint-disable-next-line no-unused-vars
import animate from 'animate.css'

import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'fdab55aee67dcb247e4bc8053c1dbcff',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
  v: '1.4.4'
});

import API from './config/api'
Vue.prototype.$API = API;

import ComponentConfig from  './config/uniAppComponentsConfig'
Vue.prototype.$ComponentConfig = ComponentConfig.Config; //将uni app所有组件的属性的配置挂载在Vue
Vue.prototype.$AttributeComponentMap = ComponentConfig.AttributeComponentMap; //将uni app所有组件名称对应属性组件的名称的map配置挂载在Vue

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
