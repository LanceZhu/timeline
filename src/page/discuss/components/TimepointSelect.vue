<template>
  <div class="timepoint-select-container">
    <div class="timepoints-selected">
      <div
        v-if="timepoints.length === 0"
        class="null-timepoint">
        暂未选择词条（右侧按钮选择）
      </div>
      <div
        v-else
        class="timepoint"
        v-for="(time, index) in timepoints"
        :key="index"
        >
        <el-tag
          closable
          @close="delTimepointById(time.id)">
          {{ time.title }}
        </el-tag>
      </div>
    </div>
    <el-button @click="timelineVisible = true">
      选择时间点
    </el-button>
    <el-dialog
      title="选择时间点（点击选择）"
      :visible.sync="timelineVisible">
      <div class="timeline">
        <div v-for="(time, index) in $store.state.timeline" :key="index" :class="`time ${timepoints.map(time => time.id).includes(time._id) ? 'time-selected' : ''}`" @click="selectTimepoint(time)">
          {{time.show}} {{time.title}}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timepoints: [], // [{id, title}]
      timelineVisible: false
    }
  },
  props: {
    defaultTimepoints: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  created () {
    this.timepoints = this.defaultTimepoints
  },
  methods: {
    selectTimepoint (timepoint) {
      const hasTime = this.timepoints.map(time => time.id).includes(timepoint._id)
      if (hasTime) {
        this.timelineVisible = false
        return
      }

      const time = {
        id: timepoint._id,
        title: timepoint.title
      }

      this.timepoints.push(time)

      this.timelineVisible = false
    },
    delTimepointById (timeId) {
      this.timepoints = this.timepoints.filter(time => time.id !== timeId)
    },
    getData () {
      const timepointsIdArr = this.timepoints.map(time => time.id)
      return timepointsIdArr
    }
  }
}
</script>

<style scoped>
.timepoint-select-container {
  display: flex;
  margin-bottom: 10px;
}

.timepoints-selected {
  flex: 1;
  text-align: left;
  border: 1px solid #dcdfe6;
  max-height: 200px;
  overflow: scroll;
}

.null-timepoint {
  padding: 5px;
  font-size: 14px;
  height: 50px;
}

.timepoint {
  margin-bottom: 5px;
}

.timeline {
  min-width: 300px;
  max-height: 400px;
  overflow-y: scroll;
  word-break: break-all;
  text-align: left;
  padding: 25px;
}

.time {
  font-size: 12px;
  margin: 6px 0;
  position: relative;
}

.time:hover {
  font-weight: bold;
  text-decoration: underline;
}

.time-selected::before {
  position: absolute;
  content: '已选';
  font-weight: bold;
  color: red;
  transform: translateX(-100%);
}
</style>
