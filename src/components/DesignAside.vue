<template>
    <el-tabs tab-position="left" type="border-card" class="design-aside" @tab-click="asideTabClick">
        <el-tab-pane>
            <span slot="label">页面</span>
            <design-pages></design-pages>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label">素材</span>
            <design-materials></design-materials>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label">模板</span>
            <design-components></design-components>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label">配置</span>
            <design-setting></design-setting>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import {Tabs,TabPane} from 'element-ui';
    import DesignPages from "@/components/DesignPages";
    import DesignMaterials from "@/components/DesignMaterials";
    import DesignComponents from "@/components/DesignComponents";
    import DesignSetting from "@/components/DesignSetting";
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