<template>
   <div class="block">    
    <el-cascader
        :options="options"
        v-model="selectedOptions"
        @active-item-change="handleItemChange"
        @change="handleChange"
        >
    </el-cascader>
   </div> 
</template>
<script>
/**
 * 1.采用展开是异步加载的方式
 * 2.支持省/市/区/板块 level: 1/2/3/4，可以配置startLevel和endLevel，比如只想用区/板块，则需要指定startLevel: 3, endLevel:4,同时需要配置cityId
 * 3.根据startLevel和endLevel不同，需要的参数不同，如果是从省开始，则不需要传参，如果从市开始，则需要provinceId，如果是从区开始则需要cityId，如果从板块开始，需要districtId
 * 
*/
class FetcherFactory {
    static create({vue, url, paramName, valueField = "id", labelField = "name", mayHasChildren = true}) {

        return {
            fetch(paramValue) {
                let param = {

                };
                if(paramName) {
                    param[paramName] = paramValue;
                }
                // return vue.$http.get(this.url, {
                //     params: param
                // });
                return new Promise(function(resolve, reject) {
                    switch(paramName){
                        case "provinceId":
                            if(paramValue == 1) {
                                resolve({
                                    data: [{
                                        cityId: 1,
                                        cityName: "郑州"
                                    },{
                                        cityId: 2,
                                        cityName: "商丘"
                                    }]
                                });
                            } else {
                                resolve({
                                    data: [{
                                        cityId: 3,
                                        cityName: "石家庄"
                                    },{
                                        cityId: 4,
                                        cityName: "张家口"
                                    }]
                                });
                            }
                        break;
                        case "cityId":
                            resolve({
                                data: [{
                                    regionId: 1,
                                    regionName: "区域"
                                }]
                            });
                        break;
                        case "districtId":
                            resolve({
                                data: [{
                                    townId: 1,
                                    townName: "板块"
                                }]
                            });
                        break;
                        default: resolve({
                            data: [{
                                provinceId: 1,
                                provinceName: "河南"
                                },{
                                    provinceId: 2,
                                    provinceName: "河北"
                                }]
                            });
                        break; 
                    }                    
                });
            },
            parse(data) {
                if(data && data.length) {
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
       "value": Array          
     },
     created() {
         if(this.startLevel > this.endLevel) {
             throw "endLevel不能小于startLeven";
         }
         let fetchers = {
            //  province: {
            //      url: this.$apiUrl.region.province,
            //      paramName: "",
            //      parse: (data)=>{
            //          return data && data.length && data.map((d)=>{
            //             return {
            //                 label: d.name,
            //                 value: d.id,
            //                 children: this.endLevel != 1 ? [] : null
            //             };
            //          }) || [];
            //      }
            //  }, 
            province: FetcherFactory.create({
                vue: this,
                url: this.$apiUrl.region.province,
                paramName: "",
                mayHasChildren: this.endLevel != 1,
                valueField: "provinceId",
                labelField: "provinceName"                
            }),
            city: FetcherFactory.create({
                vue: this,
                url: this.$apiUrl.region.cityId,
                paramName: "provinceId",
                mayHasChildren: this.endLevel != 2,
                valueField: "cityId",
                labelField: "cityName"                
            }),
            district: FetcherFactory.create({
                vue: this,
                url: this.$apiUrl.region.district,
                paramName: "cityId",
                mayHasChildren: this.endLevel != 3,
                valueField: "regionId",
                labelField: "regionName"                
            }),
            town: FetcherFactory.create({
                vue: this,
                url: this.$apiUrl.region.town,
                paramName: "districtId",
                mayHasChildren: this.endLevel != 4,
                valueField: "townId",
                labelField: "townName"                
            }),
            //  city: {
            //      url: this.$apiUrl.region.city,
            //      paramName: "provinceId",
            //      parse: (data)=> {
            //          return data && data.length && data.map((d)=>{
            //              return {
            //                  label: d.cityName,
            //                  value: d.cityId,
            //                  children: this.endLevel !=2 ? [] : null
            //              }
            //          });
            //      }
            //  },
            //  district: {
            //      url: this.$apiUrl.region.district,
            //      paramName: "cityId",
            //      parse: (data)=>{
            //          return data && data.length && data.map((d)=>{
            //              return {
            //                  label: d.reginName,
            //                  value: d.regionid,
            //                  children: this.endLevel != 3 ? []: null
            //              }
            //          });
            //      }
            //  }, 
            //  town: {
            //      url: this.$apiUrl.region.town,
            //      paramName: "regionId",
            //      parse: (data)=>{
            //          return data && data.length && data.map((d)=>{
            //              return {
            //                  label: d.townName,
            //                  value: d.townId                             
            //              }
            //          });
            //      }
            //  }
            };
         
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
        options: [],
        selectedOptions: this.value,        
      };
     },
     mounted() {
         
     },
     methods: {
         clear() {
             this.selectedOptions = [];

         },
         handleItemChange(val) {
             console.log('val:', val);
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
                 fetcher.fetch(this.selectedOptions[s-1] || this.initId).then((data)=>{                                        
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
             val.label = label;
             console.log('val: ', val);
             this.$emit('input', val);
         }
     }
}
</script>
<style>
 .el-cascader{
     width: 100%;
 }
</style>
