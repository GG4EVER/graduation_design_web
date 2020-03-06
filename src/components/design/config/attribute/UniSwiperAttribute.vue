<template>
    <el-col :span="24">
        <el-form>
            <el-form-item label-width="80px">
                <div slot="label" class="design-setting-label egg-not-copy">自动播放</div>
                <el-switch v-model="ComponentAttribute['autoplay']"></el-switch>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy" label-width="100px">显示指示点</div>
                <el-switch v-model="ComponentAttribute['indicator-dots']"></el-switch>
            </el-form-item>
            <el-form-item v-if="ComponentAttribute['indicator-dots']">
                <div slot="label" class="design-setting-label egg-not-copy" label-width="100px">指示点颜色</div>
                <el-color-picker v-model="ComponentAttribute['indicator-active-color']"></el-color-picker>
            </el-form-item>
            <el-form-item>
                <div slot="label" label-width="0px"></div>
                <div class="design--setting-swiper-change egg-not-copy" @click="showEditSwiperDrawer(true)"><i class="el-icon-set-up el-icon--left"></i>更改轮播图</div>
            </el-form-item>
        </el-form>

        <el-drawer class="design-swiper-drawer" :visible.sync="showEditSwiper" direction="rtl" size="40%" @before-close="showEditSwiperDrawer(false)">
            <div class="design-swiper-drawer-title egg-not-copy" slot="title">编辑轮播图</div>
        </el-drawer>

    </el-col>
</template>

<script>
    import {Form,FormItem,Switch,ColorPicker,Button,Drawer} from "element-ui"
    export default {
        name: "UniSwiperAttribute",
        props: {
            ComponentAttribute: {
                type: Object
            },
            ComponentStyle: {
                type: String
            }
        },
        components:{
            [Form.name]:Form,
            [FormItem.name]:FormItem,
            [Switch.name]:Switch,
            [ColorPicker.name]:ColorPicker,
            [Button.name]:Button,
            [Drawer.name]:Drawer
        },
        data(){
            return{
                showEditSwiper:false,
            }
        },
        methods:{
            showEditSwiperDrawer(flag){
                this.showEditSwiper = flag;
            }
        }
    }
</script>

<style scoped>
    .design-setting-title {
        font-size: 17px;
        text-align: center;
        padding: 15px 0px;
        color: #2d93bb;
        font-weight: bold;
    }

    .design-setting-label {
        font-size: 16px;
    }

    .design-setting-star {
        color: indianred;
        font-weight: bold;
    }

    .design--setting-swiper-change{
        transition: 0.4s;
        display: inline-block;
        padding: 0px 30px;
        border-radius: 2px;
        text-align: center;
        font-size: 16px;
        color: #ffffff;
        cursor: pointer;
        background-color: #5ca8cd;
        border: 2px solid #5ca8cd;
    }

    .design--setting-swiper-change:hover{
        transition: 0.4s;
        border-radius: 14px;
        border-color: #3d93bc;
    }

    .design-swiper-drawer-title{
        font-size: 16px;
        font-weight: bold;
        color: #3d93bc;
    }
</style>