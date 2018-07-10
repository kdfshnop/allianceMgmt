<template>
    <div>
        <partner-info :ref="'pi' + index" :key="index" v-for="(item, index) in items" :mode="mode" :item="item" @input="handleInput" @close="handleRemove(index)"></partner-info>
        <el-button v-show="mode === 'create' || mode === 'edit'" type="primary" class="full-row gap-2" @click="addPartner">+ 添加合伙人</el-button>
    </div>
</template>
<script>
/**
 * 多个合伙人信息组件 
 * 
 * TODO: 1. 需要按照规则验证字段是否合法
 *       2. mode实现创建、编辑和详情三个模式
 */
    import PartnerInfo from './_PartnerInfo';
    import {generateComputed} from './_Utils';
    import {mapMutations} from 'vuex';
    // 服务人员信息
    export default {
        name: "partnerInfoes",
        components: {PartnerInfo},
        props: {
            // items: Array,
            mode: {
                type: String,
                default: "view"
            }
        },
        data() {
            return {
               //items: this.$store.state.PartnerInfo.partnerInfo
            };
        },
        methods: {
            addPartner() {
                //this.items.push({name: "", mobile: "", email: "", score: "", idCard: "", bg: "", remark: ""});

                this.addItem({_t: Date.now(), name: "", mobile: "", email: "", credit: "", idCode: "", background: "", remark: "", backgroundRemark: ""});
            },
            handleRemove(index) {
                //this.items.splice(index, 1);
                this.removeItem(index);
            },
            handleInput(val) {
                for(let i = 0; i < this.items.length; i++) {
                    if(this.items[i]._t == val._t) {
                        val.index = i;
                        this.updateItem(val);
                        break;
                    }
                }                
            },
            validate(fn) {
                // this.$refs.form.validate(fn);
                let n = 0;
                for(let i = 0; i < this.items.length; i++) {
                    this.$refs['pi' + i][0].validate((valid)=>{
                        if(valid){
                            n++;
                        }
                    });
                }
                fn(this.items.length == n);
            },

            ...mapMutations('PartnerInfo', ['updateItems', 'updateItem', 'removeItem', 'addItem'])
        },
        computed: {
            items: function(){
                return this.$store.state.PartnerInfo.partnerInfo;
            }
        },
        watch: {
            
        }
    }
</script>
<style scoped>

</style>