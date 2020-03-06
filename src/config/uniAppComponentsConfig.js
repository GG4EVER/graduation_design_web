//uni app所有组件的默认属性
const Config = {
    "uni-swiper":{
      name:"uni-swiper",
        attribute:{//属性
            "indicator-dots": false,//是否显示面板指示点
            "indicator-color": "rgba(0, 0, 0, .3)",//指示点颜色
            "indicator-active-color": "#000000",//当前选中的指示点颜色
            autoplay: false,//是否自动切换
            current: 0,//当前所在滑块的 index
            interval: 5000,//自动切换时间间隔
            duration: 500,//滑动动画时长
            vertical: false,//滑动方向是否为纵向,
            circular:true,//衔接滑动
        },
        style:"height:150px;width:100%;",//样式
        animation:"",//动画
        children:[],
    },
    "uni-button": {
        name:"uni-button",
        attribute:{//属性
            size: "default",//按钮的大小
            type: "default",//按钮的样式类型
            title: "点击更改文字",//按钮的标题
            plain: false,//按钮是否镂空，背景色透明
            disabled: false,//是否禁用
            loading: false,//名称前是否带 loading 图标
            hoverClass: "button-hover",//鼠标点击的类
        },
        style:"",//样式
        animation:"",//动画
    },
    "uni-image": {
        name:"uni-image",
        attribute:{//属性
            src: "",//图片资源地址
            mode: "scaleToFill",//图片裁剪、缩放的模式
            lazyLoad: false,//图片懒加载。只针对page与scroll-view下的image有效
        },
        style:"width:100%;",//样式
        animation:"",//动画
    }
};

const AttributeComponentMap = {
    "uni-button" : "UniButtonAttribute",
    "uni-image" : "UniImageAttribute",
    "uni-swiper":"UniSwiperAttribute"
};


export default {
    Config,
    AttributeComponentMap
}