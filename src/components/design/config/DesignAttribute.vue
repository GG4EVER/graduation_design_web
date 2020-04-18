<template>
    <!--    属性-->
    <el-col :span="24" class="design-attribute">
        <el-col v-if="currComponentIndex != -1" :span="23" :offset="1">
            <el-tabs class="design-attribute-tabs" v-model="showTabIndex">
                <el-tab-pane label="组件属性" name="0">
                    <el-col :span="22" :offset="2">
                        <component :is="attributeComponentName" :component-attribute="currComponent.attribute" :component-style="currComponent.style"  :component-children="currComponent.children"
                                   @listenSaveChildren="saveChildren" @listenSaveAttribute="saveAttribute" @listenChangeComponentStyle="changeComponentStyle" @listenSaveMarkers="saveMarkers"></component>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane  label="基础属性" name="1">
                    <el-col :span="22" :offset="2">
                        <base-attribute :component-attribute="currComponent.style"
                                        @listenChangeComponentStyle="changeComponentStyle"></base-attribute>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="高级属性" name="2">
                    <el-col :span="22" :offset="2">
                        高级属性
                    </el-col>
                </el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col v-else :span="20" :offset="2" class="design-no-checked-box egg-not-copy">
            当前没有选中任何元素
        </el-col>
    </el-col>
</template>

<script>
    import store from "../../../store"
    import BaseAttribute from "./attribute/BaseAttribute";
    import UniButtonAttribute from "./attribute/UniButtonAttribute";
    import UniTextAttribute from "./attribute/UniTextAttribute";
    import UniImageAttribute from "./attribute/UniImageAttribute";
    import UniAudioAttribute from "./attribute/UniAudioAttribute";
    import UniVideoAttribute from "./attribute/UniVideoAttribute";
    import UniSwiperAttribute from "./attribute/UniSwiperAttribute";
    import UniGridAttribute from "./attribute/UniGridAttribute";
    import UniWebViewAttribute from "./attribute/UniWebViewAttribute";
    import UniMapAttribute from "./attribute/UniMapAttribute";
    import {Tabs, TabPane} from "element-ui"

    export default {
        name: "DesignAttribute",
        store,
        components: {
            BaseAttribute,
            UniButtonAttribute,
            UniTextAttribute,
            UniImageAttribute,
            UniAudioAttribute,
            UniVideoAttribute,
            UniSwiperAttribute,
            UniGridAttribute,
            UniWebViewAttribute,
            UniMapAttribute,
            [Tabs.name]: Tabs,
            [TabPane.name]: TabPane
        },
        watch: {
            "$store.state.currComponentIndex": function (newVal) {
                this.currComponentIndex = newVal;
                if (newVal != -1) {//如果选中了组件，则获取对应的属性
                    this.currComponent = store.state.currPageComponents[newVal];
                    this.attributeComponentName = this.$AttributeComponentMap[this.currComponent.name];
                }
                this.showTabIndex = "0";
            }
        },
        data() {
            return {
                showTabIndex: "0",
                currComponentIndex: -1,//当前选中组件的索引
                currComponent: {},//当前选中的组件对象
                attributeComponentName: ""
            }
        },
        methods: {
            /**
             * 保存属性
             * */
            saveAttribute() {
                this.$set(store.state.currPageComponents, store.state.currComponentIndex, this.currComponent);
                this.$store.commit("saveComponentAttribute");
            },

            /**
             * 保存子组件
             * */
            saveChildren(children){
                this.currComponent.children = children;
                this.saveAttribute();
            },

            saveMarkers(markers){
                this.currComponent.attribute.markers = markers;
                this.saveAttribute();
            },

            /**
             * 监听修改组件样式
             * @param style
             */
            changeComponentStyle(style) {
                this.currComponent.style = style;
                this.saveAttribute();
            }
        }
    }
</script>

<style scoped>
    .design-attribute {
        padding-top: 14px;
        padding-bottom: 50px;
    }

    .design-no-checked-box {
        height: 100%;
        text-align: center;
        background-color: rgba(200, 231, 252, 0.5);
        border-radius: 14px;
        padding: 1.5rem 4px;
        color: #5B5B5B;
    }
</style>