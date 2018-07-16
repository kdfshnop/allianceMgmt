// import axios from 'axios';
// import apiUrl from '@/configs/api.js';

// 判断组件是否有权限显示
export default {    
    privileges: [],
    install(Vue){

        Vue.setPrivileges = Vue.prototype.$setPrivileges = (v)=>{
            this.privileges = v;
        };

        Vue.hasPrivilege = Vue.prototype.$hasPrivilege = (cid)=>{
            // if(this.privileges && this.privileges.length) {
            //     for(let i = 0; i < this.privileges.length; i++) {
            //         if(this.privileges[i].url == cid) {
            //             return true;
            //         }
            //     }
            // }

            // return false;

            return true;
        };
    }
};