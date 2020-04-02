<template>
    <div>
        <user-list-component :user-list="userList" component-title="用户列表"></user-list-component>
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
    import UserListComponent from "../../components/admin/user/UserListComponent";
    import {Pagination} from "element-ui";
    export default {
        name: "UserList",
        components:{
            UserListComponent,
            [Pagination.name]:Pagination
        },
        data(){
            return{
                userList:[],
                pageNo:1,
                total:0,
            }
        },
        created() {
            this.initUserList();
        },
        methods:{
            initUserList(){
                this.$API.adminGetAllUser(this.pageNo).then(res => {
                    window.console.log(res.data)
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

</style>
