<template>
    <el-container>
        <el-main class="home-main egg-not-copy">
            <!--            左上角的三角形-->
            <div class="egg-home-triangle egg-home-top-left"></div>
            <!--            左上角的三角形-->

            <transition name="el-fade-in">
                <div v-show="!showPlatformInformation" class="egg-back-box" @click="cancelBegin"><i
                        class="el-icon-arrow-left"></i>返回
                </div>
            </transition>

            <!--            如果有用户信息，表示已经登录过了，则直接显示-->
            <el-dropdown v-if="userInfo" class="egg-home-dropdown" trigger="click" @command="handleCommand">
                <el-button class="egg-home-button" type="primary" round plain>
                    荷包蛋<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/user"><i class="el-icon-user"></i>个人中心</el-dropdown-item>
                    <el-dropdown-item command="-1"><i class="el-icon-unlock"></i>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--            否则没有登录，显示登录按钮-->
            <el-dropdown v-else class="egg-home-dropdown" trigger="click">
                <el-button class="egg-home-button" type="primary" round plain @click="toLogin">
                    登录
                </el-button>
            </el-dropdown>

            <!--            平台的基本信息-->
            <div v-if="showPlatformInformation">
                <!--            平台logo和名称-->
                <div class="egg-home-box">
                    <img class="egg-home-logo" src="../assets/logo.png" draggable="false">
                    <div class="egg-home-name">Egg Paint</div>
                </div>
                <!--            平台logo和名称-->

                <!--            一句话的简介-->
                <div class="egg-home-box">
                    <span class="egg-home-title">一个在线的可视化开发平台</span>
                </div>
                <!--            一句话的简介-->

                <div class="egg-home-box">
                    <el-button class="egg-begin-btn" type="primary" @click="beginNow">开始使用</el-button>
                </div>
            </div>
            <!--            平台的基本信息-->

            <!--            选择新建一个项目或者继续旧的项目-->
            <div v-if="!showPlatformInformation">
                <el-row class="egg-home-begin-box">
                    <el-col :span="8">
                        <el-col :span="24" class="egg-home-check-box-title">
                            新建一个新项目
                        </el-col>
                        <el-col :span="20" :offset="2" class="egg-home-check-box">
                            <span class="egg-home-check-box-logo"><i class="el-icon-plus"></i></span>
                        </el-col>
                    </el-col>
                    <el-col :span="8">
                        <el-col :span="24" class="egg-home-check-box-title">
                            继续之前的项目
                        </el-col>
                        <el-col :span="20" :offset="2" class="egg-home-check-box">
                            <span class="egg-home-check-box-logo"><i class="el-icon-s-opportunity"></i></span>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
            <!--            选择新建一个项目或者继续旧的项目-->

            <!--            右下角的三角形-->
            <div class="egg-home-triangle egg-home-bottom-right"></div>
            <!--            右下角的三角形-->

            <div class="egg-about-box" @click="toAboutEggPaint">
                关于Egg Paint<i class="el-icon-arrow-right"></i>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import {Button, Dropdown, DropdownMenu, DropdownItem} from "element-ui"
    import {isPC} from "../utils/function";
    export default {
        name: "Home",
        components: {
            [Button.name]: Button,
            [Dropdown.name]: Dropdown,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem
        },
        data() {
            return {
                showPlatformInformation: true,
                userInfo: null,
            }
        },
        methods: {
            beginNow() {//点击开始使用
                if(isPC()){
                    //判断是否登录，没登录跳转登录注册,登录了则显示创建新项目或者继续以前的项目
                    if(this.userInfo){
                        this.showPlatformInformation = false;
                    }else{
                        this.toLogin();
                    }
                }else{
                    this.$message.error("暂时不支持在移动端上创作，请前往PC端。");
                }
            },
            toLogin(){
                this.$router.push('/login');
            },
            cancelBegin() {//返回，不玩了
                this.showPlatformInformation = true;
            },
            toAboutEggPaint(){//跳转到关于平台的介绍
                this.$router.push('/about');
            },
            handleCommand(command){//点击下拉菜单，跳转
                if(command == "-1"){//如果选择的是退出登录
                    this.userInfo = null;
                }else{//否则直接跳转链接
                    this.$router.push(command);
                }
            },
        }
    }
</script>

<style scoped>
    .home-main {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        width: 100vw;
        z-index: -1;
        padding: 0;
        background-color: #F8FAFF;
        display: flex;
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
    }

    .egg-not-copy {
        -moz-user-select: none; /* Firefox私有属性 */
        -webkit-user-select: none; /* WebKit内核私有属性 */
        -ms-user-select: none; /* IE私有属性(IE10及以后) */
        -khtml-user-select: none; /* KHTML内核私有属性 */
        -o-user-select: none; /* Opera私有属性 */
        user-select: none; /* CSS3属性 */
    }

    .egg-back-box {
        position: absolute;
        top: 60px;
        left: 20px;
        font-size: 30px;
        color: #ffffff;
        cursor: pointer;
    }

    .egg-about-box{
        position: absolute;
        bottom: 60px;
        right: 20px;
        font-size: 18px;
        color: #ffffff;
        cursor: pointer;
    }

    .egg-home-triangle {
        position: absolute;
        width: 0;
        height: 0;
        border: 200px solid;
        border-color: transparent transparent transparent #61c4fd;
        box-shadow: 0 0 15px #999999;
        z-index: -1;
    }

    .egg-home-top-left {
        top: -200px;
        left: -200px;
        transform: rotate(-135deg);
    }

    .egg-home-bottom-right {
        bottom: -200px;
        right: -200px;
        transform: rotate(45deg);
    }

    .egg-home-dropdown {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .egg-home-button {
        background-color: #ffffff !important;
        color: #00AEFF !important;
    }

    .egg-home-box {
        text-align: center;
        margin: 40px 0px;
    }

    .egg-home-logo {
        width: 160px;
        height: 160px;
    }

    .egg-home-name {
        font-size: 40px;
        color: #8994C6;
        margin: 15px 0;
        font-weight: bold;
    }

    .egg-home-title {
        color: #9a9a9a;
        font-size: 30px;
        font-weight: bold;
    }

    .egg-begin-btn {
        width: 160px;
        height: 56px;
        border-radius: 50px;
        font-size: 20px;
        background-image: linear-gradient(90deg, #00AEFF 0%, #3369E7 100%);
        box-shadow: 0 2px 6px 0 rgba(51, 105, 231, 0.4);
        border: none;
    }

    .egg-home-check-box-title {
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
        color: #8994C6;
        font-weight: bold;
    }

    .egg-home-begin-box {
        padding: 0 10%;
        display: flex;
        justify-content: space-around;
    }

    .egg-home-check-box {
        padding: 15% 0;
        border-radius: 20px;
        background-color: #eeeeee;
        cursor: pointer;
        color: #bee1f1;
        text-align: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
    }

    .egg-home-check-box:hover {
        transition: 0.2s;
        background-image: linear-gradient(180deg, rgba(0, 174, 255, 0.5) 0%, rgba(51, 105, 231, 0.5) 100%);
        color: #F0F0F0 !important;
        box-shadow: 0 0 20px #aaaaaa;
    }

    .egg-home-check-box-logo {
        font-size: 160px;
    }
</style>
