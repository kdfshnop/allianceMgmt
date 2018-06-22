export default {
    namespaced: true,
    state: {
        paymentStatus: false,
        type: "",
        actualPayment: "",
        containPayment: [],
        number: "",
        subbankName: "",
        fileList: [],
        remark: '',
    },
    mutations: {
        updatePaymentStatus(state, status) {
            state.paymentStatus = status;
        },
        updateType(state, type) {
            state.type = type;
        },
        updateActualPayment(state, actualPayment) {
            state.actualPayment = actualPayment;
        },
        updateContainPayment(state, containPayment) {
            state.containPayment = containPayment;
        },
        updateNumber(state, number) {
            state.number = number;
        },        
        updateSubbankName(state, subbankName) {
            state.subbankName = subbankName;
        },        
        updateFileList(state, fileList) {
            state.fileList = fileList;
        },
        updateRemark(state, remark) {
            state.remark = remark;
        },
        updateItem(state, item) {                                                
            state.actualPayment = item.actualPayment;
            state.paymentStatus = item.paymentStatus;
            state.type = item.type;
            state.containPayment = item.containPayment;
            state.number = item.number;
            state.subbankName = item.subbankName;
            state.fileList = item.fileList;
            state.remark = item.remark;
        }
    }
};