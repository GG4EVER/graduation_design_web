<template>
    <el-row>
        <div class="design-show-box" @click="clickDesignShowBox">
            <el-col :lg="11" :md="15" :sm="18" :xs="20">
                <div class="design-phone">
                    <el-col :span="22" :offset="1" class="design-phone-header">
                        <div class="design-phone-camera"></div>
                        <div class="design-phone-receiver"></div>
                    </el-col>
                    <el-col :span="22">
                        <div v-if="globalStyle.navigationStyle == 'default'"
                             class="design-phone-screen-navigation-bar egg-not-copy"
                             :style="'background-color: ' + globalStyle.navigationBarBackgroundColor + ';color:' + globalStyle.navigationBarTextStyle ">
                            {{globalStyle.navigationBarTitleText}}
                        </div>
                        <div class="design-phone-screen"
                             :style="globalStyle.navigationStyle == 'default'?'' : 'top:40px;'"
                             :class="currPageComponents.length != 0 ? 'design-phone-screen-has' : ''" ref="phoneScreen">
                            <template v-if="currPageComponents.length != 0">
                                <div class="design-main-component" v-for="(component,index) in currPageComponents"
                                     :key="index" @click.stop="clickComponent(index)"
                                     :style="index == 0? 'margin-top:0px' : ''">
                                    <component :is="component.name" :component-attribute="component.attribute"
                                               :component-style="component.style"
                                               :component-animation="component.animation"
                                               :component-children="component.children"></component>
                                    <div class="design-main-component-mark animated"
                                         :class="index == currComponentIndex ? 'flash' : ''"
                                         :style="index == currComponentIndex ? 'display:block;' : ''"></div>
                                </div>
                            </template>
                            <div v-if="tabBar.list && tabBar.list.length != 0" style="height:51px;"></div>
                        </div>
                        <div v-if="tabBar.list && tabBar.list.length != 0" class="design-phone-screen-tab-bar"
                             :style="'background-color:' + tabBar.backgroundColor + ';border-color:' + tabBar.borderStyle">
                            <template v-for="(item,index) in tabBar.list">
                                <div class="design-phone-screen-tab-bar-item" :key="index"
                                     @click.stop="clickTabBar(index)">
                                    <img class="design-phone-screen-tab-bar-item-icon"
                                         :src="baseURL + (activeTabBar == index ? item.selectedIconPath :  item.iconPath)"/>
                                    <div class="design-phone-screen-tab-bar-item-title"
                                         :style="'color:' + (activeTabBar == index ? tabBar.selectedColor : tabBar.color)">
                                        {{item.text}}
                                    </div>
                                </div>
                            </template>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col class="hidden-sm-and-down design-main-util-box" :lg="3" :md="4">
                <el-tooltip effect="dark" content="删除" placement="right">
                    <div v-show="currComponentIndex != -1"
                         class="design-main-util-item design-main-util-item-delete animated"
                         :class="currComponentIndex != -1 ? 'fadeIn' : 'fadeOut'" @click.stop="deleteComponent"><i
                            class="el-icon-delete"></i></div>
                </el-tooltip>
                <el-tooltip effect="dark" content="向上移动" placement="right">
                    <div v-show="currComponentIndex != -1 && currComponentIndex != 0"
                         class="design-main-util-item design-main-util-item-up animated"
                         :class="currComponentIndex != -1 ? 'fadeIn' : 'fadeOut'" @click.stop="moveComponent"><i
                            class="el-icon-sort-up"></i></div>
                </el-tooltip>
                <el-tooltip effect="dark" content="向下移动" placement="right">
                    <div v-show="currComponentIndex != -1 && currComponentIndex != currPageComponents.length - 1"
                         class="design-main-util-item design-main-util-item-down animated"
                         :class="currComponentIndex != -1 ? 'fadeIn' : 'fadeOut'" @click.stop="moveComponent(false)"><i
                            class="el-icon-sort-down"></i></div>
                </el-tooltip>
                <el-tooltip effect="dark" content="清空所有内容" placement="right">
                    <div v-show="currComponentIndex == -1"
                         class="design-main-util-item design-main-util-item-top animated"
                         :class="currComponentIndex == -1 ? 'fadeIn' : 'fadeOut'" @click.stop="deleteAllComponent"><i
                            class="el-icon-delete"></i></div>
                </el-tooltip>
                <el-tooltip effect="dark" content="页面回到顶部" placement="right">
                    <div class="design-main-util-item design-main-util-item-top" @click.stop="scrollBack"><i
                            class="el-icon-caret-top"></i></div>
                </el-tooltip>
            </el-col>
        </div>
    </el-row>
</template>

