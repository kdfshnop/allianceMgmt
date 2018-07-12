export default {
    namespaced: true,
    state: {
        name: "",
        mobile: "",
        wechat: "",
        email: "",
        same: "",
        id: "",
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
        updateSame(state, same) {
            state.same = same;
        },
        updateId(state, val){
            state.id = val;
        },
        updateItem(state, item) {                        
            // Object.assign(state, item);
            state.name = item.name;
            state.mobile = item.mobile;
            state.wechat = item.wechat;
            state.email = item.email;
            state.same = item.same;
            state.id = item.id;
        }
    }
};