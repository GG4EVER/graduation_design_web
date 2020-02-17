<template>
    <!--    动画-->
    <el-col :span="24" class="design-animation">
        <el-col v-if="currComponentIndex != -1" :span="20" :offset="2" class="egg-not-copy">
            <el-col :span="24" class="design-setting-title egg-not-copy"><i class="el-icon-minus el-icon--left"></i>动画属性<i
                    class="el-icon-minus el-icon--right"></i></el-col>
            <el-form label-position="left">
                <el-form-item prop="width" label-width="100px">
                    <div slot="label" class="design-setting-label egg-not-copy">动画类型
                    </div>
                    <el-select v-model="currComponent.animation" @change="saveAttribute">
                        <el-option label="无动画" value="">无动画</el-option>
                        <el-option v-for="item in defaultAnimation" :key="item.class" :label="item.name"
                                   :value="item.class"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form v-if="currComponent.animation" :model="style" status-icon label-position="left">
                <el-form-item prop="width" label-width="100px">
                    <div slot="label" class="design-setting-label egg-not-copy">动画时长
                    </div>
                    <el-input v-model="style['animation-duration']" placeholder="单位为s或者ms" autocomplete="off"
                              @change="changeAttribute"></el-input>
                </el-form-item>
                <el-form-item prop="height" label-width="100px">
                    <div slot="label" class="design-setting-label egg-not-copy">动画次数
                    </div>
                    <el-popover placement="bottom" trigger="hover" content="-1 为永久循环播放"
                                ref="animationPopover"></el-popover>
                    <el-input v-model="style['animation-iteration-count']" placeholder="-1 为永久循环播放" type="number"
                              autocomplete="off" @change="changeAttribute" min="-1"
                              v-popover:animationPopover></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col v-else :span="20" :offset="2" class="design-no-checked-box egg-not-copy">
            当前没有选中任何元素
        </el-col>
    </el-col>
</template>

<script>
    import store from "../../../store"
    import {Form, FormItem, Input, Select, Option, Popover} from "element-ui"

    export default {
        name: "DesignAnimation",
        store,
        watch: {
            "$store.state.currComponentIndex": function (newVal) {
                this.currComponentIndex = newVal;
                if (newVal != -1) {//如果选中了组件，则获取对应的组件
                    this.currComponent = store.state.currPageComponents[newVal];
                    this.initStyle();
                }
            }
        },
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Select.name]: Select,
            [Option.name]: Option,
            [Popover.name]: Popover
        },
        data() {
            return {
                currComponentIndex: -1,//当前选中组件的索引
                currComponent: {},//当前选中的组件对象
                style: {},//样式对象
                defaultAnimation: [
                    {
                        name: "淡入",
                        class: "animated fadeIn"
                    },
                    {
                        name: "呼吸",
                        class: "animated pulse"
                    },
                    {
                        name: "弹跳",
                        class: "animated bounce"
                    },
                    {
                        name: "闪烁",
                        class: "animated flash"
                    },
                    {
                        name: "橡皮筋",
                        class: "animated rubberBand"
                    },
                    {
                        name: "抖动",
                        class: "animated shake"
                    },
                    {
                        name: "摇摆",
                        class: "animated swing"
                    },
                    {
                        name: "波幅",
                        class: "animated tada"
                    },
                    {
                        name: "摇晃",
                        class: "animated wobble"
                    },
                    {
                        name: "果冻",
                        class: "animated jello"
                    },
                    {
                        name: "心跳",
                        class: "animated heartBeat"
                    },
                ]
            }
        },
        methods: {
            /**
             * 初始化组件样式
             * @param componentAttribute
             */
            initStyle() {//初始化样式
                let styleMap = {}
                if (this.currComponent.style) {
                    let styleList = this.currComponent.style.split(";");
                    for (let i = 0; i < styleList.length; i++) {
                        let key = styleList[i].split(":")[0];
                        let value = styleList[i].split(":")[1];
                        styleMap[key] = value;
                    }
                    if (styleMap['animation-iteration-count'] == "infinite") {
                        styleMap['animation-iteration-count'] = -1;
                    }
                }
                this.style = styleMap;
            },
            saveAttribute() {
                store.commit("saveComponentAttribute");
            },
            changeAttribute() {//改变了动画，保存
                let style = JSON.parse(JSON.stringify(this.style));
                window.console.log(style['animation-iteration-count'])
                if (style['animation-iteration-count'] == "-1") {//如果是-1则是永久
                    style['animation-iteration-count'] = "infinite"
                }
                style = JSON.stringify(style);
                style = style.slice(1, style.length - 1);
                style = style.replace(/"/g, "");
                style = style.replace(/,/g, ";");
                this.currComponent.style = style;
                this.$set(store.state.currPageComponents, store.state.currComponentIndex, this.currComponent);
                this.saveAttribute();
            },
        }, created() {
            this.initStyle();
        }
    }
</script>

<style scoped>
    .design-animation {
        padding: 14px 0;
    }

    .design-no-checked-box {
        text-align: center;
        background-color: rgba(200, 231, 252, 0.5);
        border-radius: 14px;
        padding: 1.5rem 4px;
        color: #5B5B5B;
    }

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