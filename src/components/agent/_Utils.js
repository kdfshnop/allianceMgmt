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

    return '';
}

export function padding(n) {
    if(n<10) {
        return '0' + n;
    }

    return n.toString();
}

export function safeGet(obj, path) {
    let segments = path.split('.');
    let ret = obj;
    for(let s of segments) {
        ret = ret[s];
        if(ret == null) {
            return null;
        }
    }

    return ret;
}

export function generateParam(state) {
    // 从state中获取数据，生成共接口使用的参数对象，专门给创建和编辑代理商接口用的

    // 收集接口数据并发送请求
    let param = {};
    let agency = {};    
    agency.additional = '';// 附加条款, 我并没有在prd中看到这个内容
    //agency.agencyState = '';// 创建接口不应该传递这个参数
    agency.agencyType = safeGet(state, "AgentBasicInfo.agentType");// 代理商基本信息中的代理商类型，1-城市代理商 2-区代理商
    agency.brokerageRate = safeGet(state, "AgentCommissionRatio.ratio");// 分佣比率
    agency.brokerageRemark = safeGet(state, "AgentCommissionRatio.remark");// 分佣比率备注
    //agency.companyId = '';//公司id，创建接口不应该提供
    //agency.corporate = ''; // 不知道这个字段是啥意思
    agency.cost = safeGet(state, "PlatformServiceFee.fee");// 平台服务费
    agency.costMonths = safeGet(state, "PlatformServiceFee.month");// 平台服务费月数
    // agency.createTime = '';// 创建时间，创建接口不应该提供
    agency.deposit = safeGet(state, "PlatformServiceFee.prefee");// 保证金
    agency.depositMonths = safeGet(state, "PlatformServiceFee.premonth");// 保证金月数
    agency.endTime = safeGet(state, "AgentBasicInfo.endTime");// 合作结束时间
    agency.hasCompany = safeGet(state, "AgentCompanyInfo.signed") && 1 || 0;// 是否注册公司
    //agency.id = ''// 代理商id，创建接口不应该提供
    agency.isByState = safeGet(state, "PlatformServiceFee.paymentType") == 2 && 1 || 0;// 是否分期
    agency.noCompanyRemark = safeGet(state, "AgentCompanyInfo.remark");// 未注册公司备注
    agency.parentId = safeGet(state, "AgentBasicInfo.parent"); // 上级代理id
    agency.planRegisteTime = safeGet(state, "AgentCompanyInfo.finishDate"); // 预计注册完成时间
    //agency.serviceManager = // 不知道啥意思
    agency.stageCount = safeGet(state, "PlatformServiceFee.count"); // 分期期数
    agency.startTime = safeGet(state, "AgentBasicInfo.startTime"); // 合作开始时间
    //agency.status = // 代理商状态，创建接口不需要传递这个参数
    //agency.tags // 合作状态标签，创建接口不需要传递这个
    // agency.tracker = safeGet(state, "// 代理商负责跟踪人id，prd中是文本输入框，应该传递姓名而不是id
    //agency.updateTime = // 更新时间，创建接口不需要传递
    agency.wkGuidance = safeGet(state, "ServiceStaffInfo.directorInfo.id");// 悟空1对1落地指导
    agency.wkbd = safeGet(state, "ServiceStaffInfo.bdInfo.id");// bd人员id
    agency.wkcx = safeGet(state, "ServiceStaffInfo.cxInfo.id"); // 悟空彩霞服务id
    
    let agencyPersons = []; // 
    let agencyRegions = []; // 代理区域信息
    let agencyStages = [];// 分期付款信息          
    let resources = [];
    let payments = [];

    // 合伙人
    safeGet(state, "PartnerInfo.partnerInfo").forEach(partner => {
         agencyPersons.push({
          //agencyId: '', // 创建接口不需要传递
          background: partner.name,
          //createTime: // 创建接口不需要传递
          credit: partner.credit,// 芝麻信用分数
          email: partner.email,// 邮箱
          //id: //不需要传递
          idCode: partner.idCode,// 身份证
          mobile: partner.mobile,// 手机号
          name: partner.name, //姓名
          remark: partner.remark, //备注
          backgroundRemark: partner.background == 5 && partner.backgroundRemark || '',// 背景选择其他可以手动输入
          //wechat: '',//微信，合伙人不需要
          personType: 1// 合伙人                
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
          personType: 3// 服务经理    
      });
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
          personType: 2// bd经理    
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
          personType: 3// 服务经理    
    });

    // 代理区域
    safeGet(state, "AgentArea.regions").forEach((r)=>{
        agencyRegions.push({
            //agencyId: ''// 创建接口不需要传递
            //createTime: ''// 创建接口不需要传递
            //   id: ""// 创建接口不需要传递
            level: (['', '', 4, 5])[r.val.length],// 区域级别，1：国家，2：省/直辖市，3：地级市，4：区、县、县级市，5：片区/板块
            //operator: ''
            regionId: r.val[r.val.length - 1]// 根据level不同传递不同的意义的值，在创建接口中可以，但是在详情接口中不行
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
          // stageState: ''
          // status: ''
          // updateTime: 

        });
    });
    
    let company = {
        abbreviation: safeGet(state, "AgentCompanyInfo.shortName"),// 公司简称
        address: safeGet(state, "AgentCompanyInfo.address"), // 公司地址
      //   businesType: // prd中没有
        cityId: safeGet(state, "AgentBasicInfo.agentCity.[1]"),
        cooperationEnd: safeGet(state, "AgentBasicInfo.startTime"),
        cooperationStart: safeGet(state, "AgentBasicInfo.endTime"),
      //   createTime
      //   createrId:
      //   deposite: 
      //   id: 
        name: safeGet(state, "AgentCompanyInfo.name"),
        organizationCode: safeGet(state, "AgentCompanyInfo.number"),
      //   status: 
      //   updateTime
    };

    // 支付记录
    payments.push({
      //   agencyId: 
      amount: safeGet(state, "PaymentInfo.actualPayment"),
      // auditor: 
      costType: safeGet(state, "PaymentInfo.containPayment").reduce(function(t,v,i,a){ return t += v}, 0),//款项类型 1.服务费 2.保证金 3.服务费+保证金 4. 佣金
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
      stageNumber: safeGet(state, "PaymentInfo.stageNumber"),// prd中是下拉框，下拉框怎么初始化？？
      // status
      // updateTime
    });

    // 上传文件资源
    // 1. 营业执照
    safeGet(state, "AgentCompanyInfo.numberFileList").forEach((f)=>{
        resources.push({
          //   createTime
          // description
          flag: 1,
          // id
          // owner
          // ownerType
          resourcesKey: f.key,
          // status
          // tags
          // updateTime
        });
    });

    // 2. 身份证 需要正反面区分flag不够用？？ 而且好多个人的身份证，根本区分不出来
  //   this.$store.stage.AgentCompanyInfo.fileList.forEach((f)=>{
  //       resources.push({
  //         //   createTime
  //         // description
  //         flag: 1,
  //         // id
  //         // owner
  //         // ownerType
  //         resourcesKey: f.key,
  //         // status
  //         // tags
  //         // updateTime
  //       });
  //   });

    // 3. 信用截图
    safeGet(state, "CorporateInfo.scoreFileList").forEach((f)=>{
        resources.push({
          //   createTime
          // description
          flag: 3,
          // id
          // owner
          // ownerType
          resourcesKey: f.key,
          // status
          // tags
          // updateTime
        });
    });
    // 4. 合同
    safeGet(state, "ContractInfo.contractFileList").forEach((f)=>{
        resources.push({
          //   createTime
          // description
          flag: 4,
          // id
          // owner
          // ownerType
          resourcesKey: f.key,
          // status
          // tags
          // updateTime
        });
    });
    // 5. 承诺书
    safeGet(state, "ContractInfo.promiseFileList").forEach((f)=>{
        resources.push({
          //   createTime
          // description
          flag: 5,
          // id
          // owner
          // ownerType
          resourcesKey: f.key,
          // status
          // tags
          // updateTime
        });
    });
    // 6. 汇款凭证
    safeGet(state, "PaymentInfo.fileList").forEach((f)=>{
        resources.push({
          //   createTime
          // description
          flag: 6,
          // id
          // owner
          // ownerType
          resourcesKey: f.key,
          // status
          // tags
          // updateTime
        });
    });
    // 7. 承诺支持书, 没见过这个类型在prd中

    // 8. 附件，没见过这个类型在prd中

    param.agency = agency;
    param.agencyPersons = agencyPersons;
    param.agencyRegions = agencyRegions;
    param.agencyStages = agencyStages;
    param.company = company;// 这个内容跟agency中好多重复，不知道是不是不需要传递的？？
    param.resources = resources;

    return param;
}

