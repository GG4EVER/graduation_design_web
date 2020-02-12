<template>
    <!--    数据源-->
    <el-col :span="24" class="design-data-source">
        <el-col v-if="currComponentIndex != -1" :span="20" :offset="2" class="design-no-checked-box egg-not-copy">
            还在开发中...
        </el-col>
        <el-col v-else :span="20" :offset="2" class="design-no-checked-box egg-not-copy">
            当前没有选中任何元素
        </el-col>
    </el-col>
</template>

<script>
    import store from "../../../store"
    export default {
        name: "DesignDataSource",
        store,
        watch:{
            "$store.state.currComponentIndex":function(newVal){
                this.currComponentIndex = newVal;
                if(newVal != -1){//如果选中了组件，则获取对应的属性
                    this.currComponent = store.state.currPageComponents[newVal];
                }
            }
        },
        data(){
            return{
                currComponentIndex:-1,//当前选中组件的索引
                currComponent:{},//当前选中的组件对象
            }
        }
    }
</script>

<style scoped>
    .design-data-source {
        padding: 14px 0;
    }

    .design-no-checked-box {
        text-align: center;
        background-color: rgba(200, 231, 252, 0.5);
        border-radius: 14px;
        padding: 1.5rem 4px;
        color: #5B5B5B;
    }
</style>