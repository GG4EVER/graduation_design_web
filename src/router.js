import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
    //mode: 'history',
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
            path: '/logout',
            name: '退出登录界面',
            component: () => import(/* webpackChunkName: "about" */ './views/Logout.vue')
        },
        {
            path: '/user',
            component: () => import(/* webpackChunkName: "about" */ './views/User.vue'),
            children:[
                {
                    path: '/',
                    name: '用户个人中心界面',
                    component: () => import(/* webpackChunkName: "about" */ './views/user/Home.vue')
                },
                {
                    path: 'userInfo',
                    name: '用户资料界面',
                    component: () => import(/* webpackChunkName: "about" */ './views/user/UserInfo.vue')
                },
                {
                    path: 'userAuthentication',
                    name: '用户实名认证页面',
                    component: () => import(/* webpackChunkName: "about" */ './views/user/UserAuthentication.vue')
                },
                {
                    path: 'userProject',
                    name: '用户项目页面',
                    component: () => import(/* webpackChunkName: "about" */ './views/user/UserProject.vue')
                },
                {
                    path: 'inBox',
                    name: '用户收件箱',
                    component: () => import(/* webpackChunkName: "about" */ './views/user/InBox.vue')
                }
            ]
        },
        {
            path: '/admin',
            component: () => import(/* webpackChunkName: "about" */ './views/Admin.vue'),
            children:[
                {
                    path: '/',
                    name: '管理员主页',
                    component: () => import(/* webpackChunkName: "about" */ './views/admin/Home.vue')
                },
                {
                    path: 'userList',
                    name: '用户列表',
                    component: () => import(/* webpackChunkName: "about" */ './views/admin/UserList.vue')
                },
                {
                    path: 'userSearch',
                    name: '检索用户界面',
                    component: () => import(/* webpackChunkName: "about" */ './views/admin/UserSearch.vue')
                },
                {
                    path: 'userBlackList',
                    name: '用户黑名单列表',
                    component: () => import(/* webpackChunkName: "about" */ './views/admin/UserBlackList.vue')
                },
                {
                    path: 'projectSearch',
                    name: '检索项目',
                    component: () => import(/* webpackChunkName: "about" */ './views/admin/ProjectSearch.vue')
                },
                {
                    path: 'projectList',
                    name: '项目列表',
                    component: () => import(/* webpackChunkName: "about" */ './views/admin/ProjectList.vue')
                },
                {
                    path: 'realNameAuthentication',
                    name: '实名认证',
                    component: () => import(/* webpackChunkName: "about" */ './views/admin/RealNameAuthentication.vue')
                },
                {
                    path: 'inBox',
                    name: '收件箱',
                    component: () => import(/* webpackChunkName: "about" */ './views/admin/InBox.vue')
                },
                {
                    path: 'outBox',
                    name: '发件箱',
                    component: () => import(/* webpackChunkName: "about" */ './views/admin/OutBox.vue')
                },
            ]
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
            path: '/*',
            name: '以上都没匹配成功，重定向到错误页面',
            redirect:'/error'
        }
    ]
})
