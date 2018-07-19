export default {
    namespaced: true,
    state: {
        bankName: "",
        subbankName: "",      
        accountName: "",
        receiptAccount: ""  
    },
    mutations: {
        clear(state, val) {
            state.bankName= "";
            state.subbankName= "";      
            state.accountName= "";
            state.receiptAccount= "";
        },
        updateBankName(state, bankName) {
            state.bankName = bankName;
        },
        updateSubbankName(state, subbankName) {
            state.subbankName = subbankName;
        },
        updateAccountName(state, accountName) {
            state.accountName = accountName;
        },
        updateReceiptAccount(state, receiptAccount) {
            state.receiptAccount = receiptAccount;
        },
        updateItem(state, item) {                                  
            state.receiptAccount = item.receiptAccount;
            state.accountName = item.accountName;
            state.subbankName = item.subbankName;
            state.bankName = item.bankName;
        }
    }
};