<template>
    <el-dialog  :visible.sync="dialogVisible" width="50%">
        <el-form :model="companyDetail" label-width="110px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司名称:" class="tl">
                        <span>{{companyDetail.name}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司简称:" prop="abbreviation">
                        <span>{{companyDetail.abbreviation}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属城市:"  class="tl">
                        <span>{{companyDetail.provinceName}}-{{companyDetail.cityName}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="保证金:">
                        <span>{{companyDetail.deposit}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="组织机构代码:" class="tl">
                        <span>{{companyDetail.organizationCode}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="businessType" label="业务:" >
                        <span v-if="companyDetail.businessType==1">新房</span>
                        <span v-if="companyDetail.businessType==2">二手房</span>
                        <span v-if="companyDetail.businessType==3">新房+二手房</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="bd:" class="tl">
                <span>{{companyDetail.bdName}}</span>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="合作时间:" prop="cooperationTime" class="tl">
                            <span>{{companyDetail.cooperationStart}}至{{companyDetail.cooperationEnd}}</span>
                        </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="法人代表:" prop="corporate" >
                        <span>{{companyDetail.corporate}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="电话:" class="tl" prop="corporatePhone">
                        <span>{{companyDetail.corporatePhone}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地址:" prop="address" >
                        <span>{{companyDetail.address}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="代理商:" class="tl" prop="agencyId">
                <span>{{companyDetail.agencyName}}</span>
            </el-form-item>
            <el-form-item  class="tl" label="上传文件:">
                <!--<img :src="item.url" alt="" v-for="(item,index) in companyDetail.files" :key="index">-->
                <!--<img :src="companyDetail.file.url" alt="">-->
                <file-list :fileList="companyDetail.files"></file-list>
            </el-form-item>   
        </el-form>
    </el-dialog>
</template>

<script>
import FileList from '@/components/common/FileList';
export default {
    name:'CompanyDetail',
    components:{FileList},
    data(){
        return {
            agencyInfoList:[],
            dialogVisible:false,
            startLevel:1,//二级联动城市传参
            endLevel:2,//二级联动城市传参
            companyDetail:{
                files:[{fileName:''}]
            },//公司详情页;
        }
    },
    methods:{
        open(companyId) {
            let self=this;
            // 获取公司详情;
            this.$http.get(this.$apiUrl.company.detail+"?companyId="+companyId)
                .then(function(data){
                    self.companyDetail=data.data.data;
                    self.dialogVisible = true;
                })
                .catch(function(err){
                    console.log(err);
                });     
        }
    }
}
</script>

<style scoped>
    .el-form-item .el-form-item__label{
        text-align: left;
    } 
    img{
        width: 200px;
        height: auto;
    }
</style>

