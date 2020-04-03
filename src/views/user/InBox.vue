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
                <el-table-column width="1">
                    <template slot-scope="scope">
                        <span style="display: none;">{{scope.row.index = scope.$index}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="发件人"
                        width="150">
                    <template slot-scope="scope">
                        <div class="inbox-message-form">
                            <el-badge is-dot :hidden="scope.row.isRead">
                                <template v-if="scope.row.fromId == 'admin'">管理员</template>
                                <template v-else-if="scope.row.fromId == 'system'">系统消息</template>
                                <template v-else>用户消息</template>
                            </el-badge>
                        </div>
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
                        <div class="inbox-message-content" v-html="scope.row.content"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="时间"
                        width="180">
                    <template slot-scope="scope">
                        <span class="inbox-message-date"> {{scope.row.createTime}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <user-message-info :is-show="showMessage" :message-info="currMessage"
                           @listenClose="closeMessage"></user-message-info>
    </el-row>
</template>

<script>
    import {Table, TableColumn, Button, Badge} from "element-ui"
    import UserMessageInfo from "../../components/user/inbox/UserMessageInfo";

    export default {
        name: "InBox",
        components: {
            UserMessageInfo,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Button.name]: Button,
            [Badge.name]: Badge
        },
        data() {
            return {
                messages: [],
                showMessage: false,
                currMessage: {},
                selectedMessages: [],//已经选择的消息列表
            }
        },
        created() {
            this.initMessages();
        },
        methods: {
            //初始化消息列表
            initMessages(){
                this.$API.getMessages().then( res => {
                    if(res.data.error == 0){
                        this.messages = res.data.messages;
                    }else{
                        this.$message.error(res.data.error_message);
                    }
                })
            },
            lookMessage(row) {//查看消息
                this.showMessage = true;
                this.currMessage = row;
                if(!row.isRead){//如果是未读的，就设为已读
                    this.messages[row.index].isRead = true;
                    this.$API.readMessage(row.messageId);
                }
            },
            closeMessage() {//关闭消息窗口
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
                        this.$API.deleteMessages(this.selectedMessages).then(res => {
                            window.console.log(res.data)
                            if(res.data.error == 0){
                                //删除成功
                                this.$message.success("已删除");
                                let originMessages = JSON.stringify(this.messages);
                                for (let i = 0; i < this.selectedMessages.length; i++) {
                                    let deleteItem = JSON.stringify(this.selectedMessages[i]);
                                    if (originMessages.indexOf(deleteItem + ",") != -1) {
                                        originMessages = originMessages.replace(deleteItem + ",", "");
                                        continue;
                                    }
                                    originMessages = originMessages.replace(deleteItem, "");
                                }
                                //如果有删除最后一个，则有可能会多出一个逗号，替换掉
                                originMessages = originMessages.replace("},]", "}]");
                                this.messages = JSON.parse(originMessages);
                                this.selectedMessages = [];//清空选择的消息列表
                            }else{
                                //删除失败,重新获取消息列表
                                this.$message.error(res.data.error_message);
                                this.initMessages();
                            }
                        });
                    }).catch(() => {
                        //删除失败,重新获取消息列表
                        this.$message.error("发生意外错误，删除失败");
                        this.initMessages();
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
        padding-top: 4px;
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
