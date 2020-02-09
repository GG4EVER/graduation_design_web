<template>
    <el-col class="egg-design-setting-box">
        <div @click="openSettingDialog(0)">
            <el-col class="egg-design-setting-item">应用配置<i class="el-icon-arrow-right egg-design-setting-item-icon"></i></el-col>
        </div>
        <div @click="openSettingDialog(1)">
            <el-col class="egg-design-setting-item">顶部导航栏配置<i class="el-icon-arrow-right egg-design-setting-item-icon"></i></el-col>
        </div>
        <div @click="openSettingDialog(2)">
            <el-col class="egg-design-setting-item">底部切换卡配置<i class="el-icon-arrow-right egg-design-setting-item-icon"></i></el-col>
        </div>
        <el-dialog class="egg-design-setting-dialog"  :visible.sync="showSettingDialog" fullscreen>
            <div slot="title" class="egg-design-setting-dialog-title egg-not-copy">{{settingComponentNames[currSettingComponentIndex]}}</div>
            <component :is="settingComponents[currSettingComponentIndex]" @listenCloseSettingDialog="closeSettingDialog"></component>
        </el-dialog>
    </el-col>
</template>

<script>
    import {Button,Dialog} from  "element-ui"
    import DesignAppSetting from "./setting/DesignAppSetting";
    import DesignNavigatorSetting from "./setting/DesignNavigatorSetting";
    import DesignTabsSetting from "./setting/DesignTabsSetting";
    export default {
        name: "DesignSetting",
        components:{
            DesignAppSetting,
            DesignNavigatorSetting,
            DesignTabsSetting,
            [Button.name]:Button,
            [Dialog.name]:Dialog
        },
        data(){
          return{
              showSettingDialog:false,
              settingComponents:["DesignAppSetting","DesignNavigatorSetting","DesignTabsSetting"],
              settingComponentNames:["应用配置","顶部导航栏配置","底部切换卡配置"],
              currSettingComponentIndex:0
          }
        },
        methods:{
            openSettingDialog(index){
                this.showSettingDialog = true;
                this.currSettingComponentIndex = index;
            },
            closeSettingDialog(){
                this.showSettingDialog = false;
            }
        }
    }
</script>

<style scoped>
    .egg-design-setting-box{
        padding-top: 1rem;
    }

    .egg-design-setting-item{
        transition: 0.4s;
        padding: 18px 10px 8px 15px;
        border-bottom: solid #7B7B7B 1px;
        cursor: pointer;
        color: #5A5A5A;
        font-size: 15px;
    }

    .egg-design-setting-item:hover{
        transition: 0.4s;
        color: #6190E8;
    }

    .egg-design-setting-item-icon{
        float: right;
    }

    .egg-design-setting-dialog-title{
        text-align: center;
        font-size: 18px;
    }
</style>