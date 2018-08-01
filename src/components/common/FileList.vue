<template>
    <ul class="file-list" :id="id">
        <li :key="f.url" v-for="f in fileList">            
            <img :src="f.url" v-if="isImg(f.url)">
            <a :download="f.fileName" target="_blank" v-else :href="f.url">{{f.fileName}}</a>            
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
import Viewer from "viewerjs/dist/viewer"
export default {
    name: "fileList",
    props: ['fileList'],
    data() {
        return {
            id: ""
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
            let reg = /(jpg|png|jpeg|gif|bmp)$/;
            return reg.test(src);
            // return true;
        }
    },
    created() {
        this.id = Math.random().toString().replace('0.','');
    },
    mounted() {
        this.$nextTick(()=> {
            this.viewer = new Viewer(document.getElementById(this.id))
        });
    },
    watch: {
        fileList() {
            if(this.viewer) {
                console.log('fileList changed...');
                this.viewer.destroy();
                this.$nextTick(()=>{                    
                    this.viewer = new Viewer(document.getElementById(this.id));
                })                
            }else{
                console.log('fileList changed');
                this.$nextTick(()=>{
                    this.viewer = new Viewer(document.getElementById(this.id));
                });
            }
        }
    } 
}
</script>

<style scoped>
img {
    width: 200px;
}
ul {
    list-style: none;
}
a {
    text-decoration: none;
    color: black;
}
</style>

