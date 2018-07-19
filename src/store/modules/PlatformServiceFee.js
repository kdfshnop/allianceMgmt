export default {
    namespaced: true,
    state: {
        fee: "",
        month: "",
        prefee: "",
        premonth: "",
        paymentType: "2",
        count: "",
        // dividingInfo: []
    },
    mutations: {
        clear(state, val) {
            state.fee= "";
            state.month= "";
            state.prefee= "";
            state.premonth= "";
            state.paymentType= "2";
            state.count= "";
        },
        updateFee(state, fee) {
            state.fee = fee;
        },
        updateMonth(state, month) {
            state.month = month;
        },
        updatePrefee(state, prefee) {
            state.prefee = prefee;
        },
        updatePremonth(state, premonth) {
            state.premonth = premonth;
        },
        updatePaymentType(state, paymentType) {
            state.paymentType = paymentType;
        },
        updateCount(state, count) {
            state.count = count;
        },
        // updateDividingInfo(state, dividingInfo) {
        //     state.dividingInfo = dividingInfo;
        // },
        updateItem(state, item) { 
            state.fee = item.fee;
            state.month = item.month;                                   
            state.prefee = item.prefee;
            state.premonth = item.premonth;
            state.paymentType = item.paymentType;
            state.count = item.count;
            // state.dividingInfo = item.dividingInfo;
        }
    }
};