<template>
    <el-dialog :visible.sync="IsShow" top="8vh" :close-on-click-modal="false" :close-on-press-escape="false"
               :show-close="false" @before-close="closeDialog">
        <div class="design-setting-title" slot="title">编辑复选框</div>
        <el-form>
            <el-form-item>
                <div slot="label" class="design-setting-label"><span class="design-setting-star">*&nbsp;</span>标题</div>
                <el-input v-model="editComponent.label" placeholder="请输入单选框的标题"></el-input>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label">选项</div>
                <template v-for="(option,index) in editComponent.options">
                    <el-input :value="option" :key="index" disabled>
                        <div slot="append">
                            <el-button icon="el-icon-delete" type="delete" @click="deleteOption(index)">删除</el-button>
                        </div>
                    </el-input>
                </template>
                <el-input v-model="currEditOption" placeholder="添加一个选项">
                    <div slot="append">
                        <el-button icon="el-icon-plus" type="success" @click="addOption">添加</el-button>
                    </div>
                </el-input>
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
    import {Dialog, Form, FormItem, Input, Button} from "element-ui"

    export default {
        name: "UniCheckboxAttribute",
        components: {
            [Dialog.name]: Dialog,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Button.name]: Button
        },
        props: {
            IsShow: {
                type: Boolean
            },
            ComponentAttribute: {
                type: Object
            }
        },
        watch: {
            ComponentAttribute(newVal) {
                if (newVal) {
                    this.editComponent = JSON.parse(JSON.stringify(newVal));
                }
            }
        },
        created() {
            this.editComponent = JSON.parse(JSON.stringify(this.ComponentAttribute));
        },
        data() {
            return {
                editComponent: {
                    name: "",//字段名
                    label: "",//标题
                    options: "",//选项
                },
                currEditOption: "",
            }
        },
        methods: {
            addOption() {//添加一个选项
                if (this.currEditOption) {
                    this.editComponent.options.push(this.currEditOption);
                    this.currEditOption = "";
                } else {
                    this.$message.error("选项值不能为空");
                }
            },
            deleteOption(index) {
                this.editComponent.options = this.editComponent.options.slice(0, index).concat(this.editComponent.options.slice(index + 1, this.editComponent.options.length));
            },
            closeDialog() {
                this.$emit("listenClose");
            },
            submitEdit() {
                if (!this.editComponent.label) {
                    this.$message.error("标题不能为空");
                    return;
                }
                if (this.editComponent.options.length == 0) {
                    this.$message.error("选项不能为空");
                    return;
                }
                let pattern = /[a-zA-Z]/;
                if (this.editComponent.name) {//如果填了字段名
                    if (!pattern.test(this.editComponent.name)) {
                        this.$message.error("字段名必须使用英文");
                        return;
                    }
                }
                this.$emit("listenSubmitEdit", this.editComponent);
            }
        }
    }
</script>

<style scoped>

</style>