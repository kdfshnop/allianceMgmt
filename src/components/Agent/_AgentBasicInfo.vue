<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">代理商基本信息</span>    
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                    
        </div>
        <el-form :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="代理商类型">
                        <el-select v-model="item.type" placeholder="请选择">
                            <el-option
                                v-for="item in agentTypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="合作开始时间">                        
                         <el-date-picker
                            v-model="item.startDate"
                            type="date"
                            placeholder="选择日期">
                         </el-date-picker>
                    </el-form-item>                                                         
                </el-col>
                <el-col :span="12">  
                    <el-form-item label="上级代理商">              
                        <el-select v-model="item.parent" placeholder="请选择">
                            <el-option
                                v-for="item in parentAgents"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>   
                    <el-form-item label="合作结束时间">
                        <el-date-picker
                            v-model="item.endDate"
                            type="date"
                            placeholder="选择日期">
                         </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>                        
        </el-form>

        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="代理商类型">
                        <el-select v-model="item.type" placeholder="请选择">
                            <el-option
                                v-for="item in agentTypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="合作开始时间">                        
                         {{item.startDate}}
                    </el-form-item>                                                         
                </el-col>
                <el-col :span="12">  
                    <el-form-item label="上级代理商">              
                        <el-select v-model="item.parent" placeholder="请选择">
                            <el-option
                                v-for="item in parentAgents"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>   
                    <el-form-item label="合作结束时间">
                        {{item.endDate}}
                    </el-form-item>
                </el-col>
            </el-row>                        
        </el-form>
    </CollapsePanel>
</template>
<script>

import CollapsePanel from '@/components/common/CollapsePanel';
/**
 * 代理商基本信息组件
 * TODO:
 *  1. 填充
 */
export default {
    name: "agentBasicInfo",
    props: {
            item: Object,
            mode: {
                type: String,
                default: "view"
            }
        },
    components: {CollapsePanel},
    data() {
        return {
            expand: true,
            status: "",
            originalItem: {

            },
            agentTypes: [{
                label: "请选择",
                value: "0"
            },{
                label: "城市代理商（一级代理商）",
                value: "1"
            },{
                label: "区代理商（二级代理商）",
                value: "2"
            }],
            parentAgents: [{
                label: "请选择",
                value: "0"
            },{
                label: "无上级代理商",
                value: "1"
            },{
                label: "城市代理商A",
                value: "2"
            },{
                label: "城市代理商B",
                value: "3"
            },{
                label: "城市代理商C",
                value: "4"
            }]
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
.el-select, .el-date-editor {
    width: 100%;
}
</style>