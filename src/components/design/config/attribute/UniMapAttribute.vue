<template>
    <el-col :span="24">
        <el-col :span="24" class="design-setting-title egg-not-copy"><i class="el-icon-minus el-icon--left"></i>地图属性<i
                class="el-icon-minus el-icon--right"></i></el-col>
        <div class="design-setting-map-info egg-not-copy"><i class="el-icon-info"></i>坐标数据请使用<a href="https://lbs.qq.com/tool/getpoint/index.html" target="_blank">腾讯坐标拾取器</a></div>
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
        <el-drawer :visible.sync="showMarkersDrawer" direction="rtl" size="40%"
                   @before-close="showEditMarkersDrawer(false)">
            <div class="design-grid-drawer-title egg-not-copy" slot="title">编辑标记点</div>
            <el-col :span="22" :offset="1" class="design-grid-item-list">
                <el-button icon="el-icon-plus" type="danger" round size="small" @click="showEditMarkersDialog(true)">
                    添加标记点
                </el-button>
                <el-table stripe :data="ComponentAttribute.markers" empty-text="暂无标记点">
                    <el-table-column prop="title" label="名称"></el-table-column>
                    <el-table-column prop="longitude" label="经度"></el-table-column>
                    <el-table-column prop="latitude" label="纬度"></el-table-column>
                    <el-table-column label="操作" width="60px">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-edit" type="primary" @click.stop="editMarker(scope.$index)" size="small"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column width="60px">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-delete" type="danger" @click.stop="deleteMark(scope.$index)"  size="small"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-drawer>
        <el-dialog :visible.sync="showMarkersDialog" title="编辑标记点" @before-close="showEditMarkersDialog(false)" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy">标记点名称（点击标记点时显示）</div>
                    <el-input v-model="currEditMarker.title" placeholder="请输入标记点名称"></el-input>
                    <div class="design-setting-map-info egg-not-copy"><i class="el-icon-info"></i>（仅在微信小程序、H5、支付宝小程序和百度小程序中支持）</div>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy"><span
                            class="design-setting-star">*</span>&nbsp;标记点经度
                    </div>
                    <el-input v-model="currEditMarker.longitude" placeholder="请输入标记点经度" type="number"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy"><span
                            class="design-setting-star">*</span>&nbsp;标记点纬度
                    </div>
                    <el-input v-model="currEditMarker.latitude" placeholder="请输入标记点纬度" type="number"></el-input>
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
    import {Form, FormItem, Input, Slider, Drawer, Table, TableColumn, Button, Dialog} from "element-ui"

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
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Button.name]: Button,
            [Dialog.name]: Dialog
        },
        data() {
            return {
                showMarkersDrawer: false,
                showMarkersDialog: false,
                currEditMarker: {
                    title: "",
                    longitude: "",//经度
                    latitude: "",//纬度
                },
                currEditIndex:-1,
            }
        },
        methods: {
            changeAttribute() {
                this.$emit("listenSaveAttribute");
            },
            showEditMarkersDrawer(flag) {
                this.showMarkersDrawer = flag;
            },
            showEditMarkersDialog(flag) {
                this.showMarkersDialog = flag;
                if(!flag){
                    //如果是关闭，则将属性置为空
                    this.currEditMarker = {
                        title: "",
                        longitude: "",//经度
                        latitude: "",//纬度
                    }
                    this.currEditIndex = -1;
                }
            },
            editMarker(index){
                this.currEditIndex = index;
                this.currEditMarker = JSON.parse(JSON.stringify(this.ComponentAttribute.markers[index]));
                this.showEditMarkersDialog(true);
            },
            deleteMark(index){
                let markers = this.ComponentAttribute.markers;
                markers = markers.slice(0, index).concat(markers.slice(index + 1, markers.length));
                this.$emit("listenSaveMarkers",markers);
            },
            submitMarker(flag) {
                if (flag) {
                    let currEditMarker = this.currEditMarker;
                    if (currEditMarker.longitude == "") {
                        this.$message.error("经度不能为空");
                        return;
                    }
                    if (currEditMarker.latitude == "") {
                        this.$message.error("纬度不能为空");
                        return;
                    }
                    let markers = this.ComponentAttribute.markers;
                    if(this.currEditIndex != -1){
                        //如果是编辑标记点
                        this.$set(markers,this.currEditIndex,currEditMarker);
                    }else{
                        if(markers.length == 0){
                            currEditMarker.id = 0;
                        }else{
                            currEditMarker.id = markers[markers.length - 1].id + 1;
                        }
                        markers.push(currEditMarker);
                    }
                    this.$emit("listenSaveMarkers",markers);
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

    .design-uni-map-confirm-box {
        display: flex;
        justify-content: space-around;
        padding: 10px 30px;
    }

    .design-setting-map-info{
        font-size: 14px;
        color: #7B7B7B;
    }

    .design-setting-map-info > a{
        color: #3d93bc;
        font-weight: bold;
    }
</style>