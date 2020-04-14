<template>
    <el-form :model="ComponentAttribute" status-icon>
        <el-col :span="24" class="design-setting-title egg-not-copy"><i class="el-icon-minus el-icon--left"></i>文本属性<i class="el-icon-minus el-icon--right"></i></el-col>
        <el-form-item>
            <div slot="label" class="design-setting-label egg-not-copy">文本是否可选</div>
            <el-switch v-model="ComponentAttribute.selectable" @change="changeAttribute"></el-switch>
        </el-form-item>
        <el-form-item>
            <div slot="label" class="design-setting-label egg-not-copy">首行缩进</div>
            <el-switch v-model="isIndent" @change="changeIsIndent"></el-switch>
        </el-form-item>
        <el-form-item>
            <div slot="label" class="design-setting-label egg-not-copy">文本内容</div>
            <el-input  type="textarea" clearable resize="none" :autosize="{minRows: 6, maxRows:8}" v-model="ComponentAttribute.title" @change="changeAttribute"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    import {Form, FormItem, Input,Switch} from "element-ui"
    export default {
        name: "UniTextAttribute",
        props:{
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
            [Switch.name]:Switch
        },
        data(){
            return{
                isIndent:false,
            }
        },
        watch: {
            ComponentStyle: function (newVal) {
                this.initIsIndent(newVal);
            }
        },
        created() {
            this.initIsIndent(this.ComponentStyle);
        },
        methods:{
            initIsIndent(componentStyle) {//初始化,判断是否首行缩进
                let isIndent = false;
                if (componentStyle && componentStyle.indexOf("text-indent") != -1) {
                    isIndent = true;
                }
                this.isIndent = isIndent;
            },
            changeAttribute() {
                this.$emit("listenSaveAttribute");
            },
            changeIsIndent(){//改变了首行缩进
                let style = this.ComponentStyle;
                if(this.isIndent){
                    //首行缩进
                    style += "text-indent:2em;"
                }else{
                    style = style.replace("text-indent:2em;","");
                }
                this.$emit("listenChangeComponentStyle",style);
            },
        }
    }
</script>

<style scoped>
</style>