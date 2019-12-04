<template>
    <div>
        <img class="uni-image" :src="ComponentAttribute.src" :mode="ComponentAttribute.mode"/>
    </div>
</template>

<script>
    export default {
        name: "UniImage",
        props: {
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        src:"../../assets/logo.png",//图片资源地址
                        mode:"scaleToFill",//图片裁剪、缩放的模式
                        lazyLoad:false,//图片懒加载。只针对page与scroll-view下的image有效
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
    .uni-image {
        width: 320px;
        height: 240px;
        display: inline-block;
        overflow: hidden;
        position: relative
    }

    .uni-image[hidden] {
        display: none
    }

    .uni-image > div, .uni-image > img {
        width: 100%;
        height: 100%
    }

    .uni-image > img {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0
    }

    .uni-image > .uni-image-will-change {
        will-change: transform
    }
</style>
