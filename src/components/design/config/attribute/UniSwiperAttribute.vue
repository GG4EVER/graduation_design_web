<template>
    <el-col :span="24">
        <el-form>
            <el-form-item label-width="80px">
                <div slot="label" class="design-setting-label egg-not-copy">自动播放</div>
                <el-switch v-model="ComponentAttribute['autoplay']"></el-switch>
            </el-form-item>
            <el-form-item v-if="ComponentAttribute['autoplay']">
                <div slot="label" class="design-setting-label egg-not-copy">播放间隔时间</div>
                <el-input v-model="ComponentAttribute['interval']" type="number"
                          :min="1000"
                          :max="15000"
                          placeholder="请输入1000-15000之间的数字"
                          @blur="saveInterval">
                    <template slot="append">毫秒</template>
                </el-input>
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
                <div class="design-setting-swiper-change egg-not-copy" @click="showEditSwiperDrawer(true)"><i
                        class="el-icon-set-up el-icon--left"></i>更改轮播图
                </div>
            </el-form-item>
        </el-form>
        <el-drawer class="design-swiper-drawer" :visible.sync="showEditSwiper" direction="rtl" size="40%"
                   @before-close="showEditSwiperDrawer(false)">
            <div class="design-swiper-drawer-title egg-not-copy" slot="title">编辑轮播图</div>
            <el-col :span="24" class="design-swiper-image-list">
                <el-col :span="20" :offset="2" v-for="(imgUrl,index) in children" :key="index" style="padding: 10px 0;">
                    <div class="design-swiper-image-box">
                        <el-image :src="imgUrl" fit="contain" style="width: 100%;"></el-image>
                        <div class="design-swiper-image-delete-button" @click="deleteChild(index)"><i class="el-icon-delete"></i></div>
                    </div>
                </el-col>
                <div @click="showEditSwiperDialog(true)">
                    <el-col :span="20" :offset="2" class="design-swiper-add-image-box">
                        <i class="el-icon-circle-plus-outline">&nbsp;添加图片</i>
                    </el-col>
                </div>
            </el-col>
        </el-drawer>
        <el-dialog :visible.sync="showEditDialog" width="70%" top="5vh">
            <div slot="title">添加图片</div>
            <el-tabs v-model="activeTab" @tab-click="clickTab">
                <el-tab-pane label="网络图片" name="0">
                    <el-input v-model="imageUrl" placeholder="请输入图片地址">
                        <template slot="prepend">URL</template>
                    </el-input>
                </el-tab-pane>
                <el-tab-pane label="我的素材库" name="1">
                    <div class="design-materials-scroll-box">
                        <div class="design-materials-box">
                            <div v-for="(item,index) in materials" :key="index" class="design-material-item"
                                 @click="clickMaterial(index)">
                                <el-image class="design-material-image" :src="baseURL + item"
                                          fit="contain"></el-image>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" v-if="activeTab == 0">
                <el-button type="info" round @click="submitUrl(false)">取消</el-button>
                <el-button type="primary" round @click="submitUrl(true)">确认</el-button>
            </div>
        </el-dialog>
    </el-col>
</template>

