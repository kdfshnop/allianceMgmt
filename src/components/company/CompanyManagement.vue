<!--
    @页面名称：(中介)公司管理列表页
    @作者：豆亚东 (douyadong@lifang.com)
    @业务逻辑说明：
        1.
        2.        
-->
<template>
    <el-container>
        <el-main>    
            <bread-crumb :items="breadCrumb"></bread-crumb>
            <div style="text-align:right;">
                <el-button type="primary" @click="addCompany" v-show="privileges.addCompany">+增加公司</el-button>
            </div>     
            <el-form ref="form" :model="form" label-width="180px" class="gap" label-position="right">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="公司所属城市" prop="cityList">
                            <region v-model="form.cityList" :startLevel="startLevel" :endLevel="endLevel"></region>
                        </el-form-item>
                        <el-form-item label="创建时间" prop="cooperationTime">
                            <el-date-picker
                                v-model="form.cooperationTime"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="业务" prop="businessType">
                            <el-select v-model="form.businessType" filterable>
                                <el-option label="全部" value="0"></el-option>
                                <el-option label="新房" value="1"></el-option>
                                <el-option label="二手房" value="2"></el-option>
                                <el-option label="新房和二手房" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="门店地址" prop="storeAddress">
                            <el-input v-model="form.storeAddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="公司名称" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="到期查询" prop="searchType">
                                    <el-select v-model="form.searchType" filterable @change="searchType">
                                        <el-option label="请选择查询方式" value="0"></el-option>
                                        <el-option label="按即将到期天数查询" value="1"></el-option>
                                        <el-option label="按合作结束日期查询" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" v-if="form.searchType==1">
                                <el-form-item prop="searchDay" label-width="0">
                                    <el-input v-model="form.searchDay" placeholder="请输入整数"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" v-if="form.searchType==2">
                                <el-form-item prop="searchDate" label-width="0">
                                    <el-date-picker
                                        format="yyyy-MM-dd"
                                        v-model="form.searchDate"
                                        style="width:100%;"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="门店名称" prop="storeName" >
                            <el-input v-model="form.storeName"></el-input>
                        </el-form-item>
                        <el-form-item label="代理商" prop="agencyId">
                            <!--<el-input v-model="form.agency"></el-input>-->
                            <el-select v-model="form.agencyId" placeholder="请选择" @focus="agencyList" filterable :clearable="true">
                                <el-option label="暂无代理商" :value="0"></el-option>
                                <el-option
                                    v-for="item in agencyInfoList"
                                    :key="item.agencyId"
                                    :label="item.agencyCompanyName"
                                    :value="item.agencyId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row :gutter="20">
                <el-col :span="2" :offset="11">
                    <el-button class="reset" @click="resetForm">重置</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="search">搜索</el-button>
                </el-col>
            </el-row>
            <div class="search-result">共搜索到 {{summary.companyTotal}}家公司，{{summary.hATotal}}家有代理商，{{summary.nATotal}}家无代理商</div>
            <el-table :data="companyInfoList" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="100" ></el-table-column>
                <el-table-column prop="city" label="城市" align="center" ></el-table-column>
                <el-table-column prop="companyName" label="中介公司全称" align="center" ></el-table-column>
                <el-table-column prop="companyAbbreviation" label="中介公司简称" align="center" ></el-table-column>
                <el-table-column prop="agencyName" label="代理商公司" align="center"></el-table-column>
                <el-table-column prop="cooperationStart" label="有效期始" align="center"></el-table-column>
                <el-table-column prop="cooperationEnd" label="有效期止" align="center"></el-table-column>
                <el-table-column prop="bdName" label="bd" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="createrName" label="创建人" align="center"></el-table-column>
                <el-table-column prop="name" label="操作" width="300px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editorCompany(scope.$index, scope.row)" type="text" v-show="privileges.companyEdit">编辑 </el-button>
                        <el-button size="mini" @click="bankAccount(scope.$index, scope.row)" type="text" v-show="privileges.comnAccSet">分佣账号设置 </el-button>
                        <el-button size="mini"  type="text" @click="handleEnd(scope.$index, scope.row)" v-show="privileges.companyEndJoin">终止合作</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="storeNum" label="门店" align="center"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="form.currentPage"
                    :page-sizes="[10, 20, 50, 100,500]"
                    :page-size="form.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="summary.companyTotal">
                </el-pagination>
            </div>
            <el-dialog title="终止公司合作" :visible.sync="firstDialogVisible" width="30%" >
                <p>1、对公司通知合作，旗下的门店也将一起会被停止合作</p>
                <p>2、终止合作门店下的经纪人账号将会被冻结</p>
                <p>3、公司和门店被停止合作后将无法重新再被恢复</p>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="prompt">以了解风险，下一步</el-button>
                </span>
            </el-dialog>
            <!--编辑公司组件-->
            <editor-company ref="editor" :companyId="companyId" :title="title" @editSuccess='editSuccess' @addSuccess='addSuccess'></editor-company>
            <!--分佣账号组件-->
            <commission ref="commission"></commission>
        </el-main>
    </el-container> 
