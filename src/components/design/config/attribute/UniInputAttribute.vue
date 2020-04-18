<template>
    <el-dialog :visible.sync="IsShow" top="8vh" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @before-close="closeDialog">
        <div class="design-setting-title" slot="title">编辑输入框</div>
        <el-form>
            <el-form-item>
                <div slot="label" class="design-setting-label"><span class="design-setting-star">*&nbsp;</span>标题</div>
                <el-input v-model="editComponent.label" placeholder="请输入输入框的标题"></el-input>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label">输入提示</div>
                <el-input v-model="editComponent.placeholder" placeholder="请输入输入框的输入提示"></el-input>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label">字段名</div>
                <el-input v-model="editComponent.name" placeholder="请输入后台接收的字段名"></el-input>
            </el-form-item>
        </el-form>
        <div class="design-uni-from-button">
            <el-button type="danger" @click="closeDialog">关闭</el-button>
            <el-button type="success" @click="submitEdit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {Dialog,Form,FormItem,Input,Button} from "element-ui"
    export default {
        name: "UniInputAttribute",
        components:{
            [Dialog.name]:Dialog,
            [Form.name]:Form,
            [FormItem.name]:FormItem,
            [Input.name]:Input,
            [Button.name]:Button
        },
        props:{
            IsShow:{
                type: Boolean
            },
            ComponentAttribute:{
                type:Object
            }
        },
        watch:{
            ComponentAttribute(newVal){
                if(newVal){
                    this.editComponent = JSON.parse(JSON.stringify(newVal));
                }
            }
        },
        created() {
            this.editComponent = JSON.parse(JSON.stringify(this.ComponentAttribute));
        },
        data(){
            return{
                editComponent:{
                    name:"",//字段名
                    label:"",//标题
                    placeholder:"",//输入提示
                }
            }
        },
        methods:{
            closeDialog(){
                this.$emit("listenClose");
            },
            submitEdit(){
                if(!this.editComponent.label){
                    this.$message.error("标题不能为空");
                    return;
                }
                let pattern = /[a-zA-Z]/;
                if(this.editComponent.name){//如果填了字段名
                    if(!pattern.test(this.editComponent.name)){
                        this.$message.error("字段名必须使用英文");
                        return;
                    }
                }
                this.$emit("listenSubmitEdit",this.editComponent);
            }
        }
    }
</script>

<style scoped>

</style>