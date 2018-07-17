<!--
    @页面名称：门店管理列表页
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
                <el-button type="primary" @click="addStore">+新增门店</el-button>
            </div>      
            <el-form ref="form" :model="form" label-width="180px" class="gap">
                <el-row >
                    <el-col :span="12">
                        <el-form-item label="门店所属城市" prop="cityList">
                            <region v-model="form.cityList" :startLevel="startLevel" :endLevel="endLevel"></region>
                        </el-form-item>
                        <el-form-item label="门店所属代理商" prop="agency">
                            <el-input v-model="form.agency"></el-input>
                        </el-form-item>
                        <el-form-item label="门店类型" prop="storeType">
                            <el-select v-model="form.storeType" filterable>
                                <el-option label="全部" value="0"></el-option>
                                <el-option label="直营" value="1"></el-option>
                                <el-option label="加盟" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="门店名称" prop="storeName">
                            <el-input v-model="form.storeName"></el-input>
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
                        <el-form-item label="门店所属公司" prop="companyName">
                            <el-input v-model="form.companyName"></el-input>
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
            <div class="search-result">共搜索到 {{summary.storeTotal}}家门店，{{summary.agentTotal}}个经纪人，{{summary.hASTotal}}家有代理商，{{summary.nASTotal}}家无代理商</div>
            <el-table :data="storeInfo.data" border style="width: 100%">
                <el-table-column prop="storeId" label="门店id" align="center" ></el-table-column>
                <el-table-column prop="storeName" label="门店名称" align="center" ></el-table-column>
                <el-table-column prop="storeTypeName" label="门店类型" align="center" ></el-table-column>
                <el-table-column prop="agentCount" label="经纪人数量" align="center" ></el-table-column>
                <el-table-column prop="agencyName" label="门店所属代理商" align="center"></el-table-column>
                <el-table-column prop="companyName" label="门店所属公司" align="center"></el-table-column>
                <el-table-column prop="cityName" label="门店所属城市" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column label="操作" width="300px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editStore(scope.$index, scope.row)" type="text">编辑 </el-button>
                        <el-button size="mini" @click="qrCode(scope.$index, scope.row)" type="text">二维码 </el-button>
                        <el-button size="mini"  type="text" @click="handleEnd(scope.$index, scope.row)">终止合作</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="form.currentPage"
                    :page-sizes="[10, 20, 50, 100,500]"
                    :page-size="form.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="storeInfo.total">
                </el-pagination>
            </div>
            <!--二维码对话框-->
                <el-dialog title="门店二维码" :visible.sync="qrCodeShow" width="30%" >
                    <div style="text-align:center;">
                        <img :src="qrCodeInfo.url" alt="">
                    </div>
                </el-dialog>
            <!--终止合作对话框-->
            <el-dialog title="终止门店合作" :visible.sync="firstDialogVisible" width="30%" >
                <p>1、将不会再被恢复，有房有客app中不可以再选择到该门店</p>
                <p>2、门店旗下的经纪人账号被冻结</p>
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
            <!--编辑添加门店组件-->
            <editor-store ref="editor"  :title="title" :storeId="storeId" @editSuccess='editSuccess' @addSuccess='addSuccess' :currentStoreInfo="currentStoreInfo"></editor-store>
        </el-main>
    </el-container> 
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';
import EditorStore from '@/components/store/_EditorStore';
import Region from '@/components/common/Region';

