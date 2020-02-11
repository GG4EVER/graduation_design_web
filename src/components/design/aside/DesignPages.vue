<template>
    <el-col :span="24" class="design-pages">
        <el-col :span="22" :offset="1" style="padding-bottom: 10px;text-align: right;">
            <el-button plain round size="mini" @click="addPage"><i class="el-icon-plus"></i>&nbsp;新建页面</el-button>
        </el-col>
        <template v-if="pages.length != 0">
            <template v-for="(page,index) in pages">
                <div :key="index" @click="selectPage(index)">
                    <el-col :span="22" :offset="1" class="design-page "
                            :class="index == active ? 'design-page-active' : ''">

                        <el-col :span="2" class="design-page-check-box">
                            <el-radio></el-radio>
                        </el-col>
                        <template v-if="isEditPageIndex != index">
                            <el-col :span="14" class="design-page-name">
                                {{page.name}}
                            </el-col>
                            <el-col :span="8" class="design-page-check-box design-page-operate-box">
                                <el-button type="primary" class="design-page-rename-button"
                                           @click.stop="editPageName(index)">
                                    <i class="el-icon-edit"></i></el-button>
                                <el-button type="danger" class="design-page-rename-button"
                                           @click.stop="deletePage(index)"><i
                                        class="el-icon-delete"></i></el-button>
                            </el-col>
                        </template>
                        <template v-else>
                            <el-col :span="17">
                                <el-input type="text" size="small" maxlength="32" v-model="editingPageName"
                                          show-word-limit
                                          class="design-page-name-input"></el-input>
                            </el-col>
                            <el-col :span="5" class="design-page-check-box design-page-operate-box">
                                <el-button type="success" circle class="design-page-rename-button"
                                           @click.stop="submitEditPageName(true,index)"><i
                                        class="el-icon-check"></i></el-button>
                                <el-button type="danger" circle class="design-page-rename-button"
                                           @click.stop="submitEditPageName(false)"><i
                                        class="el-icon-close"></i></el-button>
                            </el-col>
                        </template>
                    </el-col>
                </div>
            </template>
        </template>
        <template v-else>
            <el-col :span="24" class="design-no-pages egg-not-copy">
                当前没有页面
            </el-col>
        </template>
    </el-col>
</template>

<script>
    import {Radio, Input, Button} from "element-ui"
    import store from "../../../store";

    export default {
        name: "DesignPages",
        store,
        components: {
            [Radio.name]: Radio,
            [Input.name]: Input,
            [Button.name]: Button
        },
        data() {
            return {
                pageName: "index",
                active: 0,
                isEditPageIndex: -1,
                pages: [],
                editingPageName: "",//正在修改的页面的名字
            }
        },
        methods: {
            addPage() {//新建页面
                if (this.isEditPageIndex != -1) {
                    this.$message.error("还有页面重命名未完成");
                } else {
                    this.pages.push({
                        name: "",
                        description: ""
                    });
                    window.console.log(store.state.pages)
                    this.isEditPageIndex = this.pages.length - 1;
                }
            },
            selectPage(index) {//选择页面
                if (this.isEditPageIndex == index) {//如果正在修改页面名称，则不触发选择页面
                    return;
                } else if (this.isEditPageIndex != -1) {
                    this.$message.error("请先完成重命名工作");
                } else {
                    window.console.log("选择页面: " + index)
                    this.active = index;
                    store.commit("setCurrPageIndex", index);
                }
            },
            editPageName(index) {//编辑页面名称
                if (this.isEditPageIndex != -1) {//如果是true,则表示还有页面没改完名称
                    this.$message.error("还有页面重命名未完成");
                } else {
                    this.isEditPageIndex = index;
                    this.editingPageName = this.pages[index].name;
                }
            },
            submitEditPageName(confirmSubmit, index) {//提交修改页面名称
                if (this.editingPageName.length == 0) {//如果正在修改的页面名称长度为0
                    this.$message.error("页面名称不能为空");
                } else {
                    if (confirmSubmit) {
                        let tempPages = this.pages;
                        let canModify = true;
                        for (let i = 0; i < tempPages.length; i++) {
                            if (i != index) {//判断是否和其他页面的名称相同
                                if (tempPages[i].name == this.editingPageName) {//如果正在修改的页面名字重复则不能修改
                                    canModify = false;
                                    break;
                                }
                            }
                        }
                        if (canModify) {//是否可以修改名称
                            //如果已经有这个页面，且页面名称不一致，则修改
                            if(store.state.pages[index]){
                                store.commit("updatePages",{
                                    index:index,
                                    name:this.editingPageName,
                                    description:this.pages[index].description,
                                });
                            }else{//否则添加页面
                                store.commit("setPages", this.pages);
                            }
                            this.pages[index].name = this.editingPageName;
                            this.editingPageName = "";
                            this.isEditPageIndex = -1;
                        } else {
                            this.$message.error("页面名称不能重复");
                        }
                    } else {
                        this.isEditPageIndex = -1;
                    }
                }
            },
            deletePage(index) {//删除页面
                window.console.log(index);
                this.$confirm({
                    title: "提示",
                    message: "是否要删除这个页面",
                    showCancelButton: true,
                    type: 'warning'
                }).then(() => {
                    this.pages = this.pages.slice(0, index).concat(this.pages.slice(index + 1, this.pages.length));
                    store.commit("deletePages", {
                        index:index,
                        pages:this.pages
                    });
                    this.$message.success("删除成功");
                }).catch(() => {
                    this.$message.error("取消删除");
                })
            },
        },
        created() {
            this.pages = JSON.parse(JSON.stringify(store.state.pages));
        }
    }
</script>

<style scoped>
    .design-no-pages {
        text-align: center;
        padding: 1.5rem 4px;
        color: #5B5B5B;
        background-color: rgba(200, 231, 252, 0.5);
        border-radius: 14px;
    }

    .design-pages {
        padding: 14px 0;
    }

    .design-page {
        background-color: #ffffff;
        margin-bottom: 10px;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        border-bottom: 1px solid #e0e0e0;
        border-top: 1px solid transparent;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
    }

    .design-page .design-page-check-box {
        display: none;
    }

    .design-page .design-page-operate-box {
        display: none !important;
    }

    .design-page:hover {
        border: 1px #61c4fd dashed;
    }

    .design-page:hover .design-page-operate-box {
        display: flex !important;
    }

    .design-page-active {
        border: 1px solid #61c4fd;
    }

    .design-page-active:hover {
        border: 1px solid #61c4fd;
    }

    .design-page-active .design-page-check-box {
        display: flex !important;
    }

    .design-page-active .design-page-operate-box {
        display: flex !important;
    }

    .design-page-name {
        height: 32px;
        line-height: 32px;
        font-size: 17px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .design-page-check-box {
        height: 32px;
        padding-left: 4px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .design-page-rename-button {
        padding: 5px;
        font-size: 10px;
    }
</style>