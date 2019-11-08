<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                //组件列表
                componentList: [],
            }
        },
        methods: {

        },
    }
</script>

<style>
    body{
        margin: 0;
        padding: 0;
    }

    button {
        border: none;
        outline: none;
        cursor: pointer;
    }

    .el-row{
        width: 100%;
    }

    .el-tabs--border-card>.el-tabs__content{
        padding: 0 10px 0 0 !important;
    }
</style>
