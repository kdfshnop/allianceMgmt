export default {
    namespaced: true,
    state: {
        contractFileList: [],
        sealed: false,
        special: '',
        promiseFileList: []
    },
    mutations: {
        updateContractFileList(state, val) {
            state.contractFileList = val;
        },
        updateSealed(state, val) {
            state.sealed = val;
        },
        updateSpecial(state, val) {
            state.special = val;
        },
        updatePromiseFileList(state, val) {
            state.promiseFileList = val;
        },
        updateItem(state, item) {                                    
            state.contractFileList = item.contractFileList;
            state.sealed = item.sealed;
            state.special = item.special;
            state.promiseFileList = item.promiseFileList;            
        }
    }
};