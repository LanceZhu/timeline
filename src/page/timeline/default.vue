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
  }
}
</script>

<style scoped>
.container{
  width: 90%;
  margin: 0 auto;
  text-align: left;
}
</style>
