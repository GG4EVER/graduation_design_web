<template>
    <el-menu ref="elMenu" :default-active="activeMenu" :collapse="IsCollapse" router unique-opened background-color="#304156" text-color="#bfcbd9" active-text-color="#409eff" class="egg-full-height egg-not-copy">
        <el-menu-item class="egg-menu-item" index="/user" route="/user"><i class="el-icon-s-home"></i><span slot="title">首页</span></el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">账户管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item class="egg-menu-item" index="/user/userInfo" route="/user/userInfo">个人资料</el-menu-item>
                <el-menu-item class="egg-menu-item" index="/user/userAuthentication" route="/user/userAuthentication">实名认证</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-s-order"></i>
                <span slot="title">项目管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item class="egg-menu-item" index="/user/userProject" route="/user/userProject">我的项目</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-message-solid"></i>
                <span slot="title">站内消息</span>
            </template>
            <el-menu-item-group>
                <el-menu-item class="egg-menu-item" index="/user/inBox" route="/user/inBox">收件箱</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
    import {Menu,MenuItem,MenuItemGroup,Submenu} from "element-ui";
    export default {
        name: "UserAside",
        props:{
            IsCollapse:{//目录是否关闭
                type:Boolean,
                default:false
            }
        },
        data(){
          return{
              activeMenu:"/user"
          }
        },
        watch:{
            $route(to){
                let path = to.path;//监听路由,展开对应的目录
                if(path == "/user"){//如果是个人中心，就关闭其他所有
                    this.$refs["elMenu"].close("2");
                    this.$refs["elMenu"].close("3");
                    this.$refs["elMenu"].close("4");
                }
                this.activeMenu = path;
            }
        },
        components:{
            [Menu.name]:Menu,
            [MenuItem.name]:MenuItem,
            [MenuItemGroup.name]:MenuItemGroup,
            [Submenu.name]:Submenu,
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
