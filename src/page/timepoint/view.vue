<template>
    <div v-html="content"></div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  mounted: function () {
    const that = this
    if ('id' in this.$route.params) {
      this.$axios.get(`/api/show/+${this.$route.params.id}`).then(res => {
        that.$data.content = res.data.data.post.content
      })
    }
  }
}
</script>
