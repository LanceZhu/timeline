<template>
  <div class="container">
    <router-link :to="'/wiki/add'">
      <el-card>添加词条</el-card>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
a{
    text-decoration: none;
}
.container{
    padding: 0 60px;
}
</style>
