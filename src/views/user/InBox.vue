<template>
    <el-row>
        <el-col class="inbox-button-box" :span="24">
            <el-button v-if="messages.length != 0" type="danger" @click="deleteMessage" size="small"
                       icon="el-icon-delete">删除
            </el-button>
        </el-col>
        <el-col :span="24">
            <el-table
                    class="user-project-table"
                    :data="messages"
                    style="width: 100%" row-class-name="egg-cursor egg-table-row" @row-click="lookMessage"
                    @selection-change="selectMessage" empty-text="当前暂无消息">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="发件人"
                        width="150">
                    <template slot-scope="scope">
                        <span class="inbox-message-form"> {{scope.row.from}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="主题"
                        width="160">
                    <template slot-scope="scope">
                        <span class="inbox-message-title"> {{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="内容">
                    <template slot-scope="scope">
                        <span class="inbox-message-content"> {{scope.row.content}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="时间"
                        width="180">
                    <template slot-scope="scope">
                        <span class="inbox-message-date"> {{scope.row.date}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <user-message-info :is-show="showMessage" :message-info="currMessage"
                           @listenClose="closeMessage"></user-message-info>
    </el-row>
</template>

<script>
    import {Table, TableColumn, Button} from "element-ui"
    import UserMessageInfo from "../../components/user/inbox/UserMessageInfo";

    export default {
        name: "InBox",
        components: {
            UserMessageInfo,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Button.name]: Button
        },
        data() {
            return {
                messages: [{
                    from: "管理员",
                    title: "实名认证审核进度",
                    content: "恭喜你，已通过实名认证1",
                    date: "2020-02-19",
                    isRead: true,
                }, {
                    from: "管理员",
                    title: "实名认证审核进度",
                    content: "恭喜你，已通过实名认证2",
                    date: "2020-02-20",
                    isRead: false,
                }],
                showMessage: false,
                currMessage: {},
                selectedMessages: [],//已经选择的消息列表
            }
        },
        methods: {
            lookMessage(row) {
                this.showMessage = true;
                this.currMessage = row;
            },
            closeMessage() {
                this.showMessage = false;
                this.currMessage = {};
            },
            selectMessage(selection) {
                this.selectedMessages = selection;
            },
            deleteMessage() {
                //如果有选择
                if (this.selectedMessages.length != 0) {
                    this.$confirm({
                        title: "是否要删除消息",
                        showCancelButton: true
                    }).then(() => {
                        let originMessages = JSON.stringify(this.messages);
                        for (let i = 0; i < this.selectedMessages.length; i++) {
                            let deleteItem = JSON.stringify(this.selectedMessages[i]);
                            if (originMessages.indexOf(deleteItem + ",") != -1) {
                                originMessages = originMessages.replace(deleteItem + ",", "");
                                continue;
                            }
                            originMessages = originMessages.replace(deleteItem, "");
                        }
                        this.messages = JSON.parse(originMessages)
                    }).catch(() => {
                    })
                } else {
                    this.$message.info("请先勾选要删除的消息")
                }
            },
        }
    }
</script>

<style scoped>
    .inbox-button-box {
        padding: 10px 0;
    }

    .inbox-message-form {
        font-weight: bold;
    }

    .inbox-message-title {
        color: #666666;
    }

    .inbox-message-content {
        color: #5B5B5B;
    }

    .inbox-message-date {
        color: #5B5B5B;
    }
</style>
