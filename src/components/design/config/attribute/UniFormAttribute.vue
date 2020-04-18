<template>
    <div>
        <el-form>
            <el-form-item label-width="140px">
                <div slot="label" class="design-setting-label egg-not-copy">是否显示确认按钮</div>
                <el-switch v-model="ComponentAttribute.showSubmitButton" @change="saveAttribute"></el-switch>
            </el-form-item>
            <el-form-item v-if="ComponentAttribute.showSubmitButton">
                <div slot="label" class="design-setting-label egg-not-copy">表单提交链接</div>
                <el-input v-model="ComponentAttribute.action" placeholder="请输入后台接收表单的链接"
                          @change="saveAttribute"></el-input>
            </el-form-item>
            <el-form-item label-width="140px">
                <div slot="label" class="design-setting-label egg-not-copy">是否显示重置按钮</div>
                <el-switch v-model="ComponentAttribute.showResetButton" @change="saveAttribute"></el-switch>
            </el-form-item>
            <el-form-item>
                <div slot="label" label-width="0px"></div>
                <div class="design-setting-form-change egg-not-copy" @click="showEditFormDialog(true)"><i
                        class="el-icon-set-up el-icon--left"></i>更改表单子组件
                </div>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="showEditForm" width="50%" top="0vh" :close-on-click-modal="false"
                   :close-on-press-escape="false" @before-close="showEditFormDialog(false)">
            <div class="design-form-dialog-title egg-not-copy" slot="title">编辑表单子组件</div>
            <el-table :data="ComponentChildren" empty-text="暂无子组件">
                <el-table-column label="组件名称"></el-table-column>
                <el-table-column label="字段名"></el-table-column>
                <el-table-column label="操作"></el-table-column>
                <el-table-column></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import {Form, FormItem, Switch, Input, Button, Dialog,Table,TableColumn} from "element-ui"

    export default {
        name: "UniFormAttribute",
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Switch.name]: Switch,
            [Input.name]: Input,
            [Button.name]: Button,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Dialog.name]: Dialog
        },
        props: {
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        showSubmitButton: true,//是否显示提交按钮
                        showResetButton: false,//是否显示重置按钮
                        action: "",//表单提交链接
                    }
                }
            },
            ComponentChildren: {
                type: Array
            }
        }, data() {
            return {
                showEditForm: false,
            }
        },
        methods: {
            saveAttribute() {
                this.$emit("listenSaveAttribute");
            },
            showEditFormDialog(flag) {//显示更改form组件的窗口
                this.showEditForm = flag;
            }
        }
    }
</script>

<style scoped>
    .design-setting-form-change {
        transition: 0.4s;
        display: inline-block;
        padding: 0px 30px;
        border-radius: 2px;
        text-align: center;
        font-size: 16px;
        color: #ffffff;
        cursor: pointer;
        background-color: #5ca8cd;
        border: 2px solid #5ca8cd;
    }

    .design-setting-form-change:hover {
        transition: 0.4s;
        border-radius: 14px;
        border-color: #3d93bc;
    }

    .design-form-dialog-title {
        font-size: 16px;
        font-weight: bold;
        color: #3d93bc;
    }
</style>