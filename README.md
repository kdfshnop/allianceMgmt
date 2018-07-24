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

### 权限控制
期初考虑的是有页面的权限和页面中按钮（元素）的权限。因此在路由(router/index.js)中注册了beforeEach，但是后来框架那边说提供的接口只能查询页面元素的权限，因此注释掉了！

在beforeEach中会调用currentPerson来保证当前用户已经登录了，在调用这个接口时后端会下发一个wksso的cookie，这个是后端接口需要的，如果没有wksso，后端接口都会报错。

为了控制页面元素的权限，提供了utils/privilege，要控制权限的页面只需要使用这个mixin就可以了
```
let PrivilegeMixin from '@/utils/privilege';

...

mixins: [PrivilegeMixin],
...
data() {

  return {
    ...
    privilegeOption: {
      key: "/path#name"
    }
    ...

  }
}
...
```
其中key是随便起的，模板中使用，而后面的值则是要跟人事系统中配置的一样，一般会根据当前页面的路径来配置，不过其实只要能保证这个值是唯一的就行，还是建议使用当前页面的路径加上一个名字的规则。

然后就需要用查询出来的权限来控制页面中的元素的显示了。PrivilegeMixin会暴露privileges字段，是个对象，其中的key就是上面privilegeOption中的key。

```
...
<button v-show="privileges.key">创建</button>
...
```

详细可以参考项目中已经使用了权限控制的地方，比如代理商列表页！
### 命名约定
- 组件名都用驼峰格式，且第一个单词的第一个字母要大写
- 通用组件放在common目录里
- 每个模块有自己的目录，使用驼峰格式，第一个单词第一个字母小写
- 非页面组件用下划线开头，用来表示是包含在别的组件里面，common目录中的可以不用，因为这个目录就说明了它的用途


## 1.0版本估时和分工
总时间30人天，两个人开发，耗时15工作日。


| 功能 | 开发 | 时间 |
|-----|------|-----|

