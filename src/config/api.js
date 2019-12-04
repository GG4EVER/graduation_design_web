import axios from 'axios';
import store from '../store'

let BaseUrl = "http://localhost:8080/api";

// 创建axios实例
const Request = axios.create({
    timeout: 30000, // 请求超时时间
    withCredentials: true
});

// 添加request拦截器
Request.interceptors.request.use(config => {
    config.headers = {
        'Content-Type': 'application/json',
    };
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
    }
}
