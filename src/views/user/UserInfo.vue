<template>
    <el-row>
        <el-col class="egg-user-info-box" :xl="{span:12,offset:6}" :lg="{span:12,offset:6}" :md="{span:16,offset:4}"
                :sm="{span:20,offset:2}" :xs="{span:22,offset:1}">
            <el-form v-if="UserInfo" label-position="right" label-width="80px" :model="UserInfo">
                <el-form-item label="用户名" class="egg-not-copy">
                    <el-input :value="UserInfo.userName" disabled></el-input>
                </el-form-item>
                <!--                显示和修改时不是操作同一个对象-->
                <el-form-item v-if="!canModify" label="昵称" class="egg-not-copy">
                    <el-input v-model="UserInfo.userNickName" disabled></el-input>
                </el-form-item>
                <el-form-item v-else label="昵称" class="egg-not-copy">
                    <el-input v-model="userInfoTemp.userNickName"></el-input>
                </el-form-item>
                <!--                显示和修改时不是操作同一个对象-->
                <el-form-item v-if="!canModify" label="手机号" class="egg-not-copy">
                    <el-input v-model="UserInfo.userPhone" disabled></el-input>
                </el-form-item>
                <el-form-item v-else label="手机号" class="egg-not-copy">
                    <el-input v-model="userInfoTemp.userPhone"></el-input>
                </el-form-item>

                <el-col class="egg-user-info-button-box">
                    <el-button class="egg-user-info-button animated fadeIn" v-show="!canModify" type="primary" round
                               @click="modifyUserInfo">修改
                    </el-button>
                </el-col>
                <el-col class="egg-user-info-button-box">
                    <el-button class="egg-user-info-button animated fadeIn" v-show="canModify" type="danger" round
                               @click="cancelModifyUserInfo">取消
                    </el-button>
                    <el-button class="egg-user-info-button animated fadeIn" v-show="canModify" type="success" round
                               @click="submitModifyUserInfo">确认
                    </el-button>
                </el-col>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import store from "../../store"
    import {Form, FormItem, Input, Button} from "element-ui"

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
            [Button.name]: Button
        },
        data() {
            return {
                canModify: false,//能否修改用户信息
                userInfoTemp: null,//临时保存用户信息
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
                //没改变值
                // eslint-disable-next-line no-empty
                if(this.userInfoTemp.userNickName == this.UserInfo.userNickName && this.userInfoTemp.userPhone == this.UserInfo.userPhone){
                }else{//改变了值
                    this.$API.updateUserInfo(this.userInfoTemp).then(res=>{
                        if(res.data.error != "0"){//修改失败,直接输出错误信息
                            this.$message.error(res.data.error_message);
                        }else{
                            //获得到新的用户信息，并保存到store
                            store.commit("setUserInfo",res.data.userInfo);
                        }
                    });
                }
                this.canModify = false;
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
