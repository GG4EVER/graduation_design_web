<template>
    <div>
        <requirement-list-component :requirement-list="requirementList" component-title="需求列表"></requirement-list-component>
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
    import RequirementListComponent from "../../components/admin/requirement/RequirementListComponent";
    export default {
        name: "RequirementList",
        components:{
            RequirementListComponent,
            [Pagination.name]:Pagination
        },
        data(){
            return{
                requirementList:[],
                pageNo:1,
                total:0,
            }
        },
        created() {
            this.initRequirementList();
        },
        methods:{
            initRequirementList(){
                this.$API.adminGetRequirements(this.pageNo).then(res => {
                    window.console.log(res.data)
                    if(res.data.error == 0){
                        this.requirementList = res.data.requirements;
                        this.total = res.data.totalElements;
                    }else{
                        this.$message.error(res.data.error_message);
                    }
                })
            },
            toPage(pageNo){
                this.pageNo = pageNo;
                this.initRequirementList();
            }
        }
    }
</script>

<style scoped>

</style>