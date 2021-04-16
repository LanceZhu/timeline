<template>
  <div class="container-timeline-default">
    <div v-html="content" class="content"></div>
    <el-divider></el-divider>
    <Recomendations></Recomendations>
    <Footer style="margin-top: auto;" />
  </div>
</template>

<script>
const Footer = () => import('../../components/Footer')
const Recomendations = () => import('./components/Recomendations')

export default {
  data () {
    return {
      content: this.$store.state.config.preface || '暂无前言'
    }
  },
  components: {
    Footer,
    Recomendations
  },
  created () {
    document.title = this.$store.state.config.websiteName
  }
}
</script>

<style scoped>
.container-timeline-default {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.content {
  width: 90%;
  margin: 0 auto;
  text-align: left;
  white-space: pre-wrap;
}
</style>
