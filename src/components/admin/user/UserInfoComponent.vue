<template>
    <el-dialog :visible.sync="IsShow" width="80%" top="0vh" append-to-body
               @before-close="closeDialog">
        <div slot="title" class="admin-user-info-title egg-not-copy">{{UserInfo.userNickName}}</div>
        <el-divider>
            <div class="admin-user-info-title">基础信息</div>
        </el-divider>
        <el-form label-width="150px">
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy">用户ID:</div>
                <div>{{UserInfo.userId}}</div>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy">用户名:</div>
                <div>{{UserInfo.userName}}</div>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy">用户昵称:</div>
                <div>{{UserInfo.userNickName}}</div>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy">手机号码:</div>
                <div>{{UserInfo.userPhone}}</div>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="design-setting-label egg-not-copy">状态:</div>
                <div>
                    <template v-if="UserInfo.userState == 1"><span class="egg-success">正常使用</span></template>
                    <template v-else-if="UserInfo.userState == 0"><span class="egg-info">已注销</span></template>
                    <template v-else><span class="egg-fail">违规封号</span></template>
                </div>
            </el-form-item>
        </el-form>
        <el-divider>
            <div class="admin-user-info-title">实名情况</div>
        </el-divider>
        <el-form label-width="150px">
            <template v-if="UserCertification">
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy">真实姓名:</div>
                    <div>{{UserCertification.name}}</div>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy">身份证号:</div>
                    <div>{{UserCertification.idCard}}</div>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="design-setting-label egg-not-copy">状态:</div>
                    <div>
                        <template v-if="UserCertification.state == 1"><span class="egg-success">审核通过</span></template>
                        <template v-else-if="UserCertification.state == 0"><span class="egg-primary">等待审核</span>
                        </template>
                        <template v-else-if="UserCertification.state == -1"><span class="egg-fail">审核不通过</span>
                        </template>
                        <template v-else><span class="egg-info">未实名</span></template>
                    </div>
                </el-form-item>
                <el-form-item v-if="UserCertification.state == 1">
                    <div slot="label" class="design-setting-label egg-not-copy">审核时间:</div>
                    <div>{{UserCertification.time}}</div>
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item v-if="UserCertification.state == 1">
                    <div slot="label" class="design-setting-label egg-not-copy">实名状态:</div>
                    <div><span class="egg-info">未实名</span></div>
                </el-form-item>
            </template>
        </el-form>
        <el-divider>
            <div class="admin-user-info-title">项目信息</div>
        </el-divider>
        <el-table :data="UserApps" empty-text="当前用户没有项目">
            <el-table-column prop="appId" label="项目ID"></el-table-column>
            <el-table-column prop="appName" label="项目名"></el-table-column>
            <el-table-column prop="description" label="项目描述"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="lastModifiedTime" label="上一次修改时间"></el-table-column>
            <el-table-column prop="lastBuildDate" label="上一次打包时间"></el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
    import {Dialog, Form, FormItem, Divider, Table, TableColumn} from "element-ui";

    export default {
        name: "UserInfoComponent",
        props: {
            IsShow: {
                type: Boolean
            },
            UserInfo: {
                type: Object
            },
            UserCertification: {
                type: Object
            },
            UserApps: {
                type: Array
            }
        },
        components: {
            [Dialog.name]: Dialog,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Divider.name]: Divider,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn
        },
        methods:{
            closeDialog(){
                this.$emit("listenClose");
                return;
            }
        }
    }
</script>

<style scoped>

</style>