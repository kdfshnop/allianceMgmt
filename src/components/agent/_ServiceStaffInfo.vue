<template>
    <CollapsePanel class="gap-2" :expand="true">
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">悟空服务人员信息</span>            
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>         
        </div>
        <el-form :model="item" label-width= "180px">
            <el-row v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
                <el-col :span="12">
                    <el-form-item label="BD人员姓名">                        
                        <el-select
                            v-model="selectedBD"                            
                            filterable
                            remote                            
                            placeholder="请输入姓名"
                            :remote-method="getBDs"
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
                            filterable
                            remote                            
                            placeholder="请输入姓名"
                            :remote-method="getDirectors"
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
                    <el-form-item label="xxx部门 xxx职位">                        
                    </el-form-item>
                    <el-form-item label="xxx部门 xxx职位">                        
                    </el-form-item>
                    <el-form-item label="xxx部门 xxx职位">                        
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
                    <el-form-item label="xxx部门 xxx职位">                        
                    </el-form-item>
                    <el-form-item label="xxx部门 xxx职位">                        
                    </el-form-item>
                    <el-form-item label="xxx部门 xxx职位">                        
                    </el-form-item>
                </el-col>
            </el-row>         
        </el-form>
    </CollapsePanel>
</template>
<script>
    // TODO: 根据mode不同分为创建、编辑和详情三种模式
    import CollapsePanel from '@/components/common/CollapsePanel';
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
                bds: [],
                cxs: [],
                directors: [],
                bdsLoading: false,
                cxsLoading: false,
                directorsLoading: false,
                selectedBD: "",
                selectedCX: "",
                selectedDirector: "",
                status: '',
                bdInfo: this.item.bdInfo,
                cxInfo: this.item.cxInfo,
                directorInfo: this.item.directorInfo
            };
        },
        methods: {
            getBDs(keyword) {
                // TODO: 调用接口查询包含关键字的bd列表
                //bds = [];
                let tmpArr = [];
                for(let i = 1; i < 10; i++){
                    tmpArr.push({name: keyword + "-" + i, id: i});
                }    
                this.bds = tmpArr;            
            },
            getCXs(keyword) {
                // TODO: 调用接口查询包含关键字的彩霞人员列表
                let tmpArr = [];
                for(let i = 1; i < 10; i++){
                    tmpArr.push({name: keyword + "-" + i, id: i});
                }    
                this.cxs = tmpArr;

            },
            getDirectors(keyword) {
                // TODO： 调用接口查询包含关键字的1对1落地指导人员列表
                let tmpArr = [];
                for(let i = 1; i < 10; i++){
                    tmpArr.push({name: keyword + "-" + i, id: i});
                }    
                this.directors = tmpArr;
            },
            handleEdit() {
                this.status = 'editing';
                this.bdInfo = Object.assign({}, this.bdInfo);
                this.cxInfo = Object.assign({}, this.cxInfo);
                this.directorInfo = Object.assign({}, this.directorInfo);
            },
            handleComplete() {
                this.status = '';
                Object.assign(this.item, {
                    bdInfo: this.bdInfo,
                    cxInfo: this.cxInfo,
                    directorInfo: this.directorInfo
                });

                this.bdInfo = this.item.bdInfo;
                this.cxInfo = this.item.cxInfo;
                this.directorInfo = this.item.directorInfo;

                this.$emit('update:item', this.item);
            },
            handleCancel() {
                this.status = '';
                this.bdInfo = this.item.bdInfo;
                this.cxInfo = this.item.cxInfo;
                this.directorInfo = this.item.directorInfo;
            }
        },
        watch: {
            selectedBD() {
                // TODO: 根据选中的id从bds中反查出bd的信息
                let bd = this.bds.filter((b) => {
                    return b.id == this.selectedBD;
                });

                if(bd && bd.length) {
                    this.bdInfo = bd[0];
                }

                if(this.mode == 'create') {
                    this.item.bdInfo = this.bdInfo;
                    this.$emit('update:item', this.item);
                }
            },
            selectedCX() {
                // TODO: 根据选中的id从CXs中反查出彩霞人员信息
                let cx = this.bds.filter((c) => {
                    return c.id == this.selectedCX;
                });

                if(cx && cx.length) {
                    this.cxInfo = cx[0];
                }

                if(this.mode == 'create'){
                    this.item.cxInfo = this.cxInfo;
                    this.$emit('update:item', this.item);
                }
            },
            selectedDirector() {
                // TODO: 根据选中的id从directors中反查出director信息
                let d = this.bds.filter((x) => {
                    return x.id == this.selectedDirector;
                });

                if(d && d.length) {
                    this.directorInfo = d[0];
                }

                if(this.mode == 'create') {
                    this.item.directorInfo = this.directorInfo;
                    this.$emit('update:item', this.item);
                }
            }
        }

    }
</script>
<style scoped>
.el-select {
    width: 100%;
}
</style>