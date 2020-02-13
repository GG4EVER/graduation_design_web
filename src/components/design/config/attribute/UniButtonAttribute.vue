<template>
    <!--    修改按钮的属性-->
    <el-form :rules="rules" :model="ComponentAttribute" status-icon>
        <el-form-item prop="title">
            <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*&nbsp;</span>按钮文本内容
            </div>
            <el-input v-model="ComponentAttribute.title" placeholder="请输入按钮文本内容" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <div slot="label" class="design-setting-label egg-not-copy">镂空</div>
            <el-switch
                    v-model="ComponentAttribute.plain"
                    active-color="#13ce66"
                    inactive-color="#cccccc" :disabled="!ComponentAttribute.type">
            </el-switch>
        </el-form-item>
        <el-form-item>
            <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*&nbsp;</span>按钮类型</div>
            <el-radio-group class="attribute-radio-group" v-model="ComponentAttribute.type" @change="changeButtonType">
                <el-radio label="default" border>默认</el-radio>
                <el-radio label="primary" border>主要</el-radio>
                <el-radio label="warn" border>警告</el-radio>
                <el-radio label="" border>自定义</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-button type="success" @click="saveAttribute">保存</el-button>
    </el-form>
</template>

<script>
    import {Form, FormItem, Input, Button, Switch,RadioGroup,Radio} from "element-ui"
    export default {
        name: "UniButtonAttribute",
        props: {
            ComponentAttribute: {
                type: Object
            },
            ComponentStyle: {
                type: String
            }
        },
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Button.name]: Button,
            [Switch.name]: Switch,
            [RadioGroup.name]:RadioGroup,
            [Radio.name]:Radio
        },
        data() {
            let checkButtonTitle = (rule, value, callback) => {
                window.console.log(value);
                window.console.log(this.ComponentAttribute);
                if (!value) {
                    callback(new Error('文本内容不能为空'));
                }else{
                    callback();
                }
            };
            return {
                rules: {
                    title: [
                        { validator : checkButtonTitle, trigger : 'blur'},
                        { validator : checkButtonTitle, trigger : 'change'}
                    ]
                }
            }
        },
        methods: {
            //监听更换按钮类型
            //如果选择自定义，则将镂空设为false和禁用
            changeButtonType(){
                if(this.ComponentAttribute.type == ""){//选择自定义
                    this.ComponentAttribute.plain = false
                }
            },
            //保存属性
            saveAttribute(){
                this.$emit("listenSaveAttribute");
            },
        }
    }
</script>

<style scoped>
    .design-setting-label {
        font-size: 16px;
    }

    .design-setting-star {
        color: indianred;
        font-weight: bold;
    }
</style>