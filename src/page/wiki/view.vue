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
        <el-menu-item index="2" @click="toTimepointAdd">
          <i class="el-icon-document-add"></i>
        <span>添加时间点</span>
        </el-menu-item>
        <el-menu-item index="3" @click="toWikiHistory">
          <i class="el-icon-time"></i>
        <span>词条历史</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
    <el-button @click="drawer = true" icon="el-icon-s-operation" class="drawer"></el-button>
    <div class="content">
    <div v-html="content"></div>
    <div v-if="constTimeline.length">
        <div class="slider">
            范围
    <el-slider
        v-model="timelineRange"
        range
        show-stops
        :marks="marks"
        :min=0
        :max="(constTimeline.length-1) > 0 ? (constTimeline.length - 1) : 0"
        @change="rangeChange"
        :formatTooltip="formatTooltip"
        >
    </el-slider>
    <!--
        步进值
    <el-slider
        v-model="step"
        show-stops
        :min="1"
        @change="stepChange"
        >
    </el-slider>
    -->
    </div>
      <el-timeline>
          <div v-for="(time, index) in timeline" :key="time.id">
              <el-timeline-item placement="top">
                <router-link :to="`/timepoint/view/${time.id}`" target="_blank">
                  <el-card :body-style="{ 'background-color': index%2 == 0 ? 'rgb(250,250,250)' : ''}">
                    {{ time.date_data }} {{ time.title }}
                    <i class="el-icon-view el-icon--right"></i>
                  </el-card>
                </router-link>
              </el-timeline-item>
          </div>
      </el-timeline>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      direction: 'ltr',
      timelineRange: [],
      // step: 1,
      content: '',
      timeline: [],
      constTimeline: [],
      id: 1,
      marks: {}
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
      const range = [this.timelineRange[0], this.timelineRange[1] + 1]
      this.timeline = this.constTimeline.slice(...range)
    },
    stepChange: function () {
    },
    formatTooltip: function (index) {
      return this.constTimeline[index].date_data
    },
    getContent: function () {
      const _this = this
      this.content = ''
      this.timeline = []
      this.$axios.get(`/api/show/${this.$route.params.id}`).then(res => {
        _this.$data.content = res.data.data.post.content
        _this.id = res.data.data.post.id
        const timeline = res.data.data.timeline
        _this.$data.timeline = timeline
        _this.$data.constTimeline = timeline
        _this.$set(_this.marks, 0, timeline[0].date_data)
        const timelineLastIndex = (timeline.length - 1) > 0 ? (timeline.length - 1) : 0
        this.timelineRange = [0, timelineLastIndex]
        _this.$set(_this.marks, timelineLastIndex, timeline[timelineLastIndex].date_data)
      })
    },
    toWikiEdit: function () {
      this.$router.push(`/wiki/edit/${this.id}`)
    },
    toTimepointAdd: function () {
      this.$router.push(`/timepoint/add/${this.id}`)
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
.block{
    overflow: visible;
    height: auto;
    display: block;
    background-color: rgb(250, 250, 250);
}
.drawer{
    position: fixed;
    top: 70px;
    left: 10px;
}
.slider{
    position: sticky;
    top: 60px;
    background-color: rgb(250, 250, 250);
    z-index: 999;
    padding: 10px 200px;
    margin: 0 auto;
}
.el-drawer{
  margin-top: 100px;
}
.el-timeline{
    position: sticky;
    top: 200px;
}
.content{
    padding: 0 60px;
}
.el-card .even{
    background-color: rgb(247,247,247);
}
</style>
