<template>
    <el-col :span="24">
        <div class="user-project-add-button egg-not-copy" @click="createProject"><i class="el-icon-plus"></i><span
                class="user-project-add-content">创建新项目</span></div>
        <el-table
                class="user-project-table"
                :data="projects"
                stripe
                style="width: 100%" row-class-name="egg-cursor" @row-click="lookProjectInfo">
            <el-table-column
                    prop="id"
                    label="项目ID"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="项目名称"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="项目描述" class-name="user-project-row">
            </el-table-column>
            <el-table-column
                    prop="creator"
                    width="180"
                    label="创建者">
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    width="180" empty-text="/">
                <template slot-scope="scope">
                    <div v-if="scope.row.createDate">{{scope.row.createDate}}</div>
                    <div v-else>-</div>
                </template>
            </el-table-column>
            <el-table-column
                    label="上次修改时间"
                    width="180" empty-text="/">
                <template slot-scope="scope">
                    <div v-if="scope.row.lastModified">{{scope.row.lastModified}}</div>
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
                    id: "project1",
                    createDate:"2020-02-01",
                    lastModified: '2020-02-02',
                    name: '项目名',
                    description: '项目描述',
                    creator: "创建者"
                }]
            }
        },
        methods: {
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
                this.closeCreateProject();
                setTimeout(()=>{
                    this.projects.push(newProject);
                    loading.close();
                    this.$message.success("创建成功");
                },2000)
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
                let j = -1;
                for (let i = 0; i < this.projects.length; i++) {
                    if (newInfo.id == this.projects[i].id) {
                        j = i;
                        break;
                    }
                }
                if (j != -1) {
                    this.$set(this.projects, j, newInfo);
                }
                this.projectInfo = newInfo;
            },
            /**
             * 删除项目
             * @param project
             */
            deleteProject() {
                let index = -1;
                for (let i = 0; i < this.projects.length; i++) {
                    if (this.projectInfo.id == this.projects[i].id) {
                        index = i;
                        break;
                    }
                }
                if (index != -1) {
                    this.projects = this.projects.slice(0, index).concat(this.projects.slice(index + 1, this.projects.length));
                }
                this.$message.success("已删除");
                this.showProjectInfo = false;
                this.projectInfo = {};
            },
            /**
             * 跳转设计项目页面
             **/
            designProject() {
                let project = this.projectInfo;
                let routeUrl = this.$router.resolve({
                    path: "/design",
                    params: {id: project.id}
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
