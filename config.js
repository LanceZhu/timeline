import { internetConfig, inventionConfig, educationConfig, eechinaConfig, devConfig, defaultConfig } from './config/index'

let config = defaultConfig

switch (process.env.VUE_APP_SUBDOMAIN) {
  case 'internet': {
    config = internetConfig
    break
  }
  case 'invention': {
    config = inventionConfig
    break
  }
  case 'education': {
    config = educationConfig
    break
  }
  case 'eechina': {
    config = eechinaConfig
    break
  }
  case 'dev': {
    config = devConfig
    break
  }
  default: {}
}

export default config
