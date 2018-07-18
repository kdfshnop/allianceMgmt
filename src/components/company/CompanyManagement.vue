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
                <el-button type="primary" @click="addCompany">+增加公司</el-button>
            </div>     
            <el-form ref="form" :model="form" label-width="180px" class="gap" label-position="right">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="公司所属城市" prop="cityList">
                            <region v-model="form.cityList" :startLevel="startLevel" :endLevel="endLevel"></region>
                        </el-form-item>
                        <el-form-item label="合作时间" prop="cooperationTime">
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
                                <el-option label="全部" value="3"></el-option>
                                <el-option label="新房" value="1"></el-option>
                                <el-option label="二手房" value="2"></el-option>
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
                                    <el-select v-model="form.searchType" filterable>
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
                                <el-form-item prop="searchDate" label-width="0" >
                                    <el-date-picker
                                        format="yyyy-MM-dd"
                                        v-model="form.timeStart"
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
                        <el-form-item label="代理商" prop="agency">
                            <el-input v-model="form.agency"></el-input>
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
                <el-table-column prop="creater" label="创建人" align="center"></el-table-column>
                <el-table-column prop="name" label="操作" width="300px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editorCompany(scope.$index, scope.row)" type="text">编辑 </el-button>
                        <el-button size="mini" @click="bankAccount(scope.$index, scope.row)" type="text">分佣账号设置 </el-button>
                        <el-button size="mini"  type="text" @click="handleEnd(scope.$index, scope.row)">终止合作</el-button>
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
                    <el-button type="primary" @click="firstDialogVisible = false,secondDialogVisible = true">以了解风险，下一步</el-button>
                </span>
            </el-dialog>
            <el-dialog title="终止公司合作" :visible.sync="secondDialogVisible" width="30%" >
                <textarea name="" id="" rows="10" placeholder="请添加终止合作原因" v-model="remark" style="width:100%;"></textarea>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="continueJoin">取 消</el-button>
                    <el-button type="primary" @click="endJoin" >确 定</el-button>
                </span>
            </el-dialog>
            <!--编辑公司组件-->
            <editor-company ref="editor" :companyId="companyId" :title="title" @editSuccess='editSuccess' @addSuccess='addSuccess'></editor-company>
            <!--分佣账号组件-->
            <commission ref="commission" :companyId="companyId"></commission>
        </el-main>
    </el-container> 
</template>

<script>
import EditorCompany from '@/components/company/_EditorCompany';
import Commission from '@/components/company/_Commission';
import BreadCrumb from '@/components/common/BreadCrumb';
import Region from '@/components/common/Region';

export default {
    name: 'CompanyManagement',
    components:{EditorCompany,Commission,BreadCrumb,Region},
    data () {
        return {
            breadCrumb: [{text:'加盟管理'},{text: "公司管理"}],//面包屑
            companyId:'',//公司Id;
            companyInfoList:[],//公司列表信息
            companyInfoIndex:'',//操作公司时该公司处于所有列表的位置
            currentCompanyInfo:'',//当前编辑的公司信息
            endLevel:2,//二级联动城市传参
            firstDialogVisible: false,//第一个终止合作弹出框
            remark:'',//终止合作原因
            startLevel:1,//二级联动城市传参
            secondDialogVisible:false,//第二个终止合作弹出框
            summary:{},//summary信息
            title:'',//判断是编辑公司还是添加公司
            // 表单查询信息
            form:{
                agency:null,//代理商名称
                businessType:'3',//公司业务类型,空为未选择，1.新房，2.二手房，3.新房＋二手房
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
    },
    methods:{
        // 子组件添加公司成功之后，传递给父组件的值;
        addSuccess(addInfo){
            // 第一种再次发送请求，同时表单查询重置;
            this.$refs.form.resetFields();
            this.form.pageSize=10;
            this.form.currentPage=1;
            this.requestList();
        },
        resetForm(formName) {
            this.$refs.form.resetFields();
        },
        //根据表单信息搜索
        search(){
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
            // this.companyInfoList.splice(this.companyInfoIndex,1,editInfo);
            this.requestList();
        },
        //分佣账号设置 
        bankAccount(index, row){
            this.companyId=row.comapnyId;
            this.$refs.commission.open();
        },
        //终止合作,第一次弹框
        handleEnd(index,row){
            this.firstDialogVisible = true,
            this.companyId=row.companyId;
            this.remark='';
        },
        //确定终止合作,第二次弹框
        endJoin(){
            this.secondDialogVisible = false;
            this.$http.post(this.$apiUrl.company.terminate+"/"+this.companyId+"?remark="+this.remark)
                .then(function(data){
                    console.log(data,'终止成功');
                })
                .catch(function(err){
                    console.log(err);
                });
        },
        //点击二次对话框取消按钮，继续合作
        continueJoin(){
            this.secondDialogVisible = false;
            this.remark='';
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
            this.$http.post(this.$apiUrl.company.list,realForm)
                .then(function(data){
                    self.companyInfoList=data.data.data.data;
                    console.log(data,'12成功');
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


