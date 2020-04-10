import axios from 'axios';
import store from '../store'

// 创建axios实例
const Request = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 30000, // 请求超时时间
    withCredentials: true
});

// 添加request拦截器
Request.interceptors.request.use(config => {
    if(typeof config.data == typeof FormData){
        config.headers = {
            'Content-Type': 'multipart/form-data',
        };
    }else{
        config.headers = {
            'Content-Type': 'application/json',
        };
    }
    if (store.state.token) {//如果存在token
        config.headers.Token = store.state.token;
    }
    return config
}, error => {
    return Promise.reject(error);
});

// 添加response拦截器
Request.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        window.console.log("发生错误");
        return Promise.reject(error)
    }
);

let request = function (url, method, data) {
    return Request({
        url: url,
        method: method,
        headers: {},
        data: data,
    })
};

export default {
    /**
     * 管理员登录
     * @param adminName
     * @param adminPassword
     * @returns {AxiosPromise}
     */
    adminLogin: (adminName, adminPassword) => {
        return request("/api/admin/login", "POST", {
            adminName: adminName,
            adminPassword: adminPassword
        });
    },

    /**
     * 用户登录
     * @param userName
     * @param userPassword
     * @returns {AxiosPromise}
     */
    userLogin: (userName, userPassword) => {
        return request("/api/user/login", "POST", {
            userName: userName,
            userPassword: userPassword
        });
    },

    getUserInfo: () => {
        return request("/api/user", "GET", {});
    },


    /**
     * 检测用户名是否重复
     */
    userCheckUserName: (userName) => {
        return request("/api/user/register?userName=" + userName, "POST", {});
    },

    /**
     * 检测手机是否重复
     */
    userCheckUserPhone: (userPhone) => {
        return request("/api/user/register?userPhone=" + userPhone, "POST", {});
    },

    /**
     * 用户注册
     * @param userName
     * @param userPassword
     * @returns {AxiosPromise}
     */
    userRegister: (userName, userPassword) => {
        return request("/api/user", "POST", {
            userName: userName,
            userPassword: userPassword
        });
    },

    /**
     * 修改用户资料
     * @param userInfo
     */
    updateUserInfo: (userInfo) => {
        let data = {
            userNickName: userInfo.userNickName,
            userPhone: userInfo.userPhone,
        };
        return request("/api/user", "PATCH", data);
    },

    /**
     * 上传图片
     * @param userId
     * @param file
     * @param type
     */
    uploadImage(params){
        return request("/image", "POST", params);
    },

    /**
     * 获得用户的素材库
     */
    getMaterials(){
        return request("/api/user/materials", "GET", {});
    },

    /**
     * 获得基础素材库，内置素材库
     * @returns {AxiosPromise}
     */
    getBaseMaterials(){
        return request("/api/image/materials", "GET", {});
    },

    /**
     * 删除素材库图片
     * @param data
     */
    deleteImage(url){
        return request(url, "DELETE", {});
    },

    /**
     * 获取用户实名认证信息
     * @returns {AxiosPromise}
     */
    getCertification: () => {
        return request("/api/user/certification", "GET", {});
    },

    /**
     * 提交实名认证
     * @param data
     * @returns {AxiosPromise}
     */
    setCertification:(data) =>{
        return request("/api/user/certification", "POST", data);
    },

    /**
     * 创建项目
     * @param data
     * @returns {AxiosPromise}
     */
    createProject(data){
        return request("/api/project/", "POST", data);
    },

    /**
     * 获得当前用户所有项目
     */
    getUserProjects(){
        return request("/api/projects", "GET", {});
    },

    /**
     * 获得指定app的信息
     * @param data
     * @returns {AxiosPromise}
     */
    getProjectByAppId(data){
        return request("/api/project/" + data.appId, "GET", {});
    },

    /**
     * 修改项目微信配置
     * @param data
     * @returns {AxiosPromise}
     */
    updateProjectWeChatConfig(data){
        return request("/api/project/wechat/" + data.appId, "PATCH", data);
    },

    /**
     * 更新项目
     * @param data
     * @returns {AxiosPromise}
     */
    updateProject(data){
        return request("/api/project/" + data.appId, "PATCH", data);
    },

    /**
     * 打包项目
     * @param buildType
     * @param appId
     * @returns {AxiosPromise}
     */
    buildProject(buildType,appId) {
        return request("/api/project/build/" + appId + "?buildType=" + buildType, "GET", {});
    },

    /**
     * 删除项目
     * @param data
     * @returns {AxiosPromise}
     */
    deleteProject(data){
        return request("/api/project/" + data.appId, "DELETE", data);
    },

    /**
     * 获取消息列表
     * @param isRead 可选参数，是否已读
     */
    getMessages:(isRead)=>{
        if(isRead != null){
            return request("/api/user/messages?isRead=" + isRead , "GET", {});
        }else{
            return request("/api/user/messages", "GET", {});
        }
    },

    /**
     * 将消息设为已读
     * @param messageId
     */
    readMessage:(messageId) =>{
        //不需要返回结果
        request("/api/user/message" , "POST", {
            messageId:messageId
        });
    },

    /**
     * 批量删除消息
     * @param messages
     * @returns {AxiosPromise}
     */
    deleteMessages:(messages) =>{
        return request("/api/user/messages", "DELETE", {
            messages: JSON.stringify(messages)
        });
    },

    /**
     * 管理员获得用户列表
     * @param page
     * @returns {AxiosPromise}
     */
    adminGetAllUser(page){
        return request("/api/admin/users/" + page, "GET", {});
    },

    /**
     * 多条件获取用户列表
     * @param page
     * @param data
     * @returns {AxiosPromise}
     */
    adminSearchAllUser(page,data){
        return request("/api/admin/users/" + page, "POST", data);
    },

    /**
     * 管理员获得项目列表
     * @param page
     * @returns {AxiosPromise}
     */
    adminGetAllUniApp(page){
        return request("/api/admin/projects/" + page, "GET", {});
    },

    /**
     * 多条件获取用户列表
     * @param page
     * @param data
     * @returns {AxiosPromise}
     */
    adminSearchAllUniApp(page,data){
        return request("/api/admin/projects/" + page, "POST", data);
    },

    /**
     * 多条件获取实名认证列表
     * @param page
     * @param data
     */
    adminGetCertification(page,data){
        return request("/api/admin/users/certification/" + page, "POST", data);
    },

    /**
     * 更新指定实名认证
     * @param data
     * @returns {AxiosPromise}
     */
    adminUpdateCertification(data){
        return request("/api/admin/user/certification", "PATCH", data);
    },

    /**
     * 获得用户总数
     * @returns {AxiosPromise}
     */
    adminGetUserCount(){
        return request("/api/admin/user/count", "GET", {});
    },

    /**
     * 获得待审核实名认证总数
     * @returns {AxiosPromise}
     */
    adminGetUserCertificationCount(){
        return request("/api/admin/user/certification/count", "GET", {});
    },

    /**
     * 发布需求
     * @param data
     * @returns {AxiosPromise}
     */
    submitRequirement(data){
        return request("/api/user/requirement", "POST", data);
    },

    /**
     * 获得需求列表
     * @param page
     */
    adminGetRequirements(page){
        return request("/api/admin/requirements/" + page, "GET", {});
    }
}
