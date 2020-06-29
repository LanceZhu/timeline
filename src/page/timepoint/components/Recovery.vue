<template>
  <div v-if="isTimepointUpdated" class="recovery">
    <el-alert
      type="warning"
      center
      :closable="false">
      <i class="el-icon-info">当前词条存在未提交版本，是否恢复？</i>
      <el-button type="text" @click="recoverBak">恢复</el-button>
      <el-button type="text" style="color: gray;" @click="removeBak">取消</el-button>
    </el-alert>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import isEqual from 'lodash/isEqual'

export default {
  data () {
    return {
      isTimepointUpdated: false,
      timepoint: {}
    }
  },
  props: {
    curTimepoint: {
      default: {}
    },
    localStorageKey: {
      required: true
    }
  },
  watch: {
    curTimepoint: {
      handler (newValue) {
        this.timepoint = Object.assign(this.timepoint, newValue)
      },
      immediate: true,
      deep: true
    }
  },
  async created () {
    this.persistTimepoint()

    await this.init()
  },
  methods: {
    async init () {
      const localStorageTimepoint = await this.getLocalStorageTimepoint(this.localStorageKey)
      const mergedTimepoint = Object.assign({}, localStorageTimepoint, this.timepoint)
      this.isTimepointUpdated = !isEqual(mergedTimepoint, localStorageTimepoint)
    },
    async recoverBak () {
      const localStorageTimepoint = await this.getLocalStorageTimepoint(this.localStorageKey)
      this.timepoint = Object.assign(this.timepoint, localStorageTimepoint)
      this.isTimepointUpdated = false
      this.$message({
        type: 'success',
        message: '已恢复为上次编辑版本！'
      })

      this.$emit('recover', this.timepoint)
    },
    async removeBak () {
      await this.rmLocalStorageTimepoint(this.localStorageKey)
      this.isTimepointUpdated = false
    },
    getLocalStorageTimepoint (key) {
      let timepoint = this.timepoint
      if (localStorage.getItem(key)) {
        const prevTimepoint = JSON.parse(localStorage.getItem(key))

        const now = dayjs()
        const savedTime = dayjs(prevTimepoint.__timestamp)
        if (now.diff(savedTime, 'day') > 7) {
          localStorage.removeItem(key)
        } else {
          // delete prevTimepoint.__timestamp
          timepoint = prevTimepoint
        }
      }
      return timepoint
    },
    setLocalStorageTimepoint (key, timepoint) {
      timepoint.__timestamp = dayjs().valueOf()
      localStorage.setItem(key, JSON.stringify(timepoint))
    },
    rmLocalStorageTimepoint (key) {
      localStorage.removeItem(key)
    },
    persistTimepoint () {
      window.addEventListener('beforeunload', () => {
        this.setLocalStorageTimepoint(this.localStorageKey, this.timepoint)
      })
    }
  }
}
</script>

<style>
.recovery .el-button {
  font-size: 12px;
  padding: 0;
}
</style>
