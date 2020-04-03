<template>
    <el-dialog class="user-project-dialog" width="60%" :visible.sync="IsShow" :modal-append-to-body="false" top="10vh"
               :before-close="closeProject">
        <div class="user-project-info-title egg-not-copy" slot="title"><i
                class="el-icon-postcard el-icon--left user-project-info-icon"></i>{{ProjectInfo.appName}}
        </div>
        <el-col :span="24">
            <el-col :span="16" :offset="4">
                <el-form label-width="40%">
                    <el-form-item>
                        <div class="user-project-info-label egg-not-copy" slot="label"><i
                                class="el-icon-s-opportunity el-icon--left user-project-info-icon"></i>项目ID
                        </div>
                        <div class="user-project-info-content">{{ProjectInfo.appId}}</div>
                    </el-form-item>
                    <el-form-item>
                        <div class="user-project-info-label egg-not-copy" slot="label"><i
                                class="el-icon-magic-stick el-icon--left user-project-info-icon"></i>项目名称
                        </div>
                        <div v-show="!isModifying" class="user-project-info-content">{{ProjectInfo.appName}}</div>
                        <el-input v-show="isModifying" v-model="currProjectInfo.appName"
                                  placeholder="起一个牛逼哄哄的项目名吧"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="user-project-info-label egg-not-copy" slot="label"><i
                                class="el-icon-date el-icon--left user-project-info-icon"></i>创建时间
                        </div>
                        <div class="user-project-info-content">{{ProjectInfo.createTime}}</div>
                    </el-form-item>
                    <el-form-item>
                        <div class="user-project-info-label egg-not-copy" slot="label"><i
                                class="el-icon-tickets el-icon--left user-project-info-icon"></i>项目描述
                        </div>
                        <div v-show="!isModifying" class="user-project-info-content">{{ProjectInfo.description}}</div>
                        <el-input class="user-project-info-input" type="textarea" :autosize="{minRows: 2,maxRows: 6}"
                                  maxlength="150" show-word-limit resize="none" v-show="isModifying"
                                  v-model="currProjectInfo.description" placeholder="用150以内的字数描述下项目吧"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-col>
        <div slot="footer" class="user-project-info-button-box">
            <el-button class="animated fadeIn" v-show="!isModifying" round plain type="primary" @click="updateProject"
                       icon="el-icon-edit-outline">修改信息
            </el-button>
            <el-button class="animated fadeIn" v-show="!isModifying" round plain type="success" @click="designProject"
                       icon="el-icon-picture-outline-round">进入设计
            </el-button>
            <el-dropdown class="animated fadeIn" v-show="!isModifying" @command="buildProject" style="padding:0 10px;"
                         trigger="click">
                <el-button type="warning" round plain>
                    打包项目<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="h5">H5</el-dropdown-item>
                    <el-dropdown-item command="mp-weixin">微信小程序</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button class="animated fadeIn" v-show="!isModifying" round plain type="danger" @click="deleteProject"
                       icon="el-icon-delete">删除项目
            </el-button>
            <el-button class="animated fadeIn" v-show="isModifying" round plain @click="submitUpdate"
                       icon="el-icon-check">确认修改
            </el-button>
            <el-button class="animated fadeIn" v-show="isModifying" round plain type="warning"
                       @click="submitUpdate(false)" icon="el-icon-close">取消修改
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {Dialog, Button, Form, FormItem, Input, Dropdown, DropdownItem, DropdownMenu} from "element-ui"

    export default {
        name: "UserProjectInfo",
        components: {
            [Dialog.name]: Dialog,
            [Button.name]: Button,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Dropdown.name]: Dropdown,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem
        },
        props: {
            IsShow: {
                type: Boolean,
                default: false
            },
            ProjectInfo: {
                type: Object
            }
        },
        data() {
            return {
                isModifying: false,
                currProjectInfo: {}
            }
        },
        methods: {
            //点击修改信息按钮
            updateProject() {
                this.isModifying = true;
                this.currProjectInfo = JSON.parse(JSON.stringify(this.ProjectInfo));
            },
            //提交修改信息
            submitUpdate(flag = true) {
                if (flag) {
                    //确认修改
                    let oldInfo = JSON.stringify(this.ProjectInfo);
                    let newInfo = JSON.stringify(this.currProjectInfo);
                    if (oldInfo == newInfo) {
                        //如果没改内容
                    } else {
                        this.$emit("listenUpdateProjectInfo", newInfo);
                    }
                }
                this.isModifying = false;
                this.currProjectInfo = {};
            },
            //跳转到设计模块
            designProject() {
                this.$emit("listenDesign")
            },
            //删除项目
            deleteProject() {
                let name = this.ProjectInfo.appName;
                this.$confirm({
                    title: "确认要删除 " + name + " 吗?",
                    showCancelButton: true
                }).then(() => {
                    //确认删除
                    this.$emit("listenDelete")
                }).catch(() => {
                    //取消删除
                })
            },
            //关闭查看项目信息的窗口
            closeProject() {
                this.isModifying = false;
                this.currProjectInfo = {};
                this.$emit("listenClose")
            },
            buildProject(buildType) {
                this.$emit("listenBuildProject",buildType);
            }
        },
    }
</script>

<style scoped>
    .user-project-info-title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #304156;
    }

    .user-project-info-label {
        font-size: 16px;
        font-weight: bold;
        color: #8994C6;
    }

    .user-project-info-content {
        font-size: 16px;
        color: #304156;
    }

    .user-project-info-button-box {
        text-align: center;
    }

    .user-project-info-icon {
        color: #61c4fd;
    }
</style>