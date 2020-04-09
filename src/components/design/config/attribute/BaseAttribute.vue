<template>
    <!--    基础属性（修改样式）-->
    <el-col :span="24">
        <el-form :model="style" status-icon label-position="left">
            <el-col :span="24" class="design-setting-title egg-not-copy"><i class="el-icon-minus el-icon--left"></i>基础属性<i
                    class="el-icon-minus el-icon--right"></i></el-col>
            <el-form-item prop="width" label-width="50px">
                <div slot="label" class="design-setting-label egg-not-copy">宽度
                </div>
                <el-input v-model="style.width" placeholder="单位可以为px、%等" clearable autocomplete="off"
                          @change="changeAttribute"></el-input>
            </el-form-item>
            <el-form-item prop="height" label-width="50px">
                <div slot="label" class="design-setting-label egg-not-copy">高度
                </div>
                <el-input v-model="style.height" placeholder="单位可以为px、%等" clearable autocomplete="off" @change="changeAttribute"></el-input>
            </el-form-item>
            <el-form-item prop="background-color" label-width="100px">
                <div slot="label" class="design-setting-label egg-not-copy">背景颜色
                </div>
                <el-color-picker v-model="style['background-color']" @change="changeAttribute"></el-color-picker>
            </el-form-item>
            <el-col :span="24" class="design-setting-title egg-not-copy"><i class="el-icon-minus el-icon--left"></i>字体属性<i
                    class="el-icon-minus el-icon--right"></i></el-col>
            <el-form-item label-width="100px" prop="font-size">
                <div slot="label" class="design-setting-label egg-not-copy">字体大小</div>
                <el-input v-model="style['font-size']" placeholder="单位px" clearable autocomplete="off" @change="changeAttribute"></el-input>
            </el-form-item>
            <el-form-item label-width="80px">
                <div slot="label" class="design-setting-label egg-not-copy">字体颜色</div>
                <el-color-picker v-model="style['color']" @change="changeAttribute"></el-color-picker>
            </el-form-item>
            <el-form-item label-width="80px">
                <div slot="label" class="design-setting-label egg-not-copy">字体位置</div>
                <el-radio-group class="attribute-radio-group" v-model="style['text-align']" @change="changeAttribute">
                    <el-radio label="left" border>靠左</el-radio>
                    <el-radio label="center" border>居中</el-radio>
                    <el-radio label="right" border>靠右</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-col :span="24" class="design-setting-title egg-not-copy"><i class="el-icon-minus el-icon--left"></i>圆角属性<i
                    class="el-icon-minus el-icon--right"></i></el-col>
            <el-form-item label-width="80px">
                <div slot="label" class="design-setting-label egg-not-copy">左上角</div>
                <el-input v-model="style['border-top-left-radius']" placeholder="单位可以为px、%等" clearable
                          autocomplete="off" @change="changeAttribute"></el-input>
            </el-form-item>
            <el-form-item label-width="80px">
                <div slot="label" class="design-setting-label egg-not-copy">右上角</div>
                <el-input v-model="style['border-top-right-radius']" placeholder="单位可以为px、%等" clearable
                          autocomplete="off" @change="changeAttribute"></el-input>
            </el-form-item>
            <el-form-item label-width="80px">
                <div slot="label" class="design-setting-label egg-not-copy">左下角</div>
                <el-input v-model="style['border-bottom-left-radius']" placeholder="单位可以为px、%等" clearable
                          autocomplete="off" @change="changeAttribute"></el-input>
            </el-form-item>
            <el-form-item label-width="80px">
                <div slot="label" class="design-setting-label egg-not-copy">右下角</div>
                <el-input v-model="style['border-bottom-right-radius']" placeholder="单位可以为px、%等" clearable
                          autocomplete="off" @change="changeAttribute"></el-input>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script>
    import {Form, FormItem, Input, Switch, RadioGroup, Radio, ColorPicker} from "element-ui"
    import store from "../../../../store"

    export default {
        name: "BaseAttribute",
        store,
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Switch.name]: Switch,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [ColorPicker.name]: ColorPicker
        },
        props: {
            ComponentAttribute: {
                type: String
            },
        },
        data() {
            return {
                style: {}//样式列表
            }
        },
        watch: {
            ComponentAttribute: function (newVal) {
                this.initStyle(newVal);
            }
        },
        methods: {
            /**
             * 初始化组件样式
             * @param componentAttribute
             */
            initStyle(componentAttribute) {
                let styleMap = {}
                if (componentAttribute) {
                    let styleList = componentAttribute.split(";");
                    for (let i = 0; i < styleList.length; i++) {
                        let key = styleList[i].split(":")[0];
                        let value = styleList[i].split(":")[1];
                        styleMap[key] = value;
                    }
                }
                this.style = styleMap;
            },
            changeAttribute() {
                let style = JSON.stringify(this.style);
                style = style.slice(1,style.length - 1);
                style = style.replace(/"/g,"");
                style = style.replace(/,/g,";");
                this.$emit("listenChangeComponentStyle",style);
            },
        },
        created() {
            this.initStyle(this.ComponentAttribute);
        }
    }
</script>

<style scoped>
    .design-setting-title {
        font-size: 17px;
        text-align: center;
        padding: 15px 0px;
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