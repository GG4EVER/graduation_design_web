<template>
    <el-menu :collapse="IsCollapse" router unique-opened background-color="#304156" text-color="#bfcbd9" active-text-color="#409eff" class="egg-full-height egg-not-copy">
        <el-menu-item class="egg-menu-item" index="1" route="/admin"><i class="el-icon-s-home"></i><span slot="title">首页</span></el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item class="egg-menu-item" index="2-1" route="/admin/userSearch">检索用户</el-menu-item>
                <el-menu-item class="egg-menu-item" index="2-2" route="/admin/userList">查看用户</el-menu-item>
                <el-menu-item class="egg-menu-item" index="2-3" route="/admin/userBlackList">黑名单</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-s-order"></i>
                <span slot="title">项目管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item class="egg-menu-item" index="3-1">检索项目</el-menu-item>
                <el-menu-item class="egg-menu-item" index="3-2">查看项目</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-s-check"></i>
                <span slot="title">审核管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item class="egg-menu-item" index="4-1">实名认证</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
            <template slot="title">
                <i class="el-icon-message-solid"></i>
                <span slot="title">站内消息</span>
            </template>
            <el-menu-item-group>
                <el-menu-item class="egg-menu-item" index="5-1">收件箱</el-menu-item>
                <el-menu-item class="egg-menu-item" index="5-2">发件箱</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
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
