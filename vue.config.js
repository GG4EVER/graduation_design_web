module.exports = {
    publicPath: '/',
    devServer:{
        port:12998,
        proxy: process.env.VUE_APP_API_URL
    }
};
