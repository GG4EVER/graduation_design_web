<template>
    <el-table
            :data="tableData"
            stripe
            style="width: 100%">
        <el-table-column
                prop="id"
                label="项目ID"
                width="180">
        </el-table-column>
        <el-table-column
                prop="name"
                label="项目名称"
                width="180">
        </el-table-column>
        <el-table-column
                prop="description"
                label="项目描述">
        </el-table-column>
        <el-table-column
                prop="creator"
                width="180"
                label="创建者">
        </el-table-column>
        <el-table-column
                prop="lastModified"
                label="上次修改时间"
                width="180">
        </el-table-column>
    </el-table>
</template>

<script>
    import {Table, TableColumn} from "element-ui"

    export default {
        name: "UserProject",
        components: {
            [Table.name]: Table,
            [TableColumn.name]: TableColumn
        },
        data() {
            return {
                tableData: [{
                    id: "项目名",
                    lastModified: '2016-05-02',
                    name: '项目名',
                    description: '项目描述',
                    creator: "创建者"
                }, {
                    id: "项目名",
                    lastModified: '2016-05-02',
                    name: '项目名',
                    description: '项目描述',
                    creator: "创建者"
                }, {
                    id: "项目名",
                    lastModified: '2016-05-02',
                    name: '项目名',
                    description: '项目描述',
                    creator: "创建者"
                }, {
                    id: "项目名",
                    lastModified: '2016-05-02',
                    name: '项目名',
                    description: '项目描述',
                    creator: "创建者"
                }]
            }
        }
    }
</script>

<style scoped>

</style>
