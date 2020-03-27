<template>
    <el-dialog class="user-project-dialog" width="60%" :visible.sync="IsShow" :modal-append-to-body="false" top="10vh" :before-close="closeProject">
        <div class="user-project-info-title egg-not-copy" slot="title"><i class="el-icon-postcard el-icon--left user-project-info-icon"></i>创建新项目</div>
        <el-col :span="24" class="user-create-project-box">
            <el-col :span="16" :offset="4">
                <el-form label-width="30%">
                    <el-form-item>
                        <div class="user-project-info-label egg-not-copy" slot="label"><span class="design-setting-star">*&nbsp;</span>项目名称</div>
                        <el-input v-model="newProject.appName" placeholder="起一个牛逼哄哄的项目名吧"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="user-project-info-label egg-not-copy" slot="label"><span class="design-setting-star">*&nbsp;</span>项目描述</div>
                        <el-input class="user-project-info-input" type="textarea" :autosize="{minRows: 4,maxRows: 8}" maxlength="150" show-word-limit resize="none" v-model="newProject.description" placeholder="用150以内的字数描述下项目吧"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-col>
        <div slot="footer" class="user-project-info-button-box">
            <el-button class="animated fadeIn" round plain @click="submitCreate" icon="el-icon-check">确认创建</el-button>
            <el-button class="animated fadeIn"  round plain type="warning" @click="submitCreate(false)" icon="el-icon-close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {Dialog, Button, Form, FormItem, Input} from "element-ui"

    export default {
        name: "UserCreateProject",
        components: {
            [Dialog.name]: Dialog,
            [Button.name]: Button,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input
        },
        props:{
          IsShow:Boolean,
        },
        data(){
            return{
                newProject:{
                    appName:"",
                    description:""
                }
            }
        },
        methods:{
            submitCreate(flag = true){
                if(flag){
                    let newProject = this.newProject;
                    if(!newProject.appName){
                        this.$message.error("项目名不能为空哦");
                        return;
                    }
                    if(!newProject.description){
                        this.$message.error("项目描述不能为空哦");
                        return;
                    }
                    this.$emit("listenCreate",newProject);
                    this.newProject = {};
                }else{
                    this.$emit("listenClose");
                }
            },
            closeProject(){
                this.$emit("listenClose");
            }
        }
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
        color: #304156;
    }

    .user-create-project-box{
        padding: 20px 0;
        margin: 10px  0 20px 0 ;
    }

    .user-project-info-button-box {
        text-align: center;
    }

    .user-project-info-icon{
        color: #61c4fd;
    }

     .design-setting-star {
        color: indianred;
        font-weight: bold;
    }
</style>