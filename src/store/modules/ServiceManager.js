export default {
    namespaced: true,
    state: {
        name: "",
        mobile: "",
        wechat: "",
        email: ""
    },
    mutations: {
        updateName(state, name) {
            state.name = name;
        },
        updateMobile(state, mobile) {
            state.mobile = mobile;
        },
        updateWechat(state, wechat) {
            state.wechat = wechat;
        },
        updateEmail(state, email) {
            state.email = email;
        },
        updateItem(state, item) {                        
            // Object.assign(state, item);
            state.name = item.name;
            state.mobile = item.mobile;
            state.wechat = item.wechat;
            state.email = item.email;
        }
    }
};