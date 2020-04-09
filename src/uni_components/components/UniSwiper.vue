<template>
    <div v-if="swiperOptions">
        <swiper :options="swiperOptions" :class="ComponentAnimation" :style="ComponentStyle">
            <template v-if="true || ComponentChildren && ComponentChildren.length != 0">
                <!-- slides -->
                <swiper-slide v-for="(item,index) in list" :key="index" class="egg-swiper-item egg-no-swiper-item"
                              :style="ComponentStyle">
                    <uni-image :component-attribute="{src:item.src,mode:'scaleToFill'}"></uni-image>
                </swiper-slide>
            </template>
            <template v-else>
                <!-- slides -->
                <swiper-slide class="egg-swiper-item egg-no-swiper-item" :style="ComponentStyle">编辑轮播页面</swiper-slide>
            </template>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import UniImage from "./UniImage";

    export default {
        name: "UniSwiper",
        components: {
            UniImage,
            [swiper.name]:swiper,
            [swiperSlide.name]:swiperSlide
        },
        props: {
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        "indicator-dots": true,//是否显示面板指示点
                        "indicator-color": "rgba(0, 0, 0, .3)",//指示点颜色
                        "indicator-active-color": "#000000",//当前选中的指示点颜色
                        autoplay: false,//是否自动切换
                        current: 0,//当前所在滑块的 index
                        interval: 5000,//自动切换时间间隔
                        duration: 500,//滑动动画时长
                        vertical: false,//滑动方向是否为纵向
                        circular: true,//衔接滑动
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
            ComponentChildren: {
                type: Array
            }
        },
        watch: {
            getOptions(newVal) {
                this.swiperOptions = null;
                this.$nextTick(() => {
                    this.swiperOptions = newVal;
                    this.appendStyle(this.ComponentAttribute["indicator-active-color"]);
                })
            }
        },
        computed: {
            getOptions() {
                return {
                    color:this.ComponentAttribute["indicator-active-color"],
                    pagination: {
                        el: '.swiper-pagination',
                        type: this.ComponentAttribute["indicator-dots"] ? "bullets" : "custom",
                        progressbarOpposite: true, //使进度条分页器与Swiper的direction参数相反
                        dynamicBullets: false,  //动态分页器，当你的slide很多时，开启后，分页器小点的数量会部分隐藏。
                        hideOnClick: false, //点击Swiper会隐藏/显示分页器。
                        clickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换
                    },
                    autoplay: this.ComponentAttribute["autoplay"] ? {
                        delay: this.ComponentAttribute["interval"], //自动切换的时间间隔，单位ms
                        stopOnLastSlide: false, //当切换到最后一个slide时停止自动切换
                        disableOnInteraction: true, //用户操作swiper之后，是否禁止autoplay。
                        reverseDirection: false, //开启反向自动轮播。
                        waitForTransition: true, //等待过渡完毕。自动切换会在slide过渡完毕后才开始计时。
                    } : false,
                    speed: this.ComponentAttribute["duration"],
                    direction: this.ComponentAttribute["vertical"] ? "vertical" : "horizontal",
                };
            }
        },
        data() {
            return {
                num: 0,
                swiperOptions: {},
                showButton: false,
                showScrollbar: false,
                updateNum: 1,
                list: [
                    {
                        src: "http://5b0988e595225.cdn.sohucs.com/images/20171031/380d6436c518434bb6c29918685589be.jpeg"
                    },
                    {
                        src: "http://dingyue.nosdn.127.net/BwhYrYxowI5Tq5=9N2yzZHRNFRxyunEZMZnwMDMTNeXG51527583248120compressflag.jpg"
                    },
                    {
                        src: "http://img.glzy8.com/upfiles/ceo/201811/1543384737810402.jpg"
                    }
                ]
            }
        }, methods: {
            appendStyle(color) {
                let head = document.head || document.getElementsByTagName('head')[0];
                let style = document.createElement('style');
                style.setAttribute("type","text/css");
                style.innerHTML = '.swiper-pagination-bullet-active{background-color:' + color +  ' !important;}';
                head.appendChild(style);
            }
        },
        created() {
            this.swiperOptions = this.getOptions;
            this.appendStyle(this.ComponentAttribute["indicator-active-color"]);
        }
    }
</script>

<style scoped>
    .egg-swiper-item {
        height: 150px;
    }

    .egg-no-swiper-item {
        font-size: 18px;
        color: #5B5B5B;
        background-color: #f0f0f0;
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: center;
    }

    .egg-swiper-item-image {
        width: 100%;
        height: auto;
    }
</style>