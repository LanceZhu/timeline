<template>
  <div class="bg">
    <div class="title banner">变更日志</div>
    <div class="container">
      <el-timeline style="padding: 0">
        <el-timeline-item
          v-for="(log, index) in logs"
          :key="index"
          :icon="log.icon"
          :type="log.type"
          :color="log.color"
          :size="log.size"
          :timestamp="log.timestamp">
          <pre>{{ log.content }}</pre>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logs: [{
        content: '1. 用户可为词条添加自定义标签\n2. 根据标签筛选时间轴\n3. 词条编辑需审核',
        timestamp: '2020-6-10',
        type: 'info'
      }, {
        content: '添加版本对比功能',
        timestamp: '2020-05-14',
        type: 'info'
      }, {
        content: '优化移动端浏览体验',
        timestamp: '2020-02-12',
        type: 'info'
      }, {
        content: '修复时间点编辑页面回车键跳转',
        timestamp: '2020-02-12',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '添加日志',
        timestamp: '2020-02-12',
        color: '#0bbd87'
      }]
    }
  }
}
</script>

<style scoped>
.container{
  max-width: 750px;
  display: flex;
  justify-content: center;
  text-align: left;
  margin: 0 auto;
  padding-top: 20px;
  width: 75%;
  flex: 1;
  box-shadow: 0 0 5px 0 #d0d0d0;
}
.bg {
  background-image: url('https://pic.f00bar.cn/images/2020/06/10/bg1.jpg');
  background-position: left top;
  background-size: auto;
  background-repeat: repeat;
  background-attachment: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: lightgray;
}
.banner {
  background-image: url('https://pic.f00bar.cn/images/2020/06/10/banner.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
}
.title {
  font-size: 25px;
  color: white;
}
pre {
  white-space: pre-wrap;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
