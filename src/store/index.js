import Vue from 'vue'
import Vuex from 'vuex'
import VuexAlong from 'vuex-along'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",//登录凭证
    userInfo:null,
    certification:null,
    currPageIndex:0,//当前选择的页面索引
    pages:[],//页面列表
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
    weChatConfig:{
      weChatAppId:"",
    },
    appInfo:{
      appName: "",
      appId: "",
      description: "",
    },
    pageComponents:{},//所有页面的所有组件
    currPageComponents:[],//当前页面的组件
    currComponentIndex:-1,//当前选择的组件索引，-1为没有选择
  },
  mutations: {
    setToken(state,token){//设置token
      state.token = token;
    },
    setUserInfo(state,userInfo){//设置userInfo
      state.userInfo = userInfo;
    },
    setCertification(state,certification){//设置实名认证信息
      state.certification = certification;
    },
    setAppInfo(state,appInfo){//设置app信息
      state.appInfo = appInfo;
    },
    addComponent(state,component){
      if(component){
        state.currPageComponents.push(component);
        state.pageComponents[state.pages[state.currPageIndex].name] =  state.currPageComponents;
      }
    },
    initCurrPageComponents(state){
      state.currPageComponents = state.pageComponents[state.pages[state.currPageIndex].name] ;
    },
    setCurrPageComponents(state,components){
        state.currPageComponents = components;
        state.pageComponents[state.pages[state.currPageIndex].name] =  components;
    },
    /**
     * 移动组件
     * @param state
     * @param data
     */
    moveCurrPageComponents(state,data){
      let isUp = data.isUp;//获得是向上还是向下
      let index = data.index;//获得索引
      let currPage = state.pages[state.currPageIndex];//获得当前页面
      let temp = state.currPageComponents;//获得当前页面组件列表
      if(isUp){//向上移动
        let component = temp[index];
        temp[index] = temp[index - 1];
        temp[index - 1] = component;
      }else{//向下移动
        let component = temp[index];
        temp[index] = temp[index + 1];
        temp[index + 1] = component;
      }
      state.currPageComponents = temp;
      //重新赋值
      state.pageComponents[currPage.name] = temp;
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
    /**
     * 设置当前选中的组件的索引
     * @param state
     * @param currComponentIndex
     */
    setCurrComponentIndex(state,currComponentIndex){
      state.currComponentIndex= currComponentIndex;
    },
    /**
     * 保存当前正在修改的属性
     * @param state
     */
    saveComponentAttribute(state){
      let currPage = state.pages[state.currPageIndex];
      if(currPage){
        //保存组件列表
        state.pageComponents[currPage.name] = state.currPageComponents;
      }
    },
    setCurrPageIndex(state,currPageIndex){//设置当前页面index
      if(currPageIndex != -1){//如果是选择了页面
        if(state.currPageIndex != -1){//如果原本选择的页面的索引不是-1，则表示原本选择了页面，那么先保存旧页面的组件
          //选择了其他页面，则将旧的组件保存进所有组件里，再更改页面index
          let oldPage = state.pages[state.currPageIndex];
          if(oldPage){//如果旧页面存在
            //保存旧的组件列表
            state.pageComponents[oldPage.name] = state.currPageComponents;
          }
        }
        //切换页面
        state.currPageIndex = currPageIndex;
        //切换组件列表
        state.currPageComponents = state.pageComponents[state.pages[currPageIndex].name];
      }else{//否则是删除了一个页面，将选择去掉
        state.currPageIndex = -1;
        //清空当前组件列表
        state.currPageComponents = new Array();
      }
      //将当前选中的组件索引置为未选择状态
      state.currComponentIndex= -1;
    },
    setPages(state,pages){//设置页面列表
      state.pages = pages;
    },
    addPage(state,page){//添加页面列表
      state.pages.push(page);//添加新页面
      state.pageComponents[page.name] = new Array();//初始化新页面的组件
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
  modules:{
  },
  plugins: [VuexAlong()],
})
