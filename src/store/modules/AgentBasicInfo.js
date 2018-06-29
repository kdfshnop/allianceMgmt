export default {
    namespaced: true,
    state: {
        agentType: "",
        startTime: "",
        endTime: "",        
        parent: "",
        agentCity: [],
        status: "",// 代理商状态
    },
    mutations: {
        updateAgentType(state, val) {
            state.agentType = val;
        },
        updateStartTime(state, val) {
            state.startTime = val;
        },
        updateEndTime(state, val) {
            state.endTime = val;
        },
        updateAgentCity(state, val) {
            state.agentCity = val;
        },
        updateParent(state, val) {
            state.parent = val;
        },
        updateItem(state, item) {                                    
            state.agentType = item.agentType;
            state.startTime = item.startTime;
            state.endTime = item.endTime;
            state.agentCity = item.agentCity;
            state.parent = item.parent;
        }
    }
};