<template>
    <div class="block">
    <el-drawer
      title="操作选项"
      size="20%"
      :visible.sync="drawer"
      :direction="direction">
      <el-menu default-active="1">
        <el-menu-item index="1" @click="toWikiEdit">
          <i class="el-icon-edit-outline"></i>
          <span>编辑词条</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toTimpointEdit">
          <i class="el-icon-document-add"></i>
        <span>添加时间点</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toWikiHistory">
          <i class="el-icon-time"></i>
        <span>词条历史</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
    <el-button @click="drawer = true" icon="el-icon-s-operation" class="drawer"></el-button>
    <div v-html="content"></div>
    <div v-if="timeline.length">
          范围
      <el-slider
        v-model="value"
        range
        show-stops
        :min="valueStart"
        :max="valueEnd"
        @change="rangeChange"
        >
      </el-slider>
          步进值
      <el-slider
        v-model="step"
        show-stops
        :min="1"
        @change="stepChange"
        >
      </el-slider>
      <el-timeline>
          <div v-for="time in (value[1]-value[0])" :key="time">
              <el-timeline-item :timestamp="timeline[value[0] + time - 1].date_data" placement="top">
                <router-link :to="`/timepoint/${timeline[time].id}`" target="_blank">
                  <el-card>
                    {{ timeline[value[0] + time - 1].title }}
                    <i class="el-icon-view el-icon--right"></i>
                  </el-card>
                </router-link>
              </el-timeline-item>
          </div>
      </el-timeline>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      direction: 'ltr',
      value: [1, 100],
      valueStart: 1, // 时间点开始 固定
      valueEnd: 1, // 时间点结束 固定
      step: 1,
      content: '',
      timeline: [],
      id: 1
    }
  },
  watch: {
    $route () {
      this.getContent()
    }
  },
  created: function () {
    this.getContent()
  },
  methods: {
    rangeChange: function () {
    },
    stepChange: function () {
    },
    getContent: function () {
      const _this = this
      this.content = ''
      this.timeline = []
      this.value[1] = 1
      this.valueEnd = 1
      if ('id' in this.$route.params) {
        this.$axios.get(`/api/show/${this.$route.params.id}}`).then(res => {
          _this.$data.content = res.data.data.post.content
          _this.id = res.data.data.post.id
          if ('timeline' in res.data.data) {
            _this.$data.timeline = res.data.data.timeline
            _this.$data.value[1] = this.timeline.length
            _this.$data.valueEnd = this.timeline.length
          }
        })
      }
    },
    toWikiEdit: function () {
      this.$router.push(`/wiki/edit/${this.id}`)
    },
    toTimpointEdit: function () {
      this.$router.push(`/timepoint/edit/${this.id}`)
    },
    toWikiHistory: function () {
      this.$router.push(`/wiki/history/${this.id}`)
    }
  }
}
</script>
<style scoped>
a{
  text-decoration: none;
}
.drawer{
  float: left;
}
.el-drawer{
  margin-top: 100px;
}
</style>
