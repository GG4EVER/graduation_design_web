import axios from 'axios';
import store from '../store'

let Host = "http://localhost:8080";
let BaseUrl = "http://localhost:8080/api";

// 创建axios实例
const Request = axios.create({
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
    Host,
    BaseUrl,
    /**
     * 管理员登录
     * @param adminName
     * @param adminPassword
     * @returns {AxiosPromise}
     */
    adminLogin: (adminName, adminPassword) => {
        return request(BaseUrl + "/admin/login", "POST", {
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
        return request(BaseUrl + "/user/login", "POST", {
            userName: userName,
            userPassword: userPassword
        });
    },

    getUserInfo: () => {
        return request(BaseUrl + "/user", "GET", {});
    },


    /**
     * 检测用户名是否重复
     */
    userCheckUserName: (userName) => {
        return request(BaseUrl + "/user/register?userName=" + userName, "POST", {});
    },

    /**
     * 检测手机是否重复
     */
    userCheckUserPhone: (userPhone) => {
        return request(BaseUrl + "/user/register?userPhone=" + userPhone, "POST", {});
    },

    /**
     * 用户注册
     * @param userName
     * @param userPassword
     * @returns {AxiosPromise}
     */
    userRegister: (userName, userPassword) => {
        return request(BaseUrl + "/user", "POST", {
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
        return request(BaseUrl + "/user", "PATCH", data);
    },

    /**
     * 上传图片
     * @param userId
     * @param file
     * @param type
     */
    uploadImage(params){
        return request(Host + "/image", "POST", params);
    },

    /**
     * 获取用户实名认证信息
     * @returns {AxiosPromise}
     */
    getCertification: () => {
        return request(BaseUrl + "/user/certification", "GET", {});
    },

    /**
     * 提交实名认证
     * @param data
     * @returns {AxiosPromise}
     */
    setCertification:(data) =>{
        return request(BaseUrl + "/user/certification", "POST", data);
    },

    /**
     * 创建项目
     * @param data
     * @returns {AxiosPromise}
     */
    createProject(data){
        return request(BaseUrl + "/project/", "POST", data);
    },

    /**
     * 获得当前用户所有项目
     */
    getUserProjects(){
        return request(BaseUrl + "/projects", "GET", {});
    },

    /**
     * 获得指定app的信息
     * @param data
     * @returns {AxiosPromise}
     */
    getProjectByAppId(data){
        return request(BaseUrl + "/project/" + data.appId, "GET", {});
    },

    /**
     * 更新项目
     * @param data
     * @returns {AxiosPromise}
     */
    updateProject(data){
        return request(BaseUrl + "/project/" + data.appId, "PATCH", data);
    },

    /**
     * 删除项目
     * @param data
     * @returns {AxiosPromise}
     */
    deleteProject(data){
        return request(BaseUrl + "/project/" + data.appId, "DELETE", data);
    },

    /**
     * 获取消息列表
     * @param isRead 可选参数，是否已读
     */
    getMessages:(isRead)=>{
        if(isRead != null){
            return request(BaseUrl + "/user/messages?isRead=" + isRead , "GET", {});
        }else{
            return request(BaseUrl + "/user/messages", "GET", {});
        }
    },

    /**
     * 将消息设为已读
     * @param messageId
     */
    readMessage:(messageId) =>{
        //不需要返回结果
        request(BaseUrl + "/user/message" , "POST", {
            messageId:messageId
        });
    },

    /**
     * 批量删除消息
     * @param messages
     * @returns {AxiosPromise}
     */
    deleteMessages:(messages) =>{
        return request(BaseUrl + "/user/messages", "DELETE", {
            messages: JSON.stringify(messages)
        });
    }
}
