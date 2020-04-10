<template>
    <el-container>
        <el-header class="design-header">
            <design-header @listenSaveProject="saveProject"></design-header>
        </el-header>
        <el-container class="design-main">
            <el-row>
                <el-col :span="6" class="design-aside right-box-shadow">
                    <el-aside width="100%" class="design-aside">
                        <design-aside></design-aside>
                    </el-aside>
                </el-col>
                <el-col :span="12" style="height: 100%;">
                    <el-main style="height: 100%;display: flex;justify-content: center;flex-direction: column;">
                        <design-main></design-main>
                    </el-main>
                </el-col>
                <el-col :span="6" class="design-aside left-box-shadow">
                    <el-aside width="100%" class="design-aside">
                        <design-config>
                        </design-config>
                    </el-aside>
                </el-col>
            </el-row>
        </el-container>
<!--        <el-dialog :visible="beginTest" title="输入指令">-->
<!--            <el-input v-model="instruction"></el-input>-->
<!--            <div style="height: 50px;"></div>-->
<!--            <el-button type="success" @click="submitInstruction">提交</el-button>-->
<!--        </el-dialog>-->
    </el-container>
</template>

<script>
    import DesignAside from "@/components/design/DesignAside";
    import DesignConfig from "@/components/design/DesignConfig";
    import DesignMain from "@/components/design/DesignMain";
    import DesignHeader from "@/components/design/DesignHeader";
    import {Dialog, Input, Button} from "element-ui"
    import store from "../store"

    var loading = null;
    export default {
        name: "Design",
        store,
        components: {
            DesignAside,
            DesignMain,
            DesignConfig,
            DesignHeader,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [Button.name]: Button
        },
        data() {
            return {
                path: "ws://localhost:8080/design/",
                socket: "",
                userId: "",
                appId: "",
                instruction: "",
                beginTest: false,
            }
        },
        methods: {
            async checkApp() {//检查有没有权限
                loading = this.$loading.service({
                    lock: true,
                    text: '正在获取项目信息',
                    background: 'rgba(0, 0, 0, 0.9)'
                });
                let query = this.$route.query;
                let userInfo = this.$store.state.userInfo;
                if (userInfo != null) {//登录了
                    if (query.appId) {
                        this.appId = query.appId;
                        this.userId = userInfo.userId;
                        let res = await this.$API.getProjectByAppId({
                            appId: query.appId
                        });
                        if (res.data.error == 0) {
                            let app = res.data.app;
                            if (userInfo.userId == app.userId) {
                                loading.close();
                                let appInfoList = store.state.appInfo;
                                let appInfo = {
                                    appName: app.appName,
                                    appId: app.appId,
                                    description: app.description,
                                    weChatAppId:app.weChatConfig.weChatAppId
                                };
                                appInfoList[app.appId] = appInfo;
                                store.commit("setAppInfo",appInfoList);
                                return true;
                            }
                            return false;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {//没登录
                    return false;
                }
            },
            init: function () {
                if (typeof (WebSocket) === "undefined") {
                    alert("您的浏览器不支持socket")
                } else {
                    this.beginTest = true;
                    // 实例化socket
                    this.socket = new WebSocket(this.path + this.userId);
                    // 监听socket连接
                    this.socket.onopen = this.open;
                    // 监听socket错误信息
                    this.socket.onerror = this.error;
                    // 监听socket消息
                    this.socket.onmessage = this.getMessage;
                }
            },
            open: function () {
                window.console.log("socket连接成功");
                let message = {
                    type: "init",
                    userId: this.userId,
                    appId: this.appId
                }
                this.send(JSON.stringify(message));
            },
            error: function () {
                window.console.log("连接错误")
            },
            getMessage: function (msg) {
                let data = JSON.parse(msg.data)
                window.console.log(data)
            },
            send: function (params) {
                this.socket.send(params)
            },
            close: function () {
                window.console.log("socket已经关闭")
            },
            //保存项目到后台
            saveProject() {
                let message = {
                    type: "save",
                    userId: this.userId,
                    appId: this.appId,
                    pageJson: {
                        pages: store.state.pages,
                        globalStyle: store.state.globalStyle,
                        tabBar: store.state.tabBar
                    },
                    components: store.state.pageComponents,
                };
                window.console.log(message)
                this.send(JSON.stringify(message))
            }
        },
        created() {
            let that = this;
            this.checkApp().then(flag => {
                if (flag) {
                    //如果页面列表不为空
                    if (store.state.pages.length != 0) {
                        //如果当前选中页面索引为空，则设置为选中第一个页面
                        let currPageIndex = store.state.currPageIndex;
                        if (currPageIndex == -1) {
                            currPageIndex = 0;
                        }
                        store.commit("setCurrPageIndex", currPageIndex);
                        store.commit("initCurrPageComponents", currPageIndex);
                    }
                    //重新created了，将选中组件索引置为未选中状态
                    store.commit("setCurrComponentIndex", -1);
                    that.init(); //打开webSocket
                } else {
                    that.$confirm("","你没有权限",{
                        type:"error",
                    }).then(() => {
                        loading.close();
                        that.$router.push("/")
                    }).catch(()=>{
                        loading.close();
                        that.$router.push("/")
                    });
                }
            });
        }
    }
</script>

<style scoped>
    .design-header {
        padding: 0 !important;
    }

    .design-main {
        height: calc(100vh - 60px);
    }

    .design-aside {
        height: 100%;
    }

    .right-box-shadow {
        box-shadow: 2px 0 5px #e0e0e0;
    }

    .left-box-shadow {
        box-shadow: -2px 0 5px #e0e0e0;
    }
</style>
