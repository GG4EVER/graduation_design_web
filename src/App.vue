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
        font-family: "Microsoft YaHei UI Light";
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

    /*滑动块禁止时的颜色(机器验证成功的颜色)*/
    .el-slider__runway.disabled .el-slider__bar{
        background-color: #67C23A !important;
    }

    /*滑动块禁止时按钮的颜色(机器验证成功的颜色)*/
    .el-slider__runway.disabled .el-slider__button {
        border-color: #67C23A !important;
    }
</style>
