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
                    <el-dropdown-item command="userId,用户ID">用户ID</el-dropdown-item>
                    <el-dropdown-item command="userName,用户名">用户名</el-dropdown-item>
                    <el-dropdown-item command="userNickName,用户昵称">用户昵称</el-dropdown-item>
                    <el-dropdown-item command="userPhone,手机号码">手机号码</el-dropdown-item>
                    <el-dropdown-item command="userState,用户状态">用户状态</el-dropdown-item>
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
            <user-list-component :user-list="userList" component-title="查询结果"></user-list-component>
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
    import UserListComponent from "../../components/admin/user/UserListComponent";

    export default {
        name: "UserSearch",
        components: {
            UserListComponent,
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
                userList:[],
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
                this.initUserList();
            },
            initUserList(){
                let data = {};
                data[this.key] = this.searchValue;
                this.$API.adminSearchAllUser(this.pageNo,data).then(res => {
                    if(res.data.error == 0){
                        this.userList = res.data.users;
                        this.total = res.data.totalElements;
                    }else{
                        this.$message.error(res.data.error_message);
                    }
                })
            },
            toPage(pageNo){
                this.pageNo = pageNo;
                this.initUserList();
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
