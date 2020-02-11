<template>
    <div>
        <template v-if="ComponentAttribute.src">
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
    .uni-image {
        width: 100%;
        height: auto;
        display: inline-block;
        overflow: hidden;
        position: relative
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
</style>
