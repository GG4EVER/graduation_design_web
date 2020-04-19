<template>
    <el-col :span="24">
        <el-card>
            <div slot="header" class="admin-user-list-header egg-not-copy">{{ComponentTitle}}</div>
            <el-table
                    :data="ProjectList"
                    style="width: 100%">
                <el-table-column
                        prop="appId"
                        label="项目ID"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="userId"
                        label="用户Id"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="appName"
                        label="项目名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="描述"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间" width="150">
                </el-table-column>
                <el-table-column
                        prop="lastModifiedTime"
                        label="最后一次修改时间"
                        width="180">
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="lookProject(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </el-col>
</template>

<script>
    import {Card, Table, TableColumn,Button} from "element-ui"

    export default {
        name: "ProjectListComponent",
        components: {
            [Card.name]: Card,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Button.name]:Button
        },
        props: {
            ComponentTitle: {
                type: String
            },
            ProjectList: {
                type: Array
            }
        },
        methods: {
            lookProject(app) {
                this.$emit("listenLookProject", app)
            }
        }
    }
</script>

<style scoped>

</style>