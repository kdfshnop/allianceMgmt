import Vue from 'vue';

/**
 * 要求在每个页面组件中有一个privilegeOption的配置，是一个对象，类似
 * {
 *  "addBtn": "/storeManagement#addBtn"
 * }
 * 
 * 在模板中就可使用privileges.addBtn来控制按钮的显示了
 */
export default {
    data() {
        return {
            privileges: {

            }
        };
    },
    // 发请求获取指定按钮的权限
    created() {
        if(this.privilegeOption) {// 一个对象
            let urls = [];
            let mapping = {

            };// 快速反查url对应的key
            let privileges = {

            };
            for(let key in this.privilegeOption) {
                urls.push(this.privilegeOption[key]);
                privileges[key] = false;// 默认值都是false，、、如果本地测试改为true,否则为fasle
                mapping[this.privilegeOption[key]] = key;
            }
            Vue.http.post(Vue.apiUrl.common.privileges, {        
                urls        
            }).then((data)=>{
                if(data.data.data) {
                    let key;
                    for(let d of data.data.data) {
                        key = mapping[d.url];
                        privileges[key] = !!d.hasAuth;
                    }

                    this.privileges = privileges;
                }
            });
            // 如果是本地测试注释上部请求;
            // this.privileges = privileges;
        }
    }
};