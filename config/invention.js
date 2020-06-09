import defaultConfig from './default'

const preface = `   本站旨在梳理人类所有发明，梳理发明间的逻辑关系，构建发明简史。以达到记录，启发作用。
您可以浏览现有发明词条或参与修正现有词条，贡献新词条。`

const view = {
  showNationalityAndCreator: true
}

const BAIDU_ANALYSIS_URL = 'https://hm.baidu.com/hm.js?72528ea8ec9a1263b81c1480df09a229'

const config = Object.assign({}, defaultConfig, {
  preface,
  view,
  BAIDU_ANALYSIS_URL
})

export default config
