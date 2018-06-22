export default {
    namespaced: true,
    state: {
        ratio: "",
        remark: "",        
    },
    mutations: {
        updateRatio(state, ratio) {
            state.ratio = ratio;
        },
        updateRemark(state, remark) {
            state.remark = remark;
        },
        updateItem(state, item) {                                  
            state.ratio = item.ratio;
            state.remark = item.remark;
        }
    }
};