<template>
  <div class="container" v-loading="loading">
    <div class="sidebar-button" @click="showSidebar()">
      <i class="el-icon-right"></i>
    </div>
    <el-drawer
      title="时间轴"
      :visible.sync="sidebar"
      direction="ltr"
      :before-close="beforeClose"
      size="75%"
      custom-class="custom-drawer"
      :with-header="false">
      <div class="sidebar">
        <div class="title">
            <el-tooltip content="添加时间点" popper-class="tooltip">
              <i class="el-icon-document-add" @click="toAdd">
              </i>
          </el-tooltip>
          <span class="analysis">
              共{{timelineUpdated.length}}个词条
          </span>
        </div>
        <div class="scroll">
          <div v-for="time in timelineUpdated" :key="time.id" class="time">
              <router-link :to="'/timeline/'+time._id" tag="li" @click.native="beforeClose">
                {{time.show}} {{time.title}}
              </router-link>
          </div>
        </div>
      </div>
    </el-drawer>
    <div class="pc">
      <div class="sidebar">
        <div class="title">
            <el-tooltip content="添加时间点" popper-class="tooltip">
              <i class="el-icon-document-add" @click="toAdd">
              </i>
          </el-tooltip>
          <span class="analysis">
              共{{timelineUpdated.length}}个词条
          </span>
        </div>
        <div class="scroll" @click="beforeClose">
          <div v-for="time in timelineUpdated" :key="time.id" class="time" :id="`${time._id}`">
              <router-link :to="'/timeline/'+time._id" tag="li">
                {{time.show}} {{time.title}}
              </router-link>
          </div>
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
      loading: true,
      drawer: false,
      timeline: [],
      sidebar: false
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
    }).finally(() => {
      that.loading = false
    })
  },
  methods: {
    toAdd () {
      this.$router.push('/timeline/add')
      this.sidebar = false
    },
    beforeClose () {
      this.sidebar = false
    },
    showSidebar () {
      this.sidebar = true
    }
  }
}
</script>

<style scoped>
@media (max-width: 720px) {
  .container {
    height: 100%;
    position: relative;
    display: flex;
  }
  .pc{
    display: none;
  }
  .mobile{
  }
  .sidebar-button {
    display: block;
    position: fixed;
    top: 100px;
    left: 0;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: white;
    margin-left: -30px;
    opacity: 0.75;
    box-shadow: 0 0 5px rgb(138, 95, 95);
  }
  .sidebar-button i{
    line-height: 60px;
    padding-left: 20px;
  }
  .sidebar{
    box-sizing: border-box;
    padding: 40px 0 0;
    height: 100%;
    border-right: 1px solid #C4C4C4;
    background-color: rgb(247, 247, 247);
  }
  .title{
    position: absolute;
    top: 10px;
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
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    height: 100%;
    width: 100%;
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
}
@media (min-width: 720px) {
  .container {
    height: 100%;
    position: relative;
    display: flex;
  }
  .mobile{
    display: none;
  }
  .pc{
    height: 100%;
    width: 20%;
  }
  .sidebar-button {
    display: none;
  }
  .sidebar{
    box-sizing: border-box;
    padding: 40px 0 0;
    height: 100%;
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
}
.analysis{
  font-size: 14px;
}
</style>

<style>
  .custom-drawer .el-drawer__body{
    height: 100%;
  }
</style>
