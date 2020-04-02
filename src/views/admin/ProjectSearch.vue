<template>
    <div>
        <el-col :span="24" class="admin-user-search-box">
            <el-dropdown trigger="click" @command="selectKey">
                <el-button plain>
                    <span v-if="keyName">{{keyName}}</span>
                    <span v-else>请选择</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="appId,项目ID">项目ID</el-dropdown-item>
                    <el-dropdown-item command="userId,用户ID">用户ID</el-dropdown-item>
                    <el-dropdown-item command="appName,项目名">项目名</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-col :span="12">
                <el-input
                        placeholder="搜索内容"
                        v-model="searchValue">
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" icon="el-icon-search" @click="submitSearch"></el-button>
            </el-col>
        </el-col>
        <el-col :span="24" v-if="showSearchResult">
            <project-list-component :project-list="projectList" component-title="查询结果"></project-list-component>
            <el-col :span="24">
                <div class="admin-el-pagination">
                    <el-pagination
                            background
                            layout="prev, pager, next,total"
                            :total="total" :current-page="pageNo" @current-change="toPage">
                    </el-pagination>
                </div>
            </el-col>
        </el-col>
    </div>
</template>

<script>
    import {Dropdown, DropdownMenu, DropdownItem, Button, Input,Pagination} from "element-ui"
    import ProjectListComponent from "../../components/admin/project/ProjectListComponent";

    export default {
        name: "UserSearch",
        components: {
            ProjectListComponent,
            [Dropdown.name]: Dropdown,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [Button.name]: Button,
            [Input.name]: Input,
            [Pagination.name]:Pagination
        },
        data() {
            return {
                keyName:"",
                key: "",
                searchValue:"",
                showSearchResult:false,
                projectList:[],
                pageNo:1,
                total:0,
            }
        },
        methods:{
            selectKey(key){
                this.key = key.split(",")[0];
                this.keyName = key.split(",")[1];
                this.searchValue = "";
            },
            submitSearch(){//提交搜索
                let key = this.key;
                let searchValue = this.searchValue;
                if(key == null || key == ""){
                    this.$message.error("查询的关键字不能空")
                    return;
                }
                if(searchValue == null || searchValue == ""){
                    this.$message.error("查询的内容不能空")
                    return;
                }
                this.showSearchResult = true;
                this.initProjectList();
            },
            initProjectList(){
                let data = {};
                data[this.key] = this.searchValue;
                this.$API.adminSearchAllUniApp(this.pageNo,data).then(res => {
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
                this.initProjectList();
            }
        }
    }
</script>

<style scoped>
    .admin-user-search-box {
        display: flex;
        justify-content: center;
        padding: 10px 0 30px 0;
    }
</style>