<script>
    import store from "../../store";
    import UniSwiper from "../../uni_components/components/UniSwiper";
    import UniWebView from "../../uni_components/components/UniWebView";
    import UniButton from "../../uni_components/components/UniButton";
    import UniForm from "../../uni_components/components/UniForm";
    import UniText from "../../uni_components/components/UniText";
    import UniImage from "../../uni_components/components/UniImage";
    import UniAudio from "../../uni_components/components/UniAudio";
    import UniVideo from "../../uni_components/components/UniVideo";
    import UniGrid from "../../uni_components/components/UniGrid";
    import UniMap from "../../uni_components/components/UniMap";
    import {Tooltip} from "element-ui"
    import 'element-ui/lib/theme-chalk/display.css';

    export default {
        store,
        name: "DesignMain",
        components: {
            UniButton, UniImage, UniAudio, UniVideo, UniSwiper, UniGrid, UniText, UniWebView, UniMap, UniForm,
            [Tooltip.name]: Tooltip
        },
        data() {
            return {
                baseURL: process.env.VUE_APP_API_URL,
                currPageComponents: [],//当前页面的组件
                globalStyle: {},//导航栏设置
                tabBar: {},//底部切换卡配置
                currComponentIndex: -1,
                activeTabBar: 0,
            }
        },
        watch: {
            "$store.state.currPageComponents": function (newVal) {//监听当前页面组件列表
                if (newVal) {
                    //如果监听到新的列表长度不同，则滚动屏幕
                    let shouldScrollScreen = this.currPageComponents.length != newVal.length;
                    this.currPageComponents = JSON.parse(JSON.stringify(newVal));
                    if (shouldScrollScreen) {
                        this.currComponentIndex = -1;
                        this.$nextTick(() => {
                            this.$refs.phoneScreen.scrollTop = this.$refs.phoneScreen.scrollHeight;
                        });
                    }
                }
            },
            "$store.state.globalStyle": function (newVal) {
                if (newVal) {
                    this.globalStyle = newVal;
                }
            },
            "$store.state.tabBar": function (newVal) {
                if (newVal) {
                    this.tabBar = newVal;
                    let flag = newVal.list && newVal.list.length == 0;
                    let phoneScreen = this.$refs.phoneScreen;
                    store.commit("setScreenHeight", phoneScreen.clientHeight - (flag ? 0 : 51));
                }
            }
        },
        created() {
            this.globalStyle = store.state.globalStyle;
            this.tabBar = store.state.tabBar;
            if (store.state.pages.length != 0) {//如果页面数组不为空
                this.currPageComponents = store.state.pageComponents[store.state.pages[store.state.currPageIndex].name];
            }
            this.$nextTick(() => {
                let flag = this.tabBar.list && this.tabBar.list.length == 0;
                let phoneScreen = this.$refs.phoneScreen;
                store.commit("setScreenHeight", phoneScreen.clientHeight - (flag ? 0 : 51));
                store.commit("setScreenWidth", phoneScreen.clientWidth);
            })
        }, mounted() {
            window.onresize = () => {
                let phoneScreen = this.$refs.phoneScreen;
                store.commit("setScreenHeight", phoneScreen.clientHeight);
                store.commit("setScreenWidth", phoneScreen.clientWidth);
            };
        },
        methods: {
            /**
             * 点击组件以外的空白区域
             */
            clickDesignShowBox() {
                if (this.currComponentIndex != -1) {
                    this.currComponentIndex = -1;//取消选择当前组件
                    store.commit("setCurrComponentIndex", -1);
                } else {
                    window.console.log(store.state.currPageComponents)
                }
            },
            /**
             * 点击组件
             * @param index 索引
             */
            clickComponent(index) {
                if (this.currComponentIndex != index) {
                    this.currComponentIndex = index;
                    store.commit("setCurrComponentIndex", index);
                } else {
                    this.currComponentIndex = -1;
                    store.commit("setCurrComponentIndex", -1);
                }
            },

            /**
             * 点击切换卡
             * */
            clickTabBar(index) {
                this.activeTabBar = index;
            },

            /**
             * 删除组件
             */
            deleteComponent() {
                this.$confirm({
                    title: "提示",
                    message: "确认要删除这个组件吗",
                    showCancelButton: true,
                }).then(() => {
                    //确认清除
                    store.commit("deleteCurrPageComponents", {
                        index: this.currComponentIndex,
                        deleteAll: false
                    });
                    this.clickComponent(-1);
                }).catch(() => {
                })
            },
            /**
             * 删除当前页面所有组件
             */
            deleteAllComponent() {
                this.$confirm({
                    title: "提示",
                    message: "确认要清除所有内容吗",
                    showCancelButton: true,
                }).then(() => {
                    //确认清除
                    store.commit("deleteCurrPageComponents", {
                        index: -1,
                        deleteAll: true
                    });
                    this.clickComponent(-1);
                }).catch(() => {
                })
            },
            /**
             * 移动组件,默认向上
             */
            moveComponent(isUp = true) {
                store.commit("moveCurrPageComponents", {
                    isUp: isUp,
                    index: this.currComponentIndex
                });
                if (isUp) {
                    this.currComponentIndex--;
                } else {
                    this.currComponentIndex++;
                }
            },
            /**
             * 页面滚动至顶部
             */
            scrollBack() {//前快后慢
                let scrollTop = this.$refs.phoneScreen.scrollTop;
                let slowSpeed = Math.floor(scrollTop * 3 / 4);
                let time = setInterval(() => {
                    if (slowSpeed >= 20) {
                        this.$refs.phoneScreen.scrollTop = slowSpeed;
                        slowSpeed = Math.floor(slowSpeed * 3 / 4);//速度减少
                    } else if (slowSpeed > 0) {
                        slowSpeed--;//再次减慢
                        this.$refs.phoneScreen.scrollTop = slowSpeed;
                    } else {
                        this.$refs.phoneScreen.scrollTop = 0;
                        clearInterval(time);
                    }
                }, 20);
            },
        }
    }
