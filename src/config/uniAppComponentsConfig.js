//uni app所有组件的默认属性
const Config = {
    "uni-swiper": {
        name: "uni-swiper",
        attribute: {//属性
            "indicator-dots": false,//是否显示面板指示点
            "indicator-color": "rgba(0, 0, 0, .3)",//指示点颜色
            "indicator-active-color": "#000000",//当前选中的指示点颜色
            autoplay: false,//是否自动切换
            current: 0,//当前所在滑块的 index
            interval: 5000,//自动切换时间间隔
            duration: 500,//滑动动画时长
            vertical: false,//滑动方向是否为纵向,
            circular: true,//衔接滑动
        },
        style: "height:150px;width:100%;",//样式
        animation: "",//动画
        children: [],
    },
    "uni-grid": {
        name: "uni-grid",
        attribute: {//属性
            column: 3,//每列显示个数
            showBorder: true,//是否显示边框
            borderColor: "#d0dee5",//边框颜色
            square: true,//是否方形显示
            highlight: true,//是否点击高亮
        },
        style: "",//样式
        animation: "",//动画
        children: [],
    },
    "uni-web-view":{
        name: "uni-web-view",
        attribute: {//属性
            src:"",//网页链接
        },
        style: "",//样式
        animation: "",//动画
    },
    "uni-button": {
        name: "uni-button",
        attribute: {//属性
            size: "default",//按钮的大小
            type: "default",//按钮的样式类型
            title: "点击更改文字",//按钮的标题
            plain: false,//按钮是否镂空，背景色透明
            disabled: false,//是否禁用
            loading: false,//名称前是否带 loading 图标
            hoverClass: "button-hover",//鼠标点击的类
        },
        style: "",//样式
        animation: "",//动画
    },
    "uni-form": {
        name: "uni-form",
        attribute: {//属性
            showSubmitButton:true,//是否显示提交按钮
            showResetButton:false,//是否显示重置按钮
            action:"",//表单提交链接
        },
        style: "padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;",//样式
        animation: "",//动画
        children: [],
    },
    "uni-text":{
        name: "uni-text",
        attribute: {//属性
            selectable:false,//文本是否可选
            title: "文本",//文本默认内容
            space:'nbsp',//空格大小
        },
        style: "font-size:16px;color:#000000;text-align:justify;padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;",//样式
        animation: "",//动画
    },
    "uni-image": {
        name: "uni-image",
        attribute: {//属性
            src: "",//图片资源地址
            mode: "scaleToFill",//图片裁剪、缩放的模式
            lazyLoad: false,//图片懒加载。只针对page与scroll-view下的image有效
        },
        style: "width:100%;",//样式
        animation: "",//动画
    },
    "uni-audio":{
        name:"uni-audio",
        attribute: {//属性
            src: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3",//音频资源地址
            loop: false,//是否循环播放
            controls:true,//是否显示播放控件
            name:"未知音频",//音频名称，controls为true时才能设置
            author:"未知作者",//音频作者，controls为true时才能设置
            poster:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg",//视频封面地址，controls为true时才能设置
        },
        style: "width:100%;",//样式
        animation: "",//动画
    },
    "uni-video":{
        name:"uni-video",
        attribute: {//属性
            src: "",//视频资源地址
            autoplay: false,//是否自动播放
            loop: false,//是否循环播放
            controls:true,//是否显示播放控件
            "show-fullscreen-btn":true,//是否显示全屏按钮
            "show-play-btn":true,//是否显示视频底部控制栏的播放按钮
            poster:"",//视频封面地址，controls为true时才能设置
        },
        style: "width:100%;",//样式
        animation: "",//动画
    },
    "uni-map":{
        name:"uni-map",
        attribute: {//属性
            longitude:"",//中心经度
            latitude:"",//中心纬度
            scale:16,//缩放级别，取值范围为5-18
            markers:[],//标记点
            polyline:[],//路线
            circles:[],//圆
            controls:[]//控件
        },
        style: "width:100%;",//样式
        animation: "",//动画
    }
};

const AttributeComponentMap = {
    "uni-button": "UniButtonAttribute",
    "uni-form":"UniFormAttribute",
    "uni-text": "UniTextAttribute",
    "uni-image": "UniImageAttribute",
    "uni-swiper": "UniSwiperAttribute",
    "uni-grid": "UniGridAttribute",
    "uni-audio": "UniAudioAttribute",
    "uni-video": "UniVideoAttribute",
    "uni-web-view":"UniWebViewAttribute",
    "uni-map":"UniMapAttribute"
};


export default {
    Config,
    AttributeComponentMap
}