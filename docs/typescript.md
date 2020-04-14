# Vue 添加 typescript 支持

## 内容

为已有 `Vue2` 项目添加 `typescript` 支持

## 具体操作
```shell
vue add typescript // 直接通过 vue-cli 添加。想要手动添加或了解 vue-cli 添加了什么，可查看参考文章1
```
## 工作机理

### .ts 文件

对于纯 typescript 文件，即 `.ts` 文件，可通过 `typescript` 编译器 `tsc` 直接生成 `.js` 文件
安装 `typescript` 编译器

```
npm install typescript -g
```
编译 `index.ts` 生成 `index.js`
```shell
tsc index.ts
```
```javascript
// index.ts
function saySomething (s: string) : void {
  console.log(s)
}

// index.js
function saySomething(s) {
    console.log(s);
}
```
### .vue 文件

对于 `Vue` 单页面应用，即 `.vue`文件，需要通过 `webpack` + `vue-loader` + `ts-loader` 处理

#### 1. 通过 `vue-loader` 实现对 `.vue`文件的支持

`webpack` rules 字段配置

```
// webpack.config.js
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
      ...
    }
  ]
}
```
同时需要添加 vue-loader plugin，该插件使得其他 loader 也可作用于 `.vue`文件中的不同块，如 `css-loader`作用于 `style`标签块，`ts-loader`作用于`script`标签块
```
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
...
// webpack plugins 字段配置
plugins: [
  new VueLoaderPlugin()
]
```
#### 2. `ts-loader` 处理 `.vue`文件中的 `typescript` 部分

通过 `script` 中 `lang='ts'` 启用 `typescript`

```
<script lang='ts'>
...
</script>
```
`webpack` 配置 `ts-loader`
```
{
  test: /\.tsx?$/,
  loader: 'ts-loader'
  options: {
    appendTsSuffixTo: [/\.vue$/] // 为 .vue 文件添加 ts 后缀，实现对代码指定块部分的处理 参考：https://github.com/TypeStrong/ts-loader#appendtssuffixto
  }
}
```
#### 3. 添加对 vue 自身的类型说明

```typescript
// shims-vue.d.ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```
## 具体编写
### 组件写法
为了实现 typescript 对 vue 组件的推导，不能直接使用原有写法

原有写法
```
export default {
  data () {
   something: 'hello world' 
  }
}
```
这样 typescirpt 不能判断该部分为 vue 组件。

需要使用 **Vue.extend** 或 **类组件** 写法

Vue.extend 示例
```
import Vue from 'vue'

export default Vue.extend({
  data () {
    something: 'hello world'
  }
})
```

类组件示例

```
import Vue from 'vue'
import Component from 'vue-class-component'

// es7 装饰器
@Component
export default class Counter extends Vue {
  saySomething = 'hello world'
}
```
详见：[vue-class-component](https://class-component.vuejs.org/)
### 添加类型

#### 组件内添加类型定义

完成以上步骤后便可在以上组件中添加类型注解
```
saySomething: string = 'hello world'
```

#### 为第三方库添加类型定义

以 axios 为例。为了方便 vue 组件中对 axios 的调用，常把 axios 挂载到 Vue 原型上。
即

```javascript
import Vue form 'vue'
import Axios form 'axios`
Vue.prototype.$axios = Axios
```
再添加 typescript 支持后，会提示 this.$axios(`this` 为 vue 实例) 未定义。需要添加类型说明。在安装 axios 后，axios 包内自带类型文件，可通过以下方法，添加类型说明
```javascript
import Vue from 'vue'
import { AxiosStatic } from 'axios/index.d'
// mount axios on Vue.prototype
declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic
  }
}
```


## 参考文章
1. [microsoft/TypeScript-Vue-Starter](https://github.com/microsoft/TypeScript-Vue-Starter)
2. [vue.js typescript support](https://vuejs.org/v2/guide/typescript.html)
3. [typescript documentation](https://www.typescriptlang.org/docs/home.html)