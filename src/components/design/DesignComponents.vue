<template>
    <el-collapse accordion>
        <el-collapse-item>
            <template slot="title">
                视图容器
            </template>
            <el-row>
                <el-col :span="8" class="design-component-box">
                    <div class="design-component-item">容器</div>
                </el-col>
                <el-col :span="8" class="design-component-box">
                    <div class="design-component-item">轮播图</div>
                </el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
                基础内容
            </template>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
                表单组件
            </template>
            <el-row>
                <el-col :span="8" class="design-component-box">
                    <div class="design-component-item" data-component-name="uni-button" @click="selectComponent">按钮</div>
                </el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
                媒体组件
            </template>
            <el-row>
                <el-col :span="8" class="design-component-box">
                    <div class="design-component-item" data-component-name="uni-image" @click="selectComponent">图片</div>
                </el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
                地图组件
            </template>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
    import store from "../../store";
    import {Collapse,CollapseItem} from "element-ui"
    export default {
        store,
        name: "DesignComponents",
        components:{
            [Collapse.name]:Collapse,
            [CollapseItem.name]:CollapseItem
        },
        methods:{
            selectComponent(e){
                let newComponent = {
                    name:e.target.dataset.componentName,
                    style:""
                };
                if(e.target.dataset.componentName == "uni-image"){
                    newComponent.ComponentAttribute = {
                        src:"../../assets/logo.png"
                    }
                }
                window.console.log(newComponent);
                store.commit("setPageComponents",newComponent);
            }
        }
    }
</script>

<style scope>
    .design-component-box{
        padding: 5px;
    }

    .design-component-item{
        border: dashed 1px #e0e0e0;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
    }
</style>
