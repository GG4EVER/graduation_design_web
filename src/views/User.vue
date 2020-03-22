<template>
    <el-container class="egg-full-screen animated fadeIn">
        <el-aside class="egg-full-height" :class="isCollapse?'egg-aside-close':'egg-aside-open'">
            <user-aside :is-collapse="isCollapse"></user-aside>
        </el-aside>
        <el-container class="egg-no-padding">
            <el-header class="egg-no-padding">
                <user-header :is-collapse="isCollapse" :user-info="userInfo" :user-certification="certification" @listenCollapseButton="changeCollapse"
                             @listenClickHeaderMenu="clickHeaderMenu"></user-header>
            </el-header>
            <el-main>
                <router-view :user-info="userInfo"/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import UserHeader from "../components/user/UserHeader";
    import UserAside from "../components/user/UserAside";
    import store from "../store";

    export default {
        name: "User",
        components: {
            UserAside,
            UserHeader
        },
        data() {
            return {
                userInfo: null,//用户信息
                certification:null,//实名认证信息
                isCollapse: false,//侧边栏的菜单是否关闭
            };
        },
        watch: {
            "$store.state.userInfo":function(newVal){
                this.userInfo = newVal;
            }
        },
        methods: {
            changeCollapse() {//切换菜单栏打开和关闭的状态
                this.isCollapse = !this.isCollapse;
            },
            clickHeaderMenu(command) {//监听点击头部的菜单
                if (command.indexOf("logout") != -1) {//如果选择了退出登录
                    command = "/login";
                    this.$message.success("退出登录~");
                    store.commit("setToken", "");//清除token
                    localStorage.removeItem("token");//清除token
                }
                this.$router.push(command)
            }
        },
        created() {
            if (store.state.userInfo && store.state.certification) {//如果本地有用户信息
                this.userInfo = store.state.userInfo;
                this.certification = store.state.certification;
            } else {
                if (!store.state.token) {//如果没有token,跳转登录
                    this.$message.error("请重新登录~");
                    this.$router.push("/login");
                } else {//否则通过token获取用户信息
                    this.$API.getUserInfo().then(res => {
                        window.console.log(res.data);
                        if (res.data.error != "0") {//发生错误，比如token过期之类的
                            this.$message.error(res.data.error_message);
                        } else {
                            store.commit("setUserInfo", res.data.userInfo);
                            this.userInfo = res.data.userInfo;
                        }
                    });
                    this.$API.getCertification().then(res => {
                        window.console.log(res.data)
                        if(res.data.error == 0){
                            store.commit("setCertification", res.data.certification);
                            this.certification = res.data.certification;
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .egg-aside-open {
        transition: 0.5s;
        width: 250px !important;
    }

    .egg-aside-close {
        transition: 1s;
        width: auto !important;
    }
</style>
