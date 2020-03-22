<template>
    <el-col :span="24">
        <el-col class="user-authentication animated fadeIn" v-if="!showAuthentication" :span="24">
            <el-col :lg="{span:7}" :md="{span:7}" :sm="{span:24}" :xs="{span:24}">
                <img src="../../assets/images/authentication.jpg">
            </el-col>
            <el-col :lg="{span:9}" :md="{span:9}" :sm="{span:24}" :xs="{span:24}" v-if="certification">
                <el-col class="user-authentication-title" style="text-align: left;">认证信息（<template v-if="certification.state == 0">审核中</template><template v-else-if="certification.state == 1"><span class="egg-success">审核通过</span></template><template v-else ><span class="egg-fail">审核不通过</span></template>）</el-col>
                <el-form>
                    <el-form-item label="姓名">{{certification.name.slice(0,1)}}*{{certification.name.slice(certification.name.length - 1)}}</el-form-item>
                </el-form>
                <el-form>
                    <el-form-item label="身份证号">{{certification.idCard.slice(0,1)}}****************{{certification.idCard.slice(certification.idCard.length - 1)}}</el-form-item>
                </el-form>
                <el-form>
                    <el-form-item  v-if="certification.state == 1" label="认证时间">{{certification.time}}</el-form-item>
                </el-form>
            </el-col>
            <el-col :lg="{span:9}" :md="{span:9}" :sm="{span:24}" :xs="{span:24}" v-else>
                <el-col class="user-authentication-title" style="text-align: left;">未实名认证</el-col>
            </el-col>
            <el-col :lg="{span:1}" :md="{span:1}" :sm="{span:1}" :xs="{span:1}">
                <div class="user-authentication-divider"></div>
            </el-col>
            <el-col :lg="{span:6}" :md="{span:6}" :sm="{span:24}" :xs="{span:24}" style="padding: 15px 0">
                <el-button type="info" @click="openAuthentication" size="small">{{certification ? '更改实名认证' :
                    '实名认证'}}
                </el-button>
            </el-col>
        </el-col>

        <!--        实名认证窗口-->
        <el-col class="egg-not-copy animated fadeIn" v-if="showAuthentication" :lg="{span:14,offset:5}"
                :md="{span:16,offset:4}"
                :sm="{span:24}" :xs="{span:24}">
            <el-col :span="24" class="user-authentication-title egg-not-copy"><i
                    class="el-icon-minus el-icon--left"></i>实名认证<i
                    class="el-icon-minus el-icon--right"></i></el-col>
            <el-form label-width="180px">
                <el-form-item>
                    <div slot="label" class="user-authentication-label egg-not-copy"><span
                            class="user-authentication-star">*&nbsp;</span>姓名
                    </div>
                    <el-input v-model="certificationTemp.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="user-authentication-label egg-not-copy"><span
                            class="user-authentication-star">*&nbsp;</span>身份证号
                    </div>
                    <el-input v-model="certificationTemp.idCard" maxlength="18"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="user-authentication-label egg-not-copy"><span
                            class="user-authentication-star">*&nbsp;</span>手持身份证人像面
                    </div>
                    <input type="file" style="display: none;" ref="idCardPerson" @change="uploadPhoto($event,1)"/>
                    <!--                如果有照片-->
                    <div v-if="certificationTemp.portraitUrl" class="user-authentication-no-photo" @click="getPhoto(1)">
                        <img class="user-authentication-photo" :src="host +  certificationTemp.portraitUrl"/>
                        <div class="user-authentication-photo-mask"></div>
                    </div>
                    <div v-else class="user-authentication-no-photo" @click="getPhoto(1)">
                        <img src="../../assets/images/idcard_person.png">
                        <div class="user-authentication-photo-mask"></div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="user-authentication-label"><span
                            class="user-authentication-star">*&nbsp;</span>手持身份证国徽面
                    </div>
                    <input type="file" style="display: none;" ref="idCardNationalEmblem"
                           @change="uploadPhoto($event,2)"/>
                    <!--                如果有照片-->
                    <div v-if="certificationTemp.nationalEmblemUrl" class="user-authentication-no-photo" @click="getPhoto(2)">
                        <img class="user-authentication-photo" :src="host + certificationTemp.nationalEmblemUrl"/>
                        <div class="user-authentication-photo-mask"></div>
                    </div>
                    <div v-else class="user-authentication-no-photo" @click="getPhoto(2)">
                        <img src="../../assets/images/idcard_national_emblem.png">
                        <div class="user-authentication-photo-mask"></div>
                    </div>
                </el-form-item>
                <el-col class="user-authentication-button-box" :span="24">
                    <el-button type="danger" plain @click="submitAuthentication(false)">取消</el-button>
                    <el-button type="primary" plain @click="submitAuthentication">确认</el-button>
                </el-col>
            </el-form>
        </el-col>
    </el-col>
</template>

