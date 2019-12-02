let tags = [] // 时间点标签
if (process.env.VUE_APP_DOMAIN_NAME === 'internet') {
  tags = [
    {
      value: 0,
      label: '互联网技术',
      children: [
        {
          value: 0,
          label: '其他',
          desc: '其他'
        }, {
          value: 1,
          label: '网络安全',
          desc: 'https Vpn 网络安全等保护用户信息安全的技术'
        }, {
          value: 2,
          label: '应用协议',
          desc: '浏览器 HTML web2.0等互联网前段技术'
        }, {
          value: 3,
          label: '分组交换',
          desc: '阿帕网 ATM RFC ipv4 ipv6 TCP/IP 等互联网基础技术'
        }, {
          value: 4,
          label: '数据链路',
          desc: 'MAC 以太网 WIFI 等传输层技术'
        }
      ]
    }, {
      value: 10,
      label: '大事记',
      desc: '互联网组织等'
    }, {
      value: 20,
      label: '社会影响',
      desc: '互联网影响社会的表现'
    }, {
      value: 30,
      label: '产品形态',
      children: [
        {
          value: 0,
          label: '其他',
          desc: '其他'
        }, {
          value: 1,
          label: '电商',
          desc: '电子商务，传统商业电子化'
        }, {
          value: 2,
          label: '即时消息',
          desc: '即时通信'
        }, {
          value: 3,
          label: '游戏',
          desc: '依托于电子设备平台而运行的交互游戏'
        }, {
          value: 4,
          label: '搜索',
          desc: '对互联网上的信息资源进行搜集'
        }, {
          value: 5,
          label: '社交',
          desc: '人与人之间的关系网络化'
        }, {
          value: 6,
          label: '媒体',
          desc: '互联网传播信息的媒介'
        }, {
          value: 7,
          label: 'APP',
          desc: '手机软件，主要指安装在智能手机上的软件'
        }, {
          value: 8,
          label: '支付',
          desc: '传送支付信息以实现货币支付或资金流转'
        }
      ]
    }
  ]
} else if (process.env.VUE_APP_DOMAIN_NAME === 'education') {
  tags = [
    {
      value: 0,
      label: '工程教育思想/方法',
      desc: '工程教育的教育理念'
    }, {
      value: 10,
      label: '工程教育的教育理念',
      desc: '教育主体进行的具体教育改革措施'
    }, {
      value: 20,
      label: '工程教育效果',
      desc: '工程教育举措产生的影响'
    }, {
      value: 30,
      label: '相关学校大事记',
      desc: '各个高校具有重大影响的事件'
    }
  ]
} else if (process.env.VUE_APP_DOMAIN_NAME === 'invention') {
  tags = [
    {
      value: 0,
      label: '默认',
      desc: '默认'
    }
  ]
} else {
  tags = [
    {
      value: 0,
      label: '默认',
      desc: '默认'
    }
  ]
}

const tags2tagTable = (tags, initialValue = 0, initialLabel = '') => {
  let tagTable = {}
  for (let i = 0; i < tags.length; i++) {
    const { value, label, desc, children } = tags[i]
    let concatedLabel = label
    if (initialLabel !== '') {
      concatedLabel = [initialLabel, label].join('/')
    }
    if (desc !== undefined) {
      tagTable[String(initialValue + value)] = {
        label: concatedLabel,
        desc: desc
      }
    }
    if (children !== undefined) {
      tagTable = Object.assign(tagTable, tags2tagTable(children, initialValue + value, concatedLabel))
    }
  }
  return tagTable
}

const tagTable = tags2tagTable(tags)

export default {
  // baseURL: `http://${process.env.VUE_APP_DOMAIN_NAME}.timeline.hfzhang.wang`, // Chrome 升级，需后端带有 SameSite 字段
  baseURL: '',
  urlPrefix: process.env.NODE_ENV === 'production' ? '/api' : '/',
  tags,
  tagTable
}
