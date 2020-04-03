<template>
  <div class="sidebar" v-loading="loading">
    <div class="title">
      <el-tooltip content="添加时间点" popper-class="tooltip">
        <i class="el-icon-document-add" @click="add"></i>
      </el-tooltip>
      <span class="analysis">共{{timelineUpdated.length}}个词条</span>
    </div>
    <div class="scroll">
      <div v-for="time in timelineUpdated" :key="time.id" class="time" :id="`${time._id}`">
        <router-link :to="'/timeline/'+time._id" tag="li" @click.native="timepoint">{{time.show}} {{time.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    timelineUpdated () {
      return this.$store.state.timeline
    }
  },
  props: {
    toTimepoint: {
    },
    toAdd: {
    }
  },
  async created () {
    const res = await this.$axios.get('/api/timepoint/list')
    if (res.data.code === 100) {
      let timeline = res.data.data
      timeline = timeline.map(time => {
        if (typeof time.show === 'object') {
          const { show } = time.show
          if (show) {
            time.show = time.show.show
          } else {
            time.show = time.show.date
          }
        }
        return time
      })
      this.$store.commit('updateTimeline', timeline)
    } else {
      this.$message.error('请求出错！')
    }
    this.loading = false
  },
  methods: {
    add () {
      this.$router.push('/timeline/add')
      if (this.toAdd !== undefined) {
        this.toAdd()
      }
    },
    timepoint () {
      if (this.toTimepoint !== undefined) {
        this.toTimepoint()
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  box-sizing: border-box;
  padding: 40px 0 0;
  height: 100%;
  border-right: 1px solid #c4c4c4;
  background-color: rgb(247, 247, 247);
}
.title {
  position: absolute;
  top: 0;
}
.scroll {
  box-sizing: border-box;
  padding: 0 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  height: 100%;
}
.time {
  color: #666;
  font-size: 12px;
  text-align: left;
  margin: 6px 0;
}
.router-link-active {
    color: rgb(160, 192, 227);
  }
li {
  padding: 0;
  margin: 0;
  list-style: none;
  display: inline-block;
}
li:hover {
  color: rgb(160, 192, 227);
  cursor: pointer;
}
.el-tooltip {
  margin-left: 10px;
}
.analysis {
  font-size: 14px;
}
</style>
