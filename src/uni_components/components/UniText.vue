<template>
    <div class="egg-uni-text" :class="ComponentAnimation + ' ' + (ComponentAttribute.selectable ? '' : 'egg-not-copy')"
         :style="ComponentStyle">{{ComponentAttribute.title}}</div>
</template>

<script>
    export default {
        name: "UniText",
        props: {
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        selectable: true,//文本是否可选
                        title: "文本",//按钮的样式类型
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
</style>
