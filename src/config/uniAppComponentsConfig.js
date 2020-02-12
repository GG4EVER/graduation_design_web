//uni app所有组件的默认属性
const Config = {
    "uni-button": {
        size: "default",//按钮的大小
        type: "default",//按钮的样式类型
        title: "点击更改文字",//按钮的标题
        plain: false,//按钮是否镂空，背景色透明
        disabled: false,//是否禁用
        loading: false,//名称前是否带 loading 图标
        hoverClass: "button-hover",//鼠标点击的类
    },
    "uni-image": {
        src: "",//图片资源地址
        mode: "scaleToFill",//图片裁剪、缩放的模式
        lazyLoad: false,//图片懒加载。只针对page与scroll-view下的image有效
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