//uni app所有组件的默认属性
const Config = {
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
        style:"",//样式
        animation:"",//动画
    }
};

const AttributeComponentMap = {
    "uni-button" : "UniButtonAttribute",
    "uni-image" : "UniImageAttribute"
};


export default {
    Config,
    AttributeComponentMap
}