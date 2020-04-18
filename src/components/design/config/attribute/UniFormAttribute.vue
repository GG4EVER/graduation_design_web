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
        <el-dialog :visible.sync="showEditForm" width="70%" top="0vh" :close-on-click-modal="false"
                   :close-on-press-escape="false" @before-close="showEditFormDialog(false)">
            <div class="design-form-dialog-title egg-not-copy" slot="title">编辑表单子组件</div>
            <div class="design-form-dialog-add-button">
                <el-dropdown trigger="click" placement="bottom" @command="showEditChildDialog">
                    <el-button plain round>
                        添加子组件<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="uni-input">输入框</el-dropdown-item>
                        <el-dropdown-item command="uni-textarea">多行输入框</el-dropdown-item>
                        <el-dropdown-item command="uni-radio">单选框</el-dropdown-item>
                        <el-dropdown-item command="uni-checkbox">复选框</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <el-table :data="ComponentChildren" empty-text="暂无子组件">
                <el-table-column label="组件名称">
                    <template slot-scope="scope">
                        {{formComponentName[scope.row.name]}}
                    </template>
                </el-table-column>
                <el-table-column label="字段名">
                    <template slot-scope="scope">
                        {{scope.row.attribute.name}}
                    </template>
                </el-table-column>
                <el-table-column label="标题" min-width="150px">
                    <template slot-scope="scope">
                        {{scope.row.attribute.label}}
                    </template>
                </el-table-column>
                <el-table-column label="输入提示" min-width="150px">
                    <template slot-scope="scope">
                        {{scope.row.attribute.placeholder ? scope.row.attribute.placeholder : "无"}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="280px">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="editChild(scope.$index)" size="small">编辑</el-button>
                        <el-button v-if="scope.$index != ComponentChildren.length -1" type="warning" @click="lowMoveChild(scope.$index)" size="small">下移</el-button>
                        <el-button v-if="scope.$index != 0" type="success" @click="upMoveChild(scope.$index)" size="small">上移</el-button>
                        <el-button type="danger" @click="deleteChild(scope.$index)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <component :is="currEditChildComponent" :is-show="showEditChild" :component-attribute="currEditChild.attribute"
                   @listenClose="closeEditChildDialog" @listenSubmitEdit="submitEditChild"></component>
    </div>
</template>

<script>
    import {
        Form,
        FormItem,
        Switch,
        Input,
        Button,
        Dialog,
        Table,
        TableColumn,
        Dropdown,
        DropdownMenu,
        DropdownItem
    } from "element-ui"
    import UniInputAttribute from "./UniInputAttribute";
    import UniTextareaAttribute from "./UniTextareaAttribute";
    import UniRadioAttribute from "./UniRadioAttribute";
    import UniCheckboxAttribute from "./UniCheckboxAttribute";

    export default {
        name: "UniFormAttribute",
        components: {
            UniInputAttribute, UniTextareaAttribute, UniRadioAttribute, UniCheckboxAttribute,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Switch.name]: Switch,
            [Input.name]: Input,
            [Button.name]: Button,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Dialog.name]: Dialog,
            [Dropdown.name]: Dropdown,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem
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
                formComponentName: {
                    "uni-input": "输入框",
                    "uni-textarea": "多行输入框",
                    "uni-radio": "单选框",
                    "uni-checkbox": "多选框"
                },
                showEditForm: false,//是否显示编辑表单的窗口
                currEditChildComponent: "",//当前正在编辑的组件的窗口
                showEditChild: false,//是否显示编辑子组件的窗口
                currEditIndex: -1,//当前正在编辑的子组件的索引
                currEditChild: {},//当前正在编辑的子组件
            }
        },
        methods: {
            saveAttribute() {
                this.$emit("listenSaveAttribute");
            },
            showEditFormDialog(flag) {//显示更改form组件的窗口
                this.showEditForm = flag;
            },
            editChild(index){
                this.currEditIndex = index;
                this.currEditChild = this.ComponentChildren[index];
                this.currEditChildComponent = this.$AttributeComponentMap[this.currEditChild.name];
                this.showEditChild = true;
            },
            upMoveChild(index){//上移
                let children = this.ComponentChildren;
                let temp = JSON.parse(JSON.stringify(children[index]));
                let temp2 = JSON.parse(JSON.stringify(children[index - 1]));
                this.$set(children, index, temp2);
                this.$set(children, index - 1, temp);
                this.$emit("listenSaveChildren", children);
            },
            lowMoveChild(index){//下移
                let children = this.ComponentChildren;
                let temp = JSON.parse(JSON.stringify(children[index]));
                let temp2 = JSON.parse(JSON.stringify(children[index + 1]));
                this.$set(children, index, temp2);
                this.$set(children, index + 1, temp);
                this.$emit("listenSaveChildren", children);
            },
            deleteChild(index){
                this.$confirm({
                    title:"提示",
                    type:"info",
                    message:"确认要删除吗",
                    showCancelButton:true,
                }).then(()=>{
                    let children = this.ComponentChildren;
                    children = children.slice(0, index).concat(children.slice(index + 1, children.length));
                    this.$emit("listenSaveChildren", children);
                })
            },
            showEditChildDialog(componentName) {
                this.currEditChildComponent = this.$AttributeComponentMap[componentName];
                this.currEditChild = JSON.parse(JSON.stringify(this.$ComponentConfig[componentName]));
                this.showEditChild = true;
            },
            closeEditChildDialog() {//关闭编辑子组件的窗口
                this.currEditIndex = -1;
                this.currEditChildComponent = {};
                this.showEditChild = false;
            },
            submitEditChild(childAttribute) {
                let children = this.ComponentChildren;
                this.currEditChild.attribute = childAttribute;
                if (this.currEditIndex != -1) {
                    this.$set(children, this.currEditIndex, this.currEditChild);
                    this.$emit("listenSaveChildren", children);
                } else {
                    children.push(this.currEditChild);
                    this.$emit("listenSaveChildren", children);
                }
                this.closeEditChildDialog();
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

    .design-form-dialog-add-button {
        text-align: right;
        padding-bottom: 15px;
    }
</style>