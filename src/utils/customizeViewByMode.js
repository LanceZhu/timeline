import config from '../../config'

// 根据版本定制视图
export default function customizeViewByMode () {
  // 配置采用覆盖原有 data 方式
  switch (process.env.VUE_APP_DOMAIN_NAME) {
    case 'invention': {
      Object.assign(this.showObject, config.inventionViewConfig)
      break
    }
    case 'dev': {
      Object.assign(this.showObject, config.devViewConfig)
      break
    }
    default: {}
  }
}
