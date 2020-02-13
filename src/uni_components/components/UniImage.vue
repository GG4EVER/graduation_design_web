<template>
    <div class="uni-image-box" :style="ComponentStyle">
        <template v-if="ComponentAttribute.src">
            <div class="uni-image-real" :class="ComponentAttribute.mode" :style="'background-image: url(' + ComponentAttribute.src + ');'"></div>
            <img class="uni-image" :src="ComponentAttribute.src" :mode="ComponentAttribute.mode"/>
        </template>
        <template v-else>
            <div class="uni-image-no-image">
                <div class="uni-image-no-image-icon"><i class="el-icon-picture"></i></div>
                <div class="uni-image-no-image-info">点击组件，在右侧“属性”中添加图片路径吧</div>
            </div>
        </template>
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
                        src:"",//图片资源地址
                        mode:"scaleToFill",//图片裁剪、缩放的模式
                        lazyLoad:false,//图片懒加载。只针对page与scroll-view下的image有效
                    }
                }
            },
            ComponentStyle: {//额外的样式
                type: String,
                default: "",
            }
        }
    }
</script>

<style scoped>
    .uni-image-box{
        position: relative;
        display: inline-block;
        width: 100%;
        height: 12rem;
    }

    .uni-image-real{
        height: 100%;
        width: 100%;
    }

    .uni-image {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }

    .uni-image-no-image{
        height: 12rem;
        background-color: #f0f0f0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .uni-image-no-image-icon{
        padding: 0 15px;
        font-size: 3.5rem;
        text-align: center;
        color: #7B7B7B;
    }

    .uni-image-no-image-info{
        padding: 0 15px;
        height: 3.5rem;
        font-size: 13px;
        font-weight: bold;
        text-align: center;
        color: #7B7B7B;
    }

    .scaleToFill{
        background-position: 0% 0%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .aspectFit{
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .aspectFill{
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .widthFix{
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .center{
        background-size: auto;
        background-repeat: no-repeat;
        background-position: center center;
    }
</style>
