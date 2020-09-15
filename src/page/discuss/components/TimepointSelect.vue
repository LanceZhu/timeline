<template>
  <div class="timepoint-select-container">
    <el-input style="margin-bottom: 0;" v-model="timepointId" placeholder="分析词条 id"></el-input>
    <el-button @click="timelineVisible = true">
      选择时间点
    </el-button>
    <el-dialog
      title="选择时间点（点击选择）"
      :visible.sync="timelineVisible">
      <div class="timeline">
        <div v-for="(time, index) in $store.state.timeline" :key="index" class="time" @click="selectTimepoint(time._id)">
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
      timepointId: '',
      timelineVisible: false
    }
  },
  props: {
    defaultTimepointId: {
      type: String,
      default: ''
    }
  },
  created () {
    this.timepointId = this.defaultTimepointId
  },
  methods: {
    selectTimepoint (timepointId) {
      this.timepointId = timepointId

      this.timelineVisible = false
    },
    getData () {
      return this.timepointId
    }
  }
}
</script>

<style scoped>
.timepoint-select-container {
  display: flex;
  margin-bottom: 10px;
}

.timeline {
  min-width: 300px;
  max-height: 400px;
  overflow-y: scroll;
  word-break: break-all;
  text-align: left;
  padding: 20px;
}

.time {
  font-size: 12px;
  margin: 6px 0;
}

.time:hover {
  font-weight: bold;
  text-decoration: underline;
}
</style>