</template>

<script>
import EditorCompany from '@/components/company/_EditorCompany';
import Commission from '@/components/company/_Commission';
import BreadCrumb from '@/components/common/BreadCrumb';
import Region from '@/components/common/Region';
import PrivilegeMixin from '@/utils/privilege';

export default {
    name: 'CompanyManagement',
    components:{EditorCompany,Commission,BreadCrumb,Region},
    mixins: [PrivilegeMixin],
    data () {
        return {
            privilegeOption:{//权限控制
                "addCompany": "/companyManagement#addCompany",//添加公司
                "companyEdit": "/companyManagement#companyEdit",//编辑公司
                "comnAccSet": "/companyManagement#comnAccSet",//分佣账号
                "companyEndJoin": "/companyManagement#companyEndJoin"//终止合作
            },
            breadCrumb: [{text:'加盟管理'},{text: "公司管理"}],//面包屑
            agencyInfoList:[],//代理商列表
            companyId:'',//公司Id;
            companyInfoList:[],//公司列表信息
            companyInfoIndex:'',//操作公司时该公司处于所有列表的位置
            currentCompanyInfo:'',//当前编辑的公司信息
            endLevel:2,//二级联动城市传参
            firstDialogVisible: false,//第一个终止合作弹出框
            isTerminate:null,//是否已经申请终止合作;
            startLevel:1,//二级联动城市传参
            summary:{},//summary信息
            title:'',//判断是编辑公司还是添加公司
            // 表单查询信息
            form:{
                agencyId:null,//代理商id
                businessType:'0',//公司业务类型,0为全部，1.新房，2.二手房，3.新房＋二手房
                cityId:null,//所属城市Id
                cityList:[],//城市二级联动所需
                cooperationTime:null,//合作时间段形式为数组
                currentPage:1,//页码默认为1
                pageSize:10,//页面量默认为10
                name:null,//公司名称
                searchDate:null,//到期日期
                searchDay:null,//即将到期天数 
                searchType:null,//到期查询方式
                storeAddress:null,//门店地址
                storeName:null//门店名称
            }
        }
    },
    created(){
        this.requestList();
        this.agencyList();
    },
    methods:{
        // 代理商列表;
        agencyList(){
            let self=this;
            this.$http.get(this.$apiUrl.agent.list)
            .then(function(data){
                self.agencyInfoList=data.data.data;
            })
            .catch(function(err){
                console.log(err,'代理商列表失败');
            })
        },
        // prompt弹框;
        prompt(){
            let self=this;
            self.firstDialogVisible = false ;
            this.$prompt('', '终止公司合作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消', 
                inputType: "textarea",  
                inputPlaceholder: "请添加终止合作原因", 
                customClass: 'end-join', 
                inputValidator: function(val){
                    if(val&&val.length > 200) {
                        return "最多输入200个字符";
                    }else if(!val){
                        return "请填写终止合作原因";
                    }else{
                        return true;
                    }  
                }   
            }).then(({ value }) => {                                
                if(value){
                    this.$http.post(this.$apiUrl.company.terminate+"/"+this.companyId+"?remark="+value)
                    .then(function(data){
                        self.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        self.requestList();
                    })
                    .catch(function(err){
                        self.$message({
                            message: '提交失败',
                            type: 'error'
                        });
                    });
                }else{
                    self.$message({
                        message: '请填写终止合作原因',
                        type: 'warning'
                    });
                }
            });
        },
        // searchType查询默认
        searchType(){
            if(this.form.searchType==1){
                this.form.searchDay='15';
                this.form.searchDate=null;
            }else if(this.form.searchType==2){
                let date = new Date();
                let seperator1 = "-";
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                };
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                };
                this.form.searchDate = year + seperator1 + month + seperator1 + strDate;
                this.form.searchDay=null;
            }else{
                this.form.searchDay=null;
                this.form.searchDate=null;
            }
        },
        // 子组件添加公司成功之后，传递给父组件的值;
        addSuccess(addInfo){
            // 第一种再次发送请求，同时表单查询重置;
            // this.$refs.form.resetFields();
            this.resetForm();
            this.form.pageSize=10;
            this.form.currentPage=1;
            this.requestList();
        },
        resetForm() {
            // this.$refs.form.resetFields();//此处注释代码重置无法达到要求
            this.form={
                agencyId:null,//代理商名称Id
                businessType:'0',//公司业务类型,0为全部，1.新房，2.二手房，3.新房＋二手房
                cityId:null,//所属城市Id
                cityList:[],//城市二级联动所需
                cooperationTime:null,//合作时间段形式为数组
                currentPage:this.form.currentPage,//页码默认为1
                pageSize:this.form.pageSize,//页面量默认为10
                name:null,//公司名称
                searchDate:null,//到期日期
                searchDay:null,//即将到期天数 
                searchType:null,//到期查询方式
                storeAddress:null,//门店地址
                storeName:null//门店名称
            }
        },
        //根据表单信息搜索
        search(){
            this.form.currentPage=1;
            this.form.pageSize=10;
            this.requestList();
        },
        //每页多少条
        handleSizeChange(val) {
            this.form.pageSize=val;
            // 状态改变发送请求
            this.requestList();
        },
        //当前页
        handleCurrentChange(val) {
            this.form.currentPage=val;
            //状态改变发送请求
            this.requestList();
        },
        // 添加公司
        addCompany(){
            // 调用子组件方法，显示对话框 
            this.title='增加公司';            
            setTimeout(()=>{
                this.$refs.editor.open();
            },200); 
        },
        //编辑
        editorCompany(index, row){
            //操作公司时，该公司所处所有信息列表的位置;
            this.companyInfoIndex=(this.form.currentPage-1)*this.form.pageSize+index;
            // 当前编辑的公司信息;
            this.companyId=row.companyId;
            this.title='编辑公司';
            // 调用子组件方法，显示对话框,用setTimeout是为了可以加载添加公司组件;
            setTimeout(()=>{
                this.$refs.editor.open();
            },200);  
        },
        // 子组件编辑成功之后，传递给父组件的值;
        editSuccess(editInfo){
            this.requestList();
        },
        //分佣账号设置 
        bankAccount(index, row){
            this.companyId=row.companyId;
            this.$refs.commission.open(this.companyId);
        },
        //终止合作,第一次弹框
        handleEnd(index,row){
            
            this.companyId=row.companyId;
            this.isTerminate=row.isTerminate;
            if(this.isTerminate==0||this.isTerminate==2){
                this.firstDialogVisible = true;
            }else{
                if(this.isTerminate=1){
                    this.$message.warning("该公司正在审核中，请稍候再试");
                }else{
                    this.$message.warning("该公司已被终止合作");
                }
            };
        },
        // 列表信息请求公共函数
        requestList(){
            let self=this;
            // 判断是否选择了省市;
            if(this.form.cityList.length){
                this.form.cityId=this.form.cityList[1];
            };
            let realForm=Object.assign({},this.form);
            delete realForm.cityList;//删除表单中的cityList选项，因为提交数据时不需要该参数
            delete realForm.searchType;//同上
            // 获取信息列表;
            this.$http.post(this.$apiUrl.company.list,realForm,{
                loading: {
                    fullscreen: true
                }
            })
                .then(function(data){
                    self.companyInfoList=data.data.data.data;
                })
                .catch(function(err){
                    console.log(err,'失败');
                });
            // 获取summary;
            this.$http.post(this.$apiUrl.company.summary,realForm)
                .then(function(data){
                    self.summary=data.data.data;
                })
                .catch(function(err){
                    console.log(err);
                });
        }
    }
}
</script>

<style scoped>
    .el-select{
        width:100%;
    }
    .el-form-item .el-form-item__label {
        text-align: right;
    }
    .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange{
        width:100%;
    }
    .search-result{
        color:gray;
        margin-bottom: 20px;
        margin-top: 50px;
    }
    .pagination{
        margin-top: 100px;
        text-align: center;
    }
    .el-button{
        margin-left: 0 !important;
    }
    .el-dialog__footer{
        text-align: right;
    }
</style>

<style>
    /*scoped会影响prompt框的样式*/
    .end-join textarea{
        height:100px;
    }
</style>



