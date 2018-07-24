// TODO： 这个里面有很多内容应该提到一个业务处理类中去，有时间做一下

export function generateComputed(fieldName, nameInStore, updateFuncName) {
    return {
        get() {
            if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                return this.innerItem[fieldName];
            }

            return this.$store.state[nameInStore][fieldName];
        },
        set(val) {
            if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                this.innerItem[fieldName] = val;
            }else{
                this[updateFuncName](val);
            }
        }
    };   
};

export function getDateStr(date) {
    if(date instanceof Date) {
        return date.getFullYear() + '-' + padding(date.getMonth() + 1) + '-' + padding(date.getDate());
    }

    if(typeof date == 'string') {
        return date.split(' ')[0];
    }
    return date;
}

export function padding(n) {
    if(n<10) {
        return '0' + n;
    }

    return n.toString();
}

export function safeGet(obj, path, defalutVal = null) {
    let segments = path.split('.');
    let ret = obj;
    for(let s of segments) {
        ret = ret[s];
        if(ret == null) {
            return null;
        }
    }
    
    return ret === '' ? defalutVal : ret;
}

// 创建后端接口需要的资源对象
function makeResource(obj, params) {
    let ret = {
        createTime: obj.createTime,
        description: obj.description,
        fileName: obj.fileName,
        flag: obj.flag,
        id: obj.id,
        owner: obj.owner,        
        ownerType: obj.ownerType,
        resourceKey: obj.resourceKey,
        tags: obj.tags,
        updateTime: obj.updateTime
    };

    ret = Object.assign(ret, params);
    
    return ret;
}

