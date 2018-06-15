<template>
    <CollapsePanel class="gap-2" :expand="true">
        <div align-left slot="header" class="clearfix">
            <span>悟空服务人员信息</span>            
        </div>
        <el-form :model="item" label-width= "180px">
            <el-row>
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
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
                                v-for="item in bds"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
        props: ['item', 'mode'],
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
                selectedDirector: ""
            };
        },
        methods: {
            getBDs(keyword) {
                // TODO: 调用接口查询包含关键字的bd列表
                //bds = [];
                let tmpArr = [];
                for(let i = 1; i < 10; i++){
                    tmpArr.push({label: keyword + "-" + i, value: i});
                }    
                this.bds = tmpArr;            
            },
            getCXs(keyword) {
                // TODO: 调用接口查询包含关键字的彩霞人员列表
                let tmpArr = [];
                for(let i = 1; i < 10; i++){
                    tmpArr.push({label: keyword + "-" + i, value: i});
                }    
                this.cxs = tmpArr;

            },
            getDirectors(keyword) {
                // TODO： 调用接口查询包含关键字的1对1落地指导人员列表
                let tmpArr = [];
                for(let i = 1; i < 10; i++){
                    tmpArr.push({label: keyword + "-" + i, value: i});
                }    
                this.directors = tmpArr;
            }
        },
        watch: {
            selectedBD() {
                // TODO: 根据选中的id从bds中反查出bd的信息

            },
            selectedCX() {
                // TODO: 根据选中的id从CXs中反查出彩霞人员信息
            },
            selectedDirector() {
                // TODO: 根据选中的id从directors中反查出director信息
            }
        }

    }
</script>
<style scoped>
.el-select {
    width: 100%;
}
</style>