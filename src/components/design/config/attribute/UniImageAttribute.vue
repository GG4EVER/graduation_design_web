<template>
    <!--    修改图片的属性-->
    <el-form :rules="rules" :model="ComponentAttribute" status-icon>
        <el-form-item prop="src">
            <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*&nbsp;</span>图片路径
            </div>
            <el-input v-model="ComponentAttribute.src" placeholder="请输入图片路径" clearable autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    import {Form, FormItem, Input, Button, Switch,RadioGroup,Radio} from "element-ui"
    export default {
        name: "UniImageAttribute",
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
            let checkImageSrc = (rule, value, callback) => {
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
                    src: [
                        { validator : checkImageSrc, trigger : 'blur'},
                        { validator : checkImageSrc, trigger : 'change'}
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

</style>