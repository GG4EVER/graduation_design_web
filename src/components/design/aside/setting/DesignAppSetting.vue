<template>
    <!--    应用配置-->
    <el-col :span="24">
        <el-col class="design-setting-box" :span="14" :offset="5">
            <el-form>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*&nbsp;</span>应用名称
                    </div>
                    <el-input v-model="appInfo.appName"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy">微信小程序AppId（请在微信开发工具中申请获取）</div>
                    <el-input v-model="weChatConfig.weChatAppId"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*&nbsp;</span>应用描述
                    </div>
                    <el-input v-model="appInfo.description"
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
                oldWeChatConfig: {},//旧的信息
                appInfo: {},
                weChatConfig: {},
            }
        },
        created() {
            this.initAppInfo();
        },
        methods: {
            initAppInfo() {
                let appInfo = this.$store.state.appInfo;
                let weChatConfig = this.$store.state.weChatConfig;
                if (appInfo && weChatConfig) {
                    this.oldAppInfo = appInfo;
                    this.appInfo = JSON.parse(JSON.stringify(appInfo));
                    this.oldWeChatConfig = weChatConfig;
                    this.weChatConfig = JSON.parse(JSON.stringify(weChatConfig));
                } else {
                    this.$message.error("获取信息发生错误")
                }
            },
            closeAppSetting() {//关闭设置窗口
                this.$emit("listenCloseSettingDialog")
            },
            submitSaving() {//提交保存
                if (this.oldWeChatConfig.weChatAppId != this.weChatConfig.weChatAppId) {//如果改变了微信appId，则需要多调用一个请求
                    this.$API.updateProjectWeChatConfig(this.weChatConfig).then(res => {
                        if (res.data.error == 0) {
                            this.$message.success("修改成功");
                            this.oldWeChatConfig =JSON.parse(JSON.stringify(this.weChatConfig));
                            this.$store.commit("setWeChatConfig",this.weChatConfig);
                        }
                    })
                }
                if (this.oldAppInfo.appName != this.appInfo.appName || this.oldAppInfo.description != this.appInfo.description) {
                    this.$API.updateProject(this.appInfo).then(res => {
                        if (res.data.error == 0) {
                            this.$message.success("修改成功");
                            this.oldAppInfo =JSON.parse(JSON.stringify(this.appInfo));
                            this.$store.commit("setAppInfo",this.appInfo);
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