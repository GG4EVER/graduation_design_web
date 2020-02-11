<template>
    <el-col :span="24" class="design-materials">
        <el-col :span="22" :offset="1" style="padding-bottom: 10px;text-align: right;">
            <el-button plain round size="mini" @click="uploadMaterials"><i class="el-icon-plus"></i>&nbsp;上传图片
            </el-button>
            <el-upload
                    class="design-materials-uploader"
                    action=""
                    :show-file-list="false"
                    :on-success="materialsUploadSuccess"
                    :before-upload="beforeMaterialsUpload" ref="materialsUploader">
            </el-upload>
        </el-col>
        <template v-if="materials.length != 0">
            <div class="design-materials-box">
                <div v-for="(item,index) in materials" :key="index" class="design-material-item" @click="clickMaterial(index)">
                    <el-image class="design-material-image" :src="item"
                              fit="contain"></el-image>
                    <div class="design-material-item-mark">
                        <div class="design-material-item-operation">
                            <i class="el-icon-delete-solid design-material-item-operation-delete" @click.stop="deleteMaterial(index)"></i>
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
    import {Button, Image,Upload} from "element-ui"

    export default {
        name: "DesignMaterials",
        components: {
            [Button.name]: Button,
            [Image.name]: Image,
            [Upload.name]:Upload
        },
        data() {
            return {
                materials: [],//素材列表
                tempUrls:[
                    "https://dwz.cn/wJ1NhyH1",
                    "https://dwz.cn/x38wMHm7",
                    "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                    "https://dwz.cn/GbEF60Hj"
                ]
            }
        },
        methods: {
            uploadMaterials() {//点击上传图片按钮
                //获得el-upload最外层的元素
                let element = this.$refs.materialsUploader.$el;
                //获得实际的input组件
                let uploader = element.children[0].children[0];
                //模拟点击
                uploader.click();
            },
            beforeMaterialsUpload(file){//上传图片之前
                let type = file.type;
                let size = file.size / 1024;
                if (type !== 'image/jpeg' && type !== 'image/png') {
                    this.$message.error('图片请选择 jpg 或 png 格式');
                    return false;
                }
                if (size > 200) {
                    this.$message.error('图片大小请不要超过 200k ');
                    return false;
                }
                //模拟上传完成图片
                let index = Math.floor(Math.random()*4);//随机生成[0,4)的随机数,floor向下取整
                window.console.log(index)
                this.materials.push(this.tempUrls[index]);
                return false;//取消真实上传
            },
            materialsUploadSuccess(){//图片上传成功回调
                window.console.log("上传成功")
            },
            clickMaterial(){//选择图片
                this.$message.success("选择图片")
            },
            deleteMaterial(){//删除图片
                this.$message.error("删除图片")
            }
        }
    }
</script>

<style scoped>
    .design-materials {
        padding: 14px 0;
    }

    .design-materials-box {
        width: calc(100% - 12px);
        padding: 8px 6px;
        column-count: 2;
        column-gap: 10px;
    }

    .design-materials-uploader{
        display: none;
    }

    .design-material-item {
        position: relative;
        break-inside: avoid;
        box-sizing: border-box;
        padding: 4px 0;
        cursor: pointer;
    }

    .design-material-item:hover  .design-material-item-mark{
        transition: 0.4s;
        background-color: rgba(0,0,0,0.8);
    }

    .design-material-image{
        box-shadow: 0 0 5px #999999;
    }

    .design-material-item-mark{
        transition: 0.4s;
        display: block;
        height: calc(100% - 12px);
        width: 100%;
        z-index: 1;
        position: absolute;
        top: 4px;
        left: 0;
    }

    .design-material-item-operation-delete:hover{
        color: indianred;
    }

    .design-material-item-mark:hover .design-material-item-operation{
        display: flex;
    }

    .design-material-item-operation{
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