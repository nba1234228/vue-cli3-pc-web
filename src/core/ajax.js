import Vue from 'vue';
import axios from 'axios';
import {Loading, Message} from 'element-ui';
import env from './env';

const service = axios.create({
    baseUrl: env.apiPrefixUrl,
    withCredentials: true
});
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
service.defaults.timeout = 30000;
service.defaults.adapter.retry = 4;
service.defaults.adapter.retryDelay = 3000;

// 添加请求拦截
service.interceptors.request.use(function(config) {
    // console.log(config);
    config.params = config.params || {};
    config.params = Object.assign(config.params, {ts: Date.now()});
    return config;
}, function(error) {
    return Promise.reject(error);
});

// 添加响应拦截
service.interceptors.response.use(function(response) {
    if (response['data'][env['responseCodeName']] === env['noLoginCode']) {
        window.location.href = response['data']['data']['redirect'];
    }
    if(response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, function(error) {
    const config = error.config;
    if(!config || !config.adapter.retry) {
        return Promise.reject(error);
    }
    config.adapter.retryCount = config.adapter.retryCount || 0;
    if(config.adapter.retryCount >= config.adapter.retry) {
        return Promise.reject(error);
    }
    config.adapter.retryCount += 1;
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.adapter.retryDelay || 1000);
    });
    return backoff.then(function() {
        return service(config);
    });
});

Vue.prototype.$axios = axios;
Vue.prototype.$ajax = (option) => {
    let loadingInstance = Loading.service({
        lock: true,
        text: 'loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    return new Promise((resolve, reject) => {
        const config = Object.assign({}, option);
        service(config).then((res) => {
            loadingInstance.close();
            resolve(res.data);
        }, (err) => {
            console.log(err);
            loadingInstance.close();
            reject(err);
        }).catch((err) => {
            console.log(err);
            loadingInstance.close();
            reject(err);
        });
    });
};

export default service;
