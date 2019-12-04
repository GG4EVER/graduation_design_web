<template>
    <el-tabs type="border-card" class="design-aside" @tab-click="asideTabClick">
        <el-tab-pane>
            <span slot="label">属性</span>
            <design-attribute></design-attribute>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label">动画</span>
            <design-animation></design-animation>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label">数据源</span>
            <design-data-source></design-data-source>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import {Tabs,TabPane} from 'element-ui';
    import DesignAttribute from "@/components/design/DesignAttribute";
    import DesignAnimation from "@/components/design/DesignAnimation";
    import DesignDataSource from "@/components/design/DesignDataSource";
    export default {
        name: "EggConfig",
        components:{
            DesignDataSource,
            DesignAttribute,
            DesignAnimation,
            [Tabs.name]:Tabs,
            [TabPane.name]:TabPane
        },
        data(){
            return{
                tabs:["属性","动画","数据源"],
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
