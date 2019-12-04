<template>
    <div>
        <button class="uni-button" :size="ComponentAttribute.size" :type="ComponentAttribute.type"
                :plain="ComponentAttribute.plain" :disabled="ComponentAttribute.disabled"
                :loading="ComponentAttribute.loading"
                :hover-class="ComponentAttribute.hoverClass" :style="ComponentStyle">
            {{ComponentAttribute.title}}
        </button>
    </div>
</template>

<script>
    export default {
        name: "UniButton",
        props: {
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        size: "default",//按钮的大小
                        type: "primary",//按钮的样式类型
                        title: "按钮",//按钮的标题
                        plain: false,//按钮是否镂空，背景色透明
                        disabled: false,//是否禁用
                        loading: false,//名称前是否带 loading 图标
                        hoverClass: "button-hover",//鼠标点击的类
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
        width: 100%;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
        padding: 1px 6px;
        font-size: 18px;
        text-align: center;
        text-decoration: none;
        line-height: 2.5555555;
        -webkit-tap-highlight-color: transparent;
        overflow: hidden;
        color: #000;
        border: 1px solid rgba(0,0,0,.2);
        border-radius: 5px;
        background-color: #f8f8f8;
    }

    .uni-button:active{
        color: rgba(0,0,0,.6);
        background-color: #dedede;
    }

    .uni-button[type=primary]{
        color: #fff;
        background-color: #007aff;
    }

    .uni-button[type=primary]:active{
        color: rgba(255,255,255,.6);
        background-color: #0062cc;
    }

    .uni-button[type=warn] {
        color: #fff;
        background-color: #e64340;
    }

    .uni-button[type=warn]:active{
        color: rgba(255,255,255,.6);
        background-color: #ce3c39;
    }
</style>
