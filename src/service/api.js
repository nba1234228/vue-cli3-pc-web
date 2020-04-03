import Vue from 'vue';
import '@/core/ajax';
import qs from 'qs';
const ajax = Vue.prototype.$ajax;
const baseUrl = 'http://192.168.0.103:9000';
const vue = new Vue();
const urls = {
    loginUrl: `${baseUrl}/login`,
    userMsgUrl: `${baseUrl}/users`
};
const api = {
    get(data) {
        return ajax({url: urls.userMsgUrl, method: 'get', params: data}).then(res => {
            return res;
        }, err => {
            vue.$message.warning('服务器出错，请稍候再试！');
            return err;
        });
    },
    post(data) {
        return ajax({url: urls.loginUrl, method: 'post', data: qs.stringify(data)}).then(res => {
            return res;
        }, err => {
            vue.$message.warning('服务器出错，请稍候再试！');
            return err;
        });
    }
};

export default api;
