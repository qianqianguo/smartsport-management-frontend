import 'isomorphic-fetch';
import lodash from 'lodash';
const isRepeatRequest = false; // 防重复提交
const lastRequestParam = [];
export default class Request {
  constructor(req) {}
  get(url) {
    return this.request({url, method: 'get'});
  }
  post(url, obj = {}) {
    const body = obj.body || obj.data;
    const headers = obj.headers;
    return this.request({url, body, method: 'post'});
  }
  request(obj) {
    // obj: url, method, body, headers
    if (lastRequestParam.find((item) => lodash.isEqual(obj, item))) {
      return new Promise(() => {});
    }
    lastRequestParam.push(obj);
    const Authorization = localStorage.getItem('smartsport/token') || '';
    const headers = {
      'Content-Type': 'application/json',
      Authorization
    };
    const silent = obj.silent;
    let timeOut;
    let url = obj.url;
    const method = obj.method || 'get';
    let body = obj.body;
    if (typeof body === 'object') {
      body = JSON.stringify(body);
    }
    Object.assign(headers, obj.headers);
    let isOk;
    return new Promise((resolve, reject) => {
      if (!silent) {
        ~lastRequestParam.indexOf(obj) && lastRequestParam.splice(lastRequestParam.indexOf(obj), 1);
        timeOut = setTimeout(() => {
          reject('请求超时');
        }, 15000);
      }
      fetch(url, {method, headers, body})
        .then((response) => {
          ~lastRequestParam.indexOf(obj) && lastRequestParam.splice(lastRequestParam.indexOf(obj), 1);
          if (!silent) {
            clearTimeout(timeOut);
          }
          if (response.ok) {
            isOk = true;
          } else {
            isOk = false;
          }
          return response.json();
        }).then((responseData) => {
          if (isOk) {
            if (responseData && responseData.status && responseData.status.code === 0) {
              resolve(responseData.data || '');
            } else if (responseData && responseData.status && responseData.status.msg) {
              reject(responseData.status.msg);
            }
          } else {
            reject(responseData);
          }
        })
        .catch((error) => {
          ~lastRequestParam.indexOf(obj) && lastRequestParam.splice(lastRequestParam.indexOf(obj), 1);
          reject(error);
        });
    });
  }
  empty() {}
}