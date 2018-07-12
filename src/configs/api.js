export default {
    baseUrl: {
        // dev: "http://rap2api.taobao.org/app/mock/17025",
        // dev: "https://10.0.18.79:8125",
        dev: "http://10.0.90.105:8080",
        test: "",
        sim: "",
        prod: ""
    },
    platformServiceFeeVerify: {// 平台服务费审核
        historyRecords: "/agency/audit/history",// 历史记录
        approve: "/first/audit/adopt",// 通过
        reject: "/first/audit/reject",// 拒绝        
    },
    materialVerify: {// 资料审核
        historyRecords: "/agency/audit/history",// 历史记录
        approve: "/first/audit/adopt",// 通过 POST {agencyId}?remark
        reject: "/first/audit/reject",// 拒绝 POST {agencyId}?remark        
    },    
    upload: "/resource",
    common: {
        employee: "/base/wkzf/person",// 员工接口，诸如BD人员、彩霞人员和一对一指导人员
        province: "/province/list",// 省份接口
        city: "/city/list",// 城市接口
        district: "/region/list",// 区域接口
        town: "/plate/list",// 板块接口
        agency: "/agency/list"//代理商列表，get
    },
    agent: {
        create: "/agency/single",// put 增
        detail: "/agency/single", // ?agencyId=2&agencyState=0 get 查
        edit: "/agency/single", // post 改
        list: "/agency/list", // 代理商列表接口
        summary:"agency/summary",//代理商汇总 post
        terminate:"agency/terminate",//终止合作 post
        againAudit:"agency/auditing",//代理商第一次通过审核后，再次编辑，需再次审核通过接口post
        againReject:"agency/reject",//代理商第一次通过审核后，再次编辑，需再次审核驳回接口post
        followUp:"agency/follow",//代理商跟进列表post,跟进详情get,添加跟进put
        firstAuditSummary:"first/audit/summary",//首次加盟汇总 post
        firstWaitAuditList:"first/audit/list",//首次加盟待审核代理商列表,post
        record:"agency/operateLog"//日志
    },
    company:{//公司
        add:"company/single",//添加公司 put
        commission:'company/commission',//分佣账号设置 post
        edit:"agency/company",//编辑公司 post
        list:"company/list",//公司列表 post为查询,get获取所有
        summary:"company/summary",//公司汇总 post
        detail:"company/single"//公司详情及分佣账号详情get
    },
    professionAudit:{
        auditList:"audit/list",//业务审核列表post
        detailContract:"audit/edit/detail",//编辑详情新旧对比get
        historyAudit:"audit/history",//历史审核记录get
        pass:"audit/adopt",//审核通过post
        reject:"audit/reject",//审核驳回post
        summary:"audit/summary"//汇总
    },
    store:{//门店
        add:"sotre/single",//添加门店 put
        edit:"agency/store",//编辑门店 post
        list:"store/list",//门店列表 post
        summary:"store/summary"//门店汇总 get
    }
};