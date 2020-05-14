<template>
  <div class="container-timeline-default">
    <div v-html="content" class="content"></div>
    <el-divider></el-divider>
    <Recomendations></Recomendations>
    <Footer/>
  </div>
</template>

<script>
import { preface } from '../../../config'

const Footer = () => import('../../components/Footer')
const Recomendations = () => import('./components/Recomendations')

export default {
  data () {
    return {
      content: preface
    }
  },
  components: {
    Footer,
    Recomendations
  }
}
</script>

<style scoped>
.container-timeline-default {
  margin-top: 20px;
}
.content{
  width: 90%;
  margin: 0 auto;
  text-align: left;
  white-space: pre-wrap;
}
</style>
