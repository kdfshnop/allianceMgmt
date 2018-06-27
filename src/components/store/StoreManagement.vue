<template>
    <el-container>
        <el-main>    
            <bread-crumb :items="breadCrumb"></bread-crumb> 
            <div style="text-align:right;">
                <el-button type="primary" @click="addStore">+新增门店</el-button>
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
                        <el-form-item label="门店所属代理商" prop="agent">
                            <el-input v-model="form.agent"></el-input>
                        </el-form-item>
                        <el-form-item label="门店类型" prop="storeType">
                            <el-select v-model="form.storeType" filterable>
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="直营" value="直营"></el-option>
                                <el-option label="加盟" value="加盟"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="门店名称" prop="storeName">
                            <el-input v-model="form.storeName"></el-input>
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
                        <el-form-item label="门店所属公司" prop="companyName">
                            <el-input v-model="form.companyName"></el-input>
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
            <div class="search-result">共搜索到 956家门店，56个经纪人，900家无代理商</div>
            <el-table :data="searInfoList" border style="width: 100%">
                <el-table-column prop="date" label="门店id" align="center" ></el-table-column>
                <el-table-column prop="name" label="门店名称" align="center" ></el-table-column>
                <el-table-column prop="address" label="门店类型" align="center" ></el-table-column>
                <el-table-column prop="address" label="经纪人数量" align="center" ></el-table-column>
                <el-table-column prop="address" label="门店所属代理商" align="center"></el-table-column>
                <el-table-column prop="name" label="门店所属公司" align="center"></el-table-column>
                <el-table-column prop="name" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="name" label="操作" align="center"></el-table-column>
                <el-table-column prop="name" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="name" label="创建人" align="center"></el-table-column>
                <el-table-column prop="name" label="操作" width="300px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editStore(scope.$index, scope.row)" type="text">编辑|</el-button>
                        <el-button size="mini" @click="qrCode(scope.$index, scope.row)" type="text">二维码|</el-button>
                        <el-button size="mini"  type="text" @click="firstDialogVisible = true,handleEnd(scope.$index, scope.row)">终止合作</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="门店" align="center"></el-table-column>
            </el-table>
            <div class="pagination">
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
            <!--二维码对话框-->
                <el-dialog title="门店二维码" :visible.sync="qrCodeShow" width="30%" >
                    <div style="text-align:center;">
                        <img src="https://img.wkzf.com/62de69406bd64f7796203f2f1d6d86d6.CL" alt="">
                    </div>
                </el-dialog>
            <!--终止合作对话框-->
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
            <!--编辑添加门店组件-->
            <editor-store ref="editor" v-if="isShow" :title="title" @editSuccess='editSuccess' @addSuccess='addSuccess' :currentStoreInfo="currentStoreInfo"></editor-store>
        </el-main>
    </el-container> 
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';
import EditorStore from '@/components/store/_EditorStore';

export default {
  name: 'StoreManagement',
  components:{BreadCrumb,EditorStore},
  data () {
    return {
        qrCodeShow:false,
        firstDialogVisible: false,//第一个终止合作弹出框
        secondDialogVisible:false,//第二个终止合作弹出框
        noJoin:'',//终止合作原因
        companyInfoIndex:'',//操作门店时该门店处于所有列表的位置
        currentStoreInfo:'',//当前编辑的门店信息
        title:'',//判断是编辑门店还是添加门店
        isShow:false,
        // 表单查询信息
        form: {
            agent:'',//代理商
            city:'',//门店所属城市
            companyName:'',//门店所属公司
            timeStart:'',//创建开始时间
            timeEnd:'',//创建结束时间
            storeName: '',//门店名称
            storeType:'全部',//门店类型
        },
        // 分页功能
        pagination:{
            currentPage:1,//默认当前页为1;
            pageSize:10,//默认显示10条
            total:400//一共有多少条数据
        },
        breadCrumb: [{text:'加盟管理'},{text: "门店管理"}],
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
        addStore(){
            // 调用子组件方法，显示对话框 
            this.title='增加门店';
            this.isShow=true;
            setTimeout(()=>{
                this.$refs.editor.open();
            },200); 
        },
        //编辑
        editStore(index, row){
            //操作门店时，该门店所处所有信息列表的位置;
            this.companyInfoIndex=(this.pagination.currentPage-1)*this.pagination.pageSize+index;
            // 当前编辑的门店信息;
            this.currentStoreInfo=this.tableData[this.companyInfoIndex]; 
            this.title='编辑门店';
            this.isShow=true;//为了每天编辑组件都可以将父组件信息传递;
            // 调用子组件方法，显示对话框,用setTimeout是为了可以加载添加公司组件;
            setTimeout(()=>{
                this.$refs.editor.open();
            },200);  
        },
        //二维码
        qrCode(index, row){
            this.qrCodeShow=true;
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

<style scoped>
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
</style>


