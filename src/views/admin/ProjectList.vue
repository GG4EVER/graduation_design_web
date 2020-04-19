<template>
    <div>
        <project-list-component :project-list="projectList" component-title="项目列表" @listenLookProject="lookProject"></project-list-component>
        <el-col :span="24">
            <div class="admin-el-pagination">
                <el-pagination
                        background
                        layout="prev, pager, next,total"
                        :total="total" :current-page="pageNo" @current-change="toPage">
                </el-pagination>
            </div>
        </el-col>
    </div>
</template>

<script>
    import {Pagination} from "element-ui";
    import ProjectListComponent from "../../components/admin/project/ProjectListComponent";
    export default {
        name: "ProjectList",
        components:{
            ProjectListComponent,
            [Pagination.name]:Pagination
        },
        data(){
            return{
                projectList:[],
                pageNo:1,
                total:0,
            }
        },
        created() {
            this.initProject();
        },
        methods:{
            initProject(){
                this.$API.adminGetAllUniApp(this.pageNo).then(res => {
                    window.console.log(res.data)
                    if(res.data.error == 0){
                        this.projectList = res.data.apps;
                        this.total = res.data.totalElements;
                    }else{
                        this.$message.error(res.data.error_message);
                    }
                })
            },
            toPage(pageNo){
                this.pageNo = pageNo;
                this.initProject();
            },
            lookProject(app){
                window.console.log(app)
                let loading = this.$loading.service();
                this.$API.adminGetProjectUrl(app.appId).then(res => {
                    loading.close();
                    if(res.data.error == 0){
                        window.location.href = res.data.url;
                    }else{
                        this.$message.error(res.data.error_message);
                    }
                }).catch(()=>{
                    loading.close();
                    this.$message.error("发生意外错误");
                })
            }
        }
    }
</script>

<style scoped>

</style>
