<template>
  <div class="container">
      <div class="sidebar">
        <div class="title">
            <el-tooltip content="添加时间点" popper-class="tooltip">
              <i class="el-icon-document-add" @click="toAdd">
              </i>
          </el-tooltip>
        </div>
        <div class="scroll">
          <div v-for="time in timelineUpdated" :key="time.id" class="time">
              <router-link :to="'/timeline/'+time._id" tag="li">
                {{time.show}} {{time.title}}
              </router-link>
          </div>
        </div>
      </div>
      <div class="content">
        <transition>
          <router-view></router-view>
        </transition>
      </div>
  </div>
</template>

<script>
// import isJSON from '@/utils/isJSON'

export default {
  data () {
    return {
      timeline: []
    }
  },
  computed: {
    timelineUpdated () {
      return this.$store.state.timeline
    }
  },
  created () {
    const that = this
    this.$axios.get('/api/timepoint/list').then(res => {
      if (res.data.code === 100) {
        that.timeline = res.data.data
        that.timeline = that.timeline.map(time => {
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
        that.$store.commit('updateTimeline', that.timeline)
      } else {
        that.$message.error('请求出错！')
      }
    })
  },
  methods: {
    toAdd () {
      this.$router.push('/timepoint/add')
    }
  }
}
</script>

<style scoped>
.container{
  height: 100%;
  position: relative;
  display: flex;
}
.sidebar{
  box-sizing: border-box;
  padding: 40px 0 0;
  height: 100%;
  width: 20%;
  border-right: 1px solid #C4C4C4;
  background-color: rgb(247, 247, 247);
}
.title{
  position: absolute;
  top: 0;
}
.scroll{
  box-sizing: border-box;
  padding: 0 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  height: 100%;
}
.time{
  color: #666;
  font-size: 12px;
  text-align: left;
  margin: 6px 0;
}
.content{
  width: 80%;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  height: 100%;
}
.router-link-active{
  color: rgb(160,192,227);
}
li{
  padding:0;
  margin:0;
  list-style:none;
  display: inline-block;
}
li:hover{
  color:rgb(160,192,227);
  cursor: pointer;
}
.el-tooltip{
  margin-left: 10px;
}
</style>
