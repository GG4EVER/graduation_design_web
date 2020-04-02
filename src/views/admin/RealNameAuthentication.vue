<template>
    <div>
        <real-name-authentication-component :certification-list="certificationList" component-title="待审核列表" @listenLookAuthentication="lookAuthentication"></real-name-authentication-component>
        <el-col :span="24">
            <div class="admin-el-pagination">
                <el-pagination
                        background
                        layout="prev, pager, next,total"
                        :total="total" :current-page="pageNo" @current-change="toPage">
                </el-pagination>
            </div>
        </el-col>
        <edit-authentication-component component-title="审核" :is-show="showEditDialog" :user-certification="editCertification" @listenCloseDialog="closeEditDialog" @listenSubmitAuthentication="submitAuthentication"></edit-authentication-component>
    </div>
</template>

<script>
    import {Pagination} from "element-ui";
    import RealNameAuthenticationComponent from "../../components/admin/authentication/RealNameAuthenticationComponent";
    import EditAuthenticationComponent from "../../components/admin/authentication/EditAuthenticationComponent";
    export default {
        name: "RealNameAuthentication",
        components:{
            EditAuthenticationComponent,
            RealNameAuthenticationComponent,
            [Pagination.name]:Pagination
        },
        data(){
            return{
                certificationList:[],
                pageNo:1,
                total:0,
                showEditDialog:false,
                editCertification:null
            }
        },
        created() {
            this.initCertificationList();
        },
        methods:{
            initCertificationList(){
                //获得等待审核的实名认证列表
                this.$API.adminGetCertification(this.pageNo,{
                    state:"0"
                }).then(res => {
                    window.console.log(res.data)
                    if(res.data.error == 0){
                        this.certificationList = res.data.userCertifications;
                        this.total = res.data.totalElements;
                    }else{
                        this.$message.error(res.data.error_message);
                    }
                })
            },
            toPage(pageNo){
                this.pageNo = pageNo;
                this.initCertificationList();
            },
            lookAuthentication(data){
                this.editCertification = data;
                this.showEditDialog = true;
            },
            submitAuthentication(flag){
                this.$API.adminUpdateCertification({
                    userId:this.editCertification.userId,
                    state:flag
                }).then(res => {
                    if(res.data.error == 0){
                        this.$message.success("已修改");
                        this.closeEditDialog();
                        this.initCertificationList();
                    }else{
                        this.$message.error(res.data.error_message);
                    }
                }).catch(()=>{
                    this.$message.error("发生意外错误");
                    this.closeEditDialog();
                })
            },
            closeEditDialog(){
                this.showEditDialog = false;
                this.editCertification = null;
            }
        }
    }
</script>

<style scoped>

</style>
