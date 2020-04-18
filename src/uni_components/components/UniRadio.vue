<template>
    <div>
        <div slot="label">{{ComponentAttribute.label}}</div>
        <el-radio v-for="(option,index) in ComponentAttribute.options" :key="index" :label="option" v-model="radioTemp">{{option}}</el-radio>
    </div>
</template>

<script>
    import {Radio} from "element-ui";

    export default {
        name: "UniRadio",
        components: {
            [Radio.name]: Radio,
        },
        props: {
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        name: "",//字段名
                        label: "",//标题
                        options: "",//选项
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
        data(){
            return{
                radioTemp:"",
            }
        }
    }
</script>

<style scoped>

</style>