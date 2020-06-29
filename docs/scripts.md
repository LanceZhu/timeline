# scripts 相关脚本说明

## 目录结构
```
scripts
├── build.sh
├── deploy.sh // 打包生产环境代码，并部署到服务器
├── flushCDN.sh // 刷新腾讯云 CDN，整个目录刷新
└── version.js // 获取 git commit 信息，嵌入到代码包中
```