<template>
    <el-collapse accordion class="egg-design-components">
        <el-collapse-item>
            <template slot="title">
                视图容器
            </template>
            <el-row>
<!--                <el-col :span="8" class="design-component-box">-->
<!--                    <div class="design-component-item egg-not-copy">容器</div>-->
<!--                </el-col>-->
<!--                <el-col :span="8" class="design-component-box">-->
<!--                    <div class="design-component-item egg-not-copy">轮播图</div>-->
<!--                </el-col>-->
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
                    <div class="design-component-item egg-not-copy" data-component-name="uni-button" @click="selectComponent">按钮</div>
                </el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
                媒体组件
            </template>
            <el-row>
                <el-col :span="8" class="design-component-box">
                    <div class="design-component-item egg-not-copy" data-component-name="uni-image" @click="selectComponent">图片</div>
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
    import store from "../../../store";
    import {Collapse,CollapseItem} from "element-ui"
    export default {
        store,
        name: "DesignComponents",
        components:{
            [Collapse.name]:Collapse,
            [CollapseItem.name]:CollapseItem
        },
        methods:{
            /**
             * 选择组件
             * @param e
             */
            selectComponent(e){
                //如果当前没有页面，则提醒需要先新建页面
                if(store.state.pages.length == 0){
                    this.$message.info("请先创建一个页面");
                    return;
                }
                //如果当前没有选中任何页面，则提醒需要先选择页面
                if(store.state.currPageIndex == -1){
                    this.$message.info("请选择一个页面再选组件");
                    return;
                }
                let componentName = e.target.dataset.componentName;
                window.console.log(this.$ComponentConfig);
                window.console.log(componentName)
                let newComponent = JSON.parse(JSON.stringify(this.$ComponentConfig[componentName]))
                window.console.log(newComponent);
                store.commit("addComponent",newComponent);
            }
        }
    }
</script>

<style scope>
    .design-component-box{
        padding: 5px;
    }

    .design-component-item{
        transition: 0.3s;
        padding: 8px 0;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        color: #5B5B5B;
        background-color: rgba(172,219,245,0.3);
    }

    .design-component-item:hover{
        transition: 0.3s;
        background-color: rgba(172,219,245,0.8);
        color: #2d93bb;
        font-weight: bold;
        box-shadow: 0 0 8px #cccccc;
    }
</style>
