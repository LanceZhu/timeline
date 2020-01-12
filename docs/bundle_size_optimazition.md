# 打包体积优化

**背景**：引入 UI 组件库 Element UI、Vue-quill-Editor、axios 打包代码体积 2M+，远超推荐体积 250K+，用户访网站
时响应慢，首屏加载时间 10s+ ，过长

**目的**：减少打包体积缩短首屏渲染时间，提升用户体验

**方法**：分 `自身业务代码` 和 `第三方依赖库` 两部分分别优化

**结果**：体积由 2M+ 减小至 500K-，首屏时间由 10s+ 缩短至 3s-

## 优化自身业务代码体积

1. **异步组件/异步路由 + Webpack code splitting 实现访问页面时加载**
   
   参考链接： [Vue 异步组件](https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components)

    具体操作：

    原代码

    ```javascript
    import 'dependency'
    ```
    =>

    改写成一个工厂函数

    ```javascript
    const dep = () => import('dependency)
    ```

2. **代码压缩混淆删除不必要信息**
  
   引入 Webpack 插件 [TerserWebpackPlugin](https://webpack.js.org/plugins/terser-webpack-plugin/#root) 压缩不必要空行，删除代码内注释信息

## 优化第三方依赖库体积

1. **按需引入**
   
   对于 Element UI，可通过官方推荐方式[按需引入](https://element.eleme.cn/#/zh-CN/component/quickstart)

2. **提取公共代码块减小体积**
   
   通过 Webpack version >= 4 中引入的 SplitChunkPlugin 提取公共代码

3. **将体积过大的第三方依赖以 CDN 形式引入**
   
   将不需要打包的第三方依赖通过 Webpack 中 externals 字段排除，同时在入口文件中以 script 标签形式引入 CDN 上的第三方依赖。
