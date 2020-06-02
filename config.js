// 网站类别枚举类
const DOMAIN_NAME_ENUM = {
  internet: 'internet',
  education: 'education',
  invention: 'invention',
  eechina: 'eechina',
  dev: 'dev'
}

let tags = [] // 时间点标签
if (process.env.VUE_APP_DOMAIN_NAME === DOMAIN_NAME_ENUM.internet) {
  tags = [
    {
      value: '互联网技术',
      label: '互联网技术',
      children: [
        {
          value: '其他',
          label: '其他'
        }, {
          value: 'https Vpn 网络安全等保护用户信息安全的技术',
          label: '网络安全'
        }, {
          value: '浏览器 HTML web2.0等互联网前段技术',
          label: '应用协议'
        }, {
          value: '阿帕网 ATM RFC ipv4 ipv6 TCP/IP 等互联网基础技术',
          label: '分组交换'
        }, {
          value: 'MAC 以太网 WIFI 等传输层技术',
          label: '数据链路'
        }
      ]
    }, {
      value: '互联网组织等',
      label: '大事记'
    }, {
      value: '互联网影响社会的表现',
      label: '社会影响'
    }, {
      value: '产品形态',
      label: '产品形态',
      children: [
        {
          value: '其他',
          label: '其他'
        }, {
          value: '电子商务，传统商业电子化',
          label: '电商'
        }, {
          value: '即时通信',
          label: '即时消息'
        }, {
          value: '依托于电子设备平台而运行的交互游戏',
          label: '游戏'
        }, {
          value: '对互联网上的信息资源进行搜集',
          label: '搜索'
        }, {
          value: '人与人之间的关系网络化',
          label: '社交'
        }, {
          value: '互联网传播信息的媒介',
          label: '媒体'
        }, {
          value: '手机软件，主要指安装在智能手机上的软件',
          label: 'APP'
        }, {
          value: '传送支付信息以实现货币支付或资金流转',
          label: '支付'
        }
      ]
    }
  ]
} else if (process.env.VUE_APP_DOMAIN_NAME === DOMAIN_NAME_ENUM.education) {
  tags = [
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
      value: '国内',
      label: '国内'
    }, {
      value: '国外',
      label: '国外'
    }, {
      value: '默认',
      label: '默认'
    }
  ]
} else if (process.env.VUE_APP_DOMAIN_NAME === DOMAIN_NAME_ENUM.eechina) {
  tags = [
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
} else if (process.env.VUE_APP_DOMAIN_NAME === DOMAIN_NAME_ENUM.invention) {
  tags = [
    {
      value: '默认',
      label: '默认'
    }
  ]
} else {
  tags = [
    {
      value: '默认',
      label: '默认'
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

// quill editor 配置
const quillEditorOptions = {
  imageUploadAPI: '/api/supplement/upload'
}

// 配置采用覆盖原有 data 方式
const inventionViewConfig = {
  showNationalityAndInventor: true
}
const internetViewConfig = {}
const educationViewConfig = {}
const devViewConfig = Object.assign({}, inventionViewConfig) // TODO 显示所有其他环境定制选项

// 网站页面前言
let preface = ''
switch (process.env.VUE_APP_DOMAIN_NAME) {
  case DOMAIN_NAME_ENUM.invention: {
    preface = `
        本站旨在梳理人类所有发明，梳理发明间的逻辑关系，构建发明简史。以达到记录，启发作用。
        您可以浏览现有发明词条或参与修正现有词条，贡献新词条。`
    break
  }
  case DOMAIN_NAME_ENUM.internet: {
    preface = `前言
    2019 年是 ARPANET 诞生 50 周年，Web 诞生 30 周年，然而互联网界没有大型的庆祝活动。可能是由于每天都在发生目不暇给的变化，人们似乎已经遗忘了互联网这样一个对人类历史有着深远影响的发明，人们似乎已经忘记了互联网走过的历程。新的人工智能时代又将引起巨大的变革，新的文明呼之欲出，旧的文明盘根错节，使得人类的命运扑簌迷离。
    文明的碰撞是一种非常复杂的事件，我们需要有简单的工具来理解这些碰撞。多种文明如何共存与演化，原本就是人类非常重要的课题，而新技术使得文明变化的轨迹更加复杂莫测。无论是“给文明以岁月”，还是“给岁月以文明”，我们都需要建立一个复杂的参照系来思考演化的方向。《评孔纪年》记录了人们自辛亥革命起在公开发表物上评价孔子的言论。这些言论是一个编年体的索引，能够让人快速浏览在文明巨变的时代里，历史上曾经对孔子各种各样针锋相对的评价。受其启发，在 2019 年 9 月 10 日，在北京邮电大学举行的互联网产业与创业课上，全班同学对 WEB 诞生 30 周年进行了庆祝。并在第一次课上一致同意，一起着手进行一次互联网发展简史的编年体史料整理。通过梳理互联网的发展历史，来理解互联网所经历的进化，也为未来人工智能时代即将经历的变化进行各种必要的准备。
    这是一个半开放的协作编辑项目，我们对互联网历史上比较重要的事件和发明创造进行摘要形态的记录。这样，后面的学生如果希望了解互联网的历史，可以很快的查到，如果希望对某个片段的信息有更加深入的了解，也可以借助这篇文章提供的相关信息来检索到。
    
                                    ——纪阳  于北京邮电大学，2019年9月10日`
    break
  }
  case DOMAIN_NAME_ENUM.education: {
    preface = `前言


    2017年，我国高等教育界提出要进行新工科的建设，并先后发布了著名的“复旦共识”、“天大行动”和“北京指南”，从而推动起国内高等工程教育的一系列新的变革。在研究和尝试新工科变革的这两三年的时间里，我们感到新工科教育改革的牵涉面非常广泛，探索性也非常强。然而很多教师对于工科教育的来龙去脉并不了解。于是我们开始进行一些关于工程教育理念和举措的研究。在这个研究的过程之中，我们发现在2018年，美国MIT发布了一个《The global state of the art  in engineering education 》（全球工程教育现状）的报告，这篇报告评述了过去高等工科教育的十所领袖大学，也介绍了将来很有希望引领全球新工科转型的十所院校以及他们中一些的教育理念和做法。这给了我们很多的启发。
   我们感到以代表性大学作为一个研究切入点来理解工程教育变革是非常重要的手段。因为从教师们平时的讨论中也能够感到，无论是教育理念的形成、课程的改革还是体制机制的调整，都与大学这样一个中观层次的举措密切相关。另外一个重要的体会就是尽管未来工程教育有一些共性的大趋势，高等工程教育的发展模式可以是多样化的，不同学校有不同的资源禀赋和发展目标，也就有着不同的发展模式。这些也同样要回到中观层次来审视变革。
然而我们既不了解国外这些大学的来龙去脉，也缺乏对国内大学工程教育历史有过系统的研究和思考，于是我们开始整理和收集这方面的资料。在整理国内外高校发展变化过程的时候，我们一边思考这些变化的驱动力，一边对比不同工科大学所采取的教学改革措施，在追溯这些大学发展历程的时候，我们发现这有助于我们理解高等工程教育的现状成因和未来变革方向。
在选择国内大学的时候，目前并没有一个类似MIT那样的报告给出国内哪些大学是过去或未来的领军者，于是我们选择的是一些在工程教育思想、举措、影响有显著性工作的学校。要么是这些学校的工作曾经显著带动了我国高等工程教育的某一方面，要么我国高等工程教育的总体发展，会有一部分很显著的映射在了这些学校的发展历程之中。此外，考虑到祖国的统一，我们也吸收了一部分香港和台湾的工程教育发展历史。
在编辑这部编年史之前，我们对于高等工程教育的历史并不熟悉。因此这是一个学习的过程。很幸运的是，我们的整理过程得到了浙江大学王沛民教授、中央教育科学研究所吴霓教授、北京邮电大学王亚杰教授、桑林教授和林家儒教授等教育界前辈的鼓励和支持，提供了非常多的帮助。随着编辑的深入，我们在国际高等教育历史方面也不仅仅涉及MIT报告中的几所大学，也会涉猎到芬兰、德国、日本等一些大学。
  本书选取国内国外在工程教育方向成就显著的高校，调查其从建校至今有关工程教育的材料，分别对其进行编年整理，力求客观地反应工程教育的真实面貌，并呼应这些大学在近年来所进行的改革。本书所选的材料来均自于公开发表的文献，学校官网及百科，多为作者原文。目前我们也在研读更为经典的科学技术教育史文献，对我们所列出的历史脉络进行进一步研究和分析。
目前我们将选取的材料分为A工程教育思想/方法、B工程教育的举措与进展、C工程教育效果和D相关的学校大事记等四类。在工程教育思想或方法模块，可以使读者清晰地了解到有关教育思想或方法的提出或变化，为工程教育举措提供方向，因其重要性，我们将其标为蓝色；在工程教育举措与进展模块，读者可以知道各个高校都做了哪些具体的改革措施；工程教育效果可以使读者了解高校教改是否产生显著影响；最后相关学校大事纪包含各个高校具有重大影响的事件，这些重要事件为我们理解学校的变革方向提供了一种背景参考。
我们对工程教育思想和状态保持客观中立态度，并不打算在简史之中进行过多的评述。我们仅仅将能够代表潮流发展的一些重要的思想或内容标记为蓝色。
    作为一个编年体的简史概况，本书更多希望起到一个索引的作用，写作目的是使相关研究者可以通过简要信息快速厘清工程教育的历史与前沿，获得一个概貌性的认识。若想深入了解，可以根据片段后的相关信息进行检索，原文之中的信息必然会更丰富也更深入。      
   本书一开始作为北京邮电大学纪阳教授实验室研究工程教育发展的一个内部项目，第一版主要编辑者为纪阳教授、吴振宇老师和其研究生薛梦佳、杨汀滢、郭沛、张默雨、李凡、黄冰尧、刘泽通。在第一版小范围发布之后，北京邮电大学网络教育学院的李青、王楠、郜晖和赵国安等老师和他们的研究生也加入到我们的编辑者队伍之中，这些老师有教育专业的知识背景和研究经历，对我们这本书的帮助也很大。
目前我们请一些专家试读了这个编年史的第一版，收到了广泛的关注和好评。下一步打算将这个高等工程教育编年史的整理工作是一个开放项目，我们期待对于工程教育研究感兴趣的学者加入到我们的这项基础性工作之中，共同对其进行完善。工程教育历史之中有很多有趣的问题值得深入研究，我们也将联合信息技术新工科产学研联盟工程专业认知与创新素质培养工作委员会的相关院校，选择对当下新工科改革具有现实意义的问题，一同进行更为深入的探讨。
您如果对这个编年史感兴趣，或希望推荐相关的专家，或对其中一些研究方向感兴趣，都非常欢迎您与我们进行互动；由于资料繁多且编者水平有限，漏错之处烦请读者指正，以便修订。这方面的联络，都请发至邮箱：ee_chronicle2019@163.com。

                                
                            高等工程教育编年史编辑团队`
    break
  }
  case DOMAIN_NAME_ENUM.eechina: {
    preface = `中国高等工程教育历史研究资料编年汇编版本V1.0.0，用作北化工62会议后在专家间小范围内部交流研讨。
此版本尚处于实验中，用于有限范围内提升协作效率，以利于资料整理工作的改进迭代，请勿过度扩散。
此版本为1.0.0版本，平台wiki中的bug，也会随着此项工作的进展逐步修正。也请专家根据需求提供建议和意见，共同改进。

2020年6月2日。`
    break
  }
  case DOMAIN_NAME_ENUM.dev: {
    preface = 'dev'
    break
  }
  default: {}
}

export { preface }

export default {
  // baseURL: `http://${process.env.VUE_APP_DOMAIN_NAME}.timeline.hfzhang.wang`, // Chrome 升级，需后端带有 SameSite 字段
  baseURL: '',
  urlPrefix: process.env.NODE_ENV === 'production' ? '/api' : '/',
  tags,
  tagTable,
  quillEditorOptions,
  inventionViewConfig,
  internetViewConfig,
  educationViewConfig,
  devViewConfig
}
