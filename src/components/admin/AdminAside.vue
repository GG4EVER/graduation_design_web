<template>
    <el-menu :default-active="activeMenu" :collapse="IsCollapse" router unique-opened background-color="#304156" text-color="#bfcbd9" active-text-color="#409eff" class="egg-full-height egg-not-copy">
        <el-menu-item class="egg-menu-item" index="/admin" route="/admin"><i class="el-icon-s-home"></i><span slot="title">首页</span></el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item class="egg-menu-item" index="/admin/userSearch" route="/admin/userSearch">检索用户</el-menu-item>
                <el-menu-item class="egg-menu-item" index="/admin/userList" route="/admin/userList">查看用户</el-menu-item>
<!--                <el-menu-item class="egg-menu-item" index="2-3" route="/admin/userBlackList">黑名单</el-menu-item>-->
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-s-order"></i>
                <span slot="title">项目管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item class="egg-menu-item" index="/admin/projectSearch" route="/admin/projectSearch">检索项目</el-menu-item>
                <el-menu-item class="egg-menu-item" index="/admin/projectList" route="/admin/projectList">查看项目</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-s-check"></i>
                <span slot="title">审核管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item class="egg-menu-item" index="/admin/realNameAuthentication" route="/admin/realNameAuthentication">实名认证</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
<!--        <el-submenu index="5">-->
<!--            <template slot="title">-->
<!--                <i class="el-icon-message-solid"></i>-->
<!--                <span slot="title">站内消息</span>-->
<!--            </template>-->
<!--            <el-menu-item-group>-->
<!--                <el-menu-item class="egg-menu-item" index="5-1" route="/admin/inBox">收件箱</el-menu-item>-->
<!--                <el-menu-item class="egg-menu-item" index="5-2" route="/admin/outBox">发件箱</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--        </el-submenu>-->
        <el-menu-item class="egg-menu-item" index="/admin/requirementList" route="/admin/requirementList"><i class="el-icon-s-promotion"></i><span slot="title">需求列表</span></el-menu-item>

    </el-menu>
</template>

<script>
    import {Menu,MenuItem,MenuItemGroup,Submenu} from "element-ui";
    export default {
        name: "AdminAside",
        props:{
            IsCollapse:{//目录是否关闭
                type:Boolean,
                default:false
            }
        },
        components:{
            [Menu.name]:Menu,
            [MenuItem.name]:MenuItem,
            [MenuItemGroup.name]:MenuItemGroup,
            [Submenu.name]:Submenu,
        },
        watch:{
            $route(to){
                let path = to.path;//监听路由,展开对应的目录
                if(path == "/admin"){//如果是管理员中心，就关闭其他所有
                    this.$refs["elMenu"].close("2");
                    this.$refs["elMenu"].close("3");
                    this.$refs["elMenu"].close("4");
                    this.$refs["elMenu"].close("5");
                }
                this.activeMenu = path;
            }
        },
        data(){
            return{
                activeMenu:"/admin",
            }
        },
        created() {
            //让当前展开的目录等于路由路径
            this.activeMenu = this.$router.currentRoute.path;
        }
    }
</script>

<style scoped>
    .egg-menu-item{
        background-color: #1f2d3d !important;
    }

    .egg-menu-item:hover{
        background-color: #001528 !important;
    }
</style>
