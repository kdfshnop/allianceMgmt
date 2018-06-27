export default {
    baseUrl: {
        dev: "http://rap2api.taobao.org/app/mock/17025",
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
        approve: "",// 通过
        reject: "",// 拒绝
        detail: ""// 详情
    },
    test: "",
    upload: "/resource",// 文件上传地址
    common: {
        employee: "/wkzf/person",// 员工接口，诸如BD人员、彩霞人员和一对一指导人员
        province: "/province/list",// 省份接口
        city: "/city/list",// 城市接口
        district: "/region/list",// 区域接口
        town: "/town/list"// 板块接口
    },
    agent: {
        create: "agency/single",// put 增
        detail: "agency/single", // ?agencyId=2&agencyState=0 get 查
        edit: "agency/single" // post 改
    }
};