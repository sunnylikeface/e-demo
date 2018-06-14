/**
 *
 *  @auth xlx_good@qq.com
 *  @date 18/5/22.
 *
 */

axios.defaults.baseURL = '/traffic-app';
axios.defaults.headers = {
    'Content-type': 'application/x-www-form-urlencoded'
};

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent

    if(config.method == 'post'){
        var form = new FormData();
        for(var key in config.data){
            form.append(key, config.data[key]);
        }
        config.data = form;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    if(response.data.code == '100001'){
        location.href = '/login.html'
    }
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

// 登录
var login = function (data, callback) {
    axios.post('/login', data).then(callback)
};

// 区域
var getAreaList = function (data, callback) {
    axios.post('/area/list', data).then(callback)
};

//行驶车辆位置
var getDriveGps = function (data, callback) {
    axios.post('/current/drive/gps', data).then(callback)
};

//实时行驶车辆数
var getFireNum = function (data, callback) {
    axios.post('/current/fireNum', data).then(callback)
};

//当天累积值
var getTotal = function (data, callback) {
    axios.post('/current/total', data).then(callback)
};

//天分布
var getDays = function (data, callback) {
    axios.post('/statistic/days', data).then(callback)
};

//小时时段分布
var getHours = function (data, callback) {
    axios.post('/statistic/hours', data).then(callback)
};

//天气查询
var getWeather = function (data, callback) {
    axios.post('/current/weather', data).then(callback)
};