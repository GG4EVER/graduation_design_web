<template>
    <el-container class="animated fadeIn">
        <el-main class="egg-full-screen egg-no-padding home-main egg-not-copy">
            <!--            左上角的三角形-->
            <div class="egg-home-triangle egg-home-top-left"></div>
            <!--            左上角的三角形-->

            <div v-show="!showPlatformInformation" class="egg-back-box animated fadeIn" @click="cancelBegin"><i
                    class="el-icon-arrow-left"></i>返回
            </div>

            <!--            如果有用户信息，表示已经登录过了，则直接显示-->
            <el-dropdown v-if="userInfo" class="egg-home-dropdown" trigger="click" @command="handleCommand">
                <el-button class="egg-home-button animated fadeIn" type="primary" round plain>
                    {{userInfo.userNickName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
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
            <!--            否则没有登录，显示登录按钮-->
            <el-dropdown v-else class="egg-home-dropdown" trigger="click">
                <el-button class="egg-home-button animated fadeIn" type="primary" round plain @click="toLogin">
                    登录
                </el-button>
            </el-dropdown>

            <!--            平台的基本信息-->
            <div v-if="showPlatformInformation">
                <!--            平台logo和名称-->
                <div class="egg-home-box animated fadeIn">
                    <img class="egg-home-logo" src="../assets/logo.png" draggable="false">
                    <div class="egg-home-name">Egg Paint</div>
                </div>
                <!--            平台logo和名称-->

                <!--            一句话的简介-->
                <div class="egg-home-box animated fadeIn">
                    <span class="egg-home-title">一个在线的可视化开发平台</span>
                </div>
                <!--            一句话的简介-->

                <!--            一句话的简介-->
                <div class="egg-home-box-small animated fadeIn">
                    <span class="egg-home-title-small">设计一次，就可打包成H5、微信小程序、QQ小程序、支付宝小程序、百度小程序、字节跳动小程序</span>
                </div>
                <!--            一句话的简介-->

                <div class="egg-home-box animated fadeIn">
                    <el-button class="egg-begin-btn" type="primary" @click="beginNow">开始使用</el-button>
                </div>
            </div>
            <!--            平台的基本信息-->

            <!--            选择新建一个项目或者继续旧的项目-->
<!--            <div v-if="!showPlatformInformation">-->
<!--                <el-row class="egg-home-begin-box animated fadeIn">-->
<!--                    <el-col :span="8">-->
<!--                        <el-col :span="24" class="egg-home-check-box-title">-->
<!--                            新建一个新项目-->
<!--                        </el-col>-->
<!--                        <div @click="createProject">-->
<!--                            <el-col :span="20" :offset="2" class="egg-home-check-box">-->
<!--                                <span class="egg-home-check-box-logo"><i class="el-icon-plus"></i></span>-->
<!--                            </el-col>-->
<!--                        </div>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                        <el-col :span="24" class="egg-home-check-box-title">-->
<!--                            继续之前的项目-->
<!--                        </el-col>-->
<!--                        <div @click="designProject">-->
<!--                            <el-col :span="20" :offset="2" class="egg-home-check-box">-->
<!--                                <span class="egg-home-check-box-logo"><i class="el-icon-s-opportunity"></i></span>-->
<!--                                <div class="home-last-project-mask">-->
<!--                                    <div class="home-last-project-info">项目1</div>-->
<!--                                    <div class="home-last-project-info">2020-02-20</div>-->
<!--                                </div>-->
<!--                            </el-col>-->
<!--                        </div>-->
<!--                    </el-col>-->
<!--                </el-row>-->
<!--            </div>-->
            <!--            选择新建一个项目或者继续旧的项目-->

            <!--            右下角的三角形-->
            <div class="egg-home-triangle egg-home-bottom-right"></div>
            <!--            右下角的三角形-->

<!--            <div class="egg-about-box animated fadeIn" @click="toAboutEggPaint">-->
<!--                关于Egg Paint<i class="el-icon-arrow-right"></i>-->
<!--            </div>-->
            <user-create-project :is-show="showCreateProject" @listenCreate="submitCreateProject"
                                                      @listenClose="closeCreateProject"></user-create-project>
        </el-main>
    </el-container>
</template>

<script>
    import {Button, Dropdown, DropdownMenu, DropdownItem} from "element-ui"
    import {isPC} from "../utils/function";
    import store from "../store"
    import UserCreateProject from "../components/user/project/UserCreateProject";
    export default {
        name: "Home",
        store,
        components: {
            UserCreateProject,
            [Button.name]: Button,
            [Dropdown.name]: Dropdown,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
        },
        data() {
            return {
                showPlatformInformation: true,
                userInfo: null,
                showCreateProject:false
            }
        },
        methods: {
            beginNow() {//点击开始使用
                if (isPC()) {
                    //判断是否登录，没登录跳转登录注册,登录了则显示创建新项目或者继续以前的项目
                    if (this.userInfo) {
                        this.$router.push("/user/userProject");
                    } else {
                        this.toLogin();
                    }
                } else {
                    this.$message.error("暂时不支持在移动端上创作，请前往PC端。");
                }
            },
            closeCreateProject() {
                this.showCreateProject = false;
            },
            //提交创建的新项目
            submitCreateProject(newProject) {
                let loading = this.$loading.service({
                    lock: true,
                    text: '正在创建，请稍等..',
                    background: 'rgba(0, 0, 0, 0.6)'
                });
                window.console.log(newProject)
                this.closeCreateProject();
                setTimeout(()=>{
                    loading.close();
                    this.showPlatformInformation = true;
                    this.whenCreateSuccess();
                },2000)
            },
            //创建成功后，提示开始创作或者取消
            whenCreateSuccess(){
                this.$confirm({
                    showCancelButton:true,
                    title:"创建成功",
                    type:"success",
                    showClose:false,
                    message:"是否立刻开始设计（也可以在个人中心 -> 我的项目 中进入设计）",
                    confirmButtonText:"开始设计",
                    cancelButtonText:"暂时不用",
                    roundButton:true
                }).then(()=>{
                    this.$router.push("/design");
                }).catch(()=>{
                    //暂时不用
                })
            },
            designProject() {
                let routeUrl = this.$router.resolve({
                    path: "/design",
                    params: {id: ""}
                });
                window.open(routeUrl.href, "_blank");
            },
            createProject(){
              //创建新项目
                this.showCreateProject = true;
            },
            toLogin() {
                this.$router.push('/login');
            },
            cancelBegin() {//返回，不玩了
                this.showPlatformInformation = true;
            },
            toAboutEggPaint() {//跳转到关于平台的介绍
                this.$router.push('/about');
            },
            handleCommand(command) {//点击下拉菜单，跳转
                if (command == "/logout") {//如果选择了退出登录
                    store.commit("setToken", null);//清除token
                    store.commit("setUserInfo", null);//清除token
                    this.$message.success("退出登录~");
                    //刷新页面
                    this.$router.go(0);
                } else {
                    this.$router.push(command);
                }
            },
        },
        created() {
            if (store.state.userInfo) {//如果本地有用户信息，则直接读取
                this.userInfo = store.state.userInfo;
            } else if (store.state.token) {//否则读取是否有token
                this.$API.getUserInfo().then(res => {
                    if (res.data.error != "0") {//如果token已经过期或者失效等，则清除掉本地存储的token
                        store.commit("setToken", "");
                        localStorage.removeItem("token");//清除token
                    } else {//否则获取用户信息
                        this.userInfo = res.data.userInfo;
                        store.commit("setUserInfo", res.data.userInfo);
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .home-main {
        z-index: -1;
        background-color: #F8FAFF;
        display: flex;
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
    }

    .egg-back-box {
        position: absolute;
        top: 60px;
        left: 20px;
        font-size: 30px;
        color: #ffffff;
        cursor: pointer;
    }

    .egg-about-box {
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

    .egg-home-box-small {
        text-align: center;
        margin: 20px 0px;
    }

    .egg-home-title-small {
        color: #aaaaaa;
        font-size: 18px;
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
        transition: 0.4s;
        padding: 15% 0;
        border-radius: 20px;
        background-color: #eeeeee;
        cursor: pointer;
        color: #bee1f1;
        text-align: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .egg-home-check-box:hover {
        transition: 0.4s;
        background-image: linear-gradient(180deg, rgba(0, 174, 255, 0.5) 0%, rgba(51, 105, 231, 0.5) 100%);
        color: #F0F0F0 !important;
        box-shadow: 0 0 20px #aaaaaa;
    }

    .egg-home-check-box:hover .home-last-project-mask {
        transition: 0.4s;
        opacity: 1;
    }

    .home-last-project-mask {
        transition: 0.4s;
        opacity: 0;
        position: absolute;
        height: 80px;
        width: 100%;
        bottom: 0;
        background-color: rgba(0, 174, 255, 0.2);
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .home-last-project-info {
        font-size: 18px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }

    .egg-home-check-box-logo {
        font-size: 160px;
    }
</style>
