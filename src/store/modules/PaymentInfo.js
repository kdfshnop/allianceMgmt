export default {
    namespaced: true,
    state: {
        paymentStatus: false,
        type: "",// 付款方式
        actualPayment: "",// 实际支付
        containPayment: [],// 费用包含
        number: "",// 汇款编号
        subbankName: "",
        fileList: [],
        remark: '',
        stageNumber: 0, // 支付费用归属第几期

        planPaymentDate: "",// 预计支付时间
        brokerName: "", // 对接人姓名
        brokerMobile: "", // 对接人手机
        promiseFileList: [], // 承诺书文件
        id: "",
        brokerId: "",
    },
    mutations: {
        updateStageNumber(state, val) {
            state.stageNumber = val;
        },
        updatePlanPaymentDate(state, val){
            state.planPaymentDate = val;
        },
        updateBrokerName(state, val){
            state.brokerName = val;
        },
        updateBrokerMobile(state, val){
            state.brokerMobile = val;
        },
        updatePromiseFileList(state, val){
            state.promiseFileList = val;
        },
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
        updateId(state, val) {
            state.id = val;
        },
        updateBrokerId(state, val) {
            state.brokerId = val;
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
                        
            state.stageNumber = item.stageNumber;
            state.planPaymentDate = item.planPaymentDate || "";
            state.brokerName = item.brokerName;
            state.brokerMobile = item.brokerMobile;
            state.promiseFileList = item.promiseFileList;
            state.id = item.id;
            state.brokerId = item.brokerId;
        }
    }
};