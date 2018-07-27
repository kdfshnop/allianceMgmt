<template>
   <div class="block">    
    <el-cascader
        :options="options"
        v-model="selectedOptions"
        @active-item-change="handleItemChange"
        @change="handleChange"        
        clearable
        >
    </el-cascader>
   </div> 
</template>
<script>
/**
 * 1.采用展开是异步加载的方式
 * 2.支持省/市/区/板块 level: 1/2/3/4，可以配置startLevel和endLevel，比如只想用区/板块，则需要指定startLevel: 3, endLevel:4,同时需要配置cityId
 * 3.根据startLevel和endLevel不同，需要的参数不同，如果是从省开始，则不需要传参，如果从市开始，则需要provinceId，如果是从区开始则需要cityId，如果从板块开始，需要districtId
 * 4.支持同步和异步
*/
class FetcherFactory {
    static create({vue, url, paramName, valueField = "id", labelField = "name", mayHasChildren = true, parse}) {

        return {
            fetch(paramValue) {
                let param = {

                };
                if(paramName) {
                    param[paramName] = paramValue;
                }
                return vue.$http.get(url, {
                    params: param
                }).then((data)=>{
                    return data.data;
                });                
            },
            parse(data) {
                if(data && data.length) {                    
                    if(parse) {
                        data = parse(data);
                    }
                    return data.map((d)=>{
                        return {
                            value: d[valueField],
                            label: d[labelField],
                            children: mayHasChildren ? [] : undefined
                        };
                    });
                }

                return [];
            }
        };
    }
}

export default {
     name: "region",
     props: {
       "startLevel": {
           type: Number,
           default: 1// 默认省级
       },
       "endLevel": {
           type: Number,
           default: 3// 默认区级
       },
       "initId": {// 用来标识第一级数据接口调用是需要的参数
           type: String,
           default: ""
       },  
       "value": Array,
       "data": Array, //同步全量数据          
       "parsers": Array, //处理异步数据
     },
     created() {
         if(this.data) {// 同步不发请求
             return;
         }

         if(this.startLevel > this.endLevel) {
             throw "endLevel不能小于startLeven";
         }
         let fetchers = {            
            province: FetcherFactory.create({
                vue: this,
                url: this.$apiUrl.common.province,
                paramName: "",
                mayHasChildren: this.endLevel != 1,
                valueField: "provinceId",
                labelField: "provinceName"                
            }),
            city: FetcherFactory.create({
                vue: this,
                url: this.$apiUrl.common.city,
                paramName: "provinceId",
                mayHasChildren: this.endLevel != 2,
                valueField: "cityId",
                labelField: "cityName"                
            }),
            district: FetcherFactory.create({
                vue: this,
                url: this.$apiUrl.common.district,
                paramName: "cityId",
                mayHasChildren: this.endLevel != 3,
                valueField: "regionId",
                labelField: "regionName"                
            }),
            town: FetcherFactory.create({
                vue: this,
                url: this.$apiUrl.common.town,
                paramName: "regionId",
                mayHasChildren: this.endLevel != 4,
                valueField: "id",
                labelField: "NAME"                
            })            
         };
         // 把外部的parsers传递给create
         
         let tmp = ["", "province", "city", "district", "town"];

         for(let i = this.startLevel; i <= this.endLevel; i++) {
            this.dataFetchers.push(fetchers[tmp[i]]);    
         }         

         // 如果有选中值则需要初始化更多层次
         let n = this.selectedOptions.length || 1;
         this.initOptionData(0, n, this.options);
     },
     data() {
      return {
        dataFetchers: [],
        options: this.data || [],
        selectedOptions: this.value, 
        innerValue: [],       
      };
     },
     mounted() {
         
     },
     methods: {
         clear() {
             this.selectedOptions = [];
         },
         handleItemChange(val) {
            if(this.data) {// 同步不需要发请求
                return;
            }
            if(val && val.length) {
                // 先判断是否已经有children了
                let tmp = {children: this.options};                
                for(let i = 0; i < val.length; i++) {
                    tmp = tmp.children.filter((d)=>{
                        return d.value == val[i];
                    });
                    if(tmp && tmp.length) {
                        tmp = tmp[0];
                    }else{
                        break;
                    }
                }

                if(tmp) {
                    if(tmp.children && tmp.children.length == 0) {// children中无数据，发请求获取
                        let fetcher = this.dataFetchers[val.length];
                        if(fetcher) {
                            fetcher.fetch(tmp.value).then((data)=>{
                                if(data && data.data && data.data.length){                                
                                    tmp.children = fetcher.parse(data.data);
                                }else{
                                    tmp.children = null;
                                }
                            });                            
                        }
                    }
                }
            }
         },
         initOptionData(s, n, options) {
             // 递归结束             
             if(s == n) {
                 return;
             }
             
             options = options || [];
             let fetcher = this.dataFetchers[s];
             if(fetcher) {
                 fetcher.fetch(this.selectedOptions[s-1] || s==0 && this.initId).then((data)=>{                                        
                    options.splice(0,options.length,...fetcher.parse(data.data));
                    options = options.filter((d)=>{
                        return d.value == this.selectedOptions[s];
                    });
                    options = options && options[0] && options[0].children || [];                
                    this.initOptionData(s + 1, n, options);
                 })
             }            
         },
         handleChange(val) {
             let tmp = {children: this.options};
             let label = [];
             for(let i = 0; i < val.length; i++) {
                 tmp = tmp.children.filter((d)=>{
                     return d.value == val[i];
                 });
                 if(tmp && tmp.length) {
                     tmp = tmp[0];
                     label.push(tmp.label);
                 } else {
                     break;
                 }
             }
             val.push(label);
             val.label = label;
             console.log('val: ', val);
             this.innerValue = val;
             this.$emit('input', val);
         }
     },
     watch: {
         'value': function(val) {
             if(val == this.innerValue) {
                 return;
             }
             this.selectedOptions = val;
             if(this.data){// 同步不需要发请求
                return; 
             }
             this.initOptionData(0, this.selectedOptions.length || 1, this.options);
         }
     }
}
</script>
<style>
 .el-cascader{
     width: 100%;
 }
</style>
