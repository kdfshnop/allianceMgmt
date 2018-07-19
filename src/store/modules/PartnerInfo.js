export default {
    namespaced: true,
    state: {
        partnerInfo: [] // Vue不能监控到数组元素的属性变化，尴尬了，只能给数组元素重新赋值
    },
    mutations: { 
        clear(state, val) {
            state.partnerInfo = [];
        },    
        updateItem(state, obj) {    
            // 这里是单条,会有index指明是第几条，想想这个好像暂时用不到
            let index = obj.index;
            delete obj.index;
            state.partnerInfo.splice(index, 1, obj);
        },
        addItem(state, item) {
            state.partnerInfo.push(item);
        },
        updateItems(state, items) {
            state.partnerInfo = items;
        },
        removeItem(state, index) {
            state.partnerInfo.splice(index, 1);
        }
    }
};