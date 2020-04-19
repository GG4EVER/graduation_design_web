<template>
    <el-container class="animated fadeIn">
        <el-main class="home-main egg-not-copy">
            <!--            右上角的三角形-->
            <div class="egg-home-triangle egg-home-top-right"></div>
            <!--            右上角的三角形-->

            <!--            logo-->
            <div class="egg-login-logo-box" @click="backHome">
                <img class="egg-login-logo" src="../assets/logo.png" draggable="false"/>
                <span class="egg-login-logo-name">Egg Paint</span>
            </div>
            <!--            logo-->

            <!--            登录盒子-->
            <div class="egg-home-box">
                <el-row class="egg-login-box">
                    <el-col :xl="5" :lg="6" :md="8" :sm="16" :xs="22">
                        <el-card>
                            <div slot="header">
                                <span class="egg-login-box-header">登录</span>
                            </div>
                            <el-form :model="loginData" :rules="rules" status-icon ref="loginData" label-width="60px">
                                <el-form-item label="用户名" prop="userName">
                                    <el-input type="text" v-model="loginData.userName" placeholder="请输入用户名"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="userPassword">
                                    <el-input type="password" v-model="loginData.userPassword" placeholder="请输入密码"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-col :span="24" class="egg-flex egg-margin-bottom">
                                    <el-button type="default" @click="drawerShow = true" round>注册</el-button>
                                    <el-button type="primary" @click="submitLogin('loginData')" round>登录</el-button>
                                </el-col>
                            </el-form>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <!--            登录盒子-->

            <!--            注册盒子-->
            <el-drawer
                    :visible.sync="drawerShow"
                    :direction="direction" size="100%" :before-close="beforeCancelRegister" ref="registerDrawer">
                <div slot="title" class="egg-register-box-title egg-not-copy">
                    <img class="egg-login-logo" src="../assets/logo.png" draggable="false"><span>Egg Paint</span>
                </div>
                <el-row class="egg-login-box">
                    <el-col :xl="5" :lg="6" :md="8" :sm="16" :xs="22">
                        <el-card class="egg-register-box egg-not-copy">
                            <div slot="header">
                                <span class="egg-login-box-header">注册</span>
                            </div>
                            <el-form :model="registerData" :rules="registerRules" status-icon ref="registerData"
                                     label-width="80px">
                                <el-form-item label="用户名" prop="userName">
                                    <el-input type="text" v-model="registerData.userName" placeholder="请输入用户名"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="userPassword">
                                    <el-input type="password" v-model="registerData.userPassword" placeholder="请输入密码"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="checkPassword">
                                    <el-input type="password" v-model="registerData.checkPassword" placeholder="请再次输入密码"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="滑动验证">
                                    <el-slider v-model="robotNum" :show-tooltip="false" :disabled="robotDisabled" @change="validateRobot" ></el-slider>
                                </el-form-item>
                                <el-col :span="24" class="egg-flex egg-margin-bottom egg-flex-end">
                                    <el-button type="default" @click="submitRegister('registerData')" round>注册
                                    </el-button>
                                </el-col>
                            </el-form>
                        </el-card>
                    </el-col>
                </el-row>
                <div class="egg-cancel-register-box" @click="cancelRegister">已有账号,取消注册</div>
            </el-drawer>
            <!--            注册盒子-->

            <!--            左下角的三角形-->
            <div class="egg-home-triangle egg-home-bottom-left"></div>
            <!--            左下角的三角形-->

            <div class="egg-about-box" @click="toAboutEggPaint">
                <i class="el-icon-arrow-left"></i>关于Egg Paint
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import {Button, Card, Form, FormItem, Input, Drawer,Slider} from "element-ui"
    import store from '../store'
    export default {
        name: "Login",
        store,
        components: {
            [Button.name]: Button,
            [Card.name]: Card,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Drawer.name]: Drawer,
            [Slider.name]:Slider
        },
        data() {
            let validateUserName = (rule, value, callback) => {//检查登录的用户名
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
                callback();
            };
            let validateRegisterUserName = (rule, value, callback) => {//检查注册的用户名
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                } else if(value.indexOf("_") != -1 || value.indexOf("/") != -1 || value.indexOf("-") != -1 && value.indexOf(".") != -1) {
                    return callback(new Error('用户名出现非法字符'));
                }else{//请求服务器是否重复
                    this.$API.userCheckUserName(value).then(res => {
                        if(res.data.error != "0"){//注册有错误
                            return callback(new Error(res.data.error_message));
                        }
                        callback();
                    });
                }
            };
            let validateUserPassword = (rule, value, callback) => {//检查登录密码
                if (!value) {
                    return callback(new Error('密码不能为空'));
                }
                callback();
            };
            let validateRegisterUserPassword = (rule, value, callback) => {//检查注册的密码
                if (!value) {
                    return callback(new Error('密码不能为空'));
                }
                if (value.length < 6 || value.length > 18) {
                    return callback(new Error('请输入6-12位的密码'));
                }
                if (value.match('^(?![a-zA-z]+$)(?!\\d+$)(?![!@#$%^&*]+$)[a-zA-Z\\d!@#$%^&*]+$')) {
                    callback();
                } else {
                    return callback(new Error('请输入包含数字和字母的密码'));
                }
            };
            let validateCheckPassword = (rule, value, callback) => {//检查注册的确认密码
                if (!value) {
                    return callback(new Error('确认密码不能为空'));
                } else if (this.registerData.userPassword != value) {
                    return callback(new Error('两次密码不匹配'));
                }
                callback();
            };
            return {
                drawerShow: false,//是否显示注册的抽屉
                direction: "ltr",//抽屉的打开方式 ltr从左往右开 rtl从右往左开 ttb从上往下开 btt从下往上开
                robotNum:0,//检测是否是机器人滑动验证的值
                robotDisabled:false,//是否可以滑动机器人的验证，不能滑动代表验证成功
                loginData: {//登录的表单数据
                    userName: "",
                    userPassword: "",
                },
                registerData: {//注册的表单数据
                    userName: "",
                    userPassword: "",
                    checkPassword: "",//确认密码
                },
                rules: {//登录的验证规则
                    userName: [
                        {validator: validateUserName, trigger: 'blur'}
                    ],
                    userPassword: [
                        {validator: validateUserPassword, trigger: 'blur'}
                    ]
                },
                registerRules: {//注册的验证规则
                    userName: [
                        {validator: validateRegisterUserName, trigger: 'blur'}
                    ],
                    userPassword: [
                        {validator: validateRegisterUserPassword, trigger: 'blur'}
                    ],
                    checkPassword: [
                        {validator: validateCheckPassword, trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            backHome(){//回到主页
                this.$router.push("/");
            },
            validateRobot(){//检测是否是机器人
                if(this.robotNum != 100){
                    this.$message.info("请滑至最右端");
                    this.robotNum = 0;
                }else{
                    this.$message.success("验证完成");
                    this.robotDisabled = true;
                }
            },
            beforeCancelRegister(done){//取消注册前
                //取消注册前先清空数据
                this.robotNum = 0;
                this.robotDisabled = false;
                this.registerData = {
                    userName: "",
                    userPassword: "",
                    checkPassword: ""
                }
                done();
            },
            cancelRegister(){//取消注册
                this.$refs['registerDrawer'].closeDrawer();
            },
            submitLogin(formName) {//提交表单，登录
                let name = this.loginData.userName;
                let password = this.loginData.userPassword;
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {//检查通过
                        if (this.loginData.userName.indexOf("_") != -1) {//如果用户名中出现 _ ，则是管理员
                            this.$API.adminLogin(name, password).then(function (res) {
                                if (res.data.error == "0") {//登录成功
                                    //保存token
                                    store.commit("setToken", res.data.token);
                                    that.$router.push("/admin");
                                } else {
                                    that.$message.error(res.data.error_message);
                                }
                            });
                        } else {//否则是普通用户
                            this.$API.userLogin(name, password).then(function (res) {
                                if (res.data.error == "0") {//登录成功
                                    //保存token
                                    store.commit("setToken", res.data.token);
                                    that.$router.push("/user");
                                } else {
                                    that.$message.error(res.data.error_message);
                                }
                            });
                        }
                    }else{//检查不通过
                        return false;
                    }
                });
            },
            submitRegister(formName) {//提交注册
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message.success('submit!!');
                    } else {
                        this.$message.error('error submit!!');
                        return false;
                    }
                });
            },
            toAboutEggPaint() {//跳转到关于平台的介绍
                this.$router.push('/about');
            },
        }
    }
