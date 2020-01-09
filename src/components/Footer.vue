<template>
  <div class="feedback">
    <el-divider></el-divider>
    <div class="wrapper">
      <span>遇到问题请联系：ee_chronicle2019@163.com</span>
      <span>京ICP备19056350号-1</span>
    </div>
    <!-- <a href="mailto:ee_chronicle2019@163.com">ee_chronicle2019@163.com</a> -->
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.feedback{
  color: gray;
  margin-bottom: 15px;
  font-size: 13px;
}
.feedback a{
  color: gray;
  text-decoration: none;
}
.feedback span{
  margin: 0 10px;
}
.wrapper{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
