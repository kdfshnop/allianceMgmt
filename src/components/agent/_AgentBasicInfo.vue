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
                        <el-select v-model="type" placeholder="请选择">
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
                            v-model="startDate"
                            type="date"
                            placeholder="选择日期">
                         </el-date-picker>
                    </el-form-item>                                                         
                    <el-form-item label="代理商所属城市">                        
                        <region :startLevel="1" :endLevel="2" v-model="agentCity"></region>
                    </el-form-item>  
                </el-col>
                <el-col :span="12">  
                    <el-form-item label="上级代理商">              
                        <el-select v-model="parent" placeholder="请选择">
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
                            v-model="endDate"
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
                        {{typeStr}}
                    </el-form-item>
                    <el-form-item label="合作开始时间">                        
                         {{startDateStr}}
                    </el-form-item>     
                    <el-form-item class="region" label="代理商所属城市">                        
                        <span v-for="(l, index) in agentCityStr" :key="index">{{l}}</span>
                    </el-form-item>                                                    
                </el-col>
                <el-col :span="12">  
                    <el-form-item label="上级代理商">                                      
                        {{parentStr}}
                    </el-form-item>   
                    <el-form-item label="合作结束时间">
                        {{endDateStr}}
                    </el-form-item>
                </el-col>
            </el-row>                        
        </el-form>
    </CollapsePanel>
</template>
<script>

import CollapsePanel from '@/components/common/CollapsePanel';
import Region from '@/components/common/Region';
import {generateComputed, getDateStr} from './_Utils';
import {mapMutations} from 'vuex';
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
    components: {CollapsePanel, Region},
    data() {
        return {
            expand: true,
            status: "",            
            innerItem: {

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
            let tmp = JSON.parse(JSON.stringify(this.$store.state.AgentBasicInfo || {}));          
            tmp.startDate = tmp.startDate && new Date(tmp.startDate) || '';
            tmp.endDate = tmp.endDate && new Date(tmp.endDate) || '';
            this.innerItem = tmp;
        },
        handleComplete() {
            this.status = '';                                           
            this.updateItem(this.innerItem);
        },
        handleCancel() {
            this.status = '';            
        },


        ...mapMutations("AgentBasicInfo", ['updateItem', 'updateType', 'updateParent', 'updateStartDate', 'updateEndDate', 'updateAgentCity'])
    },
    computed: {
        type: generateComputed('type', 'AgentBasicInfo', 'updateType'),
        parent: generateComputed('parent', 'AgentBasicInfo', 'updateParent'),
        startDate: generateComputed('startDate', 'AgentBasicInfo', 'updateStartDate'),
        endDate: generateComputed('endDate', 'AgentBasicInfo', 'updateEndDate'),
        agentCity: generateComputed('agentCity', 'AgentBasicInfo', 'updateAgentCity'),

        typeStr() {
            let type = this.agentTypes.filter((t)=>{
                return t.value == this.type;
            });

            if(type && type.length){
                return type[0].label;
            }

            return '';
        },

        parentStr() {
            let parent = this.parentAgents.filter((f)=>{
                return f.value == this.parent;
            });

            if(parent && parent.length) {
                return parent[0].label;
            }

            return '';
        },
        startDateStr() {
            return getDateStr(this.startDate);
        },
        endDateStr() {
            return getDateStr(this.endDate);
        },
        agentCityStr() {
            if(this.agentCity && this.agentCity.length && this.agentCity.label && this.agentCity.label.length) {
                return this.agentCity.label;
            }

            return '';
        }
    }
}
</script>
<style scoped>
.el-select, .el-date-editor {
    width: 100%;
}

.region span + span::before {
    content: " / "
}
</style>