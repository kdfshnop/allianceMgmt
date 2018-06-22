export default {
    namespaced: true,
    state: {
        dividingInfo: [] // Vue不能监控到数组元素的属性变化，尴尬了，只能给数组元素重新赋值
    },
    mutations: {        
        updateItem(state, obj) {    
            // 这里是单挑,会有index指明是第几条，想想这个好像暂时用不到
            let index = obj.index;
            delete obj.index;
            state.dividingInfo.splice(index, 1, obj);
        },
        updateItems(state, items) {
            state.dividingInfo = items;
        },
        removeItem(state, index) {
            state.dividingInfo.splice(index, 1);
        }
    }
};