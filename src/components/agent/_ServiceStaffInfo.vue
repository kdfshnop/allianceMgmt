<template>
    <CollapsePanel class="gap-2" :expand="true">
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">悟空服务人员信息</span>            
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>         
        </div>
        <el-form ref="form" :model="item" label-width= "180px">
            <el-row v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
                <el-col :span="12">
                    <el-form-item label="BD人员姓名">                        
                        <el-select
                            v-model="selectedBD"                            
                            filterable
                            remote                            
                            placeholder="请输入姓名"
                            :remote-method="getBDs"
                            @change="handleBdchange"
                            :loading="bdsLoading">
                            <el-option
                                v-for="item in bds"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="彩霞服务人员姓名">
                        <el-select
                            v-model="selectedCX"                            
                            filterable
                            remote                            
                            placeholder="请输入姓名"
                            :remote-method="getCXs"
                            @change="handleCxchange"
                            :loading="cxsLoading">
                            <el-option
                                v-for="item in cxs"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="1对1落地指导">
                        <el-select
                            v-model="selectedDirector" 
                            :value="bdInfo.id"                           
                            filterable
                            remote                            
                            placeholder="请输入姓名"
                            :remote-method="getDirectors"
                            @change="handleDirectorchange"
                            :loading="directorsLoading">
                            <el-option
                                v-for="item in directors"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item> 
                            {{bdInfo.department}} - {{bdInfo.title}}                       
                    </el-form-item>                    
                    <el-form-item> 
                            {{cxInfo.department}} - {{cxInfo.title}}                       
                    </el-form-item>                    
                    <el-form-item>      
                            {{directorInfo.department}} - {{directorInfo.title}}
                    </el-form-item>
                </el-col>
            </el-row>   
            <el-row v-show="mode === 'view' || mode === 'edit' && status === ''">
                <el-col :span="12">
                    <el-form-item label="BD人员姓名">                        
                        {{bdInfo.name}}
                    </el-form-item>
                    <el-form-item label="彩霞服务人员姓名">
                        {{cxInfo.name}}
                    </el-form-item>
                    <el-form-item label="1对1落地指导">
                        {{directorInfo.name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item> 
                            {{bdInfo.department}} - {{bdInfo.title}}                       
                    </el-form-item>                    
                    <el-form-item> 
                            {{cxInfo.department}} - {{cxInfo.title}}                       
                    </el-form-item>                    
                    <el-form-item>      
                            {{directorInfo.department}} - {{directorInfo.title}}
                    </el-form-item>
                </el-col>
            </el-row>         
        </el-form>
    </CollapsePanel>
</template>
<script>
    // TODO: 根据mode不同分为创建、编辑和详情三种模式
    import CollapsePanel from '@/components/common/CollapsePanel';
    import {generateComputed} from "./_Utils";
    import {mapMutations} from "vuex";

    // 服务人员信息
    export default {
        name: "serviceStaffInfo",
        components: {CollapsePanel},
        props: {
            item: Object,
            mode: {
                type: String,
                default: 'view'
            }
        },
        data() {
            return {               
                bdsLoading: false,
                cxsLoading: false,
                directorsLoading: false,
                selectedBD: "",
                selectedCX: "",
                selectedDirector: "",
                status: '',
                innerItem: {},
                bds:[],
                cxs:[],
                directors:[]              
            };
        },
        computed: {
            "bdInfo": generateComputed("bdInfo", "ServiceStaffInfo", "updateBdInfo"),
            "cxInfo": generateComputed("cxInfo", "ServiceStaffInfo", "updateCxInfo"),
            "directorInfo": generateComputed("directorInfo", "ServiceStaffInfo", "updateDirectorInfo")
        },
        methods: {
            getBDs(keyword) {    
                // if(keyword === '' || keyword == null) {
                //     return;
                // }
                this.$http.get(this.$apiUrl.common.employee,{
                    params: {
                        personType: 2,
                        name: keyword
                    }
                }).then((data)=>{                    
                    this.bds = data.data.data;
                });
                           
            },
            getCXs(keyword) {
                this.$http.get(this.$apiUrl.common.employee,{
                    params: {
                        personType: 7,
                        name: keyword
                    }
                }).then((data)=>{
                    this.cxs = data.data.data;
                });
            },
            getDirectors(keyword) {
                this.$http.get(this.$apiUrl.common.employee, {
                    params: {
                        personType: 8,
                        name: keyword
                    }
                }).then((data)=>{
                    this.directors = data.data.data;
                });
            },
            handleEdit() {
                this.status = 'editing';
                this.innerItem = JSON.parse(JSON.stringify(this.$store.state.ServiceStaffInfo||{}));
            },
            handleComplete() {
                this.status = '';
                this.updateItem(this.innerItem);
            },
            handleCancel() {
                this.status = '';
            },

            handleBdchange(val) {
                let t = this.bds.filter((b)=>b.id == val);
                if(t && t.length) {
                    this.bdInfo.name = t[0].name;
                    this.bdInfo.department = t[0].department;
                    this.bdInfo.title = t[0].title;
                    this.bdInfo.id = t[0].id;

                    if(this.mode=='create'){
                        this.updateBdInfo(this.bdInfo);
                    }
                }
            },
            handleCxchange(val) {
                let t = this.cxs.filter((b)=>b.id == val);
                if(t && t.length) {
                    this.cxInfo.name = t[0].name;
                    this.cxInfo.department = t[0].department;
                    this.cxInfo.title = t[0].title;
                    this.cxInfo.id = t[0].id;

                    if(this.mode=='create'){
                        this.updateCxInfo(this.cxInfo);
                    }
                }
            },
            handleDirectorchange(val) {
                let t = this.directors.filter((b)=>b.id == val);
                if(t && t.length) {
                    this.directorInfo.name = t[0].name;
                    this.directorInfo.department = t[0].department;
                    this.directorInfo.title = t[0].title;
                    this.directorInfo.id = t[0].id;

                    if(this.mode=='create'){
                        this.updateDirectorInfo(this.directorInfo);
                    }
                }
            },
            validate(fn) {
                this.$refs.form.validate(fn);
            },

            ...mapMutations("ServiceStaffInfo", ['updateItem', 'updateBdInfo', 'updateCxInfo', 'updateDirectorInfo'])
        },
        watch: {            
        }

    }
</script>
<style scoped>
.el-select {
    width: 100%;
}
</style>