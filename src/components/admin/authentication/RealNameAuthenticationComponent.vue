<template>
    <el-col :span="24">
        <el-card>
            <div slot="header" class="admin-user-list-header egg-not-copy">{{ComponentTitle}}</div>
            <el-table :data="CertificationList" style="width: 100%">
                <el-table-column
                        prop="userId"
                        label="ID"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="idCard"
                        label="身份证"
                        min-width="120">
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="lookAuthentication(scope.row)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </el-col>
</template>

<script>
    import {Card, Table, TableColumn,Button} from "element-ui"

    export default {
        name: "RealNameAuthenticationComponent",
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
            CertificationList: {
                type: Array
            }
        },
        methods: {
            lookAuthentication(data) {
                this.$emit("listenLookAuthentication", data)
            },
        }
    }
</script>

<style scoped>

</style>