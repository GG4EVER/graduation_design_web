<template>
    <el-col :span="24">
        <!--        如果已经实名认证了-->
        <el-col class="user-authentication animated fadeIn" v-if="isAuthentication && !showAuthentication" :span="24">
            <el-col :lg="{span:7}" :md="{span:7}" :sm="{span:24}" :xs="{span:24}"><img src="../../assets/images/authentication.jpg"></el-col>
            <el-col :lg="{span:9}" :md="{span:9}" :sm="{span:24}" :xs="{span:24}">
                <el-col class="user-authentication-title" style="text-align: left;">认证信息（审核中）</el-col>
                <el-form>
                    <el-form-item label="姓名">**杰</el-form-item>
                </el-form>
                <el-form>
                    <el-form-item label="身份证号">4****************6</el-form-item>
                </el-form>
            </el-col>
            <el-col :lg="{span:1}" :md="{span:1}" :sm="{span:1}" :xs="{span:1}"><div class="user-authentication-divider"></div></el-col>
            <el-col :lg="{span:6}" :md="{span:6}" :sm="{span:24}" :xs="{span:24}" style="padding: 15px 0">
                <el-button type="info" @click="openAuthentication" size="small">更改实名认证</el-button>
            </el-col>
        </el-col>

        <!--        实名认证窗口-->
        <el-col class="egg-not-copy animated fadeIn" v-if="showAuthentication" :lg="{span:14,offset:5}" :md="{span:16,offset:4}"
                :sm="{span:24}" :xs="{span:24}">
            <el-col :span="24" class="user-authentication-title egg-not-copy"><i
                    class="el-icon-minus el-icon--left"></i>实名认证<i
                    class="el-icon-minus el-icon--right"></i></el-col>
            <el-form label-width="180px">
                <el-form-item>
                    <div slot="label" class="user-authentication-label egg-not-copy"><span
                            class="user-authentication-star">*&nbsp;</span>姓名
                    </div>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="user-authentication-label egg-not-copy"><span
                            class="user-authentication-star">*&nbsp;</span>身份证号
                    </div>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" class="user-authentication-label egg-not-copy"><span
                            class="user-authentication-star">*&nbsp;</span>手持身份证人像面
                    </div>
                    <input type="file" style="display: none;" ref="idCardPerson" @change="uploadPhoto($event,1)"/>
                    <!--                如果有照片-->
                    <div v-if="hasPhoto" class="user-authentication-no-photo" @click="getPhoto(1)">
                        <img class="user-authentication-photo" src="../../assets/images/authentication.jpg"/>
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
                    <input type="file"  style="display: none;" ref="idCardNationalEmblem" @change="uploadPhoto($event,2)"/>
                    <!--                如果有照片-->
                    <div v-if="hasPhoto2" class="user-authentication-no-photo" @click="getPhoto(2)">
                        <img class="user-authentication-photo" src="../../assets/images/authentication.jpg"/>
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
                isAuthentication: true,
                showAuthentication: false,
                hasPhoto: false,
                hasPhoto2: false,
            }
        },
        methods: {
            //打开实名认证
            openAuthentication() {
                this.showAuthentication = true;
            },
            getPhoto(index){
                if(index == 1){
                    this.$refs.idCardPerson.click();
                }else{
                    this.$refs.idCardNationalEmblem.click();
                }
            },
            uploadPhoto(e,index){//选择图片，上传
                window.console.log(e.target.files[0])
                if(index == 1){
                    this.hasPhoto = true;
                    window.console.log(this.$refs.idCardPerson)
                }else{
                    this.hasPhoto2 = true;
                    window.console.log(this.$refs.idCardNationalEmblem)
                }
            },
            //提交实名认证
            submitAuthentication(flag = true) {
                // eslint-disable-next-line no-empty
                if (flag) {

                }
                this.showAuthentication = false;
                this.hasPhoto = false;
                this.hasPhoto2 = false;
            }
        }
    }
</script>

<style scoped>
    .user-authentication{
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

    .user-authentication-divider{
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
