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
        historyRecords: "",// 历史记录
        approve: "",// 通过
        reject: "",// 拒绝
        detail: "",// 详情
    },
    materialVerify: {// 资料审核
        historyRecords: "",// 历史记录
        approve: "/agency/auditing",// 通过 POST {agencyId}?remark
        reject: "/agency/reject",// 拒绝 POST {agencyId}?remark
        detail: ""// 详情
    },
    test: "",
    // upload: "http://rap2api.taobao.org/app/mock/17025/resource", //resource",// 文件上传地址
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
        list: "/agency/list", // 列表接口
    },
    company:{//公司
        add:"company/single",//添加公司 put
        commission:'company/commission',//分佣账号设置 post
        edit:"agency/company",//编辑公司 post
        list:"company/list",//公司列表 post
        summary:"company/summary"//公司汇总 get
    },
    store:{//门店
        add:"sotre/single",//添加门店 put
        edit:"agency/store",//编辑门店 post
        list:"store/list",//门店列表 post
        summary:"store/summary"//门店汇总 get
    }
};