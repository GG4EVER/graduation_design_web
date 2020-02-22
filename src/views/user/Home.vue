<template>
    <el-row class="egg-full-height">
        <el-col :span="24" class="egg-flex egg-flex-justify-center">
            <el-col :xs="22" :md="18" :lg="12"
                    class="egg-admin-home-logo-box egg-flex egg-flex-justify-center egg-flex-align-center egg-not-copy">
                <img class="egg-admin-home-logo" src="../../assets/logo.png" draggable="false"/>
                <span class="egg-admin-home-logo-title">Egg Paint</span>
            </el-col>
        </el-col>
        <el-col :span="24" class="user-home-box">
            <el-col :xs="20" :sm="11"  :md="7" :lg="5">
                <div class="egg-home-item-box egg-not-copy">
                    <div class="egg-home-item user-home-project" @click="openUserProject">
                        <span class="egg-home-item-icon"><i class="el-icon-s-open"></i></span>
                        <span class="egg-home-item-number">1</span>
                        <div class="egg-home-item-direction">查看所有项目<i class="el-icon-arrow-right el-icon--right"></i></div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="20" :sm="11" :md="7" :lg="5">
                <div class="egg-home-item-box egg-not-copy">
                    <div class="egg-home-item user-home-last-project" @click="designProject">
                        <span class="egg-home-item-icon"><i class="el-icon-s-flag"></i></span>
                        <span class="egg-home-item-number user-home-item-date">项目1</span>
                        <span class="egg-home-item-number user-home-item-date">2020-02-20</span>
                        <div class="egg-home-item-direction">继续上次的项目<i class="el-icon-arrow-right el-icon--right"></i></div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="20"  :sm="11" :md="7" :lg="5">
                <div class="egg-home-item-box egg-not-copy">
                    <div class="egg-home-item user-home-message" @click="openUserMessage">
                        <span class="egg-home-item-icon"><i class="el-icon-s-comment"></i></span>
                        <span class="egg-home-item-number">4</span>
                        <div class="egg-home-item-direction">查看未读消息<i class="el-icon-arrow-right el-icon--right"></i></div>
                    </div>
                </div>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Home",
        methods:{
            openUserProject(){
                this.$router.push("/user/userProject");
            },
            designProject(){
                let routeUrl = this.$router.resolve({
                    path: "/design",
                    params: {id: ""}
                });
                window.open(routeUrl.href,"_blank");
            },
            openUserMessage(){
                this.$router.push("/user/inBox");
            }
        }
    }
</script>

<style scoped>
    .user-home-box{
        flex-flow: wrap;
        display: flex;
        justify-content: space-around;
    }

    .egg-home-item-box {
        margin: 10px 0;
        padding-top: 100%;
        border-radius: 30px;
        position: relative;
    }

    .egg-home-item {
        transition: 0.4s;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        border-radius: 30px;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .egg-home-item-direction {
        width: 100%;
        height: 15%;
        position: absolute;
        bottom: 0;
        opacity: 0;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
    }

    .egg-home-item:hover {
        transition: 0.4s;
        color: #ffffff;
        box-shadow: 3px 3px 15px #666666;
    }

    .user-home-project{
        background-color: #f68484;
    }

    .user-home-project:hover{
        transition: 0.4s;
        background-color: rgb(243,84,84);
    }

    .user-home-last-project{
          background-color: #97d3c5;
      }

    .user-home-last-project:hover{
        transition: 0.4s;
        background-color: rgb(115,196,177);
    }

    .user-home-message{
        background-color: #75b9e6;
        color: #ffffff;
    }


    .user-home-message:hover{
        transition: 0.4s;
        background-color: rgb(74,163,222);
    }

    .egg-home-item-icon {
        font-size: 70px;
    }

    .egg-home-item-number {
        font-size: 50px;
    }

    .egg-home-item:hover > .egg-home-item-direction {
        transition: 0.2s;
        opacity: 0.7;
    }

    .egg-admin-home-logo-box {
        height: 100px;
        margin: 60px;
    }

    .egg-admin-home-logo {
        height: 5rem;
        width: 5rem;
        margin: 0 1rem;
    }

    .egg-admin-home-logo-title {
        font-size: 3rem;
        background: linear-gradient(90deg, #00AEFF 0%, #8994C6 100%);
        -webkit-background-clip: text;
        color: transparent;
        font-weight: bold;
    }

    .user-home-item-date {
        font-size: 25px;
        padding: 2px 0;
    }
</style>
