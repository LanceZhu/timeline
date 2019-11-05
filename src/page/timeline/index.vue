<template>
    <div class="timeline">
        <div class="sidebar">
          <div class="title">
            <router-link to="/timeline">{{title}}</router-link>
            <el-tooltip content="添加时间点" popper-class="tooltip">
                <i class="el-icon-document-add" @click="toEdit">
                </i>
            </el-tooltip>
          </div>
          <div class="scroll">
            <div v-for="time in timeline" :key="time.id" class="time">
                <router-link :to="'/timeline/'+time.id">
                  {{time.date_data}} {{time.content}}
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
export default {
  data () {
    return {
      timeline: [
      ],
      title: '',
      content: ''
    }
  },
  created () {
    const that = this
    this.$axios.get('/api/show/198').then(res => {
      if (res.data.code === 100) {
        that.content = res.data.data.post.content
        that.timeline = res.data.data.timeline
        that.title = res.data.data.post.title
      }
    })
  },
  methods: {
    toEdit () {
      this.$router.push('/timepoint/add')
    }
  }
}
</script>

<style scoped>
.timeline{
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
}
a{
  text-decoration: none;
}
a:link{
  color: #666;
}
a:visited{
  color: #666;
}
a:hover{
  color: rgb(160,192,227)
}
a:active{
  color: #666;
}
.tooltip{
  background-color: white;
  color: #666;
}
</style>
