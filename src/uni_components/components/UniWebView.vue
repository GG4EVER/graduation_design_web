<template>
    <div :style="'height:' + (height - 4) + 'px;width:' + width + 'px;'" class="egg-uni-web-view-box">
        <iframe v-if="ComponentAttribute.src" class="egg-uni-web-view" :src="ComponentAttribute.src" frameborder="0"
                scrolling="no" ref="webview"></iframe>
        <div v-else class="egg-uni-web-view-no-web">
            <div class="egg-uni-web-view-no-web-icon"><i class="el-icon-error"></i></div>
            <div class="egg-uni-web-view-no-web-title">当前没有设置页面链接</div>
        </div>
        <div class="egg-uni-web-view-mask"></div>
    </div>
</template>

<script>
    export default {
        name: "UniWebView",
        props: {
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        src: "",//网页链接
                    }
                }
            },
            ComponentAnimation: {//动画效果
                type: String,
                default: "",
            },
        },
        watch: {
            "$store.state.screenHeight"(newVal) {
                if (newVal) {
                    this.height = newVal;
                }
            },
            "$store.state.screenWidth"(newVal) {
                if (newVal) {
                    this.width = newVal;
                }
            }
        },
        mounted() {
            window.console.log(this.ComponentAttribute)
        },
        data() {
            return {
                height: 0,
                width: 0
            }
        }
    }
</script>

<style scoped>
    .egg-uni-web-view-box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .egg-uni-web-view {
        height: 100%;
        width: 100%;
    }

    .egg-uni-web-view-mask{
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 666;
    }

    .egg-uni-web-view-no-web {
        font-size: 16px;
        color: #7b7b7b;
        text-align: center;
        position: relative;
    }

    .egg-uni-web-view-no-web-icon {
        font-size: 30px;
        padding: 10px 0;
    }
</style>