<template>
    <div>
        <div slot="label">{{ComponentAttribute.label}}</div>
        <el-input
                type="textarea"
                autosize
                resize="none"
                :placeholder="ComponentAttribute.placeholder">
        </el-input>
    </div>
</template>

<script>
    import {Input} from "element-ui";

    export default {
        name: "UniTextarea",
        components:{
            [Input.name]:Input
        },
        props:{
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        name:"",//字段名
                        label:"",//标题
                        placeholder:"",//输入提示
                    }
                }
            },
            ComponentStyle: {//额外的样式
                type: String,
                default: "",
            },
            ComponentAnimation:{//动画效果
                type: String,
                default: "",
            },
        },
    }
</script>

<style scoped>

</style>