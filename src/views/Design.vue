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
                <el-col :span="12">
                    <el-main>
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
    import DesignAside from "@/components/DesignAside";
    import DesignConfig from "@/components/DesignConfig";
    import DesignMain from "@/components/DesignMain";
    import DesignHeader from "@/components/DesignHeader";

    export default {
        name: "Design",
        components: {
            DesignAside,
            DesignMain,
            DesignConfig,
            DesignHeader,
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