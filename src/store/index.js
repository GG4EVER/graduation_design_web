import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",//登录凭证
    userInfo:null,
    currPageIndex:0,
    pages:[//页面列表
        {
          name:"index",//用户设定的页面名称
          description:""//用户对这个页面的描述
        }
    ],
    tabBar:{//底部切换卡列表
      color: "#7A7E83",
      selectedColor: "#007AFF",
      borderStyle: "black",
      backgroundColor: "#F8F8F8",
      list: []
    },
    pageComponents:[]//当前页面选择的所有组件
  },
  mutations: {
    setToken(state,token){//设置token
      state.token = token;
    },
    setUserInfo(state,userInfo){//设置userInfo
      state.userInfo = userInfo;
    },
    setPageComponents(state,component){//添加component
      state.pageComponents[state.currPageIndex].push(component);
    },
    setCurrPageIndex(state,currPageIndex){//设置当前页面index
      state.currPageIndex = currPageIndex;
    },
    setPages(state,pages){//设置页面列表
      state.pages = pages;
    },
    setTabBar(state,tabBar){//设置底部切换卡
      state.tabBar = tabBar;
    },
  },
  actions: {
  },
  modules: {
  }
})
