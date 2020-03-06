<template>
    <div id="app" @contextmenu.prevent>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                //组件列表
                componentList: [],
            }
        },
        methods: {

        },
    }
</script>

<style>
    @import "./assets/css/egg_paint.css";
    body{
        margin: 0;
        padding: 0;
        font-family: "Microsoft YaHei UI Light";
    }

    button {
        border: none;
        outline: none;
        cursor: pointer;
    }

    textarea{
        font-family: "Microsoft YaHei UI Light";
        font-size: 15px;
    }

    .el-dialog__header{
        background-color: rgba(200,231,252,0.1);
    }

    .el-dialog__body{
        background-color: rgba(200,231,252,0.1);
    }

    ::-webkit-scrollbar {
        width: 5px; /*对垂直流动条有效*/
        height: 5px; /*对水平流动条有效*/
    }

    /*定义滚动条的轨道颜色、内阴影及圆角*/
    ::-webkit-scrollbar-track {
        /*内阴影*/
        /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
        /*background-color: initial;*/
        /*border-radius: 3px;*/
    }

    /*定义滑块颜色、内阴影及圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 7px;
        background-color: #e0e0e0;
    }

    /*定义两端按钮的样式*/
    ::-webkit-scrollbar-button {
        /*background-color:cyan;*/
    }

    /*定义右下角汇合处的样式*/
    ::-webkit-scrollbar-corner {
        /*background:khaki;*/
    }

    .el-row{
        width: 100%;
    }

    .el-tabs--border-card>.el-tabs__content{
        padding: 0 10px 0 0 !important;
    }

    /*滑动块禁止时的颜色(机器验证成功的颜色)*/
    .el-slider__runway.disabled .el-slider__bar{
        background-color: #67C23A !important;
    }

    /*滑动块禁止时按钮的颜色(机器验证成功的颜色)*/
    .el-slider__runway.disabled .el-slider__button {
        border-color: #67C23A !important;
    }

    .el-menu-item-group__title{
        padding: 0 !important;
    }

    .is-opened > .el-submenu__title{
        color: #ffffff !important;
    }

    .is-opened > .el-submenu__title i{
        color: #ffffff !important;
    }

    .design-header-utils:hover{
        background-color: initial !important;
    }

    .design-page-name-input > input{
        border-left: none !important;
        border-right: none !important;
        border-top: none !important;
        padding: 0 8px;
    }

    .egg-design-setting-dialog .el-dialog__body{
        height: 100%;
        width: 100%;
        position: fixed;
        padding: 0;
        overflow-y: scroll;
    }

    .el-dialog__headerbtn{
        font-size: 20px !important;
    }

    .egg-design-header{
        background-image: linear-gradient(90deg, #5187c1  0%, #64b4e2 100%) !important;
        background-color: initial !important;
        z-index: 999 !important;
        border: none !important;
    }

    .egg-design-header .el-menu-item{
        background-color: inherit !important;
        cursor: default !important;
    }

    .design-aside-tab-pane{
        background-color: rgba(200,231,252,0.1) !important;
    }

    .user-message-dialog .el-dialog__header{
        background-color: transparent !important;
    }

    .user-message-dialog .el-dialog__body{
        background-color: transparent !important;
    }

    .user-project-dialog .el-dialog__header{
        background-color: transparent !important;
    }

    .user-project-dialog .el-dialog__body{
        background-color: transparent !important;
    }

    .design-aside-tab-pane .el-tabs__header{
        border-right: none !important;
    }

    .design-aside-tab-pane .el-tabs__header .el-tabs__nav-scroll{
        background-color: rgba(200,231,252,0.2);
    }

    .design-aside-tab-pane .el-tabs__header .el-tabs__nav{
        background-color: rgba(172,219,245,0.3);
    }

    .design-aside-tab-pane .el-tabs__header .el-tabs__item{
        height: 46px;
        font-size: 16px;
        line-height: 46px;
        font-weight: bold;
        color: #2d93bb !important;
    }

    .design-aside-tab-pane .el-tabs__header .el-tabs__item:hover{
        color: #409EFF !important;
    }

    .design-aside-tab-pane .el-tabs__header .is-active{
        box-shadow: 4px 0 0 #2d93bb inset;
        background-color: rgba(172,219,245,0.6) !important;
        color: #409EFF !important;
    }

    .design-aside-config{
        background-color: rgba(200,231,252,0.1) !important;
    }

    .design-aside-config .el-tabs__header{
        border-right: none !important;
    }

    .design-aside-config .el-tabs__header .el-tabs__nav-scroll{
        background-color: rgba(200,231,252,0.2);
    }

    .design-aside-config .el-tabs__header .el-tabs__nav{
        background-color: rgba(172,219,245,0.3);
    }

    .design-aside-config .el-tabs__header .el-tabs--border-card{
        background-color: #f0f0f0 !important;
    }

    .design-aside-config .el-tabs__header .el-tabs__item{
        height: 46px;
        font-size: 16px;
        line-height: 46px;
        font-weight: bold;
        color: #2d93bb !important;
    }

    .design-aside-config .el-tabs__header .el-tabs__item:hover{
        color: #409EFF !important;
    }

    .design-aside-config .el-tabs__header .is-active{
        box-shadow: 0 -4px 0 #2d93bb inset;
        background-color: rgba(172,219,245,0.6) !important;
        color: #409EFF !important;
    }

    .egg-design-components .el-collapse-item__header{
        font-size: 16px;
        background-color: initial !important;
    }

    .egg-design-components .el-collapse-item__wrap{
        background-color: rgba(172,219,245,0.1) !important;
        padding-top: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .attribute-radio-group{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
    }

    .attribute-radio-group .el-radio{
        margin: 5px 4px !important;
    }

    .design-aside .el-aside{
        overflow: hidden !important;
    }

    .design-aside .el-tabs__content{
        overflow-y: scroll !important;
        height: 100% !important;
    }

    .design-attribute-tabs .el-tabs__header{
        border: none !important;
    }

    .design-attribute-tabs .el-tabs__header .el-tabs__nav-scroll{
        background-color: initial;
    }

    .design-attribute-tabs .el-tabs__header .el-tabs__nav{
        background-color: initial;
        border: none !important;
    }

    .design-attribute-tabs .el-tabs__item{
        background-color: initial;
        border: none !important;
        font-size: 14px !important;
    }

    .design-attribute-tabs .el-tabs__item .is-active{
        border: none !important;
    }

    .design-attribute-tabs .el-tabs__header .is-active {
        -webkit-box-shadow: 0 -4px 0 #2d93bb inset;
        box-shadow: none;
        background-color: initial !important;
        color: #409EFF !important;
        border: none !important;
    }

    .user-project-info-input .el-input__count{
        bottom: -6px !important;
        right: 6px !important;
        background-color:transparent !important;
    }

    .user-project-row .cell{
        white-space: nowrap !important;
        text-overflow: ellipsis !important;
    }

    .swiper-pagination-bullet{
        background-color: rgba(0,0,0,0.5) !important;
    }

    .swiper-pagination-bullet-active{
        background-color: rgba(0,0,0,0.8) !important;
    }

    .design-swiper-drawer .el-drawer{
        background-color: #edf8ff;
    }
</style>
