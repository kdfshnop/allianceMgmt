export default {
    namespaced: true,
    state: {
        agentType: "",
        startTime: "",
        endTime: "",        
        parent: "",
        agentCity: [],
        status: "",// 代理商状态
        remark: "",//
        id: "", 
    },
    mutations: {
        clear(state, val) {
            state.agentType= "";
            state.startTime= "";
            state.endTime= "";        
            state.parent= "";
            state.agentCity= [];
            state.status= "";// 代理商状态
            state.remark= "";//
            state.id= "";
        },
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
        updateRemark(state, val) {
            state.remark = val;
        },
        updateItem(state, item) {                                    
            state.agentType = item.agentType;
            state.startTime = item.startTime || "";
            state.endTime = item.endTime || "";
            state.agentCity = item.agentCity;
            state.parent = item.parent;
            state.cityName = item.cityName;
            state.remark = item.remark;
            state.id = item.id;
        }
    }
};