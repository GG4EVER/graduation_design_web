<template>
    <el-col :span="24">
        <el-col :span="16" :offset="4">
            <el-card>
                <div slot="header">定制需求</div>
                <el-form ref="requirementFrom" :rules="rules" :model="requirement" label-width="80px">
                    <el-form-item label="项目名称"  prop="title">
                        <el-input v-model="requirement.title"></el-input>
                    </el-form-item>
                    <el-form-item label="项目描述" prop="description">
                        <el-input type="textarea" :rows="4"
                                  v-model="requirement.description"
                                  resize="none"
                                  minlength="300"
                                  show-word-limit >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="项目类型" prop="type">
                        <el-checkbox-group v-model="requirement.type">
                            <el-checkbox label="1">PC网页</el-checkbox>
                            <el-checkbox label="2">H5</el-checkbox>
                            <el-checkbox label="3">微信小程序</el-checkbox>
                            <el-checkbox label="4">安卓</el-checkbox>
                            <el-checkbox label="5">IOS</el-checkbox>
                            <el-checkbox label="6">支付宝小程序</el-checkbox>
                            <el-checkbox label="7">百度小程序</el-checkbox>
                            <el-checkbox label="8">字节跳动小程序</el-checkbox>
                            <el-checkbox label="9">QQ小程序</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="联系邮箱" prop="email">
                        <el-input v-model="requirement.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input v-model="requirement.userPhone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitRequirement">发布需求</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-col>
</template>

<script>
    import {Card,Form,FormItem,Input,Button,Checkbox,CheckboxGroup} from "element-ui";
    export default {
        name: "UserRequirement",
        components:{
            [Card.name]:Card,
            [Form.name]:Form,
            [FormItem.name]:FormItem,
            [Input.name]:Input,
            [Button.name]:Button,
            [Checkbox.name]:Checkbox,
            [CheckboxGroup.name]:CheckboxGroup
        },
        data(){
            return{
                requirement:{
                    title:"",
                    description:"",
                    type:[],
                    email:"",
                    userPhone:"",
                },
                rules: {
                    title: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                    ],
                    description: [
                        { required: true, message: '请输入项目描述', trigger: 'blur' }
                    ],
                    type: [
                        {required: true, message: '请选择项目类型，可多选', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitRequirement(){
                let requirement = JSON.parse(JSON.stringify(this.requirement));
                if(!requirement.title){
                    this.$message.error("请输入项目名称");
                    return;
                }
                if(!requirement.description){
                    this.$message.error("请输入项目描述");
                    return;
                }
                if(requirement.type.length == 0){
                    this.$message.error("请选择项目类型，可多选");
                    return;
                }
                if(!requirement.email){
                    this.$message.error("请输入邮箱");
                    return;
                }
                if(requirement.email.indexOf("@") == -1){
                    this.$message.error("请输入正确的邮箱");
                    return;
                }
                requirement.type = requirement.type.toString()
                this.$API.submitRequirement(requirement).then(res => {
                    if(res.data.error == 0){
                        this.$message.success("发布成功");
                        this.$refs["requirementFrom"].resetFields();
                    }else{
                        this.$message.error(res.data.error_message);
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>