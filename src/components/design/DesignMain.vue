<template>
    <el-row class="design-show-box">
        <el-col :lg="11" :md="15" :sm="18" :xs="20">
            <div class="design-phone">
                <el-col :span="22" :offset="1" class="design-phone-header">
                    <div class="design-phone-camera"></div>
                    <div class="design-phone-receiver"></div>
                </el-col>
                <el-col :span="22">
                    <div class="design-phone-screen" :class="currPageComponents.length != 0 ? 'design-phone-screen-has' : ''">
                        <template v-if="currPageComponents.length != 0">
                            <component v-for="(component,index) in currPageComponents" :key="index" :is="component.name" :component-attribute="component.attribute" :component-style="component.style"></component>
                        </template>

                    </div>
                </el-col>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import UniButton from "../../uni_components/components/UniButton";
    import store from "../../store";
    import UniImage from "../../uni_components/components/UniImage";
    export default {
        store,
        name: "DesignMain",
        components:{
            UniButton,UniImage
        },
        data(){
            return{
                currPageComponents:[],//当前页面的组件
            }
        },
        computed: {
            /**
             * 计算当前页面组件的数组
             * @returns {*}
             */
            listenPageComponents() {
                return this.$store.state.pageComponents[this.$store.state.currPageId];
            }
        },
        watch:{
            /**
             * 监听页面组件数组的变化
             * @param newValue
             */
            listenPageComponents:function(newValue){
                window.console.log(this.$store.state.pageComponents);
                this.currPageComponents = newValue;
            }
        }
    }
</script>

<style scoped>
    .design-show-box {
        display: flex;
        justify-content: center;
    }

    .design-phone {
        width: 100%;
        height: 0;
        padding-top: 20px;
        padding-bottom: 175%;
        box-shadow: 0 0 10px #e0e0e0;
        border-radius: 20px;
        position: relative;
        border: solid 1px #dfdfdf;
    }

    .design-phone-header {
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        margin-bottom: 6px;
    }

    .design-phone-camera {
        width: 14px;
        height: 14px;
        margin: 0 3px;
        border-radius: 50px;
        background-color: #e5e5e5;
    }

    .design-phone-receiver {
        height: 8px;
        width: 64px;
        margin: 0 3px;
        border-radius: 50px;
        background-color: #e5e5e5;
    }

    .design-phone-screen {
        position:absolute;
        top: 40px;
        bottom: 25px;
        right: 0;
        left: 0;
        overflow-x: hidden;
        overflow-y: scroll;
        border-top:solid 1px #cdcdcd;
        border-bottom:solid 1px #cdcdcd;
        background-color: #fbfbfb;
    }

    .design-phone-screen-has{
        background-color: #ffffff;
    }

    .design-phone-screen::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.3);
        border-radius: 5px;
        background-color: rgba(255,255,255,0.8);
    }

    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    .design-phone-screen::-webkit-scrollbar
    {
        width: 0;/*0隐藏滚动条*/
        background-color: rgba(255,255,255,0);
    }

    /*定义滑块 内阴影+圆角*/
    .design-phone-screen::-webkit-scrollbar-thumb
    {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.3);
        background-color: #f0f0f0;
    }
</style>
