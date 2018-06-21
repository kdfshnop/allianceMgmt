<template>
    <CollapsePanel @close="handleClose" class="gap-2" :expand="expand" :closable="mode=='create'||mode=='edit'&&status=='editing'">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">合伙人信息</span>
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                
        </div>
        <el-form :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="item.email"></el-input>
                    </el-form-item>

                    <el-form-item label="身份证号">
                        <el-input v-model="item.idCard"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="手机号">
                        <el-input v-model="item.mobile"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="芝麻信用">
                        <el-input v-model="item.zmCredit"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="合伙人背景">                        
                        <el-select v-model="item.bg" placeholder="请选择">
                            <el-option
                            v-for="bg in bgs"
                            :key="bg.value"
                            :label="bg.label"
                            :value="bg.value">
                            </el-option>
                        </el-select>
                        <el-input style="margin-top: 6px;" v-model="item.bgOther" v-show="item.bg=='5'"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
                        
            <el-form-item v-show="mode === 'create' || mode === 'edit' && status === 'editing'" label="备注信息">
                <el-input type="textarea" :rows="2" v-model="item.remark"></el-input>
            </el-form-item>            
        </el-form>

        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">
                        {{item.name}}
                    </el-form-item>
                    <el-form-item label="邮箱">
                        {{item.email}}
                    </el-form-item>

                    <el-form-item label="身份证号">
                        {{item.idCard}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="手机号">
                        {{item.mobile}}
                    </el-form-item>
                    
                    <el-form-item label="芝麻信用">
                        {{item.zmCredit}}
                    </el-form-item>
                    
                    <el-form-item label="合伙人背景">
                        {{bgText}}
                    </el-form-item>
                </el-col>
            </el-row>
                            
            <el-form-item label="备注信息">
                {{item.remark}}
            </el-form-item>
            </el-form>
    </CollapsePanel>
</template>
<script>
/**
 * 合伙人信息组件
 */
    import CollapsePanel from '@/components/common/CollapsePanel';
    // 服务人员信息
    export default {
        name: "partnerInfo",
        components: {CollapsePanel},
        props: {
            item: Object,
            mode: {
                type: String,
                default: "view"
            }
        },
        data() {
            return {
                expand: true,
                status: "",
                originalItem: {

                },
                bgs: [{
                    value: "0",
                    label: "请选择"
                },{
                    value: "1",
                    label: "新房代理商"
                },{
                    value: "2",
                    label: "二手房租房中介"
                },{
                    value: "3",
                    label: "头条、美团、58城市代理商"
                },{
                    value: "4",
                    label: "房产开发商"
                },{
                    value: "5",
                    label: "其他"
                }]
            };
        },
        methods: {
            handleEdit() {
                this.status = 'editing';
                this.originalItem = this.item;
                this.item = Object.assign({}, this.item);                
            },
            handleComplete() {
                this.status = '';    
                this.item = Object.assign(this.originalItem, this.item);                            
            },
            handleCancel() {
                this.status = '';
                this.item = this.originalItem;                
            },
            handleClose() {
                this.$emit('close');
            }       
        },
        computed: {
            bgText() {                
                let bg = this.bgs.filter((b)=>{return b.value==this.item.bg});
                if(bg && bg.length) {
                    bg = bg[0];
                    if(bg.value == '5'){// 其他
                        return bg.label + '-' + this.item.bgOther||'';
                    }

                    return bg.label;
                }

                return '';
            }
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