<template>
    <el-tabs type="border-card" class="design-aside design-aside-config" @tab-click="asideTabClick">
        <el-tab-pane>
            <span slot="label">
                <i class="el-icon-setting el-icon--left"></i>属性
            </span>
            <design-attribute></design-attribute>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label">
                <i class="el-icon-star-off el-icon--left"></i>动画
            </span>
            <design-animation></design-animation>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label">
                <i class="el-icon-odometer el-icon--left"></i>数据源
            </span>
            <design-data-source></design-data-source>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import {Tabs,TabPane} from 'element-ui';
    import DesignAttribute from "./config/DesignAttribute";
    import DesignAnimation from "./config/DesignAnimation";
    import DesignDataSource from "./config/DesignDataSource";
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
