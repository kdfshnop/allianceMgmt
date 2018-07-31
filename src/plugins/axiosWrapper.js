import axios from 'axios';
import apiUrl from '@/configs/api.js';
import {getEnv} from '@/utils/env';
import {Message, Loading} from 'element-ui';

export default {    
    install(Vue){
        let UNLOGIN = 1100;
        let SUCCESS = 1;        

        // let host = location.host;
        // let env = host.indexOf('localhost') > -1 ? "dev" : "prod";
        // for(let key in apiUrl.baseUrl){
        //     if(host.indexOf(key) > -1){
        //         env = key;
        //         break;
        //     }
        // }
        let env = getEnv();
        let baseUrl = apiUrl.baseUrl[env];
        axios.defaults.baseURL = baseUrl;

        Vue.http = Vue.prototype.$http = axios;
        axios.interceptors.response.use(function(res){
            // 读取res.data.status,处理未登陆逻辑
            // if(res.data && res.data.status == UNLOGIN){
            //      window.parent && window.parent !== window && window.parent.location.reload();                
            // }
            // 关闭loading
            if(res.config.loading){
                res.config.loading.instance.close();
            }

            if(res.headers['content-type'].indexOf('text/html')>-1) {
                // ajax本该是json数据却返回了html，因为跳转到了登录页，这是由于登录过期了，因此重新登录
                window.parent && window.parent !== window && window.parent.location.reload();                
                return;
            }

            // 读取res.data.status，除了逻辑失败错误
            if(res.data && res.data.status != SUCCESS){// 失败
                // Vue.message.error(res.data.message || "接口失败，请稍后重试");
                Message.error(res.data.message || "接口失败，请稍后重试");
                return Promise.reject(res.data);
            }
            return res;
        });
        axios.interceptors.request.use(function(config){
            // 有时候后端需要有这个头才认为是异步请求才返回JSON格式，如果不需要可以移除这个拦截器
            // console.log("config:", config);
            // 处理loading
            if(config.loading) {
                config.loading.instance = Loading.service(config.loading);
            }            
            return Object.assign(config, {headers: { /*'X-Requested-With': 'XMLHttpRequest'*/}});
        });

        Vue.apiUrl = Vue.prototype.$apiUrl = apiUrl;
        /**
         * 虽然大部分的请求都是用axios来实现的，但是还是不能避免一些不用axios实现请求的地方，比如文件上传
         * 同时为了能够保证只有一个地方来控制请求地址，所以添加了getFullUrl来返回当前环境下对应的后端地址
         */         
        Vue.apiUrl.getFullUrl = function(url){
            return baseUrl + url;
        };
    }
};