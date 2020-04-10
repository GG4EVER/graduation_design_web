<template>
    <el-col :span="24">
        <el-form>
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy">每行显示个数</div>
            </el-form-item>
            <el-form-item label-width="0px">
                <el-slider
                        v-model="ComponentAttribute['column']"
                        :step="1" :max="6" :min="3" show-stops show-tooltip @change="saveAttribute">
                </el-slider>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy" label-width="100px">是否显示边框</div>
                <el-switch v-model="ComponentAttribute['showBorder']" @change="saveAttribute"></el-switch>
            </el-form-item>
            <el-form-item v-if="ComponentAttribute['showBorder']">
                <div slot="label" class="design-setting-label egg-not-copy" label-width="100px">边框颜色</div>
                <el-color-picker v-model="ComponentAttribute['borderColor']" @change="saveAttribute"></el-color-picker>
            </el-form-item>
            <el-form-item>
                <div slot="label" label-width="0px"></div>
                <div class="design-setting-gird-change egg-not-copy" @click="showEditGirdDrawer(true)">
                    <i class="el-icon-set-up el-icon--left"></i>更改宫格组件
                </div>
            </el-form-item>
        </el-form>
        <el-drawer  :visible.sync="showEditDrawer" direction="rtl" size="40%"
                   @before-close="showEditGirdDrawer(false)">
            <div class="design-grid-drawer-title egg-not-copy" slot="title">编辑宫格组件</div>
            <el-col :span="24" class="design-grid-item-list">
                <el-col :span="20" :offset="2" v-for="(item,index) in children" :key="index" style="padding: 10px 0;">
                    <div>
                        <el-input disabled :value="item.title ? item.title : '无标题'">
                            <template slot="prepend">
                                <img v-if="item.src" class="design-grid-item-icon" :src="item.src"/>
                                <div v-else>无图标</div>
                            </template>
                            <template slot="append">
                                <el-button type="success" @click="editGirdDrawer(index)">编辑</el-button>
                                <el-button type="danger" @click="deleteGirdDrawer(index)">删除</el-button>
                            </template>
                        </el-input>
                    </div>
                </el-col>
                <div @click="showEditGridDialog(true)">
                    <el-col :span="20" :offset="2" class="design-grid-add-image-box">
                        <i class="el-icon-circle-plus-outline">&nbsp;添加宫格</i>
                    </el-col>
                </div>
            </el-col>
        </el-drawer>
        <el-dialog :visible.sync="showEditDialog" width="50%" top="5vh" :close-on-click-modal="false" :close-on-press-escape="false">
            <div slot="title">编辑宫格</div>
            <el-form>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy">宫格图标</div>
                    <img v-if="currGridItem.src" class="egg-grid-item-new-image" :src="currGridItem.src" @click="showEditIconDialog"/>
                    <el-button v-else plain @click="showEditIconDialog">选择图标</el-button>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy">宫格标题</div>
                    <el-input v-model="currGridItem.title" placeholder="请输入宫格标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy">跳转页面</div>
                    <el-select v-model="currGridItem.url" placeholder="请选择活动区域">
                        <template v-for="page in pages">
                            <el-option :label="page.name" :value="page.name" :key="page.name"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="info" round @click="submitEdit(false)">取消</el-button>
                <el-button type="primary" round @click="submitEdit(true)">确认</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="showIconDialog" width="70%" top="5vh">
            <div slot="title">选择图标</div>
            <el-tabs v-model="activeTab" @tab-click="clickTab">
                <el-tab-pane label="内置图标库" name="0">
                    <div class="design-materials-scroll-box" style="column-count: 3;">
                        <div class="design-materials-box">
                            <div v-for="(item,index) in baseMaterials" :key="index" class="design-material-item"
                                 @click="clickBaseMaterial(index)">
                                <el-image :src="baseURL + item"
                                          fit="contain"></el-image>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="我的素材库" name="1">
                    <div class="design-materials-scroll-box">
                        <div class="design-materials-box">
                            <div v-for="(item,index) in userMaterials" :key="index" class="design-material-item"
                                 @click="clickUserMaterial(index)">
                                <el-image class="design-material-image" :src="baseURL + item"
                                          fit="contain"></el-image>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </el-col>
</template>

