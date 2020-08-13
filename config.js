import { internetConfig, inventionConfig, educationConfig, eechinaConfig, devConfig, defaultConfig, aidataConfig, edudataConfig, cisConfig } from './config/index'

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
  case 'aidata': {
    config = aidataConfig
    break
  }
  case 'edudata': {
    config = edudataConfig
    break
  }
  case 'dev': {
    config = devConfig
    break
  }
  case 'cis': {
    config = cisConfig
    break
  }
  default: {}
}

export default config
