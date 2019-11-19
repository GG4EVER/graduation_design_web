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
            path: '/login',
            name: '登录界面',
            component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
        },
        {
            path: '/user',
            name: '用户个人中心界面',
            component: () => import(/* webpackChunkName: "about" */ './views/User.vue')
        },
        {
            path: '/about',
            name: '关于平台',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/design',
            name: '设计界面',
            component: () => import(/* webpackChunkName: "about" */ './views/Design.vue')
        },
        {
            path: '/error',
            name: '错误页面',
            component: () => import(/* webpackChunkName: "about" */ './views/Error.vue')
        },
        {
            path: '*',
            name: '以上都没匹配成功，重定向到错误页面',
            redirect:'/error'
        }
    ]
})
