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
        detail: "",// 详情
    },
    region: {// 省市区板块
        province: "/province/list",
        city: "/city/list",
        district: "/region/list",
        town: "/town/list"
    },
    test: "",
    upload: "",// 文件上传地址
};