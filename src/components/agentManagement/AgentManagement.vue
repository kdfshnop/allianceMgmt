<!--
    @页面名称：代理商公司管理列表页
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
                <el-button type="primary" @click="addAgent" v-show="privileges.addAgent">添加代理商</el-button>
            </div>     
            <el-form ref="form" :model="form" label-width="180px" class="gap" label-position="right">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="地区" prop="cityList">
                            <region v-model="form.cityList" :startLevel="startLevel" :endLevel="endLevel"></region>
                        </el-form-item>
                        <el-form-item label="合作状态" prop="agencyState">
                            <el-select v-model="form.agencyState" filterable>
                                <el-option label="全部" value="0"></el-option>
                                <el-option label="待审核" value="1"></el-option>
                                <el-option label="已驳回" value="2"></el-option>
                                <el-option label="合作中" value="3"></el-option>
                                <el-option label="已到期" value="4"></el-option>
                            </el-select>
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
                        <el-form-item label="代理商类型" prop="agencyType">
                            <el-select v-model="form.agencyType" filterable>
                                <el-option label="全部" value="0"></el-option>
                                <el-option label="城市代理" value="1"></el-option>
                                <el-option label="区域代理" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
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
                                <el-form-item prop="searchDay" class="expire" label-width="0">
                                    <el-input v-model="form.searchDay" placeholder="请输入整数"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" v-if="form.searchType==2">
                                <el-form-item prop="searchDate" class="expire" label-width="0">
                                    <el-date-picker
                                        format="yyyy-MM-dd"
                                        v-model="form.searchDate"
                                        type="date"
                                        placeholder="选择日期"
                                        style="width:100%;"
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="合作标签" prop="agencyTag" v-if="form.agencyState==0||form.agencyState==3">
                            <el-select v-model="form.agencyTag" filterable>
                                <el-option label="全部" value="0"></el-option>
                                <el-option label="正常合作" value="1"></el-option>
                                <el-option label="待补足资料" value="2"></el-option>
                                <el-option label="首次待缴费" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="代理商公司名称" prop="agencyId">
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
                    </el-col>
                </el-row>
            </el-form>
            <el-row :gutter="20">
                <el-col :span="2" :offset="11">
                    <el-button class="reset" @click="reset">重置</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="search">搜索</el-button>
                </el-col>
            </el-row>
            <span class="search-result">共搜索到 {{summary.agencyTotal}}家代理商，{{summary.regionTotal}}个代理区域，{{summary.storeTotal}}家门店</span>
            <span style="margin-left:20px;">
                <el-tooltip placement="right" effect="light" >
                    <el-button type="text" style="font-size:16px;">?</el-button>
                    <div slot="content">a、正常合作： 正常合作</div>
                    <div slot="content">b、首次待缴费：合作的时候还没有付费</div>
                    <div slot="content">c、待补足资料：合作的时候还没有注册公司</div>
                </el-tooltip>
            </span>
            <el-table :data="agencyInfo.data" border style="width: 100%">
                <el-table-column prop="agencyCompanyName" label="代理商公司名称" align="center" ></el-table-column>
                <el-table-column prop="cityName" label="城市" align="center"></el-table-column>
                <el-table-column prop="agencyTypeName" label="代理商类型" align="center"></el-table-column>
                <el-table-column prop="regionTotal" label="代理区域数量" align="center"></el-table-column>
                <el-table-column prop="storeTotal" label="门店数量" align="center"></el-table-column>
                <el-table-column prop="agencyStateName" label="合作状态" align="center"></el-table-column>
                <el-table-column prop="tagsName" label="合作标签" align="center"></el-table-column>
                <el-table-column prop="startTime" label="合作开始" align="center"></el-table-column>
                <el-table-column prop="endTime" label="合作结束" align="center"></el-table-column>
                <el-table-column label="操作" width="300px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="detail(scope.$index, scope.row)" v-if="scope.row.agencyState!=2" type="text">详情</el-button>
                        <!--<el-tooltip placement="right" effect="light" v-if="scope.row.agencyState!=2">
                            <el-button type="text" size="mini">更多</el-button>
                            <div slot="content" @click="edit(scope.$index,scope.row)" v-if="scope.row.agencyState!=1">编辑</div>
                            <div slot="content" class="cz" @click="followUp(scope.$index,scope.row)">跟进</div>
                            <div slot="content" class="cz" @click="endJoin(scope.$index,scope.row)" v-if="scope.row.agencyState==4">终止合作</div>
                        </el-tooltip>-->
                        <el-dropdown v-if="scope.row.agencyState!=2"trigger="click">
                            <span class="el-dropdown-link" style="color:#409EFF;font-size:12px;">更多<i class="el-icon-arrow-down el-icon--right"></i></span>
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item @click.native="edit(scope.$index,scope.row)" v-if="scope.row.agencyState!=1&&privileges.agentEdit">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="followUp(scope.$index,scope.row)" v-show="privileges.followUp">跟进</el-dropdown-item>
                                <el-dropdown-item @click.native="endJoin(scope.$index,scope.row)" v-if="scope.row.agencyState==4&&privileges.agentEndJoin">终止合作</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-button v-if="scope.row.agencyState==2&&privileges.resubmit" size="mini" @click="reSubmit(scope.$index, scope.row)" type="text">重新提交</el-button>
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
                    :total="agencyInfo.total">
                </el-pagination>
            </div>
            <el-dialog title="!终止合作" :visible.sync="firstDialogVisible" width="30%" >
                <p>该代理商旗下共有{{agencySotre}}家门店,请先对门店处理完毕后再终止合作</p>
                <p>a、可对门店终止合作</p>
                <p>b、可对门店重新绑定代理商,继续服务</p>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="know">知道了</el-button>
                </span>
            </el-dialog>
            <!--<el-dialog title="!终止合作,一旦终止合作,将无法重新再启用" :visible.sync="secondDialogVisible" width="30%" >
                <textarea name="" id="" rows="10" placeholder="请添加终止合作原因" v-model="remark" style="width:100%;"></textarea>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="continueJoin">取 消</el-button>
                    <el-button type="primary" @click="noJoin" >确 定</el-button>
                </span>
            </el-dialog>-->
        </el-main>
    </el-container> 
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';
import Region from '@/components/common/Region';
import PrivilegeMixin from '@/utils/privilege';

