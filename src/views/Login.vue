<template>
    <el-container>
        <el-main class="home-main egg-not-copy">
            <!--            右上角的三角形-->
            <div class="egg-home-triangle egg-home-top-right"></div>
            <!--            右上角的三角形-->

            <!--            logo-->
            <div class="egg-login-logo-box">
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
                            <el-form :model="formData" :rules="rules" status-icon ref="formData" label-width="60px">
                                <el-form-item label="用户名" prop="userName">
                                    <el-input type="text" v-model="formData.userName" placeholder="请输入用户名"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="userPassword">
                                    <el-input type="password" v-model="formData.userPassword" placeholder="请输入密码"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-col :span="24" class="egg-flex egg-margin-bottom">
                                    <el-button type="default" round>注册</el-button>
                                    <el-button type="primary" @click="submitLogin('formData')" round>登录</el-button>
                                </el-col>
                            </el-form>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <!--            登录盒子-->

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
    import {Button, Card, Form, FormItem, Input} from "element-ui"

    export default {
        name: "Login",
        components: {
            [Button.name]: Button,
            [Card.name]: Card,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input
        },
        data() {
            let validateUserName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
                callback();
            };
            let validateUserPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'));
                }
                callback();
            };
            return {
                formData: {
                    userName: "",
                    userPassword: "",
                },
                rules: {
                    userName: [
                        {validator: validateUserName, trigger: 'blur'}
                    ],
                    userPassword: [
                        {validator: validateUserPassword, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitLogin(formName) {//提交表单，登录
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        window.console.log('error submit!!');
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
