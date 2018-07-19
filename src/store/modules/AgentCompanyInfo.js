export default {
    namespaced: true,
    state: {
        signed: false,// 是否已经注册
        name: "",// 公司名称
        shortName: "",// 公司简称
        number: "",// 营业执照号码
        code: "", // 组织结构代码
        address: "",// 公司地址
        numberFileList: [],// 营业执照的图片
        finishDate: '',// 预计注册完成时间
        tracerName: '',// 代理商负责跟踪人
        mobile: '',// 手机号
        email: '',// 邮箱
        idCard: '',// 身份证
        remark: '',// 备注
        idCardFrontFileList: [],// 身份证正面照
        idCardBackFileList: [],// 身份证背面照
        id: "",
        tracerId: "",
    },
    mutations: {
        clear(state, val) {
            state.signed= false;// 是否已经注册
            state.name= "";// 公司名称
            state.shortName= "";// 公司简称
            state.number= "";// 营业执照号码
            state.code= ""; // 组织结构代码
            state.address= "";// 公司地址
            state.numberFileList= [];// 营业执照的图片
            state.finishDate= '';// 预计注册完成时间
            state.tracerName= '';// 代理商负责跟踪人
            state.mobile= '';// 手机号
            state.email= '';// 邮箱
            state.idCard= '';// 身份证
            state.remark= '';// 备注
            state.idCardFrontFileList= [];// 身份证正面照
            state.idCardBackFileList= [];// 身份证背面照
            state.id= "";
            state.tracerId= "";
        },
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
        updateFinishDate(state, finishDate) {
            state.finishDate = finishDate;
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
        updateId(state, val) {
            state.id = val;
        },
        updateTracerId(state, val){
            state.tracerId = val;
        },
        updateItem(state, item) {                                          
            state.name = item.name;
            state.shortName = item.shortName;
            state.number = item.number;
            state.code = item.code;
            state.address = item.address;
            state.numberFileList = item.numberFileList;
            state.finishDate = item.finishDate;
            state.tracerName = item.tracerName;
            state.mobile = item.mobile;
            state.email = item.email;
            state.idCard = item.idCard;
            state.remark = item.remark;
            state.idCardFrontFileList = item.idCardFrontFileList;
            state.idCardBackFileList = item.idCardBackFileList;  
            state.signed = item.signed;    
            state.id = item.id;     
            state.tracerId = item.tracerId; 
        }
    }
};