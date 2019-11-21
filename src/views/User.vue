<template>
    <el-container class="egg-full-screen animated fadeIn">
        <el-aside class="egg-full-height" :class="isCollapse?'egg-aside-close':'egg-aside-open'">
            <user-aside :is-collapse="isCollapse"></user-aside>
        </el-aside>
        <el-container class="egg-no-padding">
            <el-header class="egg-no-padding">
                <user-header :is-collapse="isCollapse" @listenCollapseButton="changeCollapse"></user-header>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import UserHeader from "../components/user/UserHeader";
    import UserAside from "../components/user/UserAside";
    export default {
        name: "User",
        components:{
            UserAside,
            UserHeader
        },
        data() {
            return {
                isCollapse: false,//侧边栏的菜单是否关闭
            };
        },
        methods:{
            changeCollapse(){//切换菜单栏打开和关闭的状态
                this.isCollapse = !this.isCollapse;
            }
        }
    }
</script>

<style scoped>
    .egg-aside-open{
        transition: 0.5s;
        width: 250px !important;
    }

    .egg-aside-close{
        transition: 1s;
        width: auto !important;
    }
</style>
