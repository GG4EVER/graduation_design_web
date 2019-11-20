<template>
    <el-container class="egg-full-screen">
        <el-aside class="egg-full-height" :class="isCollapse?'egg-aside-close':'egg-aside-open'">
            <admin-aside :is-collapse="isCollapse"></admin-aside>
        </el-aside>
        <el-container class="egg-no-padding">
            <el-header class="egg-no-padding">
                <admin-header :is-collapse="isCollapse" @listenCollapseButton="changeCollapse"></admin-header>
            </el-header>
            <el-main class="egg-no-padding">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import AdminAside from "../components/admin/AdminAside";
    import AdminHeader from "../components/admin/AdminHeader";

    export default {
        name: "Admin",
        components:{
            AdminAside,
            AdminHeader
        },
        data() {
            return {
                isCollapse: true,//侧边栏的菜单是否关闭
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
        width: 300px !important;
    }

    .egg-aside-close{
        transition: 1s;
        width: auto !important;
    }
</style>
