<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">请选择代理区域</span>               
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                             
        </div>
        <el-form :model="item" label-width= "180px">                               
            <el-form-item label="代理区域">    
                <ul class="region">
                    <li v-for="(region, index) in innerItem.regions" :key="index">
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
    methods: {
        handleAddRegion() {                  
            this.visible = true;                 
        },
        handleAddRegionConfirm() {
            this.innerItem.regions.push({
                val: this.selectedRegion,
                label: this.selectedRegion.label
            });
            this.visible = false;
            if(this.$refs.region) {
                this.$refs.region.clear();       
            }
        },
        handleRemove(index) {
            this.regions.splice(index, 1);
        },
        handleEdit() {
            this.status = 'editing';                
            this.innerItem = JSON.parse(JSON.stringify(this.$store.state.AgentArea || {}));          
        },
        handleComplete() {
            this.status = '';                                
        },
        handleCancel() {
            this.status = '';
            // this.innerItem =                            
        },
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