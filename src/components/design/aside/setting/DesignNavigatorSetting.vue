<template>
    <!--    顶部导航栏配置-->
    <el-col :span="24">
        <el-col class="design-setting-box" :span="14" :offset="5">
            <el-col :span="14" :offset="5" class="design-setting-tip-box">
                <el-col :span="24" class="design-setting-tip-title">提醒</el-col>
                <el-col :span="24" class="design-setting-tip-info">
                    此处修改的配置都是默认配置，可以在页面中修改覆盖默认配置。比如默认导航栏背景颜色为白色，而在A页面中修改成了黑色，而B页面没有修改，那么，在A页面中，导航栏背景颜色为黑色，而B页面中导航栏背景颜色为白色。
                </el-col>
            </el-col>
            <el-col :span="22" :offset="1">
                <el-divider><i class="el-icon-info" style="color: #999999;"></i></el-divider>
            </el-col>
            <el-col :span="24">
                <el-form>
                    <el-form-item>
                        <div slot="label" class="design-setting-label egg-not-copy">默认导航栏背景颜色</div>
                        <el-color-picker v-model="globalStyle.navigationBarBackgroundColor" @change="changeNavigatorBackgroundColor" :predefine="predefineColors"></el-color-picker>
                    </el-form-item>
                    <el-form-item>
                        <div slot="label" class="design-setting-label egg-not-copy">默认导航栏标题颜色（暂时只能选择黑和白）</div>
                        <el-radio-group v-model="globalStyle.navigationBarTextStyle" @change="changeNavigatorTitleColor">
                            <el-radio-button label="black">黑</el-radio-button>
                            <el-radio-button label="white">白</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <div slot="label" class="design-setting-label egg-not-copy">默认导航栏标题</div>
                        <el-input v-model="globalStyle.navigationBarTitleText" :disabled="isSaving" @change="changeNavigatorTitle"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-col>
        <div class="egg-design-setting-dialog-footer">
            <el-button v-show="showSaveButton" type="success" round :loading="isSaving" @click="submitSaving">保存<i class="el-icon-finished el-icon--right"></i></el-button>
            <el-button  v-show="!showSaveButton" type="danger" round @click="closeAppSetting">关闭<i class="el-icon-close el-icon--right"></i></el-button>
        </div>
    </el-col>
</template>

<script>
    import {Form,FormItem,Input,Button,Divider,ColorPicker,RadioGroup,RadioButton} from "element-ui"
    import store from "../../../../store"
    export default {
        name: "DesignNavigatorSetting",
        store,
        components:{
            [Form.name]:Form,
            [FormItem.name]:FormItem,
            [Input.name]:Input,
            [Button.name]:Button,
            [Divider.name]:Divider,
            [ColorPicker.name]:ColorPicker,
            [RadioGroup.name]:RadioGroup,
            [RadioButton.name]:RadioButton
        },
        data(){
            return{
                globalStyle:{
                    navigationBarBackgroundColor:"#ffffff",//导航栏背景颜色
                    navigationBarTextStyle:"black",//导航栏标题颜色
                    navigationBarTitleText:"",//导航栏标题
                },
                predefineColors:["#ffffff","#f0f0f0","#e0e0e0","#999999","#666666","#333333","#000000"],//预定义颜色
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
            changeNavigatorBackgroundColor(){//监听导航栏背景颜色修改
                this.showSavingButton();
            },
            changeNavigatorTitleColor(){//监听导航栏标题颜色修改
                this.showSavingButton();
            },
            changeNavigatorTitle(){//监听导航栏标题修改
                this.showSavingButton();
            },
            submitSaving(){//提交保存
                this.isSaving = true;
                let appId = this.$store.state.appId;
                this.$API.updateGlobalStyleConfig(appId,this.globalStyle).then(res => {
                    if(res.data.error == 0){
                        store.commit("setGlobalStyle",this.globalStyle);
                        this.isSaving = false;
                        this.showSavingButton(false);
                    }else{
                        this.$message.error(res.data.error_message);
                        this.isSaving = false;
                    }
                })
            }
        },
        created() {
            this.globalStyle = store.state.globalStyle;
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

    .design-setting-tip-box{
        padding: 1rem;
        background-color: #f0f0f0;
        border-radius: 14px;
        margin-bottom: 1rem;
    }

    .design-setting-tip-title{
        font-size: 16px;
        color: #666666;
        text-align: center;
    }

    .design-setting-tip-info{
        padding: 6px;
        font-size: 14px;
        color: #5B5B5B;
        text-indent: 2em;
    }

    .egg-design-setting-dialog-footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 20px 0px;
        text-align: center;
        z-index: 99;
        background-color: #f5fbff;
    }
</style>