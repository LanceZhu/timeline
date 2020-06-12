import defaultConfig from './default'

const tags = [
  {
    value: '元认知',
    label: '元认知'
  }, {
    value: '自主学习',
    label: '自主学习'
  }, {
    value: '数据表征',
    label: '数据表征'
  }, {
    value: '学习分析',
    label: '学习分析'
  }, {
    value: '混合教育模式',
    label: '混合教育模式'
  }, {
    value: '在线教育',
    label: '在线教育'
  }, {
    value: '认知层级',
    label: '认知层级'
  }
]

const preface = `教育大数据研究资料编年汇编工具用于教育大数据研究资料的收集整理，现在我们实验室小范围内部交流研讨。
此版本尚处于实验中，用于有限范围内提升协作效率，以利于资料整理工作的改进迭代，请勿过度扩散。
此版本为1.0.0版本，需要大家协作编辑共同完成资料的收集整理。平台wiki中的bug，同学们可以点击“遇到问题，我要反馈”进行反馈，之后我们会逐步修正，也请同学们根据需求提供建议和意见，共同改进。`

const BAIDU_ANALYSIS_URL = 'https://hm.baidu.com/hm.js?8f622a4eac3eb383660236c545cf6bab'

const websiteName = 'Education Data'

const config = Object.assign({}, defaultConfig, {
  tags,
  preface,
  BAIDU_ANALYSIS_URL,
  websiteName
})

export default config
