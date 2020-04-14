<template>
    <div class="uni-image-box" :class="ComponentAnimation" :style="ComponentStyle">
        <div class="uni-image-no-image-icon"><i class="el-icon-picture"></i></div>
        <div class="uni-image-no-image-info">视频组件实际效果需要在预览功能中查看</div>
    </div>
</template>

<script>
    export default {
        name: "UniVideo",
        props: {
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        src: "",//视频资源地址
                        autoplay: false,//是否自动播放
                        loop: false,//是否循环播放
                        controls: true,//是否显示播放控件
                        "show-fullscreen-btn": true,//是否显示全屏按钮
                        "show-play-btn": true,//是否显示视频底部控制栏的播放按钮
                        poster: "",//视频封面地址，controls为true时才能设置
                    }
                }
            },
            ComponentStyle: {//额外的样式
                type: String,
                default: "",
            },
            ComponentAnimation: {//动画效果
                type: String,
                default: "",
            },
        },
    }
</script>

<style scoped>
    .uni-image-box {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 12rem;
        background-color: #f0f0f0;
    }

    .uni-image-no-image-icon {
        padding: 0 15px;
        font-size: 3.5rem;
        text-align: center;
        color: #7B7B7B;
    }

    .uni-image-no-image-info {
        padding: 0 15px;
        height: 3.5rem;
        font-size: 13px;
        font-weight: bold;
        text-align: center;
        color: #7B7B7B;
    }
</style>