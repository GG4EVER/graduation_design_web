import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:"",//登录凭证
    currPageId:"index",
    pages:[
        {
          id:"index",//页面的id
          name:"主页"//用户设定的页面名称
        }
    ],
    pageComponents:{//页面选择的所有组件
      "index":[],
    },
  },
  mutations: {
    setToken(state,token){//设置token
      state.token = token;
    },
    setPageComponents(state,component){//添加component
      state.pageComponents[state.currPageId].push(component);
    }
  },
  actions: {
  },
  modules: {
  }
})
