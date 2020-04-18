<template>
    <div>
        <div class="egg-uni-form-box" v-if="ComponentChildren && ComponentChildren.length != 0">
            <el-form size="small" class="egg-uni-form-real">
                <template v-for="(children,index) in ComponentChildren">
                    <el-form-item :key="index">
                        <component :is="children.name" :component-attribute="children.attribute"></component>
                    </el-form-item>
                </template>
                <div class="egg-uni-from-button">
                    <el-button v-if="ComponentAttribute.showResetButton" size="small" plain>重置</el-button>
                    <el-button v-if="ComponentAttribute.showSubmitButton" size="small" type="success">确认</el-button>
                </div>
            </el-form>
            <div class="egg-uni-from-mask-real">
            </div>
        </div>
        <div class="egg-uni-form-box" v-else>
            <el-form size="small" class="egg-uni-form">
                <el-form-item>
                    <div slot="label">姓名</div>
                    <br/>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label">性别</div>
                    <br/>
                    <el-radio v-model="radioTemp" label="1">男</el-radio>
                    <el-radio v-model="radioTemp" label="0">女</el-radio>
                </el-form-item>
                <el-form-item>
                    <div slot="label">爱好</div>
                    <br/>
                    <el-checkbox-group v-model="checkBoxTemp">
                        <el-checkbox label="画画"></el-checkbox>
                        <el-checkbox label="游泳"></el-checkbox>
                        <el-checkbox label="篮球"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <div class="egg-uni-from-button">
                    <el-button size="small" plain>重置</el-button>
                    <el-button size="small" type="success">确认</el-button>
                </div>
            </el-form>
            <div class="egg-uni-from-mask">
                <div class="egg-uni-from-mask-icon"><i class="el-icon-s-order"></i></div>
                <div class="egg-uni-from-mask-title">在属性中添加表单组件</div>
            </div>
        </div>
    </div>

</template>

<script>
    import {Form, FormItem, Input, Switch, Radio, Select, Option, CheckboxGroup, Checkbox, Button} from "element-ui"
    import UniInput from "./UniInput";
    import UniTextarea from "./UniTextarea";
    import UniRadio from "./UniRadio";
    import UniCheckbox from "./UniCheckbox";
    export default {
        name: "UniForm",
        components: {
            UniInput,UniTextarea,UniRadio,UniCheckbox,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Switch.name]: Switch,
            [Radio.name]: Radio,
            [Select.name]: Select,
            [Option.name]: Option,
            [CheckboxGroup.name]: CheckboxGroup,
            [Checkbox.name]: Checkbox,
            [Button.name]: Button
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
            ComponentStyle: {//额外的样式
                type: String,
                default: "",
            },
            ComponentAnimation: {//动画效果
                type: String,
                default: "",
            },
            ComponentChildren: {
                type: Array
            }
        },
        data() {
            return {
                radioTemp: "1",
                checkBoxTemp: []
            }
        }
    }
</script>

<style scoped>
    .egg-uni-form-box {
        padding: 10px;
    }

    .egg-uni-from-button {
        display: flex;
        padding-top: 10px;
        justify-content: flex-end;
    }

    .egg-uni-from-mask {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .egg-uni-from-mask-real{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 2;
    }

    .egg-uni-from-mask-icon {
        text-align: center;
        font-size: 36px;
        color: #f0f0f0;
    }

    .egg-uni-from-mask-title {
        color: #f0f0f0;
        font-size: 17px;
        padding-bottom: 15px;
    }
</style>