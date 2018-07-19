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

function hasDifference(fields, obj1, obj2) {
    if(obj1 == null || obj2 == null) return false;
    for(let i = 0; i < fields.length; i++) {
        if(obj1[fields[i]] != obj2[fields[i]]) {
            return true;
        }
    }

    return false;
}

export default new Vuex.Store({
    state: {
        original: {}
    },
    actions: {
        getAgent(context, {agentId, agentState, cb}) {
            Vue.http.get(Vue.apiUrl.agent.detail,{
                params: {
                    agencyId: agentId,
                    agencyState: agentState
                }
            }).then((data)=>{                
                                
                // 把代理商详情接口中的数据赋值给store对象
    
                // 基本信息
                let agency = data.data.data.agency;
                let basicInfo = {
                    status: agency.agencyState,
                    agentType: agency.agencyType,   
                    id: agency.id,
                    parent: agency.parentId,
                    startTime: agency.startTime,
                    endTime: agency.endTime,
                    tags: agency.tags,
                    updateTime: agency.updateTime,
                    agentCity: [],
                    id: agency.id
                };

                // 代理区域信息
                let region = {
                    regions: []
                };
                let agencyRegions = data.data.data.agencyRegions; // 代理区域信息
                if(agencyRegions && agencyRegions.length) {
                    agencyRegions.forEach(a => {
                        region.regions.push({
                            label: [a.provinceName, a.cityName,a.regionName||"全部"],
                            val:[a.provinceId, a.cityId, a.regionId || -1],
                            id: a.id,
                            operator: a.operator,
                            status: a.status,
                            updateTime: a.updateTime
                        });
                    });                    
                }

                // 分佣比率
                let ratio = {
                    ratio: agency.brokerageRate,
                    remark: agency.brokerageRemark
                };
                
                                    
                // 公司信息
                let c = data.data.data.company;
                let company = {
                    signed: agency.hasCompany == 1,
                    remark: agency.noCompanyRemark,
                    finishDate: agency.planRegisteTime,
                    name: c&&c.name,
                    shortName: c&&c.abbreviation,
                    number: c&&c.licenceCode,
                    code: c&&c.organizationCode,
                    address: c&&c.address,
                    numberFileList: [],
                    idCardFrontFileList: [],// 身份证正面照
                    idCardBackFileList: [],// 身份证背面照
                    id: c&&c.id
                    // 代理商负责追踪人信息放到了agencyPersons里面
                };

                if(c){
                    basicInfo.cityName = [c.provinceName, c.cityName];
                    basicInfo.agentCity = [c.provinceId || 42, c.cityId];
                }

                // 分佣账号                
                let account = {
                    bankName: c&&c.openBankType,
                    subbankName: c&&c.openBankBranch,      
                    accountName: c&&c.accountName,
                    receiptAccount: c&&c.bankAccount 
                };

                // BD经理
                // 这块内容放在了agencyPersons里面
                let bdManager = {

                };

                // 合同信息
                let contract = {
                    special: agency.additional,
                    contractFileList: [],
                    promiseFileList: [],
                    sealed: false
                    // TODO: sealed要根据资源中的字段获取
                };

                // 法人
                // 来自agencyPersons和资源
                let corporate = {
                    idCardFrontFileList: [],
                    idCardBackFileList: [],
                    scoreFileList: [],
                };

                // 分期信息
                let dividing =[];
                let s = data.data.data.agencyStages;
                s && s.forEach((x)=>{
                    dividing.push({
                        ...x,
                        fee: x.amount
                    });
                });
                
                // 合伙人
                // 在agencyPersons里面
                let partners = [];

                // 付款信息
                let paymentInfo = {
                    promiseFileList: [],
                    fileList: []                    
                };
                let p = data.data.data.payments;
                if(p && p[0]){
                    paymentInfo = {
                        paymentStatus: p[0].stageNumber > 0,
                        type: p[0].payMethod,
                        actualPayment: p[0].amount,
                        containPayment: p[0].costType||[],
                        number: p[0].paymentNumber,
                        subbankName: p[0].expendBank,
                        remark: p[0].remark,
                        stageNumber: p[0].stageNumber,
                        planPaymentDate: p[0].planPayTime,
                        promiseFileList: [],
                        fileList: [],
                        id: p[0].id
                    };  
                } 

                // 平台服务费
                let platformServiceFee = {
                    fee: agency.cost,
                    month: agency.costMonths,
                    prefee: agency.deposit,
                    premonth: agency.depositMonths,
                    paymentType: agency.isByStage == 1 ? 2: 1,
                    count: agency.stageCount
                }

                // 服务经理
                // 在agencyPersons里面
                let serviceManager = {

                };
                
                // 服务员工信息
                // 在agencyPersons里面
                let serviceStaffInfo = {
                    bdInfo: {

                    },
                    cxInfo: {

                    },
                    directorInfo: {

                    }
                }
        
                let agencyPersons = data.data.data.agencyPersons; //     
                if(agencyPersons && agencyPersons.length) {
                    agencyPersons.forEach(p => {
                        // 人员类型 1 BD人员,2 彩霞服务人,3 1对1落地指导人，4 合伙人，5 法人,6 代理商负责跟踪人,7 服务经理,8 BD经理,9 代理商对接人,10 创建人，11 审核人
                        switch(p.personType) {
                            case 1: 
                                serviceStaffInfo.bdInfo.id = p.id;
                                serviceStaffInfo.bdInfo.name = p.name;
                                serviceStaffInfo.bdInfo.department = p.departmentName;
                                serviceStaffInfo.bdInfo.title = p.positionName;
                            break;
                            case 2: 
                                serviceStaffInfo.cxInfo.id = p.id;
                                serviceStaffInfo.cxInfo.name = p.name;
                                serviceStaffInfo.cxInfo.department = p.departmentName;
                                serviceStaffInfo.cxInfo.title = p.positionName;
                            break;
                            case 3: 
                                serviceStaffInfo.directorInfo.id = p.id;
                                serviceStaffInfo.directorInfo.name = p.name;
                                serviceStaffInfo.directorInfo.department = p.departmentName;
                                serviceStaffInfo.directorInfo.title = p.positionName;
                            break;
                            case 4:
                                partners.push({                        
                                    agentId: p.agencyId,
                                    background: p.background,
                                    createTime: p.createTime,                
                                    id: p.id,
                                    credit: p.credit,// 芝麻信用分数
                                    email: p.email,// 邮箱
                                    id: p.id,
                                    idCode: p.idCode,// 身份证
                                    mobile: p.mobile,// 手机号
                                    name: p.name, //姓名
                                    remark: p.remark, //备注
                                    backgroundRemark: p.backgroundRemark,// 背景选择其他可以手动输入                        
                                    // personType: 4// 合伙人              
                                });
                            break;
                            case 5:
                                corporate.id = p.id;
                                corporate.name = p.name;
                                corporate.mobile = p.mobile;
                                corporate.idCard = p.idCode;
                                corporate.email = p.email;
                                corporate.score = p.credit;
                                corporate.remark = p.remark;   
                            break;
                            case 6:
                                company.tracerName = p.name;
                                company.mobile = p.mobile;
                                company.email = p.email;
                                company.idCard = p.idCode;
                                company.tracerId = p.id;
                            break;
                            case 7:
                                // serviceManager.agentId = p.agencyId;
                                serviceManager.email = p.email;
                                serviceManager.id = p.id;
                                serviceManager.mobile = p.mobile;
                                serviceManager.name = p.name;
                                serviceManager.wechat = p.wechat;  
                                // serviceManager.same = p.same;
                            break;
                            case 8:
                                // bdManager.agentId = p.agencyId;
                                bdManager.email = p.email;
                                bdManager.id = p.id;
                                bdManager.mobile = p.mobile;
                                bdManager.name = p.name;
                                bdManager.wechat = p.wechat;  
                                bdManager.same = p.same;                  
                            break;
                            case 9:
                                paymentInfo.brokerName = p.name;
                                paymentInfo.brokerMobile = p.mobile;     paymentInfo.remark = p.remark;
                                paymentInfo.brokerId = p.id;    
                            break;                            
                            case 10:

                            break;
                            case 11: 

                            break;
                        }
                    });
                }                
                
                let resources = data.data.data.resources;
                if(resources && resources.length) {                    
                    resources.forEach(r => {
                        let x = {                            
                            url: r.url,
                            ...r
                        };
                        // 标识 1 营业执照，2身份证, 3 信用截图，4 合同，5 承诺书，6 汇款凭证，7 承诺支付书
                        switch(r.flag) {
                            case 1:
                                company.numberFileList.push(x);
                            break;
                            case 2:// todo: 身份证好多问题，有不只一个人的身份证文件上传
                                // 所有者类型 1 代理商，2 公司，3 法人，4 代理商负责跟踪人，5 代理商对接人
                                switch(r.ownerType){
                                    case 1:
                                        
                                    break;
                                    case 2:
                                        if(r.tags == '21') {
                                            company.idCardFrontFileList.push(x);
                                        }
                                        if(r.tags == '22') {
                                            company.idCardBackFileList.push(x);
                                        }
                                    break;
                                    case 3:
                                        if(r.tags == '21') {
                                            corporate.idCardFrontFileList.push(x);
                                        }
                                        if(r.tags == '22') {
                                            corporate.idCardBackFileList.push(x);
                                        }
                                    break;
                                }
                            break;
                            case 3:
                                corporate.scoreFileList.push(x);
                            break;
                            case 4:// 合同
                                contract.contractFileList.push(x);
                                // 判断是否盖章
                                contract.sealed = r.tags == '42';
                            break;
                            case 5:
                                contract.promiseFileList.push(x);
                            break;
                            case 6:
                                paymentInfo.fileList.push(x);
                            break;
                            case 7:
                                paymentInfo.promiseFileList.push(x);
                            break;
                            case 8:

                            break;                
                        }
                    });
                }
                

                context.commit('AgentArea/updateRegions', region.regions);
                context.commit('AgentBasicInfo/updateItem', basicInfo);
                context.commit('AgentCommissionAccount/updateItem', account);
                context.commit('AgentCommissionRatio/updateItem', ratio);
                context.commit('AgentCompanyInfo/updateItem', company);
                context.commit('BDManager/updateItem', bdManager);
                context.commit('ContractInfo/updateItem', contract);
                context.commit('CorporateInfo/updateItem', corporate);
                context.commit('DividingInfo/updateItems', dividing);
                context.commit('PartnerInfo/updateItems', partners);
                context.commit('PaymentInfo/updateItem', paymentInfo);
                context.commit('PlatformServiceFee/updateItem', platformServiceFee);
                context.commit('ServiceManager/updateItem', serviceManager);
                context.commit('ServiceStaffInfo/updateItem', serviceStaffInfo);
                cb && cb(data.data);
            });
        }
    },
    getters: {
        isChanged() {// 用来控制编辑代理商页面中的提交审核按钮的enabled状态的
            // return isServiceManagerChanged 
            //     || isBDManagerChanged 
            //     || isAgentCommissionRatioChanged 
            //     || isAgentCommissionAccountChanged 
            //     || isPlatformServiceFeeChanged
            //     || isDividingInfoChanged
            //     || isPaymentInfoChanged
            //     || isAgentCompanyInfo
            //     || isCorporateInfoChanged
            //     || isContractInfoChanged
            //     || isAgentBasicInfoChanged
            //     || isAgentAreaChanged
            //     || isServiceStaffInfoChanged
            //     || isPartnerInfoChanged;
            return false;

        },
        isServiceManagerChanged(state) {
            let fields = ['name','mobile','email','wechat'];
            return hasDifference(fields, state.original.ServiceManager, state.ServiceManager);            
        },
        isBDManagerChanged(state) {
            let fields = ['name', 'mobile', 'email', 'wechat'];
            return hasDifference(fields, state.original.BDManager, state.BDManager);
        },
        isAgentCommissionRatioChanged(state) {
            let fields = ['ratio', 'remark'];
            return hasDifference(fields, state.original.AgentCommissionRatio, state.AgentCommissionRatio);
        },
        isAgentCommissionAccountChanged(state) {
            let fields = ['bankName', 'subbankName', 'accountName', 'receiptAccount'];
            return hasDifference(fields, state.original.AgentCommissionAccount, state.AgentCommissionAccount);            
        },
        isPlatformServiceFeeChanged(state) {
            let fields = ['fee', 'month', 'premonth', 'prefee', 'paymentType', 'count'];
            return hasDifference(fields, state.original.PlatformServiceFee, state.PlatformServiceFee);
        },
        isDividingInfoChanged(state) {
            let fields = [''];// TODO: 补全DividingInfo的字段
            if(state.original.DividingInfo == null) return false;
            if(state.original.DividingInfo.length != state.DividingInfo.dividingInfo.length) return true;
            for(let i = 0; i < state.original.DividingInfo.length; i++) {
                if(hasDifference(fields, state.original.DividingInfo[i], state.DividingInfo.dividingInfo[i])) {
                    return true;
                }
            }

            return false;
        },
        isPaymentInfoChanged(state) {
            /**
             * paymentStatus: false,
                type: "",
                actualPayment: "",
                containPayment: [],// 费用包含
                number: "",
                subbankName: "",
                fileList: [],
                remark: '',
                stageNumber: 0, // 支付费用归属第几期

                planPaymentDate: "",// 预计支付时间
                brokerName: "", // 对接人姓名
                brokerMobile: "", // 对接人手机
                promiseFileList: "", // 承诺书文件

             * 
             */          
            if(state.original.PaymentInfo == null) {
                return false;
            }  
            let fields = ['paymentStatus', 'type', 'actualPayment', 'containPayment', 'number', 'subbankName', 'remark', 'stageName', 'planPaymentDate', 'brokerName', 'brokerMobile'];

            if(hasDifference(fields, state.original.PaymentInfo, state.PaymentInfo)) {
                return true;
            }

            if(state.original.PaymentInfo.fileList == null || state.PaymentInfo.fileList == null) {
                return false;
            }

            if(state.original.PaymentInfo.promiseFileList == null || state.PaymentInfo.promiseFileList == null) {
                return false;
            }

            if(state.original.PaymentInfo.fileList.length != state.PaymentInfo.fileList.length) {
                return true;
            }
            
            if(state.original.PaymentInfo.promiseFileList.length != state.PaymentInfo.promiseFileList.length) {
                return true;
            }
            
            // TODO: 比较fileList和promiseFileList中的字段

            return false;
        },
        isAgentCompanyInfo() {

        },
        isCorporateInfoChanged() {

        },
        isContractInfoChanged() {

        },
        isAgentBasicInfoChanged() {

        },
        isAgentAreaChanged() {

        },
        isServiceStaffInfoChanged() {

        },
        isPartnerInfoChanged() {

        }
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