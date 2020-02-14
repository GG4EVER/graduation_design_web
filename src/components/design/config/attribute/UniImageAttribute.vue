<template>
    <!--    修改图片的属性-->
    <el-col :span="24">
        <el-col :span="24" class="design-setting-title egg-not-copy"><i class="el-icon-minus el-icon--left"></i>图片属性<i class="el-icon-minus el-icon--right"></i></el-col>
        <el-form :rules="rules" :model="ComponentAttribute" status-icon>
            <el-form-item prop="src">
                <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*&nbsp;</span>图片路径
                </div>
                <el-input v-model="ComponentAttribute.src" placeholder="请输入图片路径" clearable autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy">懒加载</div>
                <el-switch
                        v-model="ComponentAttribute.lazyLoad"
                        active-color="#13ce66"
                        inactive-color="#cccccc" @change="saveAttribute">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*&nbsp;</span>缩放类型</div>
                <el-radio-group class="attribute-radio-group" v-model="ComponentAttribute.mode" @change="saveAttribute">
                    <el-radio label="scaleToFill" border>默认</el-radio>
                    <el-radio label="aspectFit" border>保持长边</el-radio>
                    <el-radio label="aspectFill" border>保持短边</el-radio>
                    <el-radio label="widthFix" border>保持宽度</el-radio>
                    <el-radio label="center" border>凸显中部</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script>
    import {Form, FormItem, Input, Switch,RadioGroup,Radio} from "element-ui"
    export default {
        name: "UniImageAttribute",
        props: {
            ComponentAttribute: {
                type: Object
            },
        },
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Switch.name]: Switch,
            [RadioGroup.name]:RadioGroup,
            [Radio.name]:Radio
        },
        data() {
            let checkImageSrc = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('图片路径不能为空'));
                }else{
                    this.saveAttribute();
                    callback();
                }
            };
            return {
                rules: {
                    src: [
                        { validator : checkImageSrc, trigger : 'blur'},
                        { validator : checkImageSrc, trigger : 'change'}
                    ]
                },
                style:{}//样式
            }
        },
        methods: {
            saveAttribute(){
                this.$emit("saveAttribute")
            }
        }
    }
</script>

<style scoped>
    .design-setting-title{
        font-size: 17px;
        text-align: center;
        padding: 5px 0;
        color: #2d93bb;
        font-weight: bold;
    }

    .design-setting-label {
        font-size: 16px;
    }

    .design-setting-star {
        color: indianred;
        font-weight: bold;
    }
</style>