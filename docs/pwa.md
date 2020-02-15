# PWA(Processive Web App)

## Intro

PWA 渐进式网络应用，可提供类似于原生应用的体验。主要依赖于 Service Worker 技术。

## 实践

### 基本操作

参考 [how to use service worker - baidu](https://lavas.baidu.com/pwa/offline-and-cache-loading/service-worker/how-to-use-service-worker)

### Vue

引入 [cli-plugin-pwa](https://cli.vuejs.org/core-plugins/pwa.html)

``` shell
vue add @vue/cli-plugin-pwa
```

在 src 目录下生成的 `registerServiceWorker.js` 中编写逻辑代码，其中 [register-service-worker](https://github.com/yyx990803/register-service-worker) 库对常见事件做了封装。

## 注意点

- 必须使用 https 或 localhost

## 遇到的问题

- TerserWebpackPlugin 配置清除掉了 console 输出