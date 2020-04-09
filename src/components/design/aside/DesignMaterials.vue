<template>
    <el-col :span="24" class="design-materials">
        <el-col :span="22" :offset="1" style="padding-bottom: 10px;text-align: right;">
            <el-button plain round size="mini" @click="uploadMaterials"><i class="el-icon-plus"></i>&nbsp;上传图片
            </el-button>
            <el-upload
                    class="design-materials-uploader"
                    action=""
                    :show-file-list="false"
                    :before-upload="beforeMaterialsUpload" ref="materialsUploader">
            </el-upload>
        </el-col>
        <template v-if="materials.length != 0">
            <div class="design-materials-scroll-box">
                <div class="design-materials-box">
                    <div v-for="(item,index) in materials" :key="index" class="design-material-item"
                         @click="clickMaterial(index)">
                        <el-image class="design-material-image" :src="baseURL + item"
                                  fit="contain"></el-image>
                        <div class="design-material-item-mark">
                            <div class="design-material-item-operation">
                                <i class="el-icon-delete-solid design-material-item-operation-delete"
                                   @click.stop="deleteMaterial(index)"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <el-col :span="24" class="design-no-materials-box egg-not-copy">
                素材库空空如也 (┬＿┬)
            </el-col>
        </template>
    </el-col>
</template>

<script>
    import {Button, Image, Upload} from "element-ui"
    import store from "../../../store";

    export default {
        name: "DesignMaterials",
        components: {
            [Button.name]: Button,
            [Image.name]: Image,
            [Upload.name]: Upload
        },
        data() {
            return {
                materials: [],//素材列表
                baseURL: process.env.VUE_APP_API_URL,
            }
        },
        created() {
            this.initMaterials();
        },
        methods: {
            initMaterials(){
              let materials = this.$store.state.materials;
              if(materials == null){
                this.$API.getMaterials().then(res => {
                    if(res.data.error == 0){
                        this.materials = res.data.materials;
                        this.$store.commit("setMaterials",this.materials);
                    }else{
                        this.materials = [];
                    }
                })
              }else{
                  this.materials = materials;
              }
            },
            uploadMaterials() {//点击上传图片按钮
                //获得el-upload最外层的元素
                let element = this.$refs.materialsUploader.$el;
                //获得实际的input组件
                let uploader = element.children[0].children[0];
                //模拟点击
                uploader.click();
            },
            beforeMaterialsUpload(file) {//上传图片之前
                let type = file.type;
                let size = file.size / 1024;
                if (type !== 'image/jpeg' && type !== 'image/png') {
                    this.$message.error('图片请选择 jpg 或 png 格式');
                    return false;
                }
                if (size > 300) {
                    this.$message.error('图片大小请不要超过 300k ');
                    return false;
                }
                let loading = this.$loading.service();
                //上传图片
                let param = new FormData(); //创建form对象
                let userId = this.$store.state.userInfo.userId;
                param.append('file', file, file.name);
                param.append('userId', userId);
                this.$API.uploadImage(param).then(res => {
                    let data = res.data;
                    if (data.error == 0) {//上传成功
                        this.materials.push(data.url);
                        this.$store.commit("setMaterials",this.materials);
                        this.$message.success("上传成功")
                    } else {
                        this.$message.error(data.error_message);
                    }
                    loading.close();
                }).catch(()=>{
                    loading.close();
                    this.$message.error("发生意外错误");
                });
                return false;//取消组件的图片上传
            },
            clickMaterial(index) {//选择图片
                //如果当前没有页面，则提醒需要先新建页面
                if(store.state.pages.length == 0){
                    this.$message.info("请先创建一个页面");
                    return;
                }
                //如果当前没有选中任何页面，则提醒需要先选择页面
                if(store.state.currPageIndex == -1){
                    this.$message.info("请选择一个页面");
                    return;
                }
                let imageUrl = this.materials[index];
                let componentName = "uni-image";
                let newComponent = JSON.parse(JSON.stringify(this.$ComponentConfig[componentName]));
                newComponent.attribute.src = process.env.VUE_APP_API_URL +  imageUrl;
                window.console.log(newComponent);
                store.commit("addComponent",newComponent);
            },
            deleteMaterial(index) {//删除图片
                this.$confirm('是否删除该素材?', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton:true,
                    cancelButtonText: '取消',
                }).then(()=>{
                    let loading = this.$loading.service();
                    let materials = this.materials;
                    this.$API.deleteImage(materials[index]).then(res => {
                        if(res.data.error == 0){
                            materials = materials.slice(0, index).concat(materials.slice(index + 1, materials.length));
                            this.materials = materials;
                            this.$store.commit("setMaterials",materials);
                            this.$message.success("已删除");
                        }else{
                            this.$message.error(res.data.error_message);
                        }
                        loading.close();
                    }).catch(()=>{
                        loading.close();
                        this.$message.error("发生意外错误");
                    });
                })
            }
        }
    }
</script>

<style scoped>
    .design-materials {
        padding: 14px 0;
    }

    .design-materials-uploader {
        display: none;
    }

    .design-materials-scroll-box {
        width: calc(100% - 8px);
        padding-left: 3px;
        padding-right: 5px;
        height: 84vh;
        overflow-y: scroll;
    }

    .design-materials-box {
        width: 100%;
        column-count: 2;
        column-gap: 10px;
    }

    .design-material-item {
        position: relative;
        break-inside: avoid;
        box-sizing: border-box;
        padding: 4px 0;
        cursor: pointer;
    }

    .design-material-item:hover .design-material-item-mark {
        transition: 0.4s;
        background-color: rgba(0, 0, 0, 0.8);
    }

    .design-material-image {
        box-shadow: 0 0 5px #999999;
    }

    .design-material-item-mark {
        transition: 0.4s;
        display: block;
        height: calc(100% - 12px);
        width: 100%;
        z-index: 1;
        position: absolute;
        top: 4px;
        left: 0;
    }

    .design-material-item-operation-delete:hover {
        color: indianred;
    }

    .design-material-item-mark:hover .design-material-item-operation {
        display: flex;
    }

    .design-material-item-operation {
        display: none;
        height: 100%;
        justify-content: space-around;
        font-size: 22px;
        color: #e0e0e0;
        align-items: center;
    }

    .design-no-materials-box {
        text-align: center;
        padding: 1.5rem 4px;
        color: #5B5B5B;
        background-color: rgba(200, 231, 252, 0.5);
        border-radius: 14px;
    }
</style>