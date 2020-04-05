<template>
    <!--    应用配置-->
    <el-col :span="24">
        <el-col class="design-setting-box" :span="14" :offset="5">
            <el-form>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*&nbsp;</span>应用名称
                    </div>
                    <el-input v-model="appInfo.appName" @change="changeAppName"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy">微信小程序AppId（请在微信开发工具中申请获取）</div>
                    <el-input v-model="appInfo.weChatAppId" @change="changeWeChatAppId"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*&nbsp;</span>应用描述
                    </div>
                    <el-input v-model="appInfo.description" @change="changeAppDescription"
                              type="textarea" :autosize="{minRows: 4, maxRows: 6 }" maxlength="150" resize="none"
                              show-word-limit></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <div class="egg-design-setting-dialog-footer">
            <el-button type="success" round @click="submitSaving">保存<i
                    class="el-icon-finished el-icon--right"></i></el-button>
            <el-button type="danger" round @click="closeAppSetting">关闭<i
                    class="el-icon-close el-icon--right"></i></el-button>
        </div>
    </el-col>
</template>

<script>
    import {Form, FormItem, Input, Button} from "element-ui"

    export default {
        name: "DesignAppSetting",
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Button.name]: Button
        },
        data() {
            return {
                oldAppInfo: {},//旧的信息
                appInfo: {
                    appId: "",//应用ID
                    appName: "",//应用名称
                    weChatAppId: "",//微信小程序appId
                    description: "",//应用描述
                },
            }
        },
        created() {
            this.initAppInfo();
        },
        methods: {
            initAppInfo() {
                let appId = this.$route.query.appId;
                if (appId) {
                    let appInfo = this.$store.state.appInfo[appId];
                    if (appInfo) {
                        this.oldAppInfo = appInfo;
                        this.appInfo = JSON.parse(JSON.stringify(appInfo));
                    } else {
                        this.$message.error("获取信息发生错误")
                    }
                } else {
                    this.$message.error("获取信息发生错误，参数不正确")
                }
            },
            closeAppSetting() {//关闭设置窗口
                this.$emit("listenCloseSettingDialog")
            },
            changeAppName() {//监听应用名称修改
                this.showSavingButton();
            },
            changeWeChatAppId() {//监听小程序appId修改
                this.showSavingButton();
            },
            changeAppDescription() {//监听应用描述修改
                this.showSavingButton();
            },
            submitSaving() {//提交保存
                if (this.oldAppInfo.weChatAppId != this.appInfo.weChatAppId) {//如果改变了微信appId，则需要多调用一个请求
                    this.$API.updateProjectWeChatConfig(this.appInfo).then(res => {
                        if(res.data.error == 0){
                            this.oldAppInfo.weChatAppId = this.appInfo.weChatAppId;
                        }
                    })
                }
                if (this.oldAppInfo.appName != this.appInfo.appName || this.oldAppInfo.description != this.appInfo.description) {
                    this.$API.updateProject(this.appInfo).then(res => {
                        if (res.data.error == 0) {
                            this.showSavingButton(false);
                            this.$message.success("修改成功");
                        } else {
                            this.$message.error(res.data.error_message);
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .design-setting-box {
        padding-top: 2rem;
        padding-bottom: 160px;
    }

    .design-setting-label {
        font-size: 16px;
    }

    .design-setting-star {
        color: indianred;
        font-weight: bold;
    }

    .egg-design-setting-dialog-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 20px 0px;
        text-align: center;
        background-color: #f5fbff;
        z-index: 99;
    }
</style>