export default {
    namespaced: true,
    state: {
        bdInfo: {
            name: "",
            department: "",
            title: ""
        },
        cxInfo: {
            name: "",
            department: "",
            title: ""
        },
        directorInfo: {
            name: "",
            department: "",
            title: ""
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