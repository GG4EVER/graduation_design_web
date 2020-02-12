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
                        type: "default",//按钮的样式类型
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
                default : "",
            }
        },
    }
</script>

<style scoped>
    .uni-button {
        width: 100%;
        position: relative;
        display: block;
        box-sizing: border-box;
        font-size: 18px;
        text-align: center;
        text-decoration: none;
        line-height: 2.55555556;
        border-radius: 5px;
        -webkit-tap-highlight-color: transparent;
        color: #000;
        background-color: #f8f8f8;
    }

    .uni-button:after {
        content: " ";
        width: 200%;
        height: 200%;
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid rgba(0,0,0,.2);
        -webkit-transform: scale(.5);
        transform: scale(.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        box-sizing: border-box;
        border-radius: 10px;
    }

    .uni-button[type=default]:active{
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

    .uni-button[plain] {
        color: #353535;
        border: 1px solid #353535;
        background-color: rgba(0,0,0,0);
    }

    .uni-button[plain]:active{
        color: rgba(53,53,53,.6);
        border-color: rgba(53,53,53,.6);
        background-color: rgba(0,0,0,0);
    }

    .uni-button[type=primary][plain] {
        color: #007aff;
        border: 1px solid #007aff;
        background-color: rgba(0,0,0,0);
    }

    .uni-button[type=primary][plain]:active {
        color: rgba(0,122,255,.6);
        border: 1px solid rgba(0,122,255,.6);
        background-color: rgba(0,0,0,0);
    }

    .uni-button[type=warn][plain] {
        color: #e64340;
        border: 1px solid #e64340;

    }

    .uni-button[type=warn][plain]:active{
        color: rgba(230,67,64,.6);
        border: 1px solid rgba(230,67,64,.6);
        background-color: rgba(0,0,0,0);
    }
</style>
