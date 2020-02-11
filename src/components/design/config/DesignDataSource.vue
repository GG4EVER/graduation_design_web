<template>
    <!--    数据源-->
    <el-col :span="24" class="design-data-source">
        <el-col :span="20" :offset="2" class="design-no-checked-box egg-not-copy">
            当前没有选中任何元素
        </el-col>
    </el-col>
</template>

<script>
    export default {
        name: "DesignDataSource"
    }
</script>

<style scoped>
    .design-data-source {
        padding: 14px 0;
    }

    .design-no-checked-box {
        text-align: center;
        background-color: rgba(200, 231, 252, 0.5);
        border-radius: 14px;
        padding: 1.5rem 4px;
        color: #5B5B5B;
    }
</style>