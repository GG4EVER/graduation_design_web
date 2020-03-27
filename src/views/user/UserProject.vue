<template>
    <el-col :span="24">
        <div class="user-project-add-button egg-not-copy" @click="createProject"><i class="el-icon-plus"></i><span
                class="user-project-add-content">创建新项目</span></div>
        <el-table
                class="user-project-table animated fadeIn"
                :data="projects"
                stripe
                style="width: 100%" row-class-name="egg-cursor" @row-click="lookProjectInfo">
            <el-table-column width="1">
                <template slot-scope="scope">
                    <span style="display: none;">{{scope.row.$index = scope.$index}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="appId"
                    label="项目ID"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="appName"
                    label="项目名称"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="项目描述" class-name="user-project-row" min-width="150">
            </el-table-column>
            <!--            <el-table-column-->
            <!--                    width="180"-->
            <!--                    label="创建者">-->
            <!--                <template slot-scope="scope">-->
            <!--                    -->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <el-table-column
                    label="创建时间"
                    width="180" empty-text="/">
                <template slot-scope="scope">
                    <div v-if="scope.row.createTime">{{scope.row.createTime}}</div>
                    <div v-else>-</div>
                </template>
            </el-table-column>
            <el-table-column
                    label="上次修改时间"
                    width="180" empty-text="/">
                <template slot-scope="scope">
                    <div v-if="scope.row.lastModifiedTime">{{scope.row.lastModifiedTime}}</div>
                    <div v-else>-</div>
                </template>
            </el-table-column>
        </el-table>
        <user-create-project :is-show="showCreateProject" @listenCreate="submitCreateProject"
                             @listenClose="closeCreateProject"></user-create-project>
        <user-project-info :is-show="showProjectInfo" :project-info="projectInfo"
                           @listenUpdateProjectInfo="updateProjectInfo" @listenDesign="designProject"
                           @listenDelete="deleteProject" @listenClose="closeProjectInfo"></user-project-info>
    </el-col>
</template>

<script>
    import {Table, TableColumn, Button} from "element-ui";
    import UserCreateProject from "../../components/user/project/UserCreateProject";
    import UserProjectInfo from "../../components/user/project/UserProjectInfo";

    export default {
        name: "UserProject",
        components: {
            UserCreateProject,
            UserProjectInfo,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Button.name]: Button
        },
        data() {
            return {
                showCreateProject: false,
                showProjectInfo: false,
                projectInfo: {},
                projects: [{
                    appId: "ab8cfa4fc3766f93f8e818e880b95cc43",
                    userId: "ufa66c26c31e2e1601b8c0b404e439a22",
                    appName: "测试",
                    description: "测试的描述",
                    createTime: "2020-02-27 00:30:11",
                    lastModifiedTime: "2020-02-27 00:30:11",
                }]
            }
        },
        created() {
            this.initProjects();
        },
        methods: {
            //获得所有项目
            initProjects() {
                this.$API.getUserProjects().then(res => {
                    if (res.data.error == 0) {
                        this.projects = res.data.apps;
                    } else {
                        this.$message.error(res.data.error_message);
                    }
                }).catch(()=>{
                    this.$message.error("发生意外错误");
                })
            },
            createProject() {
                this.showCreateProject = true;
            },
            closeCreateProject() {
                this.showCreateProject = false;
            },
            submitCreateProject(newProject) {
                let loading = this.$loading.service({
                    lock: true,
                    text: '正在创建，请稍等..',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$API.createProject(newProject).then(res => {
                    if(res.data.error == 0){
                        this.projects.push(res.data.app);
                        loading.close();
                        this.closeCreateProject();
                        this.$message.success("创建成功");
                    }else{
                        loading.close();
                        this.$message.error(res.data.error_message);
                    }
                }).catch(()=>{
                    loading.close();
                    this.$message.error("发生意外错误");
                })
            },
            /**
             * 查看项目
             * @param project
             */
            lookProjectInfo(project) {
                this.showProjectInfo = true;
                this.projectInfo = project;
            },

            /**
             * 更新项目
             * @param project
             */
            updateProjectInfo(newInfo) {
                newInfo = JSON.parse(newInfo);
                this.$API.updateProject(newInfo).then(res => {
                    if (res.data.error == 0) {
                        this.$set(this.projects, newInfo.$index, newInfo);
                        this.$message.success("修改成功");
                        this.projectInfo = newInfo;
                    } else {
                        this.$message.error(res.data.error_message);
                    }
                }).catch(()=>{
                    this.$message.error("发生意外错误");
                });
            },
            /**
             * 删除项目
             * @param project
             */
            deleteProject() {
                this.$API.deleteProject(this.projectInfo).then(res => {
                    if(res.data.error == 0){
                        let index = this.projectInfo.$index;
                        if (index != -1) {
                            this.projects = this.projects.slice(0, index).concat(this.projects.slice(index + 1, this.projects.length));
                        }
                        this.showProjectInfo = false;
                        this.projectInfo = {};
                        this.$message.success("已删除");
                    }else{
                        this.$message.error(res.data.error_message);
                    }
                }).catch(()=>{
                    this.$message.error("发生意外错误");
                })
            },
            /**
             * 跳转设计项目页面
             **/
            designProject() {
                let project = this.projectInfo;
                let routeUrl = this.$router.resolve({
                    path: "/design",
                    query: {appId: project.appId}
                });
                window.open(routeUrl.href, "_blank");
            },
            /**
             * 关闭查看项目
             * @param project
             */
            closeProjectInfo() {
                this.showProjectInfo = false;
                this.projectInfo = {};
            },
        }
    }
</script>

<style scoped>
    .user-project-table-column {
        cursor: pointer;
    }

    .user-project-add-button {
        transition: 0.4s;
        height: 18px;
        width: 18px;
        font-size: 18px;
        line-height: 18px;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
        padding: 8px;
        border-radius: 50%;
        background-color: #fbfbfb;
        border: 2px solid #f68484;
        color: #f68484;
        overflow: hidden;
        white-space: nowrap;
        margin-left: 10px;
    }

    .user-project-add-button:hover {
        transition: 0.4s;
        background-color: #f68484ee;
        width: 110px;
        border-radius: 50px;
        color: #ffffff;
        border: 2px solid #f68484;
        box-shadow: 0 0 4px #ffffff inset;
    }

    .user-project-add-content {
        transition: 0.4s;
        font-size: 14px;
        padding-left: 4px;
        position: relative;
        top: -1px;
        color: #f68484;
        opacity: 0;
    }

    .user-project-add-button:hover .user-project-add-content {
        transition: 0.5s;
        color: #ffffff;
        opacity: 1;
    }
</style>
