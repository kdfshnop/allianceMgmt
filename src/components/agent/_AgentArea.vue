<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">请选择代理区域</span> <span style="margin-left: -20px;font-size: 14px; color: red;">(代理区域将影响关联门店区域，即该代理商所扩展的门店必须与其代理的区域相符！)</span>             
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                             
        </div>
        <el-form ref="form" :model="item" label-width= "180px">                               
            <el-form-item label="代理区域">    
                <ul class="region">
                    <li v-for="(region, index) in regions" :key="index">
                        <span v-for="(s,i) in region.label" :key="i">{{s}}</span> <el-button type="text" class="remove" @click="handleRemove(index)" v-show="mode=='create' || mode=='edit' && status=='editing'"><i class="el-icon-error"></i></el-button>
                    </li>
                </ul>                                        
            </el-form-item>                                                         
            <el-form-item label="" v-show="mode == 'create' || mode=='edit' && status=='editing'">                                            
                <el-button type="text" @click="handleAddRegion">添加代理区域</el-button>
            </el-form-item>                                                                                      
        </el-form>

        <el-dialog title="添加代理区域" :visible.sync="visible">
            <region ref="region" v-model="selectedRegion"></region>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddRegionConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </CollapsePanel>
</template>
<script>
import CollapsePanel from '@/components/common/CollapsePanel';
import Region from '@/components/common/Region';
import {generateComputed} from './_Utils';
import {mapMutations} from 'vuex';
/**
 * 代理区域组件
 * TODO:
 *  1. 城市数组件调研
 *  2. 交互
 */
export default {
    name: "agentArea",
    props: ['item', 'mode'],
    components: {CollapsePanel, Region},
    data() {
        return {
            expand: true,
            visible: false,
            // regions: [],
            selectedRegion: [],
            status: '',
            innerItem: {
                regions: []
            }
        };
    },
    computed: {
        regions: generateComputed("regions", "AgentArea", "updateItem")
    },
    methods: {
        handleAddRegion() {                  
            this.visible = true;                 
        },
        handleAddRegionConfirm() {
            if(this.mode=='create') {
                let tmp =  this.regions.slice();
                tmp.push({
                        val: this.selectedRegion,
                        label: this.selectedRegion.label
                    });            
                this.updateItem({regions: tmp});
            }else{
                this.regions.push({
                    val: this.selectedRegion,
                    label: this.selectedRegion.label
                });
            }
            
            this.visible = false;
            if(this.$refs.region) {
                this.$refs.region.clear();       
            }
        },
        handleRemove(index) {
            if(this.mode == 'edit') {
                this.regions.splice(index, 1);
            } else {
                let tmp = this.regions.slice();
                tmp.splice(index, 1);
                this.updateItem({regions: tmp});
            }
        },
        handleEdit() {
            this.status = 'editing';                
            this.innerItem = JSON.parse(JSON.stringify(this.$store.state.AgentArea || {regions: []}));          
        },
        handleComplete() {
            this.status = '';  
            this.updateItem(this.innerItem);             
        },
        handleCancel() {
            this.status = '';            
        },
        validate(fn) {
            this.$refs.form.validate(fn);
        },

        ...mapMutations('AgentArea', ['updateItem', 'updateRegions'])
    }
}
</script>
<style scoped>
.el-select {
    width: 100%;
}

.region li {
    list-style-type: none;
    position: relative;
}
.region span + span::before{
    content: " / "
}

.remove {
    position: absolute;
    font-size: 16px;
    color: red;
    margin-left: 12px;
    /* top: -12px; */
    top: -3px;
}
</style>