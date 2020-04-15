<template>
    <el-container>
        <el-header class="design-header">
            <design-header :can-preview="canPreview" :is-saving="isSaving" @listenPreviewProject="previewProject"
                           @listenSaveProject="saveProject"></design-header>
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
        <el-dialog :visible="showPreviewQrCode" append-to-body :show-close="false" width="400px"
                   :close-on-click-modal="false" :close-on-press-escape="false" center>
            <div class="design-qrcode-box">
                <div class="design-qrcode-title egg-not-copy">请使用手机扫码预览</div>
                <div id="previewQrCode" ref="previewQrCodeDiv"></div>
                <div class="design-qrcode-button" @click="showPreviewQrCode = false">确认</div>
            </div>
        </el-dialog>
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
    import {Dialog, Input, Button} from "element-ui";
    import store from "../store";
    import QRCode from 'qrcodejs2';

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
                canPreview: true,//是否可以预览
                isSaving: false,//是否正在保存
                previewUrl: "",//浏览器地址
                showPreviewQrCode: false,//是否显示二维码
            }
        },
        created() {
            let userInfo = this.$store.state.userInfo;
            if (userInfo) {
                let appId = this.initAppId();
                if (appId) {
                    this.checkApp().then(flag => {
                        if (flag) {
                            //重新created了，将选中组件索引置为未选中状态
                            store.commit("setCurrComponentIndex", -1);
                            this.initPages();
                            this.initGlobalStyleConfig();
                            this.initTabBarConfig();
                            this.initWeChatConfig();
                            this.initWebsocket(); //打开webSocket
                        } else {
                            this.$confirm({
                                title: "提示",
                                message: "你没有该项目的权限",
                                showClose: false,
                                closeOnClickModal: false,
                                closeOnPressEscape: false,
                                type: "error",
                            }).then(() => {
                                loading.close();
                                this.$router.push("/user")
                            }).catch(() => {
                                loading.close();
                                this.$router.push("/user")
                            });
                        }
                    });
                } else {
                    this.$message.error("参数错误");
                    this.$router.push("/");
                }
            } else {
                this.$message.error("请先登录~");
                this.$router.push("/login");
            }
        },
        methods: {
            initAppId() {
                let query = this.$route.query;
                if (query.appId) {
                    this.appId = query.appId;
                    this.$store.commit("setAppId", this.appId);
                    return query.appId;
                } else {
                    return null;
                }
            },
            async checkApp() {//检查有没有权限
                loading = this.$loading.service({
                    lock: true,
                    text: '正在获取项目信息',
                    background: 'rgba(0, 0, 0, 0.9)'
                });
                let userInfo = this.$store.state.userInfo;
                this.userId = userInfo.userId;
                let res = await this.$API.getProjectBaseInfo({
                    appId: this.appId
                });
                if (res.data.error == 0) {
                    let appInfo = res.data.app;
                    if (userInfo.userId ==appInfo.userId) {
                        store.commit("setAppInfo",appInfo);
                        loading.close();
                        return true;
                    }
                    return false;
                } else {
                    return false;
                }
            },
            //初始化页面列表
            initPages() {
                let pages = this.$store.state.pages;
                if (!pages || pages.length == 0) {
                    this.$API.getPages({appId: this.appId}).then(res => {
                        if (res.data.error == 0) {
                            pages = res.data.pages;
                            store.commit("setPages", pages);
                            if (pages && pages.length != 0) {
                                //如果有页面，则获取组件
                                this.initPageComponents();
                            }
                        }
                    })
                } else {
                    //否则已经有数据了，则直接初始化页面组件
                    this.initCurrPageComponents();
                }
            },
            //初始化页面组件，如果有页面，才执行
            initPageComponents() {
                this.$API.getProjectComponents({
                    appId: this.appId
                }).then(res => {
                    if (res.data.error == 0) {
                        this.$store.commit("setPageComponents", res.data.components);
                        this.initCurrPageComponents();
                    }
                })
            },
            //初始化当前页面索引，如果有组件，才执行
            initCurrPageComponents() {
                //如果当前选中页面索引为空，则设置为选中第一个页面
                let currPageIndex = store.state.currPageIndex;
                if (currPageIndex == -1) {
                    currPageIndex = 0;
                }
                store.commit("setCurrPageIndex",currPageIndex);
            },
            initGlobalStyleConfig() {//初始化导航栏配置
                this.$API.getGlobalStyleConfig({
                    appId:this.appId
                }).then(res => {
                    if(res.data.error == 0){
                        store.commit("setGlobalStyle",res.data.globalStyleConfig);
                    }
                })
            },
            initTabBarConfig() {//初始化切换卡配置
                this.$API.getTabBarConfig({
                    appId:this.appId
                }).then(res => {
                    if(res.data.error == 0){
                        let tabBar = res.data.tabBarConfig;
                        tabBar.list = JSON.parse(tabBar.list);
                        store.commit("setTabBar",tabBar);
                    }
                })
            },
            initWeChatConfig() {//初始化微信小程序配置
                this.$API.getWeChatConfig({
                    appId:this.appId
                }).then(res => {
                    if(res.data.error == 0){
                        let weChatConfig = res.data.weChatConfig;
                        store.commit("setWeChatConfig",weChatConfig);
                    }
                })
            },
            initWebsocket: function () {
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
                this.processingMessages(data);
            },
            send: function (params) {
                this.socket.send(params)
            },
            close: function () {
                window.console.log("socket已经关闭")
            },
            processingMessages(data) {
                window.console.log(data)
                let type = data.type;
                switch (type) {
                    case "save": {
                        if (data.error == 0) {
                            this.isSaving = false;
                        }
                        break;
                    }
                    case "run": {
                        if (data.error == 0) {
                            if (data.state == "finish") {
                                this.canPreview = true;
                                this.previewUrl = data.url;
                                this.showPreviewProject();
                            } else {
                                this.$message.info(data.message)
                            }
                        } else {
                            this.$message.info(data.error_message)
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
            },
            showPreviewProject() {
                this.showPreviewQrCode = true;
                this.$nextTick(() => {
                    document.getElementById("previewQrCode").innerHTML = "";
                    new QRCode(this.$refs.previewQrCodeDiv, {
                        text: this.previewUrl,
                        width: 200,
                        height: 200,
                        colorDark: "#333333", //二维码颜色
                        colorLight: "#ffffff", //二维码背景色
                        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
                    });
                })
            },
            previewProject() {//预览项目
                let message = {
                    type: "run",
                    userId: this.userId,
                    appId: this.appId
                };
                window.console.log(message)
                this.canPreview = false;
                this.send(JSON.stringify(message))
            }
            ,
            //保存项目到后台
            saveProject() {
                let message = {
                    type: "save",
                    userId: this.userId,
                    appId: this.appId,
                    pages: store.state.pages,
                    globalStyle: store.state.globalStyle,
                    tabBar: store.state.tabBar,
                    components: store.state.pageComponents,
                };
                this.isSaving = true;
                window.console.log(message)
                this.send(JSON.stringify(message))
            }
        },
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

    .design-qrcode-box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .design-qrcode-title {
        font-size: 17px;
        color: #7B7B7B;
        margin-bottom: 20px;
    }

    .design-qrcode-button{
        margin-top: 20px;;
        font-size: 17px;
        padding: 10px 35px;
        border-radius: 15px;
        cursor: pointer;
        background-color: #61c4fd;
        color: #f0f0f0;
    }
</style>
