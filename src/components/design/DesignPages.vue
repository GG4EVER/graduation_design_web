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
                                <el-input type="text" size="small" maxlength="32" v-model="page.name" show-word-limit
                                          class="design-page-name-input"></el-input>
                            </el-col>
                            <el-col :span="5" class="design-page-check-box design-page-operate-box">
                                <el-button type="success" circle class="design-page-rename-button"
                                           @click.stop="submitEditPageName(true)"><i
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

    export default {
        name: "DesignPages",
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
                pages: [
                    {
                        name: "页面1",
                    },
                    {
                        name: "页面2"
                    }
                ]
            }
        },
        methods: {
            addPage() {//新建页面
                if (this.isEditPageIndex != -1) {
                    this.$message.error("还有页面重命名未完成");
                } else {
                    this.pages.push({
                        name: "",
                    })
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
                }
            },
            editPageName(index) {//编辑页面名称
                if (this.isEditPageIndex != -1) {//如果是true,则表示还有页面没改完名称
                    this.$message.error("还有页面重命名未完成");
                } else {
                    this.isEditPageIndex = index;
                }
            },
            submitEditPageName(confirmSubmit) {//提交修改页面名称
                if (confirmSubmit) {
                    this.isEditPageIndex = -1;
                } else {
                    this.isEditPageIndex = -1;
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
                    this.$message.success("删除成功");
                }).catch(() => {
                    this.$message.error("取消删除");
                })
            },
        },
    }
</script>

<style scoped>
    .design-no-pages {
        text-align: center;
        background-color: #eeeeee;
        padding: 1.5rem 0;
        color: #5B5B5B;
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
        padding: 2px;
        font-size: 10px;
    }
</style>