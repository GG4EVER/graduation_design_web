<template>
    <el-row>
        <el-col class="egg-user-info-box" :xl="{span:12,offset:6}" :lg="{span:12,offset:6}" :md="{span:16,offset:4}"
                :sm="{span:20,offset:2}" :xs="{span:22,offset:1}">
            <el-form v-if="UserInfo" :model="UserInfo" label-position="right" label-width="80px">
                <el-form-item label="用户名" class="egg-not-copy">
                    <el-input :value="UserInfo.userName" disabled></el-input>
                </el-form-item>
                <!--                显示和修改时不是操作同一个对象-->
                <el-form-item v-if="!canModify" label="昵称" class="egg-not-copy">
                    <el-input v-model="UserInfo.userNickName" disabled></el-input>
                </el-form-item>
                <el-form-item v-else label="昵称" class="egg-not-copy">
                    <el-input v-model="userInfoTemp.userNickName" autocomplete="off" placeholder="请输入新的昵称"></el-input>
                </el-form-item>
                <!--                显示和修改时不是操作同一个对象-->
                <el-form-item v-if="!canModify" label="手机号" class="egg-not-copy">
                    <el-input v-model="UserInfo.userPhone" disabled></el-input>
                </el-form-item>
                <el-form-item v-else label="手机号" class="egg-not-copy">
                    <el-input v-model="userInfoTemp.userPhone" type="number"></el-input>
                </el-form-item>

                <el-col class="egg-user-info-button-box">
                    <el-button class="egg-user-info-button animated fadeIn" style="float: left;" v-show="!canModify" type="danger" round
                               @click="isModifyingPassword = true">修改密码
                    </el-button>
                    <el-button class="egg-user-info-button animated fadeIn" v-show="!canModify" type="primary" round
                               @click="modifyUserInfo">修改资料
                    </el-button>
                </el-col>
                <el-col class="egg-user-info-button-box">
                    <el-button class="egg-user-info-button animated fadeIn"  v-show="canModify" type="danger" round
                               @click="cancelModifyUserInfo">取消
                    </el-button>
                    <el-button class="egg-user-info-button animated fadeIn" v-show="canModify" type="success" round
                               @click="submitModifyUserInfo">确认
                    </el-button>
                </el-col>
            </el-form>
        </el-col>

        <el-dialog title="修改密码" :visible.sync="isModifyingPassword" :modal-append-to-body="false">
            <el-form>
                <el-form-item label="请输入原密码">
                    <el-input v-model="oldPassword" autocomplete="off" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item label="请输入新密码">
                    <el-input v-model="newPassword" autocomplete="off" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item label="请再次输入新密码">
                    <el-input v-model="newPassword2" autocomplete="off" type="password" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="submitModifyPassword(false)">取 消</el-button>
                <el-button type="primary" @click="submitModifyPassword(true)">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    import store from "../../store"
    import {Form, FormItem, Input, Button, Dialog} from "element-ui"

    export default {
        name: "UserInfo",
        store,
        props: {
            UserInfo: {
                type: Object,
                default: null
            }
        },
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Button.name]: Button,
            [Dialog.name]:Dialog
        },
        data() {
            return {
                canModify: false,//能否修改用户信息
                userInfoTemp: null,//临时保存用户信息
                isModifyingPassword:false,//是否正在修改密码
                oldPassword:"",//旧密码
                newPassword:"",//新密码
                newPassword2:"",//再次输入新密码
            }
        },
        methods: {
            modifyUserInfo() {//修改用户资料
                //临时保存一份用户信息
                this.userInfoTemp = JSON.parse(JSON.stringify(this.UserInfo));
                this.canModify = true;
            },
            cancelModifyUserInfo() {//取消修改用户资料
                this.canModify = false;
            },
            submitModifyUserInfo() {//确认修改用户资料
                let data = {};
                let isModified = false;
                if(this.userInfoTemp.userNickName != this.UserInfo.userNickName){
                    //改变了用户名
                    data.userNickName = this.userInfoTemp.userNickName;
                    isModified = true;
                }
                if(this.userInfoTemp.userPhone != this.UserInfo.userPhone){
                    //改变了手机号码
                    data.userPhone = this.userInfoTemp.userPhone;
                    if(data.userPhone.length != 11){
                        this.$message.error("手机号码长度不正确");
                        return;
                    }
                    isModified = true;
                }
                if(isModified){//改变了值
                    this.$API.updateUserInfo(data).then(res=>{
                        if(res.data.error != "0"){//修改失败,直接输出错误信息
                            this.$message.error(res.data.error_message);
                        }else{
                            this.$message.success("修改成功~");
                            this.canModify = false;
                            //获得到新的用户信息，并保存到store
                            store.commit("setUserInfo",res.data.userInfo);
                        }
                    });
                }else{
                    //没修改值
                    this.canModify = false;
                }
            },
            submitModifyPassword(isModify){//修改密码
                if(isModify){//确认修改
                    if(this.oldPassword != this.UserInfo.userPassword){//旧密码不同
                        this.$message.error("原密码不相同");
                        return;
                    }
                    if(this.newPassword != this.newPassword2){
                        this.$message.error("两次输入的密码不相同");
                        return;
                    }
                    if(this.newPassword == this.UserInfo.userPassword){//新密码和旧密码相同
                        this.$message.success("已修改");
                        return;
                    }
                    if(this.newPassword.length < 6 || this.newPassword.length > 18){
                        this.$message.error("密码长度应该在6-18位之间");
                        return;
                    }
                    //可以修改，发送请求

                }
                window.console.log(this.UserInfo);
                this.oldPassword = "";
                this.newPassword = "";
                this.newPassword2 = "";
                this.isModifyingPassword = false;
            },
        }
    }
</script>

<style scoped>
    .egg-user-info-box {
        padding-top: 40px;
    }

    .egg-user-info-button-box {
        text-align: right;
        padding-right: 10px;
        padding-left: 10px;
    }

    .egg-user-info-button {
        padding-left: 3rem;
        padding-right: 3rem;
        border: 4px solid #f0f0f0;
    }

    .egg-user-info-button:hover {
        border: 4px solid #e0e0e0;
    }

</style>
