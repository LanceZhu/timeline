# timeline

## Have a look :star:

- [发明简史](http://invention.welishi.cn/)
- [互联网简史](http://internet.welishi.cn/)
- [高等工程教育简史](http://education.welishi.cn/)

## 项目启动

### 安装依赖
```
npm install
```

### 启动开发环境
```
npm run serve // 默认 dev 开发环境
npm run serve:invention // 发明简史开发环境
npm run serve:internet // 互联网简史开发环境
npm run serve:education // 高等工程教育简史开发环境
```

### 生产环境打包
```
npm run build // 与开发环境类似
```

### 格式化代码
```
npm run lint
```



## 后端 API 接口

- [API 接口文档](https://www.eolinker.com/#/share/index?shareCode=RsqC2F)

- [API 初版接口文档](https://www.eolinker.com/#/share/project/api/?groupID=-1&shareCode=SejBfm)
  password: timeline



## 技术栈

- [Vue.js](https://vuejs.org/) 前端框架
- [Vue Router](https://router.vuejs.org/) 路由处理
- [Vuex](https://vuex.vuejs.org/) 状态处理
- [Element UI](https://element.eleme.cn/#/zh-CN) UI 组件库
- [axios](https://github.com/axios/axios) 网络请求库
- [Eslint](https://eslint.org/) 代码格式化

- [vue-quill-editor](https://github.com/surmon-china/vue-quill-editor) 编辑器



## TODO

- [x] JavaScript => TypeScript

  仅增加了 TypeScript 支持

- [x] 移动端优化

  仅 首页及词条页

- [ ] SSR(Server Side Renderer) 服务端渲染

## Contribution

欢迎:raised_hands:

## 遇到的问题

[传送门:flushed:](./docs/questions.md)


## 更新日志

2020-1-9

- 优化包体积：使用 Vue 懒加载，Webpack SplitChunkPlugin，通过 CDN 加载 script

2019-11-18

- 添加时间点快捷切换链接，最后编辑者显示，样式优化
- 添加模糊时间点支持

2019-11-16

- 更改为单词条显示

## 维护日志

[docs/log.md](./docs/log.md)