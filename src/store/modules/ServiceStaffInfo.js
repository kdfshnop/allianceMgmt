export default {
    namespaced: true,
    state: {
        bdInfo: {
            name: "",
            department: "",
            title: "",
            id: ''
        },
        cxInfo: {
            name: "",
            department: "",
            title: "",
            id: ''
        },
        directorInfo: {
            name: "",
            department: "",
            title: "",
            id: ''
        }
    },
    mutations: {
        updateBdInfo(state, val) {
            state.bdInfo = val;
        },
        updateCxInfo(state, val) {
            state.cxInfo = val;
        },
        updateDirectorInfo(state, val) {
            state.directorInfo = val;
        },
        updateItem(state, item) {                                    
            state.bdInfo = item.bdInfo;
            state.cxInfo = item.cxInfo;
            state.directorInfo = item.directorInfo;            
        }
    }
};