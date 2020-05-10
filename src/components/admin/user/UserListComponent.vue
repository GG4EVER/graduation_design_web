<template>
    <el-col :span="24">
        <el-card>
            <div slot="header" class="admin-user-list-header egg-not-copy">{{ComponentTitle}}</div>
            <el-table
                    :data="UserList"
                    style="width: 100%">
                <el-table-column
                        prop="userId"
                        label="ID"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="用户名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="userNickName"
                        label="昵称"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="userPhone"
                        label="手机号码" width="150">
                </el-table-column>
                <el-table-column
                        prop="registerTime"
                        label="注册时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="状态" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userState == 1">正常</span>
                        <span v-else-if="scope.row.userState == 0">已注销</span>
                        <span v-else>违规封号</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click.stop="lookUserInfo(scope.row)">查看资料</el-button>
                    </template>
                </el-table-column>
                <el-table-column width="100">
                    <template slot-scope="scope">
                        <el-dropdown trigger="click" @command="updateState">
                            <el-button type="danger"  size="small">
                                修改状态<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="{index:scope.$index,userState:1}" v-if="scope.row.userState != 1">恢复正常</el-dropdown-item>
                                <el-dropdown-item :command="{index:scope.$index,userState:0}" v-if="scope.row.userState != 0">注销账号</el-dropdown-item>
                                <el-dropdown-item :command="{index:scope.$index,userState:-1}" v-if="scope.row.userState != -1">违规封号</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

    </el-col>
</template>

<script>
    import {Card, Table, TableColumn,Button,Dropdown,DropdownMenu,DropdownItem} from "element-ui"
    export default {
        name: "UserListComponent",
        components: {
            [Card.name]: Card,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Button.name]:Button,
            [Dropdown.name]:Dropdown,
            [DropdownMenu.name]:DropdownMenu,
            [DropdownItem.name]:DropdownItem
        },
        props: {
            ComponentTitle: {
                type: String
            },
            UserList: {
                type: Array
            }
        },
        methods: {
            lookUserInfo(user) {
                this.$emit("listenLookUserInfo", user)
            },
            updateState(command){
                this.$emit("listenUpdateState", command)
            },
        }
    }
</script>

<style scoped>

</style>