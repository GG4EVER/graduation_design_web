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
        <el-dialog :visible="beginTest" title="输入指令">
            <el-input v-model="instruction"></el-input>
            <div style="height: 50px;"></div>
            <el-button type="success" @click="submitInstruction">提交</el-button>
        </el-dialog>
    </el-container>
</template>

<script>
    import DesignAside from "@/components/design/DesignAside";
    import DesignConfig from "@/components/design/DesignConfig";
    import DesignMain from "@/components/design/DesignMain";
    import DesignHeader from "@/components/design/DesignHeader";
    import {Dialog,Input,Button} from "element-ui"
    import  store from "../store"

    export default {
        name: "Design",
        store,
        components: {
            DesignAside,
            DesignMain,
            DesignConfig,
            DesignHeader,
            [Dialog.name]:Dialog,
            [Input.name]:Input,
            [Button.name]:Button
        },
        data(){
            return{
                path:"ws://localhost:8080/design/ufa66c26c31e2e1601b8c0b404e439a22",
                socket:"",
                userId:"ufa66c26c31e2e1601b8c0b404e439a22",
                appId:"ab8cfa4fc3766f93f8e818e880b95cc43",
                instruction:"",
                beginTest:false,
            }
        },
        methods:{
            init: function () {
                if(typeof(WebSocket) === "undefined"){
                    alert("您的浏览器不支持socket")
                }else{
                    this.beginTest = true;
                    // 实例化socket
                    this.socket = new WebSocket(this.path);
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
                    type:"init",
                    userId:this.userId,
                    appId:this.appId
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
            submitInstruction(){
                let message  = {
                    type:this.instruction,
                    userId:this.userId,
                    appId:this.appId,
                    buildType:"mp-weixin",
                };
                this.send(JSON.stringify(message))
            },
            //保存项目到后台
            saveProject(){
                let message  = {
                    type:"save",
                    userId:this.userId,
                    appId:this.appId,
                    pageJson:{
                        pages:store.state.pages,
                        globalStyle:store.state.globalStyle,
                        tabBar:store.state.tabBar
                    },
                    components:store.state.pageComponents
                };
                window.console.log(message)
                this.send(JSON.stringify(message))
            }
        },created() {
            //如果页面列表不为空
            if(store.state.pages.length != 0){
                //如果当前选中页面索引为空，则设置为选中第一个页面
                let currPageIndex = store.state.currPageIndex;
                if(currPageIndex == -1){
                    currPageIndex = 0;
                }
                store.commit("setCurrPageIndex",currPageIndex);
                store.commit("initCurrPageComponents",currPageIndex);
            }
            //重新created了，将选中组件索引置为未选中状态
            store.commit("setCurrComponentIndex",-1);
            //this.init(); //打开webSocket
        }
    }
</script>

<style scoped>
    .design-header{
        padding: 0 !important;
    }

    .design-main{
        height: calc(100vh - 60px);
    }

    .design-aside{
        height: 100%;
    }

    .right-box-shadow{
        box-shadow: 2px 0 5px #e0e0e0;
    }

    .left-box-shadow{
        box-shadow: -2px 0 5px #e0e0e0;
    }
</style>
