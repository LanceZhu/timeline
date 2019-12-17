<template>
  <div class="container-timeline-default">
    <div v-html="content" class="content"></div>
    <div class="feedback">
      <el-divider></el-divider>
      遇到问题请联系：ee_chronicle2019@163.com
      <!-- <a href="mailto:ee_chronicle2019@163.com">ee_chronicle2019@163.com</a> -->
    </div>
  </div>
</template>

<script>
import { preface } from '../../../config'

export default {
  data () {
    return {
      content: preface
    }
  }
}
</script>

<style scoped>
.content{
  width: 90%;
  margin: 0 auto;
  text-align: left;
  white-space: pre-wrap;
}
.feedback{
  color: gray;
}
.feedback a{
  color: gray;
}
</style>
