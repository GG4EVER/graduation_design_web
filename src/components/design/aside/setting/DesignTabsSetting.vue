<template>
    <!--    底部切换卡配置-->
    <el-col :span="24">
        <el-col class="design-setting-box" :span="14" :offset="5">
            <el-col :span="24">
                <el-form>
                    <el-form-item>
                        <div slot="label" class="design-setting-label egg-not-copy">切换卡默认字体颜色</div>
                        <el-color-picker v-model="tabBarTextColor" @change="changeTabBarTextColor"
                                         :predefine="predefineColors"></el-color-picker>
                    </el-form-item>
                    <el-form-item>
                        <div slot="label" class="design-setting-label egg-not-copy">切换卡选中字体颜色</div>
                        <el-color-picker v-model="tabBarSelectedTextColor" @change="changeTabBarSelectedTextColor"
                                         :predefine="predefineColors"></el-color-picker>
                    </el-form-item>
                    <el-form-item>
                        <div slot="label" class="design-setting-label egg-not-copy">切换卡背景颜色</div>
                        <el-color-picker v-model="tabBarBackgroundColor" @change="changeTabBarBackgroundColor"
                                         :predefine="predefineColors"></el-color-picker>
                    </el-form-item>
                    <el-form-item>
                        <div slot="label" class="design-setting-label egg-not-copy">切换卡上边框的颜色</div>
                        <el-radio-group v-model="tabBarBorderColor" @change="changeTabBarBorderColor">
                            <el-radio-button label="black">黑</el-radio-button>
                            <el-radio-button label="white">白</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="22" :offset="1">
                <el-divider></el-divider>
            </el-col>
            <el-col :span="14" :offset="5" class="design-setting-tip-box egg-not-copy">
                <el-col :span="24" class="design-setting-tip-title"><i class="el-icon-info"></i>&nbsp;底部切换卡数量可以为 0 或
                    2~5个
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="24" class="tabs-setting-link-box">
                    <el-link icon="el-icon-plus" @click="showAddTabDialog">新建切换卡</el-link>
                </el-col>
                <el-table stripe style="width: 100%" :data="tabs">
                    <div slot="empty" class="tabs-setting-no-data">
                        <el-button plain circle @click="showAddTabDialog"><i class="el-icon-plus"></i></el-button>
                    </div>
                    <el-table-column
                            prop="text"
                            label="切换卡名称"
                            min-width="120">
                    </el-table-column>
                    <el-table-column
                            label="指向页面"
                            min-width="120">
                        <template slot-scope="scope">
                            {{scope.row.pagePath.split("/")[2]}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="图标" min-width="120">
                        <template slot-scope="scope">
                            <img v-if="scope.row.iconPath" class="design-tabbar-item-icon" :src="baseURL + scope.row.iconPath" @click="changeIcon(0)"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="selectedIconPath"
                            label="选中时图标" min-width="120">
                        <template slot-scope="scope">
                            <img v-if="scope.row.selectedIconPath" class="design-tabbar-item-icon" :src="baseURL + scope.row.selectedIconPath" @click="changeIcon(0)"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="180" fixed="right">
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button type="primary" size="small" icon="el-icon-edit"
                                           @click.native.prevent="showAddTabDialog(true,false,scope.$index)"></el-button>
                                <el-button v-show="scope.$index != tabs.length - 1" type="info" size="small"
                                           icon="el-icon-sort-down"
                                           @click.native.prevent="changeTabPosition(scope.$index,'down')"></el-button>
                                <el-button v-show="scope.$index != 0" type="warning" size="small" icon="el-icon-sort-up"
                                           @click.native.prevent="changeTabPosition(scope.$index,'up')"></el-button>
                                <el-button type="danger" size="small" icon="el-icon-delete"
                                           @click.native.prevent="deleteTab(scope.$index)"></el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-col>
        <el-dialog :title="isAdding?'添加切换卡':'编辑切换卡'" :visible.sync="isShowAddTabDialog" append-to-body
                   :close-on-click-modal="false"
                   :close-on-press-escape="false" width="80%">
            <el-col :span="24">
                <el-col :span="18" :offset="2">
                    <el-form label-width="180px">
                        <el-form-item>
                            <div slot="label" class="design-setting-label egg-not-copy"><span
                                    class="design-setting-star">*&nbsp;</span>切换卡名称
                            </div>
                            <el-input v-model="text" placeholder="请输入切换卡名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div slot="label" class="design-setting-label egg-not-copy"><span
                                    class="design-setting-star">*&nbsp;</span>指向页面
                            </div>
                            <el-select v-model="pagePath" placeholder="请选择" no-data-text="当前没有页面">
                                <el-option
                                        v-for="item in currPages"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="'pages/' + item.name + '/' + item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <div slot="label" class="design-setting-label egg-not-copy">切换卡图标</div>
                            <img v-if="iconPath" class="design-tabbar-item-icon" :src="baseURL + iconPath" @click="changeIcon(0)"/>
                            <el-button v-else round type="warning" @click="changeIcon(0)">更改</el-button>
                        </el-form-item>
                        <el-form-item>
                            <div slot="label" class="design-setting-label egg-not-copy">选中时图标</div>
                            <img v-if="selectedIconPath" class="design-tabbar-item-icon" :src="baseURL + selectedIconPath" @click="changeIcon(1)"/>
                            <el-button v-else round type="warning" @click="changeIcon(1)">更改</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-col>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showAddTabDialog(false)">取 消</el-button>
                <el-button type="primary" @click="isAdding ? addTab() : editTab()">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog :title="iconType == 0 ? '更改默认图标' : '更改选中时图标'" :visible.sync="showIconDialog" append-to-body :close-on-click-modal="false"
                   :close-on-press-escape="false" width="80%">
            <div class="design-material-box">
                <template v-for="(item,index) in baseMaterials" >
                    <img class="design-material-item" :src="baseURL + item" :key="index" @click="clickMaterial(index)"/>
                </template>
            </div>
        </el-dialog>
        <div class="egg-design-setting-dialog-footer">
            <el-button v-show="showSaveButton" type="success" round :loading="isSaving" @click="submitSaving">保存<i
                    class="el-icon-finished el-icon--right"></i></el-button>
            <el-button v-show="!showSaveButton" type="danger" round @click="closeAppSetting">关闭<i
                    class="el-icon-close el-icon--right"></i></el-button>
        </div>
    </el-col>
</template>

<script>
    import {
        Button,
        Divider,
        Table,
        TableColumn,
        Form,
        FormItem,
        ColorPicker,
        RadioGroup,
        RadioButton,
        Dialog,
        Input,
        Select,
        Option,
        Link,
        ButtonGroup
    } from "element-ui"
    import store from "../../../../store"

    export default {
        name: "DesignTabsSetting",
        store,
        components: {
            [Button.name]: Button,
            [Divider.name]: Divider,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [RadioGroup.name]: RadioGroup,
            [RadioButton.name]: RadioButton,
            [ColorPicker.name]: ColorPicker,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [Select.name]: Select,
            [Option.name]: Option,
            [Link.name]: Link,
            [ButtonGroup.name]: ButtonGroup
        },
        watch: {
            "$store.state.pages":function(newVal) {
                if(newVal){
                    this.currPages = newVal;
                }
            }
        },
        data() {
            return {
                baseURL:process.env.VUE_APP_API_URL,
                tabBarTextColor: "#333333",//切换卡默认字体颜色
                tabBarSelectedTextColor: "#409EFF",//切换卡选中字体颜色
                tabBarBackgroundColor: "#ffffff",//切换卡背景颜色
                tabBarBorderColor: "black",//切换卡上边框的颜色
                predefineColors: ["#ffffff", "#e0e0e0", "#409EFF", "#333333", "#000000"],//预定义颜色
                showSaveButton: false,//是否显示保存按钮
                isSaving: false,//是否正在保存
                tabs: [],//切换卡列表
                isShowAddTabDialog: false,//是否显示添加切换卡的窗口
                isAdding: true,//是否是添加切换卡，否的话则是编辑
                editIndex: 0,
                currPages: [],//当前用户创建的页面列表
                text: "",//切换卡名称
                pagePath: "",//指向的页面路径
                iconPath: "",//图标路径
                selectedIconPath: "",//选择图标的路径
                showIconDialog:false,//是否显示选择图标库窗口
                iconType:0,//图标库窗口名称
                baseMaterials:[],
            }
        },
        methods: {
            closeAppSetting() {//关闭设置窗口
                this.$emit("listenCloseSettingDialog");
            },
            showSavingButton(flag = true) {//是否显示保存按钮
                if (flag) {
                    this.showSaveButton = true;
                } else {
                    this.showSaveButton = false;
                }
            },
            changeTabBarTextColor() {//监听切换卡默认字体颜色修改
                this.showSavingButton();
            },
            changeTabBarSelectedTextColor() {//监听切换卡选中字体颜色修改
                this.showSavingButton();
            },
            changeTabBarBackgroundColor() {//监听切换卡背景颜色修改
                this.showSavingButton();
            },
            changeTabBarBorderColor() {//监听切换卡上边框的颜色修改
                this.showSavingButton();
            },
            changeIcon(iconType){//改变切换卡图标
                this.iconType = iconType;
                this.initMaterials();
                this.showIconDialog = true;
            },
            initMaterials(){//初始化内置素材库
                if(this.baseMaterials.length == 0){
                    this.$API.getBaseMaterials().then(res => {
                        if(res.data.error == 0){
                            this.baseMaterials = res.data.materials;
                        }
                    })
                }
            },
            clickMaterial(index){
                let path = this.baseMaterials[index];
                if(this.iconType == 0){
                    this.iconPath = path;
                }else{
                    this.selectedIconPath = path;
                }
                this.showIconDialog = false;
            },
            submitSaving() {//提交保存
                let tabsLength = this.tabs.length;
                if (tabsLength > 0 && tabsLength < 2) {
                    this.$message.error("切换卡数量不能少于2个");
                    return;
                }
                if (tabsLength > 5) {
                    this.$message.error("切换卡数量不能超过5个");
                    return;
                }
                this.isSaving = true;
                let tabBar = {
                    color: this.tabBarTextColor,
                    selectedColor: this.tabBarSelectedTextColor,
                    backgroundColor: this.tabBarBackgroundColor,
                    borderStyle: this.tabBarBorderColor,
                    list: JSON.stringify(this.tabs)
                }
                let appId = this.$store.state.appId;
                this.$API.updateTabBarConfig(appId,JSON.stringify(tabBar)).then(res => {
                    if(res.data.error == 0){
                        tabBar.list = JSON.parse(tabBar.list);
                        store.commit("setTabBar", tabBar);
                        this.isSaving = false;
                        this.showSavingButton(false);
                    }else{
                        this.$message.error(res.data.error_message);
                        this.isSaving = false;
                    }
                })
            },
            /**
             * 改变切换卡位置
             * @param flag是否显示增加切换卡的窗口
             * @param isAdding 是否是添加窗口，如果不是，则是编辑窗口
             * @param index 如果是编辑窗口，则提供编辑的tab的索引
             */
            showAddTabDialog(flag = true, isAdding = true, index = 0) {
                if (flag) {
                    this.isAdding = isAdding;
                    if (isAdding) {//添加窗口
                        if (this.tabs.length < 5) {
                            this.isShowAddTabDialog = true;
                        } else {
                            this.$message.error("切换卡数量不能超过5个");
                        }
                    } else {//编辑窗口
                        this.editIndex = index;
                        this.text = this.tabs[index].text;
                        this.pagePath = this.tabs[index].pagePath;
                        this.iconPath = this.tabs[index].iconPath;
                        this.selectedIconPath = this.tabs[index].selectedIconPath;
                        this.isShowAddTabDialog = true;
                    }
                } else {
                    this.text = "";
                    this.pagePath = "";
                    this.iconPath = "";
                    this.selectedIconPath = "";
                    this.isShowAddTabDialog = false;
                }
            },
            addTab() {//添加切换卡
                let text = this.text;
                let pagePath = this.pagePath;
                if (text && pagePath) {
                    this.tabs.push({
                        text: this.text,
                        pagePath: this.pagePath,
                        iconPath:this.iconPath,
                        selectedIconPath:this.selectedIconPath
                    })
                    this.showSavingButton();
                    this.text = "";
                    this.pagePath = "";
                    this.iconPath = "";
                    this.selectedIconPath = "";
                    this.showAddTabDialog(false);
                } else {
                    this.$message.error("有必填的内容没有填哦")
                }
            },
            /**
             * 改变切换卡位置
             * @param index索引
             * @param direction方向，up 为向上移动，down为向下移动
             */
            changeTabPosition(index, direction) {
                let loading = this.$loading.service({});
                if (direction == 'up') {//向上移动
                    let temp = this.tabs[index];
                    this.$set(this.tabs, index, this.tabs[index - 1]);
                    this.$set(this.tabs, index - 1, temp);
                } else {//向下移动
                    let temp = this.tabs[index];
                    this.$set(this.tabs, index, this.tabs[index + 1]);
                    this.$set(this.tabs, index + 1, temp);
                }
                loading.close();
                this.showSavingButton();
            },
            /**
             * 编辑切换卡
             */
            editTab() {
                let tab = {
                    text: this.text,
                    pagePath: this.pagePath,
                    iconPath: this.iconPath,
                    selectedIconPath: this.selectedIconPath
                }
                this.$set(this.tabs, this.editIndex, tab);
                this.text = "";
                this.pagePath = "";
                this.iconPath = "";
                this.selectedIconPath = "";
                this.isShowAddTabDialog = false;
                this.showSavingButton();
            },
            /**
             * 删除指定的切换卡
             * @param index
             */
            deleteTab(index) {
                this.$confirm({
                    title: "确认要删除吗?",
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {//确认删除
                    this.tabs = this.tabs.slice(0, index).concat(this.tabs.slice(index + 1, this.tabs.length));
                    this.showSavingButton();
                }).catch(() => {//取消删除
                })
            }
        },
        created() {
            this.currPages = store.state.pages;
            this.tabBarTextColor = store.state.tabBar.color;
            this.tabBarSelectedTextColor = store.state.tabBar.selectedColor;
            this.tabBarBackgroundColor = store.state.tabBar.backgroundColor;
            this.tabBarBorderColor = store.state.tabBar.borderStyle;
            this.tabs = store.state.tabBar.list;
        }
    }
</script>

<style scoped>
    .design-setting-box {
        padding-top: 2rem;
        padding-bottom: 160px;
    }

    .design-setting-label {
        font-size: 16px;
    }

    .design-setting-star {
        color: indianred;
        font-weight: bold;
    }

    .design-tabbar-item-icon{
        height: 36px;
        width: 36px;
        cursor: pointer;
    }

    .design-setting-tip-box {
        padding: 1rem;
        background-color: #f0f0f0;
        border-radius: 14px;
        margin-bottom: 1rem;
    }

    .design-setting-tip-title {
        font-size: 16px;
        color: #666666;
        text-align: center;
    }

    .tabs-setting-link-box {
        padding: 5px 16px;
        font-size: 16px;
        text-align: right;
    }

    .tabs-setting-no-data {
        padding: 18px 0;
    }

    .egg-design-setting-dialog-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 20px 0;
        text-align: center;
        background-color: #f5fbff;
        z-index: 99;
    }

    .design-material-box{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .design-material-item{
        height: 40px;
        width: 40px;
        padding: 4px;
        cursor: pointer;
        opacity: 0.8;
    }

    .design-material-item:hover{
        transition: 0.4s;
        height: 48px;
        width: 48px;
        padding: 0px;
        opacity: 1;
    }
</style>