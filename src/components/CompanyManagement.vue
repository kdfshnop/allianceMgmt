<template>
    <el-container>
        <el-main> 
            <el-form ref="form" :model="form" label-width="180px">
                <el-row >
                    <el-col :span="12">
                        <el-form-item label="门店所属城市">
                            <el-select v-model="form.city" placeholder="二级选择区域" filterable @change='a'>
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
                    <el-button class="reset">重置</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary">搜索</el-button>
                </el-col>
            </el-row>
            <div class="search-result">共搜到共搜索到 956家公司，56家有代理商，900家无代理商</div>
           <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="日期" ></el-table-column>
                <el-table-column prop="date" label="日期" ></el-table-column>
                <el-table-column prop="date" label="日期" ></el-table-column>
            </el-table>
        </el-main>
    </el-container> 
</template>

<script>
export default {
  name: 'CompanyManagement',
  data () {
    return {
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
      a(val){
          console.log(val,this.form.city);
      },
  }
}
</script>

<style>
    .search-result{
        color:gray;
        margin-bottom: 20px;
        margin-top: 50px;
    }
</style>


