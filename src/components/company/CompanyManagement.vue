<template>
    <el-container>
        <el-main>    
            <bread-crumb :items="breadCrumb"></bread-crumb>
            <div style="text-align:right;">
                <el-button type="primary" @click="addCompany">+增加公司</el-button>
            </div>     
            <el-form ref="form" :model="form" label-width="180px" class="gap-2">
                <el-row >
                    <el-col :span="12">
                        <el-form-item label="公司所属城市" prop="cityList">
                            <region v-model="form.cityList" :startLevel="startLevel" :endLevel="endLevel"></region>
                        </el-form-item>
                        <el-row>
                            <el-col :span="5">
                                <el-form-item label="创建时间" prop="corporateStart">
                                    <el-date-picker
                                        format="yyyy-MM-dd"
                                        v-model="form.corporateStart"
                                        type="date"
                                        placeholder="选择日期"
                                        style="width:150px"
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="19">
                                <el-form-item prop="corporateEnd" label="至">
                                    <el-date-picker
                                        format="yyyy-MM-dd"
                                        v-model="form.corporateEnd"
                                        type="date"
                                        placeholder="选择日期"
                                        style="width:150px"
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="业务" prop="businessType">
                            <el-select v-model="form.businessType" filterable>
                                <el-option label="新房和二手房" value="3"></el-option>
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
                                <el-form-item prop="searchDay" class="expire">
                                    <el-input v-model="form.searchDay" placeholder="请输入整数" style="width:200px;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" v-if="form.searchType==2">
                                <el-form-item prop="searchDate" class="expire">
                                    <el-date-picker
                                        format="yyyy-MM-dd"
                                        v-model="form.timeStart"
                                        type="date"
                                        placeholder="选择日期"
                                        style="width:200px"
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        
                        <el-form-item label="门店名称" prop="storeName">
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
            <div class="search-result">共搜索到 956家公司，56家有代理商，900家无代理商</div>
            <el-table :data="searInfoList" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="100" ></el-table-column>
                <el-table-column prop="city" label="城市" align="center" ></el-table-column>
                <el-table-column prop="name" label="公司全称" align="center" ></el-table-column>
                <el-table-column prop="abbreviation" label="公司简称" align="center" ></el-table-column>
                <el-table-column prop="operator" label="代理商公司" align="center"></el-table-column>
                <el-table-column prop="corporateStart" label="有效期始" align="center"></el-table-column>
                <el-table-column prop="corporateEnd" label="有效期止" align="center"></el-table-column>
                <el-table-column prop="operator" label="bd" align="center"></el-table-column>
                <el-table-column prop="setUpTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="corporate" label="创建人" align="center"></el-table-column>
                <el-table-column prop="name" label="操作" width="300px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editorCompany(scope.$index, scope.row)" type="text">编辑|</el-button>
                        <el-button size="mini" @click="bankAccount(scope.$index, scope.row)" type="text">分佣账号设置|</el-button>
                        <el-button size="mini"  type="text" @click="firstDialogVisible = true,handleEnd(scope.$index, scope.row)">终止合作</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="storeAccount" label="门店" align="center"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="form.currentPage"
                    :page-sizes="[10, 20, 50, 100,500]"
                    :page-size="form.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
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
                <textarea name="" id="" rows="10" placeholder="请添加终止合作原因" v-model="noJoin" style="width:100%;"></textarea>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="secondDialogVisible = false,continueJoin()">取 消</el-button>
                    <el-button type="primary" @click="secondDialogVisible = false,endJoin()" >确 定</el-button>
                </span>
            </el-dialog>
            <!--编辑公司组件-->
            <editor-company ref="editor" :currentCompanyInfo="currentCompanyInfo" :title="title" @editSuccess='editSuccess' @addSuccess='addSuccess'></editor-company>
            <!--分佣账号组件-->
            <commission ref="commission" :currentCompanyInfo="currentCompanyInfo" ></commission>
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
            startLevel:1,//二级联动城市传参
            endLevel:2,//二级联动城市传参
            firstDialogVisible: false,//第一个终止合作弹出框
            secondDialogVisible:false,//第二个终止合作弹出框
            noJoin:'',//终止合作原因
            companyInfoIndex:'',//操作公司时该公司处于所有列表的位置
            currentCompanyInfo:'',//当前编辑的公司信息
            title:'',//判断是编辑公司还是添加公司
            total:400,
            // 表单查询信息
            form:{
                agency:'',//代理商
                businessType:'',//房源类型,空为未选择，1.新房，2.二手房，3.新房＋二手房
                cityId:'',//所属城市Id
                cityList:[],//城市二级联动所需
                corporateStart:'',//合作开始时间
                corporateEnd:'',//合作结束时间
                currentPage:1,//默认当前页为1
                name:'',//公司名称
                pageSize:10,//默认显示10条信息
                provinceId:'',//省份Id
                searchDate:'',//到期日期
                searchDay:'',//即将到期天数 
                searchType:'',//到期查询方式
                storeAddress:'',//门店地址
                storeName:''//门店名称
            },
            breadCrumb: [{text:'加盟管理'},{text: "公司管理"}],//面包屑
            tableData: [{
                city: '北京',
                name: '上海好居科技有限公司',
                address: '上海市长宁区 996 弄',
                abbreviation:'悟空找房',
                corporateStart:'2018-8-8',
                corporateEnd:'2018-9-9',
                operator:'cc',
                corporate:'dd',
                setUpTime:'2015-09-02',
                storeAccount:10
                }, {
                    city: '上海',
                    name: '上海有限公司好居科技有限公司',
                    address: '上区 996 弄海市长宁',
                    abbreviation:'悟空找房',
                    corporateStart:'3000-8-8',
                    corporateEnd:'2080-9-9',
                    operator:'mm',
                    corporate:'qq',
                    setUpTime:'2015-09-02',
                    storeAccount:100
                }, {
                    city: '上海',
                    name: '上海有限公司好居科技有限公司',
                    address: '上区 996 弄海市长宁',
                    abbreviation:'悟空找房',
                    corporateStart:'3000-8-8',
                    corporateEnd:'2080-9-9',
                    operator:'mm',
                    corporate:'qq',
                    setUpTime:'2015-09-02',
                    storeAccount:100
                }, {
                    city: '上海',
                    name: '上海有限公司好居科技有限公司',
                    address: '上区 996 弄海市长宁',
                    abbreviation:'悟空找房',
                    corporateStart:'3000-8-8',
                    corporateEnd:'2080-9-9',
                    operator:'mm',
                    corporate:'qq',
                    setUpTime:'2015-09-02',
                    storeAccount:100
                }]
        }
    },
    created(){
        this.requestList();
        // 获取summary信息
        this.$http.get(this.$apiUrl.company.summary)
        .then(function(data){
            console.log(data,'summary成功');
        })
        .catch(function(err){
            console.log(err,'summary失败');
        })
    },
    methods:{
        // 子组件添加公司成功之后，传递给父组件的值;
        addSuccess(addInfo){
            // 第一种再次发送请求，同时表单查询重置;

            //第二种
            this.tableData.unshift(addInfo);
            this.form.currentPage=1;
            this.form.pageSize=10;
            this.total++;
        },
        resetForm(formName) {
            this.$refs.form.resetFields();
        },
        //根据表单信息搜索
        search(val){
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
            console.log(row,'编辑信息')
            //操作公司时，该公司所处所有信息列表的位置;
            this.companyInfoIndex=(this.form.currentPage-1)*this.form.pageSize+index;
            // 当前编辑的公司信息;
            this.currentCompanyInfo=row;
            this.title='编辑公司';
            // 调用子组件方法，显示对话框,用setTimeout是为了可以加载添加公司组件;
            setTimeout(()=>{
                this.$refs.editor.open();
            },200);  
        },
        // 子组件编辑成功之后，传递给父组件的值;
        editSuccess(editInfo){
            // 替换原有已经被编辑的数据;
            this.tableData.splice(this.companyInfoIndex,1,editInfo);
        },
        //分佣账号设置 
        bankAccount(index, row){
            this.currentCompanyInfo=row;
            this.$refs.commission.open();
        },
        //终止合作,第一次弹框
        handleEnd(index,row){
            this.noJoin='';
        },
        //确定终止合作,第二次弹框
        endJoin(){
            //将该公司信息删除;
        },
        //点击二次对话框取消按钮，继续合作
        continueJoin(){
            this.noJoin='';
        },
        // 列表信息请求公共函数
        requestList(){
            // 判断是否选择了省市;
            if(this.form.cityList.length){
                this.form.provinceId=this.form.cityList[0];
                this.form.cityId=this.form.cityList[1];
            };
            let realForm=Object.assign({},this.form);
            delete realForm.cityList;//删除表单中的cityList选项，因为提交数据时不需要该参数
            delete realForm.searchType;//同上
            console.log(realForm,1111111111111)
            this.$http.post(this.$apiUrl.company.list,realForm)
                .then(function(data){
                    console.log(data,'成功');
                })
                .catch(function(err){
                    console.log(err,'失败');
                })
        }
    },
    computed:{
        //分页显示多少条数据
        searInfoList(){
            return this.tableData.slice((this.form.currentPage-1)*this.form.pageSize,this.form.currentPage*this.form.pageSize);
        }
    }
}
</script>

<style>
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
    .expire .el-form-item__content{
        margin-left: 0 !important;
    }
</style>


