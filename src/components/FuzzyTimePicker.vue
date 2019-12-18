<template>
    <div class="date">
      <div>时间格式选择</div>
      <div class="date-format">
        <el-cascader
          v-model="dateValue"
          :options="dateOptions"
          @change="dateTypeChange"></el-cascader>
        <div v-if="dateType === 100">
          <el-date-picker
            v-model="date_100"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="选择日期"
            type="date">
          </el-date-picker>
        </div>
        <div v-if="dateType === 0">
          <el-input v-model="date_0"></el-input>年
        </div>
        <div v-if="dateType === 1">
          <el-input v-model="date_1[0]"></el-input>年
          <el-input v-model="date_1[1]"></el-input>月
        </div>
        <div v-if="dateType === 10">
          <el-input v-model="date_10[0]"></el-input>世纪
          <el-input v-model="date_10[1]"></el-input>年代
        </div>
        <div v-if="dateType === 11">
          <el-input v-model="date_11[0]"></el-input>世纪
          <el-input v-model="date_11[1]"></el-input>年代初
        </div>
        <div v-if="dateType === 12">
          <el-input v-model="date_12[0]"></el-input>世纪
          <el-input v-model="date_12[1]"></el-input>年代中
        </div>
        <div v-if="dateType === 13">
          <el-input v-model="date_13[0]"></el-input>世纪
          <el-input v-model="date_13[1]"></el-input>年代末
        </div>
        <div v-if="dateType === 20">
          <el-input v-model="date_20[0]"></el-input>年 - <el-input v-model="date_20[1]"></el-input>年
        </div>
        <div v-if="dateType === 30">
          公元前<el-input v-model="date_30"></el-input>年
        </div>
        <div v-if="dateType === 40">
          公元前<el-input v-model="date_40[0]"></el-input>年 - 公元前<el-input v-model="date_40[1]"></el-input>年
        </div>
        <div v-if="dateType === 50">
          公元前<el-input v-model="date_50[0]"></el-input>年 - 公元后<el-input v-model="date_50[1]"></el-input>年
        </div>
      </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'FuzzyTimePicker',
  data () {
    return {
      dateValue: [100], // 值为对应时间点格式的数组，应该传 value 数值，错误传为数组
      dateType: 100,
      dateOptions: [ // 时间点格式选项
        {
          value: 100,
          label: '精确日期'
        },
        {
          value: 0,
          label: '年份',
          children: [
            {
              value: 0,
              label: '无月份'
            }, {
              value: 1,
              label: '具体到某月'
            }
          ]
        }, {
          value: 10,
          label: '年代',
          children: [
            {
              value: 0,
              label: '无'
            }, {
              value: 1,
              label: '初期'
            }, {
              value: 2,
              label: '中期'
            }, {
              value: 3,
              label: '后期'
            }
          ]
        }, {
          value: 20,
          label: '时期',
          children: [
            {
              value: 0,
              label: '起止年份'
            }
          ]
        }, {
          value: 30,
          label: '公元前'
        }, {
          value: 40,
          label: '公元前-时间段'
        }, {
          value: 50,
          label: '公元前-公元后'
        }
      ],
      date_100: '',
      date_0: 0,
      date_1: [0, 0],
      date_10: [0, 0],
      date_11: [0, 0],
      date_12: [0, 0],
      date_13: [0, 0],
      date_20: [0, 0],
      date_30: 0,
      date_40: [0, 0],
      date_50: [0, 0]
    }
  },
  props: {
    defaultValue: {
      type: Array,
      default: () => [100]
    },
    defaultType: {
      type: Number,
      default: 100
    },
    defaultDate: {
      type: [Number, String, Array],
      default: () => dayjs().format('YYYY/MM/DD')
    }
  },
  watch: {
    defaultValue (newV, oldV) {
      this.dateValue = newV
    },
    defaultType (newV, oldV) {
      this.dateType = newV
    },
    defaultDate (newV, oldV) {
      this[`date_${this.defaultType}`] = newV
    }
  },
  created () {
    this.dateInitialize()
  },
  methods: {
    dateTypeChange () {
      this.dateType = this.dateValue.reduce((acc, cur) => {
        acc += cur
        return acc
      }, 0)
    },
    // 初始化时间点
    dateInitialize () {
      const date = new Date()
      const year = date.getFullYear()
      const nextYear = year + 1
      const years = Math.floor(year % 100) - Math.floor(year % 10)
      const century = Math.floor(year / 100) + 1
      const month = date.getMonth() + 1

      this.date_100 = dayjs().format('YYYY/MM/DD')
      this.date_0 = year // 2020 年
      this.date_1[0] = year // 2020 年
      this.date_1[1] = month // 1 月
      this.date_10[0] = century // 21 世纪
      this.date_10[1] = years // 20 年代
      this.date_11[0] = century
      this.date_11[1] = years
      this.date_12[0] = century
      this.date_12[1] = years
      this.date_13[0] = century
      this.date_13[1] = years
      this.date_20[0] = year
      this.date_20[1] = nextYear
      this.date_30 = 0
      this.date_40[0] = 0
      this.date_40[1] = 0
      this.date_50[0] = 0
      this.date_50[1] = 0
    },
    getData () {
      let show = ''
      const now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth() // 月份从 0 开始
      let day = now.getDate()

      const { dateType } = this
      switch (dateType) {
        case 100: {
          show = dayjs(this.date_100).format('YYYY年MM月DD日')
          const dateList = this.date_100.split('/')
          year = dateList[0]
          month = dateList[1]
          day = dateList[2]
          break
        }
        case 0: {
          show = `${this.date_0}年`
          year = this.date_0
          month = 1
          year = 1
          break
        }
        case 1: {
          show = `${this.date_1[0]}年${this.date_1[1]}月`
          year = this.date_1[0]
          month = this.date_1[1]
          day = 1
          break
        }
        case 10: {
          show = `${this.date_10[0]}世纪${this.date_10[1]}年代`
          year = Number(this.date_10[0] - 1) * 100 + Number(this.date_10[1])
          month = 1
          day = 1
          break
        }
        case 11: {
          show = `${this.date_11[0]}世纪${this.date_11[1]}年代初`
          year = Number(this.date_11[0] - 1) * 100 + Number(this.date_11[1])
          month = 1
          day = 2
          break
        }
        case 12: {
          show = `${this.date_12[0]}世纪${this.date_12[1]}年代中`
          year = Number(this.date_12[0] - 1) * 100 + Number(this.date_12[1])
          month = 6
          day = 1
          break
        }
        case 13: {
          show = `${this.date_13[0]}世纪${this.date_13[1]}年代末`
          year = Number(this.date_13[0] - 1) * 100 + Number(this.date_13[1])
          month = 12
          day = 1
          break
        }
        case 20: {
          show = `${this.date_20[0]}年 - ${this.date_20[1]}年`
          year = this.date_20[0]
          month = 12
          day = 31
          break
        }
        case 30: {
          show = `公元前${this.date_30}年`
          year = -this.date_30
          month = 1
          day = 1
          break
        }
        case 40: {
          show = `公元前${this.date_40[0]}年 - 公元前${this.date_40[1]}年`
          year = -this.date_40[0]
          month = 1
          day = 1
          break
        }
        case 50: {
          show = `公元前${this.date_50[0]}年 - 公元后${this.date_50[1]}年`
          year = -this.date_50[0]
          month = 1
          day = 1
          break
        }
        default: {}
      }

      // 供编辑时间点时初始化时间点显示使用
      const showObject = {
        type: this.dateValue, // 用于选择器定位 数组
        date: this[`date_${dateType}`], // 用于日期输入框初始化
        show // 用于日期显示 字符串
      }
      return {
        year: Number(year),
        month: Number(month),
        day: Number(day),
        show: showObject
      }
    }
  }
}
</script>

<style scoped>
.date{
  text-align: left;
}
.date-format{
  display: flex;
  align-items: center;
}
.date .el-date-editor{
  width: 150px !important;
}
.date .el-input{
  width: 80px;
  line-height: 40px;
  margin-left: 10px;
}
</style>
