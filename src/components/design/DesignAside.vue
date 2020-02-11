<template>
    <el-tabs tab-position="left" type="border-card" class="design-aside design-aside-tab-pane" @tab-click="asideTabClick">
        <el-tab-pane>
            <span slot="label">
                <i class="el-icon-brush el-icon--left"></i>页面
            </span>
            <design-pages></design-pages>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label">
                <i class="el-icon-picture-outline-round el-icon--left"></i>素材
            </span>
            <design-materials></design-materials>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label">
                <i class="el-icon-magic-stick el-icon--left"></i>模板
            </span>
            <design-components></design-components>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label">
                <i class="el-icon-s-operation el-icon--left"></i>配置
            </span>
            <design-setting></design-setting>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import {Tabs,TabPane} from 'element-ui';
    import DesignPages from "./aside/DesignPages";
    import DesignMaterials from "./aside/DesignMaterials";
    import DesignComponents from "./aside/DesignComponents";
    import DesignSetting from "./aside/DesignSetting";
    export default {
        name: "EggAside",
        components:{
            [Tabs.name]:Tabs,
            [TabPane.name]:TabPane,
            [DesignPages.name]:DesignPages,
            [DesignMaterials.name]:DesignMaterials,
            [DesignComponents.name]:DesignComponents,
            [DesignSetting.name]:DesignSetting,
        },
        data(){
          return{
              tabs:["页面","素材","模板","配置"],
          }
        },
        methods:{
            asideTabClick(e){
                window.console.log(e.index)
            }
        }
    }
</script>

<style scoped>
    .design-aside{
        height: 100%;
        border:none !important;
    }
</style>
