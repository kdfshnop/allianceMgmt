<template>
    <div>
        <partner-info :key="index" v-for="(item, index) in items" :mode="mode" :item="item" @close="handleRemove(index)"></partner-info>
        <el-button v-show="mode === 'create' || mode === 'edit' && status === 'editing'" type="primary" class="full-row gap-2" @click="addPartner">+ 添加合伙人</el-button>
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
    // 服务人员信息
    export default {
        name: "partnerInfoes",
        components: {PartnerInfo},
        props: {
            items: Array,
            mode: {
                type: String,
                default: "view"
            }
        },
        data() {
            return {
               
            };
        },
        methods: {
            addPartner() {
                this.items.push({expand: true, name: ""});
            },
            handleRemove(index) {
                this.items.splice(index, 1);
            }
        },
        watch: {
            
        }
    }
</script>
<style scoped>

</style>