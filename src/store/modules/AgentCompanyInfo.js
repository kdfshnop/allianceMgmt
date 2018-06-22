export default {
    namespaced: true,
    state: {
        signed: false,
        name: "",
        shortName: "",
        number: "",
        code: "",
        address: "",
        numberFileList: [],
        finisheDate: '',
        tracerName: '',
        mobile: '',
        email: '',
        idCard: '',
        remark: '',
        idCardFrontFileList: [],
        idCardBackFileList: []
    },
    mutations: {
        updateSigned(state, signed) {
            state.signed = signed;
        },
        updateName(state, name) {
            state.name = name;
        },
        updateShortName(state, shortName) {
            state.shortName = shortName;
        },
        updateNumber(state, number) {
            state.number = number;
        },
        updateCode(state, code) {
            state.code = code;
        },
        updateAddress(state, address) {
            state.address = address;
        },
        updateNumberFileList(state, numberFileList) {
            state.numberFileList = numberFileList;
        },
        updateFinishDate(state, finisheDate) {
            state.finisheDate = finisheDate;
        },
        updateTracerName(state, tracerName) {
            state.tracerName = tracerName;
        },
        updateMobile(state, mobile) {
            state.mobile = mobile;
        },
        updateIdCard(state, idCard) {
            state.idCard = idCard;
        },
        updateEmail(state, email) {
            state.email = email;
        },
        updateRemark(state, remark) {
            state.remark = remark;
        },
        updateIdCardBackFileList(state, idCardBackFileList) {
            state.idCardBackFileList = idCardBackFileList;
        },
        updateIdCardFrontFileList(state, idCardFrontFileList) {
            state.idCardFrontFileList = idCardFrontFileList;
        },
        updateItem(state, item) {                                          
            state.name = item.name;
            state.shortName = item.shortName;
            state.number = item.number;
            state.code = item.code;
            state.address = item.address;
            state.numberFileList = item.numberFileList;
            state.finisheDate = item.finisheDate;
            state.tracerName = item.tracerName;
            state.mobile = item.mobile;
            state.email = item.email;
            state.idCard = item.idCard;
            state.remark = item.remark;
            state.idCardFrontFileList = item.idCardFrontFileList;
            state.idCardBackFileList = item.idCardBackFileList;            
        }
    }
};