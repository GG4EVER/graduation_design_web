import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    setPageComponents(state,component){//添加component
      state.pageComponents[state.currPageId].push(component);
    }
  },
  actions: {
  },
  modules: {
  }
})
