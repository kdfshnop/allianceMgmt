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
                        <el-form-item label="公司所属城市" prop="city">
                            <el-select v-model="form.city" placeholder="二级选择区域" filterable @change='formInfo'>
                                <el-option
                                    v-for="(item,index) in city"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-row>
                            <el-col :span="5">
                                <el-form-item label="创建时间" prop="timeStart">
                                    <el-date-picker
                                        format="yyyy-MM-dd"
                                        v-model="form.timeStart"
                                        type="date"
                                        placeholder="选择日期"
                                        style="width:150px"
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="19">
                                <el-form-item prop="timeEnd" label="至">
                                    <el-date-picker
                                        format="yyyy-MM-dd"
                                        v-model="form.timeEnd"
                                        type="date"
                                        placeholder="选择日期"
                                        style="width:150px"
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="业务" prop="business">
                            <el-select v-model="form.business" filterable>
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="新房" value="新房"></el-option>
                                <el-option label="二手房" value="二手房"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="门店地址" prop="storeAddress">
                            <el-input v-model="form.storeAddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="公司名称" prop="companyName">
                            <el-input v-model="form.companyName"></el-input>
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
                        <el-form-item label="代理商" prop="agent">
                            <el-input v-model="form.agent"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row :gutter="20">
                <el-col :span="2" :offset="11">
                    <el-button class="reset" @click="resetForm('form')">重置</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="search('form')">搜索</el-button>
                </el-col>
            </el-row>
            <div class="search-result">共搜索到 956家公司，56家有代理商，900家无代理商</div>
            <el-table :data="searInfoList" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="100" ></el-table-column>
                <el-table-column prop="name" label="城市" align="center" ></el-table-column>
                <el-table-column prop="address" label="公司全称" align="center" ></el-table-column>
                <el-table-column prop="address" label="公司简称" align="center" ></el-table-column>
                <el-table-column prop="address" label="代理商公司" align="center"></el-table-column>
                <el-table-column prop="name" label="有效期始" align="center"></el-table-column>
                <el-table-column prop="name" label="有效期止" align="center"></el-table-column>
                <el-table-column prop="name" label="bd" align="center"></el-table-column>
                <el-table-column prop="name" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="name" label="创建人" align="center"></el-table-column>
                <el-table-column prop="name" label="操作" width="300px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editorCompany(scope.$index, scope.row)" type="text">编辑|</el-button>
                        <el-button size="mini" @click="bankAccount(scope.$index, scope.row)" type="text">分佣账号设置|</el-button>
                        <el-button size="mini"  type="text" @click="firstDialogVisible = true,handleEnd(scope.$index, scope.row)">终止合作</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="门店" align="center"></el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage"
                    :page-sizes="[10, 2, 3, 400]"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
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
            <editor-company v-if="isShow" ref="editor" :currentCompanyInfo="currentCompanyInfo" :title="title" @editSuccess='editSuccess' @addSuccess='addSuccess'></editor-company>
            <!--分佣账号组件-->
            <commission ref="commission"></commission>
        </el-main>
    </el-container> 
</template>

<script>
import editorCompany from '@/components/company/_EditorCompany';
import commission from '@/components/company/_Commission';
import BreadCrumb from '@/components/common/BreadCrumb';

export default {
    name: 'CompanyManagement',
    components:{editorCompany,commission,BreadCrumb},
    data () {
        return {
            firstDialogVisible: false,//第一个终止合作弹出框
            secondDialogVisible:false,//第二个终止合作弹出框
            noJoin:'',//终止合作原因
            companyInfoIndex:'',//操作公司时该公司处于所有列表的位置
            currentCompanyInfo:'',//当前编辑的公司信息
            title:'',//判断是编辑公司还是添加公司
            isShow:false,
            // 表单查询信息
            form: {
                agent:'',//代理商
                business:'全部',//业务
                city:'',//门店所属城市
                companyName:'',//公司名称
                timeStart:'',//创建开始时间
                timeEnd:'',//创建结束时间
                storeName: '',//门店名称
                searchType:'请选择查询方式',
                searchDay:'',
                searchDate:'',
                storeAddress:'',//门店地址
                timeOver:''//到期查询
            },
            // 分页功能
            pagination:{
                currentPage:1,//默认当前页为1;
                pageSize:10,//默认显示10条
                total:400//一共有多少条数据
            },
            breadCrumb: [{text:'加盟管理'},{text: "公司管理"}],
            city:['北京','上海','广州','深圳'],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    created(){
        this.$http.get('/city/list')
            .then(function(data){
                console.log(data);
            })
            .catch(function(error){
            console.log(error)
            });
    },
    methods:{
        // 子组件添加公司成功之后，传递给父组件的值;
        addSuccess(addInfo){
            // 第一种再次发送请求，同时表单查询重置;

            //第二种
            this.tableData.unshift(addInfo);
            this.pagination.currentPage=1;
            this.pagination.pageSize=10;
            this.pagination.total++;
        },
        // 子组件编辑成功之后，传递给父组件的值;
        editSuccess(editInfo){
            // 替换原有已经被编辑的数据;
            this.tableData.splice(this.companyInfoIndex,1,editInfo);
        },
        //form表单信息改变   
        formInfo(){

        },
        resetForm(formName) {
            this.$refs.form.resetFields();
        },
        //重置表单信息   
        reset(){
            this.form= {
                agent:'',//代理商
                business:'全部',//业务
                city:'',//门店所属城市
                companyName:'',//公司名称
                timeStart:'',//创建开始时间
                timeEnd:'',//创建结束时间
                storeName: '',//门店名称
                storeAddress:'',//门店地址
                timeOver:''//到期查询
            }
        },
        //根据表单信息搜索
        search(val){
            console.log(val,1111111)
            console.log(this.form);
        },
        //每页多少条
        handleSizeChange(val) {
            this.pagination.pageSize=val;
        },
        //当前页
        handleCurrentChange(val) {
            this.pagination.currentPage=val;
        },
        // 添加公司
        addCompany(){
            // 调用子组件方法，显示对话框 
            this.title='增加公司';
            this.isShow=true;
            setTimeout(()=>{
                this.$refs.editor.open();
            },200); 
        },
        //编辑
        editorCompany(index, row){
            //操作公司时，该公司所处所有信息列表的位置;
            this.companyInfoIndex=(this.pagination.currentPage-1)*this.pagination.pageSize+index;
            // 当前编辑的公司信息;
            this.currentCompanyInfo=this.tableData[this.companyInfoIndex]; 
            this.title='编辑公司';
            this.isShow=true;//为了每天编辑组件都可以将父组件信息传递;
            // 调用子组件方法，显示对话框,用setTimeout是为了可以加载添加公司组件;
            setTimeout(()=>{
                this.$refs.editor.open();
            },200);  
        },
        //分佣账号设置 
        bankAccount(index, row){
            this.$refs.commission.open();
        },
        //终止合作,第一次弹框
        handleEnd(index,row){
        },
        //确定终止合作,第二次弹框
        endJoin(){
            //将该公司信息删除;
        },
        //点击二次对话框取消按钮，继续合作
        continueJoin(){
            this.noJoin='';
        }
    },
    computed:{
        //分页显示多少条数据
        searInfoList(){
            return this.tableData.slice((this.pagination.currentPage-1)*this.pagination.pageSize,this.pagination.currentPage*this.pagination.pageSize);
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
    .block{
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


