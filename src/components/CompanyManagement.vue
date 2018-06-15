<template>
    <el-container>
        <el-main>
            <el-form ref="form" :model="form" label-width="180px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="门店所属城市">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="业务">
                            <el-input v-model="form.name"></el-input>
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
                <el-form-item >
                    <el-button>重置</el-button>
                    <el-button type="primary">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container> 
</template>

<script>
export default {
  name: 'CompanyManagement',
  data () {
    return {
form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    }
  }
}
</script>

<style>

</style>