export default {
    name: 'StoreManagement',
    components:{BreadCrumb,EditorStore,Region},
    data () {
        return {
            breadCrumb: [{text:'加盟管理'},{text: "门店管理"}],
            startLevel:1,//二级联动城市传参
            endLevel:2,//二级联动城市传参
            qrCodeShow:false,
            qrCodeInfo:{},//二维码信息;
            firstDialogVisible: false,//第一个终止合作弹出框
            secondDialogVisible:false,//第二个终止合作弹出框
            remark:'',//终止合作原因
            companyInfoIndex:'',//操作门店时该门店处于所有列表的位置
            currentStoreInfo:'',//当前编辑的门店信息
            storeInfo:{},//门店列表
            storeId:'',//门店Id;
            summary:{},//summary
            title:'',//判断是编辑门店还是添加门店
            // 表单查询信息
            form: {
                agency:null,//门店所属代理商
                cityId:null,//门店所属城市Id
                cityList:[],//城市二级联动所需
                companyName:null,//门店所属公司
                cooperationTime:null,//创建时间段;
                cooperationStart:null,//创建开始时间
                cooperationEnd:null,//创建结束时间
                currentPage:1,//页码默认为1
                pageSize:10,//页面量默认为10
                storeName: null,//门店名称
                storeType:'0',//门店类型
            }  
        }
    },
    created(){
        this.requestList();
    },
    methods:{
        // 子组件添加门店成功之后，传递给父组件的值;
        addSuccess(addInfo){
            this.$refs.form.resetFields();
            this.form.pageSize=10;
            this.form.currentPage=1;
            this.requestList();
            console.log('添加门店成功');
        },
        // 子组件编辑成功之后，传递给父组件的值;
        editSuccess(editInfo){
            // 替换原有已经被编辑的数据;
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
            this.requestList();
        },
        //当前页
        handleCurrentChange(val) {
            this.form.currentPage=val;
            this.requestList();
        },
        // 添加公司
        addStore(){
            // 调用子组件方法，显示对话框 
            this.title='增加门店';
            setTimeout(()=>{
                this.$refs.editor.open();
            },200); 
        },
        //编辑
        editStore(index, row){
            // 当前编辑的门店信息;
            this.storeId=row.storeId; 
            this.title='编辑门店';
            // 调用子组件方法，显示对话框,用setTimeout是为了可以加载添加公司组件;
            setTimeout(()=>{
                this.$refs.editor.open();
            },200);  
        },
        //二维码
        qrCode(index, row){
            let self=this;
            this.storeId=row.storeId;
            this.$http.get(this.$apiUrl.store.qrcode+"/"+this.storeId)
                .then(function(data){
                    self.qrCodeInfo=data.data.data
                    console.log(self.qrCodeInfo,'二维码');
                })
                .catch(function(err){
                    console.log(err);
                })
            this.qrCodeShow=true;
        },
        //终止合作,第一次弹框
        handleEnd(index,row){
            this.storeId=row.storeId;
            console.log(row,1111111111)
            this.firstDialogVisible=true;
        },
        //确定终止合作,第二次弹框
        endJoin(){
            let self=this;
            if(this.remark){
                this.secondDialogVisible=false;
                this.$http.post(this.$apiUrl.store.terminate+"/"+this.storeId+"?remark="+this.remark)
                    .then(function(data){
                        self.remark="";
                        console.log(data);
                    })
                    .catch(function(err){
                        console.log(err);
                    })
            }else{
                alert('请填写终止合作原因');
            };
            //将该门店终止合作申请提交，该公司信息进入终止合作列表;
        },
        //点击二次对话框取消按钮，继续合作
        continueJoin(){
            this.secondDialogVisible=false;
            this.remark='';
        },
        // 门店列表请求公共函数;
        requestList(){
            let self=this;
            // 判断是否选择了省市;
            if(this.form.cityList.length){
                this.form.cityId=this.form.cityList[1];
            };
            // 获取代理商列表信息;
            this.$http.post(this.$apiUrl.store.list,this.form)
                .then(function(data){
                    self.storeInfo=data.data.data;
                    console.log(self.storeInfo,'门店列表');
                })
                .catch(function(err){
                    console.log(err);
                });
            // 获取该页面summary信息;
            this.$http.post(this.$apiUrl.store.summary,this.form)
                .then(function(data){
                    self.summary=data.data.data
                    console.log(self.summary,'summary');
                })
                .catch(function(err){
                    console.log(err);
                })
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