export default {
    name: 'AgentManagement',
    components:{BreadCrumb,Region},
    mixins: [PrivilegeMixin],
    data () {
        return {
            privilegeOption: {//权限控制
                "addAgent": "/agentManagement#addAgent",//添加代理商
                "followUp": "/agentManagement#followUp",//跟进
                "resubmit": "/agentManagement#resubmit",//重新提交
                "agentEdit": "/agentManagement#agentEdit",//编辑
                "agentEndJoin": "/agentManagement#agentEndJoin"//终止合作
            },
            agencyInfo:{},//代理商信息
            agencyInfoList:[],//代理商列表;
            agencySotre:'',//该代理商旗下有多少家门店
            breadCrumb: [{text:'加盟管理'},{text: "代理商管理"}],//面包屑
            companyInfoIndex:'',//操作代理商公司时该公司处于所有列表的位置
            currentCompanyInfo:'',//当前编辑的代理商公司信息
            endLevel:2,//二级联动城市传参
            firstDialogVisible: false,//第一个终止合作弹出框
            remark:'',//终止合作原因
            secondDialogVisible:false,//第二个终止合作弹出框
            startLevel:1,//二级联动城市传参
            summary:{},//summary信息
            isTerminate:null,//是否已经申请终止合作;
            title:'',//判断是编辑公司还是添加公司
            // 表单查询信息
            form: {
                agencyId:null,//代理商公司Id
                agencyState:'0',//合作状态
                agencyTag:'0',//合作标签
                agencyType:'0',//代理商类型
                cityId:null,//代理商所属城市
                cityList:[],//二级联动城市
                cooperationTime:null,//合作时间段
                currentPage:1,//页码默认为1
                pageSize:10,//页面量默认为10
                searchDate:null,//到期日期
                searchDay:null,//即将到期天数
                searchType:null,//到期查询方式
            }  
        }
    },
    created(){
        this.requestList();
        this.agencyList();
    },
    methods:{
        // 终止合作
        prompt(){
            let self=this;
            self.firstDialogVisible = false ;
            this.$prompt('', '!终止合作,一旦终止合作,将无法重新再启用', {
                confirmButtonText: '确定',
                cancelButtonText: '取消', 
                inputType: "textarea",  
                inputPlaceholder: "请添加终止合作原因", 
                customClass: 'agent-end-join', 
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
                    this.$http.post(this.$apiUrl.agent.terminate+"/"+this.currentCompanyInfo.agencyId+"?remark="+value)
                    .then(function(data){
                        self.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.requestList();
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
        know(){
            this.firstDialogVisible=false;
        },
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
        // 编辑
        edit(index,row){
            this.$router.push({name:'EditAgent',params:{id:row.agencyId}});
        },
        // 跟进
        followUp(index,row){
            this.$router.push({name:'FollowUp',query:{agencyId:row.agencyId}});
        },
        // 终止合作;第一次弹出对话框
        endJoin(index,row){
            this.currentCompanyInfo=row;
            this.agencySotre=this.currentCompanyInfo.storeTotal;
            this.isTerminate=this.currentCompanyInfo.isTerminate;
            if(this.isTerminate==0||this.isTerminate==2){
                if(this.agencySotre){
                    this.firstDialogVisible=true;
                }else{
                    this.prompt();
                }
            }else{
                if(this.isTerminate=1){
                    this.$message.warning("该代理商正在审核中，请稍候再试");
                }else{
                    this.$message.warning("该代理商已被终止合作");
                }
                
            }
             
        },
        // 确定终止合作;
        // noJoin(){
        //     let self=this;
        //     if(this.remark){
        //         this.secondDialogVisible = false;
        //         this.$http.post(this.$apiUrl.agent.terminate+"/"+this.currentCompanyInfo.agencyId+"?remark="+this.remark)
        //             .then(function(data){
        //                 console.log(data,'提交代理商终止合作');
        //                 self.remark='';
        //                 alert('已将终止合作信息流转到审核流程');
        //             })
        //             .catch(function(err){
        //                 console.log(err);
        //             });
        //     }else{
        //         alert('请填写终止合作原因');
        //     }
            
        // },
        // 详情
        detail(index,row){
            this.$router.push({name:'AgentDetail',params:{id:row.agencyId}});
        },
        // 重新提交
        reSubmit(index,row){
            this.$router.push({name:'EditAgent',params:{id:row.agencyId}});
        },
        // 重置表单
        reset(){
            // this.$refs.form.resetFields();会有问题;表单重置只是重置form标签选项，而不重置data中form数据;
            this.form={
                agencyId:null,//代理商公司Id
                agencyState:'0',//合作状态
                agencyTag:'0',//合作标签
                agencyType:'0',//代理商类型
                cityId:null,//代理商所属城市
                cityList:[],//二级联动城市
                cooperationTime:null,//合作时间段
                currentPage:this.form.currentPage,//页码默认为1
                pageSize:this.form.pageSize,//页面量默认为10
                searchDate:null,//到期日期
                searchDay:null,//即将到期天数
                searchType:null,//到期查询方式
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
            if(val!=this.form.pageSize){
                this.form.pageSize=val;
                this.requestList();
            }
        },
        //当前页
        handleCurrentChange(val) {
            if(val!=this.form.currentPage){
                this.form.currentPage=val;
                this.requestList();
            }
        },
        // 添加代理商
        addAgent(){
             this.$router.push({path:"/agent/createAgent"});
        },
        //点击二次对话框取消按钮，继续合作
        continueJoin(){
            this.secondDialogVisible = false;
            this.remark='';
        },
        // 代理商列表请求公共函数;
        requestList(){
            let self=this;
            // 判断是否选择了省市;
            if(this.form.cityList.length){
                this.form.cityId=this.form.cityList[1];
            };
            // 如果合作状态不是0或者3，则合作标签为null;
            let isTag=this.form.agencyState==0||this.form.agencyState==3;
            if(!isTag){
                this.form.agencyTag="0";
            };
            //因为data中form有不必要的请求参数,因此予以删除;
            let realForm=Object.assign({},this.form);
            delete realForm.cityList;
            delete realForm.searchType;
            // 获取代理商列表信息;
            this.$http.post(this.$apiUrl.agent.list,realForm)
                .then(function(data){
                    self.agencyInfo=data.data.data;
                })
                .catch(function(err){
                    console.log(err,'代理商列表接口错误');
                });
            // 获取该页面summary信息;
            this.$http.post(this.$apiUrl.agent.summary,realForm)
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
    .cz{
        margin-top: 10px;
    }
</style>
<style>
    /*scoped会影响prompt框的样式*/
    .agent-end-join textarea{
        height:100px;
    }
</style>



