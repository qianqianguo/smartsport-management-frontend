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
    if (lastRequestParam.find((item) => lodash.isEqual(obj, item))) {
      return new Promise(() => {});
    }
    lastRequestParam.push(obj);
    const headers = {
      'Content-Type': 'application/json'
    };
    const silent = obj.silent;
    let timeOut;
    // if (!silent){ // 是否弹出遮造层
    //   LoadingToast(true);
    // }
    let url = obj.url;
    const method = obj.method || 'get';
    let body = obj.body;
    if (typeof body === 'object') {
      body = JSON.stringify(body);
    }
    // const waitNextRequest = obj.waitNextRequest; // 遮罩层延时，防止多个请求弹出遮罩层闪一下
    Object.assign(headers, obj.headers);
    let isOk;
    return new Promise((resolve, reject) => {
      if (!silent) {
        ~lastRequestParam.indexOf(obj) && lastRequestParam.splice(lastRequestParam.indexOf(obj), 1);
        timeOut = setTimeout(() => {
          // LoadingToast(false);
          reject('请求超时');
        }, 15000);
      }
      if (!url.includes('http')) {
        url = 'http://localhost:3000/proxy' + url;
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
          // if (!silent){
          //   if (waitNextRequest){
          //     setTimeout(()=>{
          //       LoadingToast(false);
          //     }, 300);
          //   } else {
          //     LoadingToast(false);
          //   }
          // }
          if (isOk) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        })
        .catch((error) => {
          ~lastRequestParam.indexOf(obj) && lastRequestParam.splice(lastRequestParam.indexOf(obj), 1);
          // if (!silent){
          //   if (waitNextRequest){
          //     setTimeout(()=>{
          //       LoadingToast(false);
          //     }, 300);
          //   } else {
          //     LoadingToast(false);
          //   }
          // }
          reject(error);
        });
    });
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}