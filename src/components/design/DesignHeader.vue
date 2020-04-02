<template>
    <el-menu
            :default-active="activeIndex"
            class="egg-design-header"
            mode="horizontal"
            text-color="#fff">
        <el-menu-item>
            <div class="egg-login-logo-box" @click.stop="backHome">
                <span class="egg-login-logo-name">Egg Paint</span>
            </div>
        </el-menu-item>
        <el-menu-item class="design-header-utils">
            <el-tooltip class="item" effect="dark" :value="!canPreview && showCanNotPreview" content="当前暂时不可预览" placement="bottom-end">
                <span class="design-header-util-item" @mouseover="showCanNotPreviewToolTip" @mouseout="hideCanNotPreviewToolTip">
                    <el-button plain round size="small" :disabled="!canPreview" @click.stop="previewProject">预览</el-button>
                </span>
            </el-tooltip>
            <span class="design-header-util-item">
                <el-button type="primary" round size="small" :loading="isSaving" @click.stop="saveProject">{{isSaving ? '正在保存' : '保存'}}</el-button>
            </span>
            <el-dropdown v-if="userInfo" class="egg-home-dropdown" trigger="click" @command="handleCommand">
                <div class="egg-admin-info egg-not-copy">
                    <div class="egg-avatar-box">
                        <img class="egg-admin-avatar" src="../../assets/images/boy.svg" draggable="false"/>
                        <i v-if="userInfo.isCertified != 0" class="el-icon-success egg-icon-success"></i>
                    </div>
                    <div class="egg-avatar-box">
                        <span class="egg-admin-name">{{userInfo.userNickName}}</span>
                    </div>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/user"><i class="el-icon-s-home"></i>个人中心</el-dropdown-item>
                    <el-dropdown-item command="/user/userInfo"><i class="el-icon-user-solid"></i>个人资料
                    </el-dropdown-item>
                    <el-dropdown-item command="/user/userProject"><i class="el-icon-s-opportunity"></i>我的项目
                    </el-dropdown-item>
                    <el-dropdown-item command="/user/inBox"><i class="el-icon-s-comment"></i>我的消息</el-dropdown-item>
                    <el-dropdown-item command="/logout" divided><i class="el-icon-unlock"></i>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import {Menu,MenuItem,Submenu,Button,Dropdown,DropdownItem,DropdownMenu,Tooltip} from 'element-ui'
    import store from "../../store";
    export default {
        name: "EggDesignHeader",
        store,
        components:{
            [Menu.name]:Menu,
            [MenuItem.name]:MenuItem,
            [Submenu.name]:Submenu,
            [Button.name]:Button,
            [DropdownMenu.name]:DropdownMenu,
            [DropdownItem.name]:DropdownItem,
            [Dropdown.name]:Dropdown,
            [Tooltip.name]:Tooltip
        },
        data() {
            return {
                canPreview:false,//是否可以预览
                showCanNotPreview:false,//是否显示不可预览的提示信息
                isSaving:false,//是否正在保存
                activeIndex: '1',
                userInfo:{
                    userNickName:"荷包蛋"
                },
            };
        },
        methods: {
            showCanNotPreviewToolTip(){//显示不可预览时的提示信息
                this.showCanNotPreview = true;
            },
            hideCanNotPreviewToolTip(){//显示不可预览时的提示信息
                this.showCanNotPreview = false;
            },
            //预览项目
            previewProject(){

            },
            //保存项目
            saveProject(){
                this.isSaving = true;
                this.$emit("listenSaveProject");
                setTimeout(()=>{
                    this.isSaving = false;
                },500)
            },
            backHome(){
                this.$confirm({
                    title:"提示",
                    message:"当前工作可能未保存，确认要直接离开吗",
                    confirmButtonText: "确认",
                    showCancelButton:true,
                    cancelButtonText: "取消",
                    type: 'warning'
                }).then(() => {
                    this.$router.push("/");
                }).catch(()=>{
                    //取消
                });
            },
            handleCommand(command) {//点击下拉菜单，跳转
                if(command == "/logout"){//如果选择了退出登录
                    store.commit("setToken","");//清除token
                    localStorage.removeItem("token");//清除token
                    this.$message.success("退出登录~");
                    //刷新页面
                    this.$router.push("/login");
                }else{
                    let routeUrl = this.$router.resolve({
                        path: command,
                    });
                    window.open(routeUrl.href,"_blank");
                }
            },
        }
    }
</script>

<style scoped>
    .egg-login-logo-box {
        display: flex;
        cursor: pointer;
        align-items: center;
    }

    .egg-login-logo-name {
        font-size: 26px;
        color: #f0f0f0;
        font-weight: bold;
    }

    .design-header-utils{
        float: right;
        display: flex;
        align-items: center;
    }

    .design-header-util-item{
        padding: 0 4px;
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
        color: #f0f0f0;
        border-bottom: solid 2px transparent;
    }

    .egg-admin-info:hover > .egg-avatar-box > .egg-admin-avatar {
        transition: 0.6s;
        border: solid 5px #f0f0f0;
    }

    .egg-admin-info:hover > .egg-avatar-box > .egg-admin-name {
        transition: 0.6s;
        border-bottom: solid 2px #bee1f1;
    }
</style>