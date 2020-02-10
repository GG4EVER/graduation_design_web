<template>
    <!--    应用配置-->
    <el-col :span="24">
        <el-col class="design-setting-box" :span="14" :offset="5">
            <el-form>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*&nbsp;</span>应用名称</div>
                    <el-input v-model="appName" :disabled="isSaving" @change="changeAppName"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy">微信小程序AppId（请在微信开发工具中申请获取）</div>
                    <el-input v-model="weChatAppId" :disabled="isSaving" @change="changeWeChatAppId"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*&nbsp;</span>应用描述</div>
                    <el-input v-model="appDescription" :disabled="isSaving"  @change="changeAppDescription" type="textarea" :autosize="{minRows: 4, maxRows: 6 }" maxlength="150" resize="none" show-word-limit></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <div class="egg-design-setting-dialog-footer">
            <el-button v-show="showSaveButton" type="success" round :loading="isSaving" @click="submitSaving">保存<i class="el-icon-finished el-icon--right"></i></el-button>
            <el-button  v-show="!showSaveButton" type="danger" round @click="closeAppSetting">关闭<i class="el-icon-close el-icon--right"></i></el-button>
        </div>
    </el-col>
</template>

<script>
    import {Form,FormItem,Input,Button} from "element-ui"
    export default {
        name: "DesignAppSetting",
        components:{
            [Form.name]:Form,
            [FormItem.name]:FormItem,
            [Input.name]:Input,
            [Button.name]:Button
        },
        data(){
            return{
                appName:"",//应用名称
                weChatAppId:"",//微信小程序appId
                appDescription:"",//应用描述
                showSaveButton:false,//是否显示保存按钮
                isSaving:false//是否正在保存
            }
        },
        methods:{
            closeAppSetting(){//关闭设置窗口
                this.$emit("listenCloseSettingDialog")
            },
            showSavingButton(flag = true){//是否显示保存按钮
                if(flag){
                    this.showSaveButton = true;
                }else{
                    this.showSaveButton = false;
                }
            },
            changeAppName(){//监听应用名称修改
                this.showSavingButton();
            },
            changeWeChatAppId(){//监听小程序appId修改
                this.showSavingButton();
            },
            changeAppDescription(){//监听应用描述修改
                this.showSavingButton();
            },
            submitSaving(){//提交保存
                this.isSaving = true;
                setTimeout( ()=>{
                    this.isSaving = false;
                    this.showSavingButton(false);
                },500);
            }
        }
    }
</script>

<style scoped>
    .design-setting-box{
        padding-top: 2rem;
        padding-bottom: 160px;
    }

    .design-setting-label{
        font-size: 16px;
    }

    .design-setting-star{
        color: indianred;
        font-weight: bold;
    }

    .egg-design-setting-dialog-footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 20px 0px;
        text-align: center;
        background-color: #ffffff;
        z-index: 1;
    }
</style>