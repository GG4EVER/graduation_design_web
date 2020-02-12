<template>
    <el-container>
        <el-header class="design-header">
            <design-header></design-header>
        </el-header>
        <el-container class="design-main">
            <el-row>
                <el-col :span="6" class="design-aside right-box-shadow">
                    <el-aside width="100%" class="design-aside">
                        <design-aside></design-aside>
                    </el-aside>
                </el-col>
                <el-col :span="12" style="height: 100%;">
                    <el-main style="height: 100%;display: flex;justify-content: center;flex-direction: column;">
                        <design-main></design-main>
                    </el-main>
                </el-col>
                <el-col :span="6" class="design-aside left-box-shadow">
                    <el-aside width="100%" class="design-aside">
                        <design-config>

                        </design-config>
                    </el-aside>
                </el-col>
            </el-row>
        </el-container>
    </el-container>
</template>

<script>
    import DesignAside from "@/components/design/DesignAside";
    import DesignConfig from "@/components/design/DesignConfig";
    import DesignMain from "@/components/design/DesignMain";
    import DesignHeader from "@/components/design/DesignHeader";
    import  store from "../store"

    export default {
        name: "Design",
        store,
        components: {
            DesignAside,
            DesignMain,
            DesignConfig,
            DesignHeader,
        },
        data(){
            return{

            }
        },created() {
            //如果页面列表不为空
            if(store.state.pages.length != 0){
                //如果当前选中页面索引为空，则设置为选中第一个页面
                if(store.state.currPageIndex == -1){
                    store.commit("setCurrPageIndex",0)
                }
            }
            //重新created了，将选中组件索引置为未选中状态
            store.commit("setCurrComponentIndex",-1);
        }
    }
</script>

<style scoped>
    .design-header{
        padding: 0 !important;
    }

    .design-main{
        height: calc(100vh - 60px);
    }

    .design-aside{
        height: 100%;
    }

    .right-box-shadow{
        box-shadow: 2px 0 5px #e0e0e0;
    }

    .left-box-shadow{
        box-shadow: -2px 0 5px #e0e0e0;
    }
</style>
