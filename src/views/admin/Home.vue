<template>
    <el-row class="egg-full-height">
        <el-col :span="24" class="egg-flex egg-flex-justify-center">
            <el-col :xs="22" :md="18" :lg="12" class="egg-admin-home-logo-box egg-flex egg-flex-justify-center egg-flex-align-center egg-not-copy">
                <img class="egg-admin-home-logo" src="../../assets/logo.png" draggable="false"/>
                <span class="egg-admin-home-logo-title">Egg Paint</span>
            </el-col>
        </el-col>
        <el-col :span="24" class="egg-flex egg-flex-justify-around">
            <el-col :xs="20" :md="10" :lg="5">
                <div class="egg-home-item-box">
                    <div class="egg-home-item">
                        <span class="egg-home-item-icon"><i class="el-icon-message"></i></span>
                        <span class="egg-home-item-number">99+</span>
                        <div class="egg-home-item-direction">消息数</div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="20" :md="10" :lg="5">
                <div class="egg-home-item-box">
                    <div class="egg-home-item">
                        <span class="egg-home-item-icon"><i class="el-icon-s-custom"></i></span>
                        <span class="egg-home-item-number">5201314</span>
                        <div class="egg-home-item-direction">总用户数</div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="20" :md="10" :lg="5">
                <div class="egg-home-item-box">
                    <div class="egg-home-item">
                        <span class="egg-home-item-icon"><i class="el-icon-s-order"></i></span>
                        <span class="egg-home-item-number">0</span>
                        <div class="egg-home-item-direction">待审核数</div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="20" :md="10" :lg="5">
                <div class="egg-home-item-box">
                    <div class="egg-home-item">
                        <span class="egg-home-item-icon"><i class="el-icon-s-opportunity"></i></span>
                        <span class="egg-home-item-number">0</span>
                        <div class="egg-home-item-direction">定制需求量</div>
                    </div>
                </div>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>
    .egg-home-item-box{
        padding-top: 100%;
        border-radius: 30px;
        position: relative;
    }

    .egg-home-item{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        border-radius: 30px;
        background-color: #f0f0f0;
        color: #3e5470;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .egg-home-item-direction{
        width: 100%;
        height: 15%;
        position: absolute;
        bottom: 0;
        opacity: 0;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        background-color: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
    }

    .egg-home-item:hover{
        transition: 0.4s;
        background-color: #3e5470;
        color: #ffffff;
        box-shadow: 3px 3px 15px #666666;
    }

    .egg-home-item-icon{
        font-size: 70px;
    }

    .egg-home-item-number{
        font-size: 50px;
    }

    .egg-home-item:hover > .egg-home-item-direction{
        transition: 0.2s;
        opacity: 0.7;
    }

    .egg-admin-home-logo-box{
        height: 100px;
        margin: 60px;
    }

    .egg-admin-home-logo{
        height: 5rem;
        width: 5rem;
        margin: 0 1rem;
    }

    .egg-admin-home-logo-title{
        font-size: 3rem;
        background: linear-gradient(90deg, #00AEFF 0%, #8994C6 100%);
        -webkit-background-clip: text;
        color: transparent;
        font-weight: bold;
    }
</style>