<script>
    import {Form, FormItem, Input, Button} from "element-ui"

    export default {
        name: "UserAuthentication",
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Button.name]: Button
        },
        data() {
            return {
                showAuthentication: false,
                certification: null,
                host:"",
                certificationTemp:{
                    name:"",
                    idCard:"",
                    portraitUrl:"",
                    nationalEmblemUrl:""
                },
            }
        },
        created() {
            this.host = this.$API.Host;
            let certification = this.$store.state.certification;
            if (certification) {//如果已经获取过了
                this.certification = certification;
            } else {
                this.$API.getCertification().then(res => {
                    if (res.data.error == 0) {
                        this.certification = res.data.certification;
                    } else {
                        this.$message.error(res.data.error_message);
                    }
                });
            }
        },
        methods: {
            //打开实名认证
            openAuthentication() {
                this.showAuthentication = true;
                if(this.certification){//如果有实名认证的信息，则赋值
                    this.certificationTemp = JSON.parse(JSON.stringify(this.certification));
                }
            },
            //选择图片
            getPhoto(index) {
                if (index == 1) {
                    this.$refs.idCardPerson.click();
                } else {
                    this.$refs.idCardNationalEmblem.click();
                }
            },
            //上传图片
            uploadPhoto(e, index) {//选择图片，上传
                window.console.log(e.target.files[0])
                let file = e.target.files[0];
                let param = new FormData(); //创建form对象
                param.append('file',file,file.name);
                param.append('userId',this.$store.state.userInfo.userId);
                if (index == 1) {
                    param.append('type','portrait');
                    this.$API.uploadImage(param).then(res => {
                        let data = res.data;
                        if(data.error == 0){//上传成功
                            this.certificationTemp.portraitUrl = data.url;
                        }else{
                            this.$message.error(data.error_message);
                        }
                    });
                } else {
                    param.append('type','nationalEmblem');
                    this.$API.uploadImage(param).then(res => {
                        let data = res.data;
                        if(data.error == 0){//上传成功
                            this.certificationTemp.nationalEmblemUrl = data.url;
                        }else{
                            this.$message.error(data.error_message);
                        }
                    });
                }
            },
            //提交实名认证
            submitAuthentication(flag = true) {
                // eslint-disable-next-line no-empty
                if (flag) {
                    let name = this.certificationTemp.name;
                    if(name == "" || name ==null){
                        this.$message.error("姓名不能为空");
                        return;
                    }
                    let idCard = this.certificationTemp.idCard;
                    if(idCard == "" || idCard ==null){
                        this.$message.error("身份证不能为空");
                        return;
                    }
                    let portraitUrl = this.certificationTemp.portraitUrl;
                    if(portraitUrl == "" || portraitUrl ==null){
                        this.$message.error("身份证图片不能为空");
                        return;
                    }
                    let nationalEmblemUrl = this.certificationTemp.nationalEmblemUrl;
                    if(nationalEmblemUrl == "" || nationalEmblemUrl ==null){
                        this.$message.error("身份证图片不能为空");
                        return;
                    }
                    let loading = this.$loading.service();
                    this.$API.setCertification(this.certificationTemp).then(res => {
                        loading.close();
                        if(res.data.error == 0){
                            this.$message.success("已提交");
                            this.certification = res.data.certification;
                        }else{
                            this.$message.error(res.data.error_message);
                        }
                        this.showAuthentication = false;
                    }).catch(() => {
                        loading.close();
                        this.showAuthentication = false;
                        this.$message.error("发生意外错误");
                    })
                }else{
                    this.showAuthentication = false;
                }
            }
        }
    }
</script>

<style scoped>
    .user-authentication {
        padding: 35px;
        box-shadow: 0 3px 5px #dddddd;
    }

    .user-authentication-title {
        font-size: 18px;
        text-align: center;
        padding: 20px 0px;
        color: #2d93bb;
        font-weight: bold;
    }

    .user-authentication-divider {
        width: 1px;
        height: 150px;
        background-color: #cccccc;
        margin: 10px 0;
    }

    .user-authentication-label {
        font-size: 16px;
    }

    .user-authentication-star {
        color: indianred;
        font-weight: bold;
    }

    .user-authentication-no-photo {
        transition: 0.5s;
        display: flex;
        width: 268px;
        height: 166px;
        background-color: #dddddd;
        justify-content: center;
        align-items: center;
        border-radius: 14px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .user-authentication-photo {
        width: 100% !important;
        height: auto !important;
    }

    .user-authentication-no-photo:hover {
        transition: 0.5s;
        box-shadow: 3px 3px 8px #aaaaaa;
    }

    .user-authentication-no-photo > img {
        transition: 0.5s;
        width: 78px;
        height: auto;
        opacity: 0.5;
    }

    .user-authentication-no-photo:hover > img {
        transition: 0.5s;
        opacity: 0.8;
    }

    .user-authentication-photo-mask {
        display: none;
        position: absolute;
        z-index: 1;
        height: 300px;
        width: 60px;
        left: 150%;
        transform: rotate(35deg);
        -ms-transform: rotate(35deg); /* IE 9 */
        -moz-transform: rotate(35deg); /* Firefox */
        -webkit-transform: rotate(35deg); /* Safari 和 Chrome */
        -o-transform: rotate(35deg); /* Opera */
        background-color: rgba(255, 255, 255, 0.6);
    }

    .user-authentication-no-photo:hover > .user-authentication-photo-mask {
        display: block;
        animation-name: photoMask;
        animation-iteration-count: 1;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
    }

    @keyframes photoMask {
        from {
            left: -100%;
        }
        to {
            left: 150%;
        }
    }

    @-moz-keyframes photoMask {
        from {
            left: -50%;
        }
        to {
            left: 150%;
        }
    }

    @-webkit-keyframes photoMask {
        from {
            left: -50%;
        }
        to {
            left: 150%;
        }
    }

    .user-authentication-button-box {
        padding-top: 15px;
        justify-content: space-around;
        display: flex;
    }
</style>
