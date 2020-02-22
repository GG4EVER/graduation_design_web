<template>
    <el-dialog class="user-message-dialog" width="60%" :visible.sync="IsShow" :modal-append-to-body="false" top="10vh" :before-close="closeMessage">
        <div class="user-project-info-title egg-not-copy" slot="title"><i class="el-icon-chat-dot-square el-icon--left user-project-info-icon"></i>{{MessageInfo.title}}</div>
        <el-col :span="24">
            <el-col :span="22" :offset="1">
                <el-form>
                    <el-form-item>
                        <div slot="label">
                            <div class="user-message-from-info egg-not-copy">
                                <img src="../../../assets/images/boy.svg" />
                                <span>{{MessageInfo.from}}</span>
                            </div>
                        </div>
                        <div class="user-message-date egg-not-copy">
                            {{MessageInfo.date}}
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div class="user-message-content-top-wall"><div class="user-message-triangle"></div></div>
                        <div class="user-message-content">
                            {{MessageInfo.content}}
                        </div>
                        <div class="user-message-content-bottom-wall"></div>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-col>
        <div slot="footer" class="user-project-info-button-box">
            <el-button class="animated fadeIn" round type="danger" @click="closeMessage" icon="el-icon-close">关闭</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {Dialog, Button, Form, FormItem, Input} from "element-ui"
    export default {
        name: "UserMessageInfo",
        props:{
            IsShow:{
              type:Boolean
            },
            MessageInfo:{
                type:Object
            }
        },
        components: {
            [Dialog.name]: Dialog,
            [Button.name]: Button,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input
        },
        methods:{
            closeMessage(){
                this.$emit("listenClose")
            }
        }
    }
</script>

<style scoped>
    .user-message-from-info{
        height: 50px;
        display: flex;
        justify-content: space-around;;
        align-items: center;
    }

    .user-message-from-info > img{
        height: 36px;
        width: 36px;
        margin-right: 8px;
    }

    .user-message-from-info > span{
        font-size: 18px;
        color: #1f2d3d;
    }

    .user-message-date{
        height: 50px;
        text-align: right;
        line-height: 40px;
    }

    .user-message-content-top-wall{
        height: 16px;
        background-color: #efefef;
        border-top-left-radius: 14px;
        border-top-right-radius: 14px ;
        position: relative;
    }

    .user-message-content-bottom-wall{
        height: 16px;
        background-color: #efefef;
        border-bottom-left-radius: 14px;
        border-bottom-right-radius: 14px;
        position: relative;
        margin-bottom: 20px;
    }

    .user-message-content{
        background-color: #efefef;
        padding: 0px 20px;
        height: 250px;
        font-size: 15px;
        color: #1f2d3d;
        position: relative;
        overflow-y: scroll;
    }

    .user-message-triangle {
        position: absolute;
        width: 0;
        height: 0;
        border: 14px solid;
        border-color: transparent  transparent #efefef transparent;
        top: -27px;
        left: 38px;
    }

    .user-project-info-title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #333333;
    }

    .user-project-info-button-box {
        text-align: center;
    }

    .user-project-info-icon{
        color: #61c4fd;
    }

</style>