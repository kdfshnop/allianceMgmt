export default {
    namespaced: true,
    state: {
        regions: []
    },
    mutations: {
        updateRegions(state, val) {
            state.regions = val;
        },        
        updateItem(state, item) {                                    
            state.regions = item.regions;            
        },
        clear(state, val){
            state.regions = [];
        }
    }
};