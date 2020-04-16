<template>
    <el-form :model="ComponentAttribute" status-icon>
        <el-col :span="24" class="design-setting-title egg-not-copy"><i class="el-icon-minus el-icon--left"></i>网页组件属性<i
                class="el-icon-minus el-icon--right"></i></el-col>
        <el-form-item>
            <div slot="label" class="design-setting-label egg-not-copy">网页地址</div>
            <el-input type="textarea" clearable resize="none" :autosize="{minRows: 2, maxRows:5}"
                      v-model="ComponentAttribute.src" @change="changeAttribute"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    import {Form, FormItem, Input, Switch} from "element-ui"
    export default {
        name: "UniWebViewAttribute",
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Switch.name]: Switch
        },
        props:{
            ComponentAttribute: {//组件属性
                type: Object
            },
        },
        methods: {
            changeAttribute() {
                this.$emit("listenSaveAttribute");
            }
        }
    }
</script>

<style scoped>

</style>