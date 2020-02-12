<template>
    <!--    属性-->
    <el-col :span="24" class="design-attribute">
        <el-col v-if="currComponentIndex != -1" :span="20" :offset="2">
            <component :is="attributeComponentName" :component-attribute="currComponent.attribute" @listenSaveAttribute="saveAttribute"></component>
        </el-col>
        <el-col v-else :span="20" :offset="2" class="design-no-checked-box egg-not-copy">
            当前没有选中任何元素
        </el-col>
    </el-col>
</template>

<script>
    import store from "../../../store"
    import UniButtonAttribute from "./attribute/UniButtonAttribute";
    import UniImageAttribute from "./attribute/UniImageAttribute";
    export default {
        name: "DesignAttribute",
        store,
        components:{
            UniButtonAttribute,
            UniImageAttribute
        },
        watch:{
            "$store.state.currComponentIndex":function(newVal){
                this.currComponentIndex = newVal;
                if(newVal != -1){//如果选中了组件，则获取对应的属性
                    this.currComponent = store.state.currPageComponents[newVal];
                    this.attributeComponentName = this.$AttributeComponentMap[this.currComponent.name];
                }
            }
        },
        data(){
            return{
                currComponentIndex:-1,//当前选中组件的索引
                currComponent:{},//当前选中的组件对象
                attributeComponentName:""
            }
        },
        methods:{
            saveAttribute(){
                store.commit("saveComponentAttribute");
            }
        }
    }
</script>

<style scoped>
    .design-attribute {
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