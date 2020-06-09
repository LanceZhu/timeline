import defaultConfig from './default'

const tags = [
  {
    value: '数据库',
    label: '数据库'
  }, {
    value: '前端',
    label: '前端'
  }, {
    value: '后端',
    label: '后端'
  }, {
    value: '机器学习',
    label: '机器学习'
  }, {
    value: '计算机视觉',
    label: '计算机视觉'
  }, {
    value: '自然语言处理',
    label: '自然语言处理'
  }, {
    value: '深度学习',
    label: '深度学习'
  }, {
    value: '知识表示',
    label: '知识表示'
  }
]

const preface = `人工智能技术和算法研究资料编年汇编工具用于人工智能技术和算法研究资料的收集整理，现在我们实验室小范围内部交流研讨。
此版本尚处于实验中，用于有限范围内提升协作效率，以利于资料整理工作的改进迭代，请勿过度扩散。
此版本为1.0.0版本，需要大家协作编辑共同完成资料的收集整理。平台wiki中的bug，同学们可以点击“遇到问题，我要反馈”进行反馈，之后我们会逐步修正，也请同学们根据需求提供建议和意见，共同改进。`

const BAIDU_ANALYSIS_URL = 'https://hm.baidu.com/hm.js?5d713276953009449b9a6524f448855b'

const config = Object.assign({}, defaultConfig, {
  tags,
  preface,
  BAIDU_ANALYSIS_URL
})

export default config
