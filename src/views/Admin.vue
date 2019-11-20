<template>
    <el-container class="egg-full-screen animated fadeIn">
        <el-aside class="egg-full-height" :class="isCollapse?'egg-aside-close':'egg-aside-open'">
            <admin-aside :is-collapse="isCollapse"></admin-aside>
        </el-aside>
        <el-container class="egg-no-padding">
            <el-header class="egg-no-padding">
                <admin-header :is-collapse="isCollapse" @listenCollapseButton="changeCollapse" @listenLogOut="logout" @listenUpdateInfo="updateAdminInfo"></admin-header>
            </el-header>
            <el-main>
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
                isCollapse: false,//侧边栏的菜单是否关闭
            };
        },
        methods:{
            changeCollapse(){//切换菜单栏打开和关闭的状态
                this.isCollapse = !this.isCollapse;
            },
            updateAdminInfo(){//修改管理员资料
                this.$message("修改管理员资料");
            },
            logout(){//监听子组件的点击退出登录事件
                this.$message("退出登录");
                this.$router.push("/login")
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
