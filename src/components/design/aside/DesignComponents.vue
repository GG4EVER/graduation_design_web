<template>
    <el-collapse accordion class="egg-design-components">
        <el-collapse-item>
            <template slot="title">
                视图容器
            </template>
            <el-row>
                <el-col :span="8" class="design-component-box">
                    <div class="design-component-item egg-not-copy" data-component-name="uni-swiper"
                         @click="selectComponent">轮播图
                    </div>
                </el-col>
                <el-col :span="8" class="design-component-box">
                    <div class="design-component-item egg-not-copy" data-component-name="uni-grid"
                         @click="selectComponent">宫格
                    </div>
                </el-col>
                <el-col :span="8" class="design-component-box">
                    <el-popover
                            trigger="hover"
                            width="80px">
                        <div class="design-component-info-box">
                            <div class="design-component-info-title">注意</div>
                            <div><i class="el-icon-info el-icon--left"></i>该组件会自动占满屏幕，请单独在空白页面使用</div>
                        </div>
                        <div class="design-component-item egg-not-copy" data-component-name="uni-web-view"
                             slot="reference"
                             @click="selectComponent">网页
                        </div>
                    </el-popover>
                </el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
                基础内容
            </template>
            <el-row>
                <el-col :span="8" class="design-component-box">
                    <div class="design-component-item egg-not-copy" data-component-name="uni-text"
                         @click="selectComponent">文本
                    </div>
                </el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
                表单组件
            </template>
            <el-row>
                <el-col :span="8" class="design-component-box">
                    <div class="design-component-item egg-not-copy" data-component-name="uni-button"
                         @click="selectComponent">按钮
                    </div>
                </el-col>
                <el-col :span="8" class="design-component-box">
                    <div class="design-component-item egg-not-copy" data-component-name="uni-form"
                         @click="selectComponent">表单
                    </div>
                </el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
                媒体组件
            </template>
            <el-row>
                <el-col :span="8" class="design-component-box">
                    <div class="design-component-item egg-not-copy" data-component-name="uni-image"
                         @click="selectComponent">图片
                    </div>
                </el-col>
                <el-col :span="8" class="design-component-box">
                    <el-popover
                            placement="top-start"
                            trigger="hover">
                        <div class="design-component-not-use-box">
                            <div class="design-component-not-use-title">不支持在以下中使用</div>
                            <div><i class="el-icon-error el-icon--left"></i>支付宝小程序</div>
                            <div><i class="el-icon-error el-icon--left"></i>字节跳动小程序</div>
                            <div><i class="el-icon-error el-icon--left"></i>QQ小程序</div>
                        </div>
                        <div class="design-component-item egg-not-copy" data-component-name="uni-audio" slot="reference"
                             @click="selectComponent">音频
                        </div>
                    </el-popover>
                </el-col>
                <el-col :span="8" class="design-component-box">
                    <div class="design-component-item egg-not-copy" data-component-name="uni-video"
                         @click="selectComponent">视频
                    </div>
                </el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
                其他组件
            </template>
            <el-row>
                <el-col :span="8" class="design-component-box">
                    <el-popover
                            placement="top-start"
                            trigger="hover">
                        <div class="design-component-not-use-box">
                            <div class="design-component-not-use-title">不支持在以下中使用</div>
                            <div><i class="el-icon-error el-icon--left"></i>字节跳动小程序</div>
                        </div>
                        <div class="design-component-item egg-not-copy" data-component-name="uni-map" slot="reference"
                             @click="selectComponent">地图
                        </div>
                    </el-popover>
                </el-col>
            </el-row>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
    import store from "../../../store";
    import {Collapse, CollapseItem, Popover} from "element-ui"

    export default {
        store,
        name: "DesignComponents",
        components: {
            [Collapse.name]: Collapse,
            [CollapseItem.name]: CollapseItem,
            [Popover.name]: Popover
        },
        methods: {
            /**
             * 选择组件
             * @param e
             */
            selectComponent(e) {
                //如果当前没有页面，则提醒需要先新建页面
                if (store.state.pages.length == 0) {
                    this.$message.info("请先创建一个页面");
                    return;
                }
                //如果当前没有选中任何页面，则提醒需要先选择页面
                if (store.state.currPageIndex == -1) {
                    this.$message.info("请选择一个页面再选组件");
                    return;
                }
                let componentName = e.target.dataset.componentName;
                if(componentName == "uni-web-view"){
                    //如果是网页组件，先判断当前页面有没有别的组件，有组件则不能添加
                    if(this.$store.state.currPageComponents.length != 0){
                        this.$message.error("请在空白页面中使用网页组件");
                        return;
                    }
                }
                let newComponent = JSON.parse(JSON.stringify(this.$ComponentConfig[componentName]))
                window.console.log(newComponent);
                store.commit("addComponent", newComponent);
            }
        }
    }
</script>

<style scope>
    .design-component-box {
        padding: 5px;
    }

    .design-component-item {
        transition: 0.3s;
        padding: 8px 0;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        color: #5B5B5B;
        background-color: rgba(172, 219, 245, 0.3);
    }

    .design-component-item:hover {
        transition: 0.3s;
        background-color: rgba(172, 219, 245, 0.8);
        color: #2d93bb;
        font-weight: bold;
        box-shadow: 0 0 8px #cccccc;
    }

    .design-component-info-box {
        color: #7B7B7B;
        font-size: 13px;
    }

    .design-component-info-title {
        color: #5B5B5B;
        font-size: 14px;
        padding-bottom: 5px;;
    }

    .design-component-not-use-title {
        color: #5B5B5B;
        font-size: 14px;
        padding-bottom: 5px;;
    }

    .design-component-not-use-box {
        color: #F56C6C;
        font-size: 13px;
    }
</style>
