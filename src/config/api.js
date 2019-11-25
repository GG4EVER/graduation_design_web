import axios from 'axios';

let BaseUrl = "http://localhost:8080";

// 创建axios实例
const Request = axios.create({
    //timeout: 30000 // 请求超时时间
});

// 添加request拦截器
Request.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error);
});

// 添加response拦截器
Request.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error)
    }
);

let request = function (url,method,data) {
    return Request({
        url: url,
        method: method,
        headers: {
        },
        data:data
    })
};

export default{
    BaseUrl,
    adminLogin(adminName,adminPassword){
        return request(BaseUrl + "/admin/login","POST",{
            adminName:adminName,
            adminPassword:adminPassword
        });
    }
}