</script>

<style scoped>
    .design-show-box {
        display: flex;
        justify-content: center;
    }

    .design-phone {
        width: 100%;
        height: 0;
        padding-top: 20px;
        padding-bottom: 175%;
        box-shadow: 0 0 10px #e0e0e0;
        border-radius: 20px;
        position: relative;
        background-image: linear-gradient(to bottom, #4d96bf, #f0f0f0, #4d96bf) !important;
    }

    .design-phone-header {
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        position: relative;
        top: -5px;
    }

    .design-phone-camera {
        width: 14px;
        height: 14px;
        margin: 0 3px;
        border-radius: 50px;
        background-color: #eeeeee;
    }

    .design-phone-receiver {
        height: 8px;
        width: 64px;
        margin: 0 3px;
        border-radius: 50px;
        background-color: #eeeeee;
    }

    .design-phone-screen-navigation-bar {
        height: 38px;
        position: absolute;
        top: 40px;
        width: 100%;
        background-color: #7B7B7B;
        text-align: center;
        line-height: 38px;
        font-size: 14px;
        box-shadow: 0px 1px 1px #e0e0e0;
        z-index: 1;
    }

    .design-phone-screen {
        position: absolute;
        top: 78px;
        bottom: 25px;
        right: 0;
        left: 0;
        overflow-x: hidden;
        overflow-y: scroll;
        background-color: #fbfbfb;
    }

    .design-phone-screen-has {
        background-color: #ffffff;
    }

    .design-phone-screen::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.3);
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.8);
    }

    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    .design-phone-screen::-webkit-scrollbar {
        width: 0; /*0隐藏滚动条*/
        background-color: rgba(255, 255, 255, 0);
    }

    /*定义滑块 内阴影+圆角*/
    .design-phone-screen::-webkit-scrollbar-thumb {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.3);
        background-color: #f0f0f0;
    }

    .design-main-component {
        position: relative;
        cursor: pointer;
        margin: 2px 0;
    }

    /*.design-main-component:hover .design-main-component-mark{*/
    /*    display: block;*/
    /*}*/

    .design-main-component-mark {
        display: none;
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: transparent;
        box-shadow: 3px 3px 0px #8192d6 inset, -3px -3px 0px #8192d6 inset, 0px 0px 20px #8192d6;
        animation-iteration-count: infinite;
        animation-duration: 2.5s;
        z-index: 999;
    }

    .design-main-util-box {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-left: 1.5rem;
    }

    .design-main-util-item {
        height: 2.3rem;
        width: 2.3rem;
        margin: 3px 0;
        text-align: center;
        line-height: 2.3rem;
        border-radius: 50%;
        background-color: #f0f0f0;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        outline: none;
    }

    .design-main-util-item-delete {
        transition: 0.4s;
        border: 2px solid #e76ca3;
        color: #e76ca3;
        background-color: #fec2dc;
    }

    .design-main-util-item-delete:hover {
        transition: 0.4s;
        color: #f0f0f0;
        background-color: #e76ca3;
    }

    .design-main-util-item-up {
        transition: 0.4s;
        border: 2px solid #e2b911;
        color: #e2b911;
        background-color: #fff3b6;
    }

    .design-main-util-item-up:hover {
        transition: 0.4s;
        color: #f0f0f0;
        background-color: #e2b911;
    }

    .design-main-util-item-down {
        transition: 0.4s;
        border: 2px solid #26a2d5;
        color: #26a2d5;
        background-color: #79d6ff;
    }

    .design-main-util-item-down:hover {
        transition: 0.4s;
        color: #f0f0f0;
        background-color: #26a2d5;
    }

    .design-main-util-item-top {
        transition: 0.4s;
        margin: 20px 0;
        border: 2px solid #5B5B5B;
        color: #5B5B5B;
        background-color: #ffffff;
    }

    .design-main-util-item-top:hover {
        transition: 0.4s;
        color: #f0f0f0;
        background-color: #5B5B5B;
    }

    .design-phone-screen-tab-bar {
        width: 100%;
        position: absolute;
        bottom: 25px;
        height: 50px;
        border-top: 1px solid;
        z-index: 666;
        display: flex;
        justify-content: space-around;
    }

    .design-phone-screen-tab-bar-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
    }

    .design-phone-screen-tab-bar-item-icon {
        width: 24px;
        height: 24px;
    }

    .design-phone-screen-tab-bar-item-title {
        font-size: 10px;
    }
</style>
