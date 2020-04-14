<template>
    <!--    修改按钮的属性-->
    <el-form :rules="rules" :model="ComponentAttribute" status-icon>
        <el-col :span="24" class="design-setting-title egg-not-copy"><i class="el-icon-minus el-icon--left"></i>按钮属性<i class="el-icon-minus el-icon--right"></i></el-col>
        <el-form-item prop="title">
            <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*&nbsp;</span>按钮文本内容
            </div>
            <el-input v-model="ComponentAttribute.title" placeholder="请输入按钮文本内容" clearable autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    import {Form, FormItem, Input} from "element-ui"
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
            [Input.name]: Input
        },
        data() {
            let checkButtonTitle = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('文本内容不能为空'));
                }else{
                    this.$emit("saveAttribute");
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
        }
    }
</script>

<style scoped>
</style>