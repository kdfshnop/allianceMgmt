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


Vue.use(Vuex);

export default new Vuex.Store({
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
        AgentArea
    }
});