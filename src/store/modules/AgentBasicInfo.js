export default {
    namespaced: true,
    state: {
        type: "",
        startDate: "",
        endDate: "",
        agentCity: [],
        parent: ""
    },
    mutations: {
        updateType(state, val) {
            state.type = val;
        },
        updateStartDate(state, val) {
            state.startDate = val;
        },
        updateEndDate(state, val) {
            state.endDate = val;
        },
        updateAgentCity(state, val) {
            state.agentCity = val;
        },
        updateParent(state, val) {
            state.parent = val;
        },
        updateItem(state, item) {                                    
            state.type = item.type;
            state.startDate = item.startDate;
            state.endDate = item.endDate;
            state.agentCity = item.agentCity;
            state.parent = item.parent;
        }
    }
};