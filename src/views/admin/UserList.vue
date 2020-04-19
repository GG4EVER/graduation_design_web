<template>
    <div>
        <user-list-component :user-list="userList" component-title="用户列表"
                             @listenLookUserInfo="lookUserInfo" @listenUpdateState="updateUserState"></user-list-component>
        <el-col :span="24">
            <div class="admin-el-pagination">
                <el-pagination
                        background
                        layout="prev, pager, next,total"
                        :total="total" :current-page="pageNo" @current-change="toPage">
                </el-pagination>
            </div>
        </el-col>
        <user-info-component :is-show="showUserInfo" :user-info="userInfo" :user-certification="userCertification" :user-apps="userApps" @listenClose="showUserInfoDialog(false)"></user-info-component>
    </div>
</template>

<script>
    import UserListComponent from "../../components/admin/user/UserListComponent";
    import UserInfoComponent from "../../components/admin/user/UserInfoComponent";
    import {Pagination} from "element-ui";
    export default {
        name: "UserList",
        components: {
            UserListComponent,UserInfoComponent,
            [Pagination.name]: Pagination
        },
        data() {
            return {
                userList: [],
                pageNo: 1,
                total: 0,
                showUserInfo: false,
                userInfo: {},
                userCertification: {},
                userApps: [],
            }
        },
        created() {
            this.initUserList();
        },
        methods: {
            initUserList() {
                this.$API.adminGetAllUser(this.pageNo).then(res => {
                    if (res.data.error == 0) {
                        this.userList = res.data.users;
                        this.total = res.data.totalElements;
                    } else {
                        this.$message.error(res.data.error_message);
                    }
                })
            },
            toPage(pageNo) {
                this.pageNo = pageNo;
                this.initUserList();
            },
            showUserInfoDialog(flag) {
                this.showUserInfo = flag;
                if(!flag){
                    this.userInfo = {};
                    this.userCertification ={};
                    this.userApps = [];
                }
            },
            lookUserInfo(user) {
                this.showUserInfoDialog(true);
                let loading = this.$loading.service();
                //查看用户信息
                this.$API.adminGetUserInfo(user.userId).then(res => {
                    let data = res.data;
                    loading.close();
                    if (data.error == 0) {
                        this.userInfo = data.user;
                        this.userCertification = data.certification;
                        this.userApps = data.apps;
                    } else {
                        this.$message.error(data.error_message);
                    }
                }).catch(() => {
                    loading.close();
                })
            },
            updateUserState(command){//修改用户状态
                let loading = this.$loading.service();
                let userInfo = this.userList[command.index];
                this.$API.adminUpdateUserInfo(userInfo.userId,command).then(res => {
                    loading.close();
                    if (res.data.error == 0) {
                        userInfo.userState = command.userState;
                        this.$set(this.userList,command.index,userInfo);
                        this.$message.success("修改成功");
                    } else {
                        this.$message.error(res.data.error_message);
                    }
                }).catch(()=>{
                    loading.close();
                })
            }
        }
    }
</script>

<style scoped>
    .admin-user-info-title{
        font-size: 18px;
        color: #8994C6;
    }
</style>
