<template>
    <div class="egg-admin-header">
        <div class="egg-admin-collapse" @click="clickCollapseButton">
            <i :class="IsCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
        </div>
        <el-dropdown v-if="UserInfo" :show-timeout="100" @command="returnCommand">
            <div class="egg-admin-info egg-not-copy">
                <div class="egg-avatar-box">
                    <img class="egg-admin-avatar" src="../../assets/images/boy.svg" draggable="false"/>
                    <i v-if="UserInfo.isCertified != 0" class="el-icon-success egg-icon-success"></i>
                </div>
                <div class="egg-avatar-box">
                    <span class="egg-admin-name">{{UserInfo.userNickName}}</span>
                </div>
            </div>
            <el-dropdown-menu class="egg-avatar-box" slot="dropdown">
                <el-dropdown-item command="/user"><i class="el-icon-s-home"></i>个人中心</el-dropdown-item>
                <!--                如果没有实名认证则优先显示实名认证-->
                <el-dropdown-item v-if="UserCertification && (UserCertification.state == null || UserCertification.state != 1)" command="/user/userAuthentication">
                    <i class="el-icon-picture"></i>实名认证
                </el-dropdown-item>
                <el-dropdown-item command="/user/userInfo"><i class="el-icon-user-solid"></i>个人资料</el-dropdown-item>
                <el-dropdown-item command="/user/userProject"><i class="el-icon-s-opportunity"></i>我的项目
                </el-dropdown-item>
                <el-dropdown-item command="/user/inBox"><i class="el-icon-s-comment"></i>我的消息</el-dropdown-item>
                <el-dropdown-item command="/logout" divided><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button v-else class="egg-home-button animated fadeIn" type="primary" round plain @click="toLogin">
            登录
        </el-button>
    </div>
</template>

<script>
    import {Dropdown, DropdownMenu, DropdownItem, Button} from "element-ui";
    import store from '../../store'

    export default {
        store,
        name: "UserHeader",
        props: {
            IsCollapse: {//目录是否关闭
                type: Boolean,
                default: false
            },
            UserInfo: {//用户信息
                type: Object,
                default: null
            },
            UserCertification:{//用户实名认证信息
                type: Object,
                default: null
            }
        },
        components: {
            [Dropdown.name]: Dropdown,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [Button.name]: Button
        },
        methods: {
            toLogin() {
                this.$emit("listenClickHeaderMenu", "/login");
            },
            clickCollapseButton() {//点击了展开/关闭 侧边目录的按钮
                this.$emit("listenCollapseButton");
            },
            returnCommand(command) {//获取点击下拉菜单对应路由跳转
                this.$emit("listenClickHeaderMenu", command);
            },
        }
    }
</script>

<style scoped>
    .egg-home-button {
        background-color: #ffffff !important;
        color: #00AEFF !important;
    }

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

    .egg-avatar-box {
        position: relative;
    }

    .egg-admin-avatar {
        height: 36px;
        width: 36px;
        margin: 0 6px;
        border-radius: 50px;
        border: solid 5px transparent;
    }

    .egg-icon-success {
        position: absolute;
        bottom: 6px;
        right: 6px;
        color: #67C23A;
    }

    .egg-admin-name {
        font-size: 18px;
        color: #5B5B5B;
        border-bottom: solid 2px transparent;
    }

    .egg-admin-info:hover > .egg-avatar-box > .egg-admin-avatar {
        transition: 0.6s;
        border: solid 5px #f0f0f0;
    }

    .egg-admin-info:hover > .egg-avatar-box > .egg-admin-name {
        transition: 0.6s;
        color: #00AEFF;
        border-bottom: solid 2px #bee1f1;
    }
</style>
