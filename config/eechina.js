import defaultConfig from './default'

const tags = [
  {
    value: '工程教育的教育理念',
    label: '工程教育思想/方法'
  }, {
    value: '教育主体进行的具体教育改革措施',
    label: '工程教育的举措与进展'
  }, {
    value: '工程教育举措产生的影响',
    label: '工程教育效果'
  }, {
    value: '各个高校具有重大影响的事件',
    label: '相关学校大事记'
  }, {
    value: '默认',
    label: '默认'
  }
]

const preface = `   中国高等工程教育历史研究资料编年汇编版本V1.0.0，用作北化工62会议后在专家间小范围内部交流研讨。
此版本尚处于实验中，用于有限范围内提升协作效率，以利于资料整理工作的改进迭代，请勿过度扩散。
此版本为1.0.0版本，平台wiki中的bug，也会随着此项工作的进展逐步修正。也请专家根据需求提供建议和意见，共同改进。

2020年6月2日。`

const BAIDU_ANALYSIS_URL = 'https://hm.baidu.com/hm.js?6e8882012f340b6acc2273b866ef0a81'

const SENTRY_DSN = 'https://4ca2646ee8c1435b80b7f0c79eeb59c0@o338003.ingest.sentry.io/5283859'

const websiteName = '中国高等工程教育简史'

const config = Object.assign({}, defaultConfig, {
  tags,
  preface,
  BAIDU_ANALYSIS_URL,
  websiteName,
  SENTRY_DSN
})

export default config