<script>
    import {Form, FormItem, Switch, Input, ColorPicker, Button, Drawer, Dialog, Tabs, TabPane, Image} from "element-ui"

    export default {
        name: "UniSwiperAttribute",
        props: {
            ComponentAttribute: {
                type: Object
            },
            ComponentStyle: {
                type: String
            },
            ComponentChildren: {
                type: Array
            }
        },
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Switch.name]: Switch,
            [Input.name]: Input,
            [ColorPicker.name]: ColorPicker,
            [Button.name]: Button,
            [Drawer.name]: Drawer,
            [Dialog.name]: Dialog,
            [Tabs.name]: Tabs,
            [TabPane.name]: TabPane,
            [Image.name]: Image
        },
        watch:{
            ComponentChildren(){
                this.children = this.ComponentChildren;
            }
        },
        data() {
            return {
                baseURL: process.env.VUE_APP_API_URL,
                showEditSwiper: false,
                showEditDialog: false,
                activeTab: "0",
                children: [],//
                imageUrl: "",//网络图片地址
                materials: [],//素材库
            }
        },
        created() {
            this.children = this.ComponentChildren;
        },
        methods: {
            initMaterials() {
                let materials = this.$store.state.materials;
                if (materials == null) {
                    this.$API.getMaterials().then(res => {
                        if (res.data.error == 0) {
                            this.materials = res.data.materials;
                            this.$store.commit("setMaterials", this.materials);
                        } else {
                            this.materials = [];
                        }
                    })
                } else {
                    this.materials = materials;
                }
            },
            saveInterval() {
                let interval = this.ComponentAttribute["interval"];
                if (interval) {
                    if (interval < 1000) {
                        this.$message.error("速度太快了,请重新设置");
                    } else if (interval > 15000) {
                        this.$message.error("速度太慢了,请重新设置");
                    } else {
                        this.$emit("listenSaveAttribute");
                    }
                } else {
                    this.$message.error("请设置播放间隔时间");
                }
            },
            showEditSwiperDrawer(flag = true) {
                this.showEditSwiper = flag;
            },
            showEditSwiperDialog(flag = true) {
                if(flag){
                    //如果是要打开，先判断数量够不够多
                    if(this.children.length > 5){
                        this.$message.error("轮播图图片不能超过5张");
                        return;
                    }
                }
                this.showEditDialog = flag;
            },
            clickTab() {
                if (this.activeTab == 1) {
                    this.initMaterials();
                }
            },
            submitUrl(flag = true){//提交网络图片
                if(flag){
                    //确认提交
                    let imgUrl = this.imageUrl;
                    if(imgUrl){
                        if(imgUrl.endsWith(".jpg") || imgUrl.endsWith(".png")){
                            this.children.push(imgUrl);
                            this.$emit("listenSaveChildren",this.children);
                        }else{
                            this.$message.error("链接必须以jpg或者png结尾");
                            return;
                        }
                    }else{
                        this.$message.error("链接不能为空");
                        return;
                    }
                }else{
                    //取消
                }
                this.showEditSwiperDialog(false);
            },
            clickMaterial(index) {//选择素材
                this.children.push(this.baseURL + this.materials[index]);
                this.showEditSwiperDialog(false);
                this.$emit("listenSaveChildren",this.children);
            },
            deleteChild(index){//删除素材
                this.$confirm({
                    title:"提示",
                    message:"是否要删除该轮播图?",
                    showCancelButton:true
                }).then(()=>{
                    let children = this.children;
                    children = children.slice(0, index).concat(children.slice(index + 1, children.length));
                    this.children = children;
                    this.$emit("listenSaveChildren",children);
                })
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

    .design-setting-swiper-change {
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

    .design-setting-swiper-change:hover {
        transition: 0.4s;
        border-radius: 14px;
        border-color: #3d93bc;
    }

    .design-swiper-drawer-title {
        font-size: 16px;
        font-weight: bold;
        color: #3d93bc;
    }

    .design-swiper-image-list{
        height: 86vh;
        overflow: scroll;
    }

    .design-swiper-image-box {
        height: 12rem;
        overflow: hidden;
        position: relative;
    }

    .design-swiper-image-delete-button{
        height: 2.5rem;
        width: 2.5rem;
        position: absolute;
        right: 5px;
        top: 5px;
        border-radius: 50px;
        background-color: #000000;
        opacity: 0.6;
        cursor: pointer;
        color: #f0f0f0;
        font-size: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .design-swiper-image-delete-button:hover{
        transition: 0.4s;
        opacity: 1;
    }

    .design-swiper-add-image-box {
        height: 5rem;
        background-color: #f0f0f0;
        border: dashed 4px #64b4e2;
        border-radius: 20px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #3d93bc;
    }

    .design-materials-scroll-box {
        width: calc(100% - 8px);
        padding-left: 3px;
        padding-right: 5px;
        height: 60vh;
        overflow-y: scroll;
    }

    .design-materials-box {
        width: 100%;
        column-count: 5;
        column-gap: 10px;
    }

    .design-material-item {
        position: relative;
        break-inside: avoid;
        box-sizing: border-box;
        padding: 4px 0;
        cursor: pointer;
    }

    .design-material-image {
        box-shadow: 0 0 5px #999999;
    }
</style>