</script>

<style scoped>
    .egg-flex {
        display: flex;
        width: 100%;
        justify-content: space-around;
    }

    .egg-flex-end {
        justify-content: flex-end;
    }

    .egg-margin-bottom {
        margin-bottom: 20px;
    }

    .egg-login-logo-box {
        height: 4rem;
        padding: 1rem;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        cursor: pointer;
        align-items: center;
    }

    .egg-login-logo {
        height: 3rem;
        width: 3rem;
        margin-right: 10px;
    }

    .egg-login-logo-name {
        font-size: 1.6rem;
        color: #8994C6;
        font-weight: bold;
    }

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

    .egg-about-box {
        position: absolute;
        bottom: 60px;
        left: 20px;
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

    .egg-home-box {
        text-align: center;
        margin: 40px 0px;
    }

    .egg-login-box {
        display: flex;
        justify-content: center;
    }

    .egg-login-box-header {
        font-size: 25px;
        color: #8994C6;
        font-weight: bold;
    }

    .egg-register-box-title {
        display: flex;
        text-align: center;
        justify-content: flex-start;
        align-items: center;
        font-size: 1.6rem;
        color: #8994C6;
        font-weight: bold;
    }

    .egg-register-box{
        margin-top: 3rem;
    }

    .egg-cancel-register-box{
        height: 4rem;
        width: 100%;
        padding-top: 1rem;
        position: absolute;
        bottom: 0;
        background-color: #e0e0e0;
        cursor: pointer;
        text-align: center;
        font-size: 20px;
        color: #5b5b5b;
    }

    .egg-cancel-register-box:hover{
        transition: 0.3s;
        background: linear-gradient(90deg, rgba(0, 174, 255, 0.5) 0%, rgba(51, 105, 231, 0.5) 100%);
        box-shadow: 0 -2px 15px #999999;
        color: #ffffff;
    }

    .egg-home-top-right {
        top: -200px;
        right: -200px;
        transform: rotate(-45deg);
    }

    .egg-home-bottom-left {
        bottom: -200px;
        left: -200px;
        transform: rotate(135deg);
    }
</style>
