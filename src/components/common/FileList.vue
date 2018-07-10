<template>
    <ul v-if="fileList && fileList.length">
        <li :key="f.url" v-for="f in fileList">
            <img v-if="isImg(f.url)" :src="f.url">
            <a v-else :href="f.url">{{f.name}}</a>            
        </li>
    </ul>
</template>
<script>
/**
    显示文件的列表
    TODO:
     1. 支持图片预览功能
     2. 根据类型不同展示不同的图标
     3. 多种视图方式（不一定要实现）
 */
export default {
    name: "fileList",
    props: ['fileList'],
    data() {
        return {

        };
    }, 
    computed: {
        innerFileList() {
            let ret = [];
            if(this.fileList && this.fileList.length) {
                let imgs = [];
                let files = [];
                this.fileList.forEach(f => {
                    if(this.isImg(f.url)) {
                        imgs.push(f);
                    }else{
                        files.push(f);
                    }
                });

                ret = ret.concat(files).concat(imgs);
            }

            return ret;
        }
    },
    methods: {
        isImg(src) {
            let reg = /jpg|png|jpeg|gif/;
            return reg.test(src);
        }
    }  
}
</script>

<style>

</style>

