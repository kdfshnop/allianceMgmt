<template>
    <el-dialog
        title="提示"
        :visible="visible"
        width="30%"  
        @update:visible="handleUpdate"     
        >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleUpdate(false)">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
        </span>
    </el-dialog>    
</template>
<script>
export default {
    name: 'dialogv',
    props: ['visible'],
    data() {
        return {
            dialogVisible: this.visible
        }
    },
    methods: {
        handleSave() {
            this.$emit('update:visible', false);
        },
        handleUpdate(val) {
            this.$emit("update:visible", val);
        }
    }
}
</script>
<style>

</style>


