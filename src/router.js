import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '主页',
      component: Home
    },
    {
      path: '/design',
      name:'设计界面',
      component: () => import(/* webpackChunkName: "about" */ './views/Design.vue')
    }
  ]
})
