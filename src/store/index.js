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
    globalStyle:{
      navigationBarTextStyle: "black",
      navigationBarTitleText: "导航栏",
      navigationBarBackgroundColor: "#ffffff",
    },
    tabBar:{//底部切换卡列表
      color: "#7A7E83",
      selectedColor: "#007AFF",
      borderStyle: "black",
      backgroundColor: "#F8F8F8",
      list: []
    },
    pageComponents:{},//所有页面的所有组件
    currPageComponents:[],//当前页面的组件
  },
  mutations: {
    setToken(state,token){//设置token
      state.token = token;
    },
    setUserInfo(state,userInfo){//设置userInfo
      state.userInfo = userInfo;
    },
    setCurrPageComponents(state,component){
      window.console.log(component)
      state.currPageComponents.push(component);
    },
    /**
     * 删除当前页面组件
     * @param state
     * @param index 索引
     * @param deleteAll 是否是删除全部
     */
    deleteCurrPageComponents(state,data){
      let index = data.index;
      let deleteAll = data.deleteAll;
      let currPage = state.pages[state.currPageIndex];//获得当前页面
      if(deleteAll){//是删除全部
        state.pageComponents[currPage.name] = new Array();//直接重新赋值新对象
        state.currPageComponents = new Array();//直接重新赋值新对象
        window.console.log("已经删除")
        return true;
      }else if(index != -1){//否则删除对应位置的组件
        let temp = state.currPageComponents;
        //切割，删掉对应的组件
        state.currPageComponents = temp.slice(0, index).concat( temp.slice(index + 1, temp.length) );
        //重新赋值
        state.pageComponents[currPage.name] = state.currPageComponents;
        return true;
      }else{
        return false;
      }
    },
    setCurrPageIndex(state,currPageIndex){//设置当前页面index
      //选择了其他页面，则将旧的组件保存进所有组件里，再更改页面index
      let oldPage = state.pages[state.currPageIndex];
      if(oldPage){//如果旧页面存在
        //保存旧的组件列表
        state.pageComponents[oldPage.name] = state.currPageComponents;
      }
      //切换页面
      state.currPageIndex = currPageIndex;
      //切换组件列表
      state.currPageComponents = state.pageComponents[state.pages[currPageIndex].name];
      if(!state.currPageComponents){//如果不存在，则初始化
        state.currPageComponents = new Array();
      }
    },
    setPages(state,pages){//设置页面列表
      state.pages = pages;
    },
    updatePages(state,data){//修改页面
      let index = data.index;
      let oldPageName = state.pages[index].name;
      //修改页面列表里的对象
      state.pages[index].name  = data.name;
      state.pages[index].description  = data.description;
      //修改所有页面组件中对应的键值
      let tempComponents = state.pageComponents[oldPageName];
      delete state.pageComponents[oldPageName];
      state.pageComponents[data.name] = tempComponents;
    },
    deletePages(state,data){//删除页面
      let deletePageName = state.pages[data.index].name;
      delete state.pageComponents[deletePageName];//删除对应的组件
      state.pages = data.pages;//重新设置页面列表
    },
    setGlobalStyle(state,globalStyle){//设置默认顶部导航栏
      state.globalStyle = globalStyle;
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
