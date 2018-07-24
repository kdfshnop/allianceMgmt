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
                <el-button type="primary" @click="addStore" v-show="privileges.addStore">+新增门店</el-button>
            </div>      
            <el-form ref="form" :model="form" label-width="180px" class="gap">
                <el-row >
                    <el-col :span="12">
                        <el-form-item label="门店所属城市" prop="cityList">
                            <region v-model="form.cityList" :startLevel="startLevel" :endLevel="endLevel"></region>
                        </el-form-item>
                        <el-form-item label="门店所属代理商" prop="agencyId">
                            <el-select v-model="form.agencyId" placeholder="请选择" @focus="agencyList" filterable>
                                <el-option label="暂无代理商" :value="0"></el-option>
                                <el-option
                                    v-for="item in agencyInfoList"
                                    :key="item.agencyId"
                                    :label="item.agencyCompanyName"
                                    :value="item.agencyId">
                                </el-option>
                            </el-select>
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
                        <el-form-item label="门店所属公司" prop="companyId">
                            <!--<el-input v-model="form.companyName"></el-input>-->
                            <el-select v-model="form.companyId" placeholder="请选择" @focus="companyList"  filterable>
                                <el-option
                                    v-for="item in companyInfoList"
                                    :key="item.companyId"
                                    :label="item.name"
                                    :value="item.companyId">
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
                        <el-button size="mini" @click="editStore(scope.$index, scope.row)" type="text" v-show="privileges.storeEdit">编辑 </el-button>
                        <el-button size="mini" @click="qrCode(scope.$index, scope.row)" type="text">二维码 </el-button>
                        <el-button size="mini"  type="text" @click="handleEnd(scope.$index, scope.row)" v-show="privileges.storeEndJoin">终止合作</el-button>
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
                <p>一旦终止和门店的合作</p>
                <p style="padding-left:15px;">a、将不会再被恢复</p>
                <p style="padding-left:15px;">b、门店旗下的经纪人账号被冻结</p>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="prompt">知道了</el-button>
                </span>
            </el-dialog>
            <!--<el-dialog title="终止公司合作" :visible.sync="secondDialogVisible" width="30%" >
                <textarea name="" id="" rows="10" placeholder="请添加终止合作原因" v-model="remark" style="width:100%;"></textarea>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="continueJoin">取 消</el-button>
                    <el-button type="primary" @click="endJoin" >确 定</el-button>
                </span>
            </el-dialog>-->
            <!--编辑添加门店组件-->
            <editor-store ref="editor"  :title="title" :storeId="storeId" @editSuccess='editSuccess' @addSuccess='addSuccess' :currentStoreInfo="currentStoreInfo"></editor-store>
        </el-main>
    </el-container> 
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';
import EditorStore from '@/components/store/_EditorStore';
import Region from '@/components/common/Region';
import PrivilegeMixin from '@/utils/privilege';

export default {
    name: 'StoreManagement',
    components:{BreadCrumb,EditorStore,Region},
    mixins: [PrivilegeMixin],
    data () {
        return {
            privilegeOption:{//权限控制
                "addStore": "/storeManagement#addStore",//添加门店
                "storeEdit": "/storeManagement#storeEdit",//编辑门店
                "storeEndJoin": "/storeManagement#storeEndJoin"//终止合作
            },
            breadCrumb: [{text:'加盟管理'},{text: "门店管理"}],
            agencyInfoList:[],//代理商列表
            companyInfoList:[],//中介公司列表
            startLevel:1,//二级联动城市传参
            endLevel:2,//二级联动城市传参
            qrCodeShow:false,
            qrCodeInfo:{},//二维码信息;
            firstDialogVisible: false,//第一个终止合作弹出框
            secondDialogVisible:false,//第二个终止合作弹出框
            remark:'',//终止合作原因
            companyInfoIndex:'',//操作门店时该门店处于所有列表的位置
            currentStoreInfo:'',//当前编辑的门店信息
            isTerminate:null,//是否已经申请终止合作;
            storeInfo:{},//门店列表
            storeId:'',//门店Id;
            summary:{},//summary
            title:'',//判断是编辑门店还是添加门店
            // 表单查询信息
            form: {
                agencyId:null,//门店所属代理商Id
                cityId:null,//门店所属城市Id
                cityList:[],//城市二级联动所需
                companyId:null,//门店所属公司Id
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
        this.agencyList();
        // 中介公司列表;
        this.companyList();
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
        // 中介公司列表;
        companyList(){
            let self=this;
            // 中介公司列表;
            this.$http.get(this.$apiUrl.company.list)
                .then(function(data){
                    self.companyInfoList=data.data.data
                })
                .catch(function(err){
                    console.log(err,'中介公司列表err')
                })
        },
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
            this.form.cityId=null;
            this.form.cityList=[];
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
            this.isTerminate=row.terminate;
            if(this.isTerminate==0||2){
                this.firstDialogVisible = true;
            }else{
                if(this.isTerminate=1){
                    this.message.warning("该门店正在审核中，请稍候再试");
                }else{
                    this.message.warning("该门店已被终止合作");
                }
            };
        },
        // prompt弹框;
        prompt(){
            let self=this;
            self.firstDialogVisible = false ;
            this.$prompt('', '终止合作，一旦终止合作，将无法重新再启用', {
                confirmButtonText: '确定',
                cancelButtonText: '取消', 
                inputType: "textarea",  
                inputPlaceholder: "请添加终止合作原因", 
                customClass: 'store-end-join', 
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
                    this.$http.post(this.$apiUrl.store.terminate+"/"+this.storeId+"?remark="+value)
                    .then(function(data){
                        self.$message({
                            message: '提交成功',
                            type: 'success'
                        });
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
    .el-select{
        width:100%;
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
</style>

<style>
    /*scoped会影响prompt框的样式*/
    .store-end-join textarea{
        height:100px;
    }
</style>


