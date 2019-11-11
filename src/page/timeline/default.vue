<template>
  <div v-html="content" class="container">
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  created () {
    const that = this
    this.$axios.get('/api/show/1').then(res => {
      if (res.data.code === 100) {
        that.content = res.data.data.post.content
      }
    })
  }
}
</script>

<style scoped>
.container{
  width: 80%;
  margin: 0 auto;
}
</style>
