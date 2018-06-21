# alliance_fe

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 创建项目
- 使用vue-cli工具创建alliance_fe done
- 引入axios，封装一下，统一处理 done
  1. status done
  2. 未登陆状态（特殊状态），跳转到登陆页面 done
- 封装CollapsePanel done
- 调研搜索联想组件
- 调研手机号、邮箱等的验证
- 文件上传要跟后端协商接口，因为使用的是Element所以可能需要后端配合我们这边
- 调研省市区三级选择组件 使用Element中的tree
- 三种模式:create view edit

## 技术选型
- 使用Vue创建的单页应用
- 数据请求使用axios
- UI使用Element UI

## FQA
### 组件中怎么发送请求
首先要对axios有一点了解！  
把axios暴露在了Vue实例的$http字段上，因此在组件中可以使用this.$http.xxx来发送请求，下面是一个get的例子
```
// 假设在created中获取数据
created() {
  this.$http.get(this.apiUrl.test).then(res => {
    console.log(res.data);
  });
}
```
其中this.apiUrl我们接下来在配置接口地址中说明

### 配置接口地址
我们默认项目接口提供方是唯一的，也就是说不会调用多个域名地址提供的接口，如果后期有这种需求，需要进行修改。

在configs/api.js中配置接口地址，只需要配置path部分，域名部分会通过当前url来判断环境。判断环境的策略后面会说。api.js具体内容如下：
```
{
  test: "/test",
  anotherTest: {
    test: "/testxxx"
  }
}
```
因为apiUrl是个对象，因此理论上支持多层嵌套，可以把接口地址按照模块来划分到不同的命名空间下。开头的斜杠不要省略

### 判断环境的策略
根据当前浏览器中的url来判断环境，如果域名中有dev则是dev，有test则是test，有sim则是sim，否则就使用默认生产环境地址。

localhost认为是dev环境

### 个别不使用axios的地方怎么获取特定环境的接口全路径
项目中99.99%的接口都是使用axios来调用的，不过也可能会出现不能使用axios的情况，比如我们用的Element-UI中的el-upload，如果改造也能用axios来调用，不过谁又有那个闲工夫呢？！

提供了这个方法：Vue.apiUrl.getFullUrl(url),自动给url添加上符合当前环境的host。

```
Vue.apiUrl.getFullUrl(Vue.apiUrl.test);
```

## 1.0版本估时和分工
总时间30人天，两个人开发，耗时15工作日。


| 功能 | 开发 | 时间 |
|-----|------|-----|

