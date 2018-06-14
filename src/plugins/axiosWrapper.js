import axios from 'axios';
import apiUrl from '@/configs/api.js';
export default {    
    install(Vue){
        let UNLOGIN = 1100;
        let SUCCESS = 1;        

        let host = location.host;
        let env = host.indexOf('localhost') > -1 ? "dev" : "prod";
        for(let key in apiUrl.baseUrl){
            if(host.indexOf(key) > -1){
                env = key;
                break;
            }
        }
        axios.defaults.baseURL = apiUrl.baseUrl[env];

        Vue.http = Vue.prototype.$http = axios;
        axios.interceptors.response.use(function(res){
            // 读取res.data.status,处理未登陆逻辑
            if(res.data && res.data.status == UNLOGIN){
                 window.parent && window.parent !== window && window.parent.location.reload();                
            }

            // 读取res.data.status，除了逻辑失败错误
            if(res.data && res.data.status != SUCCESS){// 失败
                return Promise.reject(res.data);
            }
            return res;
        });
        axios.interceptors.request.use(function(config){
            // 有时候后端需要有这个头才认为是异步请求才返回JSON格式，如果不需要可以移除这个拦截器
            console.log("config:", config);
            return Object.assign(config, {headers: { 'X-Requested-With': 'XMLHttpRequest'}});
        });

        Vue.apiUrl = Vue.prototype.$apiUrl = apiUrl;
    }
};