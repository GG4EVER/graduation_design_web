<template>
    <!--    基础属性-->
    <el-col :span="24">
        <el-col :span="24" class="design-setting-title egg-not-copy"><i class="el-icon-minus el-icon--left"></i>基础属性<i class="el-icon-minus el-icon--right"></i></el-col>
        <el-col>ComponentAttribute : {{ComponentAttribute}}</el-col>
        <el-col>style: {{style}}</el-col>
    </el-col>
</template>

<script>
    import store from "../../../../store"
    export default {
        name: "BaseAttribute",
        store,
        props: {
            ComponentAttribute: {
                type: String
            },
        },
        data(){
            return{
                style:{}//样式列表
            }
        },
        watch:{
            ComponentAttribute:function(newVal){
                window.console.log("切换了")
                window.console.log(this.ComponentAttribute)
                let styleMap = {}
                if(newVal) {//如果选中了组件
                    if (this.ComponentAttribute) {
                        let styleList = this.ComponentAttribute.split(";");
                        for (let i = 0; i < styleList.length; i++) {
                            let key = styleList[i].split(":")[0];
                            let value = styleList[i].split(":")[1];
                            styleMap[key] = value;
                        }
                        this.style = styleMap;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .design-setting-title{
        font-size: 17px;
        text-align: center;
        padding: 5px 0;
        color: #2d93bb;
        font-weight: bold;
    }
</style>