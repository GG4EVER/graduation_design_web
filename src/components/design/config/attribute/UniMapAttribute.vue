<template>
    <el-col :span="24">
        <el-col :span="24" class="design-setting-title egg-not-copy"><i class="el-icon-minus el-icon--left"></i>地图属性<i
                class="el-icon-minus el-icon--right"></i></el-col>
        <el-form :model="ComponentAttribute" status-icon>
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy">中心经度</div>
                <el-input v-model="ComponentAttribute.longitude" placeholder="默认天安门经度"
                          @change="changeAttribute"></el-input>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy">中心纬度</div>
                <el-input v-model="ComponentAttribute.latitude" placeholder="默认天安门纬度"
                          @change="changeAttribute"></el-input>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy">缩放级别</div>
            </el-form-item>
            <el-form-item>
                <el-slider
                        v-model="ComponentAttribute.scale"
                        :step="1" :max="18" :min="5" show-stops show-tooltip @change="changeAttribute">
                </el-slider>
            </el-form-item>
            <el-form-item>
                <div slot="label" label-width="0px"></div>
                <div class="design-setting-map-makers-change egg-not-copy" @click="showEditMarkersDrawer(true)">
                    <i class="el-icon-set-up el-icon--left"></i>更改标记点
                </div>
            </el-form-item>
        </el-form>
        <el-drawer  :visible.sync="showMarkersDrawer" direction="rtl" size="40%"
                    @before-close="showEditMarkersDrawer(false)">
            <div class="design-grid-drawer-title egg-not-copy" slot="title">编辑标记点</div>
            <el-col :span="22" :offset="1" class="design-grid-item-list">
                <el-button icon="el-icon-plus" type="danger" round size="small" @click="showEditMarkersDialog(true)">添加标记点</el-button>
                <el-table stripe :data="ComponentAttribute.markers" empty-text="暂无标记点">
                    <el-table-column prop="title" label="名称"></el-table-column>
                    <el-table-column prop="longitude" label="经度"></el-table-column>
                    <el-table-column prop="latitude" label="纬度"></el-table-column>
                    <el-table-column label="操作"><el-button icon="el-icon-delete"></el-button></el-table-column>
                </el-table>
            </el-col>
        </el-drawer>
        <el-dialog :visible.sync="showMarkersDialog" title="编辑标记点" @before-close="showEditMarkersDialog(false)">
            <el-form>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy">标记点名称</div>
                    <el-input v-model="editMarker.title" placeholder="请输入标记点名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*</span>&nbsp;标记点经度</div>
                    <el-input v-model="editMarker.longitude" placeholder="请输入标记点经度" type="number"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy"><span class="design-setting-star">*</span>&nbsp;标记点纬度</div>
                    <el-input v-model="editMarker.latitude" placeholder="请输入标记点纬度" type="number"></el-input>
                </el-form-item>
            </el-form>
            <div class="design-uni-map-confirm-box">
                <el-button plain @click="submitMarker(false)">取消</el-button>
                <el-button type="success" @click="submitMarker(true)">确认</el-button>
            </div>
        </el-dialog>
    </el-col>
</template>

<script>
    import {Form, FormItem, Input, Slider,Drawer,Table,TableColumn,Button,Dialog} from "element-ui"

    export default {
        name: "UniMapAttribute",
        props: {
            ComponentAttribute: {
                type: Object
            },
        },
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Drawer.name]: Drawer,
            [Slider.name]: Slider,
            [Table.name]:Table,
            [TableColumn.name]:TableColumn,
            [Button.name]:Button,
            [Dialog.name]:Dialog
        },
        data(){
            return{
                showMarkersDrawer:false,
                showMarkersDialog:false,
                editMarker:{
                    title:"",
                    longitude:"",//经度
                    latitude:"",//纬度
                }
            }
        },
        methods: {
            changeAttribute() {
                this.$emit("listenSaveAttribute");
            },
            showEditMarkersDrawer(flag){
                this.showMarkersDrawer = flag;
            },
            showEditMarkersDialog(flag){
                this.showMarkersDialog = flag;
            },
            submitMarker(flag){
                if(flag){
                    window.console.log(flag)
                }
                this.showEditMarkersDialog(false);
            }
        }
    }
</script>

<style scoped>
    .design-setting-map-makers-change {
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

    .design-setting-map-makers-change:hover {
        transition: 0.4s;
        border-radius: 14px;
        border-color: #3d93bc;
    }

    .design-uni-map-confirm-box{
        display: flex;
        justify-content: space-around;
        padding: 10px 30px;
    }
</style>