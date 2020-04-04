<template>
    <el-col :span="24">
        <el-card>
            <div slot="header" class="admin-user-list-header egg-not-copy">{{ComponentTitle}}</div>
            <el-table
                    :data="RequirementList"
                    style="width: 100%">
                <el-table-column
                        prop="requirementId"
                        label="ID"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="userId"
                        label="用户Id"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="项目名称"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="项目描述" width="150">
                </el-table-column>
                <el-table-column
                        label="项目类型" width="150">
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.type.split(',')" :key="item">
                            {{type[parseInt(item) - 1]}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="userPhone"
                        label="手机号码"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="发布时间"
                        width="180">
                </el-table-column>
            </el-table>
        </el-card>
    </el-col>
</template>

<script>
    import {Card, Table, TableColumn,Button,CheckboxGroup,CheckboxButton} from "element-ui"

    export default {
        name: "RequirementListComponent",
        components: {
            [Card.name]: Card,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Button.name]:Button,
            [CheckboxGroup.name]:CheckboxGroup,
            [CheckboxButton.name]:CheckboxButton
        },
        props: {
            ComponentTitle: {
                type: String
            },
            RequirementList: {
                type: Array
            }
        },
        data(){
            return{
                type:["PC网页","H5","微信小程序","安卓","IOS","支付宝小程序","百度小程序","字节跳动小程序","QQ小程序"]
            }
        },
        methods: {
            resetPassword(user) {
                this.$emit("listenResetPassword", user)
            },
            updateState(user){
                this.$emit("listenUpdateState", user)
            },
        }
    }
</script>

<style scoped>

</style>