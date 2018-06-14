<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span>代理商公司信息</span>            
        </div>
        <el-form :model="item" label-width= "180px">
            <el-form-item label="代理商是否已注册公司">
                <el-switch
                    v-model="item.signed"
                    active-color="#13ce66"
                    inactive-color="#aaa">
                </el-switch>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司名">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>                                                                         
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司简称">
                        <el-input v-model="item.shortName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>   
            <el-row>
                <el-col :span="12">
                    <el-form-item label="营业执照号">
                        <el-input v-model="item.num"></el-input>
                    </el-form-item>                                                                         
                </el-col>
                <el-col :span="12">
                    <el-form-item label="组织机构代码">
                        <el-input v-model="item.code"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>     
            <el-form-item label="公司具体地址">
                <el-input v-model="item.address"></el-input>
            </el-form-item> 
            <el-form-item label="上传营业执照">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
            </el-form-item>  

            <!-- 下面是未注册显示的 -->
            <el-row>
                <el-col :span="12">
                    <el-form-item label="预计注册完成时间">
                        
                    </el-form-item>                                                                         
                </el-col>               
            </el-row>  
            <el-row>
                <el-col :span="12">
                    <el-form-item label="代理商负责跟踪人">
                        <el-input></el-input>
                    </el-form-item>                                                                         
                </el-col>               
                <el-col :span="12">
                    <el-form-item label="手机号">
                        <el-input></el-input>
                    </el-form-item>                                                                         
                </el-col>
            </el-row>     
            <el-row>
                <el-col :span="12">
                    <el-form-item label="邮箱号">
                        <el-input></el-input>
                    </el-form-item>                                                                         
                </el-col>               
                <el-col :span="12">
                    <el-form-item label="身份证号">
                        <el-input></el-input>
                    </el-form-item>                                                                         
                </el-col>
            </el-row>  
            <el-form-item label="备注信息">
                <el-input type="textarea"></el-input>
            </el-form-item> 

            <el-form-item label="上传身份证正面照">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
            </el-form-item>
            <el-form-item label="上传身份证反面照">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
            </el-form-item>
        </el-form>
    </CollapsePanel>
</template>
<script>
import CollapsePanel from '@/components/common/CollapsePanel';
/**
 * 代理商公司信息组件
 * TODO: 
 *  1. 上传文件接口
 *  2. 交互
 */
export default {
    name: "agentCompanyInfo",
    props: ['item', 'mode'],
    components: {CollapsePanel},
    data() {
        return {
            expand: true
        };
    },
    methods: {
        handlePreview() {

        },
        handleRemove() {

        },
        beforeRemove() {
            
        }
    }
}
</script>
<style scoped>

</style>