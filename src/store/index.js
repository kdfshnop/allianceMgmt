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
        if(Object.prototype.toString.apply(obj1[fields[i]]) == '[object Array]'){
            if(obj1[fields[i]].length != obj2[fields[i]].length) {
                return true;
            }
        }else
        if(obj1[fields[i]] != obj2[fields[i]]) {
            return true;
        }
    }

    return false;
}

export default new Vuex.Store({
    state: {
        original: {},
        rejectedReason: ""
    },
    mutations: {
        updateRejectedReason(state, val) {
            state.rejectedReason = val;
        },
        updateOriginal(state, val) {
            state.original = val;
        }
    },
    actions: {
        getAgent(context, {agentId, agentState, cb}) {
            context.dispatch("clear");
            Vue.http.get(Vue.apiUrl.agent.detail,{
                params: {
                    agencyId: agentId,
                    agencyState: agentState
                }
            }).then((data)=>{                
                                
                // 把代理商详情接口中的数据赋值给store对象
                            
                
                function fromData(data){
                    // 基本信息
                    let agency = data.data.data.agency;
                    let cityNames = [];
                    let cityIds = [];
                    if(agency.provinceName){
                        cityNames.push(agency.provinceName);
                    }
                    if(agency.cityName){
                        cityNames.push(agency.cityName);
                    }
                    if(agency.provinceId){
                        cityIds.push(agency.provinceId);
                    }
                    if(agency.cityId){
                        cityIds.push(agency.cityId);
                    }
                    let basicInfo = {
                        status: agency.agencyState,
                        agentType: agency.agencyType,   
                        id: agency.id,
                        parent: agency.parentId,
                        startTime: agency.startTime,
                        endTime: agency.endTime,
                        tags: agency.tags,
                        updateTime: agency.updateTime,                        
                        id: agency.id,
                        cityName: cityNames,
                        agentCity: cityIds
                    };

                    // 代理区域信息
                    let region = {
                        regions: []
                    };
                    let agencyRegions = data.data.data.agencyRegions; // 代理区域信息
                    if(agencyRegions && agencyRegions.length) {
                        agencyRegions.forEach(a => { 
                            let label = [a.provinceName, a.cityName,a.regionName||"全部"];                            
                            region.regions.push({
                                label: [a.provinceName, a.cityName,a.regionName||"全部"],
                                val:[a.provinceId, a.cityId, a.regionId || -1, label],
                                id: a.id,
                                level: a.level,
                                operator: a.operator,
                                status: a.status,
                                updateTime: a.updateTime,
                                provinceId: a.provinceId,
                                cityId: a.cityId,
                                regionId: a.regionId                                
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

                    // if(c){
                    //     basicInfo.cityName = [c.provinceName, c.cityName];
                    //     basicInfo.agentCity = [c.provinceId || 42, c.cityId];
                    // }

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
                            fee: x.amount,
                            date: x.planPayTime                            
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
                            // paymentStatus: p[0].stageNumber != 0,
                            paymentStatus: p[0].paymentState == 1,
                            type: p[0].payMethod,
                            actualPayment: p[0].amount,
                            containPayment: (function(v){
                                if(!v){
                                    return [];
                                }

                                switch(v) {
                                    case 1:
                                    return [1];
                                    case 2:
                                    return [2];
                                    case 3:
                                    return [1, 2];
                                }
                                return [];
                            })(p[0].costType),
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
                                    // serviceManager.same = agency.isBdServerSame == 1;
                                break;
                                case 8:
                                    // bdManager.agentId = p.agencyId;
                                    bdManager.email = p.email;
                                    bdManager.id = p.id;
                                    bdManager.mobile = p.mobile;
                                    bdManager.name = p.name;
                                    bdManager.wechat = p.wechat;  
                                    bdManager.same = agency.isBdServerSame == 1;
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
                                    contract.sealed = r.tags == '41';
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

                    return {
                        AgentArea: region,
                        AgentBasicInfo: basicInfo,
                        AgentCommissionAccount: account,
                        AgentCommissionRatio: ratio,
                        AgentCompanyInfo: company,
                        BDManager: bdManager,
                        ContractInfo: contract,
                        CorporateInfo: corporate,
                        DividingInfo: {
                            dividingInfo: dividing
                        },
                        PartnerInfo: {
                            partnerInfo: partners
                        },
                        PaymentInfo: paymentInfo,
                        PlatformServiceFee: platformServiceFee,
                        ServiceManager: serviceManager,
                        ServiceStaffInfo: serviceStaffInfo                        
                    };
                }

                let result = fromData(data);
                let original = JSON.parse(JSON.stringify(result));

                context.commit('AgentArea/updateRegions', result.AgentArea.regions);
                context.commit('AgentBasicInfo/updateItem', result.AgentBasicInfo);
                context.commit('AgentCommissionAccount/updateItem', result.AgentCommissionAccount);
                context.commit('AgentCommissionRatio/updateItem', result.AgentCommissionRatio);
                context.commit('AgentCompanyInfo/updateItem', result.AgentCompanyInfo);
                context.commit('BDManager/updateItem', result.BDManager);
                context.commit('ContractInfo/updateItem', result.ContractInfo);
                context.commit('CorporateInfo/updateItem', result.CorporateInfo);
                context.commit('DividingInfo/updateItems', result.DividingInfo.dividingInfo);
                context.commit('PartnerInfo/updateItems', result.PartnerInfo.partnerInfo);
                context.commit('PaymentInfo/updateItem', result.PaymentInfo);
                context.commit('PlatformServiceFee/updateItem', result.PlatformServiceFee);
                context.commit('ServiceManager/updateItem', result.ServiceManager);
                context.commit('ServiceStaffInfo/updateItem', result.ServiceStaffInfo);
                context.commit("updateRejectedReason", data.data.data.rejectedReason);
                context.commit("updateOriginal", original);
                cb && cb(data.data);
            });
        },
        clear(context) {
            context.commit('AgentArea/clear');
            context.commit('AgentBasicInfo/clear');
            context.commit('AgentCommissionAccount/clear');
            context.commit('AgentCommissionRatio/clear');
            context.commit('AgentCompanyInfo/clear');
            context.commit('BDManager/clear');
            context.commit('ContractInfo/clear');
            context.commit('CorporateInfo/clear');
            context.commit('DividingInfo/clear');
            context.commit('PartnerInfo/clear');
            context.commit('PaymentInfo/clear');
            context.commit('PlatformServiceFee/clear');
            context.commit('ServiceManager/clear');
            context.commit('ServiceStaffInfo/clear');
        }
    },
    getters: {
        isChanged(state, getters) {// 用来控制编辑代理商页面中的提交审核按钮的enabled状态的
            // return getters.isServiceManagerChanged 
            //     || getters.isBDManagerChanged 
            //     || getters.isAgentCommissionRatioChanged 
            //     || getters.isAgentCommissionAccountChanged 
            //     || getters.isPlatformServiceFeeChanged
            //     || getters.isDividingInfoChanged
            //     || getters.isPaymentInfoChanged
            //     || getters.isAgentCompanyInfo
            //     || getters.isCorporateInfoChanged
            //     || getters.isContractInfoChanged
            //     || getters.isAgentBasicInfoChanged
            //     || getters.isAgentAreaChanged
            //     || getters.isServiceStaffInfoChanged
            //     || getters.isPartnerInfoChanged;
            // TODO: 以上基本可以实现，只是针对数组中对象的字段还没有比较，这个比较麻烦
            return true;
        },
        isServiceManagerChanged(state) {
            if(state.original.ServiceManager == null) {
                return false;
            }  
            let fields = ['name','mobile','email','wechat'];
            return hasDifference(fields, state.original.ServiceManager, state.ServiceManager);            
        },
        isBDManagerChanged(state) {
            if(state.original.BDManager == null) {
                return false;
            }  
            let fields = ['name', 'mobile', 'email', 'wechat', 'same'];
            return hasDifference(fields, state.original.BDManager, state.BDManager);
        },
        isAgentCommissionRatioChanged(state) {
            if(state.original.AgentCommissionRatio == null) {
                return false;
            }  
            let fields = ['ratio', 'remark'];
            return hasDifference(fields, state.original.AgentCommissionRatio, state.AgentCommissionRatio);
        },
        isAgentCommissionAccountChanged(state) {
            if(state.original.AgentCommissionAccount == null) {
                return false;
            }  
            let fields = ['bankName', 'subbankName', 'accountName', 'receiptAccount'];
            return hasDifference(fields, state.original.AgentCommissionAccount, state.AgentCommissionAccount);            
        },
        isPlatformServiceFeeChanged(state) {
            if(state.original.PlatformServiceFee == null) {
                return false;
            }  
            let fields = ['fee', 'month', 'premonth', 'prefee', 'paymentType', 'count'];
            return hasDifference(fields, state.original.PlatformServiceFee, state.PlatformServiceFee);
        },
        isDividingInfoChanged(state) {
            if(state.original.DividingInfo == null) {
                return false;
            }  
            let fields = ['dividingInfo'];// TODO: 补全DividingInfo的字段
            // if(state.original.DividingInfo == null) return false;
            // if(state.original.DividingInfo.length != state.DividingInfo.dividingInfo.length) return true;
            // for(let i = 0; i < state.original.DividingInfo.length; i++) {
            //     if(hasDifference(fields, state.original.DividingInfo[i], state.DividingInfo.dividingInfo[i])) {
            //         return true;
            //     }
            // }

            return hasDifference(fields, state.original.DividingInfo, state.DividingInfo);
        },
        isPaymentInfoChanged(state) {                
            if(state.original.PaymentInfo == null) {
                return false;
            }  
            let fields = ['paymentStatus', 
                            'type', 
                            'actualPayment', 
                            'containPayment', 
                            'number', 
                            'subbankName', 
                            'remark', 
                            'stageName', 
                            'planPaymentDate', 
                            'brokerName', 
                            'brokerMobile',
                            'promiseFileList',
                            'fileList'
                        ];

            return hasDifference(fields, state.original.PaymentInfo, state.PaymentInfo);                    
        },
        isAgentCompanyInfo(state) {  
            if(state.original.AgentCompanyInfo == null) {
                return false;
            }           
            let fields = ['signed',
                        'name',
                        'shortName',
                        'number',
                        'code',
                        'address',
                        'finishDate', 
                        'tracerName', 
                        'mobile', 
                        'email', 
                        'idCard', 
                        'remark', 
                        'tracerId', 
                        'numberFileList',
                        'idCardFrontFileList',
                        'idCardBackFileList'];
            return hasDifference(fields, state.original.AgentCompanyInfo, state.AgentCompanyInfo); 
        },
        isCorporateInfoChanged(state) {            
            if(state.original.CorporateInfo == null) {
                return false;
            }  
            let fields = ['name', 
                        'mobile', 
                        'idCard', 
                        'email', 
                        'score', 
                        'remark', 
                        'idCardFrontFileList', 
                        'idCardBackFileList', 
                        'scoreFileList'];
            return hasDifference(fields, state.original.CorporateInfo, state.CorporateInfo);
        },
        isContractInfoChanged(state) {
            if(state.original.ContractInfo == null) {
                return false;
            }  
            let fields = ['special', 
                        'sealed', 
                        'contractFileList', 
                        'promiseFileList'];
            return hasDifference(fields, state.original.ContractInfo, state.ContractInfo);
        },
        isAgentBasicInfoChanged(state) {
            if(state.original.AgentBasicInfo == null) {
                return false;
            }  
            let fields = ['agentType', 
                        'startTime', 
                        'endTime', 
                        'parent','agentCity','remark'];
            return hasDifference(fields, state.original.AgentBasicInfo, state.AgentBasicInfo);
        },
        isAgentAreaChanged(state) {
            // TODO: 只判断了数组的length，是有问题的
            if(state.original.AgentArea == null) {
                return false;
            }  
            let fields = ['regions'];
            return hasDifference(fields, state.original.AgentArea, state.AgentArea);
        },
        isServiceStaffInfoChanged(state) {            
            if(state.original.ServiceStaffInfo == null) {
                return false;
            }  
            let fields = ['name', 'department', 'title'];
            return hasDifference(fields, state.original.ServiceStaffInfo.bdInfo, state.ServiceStaffInfo.bdInfo) ||
            hasDifference(fields, state.original.ServiceStaffInfo.cxInfo, state.ServiceStaffInfo.cxInfo) ||
            hasDifference(fields, state.original.ServiceStaffInfo.directorInfo, state.ServiceStaffInfo.directorInfo);
        },
        isPartnerInfoChanged(state) {            
            if(state.original.PartnerInfo == null) {
                return false;
            }  
            let fields = ['partnerInfo'];
            return hasDifference(fields, state.original.PartnerInfo, state.PartnerInfo);            
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