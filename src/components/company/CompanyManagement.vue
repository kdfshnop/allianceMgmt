<template>
    <el-container>
        <el-main> 
            <el-form ref="form" :model="form" label-width="180px">
                <el-row >
                    <el-col :span="12">
                        <el-form-item label="门店所属城市">
                            <el-select v-model="form.city" placeholder="二级选择区域" filterable @change='formInfo'>
                                <el-option
                                    v-for="(item,index) in city"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <el-date-picker
                                v-model="form.timeStart"
                                type="date"
                                placeholder="选择日期"
                                style="width:150px">
                            </el-date-picker>
                            <span>至</span>
                            <el-date-picker
                                v-model="form.timeEnd"
                                type="date"
                                placeholder="选择日期"
                                style="width:150px">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="业务">
                            <el-select v-model="form.business" filterable>
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="城市代理" value="城市代理"></el-option>
                                <el-option label="区域代理" value="区域代理"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="门店地址">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="公司名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="到期查询">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="门店名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="代理商">
                            <el-input v-model="form.name"></el-input>
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
            <div class="search-result">共搜到共搜索到 956家公司，56家有代理商，900家无代理商</div>
           <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="序号" ></el-table-column>
                <el-table-column prop="date" label="城市" ></el-table-column>
                <el-table-column prop="date" label="公司全称" ></el-table-column>
                <el-table-column prop="date" label="公司简称" ></el-table-column>
                <el-table-column prop="date" label="代理商公司" ></el-table-column>
                <el-table-column prop="date" label="有效期始" ></el-table-column>
                <el-table-column prop="date" label="有效期止" ></el-table-column>
                <el-table-column prop="date" label="bd" ></el-table-column>
                <el-table-column prop="date" label="创建时间" ></el-table-column>
                <el-table-column prop="date" label="创建人" ></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="text">编辑|</el-button>
                        <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" type="text">分佣账号设置|</el-button>
                        <el-button size="mini"  type="text" @click="firstDialogVisible = true,handleEnd(scope.$index, scope.row)">终止合作</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="门店" ></el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
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
                <textarea name="" id="" rows="10" placeholder="请添加终止合作原因" style="width:100%;"></textarea>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="secondDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="secondDialogVisible = false" >确 定</el-button>
                </span>
            </el-dialog>
            <!--编辑公司组件-->
            <editor-company ref="editor"></editor-company>
        </el-main>
    </el-container> 
</template>

<script>
import editorCompany from '@/components/common/editorCompany';
export default {
  name: 'CompanyManagement',
  components:{editorCompany},
  data () {
    return {
        firstDialogVisible: false,//第一个终止合作弹出框
        secondDialogVisible:false,//第二个终止合作弹出框
        currentPage4:3,
        edit:false,
        form: {
            business:'全部',
            city:'',
            timeStart:'',
            timeEnd:'',
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
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
        //form表单信息改变   
      formInfo(){

      },
        //重置表单信息   
      reset(){
        console.log(2222222222222)
      },
        //根据表单信息搜索
      search(val){
          console.log(this.form);
      },
        //每页多少条
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
        //当前页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
        //编辑
      handleEdit(index, row){
          this.$refs.editor.open();
      },
        //分佣账号设置 
      handleDelete(index, row){
          console.log(index,row)
      },
        //终止合作
      handleEnd(index,row){
          console.log(index,row)
      }
  },
  computed:{

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
</style>