export function initStore(state, obj) {
    // 把代理商详情接口中的数据赋值给store对象
    
    let agency = obj.agency;
    state.AgentBasicInfo.status = agency.agencyState;
    state.AgentBasicInfo.agentType = agency.agencyType;
    state.AgentCommissionRatio.ratio = agency.brokerageRate;
    state.AgentCommissionRatio.remark = agency.brokerageRemark;    
    state.PlatformServiceFee.fee = agency.cost;
    state.PlatformServiceFee.month = agency.costMonths;
    state.PlatformServiceFee.prefee = agency.deposit;
    state.PlatformServiceFee.premonth = agency.depositMonths;    
    //agency.companyId = '';//公司id，创建接口不应该提供
    //agency.corporate = ''; // 不知道这个字段是啥意思
   
    state.AgentBasicInfo.endTiime = agency.endTime;
    state.AgentCompanyInfo.signed = agency.hasCompany == 1;
    state.AgentBasicInfo.id = agency.id;
    state.PlatformServiceFee.paymentType = agency.isByState == 1 ? 2 : 1;
    state.AgentCompanyInfo.remark = agency.noCompanyRemark;
    state.AgentBasicInfo.parent = agency.parentId;
    state.AgentCompanyInfo.finishDate = agency.planRegisteTime;
    state.PlatformServiceFee.count = agency.stageCount;
    state.AgentBasicInfo.startTime = agency.startTime;
    state.AgentBasicInfo.tags = agency.tags;
    stage.AgentBasicInfo.updateTime = agency.updateTime;
    //agency.serviceManager = // 不知道啥意思    
    //agency.status = // 代理商状态，创建接口不需要传递这个参数    
    // agency.tracker = safeGet(state, "// 代理商负责跟踪人id，prd中是文本输入框，应该传递姓名而不是id
    
    // todo: 这里需要id 名字 部门和职位
    // agency.wkGuidance = safeGet(state, "ServiceStaffInfo.directorInfo.id");// 悟空1对1落地指导
    // agency.wkbd = safeGet(state, "ServiceStaffInfo.bdInfo.id");// bd人员id
    // agency.wkcx = safeGet(state, "ServiceStaffInfo.cxInfo.id"); // 悟空彩霞服务id
    
    let agencyPersons = obj.agencyPersons; //     
    if(agencyPersons && agencyPersons.length) {
        agencyPersons.forEach(p => {
            switch(p.personType) {
                case 1:
                    state.PartnerInfo.partnerInfo.push({                        
                        agentId: p.agencyId,
                        background: p.background,
                        createTime: p.createTime,                        
                        credit: p.credit,// 芝麻信用分数
                        email: p.email,// 邮箱
                        id: p.id,
                        idCode: p.idCode,// 身份证
                        mobile: p.mobile,// 手机号
                        name: p.name, //姓名
                        remark: p.remark, //备注
                        backgroundRemark: p.backgroundRemark,// 背景选择其他可以手动输入                        
                        // personType: 1// 合伙人              
                    });
                break;
                case 2:
                    state.BDManager.agentId = p.agencyId;
                    state.BDManager.email = p.email;
                    state.BDManager.id = p.id;
                    state.BDManager.mobile = p.mobile;
                    state.BDManager.name = p.name;
                    state.BDManager.wechat = p.wechat;  
                    state.BDManager.same = p.same;                  
                break;
                case 3:
                    state.serviceManager.agentId = p.agencyId;
                    state.serviceManager.email = p.email;
                    state.serviceManager.id = p.id;
                    state.serviceManager.mobile = p.mobile;
                    state.serviceManager.name = p.name;
                    state.serviceManager.wechat = p.wechat;  
                    state.serviceManager.same = p.same;  
                break;
                case 4:

                break;
                case 5:

                break;
                case 6:

                break;
                case 7:

                break;
                case 8:

                break;
                case 9:

                break;
            }
        });
    }

    let agencyRegions = obj.agencyRegions; // 代理区域信息
    if(agencyRegions && agencyRegions.length) {
        agencyRegions.forEach(a => {
            state.AgentArea.regions.push({
                agentId: a.agencyId,
                createTime: a.createTime,
                id: a.id,
                // todo: 需要返回省/市/区数据，不能只返回区
                // level: (['', '', 4, 5])[r.val.length],// 区域级别，1：国家，2：省/直辖市，3：地级市，4：区、县、县级市，5：片区/板块
                operator: a.operator,
                // regionId: r.val[r.val.length - 1]// 根据level不同传递不同的意义的值，在创建接口中可以，但是在详情接口中不行
                status: a.status,
                updateTime: a.updateTime
            });
        });
        
    }

    let agencyStages = obj.agencyStages;// 分期付款信息  
    if(agencyStages && agencyStages.length) {
        agencyStages.forEach(a => {
            state.DividingInfo.dividingInfo.push({
                agentId: a.agencyId,
                fee: a.amount,
                // costType: '' // 不知道怎么传
                createTime: a.createTime,
                // director: ''
                id: a.id,                
                date: a.planPayTime,
                stageNumber: a.stageNumber,
                // stageState: ''
                // status: ''
                updateTime: a.updateTime
            });
        });
    }    
    
    // todo: 公司的数据要跟接口提供方了解清楚
    // let company = {
    //     abbreviation: safeGet(state, "AgentCompanyInfo.shortName"),// 公司简称
    //     address: safeGet(state, "AgentCompanyInfo.address"), // 公司地址
    //   //   businesType: // prd中没有
    //     cityId: safeGet(state, "AgentBasicInfo.agentCity.[1]"),
    //     cooperationEnd: safeGet(state, "AgentBasicInfo.startTime"),
    //     cooperationStart: safeGet(state, "AgentBasicInfo.endTime"),
    //   //   createTime
    //   //   createrId:
    //   //   deposite: 
    //   //   id: 
    //     name: safeGet(state, "AgentCompanyInfo.name"),
    //     organizationCode: safeGet(state, "AgentCompanyInfo.number"),
    //   //   status: 
    //   //   updateTime
    // };
                
    let payments = obj.payments;
    if(payments && payments.length) {
        state.PaymentInfo.actualPayment = payments[0].amount;
        state.PaymentInfo.agentId = payments[0].agencyId;
        state.PaymentInfo.createTime = payments[0].creatTime;
        state.PaymentInfo.subbankName = payments[0].expendBank;
        // todo: state.PaymentInfo.containPayment = payments[0].costType
        state.PaymentInfo.type = payments[0].payMethod;
        state.PaymentInfo.number = payments[0].paymentNumber;
        state.PaymentInfo.remark = payments[0].remark;
        state.PaymentInfo.stageNumber = payments[0].stageNumber;
    }

    let resources = obj.resources;
    if(resources && resources.length) {
        resources.forEach(r => {
            switch(r.flag) {
                case 1:
                    state.AgentCompanyInfo.numberFileList.push({
                        key: r.resourcesKey,
                        fileName: r.fineName,
                        url: r.url
                    });
                break;
                case 2:// todo: 身份证好多问题，有不只一个人的身份证文件上传
                    // state.AgentCompanyInfo.numberFileList.push({
                    //     key: r.resourcesKey,
                    //     fileName: r.fineName,
                    //     url: r.url
                    // });
                break;
                case 3:
                    state.CorporateInfo.scoreFileList.push({
                        key: r.resourcesKey,
                        fileName: r.fineName,
                        url: r.url
                    });
                break;
                case 4:
                    state.ContractInfo.contractFileList.push({
                        key: r.resourcesKey,
                        fileName: r.fineName,
                        url: r.url
                    });
                break;
                case 5:
                    state.ContractInfo.promiseFileList.push({
                        key: r.resourcesKey,
                        fileName: r.fineName,
                        url: r.url
                    });
                break;
                case 6:
                    state.PaymentInfo.fileList.push({
                        key: r.resourcesKey,
                        fileName: r.fineName,
                        url: r.url
                    });
                break;
                case 7:

                break;
                case 8:

                break;                
            }
        });
    }
}