<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">代理商公司信息</span>     
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                   
        </div>
        <el-form :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
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
                    <upload v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>  

            <!-- 下面是未注册显示的 -->
            <el-row>
                <el-col :span="12">
                    <el-form-item label="预计注册完成时间">
                        <el-date-picker
                            v-model="item.finishDate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>                                                                         
                </el-col>               
            </el-row>  
            <el-row>
                <el-col :span="12">
                    <el-form-item label="代理商负责跟踪人">
                        <el-input v-model="item.tracerName"></el-input>
                    </el-form-item>                                                                         
                </el-col>               
                <el-col :span="12">
                    <el-form-item label="手机号">
                        <el-input v-model="item.mobile"></el-input>
                    </el-form-item>                                                                         
                </el-col>
            </el-row>     
            <el-row>
                <el-col :span="12">
                    <el-form-item label="邮箱号">
                        <el-input v-model="item.email"></el-input>
                    </el-form-item>                                                                         
                </el-col>               
                <el-col :span="12">
                    <el-form-item label="身份证号">
                        <el-input v-model="item.idNum"></el-input>
                    </el-form-item>                                                                         
                </el-col>
            </el-row>  
            <el-form-item label="备注信息">
                <el-input type="textarea" v-model="item.remark"></el-input>
            </el-form-item> 

            <el-form-item label="上传身份证正面照">                
                    <upload v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>
            <el-form-item label="上传身份证反面照">
                <upload v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>
        </el-form>

        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
            <el-form-item label="代理商是否已注册公司">
                {{item.signed&&"是" || "否"}}                
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司名">
                        {{item.name}}
                    </el-form-item>                                                                         
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司简称">
                        {{item.shortName}}
                    </el-form-item>
                </el-col>
            </el-row>   
            <el-row>
                <el-col :span="12">
                    <el-form-item label="营业执照号">
                        {{item.num}}
                    </el-form-item>                                                                         
                </el-col>
                <el-col :span="12">
                    <el-form-item label="组织机构代码">
                        {{item.code}}
                    </el-form-item>
                </el-col>
            </el-row>     
            <el-form-item label="公司具体地址">
                {{item.address}}
            </el-form-item> 
            <el-form-item label="上传营业执照">                
                    <file-list></file-list>
            </el-form-item>  

            <!-- 下面是未注册显示的 -->
            <el-row>
                <el-col :span="12">
                    <el-form-item label="预计注册完成时间">
                        {{item.finishDate}}
                    </el-form-item>                                                                         
                </el-col>               
            </el-row>  
            <el-row>
                <el-col :span="12">
                    <el-form-item label="代理商负责跟踪人">
                        {{item.tracer}}
                    </el-form-item>                                                                         
                </el-col>               
                <el-col :span="12">
                    <el-form-item label="手机号">
                        {{item.mobile}}
                    </el-form-item>                                                                         
                </el-col>
            </el-row>     
            <el-row>
                <el-col :span="12">
                    <el-form-item label="邮箱号">
                        {{item.email}}
                    </el-form-item>                                                                         
                </el-col>               
                <el-col :span="12">
                    <el-form-item label="身份证号">
                        {{item.idNum}}
                    </el-form-item>                                                                         
                </el-col>
            </el-row>  
            <el-form-item label="备注信息">
                {{item.remark}}
            </el-form-item> 

            <el-form-item label="上传身份证正面照">                
                    <file-list></file-list>
            </el-form-item>
            <el-form-item label="上传身份证反面照">
                <file-list></file-list>
            </el-form-item>
        </el-form>
    </CollapsePanel>
</template>
<script>
import CollapsePanel from '@/components/common/CollapsePanel';
import Upload from '@/components/common/Upload';
import FileList from '@/components/common/FileList';
/**
 * 代理商公司信息组件
 * TODO: 
 *  1. 上传文件接口
 *  2. 交互
 */
export default {
    name: "agentCompanyInfo",
    props: {
            item: Object,
            mode: {
                type: String,
                default: "view"
            }
        },
    components: {CollapsePanel, Upload, FileList},
    data() {
        return {
            expand: true,
            status: "",
            originalItem: {

            },
        };
    },
    methods: {
        handleEdit() {
                this.status = 'editing';
                this.originalItem = this.item;
                this.item = JSON.parse(JSON.stringify(this.item || {}));          
            },
            handleComplete() {
                this.status = '';                                
            },
            handleCancel() {
                this.status = '';
                this.item = this.originalItem;                
            }
    }
}
</script>
<style scoped>
.el-date-editor {
    width: 100%;
}
</style>