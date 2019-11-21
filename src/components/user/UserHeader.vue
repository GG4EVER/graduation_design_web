<template>
    <div class="egg-admin-header">
        <div class="egg-admin-collapse" @click="clickCollapseButton">
            <i :class="IsCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
        </div>
        <el-dropdown :show-timeout="100" @command="returnCommand">
            <div class="egg-admin-info egg-not-copy">
                <img class="egg-admin-avatar" src="../../assets/images/boy.svg" draggable="false"/>
                <span class="egg-admin-name">荷包蛋</span>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/user"><i class="el-icon-s-home"></i>个人中心</el-dropdown-item>
                <el-dropdown-item command="/user/userUpdate"><i class="el-icon-user-solid"></i>修改资料</el-dropdown-item>
                <el-dropdown-item command="/user/userProject"><i class="el-icon-s-opportunity"></i>我的项目</el-dropdown-item>
                <el-dropdown-item command="/user/inBox"><i class="el-icon-s-comment"></i>我的消息</el-dropdown-item>
                <el-dropdown-item command="/logout" divided >退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import {Dropdown,DropdownMenu,DropdownItem} from "element-ui";
    export default {
        name: "UserHeader",
        props: {
            IsCollapse: {//目录是否关闭
                type: Boolean,
                default: false
            },
        },
        components:{
            [Dropdown.name]:Dropdown,
            [DropdownMenu.name]:DropdownMenu,
            [DropdownItem.name]:DropdownItem
        },
        methods: {
            clickCollapseButton() {//点击了展开/关闭 侧边目录的按钮
                this.$emit("listenCollapseButton");
            },
            returnCommand(command){//获取点击下拉菜单对应路由跳转
                this.$router.push(command)
            },
        }
    }
</script>

<style scoped>
    .egg-admin-header {
        height: 100%;
        padding-left: 15px;
        padding-right: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 1px 1px #e0e0e0;
    }

    .egg-admin-collapse {
        transition: 0.5s;
        height: 35px;
        width: 35px;
        border-radius: 5px;
        background-color: #e0e0e0;
        text-align: center;
        font-size: 25px;
        line-height: 35px;
        cursor: pointer;
        color: #5b5b5b;
    }

    .egg-admin-collapse:hover {
        transition: 0.5s;
        background-color: #304156;
        color: #ffffff;
    }

    .egg-admin-info {
        height: 40px;
        padding: 0 5px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .egg-admin-avatar {
        height: 36px;
        width: 36px;
        margin: 0 6px;
        border-radius: 50px;
        border: solid 5px transparent;
    }

    .egg-admin-name {
        font-size: 18px;
        color: #5B5B5B;
        border-bottom: solid 2px transparent;
    }

    .egg-admin-info:hover > .egg-admin-avatar {
        transition: 0.6s;
        border: solid 5px #f0f0f0;
    }

    .egg-admin-info:hover > .egg-admin-name {
        transition: 0.6s;
        color: #00AEFF;
        border-bottom: solid 2px #bee1f1;
    }

</style>
