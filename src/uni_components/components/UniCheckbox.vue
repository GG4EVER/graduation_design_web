<template>
    <div>
        <div slot="label">{{ComponentAttribute.label}}</div>
        <el-checkbox-group v-model="checkBoxTemp">
            <el-checkbox v-for="(option,index) in ComponentAttribute.options" :key="index" :label="option"></el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
    import {CheckboxGroup,Checkbox} from "element-ui";

    export default {
        name: "UniCheckbox",
        components:{
            [CheckboxGroup.name]:CheckboxGroup,
            [Checkbox.name]:Checkbox
        },
        props:{
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        name:"",//字段名
                        label:"",//标题
                        options:"",//选项
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
        data(){
            return{
                checkBoxTemp:[]
            }
        }
    }
</script>

<style scoped>

</style>