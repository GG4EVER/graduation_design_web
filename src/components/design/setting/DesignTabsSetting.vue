<template>
    <!--    底部切换卡配置-->
    <el-col :span="24">
        <el-col class="design-setting-box" :span="14" :offset="5">
            <el-col :span="14" :offset="5" class="design-setting-tip-box">
                <el-col :span="24" class="design-setting-tip-title"><i class="el-icon-info"></i>&nbsp;底部切换卡最少2个，最多5个
                </el-col>
            </el-col>
            <el-col :span="22" :offset="1">
                <el-divider></el-divider>
            </el-col>
            <el-col :span="24">
                <el-form>
                    <el-form-item>
                        <div slot="label" class="design-setting-label egg-not-copy">切换卡默认字体颜色</div>
                        <el-color-picker v-model="tabBarTextColor" @change="changeTabBarTextColor"
                                         :predefine="predefineColors"></el-color-picker>
                    </el-form-item>
                    <el-form-item>
                        <div slot="label" class="design-setting-label egg-not-copy">切换卡选中字体颜色</div>
                        <el-color-picker v-model="tabBarSelectedTextColor" @change="changeTabBarSelectedTextColor"
                                         :predefine="predefineColors"></el-color-picker>
                    </el-form-item>
                    <el-form-item>
                        <div slot="label" class="design-setting-label egg-not-copy">切换卡背景颜色</div>
                        <el-color-picker v-model="tabBarBackgroundColor" @change="changeTabBarBackgroundColor"
                                         :predefine="predefineColors"></el-color-picker>
                    </el-form-item>
                    <el-form-item>
                        <div slot="label" class="design-setting-label egg-not-copy">切换卡上边框的颜色</div>
                        <el-radio-group v-model="tabBarBorderColor" @change="changeTabBarBorderColor">
                            <el-radio-button label="black">黑</el-radio-button>
                            <el-radio-button label="white">白</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="22" :offset="1">
                <el-divider></el-divider>
            </el-col>
            <el-col :span="24">
                <el-table stripe style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="切换卡名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="path"
                            label="指向页面"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="iconPath"
                            label="图标">
                    </el-table-column>
                    <el-table-column
                            prop="iconPath"
                            label="选中时图标">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-col>
        <div class="egg-design-setting-dialog-footer">
            <el-button v-show="showSaveButton" type="success" round :loading="isSaving" @click="submitSaving">保存<i
                    class="el-icon-finished el-icon--right"></i></el-button>
            <el-button v-show="!showSaveButton" type="danger" round @click="closeAppSetting">关闭<i
                    class="el-icon-close el-icon--right"></i></el-button>
        </div>
    </el-col>
</template>

<script>
    import {Button, Divider, Table, TableColumn, Form, FormItem, ColorPicker, RadioGroup, RadioButton} from "element-ui"

    export default {
        name: "DesignTabsSetting",
        components: {
            [Button.name]: Button,
            [Divider.name]: Divider,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [RadioGroup.name]: RadioGroup,
            [RadioButton.name]: RadioButton,
            [ColorPicker.name]: ColorPicker
        },
        data() {
            return {
                tabBarTextColor: "#333333",//切换卡默认字体颜色
                tabBarSelectedTextColor: "#409EFF",//切换卡选中字体颜色
                tabBarBackgroundColor: "#ffffff",//切换卡背景颜色
                tabBarBorderColor: "black",//切换卡上边框的颜色
                predefineColors: ["#ffffff", "#e0e0e0", "#409EFF", "#333333", "#000000"],//预定义颜色
                showSaveButton: false,//是否显示保存按钮
                isSaving: false//是否正在保存
            }
        },
        methods: {
            closeAppSetting() {//关闭设置窗口
                this.$emit("listenCloseSettingDialog")
            },
            showSavingButton(flag = true) {//是否显示保存按钮
                if (flag) {
                    this.showSaveButton = true;
                } else {
                    this.showSaveButton = false;
                }
            },
            changeTabBarTextColor() {//监听切换卡默认字体颜色修改
                this.showSavingButton();
                window.console.log(this.tabBarTextColor)
            },
            changeTabBarSelectedTextColor() {//监听切换卡选中字体颜色修改
                this.showSavingButton();
                window.console.log(this.tabBarSelectedTextColor)
            },
            changeTabBarBackgroundColor() {//监听切换卡背景颜色修改
                this.showSavingButton();
                window.console.log(this.tabBarBackgroundColor)
            },
            changeTabBarBorderColor() {//监听切换卡上边框的颜色修改
                this.showSavingButton();
                window.console.log(this.tabBarBorderColor)
            },
            submitSaving() {//提交保存
                this.isSaving = true;
                setTimeout(() => {
                    this.isSaving = false;
                    this.showSavingButton(false);
                }, 500);
            }
        }
    }
</script>

<style scoped>
    .design-setting-box {
        padding-top: 2rem;
    }

    .design-setting-label {
        font-size: 16px;
    }

    .design-setting-tip-box {
        padding: 1rem;
        background-color: #f0f0f0;
        border-radius: 14px;
        margin-bottom: 1rem;
    }

    .design-setting-tip-title {
        font-size: 16px;
        color: #666666;
        text-align: center;
    }

    .design-setting-tip-info {
        padding: 6px;
        font-size: 14px;
        color: #5B5B5B;
        text-indent: 2em;
    }

    .egg-design-setting-dialog-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 20px 15px;
        text-align: center;
    }
</style>