<script>
    import {
        Form,
        FormItem,
        Switch,
        Input,
        ColorPicker,
        Button,
        Drawer,
        Dialog,
        Tabs,
        TabPane,
        Image,
        Slider,
        Select,
        Option
    } from "element-ui"

    export default {
        name: "UniGridAttribute",
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
            [Image.name]: Image,
            [Slider.name]: Slider,
            [Select.name]:Select,
            [Option.name]:Option
        },
        data() {
            return {
                baseURL: process.env.VUE_APP_API_URL,
                pages:[],//页面列表
                showEditDrawer: false,
                children:[],//子组件
                showEditDialog:false,
                userMaterials:[],//用户素材库
                baseMaterials:[],//基础素材库（内置素材库）
                currEditChildIndex:-1,//当前正在修改的子组件索引
                currGridItem:{
                    src:"",//宫格图标链接
                    title:"",//宫格标题
                    url:"",//宫格跳转链接
                },
                showIconDialog:false,//是否显示显示图标库
                activeTab:"0",
            }
        },
        watch:{
            ComponentChildren(){
                this.children = this.ComponentChildren;
            }
        },
        created() {
            this.children = this.ComponentChildren;
            this.pages = this.$store.state.pages;
        },
        methods: {
            initBaseMaterials(){
                let materials = this.$store.state.baseMaterials;
                if (materials == null) {
                    this.$API.getBaseMaterials().then(res => {
                        if (res.data.error == 0) {
                            this.baseMaterials = res.data.materials;
                            this.$store.commit("setBaseMaterials", this.baseMaterials);
                        } else {
                            this.baseMaterials = [];
                        }
                    })
                } else {
                    this.baseMaterials = materials;
                }
            },
            initUserMaterials() {
                let materials = this.$store.state.materials;
                if (materials == null) {
                    this.$API.getMaterials().then(res => {
                        if (res.data.error == 0) {
                            this.userMaterials = res.data.materials;
                            this.$store.commit("setMaterials", this.userMaterials);
                        } else {
                            this.userMaterials = [];
                        }
                    })
                } else {
                    this.userMaterials = materials;
                }
            },
            showEditGirdDrawer(flag = true) {
                this.showEditDrawer = flag;
            },
            saveAttribute(){
                this.$emit("listenSaveAttribute");
            },
            editGirdDrawer(index){//编辑宫格
                this.currEditChildIndex = index;
                this.currGridItem = JSON.parse(JSON.stringify(this.children[index]));
                this.showEditGridDialog(true);
            },
            deleteGirdDrawer(index){//删除宫格
                this.$confirm({
                    title:"提示",
                    message:"是否要删除该宫格?",
                    showCancelButton:true
                }).then(()=>{
                    let children = this.children;
                    children = children.slice(0, index).concat(children.slice(index + 1, children.length));
                    this.children = children;
                    this.$emit("listenSaveChildren",children);
                })
            },
            showEditGridDialog(flag = true){
                this.showEditDialog = flag;
            },
            showEditIconDialog(){
                this.showIconDialog = true;
                this.clickTab();
            },
            clickTab(){
                if(this.activeTab == 0){
                    this.initBaseMaterials();
                }else{
                    this.initUserMaterials();
                }
            },
            clickBaseMaterial(index){
                this.currGridItem.src = this.baseMaterials[index];
                this.showIconDialog = false;
            },
            clickUserMaterial(index){
                this.currGridItem.src = this.userMaterials[index];
                this.showIconDialog = false;
            },
            submitEdit(flag){//提交修改
                if(flag){
                    //确认修改
                    if(!this.currGridItem.src && !this.currGridItem.title){
                        this.$message.error("宫格图标和标题不能都为空");
                    }else{
                        let index = this.currEditChildIndex;
                        if(index != -1){//如果当前是正在编辑的子组件
                            if(this.currGridItem.src != this.children[index].src){//如果修改了图标
                                this.currGridItem.src = this.baseURL + this.currGridItem.src;
                            }
                            this.children[index] = this.currGridItem;
                        }else{//否则是新添加的组件
                            if(this.currGridItem.src){//如果图标不为空
                                this.currGridItem.src = this.baseURL + this.currGridItem.src;
                            }
                            this.children.push(this.currGridItem);
                        }
                        this.$emit("listenSaveChildren",this.children);//保存子组件
                    }
                }
                this.currEditChildIndex = -1;
                this.currGridItem = {
                    src:"",
                    title:"",
                    url:""
                }
                this.showEditGridDialog(false);
            },
        }
    }
</script>

<style scoped>
    .design-setting-gird-change {
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

    .design-setting-gird-change:hover {
        transition: 0.4s;
        border-radius: 14px;
        border-color: #3d93bc;
    }

    .design-setting-star {
        color: indianred;
        font-weight: bold;
    }

    .design-setting-label {
        font-size: 16px;
    }

    .design-grid-drawer-title {
        font-size: 16px;
        font-weight: bold;
        color: #3d93bc;
    }

    .egg-grid-item-new-image{
        cursor: pointer;
        height: 40px;
        width: 40px;
    }

    .design-grid-item-list{
        height: 86vh;
        overflow: scroll;
    }

    .design-grid-add-image-box {
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
        opacity: 0.8;
    }

    .design-material-item:hover{
        transition: 0.4s;
        opacity: 1;
    }

    .design-grid-item-icon{
        height: 2.2rem;
        width: 2.2rem;
    }
</style>