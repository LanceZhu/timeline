<template>
  <div class="container-timeline-default">
    <div v-html="content"></div>
    <div class="feedback">
      <el-divider></el-divider>
      遇到问题请联系：
      <a href="mailto:ee_chronicle2019@163.com">ee_chronicle2019@163.com</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  }
}
</script>

<style scoped>
.container{
  width: 90%;
  margin: 0 auto;
  text-align: left;
}
.feedback{
  color: gray;
}
.feedback a{
  color: gray;
}
</style>
