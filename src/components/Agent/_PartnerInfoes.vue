<template>
    <div>
        <partner-info :key="index" v-for="(index ,item) in items" :item.sync="item"></partner-info>
        <el-button type="primary" class="full-row gap-2" @click="addPartner">+ 添加合伙人</el-button>
    </div>
</template>
<script>
/**
 * 多个合伙人信息组件 
 * 
 * TODO: 1. 需要按照规则验证字段是否合法
 *       2. mode实现创建、编辑和详情三个模式
 */
    import Partner from './_PartnerInfo';
    // 服务人员信息
    export default {
        name: "corporateInfoes",
        components: {Partner},
        props: ['items', 'mode'],
        data() {
            return {
               
            };
        },
        methods: {
            addPartner() {
                this.items.push({expand: true});
            }
        },
        watch: {
            
        }
    }
</script>
<style scoped>

</style>