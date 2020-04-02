<template>
    <el-dialog
            :title="ComponentTitle"
            top="0"
            :visible.sync="IsShow"
            width="50vw"
            append-to-body
            :before-close="closeDialog">
        <el-form v-if="UserCertification" label-width="150px">
            <el-form-item label="用户ID">
                {{UserCertification.userId}}
            </el-form-item>
            <el-form-item label="姓名">
                {{UserCertification.name}}
            </el-form-item>
            <el-form-item label="身份证">
                {{UserCertification.idCard}}
            </el-form-item>
            <el-form-item label="人像图">
                <img class="admin-authentication-pic" :src="UserCertification.portraitUrl">
            </el-form-item>
            <el-form-item label="国徽图">
                <img class="admin-authentication-pic" :src="UserCertification.nationalEmblemUrl">
            </el-form-item>
        </el-form>
        <div class="admin-authentication-button-box">
            <el-button type="default" plain @click="closeDialog">取消</el-button>
            <el-button type="danger" @click="submitAuthentication(-1)">不通过</el-button>
            <el-button type="success" @click="submitAuthentication(1)">审核通过</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {Dialog,Form,FormItem,Button} from "element-ui"
    export default {
        name: "EditAuthenticationComponent",
        components:{
            [Dialog.name]:Dialog,
            [Form.name]:Form,
            [FormItem.name]:FormItem,
            [Button.name]:Button
        },
        props:{
            ComponentTitle:{
                type:String
            },
            IsShow:{
                type:Boolean,
                default:false
            },
            UserCertification:{
                type:Object,
            }
        },
        methods:{
            closeDialog(){
                this.$emit("listenCloseDialog")
            },
            submitAuthentication(flag){
                this.$emit("listenSubmitAuthentication",flag)
            }
        }
    }
</script>

<style scoped>
    .admin-authentication-pic{
        width: 268px;
        height: 166px;
    }

    .admin-authentication-button-box{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
</style>