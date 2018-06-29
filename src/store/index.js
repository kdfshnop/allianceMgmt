import Vuex from 'vuex';
import Vue from 'vue';
import ServiceManager from './modules/ServiceManager';
import BDManager from './modules/BDManager';
import AgentCommissionRatio from './modules/AgentCommissionRatio';
import AgentCommissionAccount from './modules/AgentCommissionAccount';
import PlatformServiceFee from './modules/PlatformServiceFee';
import DividingInfo from './modules/DividingInfo';
import PaymentInfo from './modules/PaymentInfo';
import AgentCompanyInfo from './modules/AgentCompanyInfo';
import CorporateInfo from './modules/CorporateInfo';
import ContractInfo from './modules/ContractInfo';
import AgentBasicInfo from './modules/AgentBasicInfo';
import AgentArea from './modules/AgentArea';
import ServiceStaffInfo from './modules/ServiceStaffInfo';
import PartnerInfo from './modules/PartnerInfo';



Vue.use(Vuex);

export default new Vuex.Store({
    store: {
        isChanged: false,// 用来控制编辑代理商页面中的提交审核按钮的enabled状态的
    },
    modules: {
        ServiceManager,
        BDManager,
        AgentCommissionRatio,
        AgentCommissionAccount,
        PlatformServiceFee,
        DividingInfo,
        PaymentInfo,
        AgentCompanyInfo,
        CorporateInfo,
        ContractInfo,
        AgentBasicInfo,
        AgentArea,
        ServiceStaffInfo,
        PartnerInfo
    }
});