export function generateParam(state) {
    // 从state中获取数据，生成共接口使用的参数对象，专门给创建和编辑代理商接口用的

    // 收集接口数据并发送请求
    let param = {};
    let agency = {
        isBdServerSame: 2
    };
    agency.additional = safeGet(state, "ContractInfo.special");// 合同的特殊条款
    //agency.agencyState = '';// 创建接口不应该传递这个参数
    agency.agencyType = +safeGet(state, "AgentBasicInfo.agentType");// 代理商基本信息中的代理商类型，1-城市代理商 2-区代理商
    agency.brokerageRate = safeGet(state, "AgentCommissionRatio.ratio");// 分佣比率
    agency.brokerageRemark = safeGet(state, "AgentCommissionRatio.remark");// 分佣比率备注
    //agency.companyId = '';//公司id，创建接口不应该提供
    //agency.corporate = ''; // 法人id
    agency.cost = safeGet(state, "PlatformServiceFee.fee");// 平台服务费
    agency.costMonths = safeGet(state, "PlatformServiceFee.month");// 平台服务费月数
    // agency.createTime = '';// 创建时间，创建接口不应该提供
    agency.deposit = safeGet(state, "PlatformServiceFee.prefee");// 保证金
    agency.depositMonths = safeGet(state, "PlatformServiceFee.premonth");// 保证金月数
    agency.endTime = safeGet(state, "AgentBasicInfo.endTime");// 合作结束时间
    agency.hasCompany = safeGet(state, "AgentCompanyInfo.signed") && 1 || 0;// 是否注册公司
    //agency.id = ''// 代理商id，创建接口不应该提供
    agency.isByStage = safeGet(state, "PlatformServiceFee.paymentType") == 2 && 1 || 0;// 是否分期
    agency.noCompanyRemark = safeGet(state, "AgentCompanyInfo.remark");// 未注册公司备注
    agency.parentId = safeGet(state, "AgentBasicInfo.parent"); // 上级代理id
    agency.planRegisteTime = safeGet(state, "AgentCompanyInfo.finishDate"); // 预计注册完成时间
    agency.stageCount = safeGet(state, "PlatformServiceFee.count"); // 分期期数
    agency.startTime = safeGet(state, "AgentBasicInfo.startTime"); // 合作开始时间
    //agency.status = // 代理商状态，创建接口不需要传递这个参数
    //agency.tags // 合作状态标签，创建接口不需要传递这个
    // agency.tracker = safeGet(state, "// 代理商负责跟踪人id，prd中是文本输入框，应该传递姓名而不是id
    //agency.updateTime = // 更新时间，创建接口不需要传递
    agency.wkGuidance = safeGet(state, "ServiceStaffInfo.directorInfo.id");// 悟空1对1落地指导
    agency.wkbd = safeGet(state, "ServiceStaffInfo.bdInfo.id");// bd人员id
    agency.wkcx = safeGet(state, "ServiceStaffInfo.cxInfo.id"); // 悟空彩霞服务id
    agency.operateRemark = safeGet(state, "AgentBasicInfo.remark");
    agency.id = safeGet(state, "AgentBasicInfo.id");
    
    let agencyPersons = []; // 
    let agencyRegions = []; // 代理区域信息
    let agencyStages = [];// 分期付款信息          
    let resources = [];
    let payments = [];

    // 合伙人
    safeGet(state, "PartnerInfo.partnerInfo").forEach(partner => {
         agencyPersons.push({
          //agencyId: '', // 创建接口不需要传递
          background: +partner.background,
          //createTime: // 创建接口不需要传递
          credit: +partner.credit || null,// 芝麻信用分数
          email: safeGet(partner, 'email'), // partner.email,// 邮箱
          //id: //不需要传递
          idCode: safeGet(partner, 'idCode'), // partner.idCode,// 身份证
          mobile: safeGet(partner, 'mobile'), //partner.mobile,// 手机号
          name: safeGet(partner, 'name'), //partner.name, //姓名
          remark: safeGet(partner, 'remark'), //partner.remark, //备注
          backgroundRemark: partner.background == 5 && safeGet(partner, 'backgroundRemark') || null,// 背景选择其他可以手动输入
          //wechat: '',//微信，合伙人不需要
          personType: 4,// 合伙人                
          id: safeGet(partner, 'id')
      });
    });
   
    // BD经理
    if(safeGet(state, "BDManager.same")) {// 跟服务经理一样
      agencyPersons.push({
          //agencyId: '', // 创建接口不需要传递
          // background: partner.name,// 服务经理不需要
          //createTime: // 创建接口不需要传递
          //credit: partner.credit,// 芝麻信用分数,bd经理不需要
          email: safeGet(state, "ServiceManager.email"),// 邮箱
          //id: //不需要传递
          //idCode: partner.idCode,// 身份证,服务经理不需要
          mobile: safeGet(state, "ServiceManager.mobile"),// 手机号
          name: safeGet(state, "ServiceManager.name"), //姓名
          //remark: partner.remark, //备注,服务经理不需要
          //backgroundRemark: partner.background == 5 && partner.backgroundRemark || '',// 背景选择其他可以手动输入
          wechat: safeGet(state, "ServiceManager.wechat"),//微信
          personType: 8,// 服务经理    
          id: safeGet(state, "ServiceManager.id")
      });
      agency.isBdServerSame = 1;
    } else {
        agencyPersons.push({
          //agencyId: '', // 创建接口不需要传递
          // background: partner.name,// bd经理不需要
          //createTime: // 创建接口不需要传递
          //credit: partner.credit,// 芝麻信用分数,bd经理不需要
          email: safeGet(state, "BDManager.email"),// 邮箱
          //id: //不需要传递
          //idCode: partner.idCode,// 身份证,bd经理不需要
          mobile: safeGet(state, "BDManager.mobile"),// 手机号
          name: safeGet(state, "BDManager.name"), //姓名
          //remark: partner.remark, //备注,bd经理不需要
          //backgroundRemark: partner.background == 5 && partner.backgroundRemark || '',// 背景选择其他可以手动输入
          wechat: safeGet(state, "BDManager.wechat"),//微信
          personType: 8,// bd经理  
          id: safeGet(state, "BDManager.id"),  
      });
    }   
    
    // 服务经理
    agencyPersons.push({
          //agencyId: '', // 创建接口不需要传递
          // background: partner.name,// 服务经理不需要
          //createTime: // 创建接口不需要传递
          //credit: partner.credit,// 芝麻信用分数,bd经理不需要
          email: safeGet(state, "ServiceManager.email"),// 邮箱
          //id: //不需要传递
          //idCode: partner.idCode,// 身份证,服务经理不需要
          mobile: safeGet(state, "ServiceManager.mobile"),// 手机号
          name: safeGet(state, "ServiceManager.name"), //姓名
          //remark: partner.remark, //备注,服务经理不需要
          //backgroundRemark: partner.background == 5 && partner.backgroundRemark || '',// 背景选择其他可以手动输入
          wechat: safeGet(state, "ServiceManager.wechat"),//微信
          personType: 7,// 服务经理    
          id: safeGet(state, "ServiceManager.id")
    });

    // 追踪人
    if(!safeGet(state, "AgentCompanyInfo.signed")) {// 未注册公司
        agencyPersons.push({            
            email: safeGet(state, "AgentCompanyInfo.email"),// 邮箱            
            idCode: safeGet(state, "AgentCompanyInfo.idCard"),// 身份证
            mobile: safeGet(state, "AgentCompanyInfo.mobile"),// 手机号
            name: safeGet(state, "AgentCompanyInfo.tracerName"), //姓名            
            personType: 6,// 服务经理  
            remark: safeGet(state, "AgentCompanyInfo.remark"),
            id: safeGet(state, "AgentCompanyInfo.tracerId")
        });

        agency.planRegisteTime = safeGet(state, "AgentCompanyInfo.finishDate")
    }else{// 法人
        agencyPersons.push({            
            credit: safeGet(state, "CorporateInfo.score"),
            email: safeGet(state, "CorporateInfo.email"),// 邮箱            
            idCode: safeGet(state, "CorporateInfo.idCard"),// 身份证
            mobile: safeGet(state, "CorporateInfo.mobile"),// 手机号
            name: safeGet(state, "CorporateInfo.name"), //姓名
            remark: safeGet(state, "CorporateInfo.remark"), // 备注   
            personType: 5,
            id: safeGet(state, "CorporateInfo.id"),  
        });
    }

    // 对接人，未支付时
    if(!safeGet(state, "PaymentInfo.paymentStatus")) {
        agencyPersons.push({
            // email: safeGet(state, "AgentCompanyInfo.email"),// 邮箱            
            // idCode: safeGet(state, "AgentCompanyInfo.idCard"),// 身份证
            mobile: safeGet(state, "PaymentInfo.brokerMobile"),// 手机号
            name: safeGet(state, "PaymentInfo.brokerName"), //姓名            
            personType: 9,// 服务经理  
            remark: safeGet(state, "PaymentInfo.remark"),
            id: safeGet(state, "PaymentInfo.brokerId")
        });

        payments.push({
            id: safeGet(state, "PaymentInfo.id"),
            planPayTime: safeGet(state, "PaymentInfo.planPaymentDate"),
            // stageNumber: 0
            paymentState: 2
          });
    }else{// 已支付
        // 支付记录

        let stageNumber = 1;// 默认认为不分期，所以固定是1
        if(safeGet(state, 'PlatformServiceFee.paymentType') == 2) {// 分期
            stageNumber = safeGet(state, "PaymentInfo.stageNumber");
        }

        payments.push({
            paymentState: 1,
            id: safeGet(state, "PaymentInfo.id"),
            //   agencyId: 
            amount: safeGet(state, "PaymentInfo.actualPayment"),
            // auditor: 
            costType: safeGet(state, "PaymentInfo.containPayment").reduce(function(t,v,i,a){ return t += +v}, 0),//款项类型 1.服务费 2.保证金 3.服务费+保证金 4. 佣金
            // createTime
            // expendAccount: //出款账号
            expendBank: safeGet(state, "PaymentInfo.subbankName"), //出款银行
            // id:
            // operator:
            payMethod: safeGet(state, "PaymentInfo.type"), //支付方式 1.汇款 2. 支付宝 3.其他
            paymentNumber: safeGet(state, "PaymentInfo.number"), //支付单号
    
            // receiveAccount:
            // receiveBank
            remark: safeGet(state, "PaymentInfo.remark"),//
            stageNumber: stageNumber
            // status
            // updateTime
        });
    }


    // 代理区域
    safeGet(state, "AgentArea.regions").forEach((r)=>{
        agencyRegions.push({
            //agencyId: ''// 创建接口不需要传递
            //createTime: ''// 创建接口不需要传递
            //   id: ""// 创建接口不需要传递
            level: (['', '', 3, 4])[r.val.length-1],// 区域级别，1：国家，2：省/直辖市，3：地级市，4：区、县、县级市，5：片区/板块
            //operator: ''
            regionId: r.val[r.val.length - 2] || null,// 根据level不同传递不同的意义的值，在创建接口中可以，但是在详情接口中不行
            provinceId: r.val[0],
            cityId: r.val[1], 
            id: r.id           
            //status: '' // 
          //   updateTime: ''
        });
    });

    // 分期信息
    safeGet(state, "DividingInfo.dividingInfo").forEach((d, i)=>{
        agencyStages.push({
          //   agencyId: ''
          amount: d.fee,// 金额
          // costType: '' // 不知道怎么传
          // createTime: ''
          // director: ''
          // id: ''
          planPayTime: d.date,// 预定支付时间
          stageNumber: i + 1,
          id: d.id,
          // stageState: ''
          // status: ''
          // updateTime: 

        });
    });
    
    let company = {
        abbreviation: safeGet(state, "AgentCompanyInfo.shortName"),// 公司简称
        address: safeGet(state, "AgentCompanyInfo.address"), // 公司地址
      //   businesType: // prd中没有
        cityId: safeGet(state, "AgentBasicInfo.agentCity.1"),
        cooperationEnd: safeGet(state, "AgentBasicInfo.endTime"),
        cooperationStart: safeGet(state, "AgentBasicInfo.startTime"),
      //   createTime
      //   createrId:
      //   deposite: 
      //   id: 
        licenceCode: safeGet(state, "AgentCompanyInfo.number"),
        name: safeGet(state, "AgentCompanyInfo.name"),
        organizationCode: safeGet(state, "AgentCompanyInfo.code"),

        openBankType: safeGet(state, "AgentCommissionAccount.bankName"),
        openBankBranch: safeGet(state, "AgentCommissionAccount.subbankName"),
        accountName: safeGet(state, "AgentCommissionAccount.accountName"),
        bankAccount: safeGet(state, "AgentCommissionAccount.receiptAccount"),
        id: safeGet(state, "AgentCompanyInfo.id"),
      //   status: 
      //   updateTime
    };

    let notNull = false;
    for(let key in company) {
        if(company[key] != null) {
            notNull = true;
            break;
        }
    }

    if(!notNull){
        company = null; // 如果company所有字段都是空就不传company了
    }


    // 上传文件资源
    // 1. 营业执照
    safeGet(state, "AgentCompanyInfo.numberFileList").forEach((f)=>{ 
        resources.push(makeResource(f,{
            flag: 1,
            ownerType: 2
        }));        
    });

    // 2. 身份证 需要正反面区分flag不够用？？ 而且好多个人的身份证，根本区分不出来
    // 未注册公司时，身份证正面照
    safeGet(state, "AgentCompanyInfo.idCardFrontFileList").forEach((f)=>{
        resources.push(makeResource(f,{
            flag: 2,
            ownerType: 2,
            tags: "21",
        }));         
    });
    // 未注册公司时，身份证反面照
    safeGet(state, "AgentCompanyInfo.idCardBackFileList").forEach((f)=>{
        resources.push(makeResource(f,{
            flag: 2,
            ownerType: 2,
            tags: "22",
        }));        
    });
    // 法人身份证正面照
    safeGet(state, "CorporateInfo.idCardFrontFileList").forEach((f)=>{
        resources.push(makeResource(f,{
            flag: 2,
            ownerType: 3,
            tags: "21",
        }));        
    });
    // 法人身份证反面照
    safeGet(state, "CorporateInfo.idCardBackFileList").forEach((f)=>{
        resources.push(makeResource(f,{
            flag: 2,
            ownerType: 3,
            tags: "22",
        }));       
    });

    // 3. 信用截图
    safeGet(state, "CorporateInfo.scoreFileList").forEach((f)=>{
        resources.push(makeResource(f,{
            flag: 3,
            ownerType: 3,            
        }));        
    });

    // 4. 合同
    safeGet(state, "ContractInfo.contractFileList").forEach((f)=>{
        resources.push(makeResource(f,{
            flag: 4,            
        }));        
    });
    // 5. 承诺书
    safeGet(state, "ContractInfo.promiseFileList").forEach((f)=>{
        resources.push(makeResource(f,{
            flag: 5
        }));        
    });

    // 6. 汇款凭证
    safeGet(state, "PaymentInfo.fileList").forEach((f)=>{
        resources.push(makeResource(f,{
            flag: 6
        }));        
    });
    // 7. 承诺支持书
    safeGet(state, "PaymentInfo.promiseFileList").forEach((f)=>{
        resources.push(makeResource(f,{
            flag: 7
        }));        
    });

    // 8. 附件，没见过这个类型在prd中

    param.agency = agency;
    param.agencyPersons = agencyPersons;
    param.agencyRegions = agencyRegions;
    param.agencyStages = agencyStages;
    param.company = company;// 这个内容跟agency中好多重复，不知道是不是不需要传递的？？
    param.resources = resources;
    param.payments = payments;

    return param;
}

// 用于表单验证的函数集合
export let Validator = {
    name(url, value, callback) {
        // 只能是汉字字母数字
        if(value == '' || value == null) {
            callback();
            return;
        }

        let reg = /^[0-9a-zA-Z\u4e00-\u9fa5]*$/;
    
        if(reg.test(value)) {
            callback();
        } else {
            callback(new Error('只能是汉字字母和数字!'));
        }
    },

    mobile(rule, value, callback) {
        if(value == '' || value == null) {
            callback();
            return;
        }

        // let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let reg = /^1\d{10,10}$/;
    
        if(reg.test(value)) {
            callback();
        } else {
            callback(new Error('请输入正确的手机号'));
        }
    },
    
    idCard(rule, value, callback) {
        // 验证15或18位
        if(value == '' || value == null ) {
            callback();
            return;
        }

        if(value.length != 15 && value.length != 18) {
            callback(new Error('请输入正确的身份证号'));
        } else {
            callback();
        }
    },
    
    credit(rule, value, callback) {
        if(value == '' || value == null ) {
            callback();
            return;
        }

        if(value.length > 4 || value > 9999) {
            callback(new Error('最多4个数字!'));
        } else {
            callback();
        }
    }
};