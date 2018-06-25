export default {
    namespaced: true,
    state: {
        name: "",
        mobile: "",
        idCard: "",
        email: "",
        score: "",
        idCardFrontFileList: [],
        idCardBackFileList: [],
        scoreFileList: []
    },
    mutations: {
        updateName(state, name) {
            state.name = name;
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
        updateScore(state, score) {
            state.score = score;
        },
        updateIdCardFrontFileList(state, val) {
            state.idCardFrontFileList = val;
        },
        udpateIdCardBackFileList(state, val) {
            state.idCardBackFileList = val;
        },
        updateScoreFileList(state, val) {
            state.scoreFileList = val;
        },
        updateItem(state, item) {                                    
            state.name = item.name;
            state.mobile = item.mobile;
            state.idCard = item.idCard;
            state.email = item.email;
            state.score = item.score;
            state.idCardFrontFileList = item.idCardFrontFileList;
            state.idCardBackFileList = item.idCardBackFileList;
            state.scoreFileList = item.scoreFileList;
        }
    }
};