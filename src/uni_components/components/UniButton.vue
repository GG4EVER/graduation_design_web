<template>
    <button class="uni-button" :Size="ComponentAttribute.Size" :type="ComponentAttribute.Type"
            :plain="ComponentAttribute.Plain" :disabled="ComponentAttribute.Disabled"
            :loading="ComponentAttribute.Loading"
            :hover-class="ComponentAttribute.HoverClass" :style="ComponentStyle">
        {{ComponentAttribute.Title}}
    </button>
</template>

<script>
    export default {
        name: "UniButton",
        props: {
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        Size: "default",//按钮的大小
                        Type: "primary",//按钮的样式类型
                        Title: "按钮",//按钮的标题
                        Plain: false,//按钮是否镂空，背景色透明
                        Disabled: false,//是否禁用
                        Loading: false,//名称前是否带 loading 图标
                        HoverClass: "button-hover",//鼠标点击的类
                    }
                }
            },
            ComponentStyle: {//额外的样式
                type: String,
                default: "",
            }
        },
    }
</script>

<style scoped>
    .uni-button {
        position: relative;
        display: block;
        margin-left: auto;
        margin-right: auto;
        padding-left: 14px;
        padding-right: 14px;
        box-sizing: border-box;
        font-size: 18px;
        text-align: center;
        text-decoration: none;
        line-height: 2.55555556;
        border-radius: 5px;
        -webkit-tap-highlight-color: transparent;
        overflow: hidden;
        color: #000;
        background-color: #f8f8f8
    }

    .uni-button[hidden] {
        display: none !important
    }

    .uni-button:after {
        content: " ";
        width: 200%;
        height: 200%;
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid rgba(0, 0, 0, .2);
        -webkit-transform: scale(.5);
        transform: scale(.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        box-sizing: border-box;
        border-radius: 10px
    }

    .uni-button[native] {
        padding-left: 0;
        padding-right: 0
    }

    .uni-button[native] .uni-button-cover-view-wrapper {
        border: inherit;
        border-color: inherit;
        border-radius: inherit;
        background-color: inherit
    }

    .uni-button[native] .uni-button-cover-view-inner {
        padding-left: 14px;
        padding-right: 14px
    }

    .uni-button .uni-cover-view {
        line-height: inherit;
        white-space: inherit
    }

    .uni-button[type=default] {
        color: #000;
        background-color: #f8f8f8
    }

    .uni-button[type=primary] {
        color: #fff;
        background-color: #007aff
    }

    .uni-button[type=warn] {
        color: #fff;
        background-color: #e64340
    }

    .uni-button[disabled] {
        color: hsla(0, 0%, 100%, .6)
    }

    .uni-button[disabled]:not([type]), .uni-button[disabled][type=default] {
        color: rgba(0, 0, 0, .3);
        background-color: #f7f7f7
    }

    .uni-button[disabled][type=primary] {
        background-color: rgba(0, 122, 255, .6)
    }

    .uni-button[disabled][type=warn] {
        background-color: #ec8b89
    }

    .uni-button[type=primary][plain] {
        color: #007aff;
        border: 1px solid #007aff;
        background-color: rgba(0, 0, 0, 0)
    }

    .uni-button[type=primary][plain][disabled] {
        color: rgba(0, 0, 0, .2);
        border-color: rgba(0, 0, 0, .2)
    }

    .uni-button[type=primary][plain]:after {
        border-width: 0
    }

    .uni-button[type=default][plain] {
        color: #353535;
        border: 1px solid #353535;
        background-color: rgba(0, 0, 0, 0)
    }

    .uni-button[type=default][plain][disabled] {
        color: rgba(0, 0, 0, .2);
        border-color: rgba(0, 0, 0, .2)
    }

    .uni-button[type=default][plain]:after {
        border-width: 0
    }

    .uni-button[plain] {
        color: #353535;
        border: 1px solid #353535;
        background-color: rgba(0, 0, 0, 0)
    }

    .uni-button[plain][disabled] {
        color: rgba(0, 0, 0, .2);
        border-color: rgba(0, 0, 0, .2)
    }

    .uni-button[plain]:after {
        border-width: 0
    }

    .uni-button[plain][native] .uni-button-cover-view-inner {
        padding: 0
    }

    .uni-button[type=warn][plain] {
        color: #e64340;
        border: 1px solid #e64340;
        background-color: rgba(0, 0, 0, 0)
    }

    .uni-button[type=warn][plain][disabled] {
        color: rgba(0, 0, 0, .2);
        border-color: rgba(0, 0, 0, .2)
    }

    .uni-button[type=warn][plain]:after {
        border-width: 0
    }

    .uni-button[size=mini] {
        display: inline-block;
        line-height: 2.3;
        font-size: 13px;
        padding: 0 1.34em
    }

    .uni-button[size=mini][native] {
        padding: 0
    }

    .uni-button[size=mini][native] .uni-button-cover-view-inner {
        padding: 0 1.34em
    }

    .uni-button[loading]:before {
        content: " ";
        display: inline-block;
        width: 18px;
        height: 18px;
        vertical-align: middle;
        -webkit-animation: uni-loading 1s steps(12) infinite;
        animation: uni-loading 1s steps(12) infinite;
        background-size: 100%
    }

    .uni-button[loading][type=primary] {
        color: hsla(0, 0%, 100%, .6);
        background-color: #0062cc
    }

    .uni-button[loading][type=primary][plain] {
        color: #007aff;
        background-color: rgba(0, 0, 0, 0)
    }

    .uni-button[loading][type=default] {
        color: rgba(0, 0, 0, .6);
        background-color: #dedede
    }

    .uni-button[loading][type=default][plain] {
        color: #353535;
        background-color: rgba(0, 0, 0, 0)
    }

    .uni-button[loading][type=warn] {
        color: hsla(0, 0%, 100%, .6);
        background-color: #ce3c39
    }

    .uni-button[loading][type=warn][plain] {
        color: #e64340;
        background-color: rgba(0, 0, 0, 0)
    }

    .uni-button[loading][native]:before {
        content: none
    }

    .button-hover {
        color: rgba(0, 0, 0, .6);
        background-color: #dedede
    }

    .button-hover[plain] {
        color: rgba(53, 53, 53, .6);
        border-color: rgba(53, 53, 53, .6);
        background-color: rgba(0, 0, 0, 0)
    }

    .button-hover[type=primary] {
        color: hsla(0, 0%, 100%, .6);
        background-color: #0062cc
    }

    .button-hover[type=primary][plain] {
        color: rgba(26, 173, 25, .6);
        border-color: rgba(26, 173, 25, .6);
        background-color: rgba(0, 0, 0, 0)
    }

    .button-hover[type=default] {
        color: rgba(0, 0, 0, .6);
        background-color: #dedede
    }

    .button-hover[type=default][plain] {
        color: rgba(53, 53, 53, .6);
        border-color: rgba(53, 53, 53, .6);
        background-color: rgba(0, 0, 0, 0)
    }

    .button-hover[type=warn] {
        color: hsla(0, 0%, 100%, .6);
        background-color: #ce3c39
    }

    .button-hover[type=warn][plain] {
        color: rgba(230, 67, 64, .6);
        border-color: rgba(230, 67, 64, .6);
        background-color: rgba(0, 0, 0, 0)
    }


    .uni-loading, .uni-button[loading]:before {
        background: rgba(0, 0, 0, 0) url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=") no-repeat
    }

    .uni-loading {
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        -webkit-animation: uni-loading 1s steps(12) infinite;
        animation: uni-loading 1s steps(12) infinite;
        background-size: 100%
    }

    @-webkit-keyframes uni-loading {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg)
        }
        to {
            -webkit-transform: rotate(1turn);
            transform: rotate(1turn)
        }
    }

    @keyframes uni-loading {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg)
        }
        to {
            -webkit-transform: rotate(1turn);
            transform: rotate(1turn)
        }
    }

</style>