<template>
    <el-container>
        <el-main>    
            <bread-crumb :items="breadCrumb"></bread-crumb>
            <div style="text-align:right;">
                <el-button type="primary" @click="addAgent">添加代理商</el-button>
            </div>     
            <el-form ref="form" :model="form" label-width="180px" class="gap-2">
                <el-row >
                    <el-col :span="12">
                        <el-form-item label="门店所属城市" prop="city">
                            <el-select v-model="form.city" placeholder="二级选择区域" filterable>
                                <el-option
                                    v-for="(item,index) in city"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="合作开始时间" prop="storeAddress">
                            <el-date-picker
                                        format="yyyy-MM-dd"
                                        v-model="form.timeStart"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                        </el-form-item>
                        <el-form-item label="代理商类型" prop="business">
                            <el-select v-model="form.business" filterable>
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="城市代理" value="城市代理"></el-option>
                                <el-option label="区域代理" value="区域代理"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="到期查询" prop="storeAddress">
                            <el-input v-model="form.storeAddress" style="width:220px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合作状态" prop="companyName">
                            <el-select v-model="form.business" filterable>
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="待审批" value="待审批"></el-option>
                                <el-option label="合作中" value="合作中"></el-option>
                                <el-option label="已驳回" value="已驳回"></el-option>
                                <el-option label="已到期" value="已到期"></el-option>
                                <el-option label="半年到期" value="半年到期"></el-option>
                                <el-option label="待补足资料" value="待补足资料"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="合作结束时间" prop="storeAddress">
                            <el-date-picker
                                        format="yyyy-MM-dd"
                                        v-model="form.timeStart"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="代理商公司名称" prop="storeName">
                            <el-input v-model="form.storeName" style="width:220px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-col :span="2" :offset="10">
                    <el-button class="reset" @click="resetForm('form')">重置</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="search('form')">搜索</el-button>
                </el-col>
            </el-row>
            <div class="search-result">共搜索到 956家公司，56家有代理商，900家无代理商</div>
            <el-table :data="searInfoList" border style="width: 100%">
                <el-table-column prop="date" label="代理商公司名称" align="center" ></el-table-column>
                <el-table-column prop="name" label="城市" align="center" ></el-table-column>
                <el-table-column prop="address" label="代理商类型" align="center" ></el-table-column>
                <el-table-column prop="address" label="代理区域数量" align="center" ></el-table-column>
                <el-table-column prop="address" label="门店数量" align="center"></el-table-column>
                <el-table-column prop="name" label="合作状态" align="center"></el-table-column>
                <el-table-column prop="name" label="合作开始" align="center"></el-table-column>
                <el-table-column prop="name" label="合作结束" align="center"></el-table-column>
                <el-table-column prop="name" label="操作" width="300px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="detail(scope.$index, scope.row)" type="text" v-if="false">详情|</el-button>
                        <el-tooltip placement="right" effect="light" v-if="true">
                            <el-button type="text" size="mini">更多</el-button>
                            <div slot="content" @click="edit(scope.$index)">编辑</div>
                            <div slot="content" class="cz" @click="followUp" >跟进</div>
                            <div slot="content" class="cz" @click="endJoin">终止合作</div>
                        </el-tooltip>
                        <el-button v-if="false" size="mini" @click="reSubmit(scope.$index, scope.row)" type="text">重新提交</el-button>
                    </template>
                </el-table-column>
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
            <el-dialog title="!终止合作" :visible.sync="firstDialogVisible" width="30%" >
                <p>该代理商旗下共有15家门店,请先对门店处理完毕后再终止合作</p>
                <p>a、可对门店终止合作</p>
                <p>b、可对门店重新绑定代理商,继续服务</p>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="firstDialogVisible = false,secondDialogVisible = true">知道了</el-button>
                </span>
            </el-dialog>
            <el-dialog title="!终止合作,一旦终止合作,将无法重新再启用" :visible.sync="secondDialogVisible" width="30%" >
                <textarea name="" id="" rows="10" placeholder="请添加终止合作原因" v-model="noJoin" style="width:100%;"></textarea>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="secondDialogVisible = false,continueJoin()">取 消</el-button>
                    <el-button type="primary" @click="secondDialogVisible = false,NoJoin()" >确 定</el-button>
                </span>
            </el-dialog>
        </el-main>
    </el-container> 
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';

export default {
  name: 'CompanyManagement',
  components:{BreadCrumb},
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
            storeAddress:'',//门店地址
            timeOver:''//到期查询
        },
        // 分页功能
        pagination:{
            currentPage:1,//默认当前页为1;
            pageSize:10,//默认显示10条
            total:400//一共有多少条数据
        },
        breadCrumb: [{text:'加盟管理'},{text: "代理商管理"}],
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
    methods:{
        // 编辑
        edit(index){
            console.log(index,2222)
        },
        // 跟进
        followUp(){

        },
        // 终止合作;第一次弹出对话框
        endJoin(){
            this.firstDialogVisible=true;
        },
        // 确定终止合作;
        noJoin(){},
        // 详情
        detail(){},
        // 重新提交
        reSubmit(){},
        // 重置表单
        resetForm(formName) {
            this.$refs.form.resetFields();
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
        // 添加代理商
        addAgent(){
             
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
    .cz{
        margin-top: 10px;
    }
</style>


