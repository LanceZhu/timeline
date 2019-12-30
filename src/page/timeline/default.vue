<template>
  <div class="container-timeline-default">
    <div v-html="content" class="content"></div>
    <Footer/>
  </div>
</template>

<script>
import { preface } from '../../../config'

import Footer from '../../components/Footer'

export default {
  data () {
    return {
      content: preface
    }
  },
  components: {
    Footer
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
</style>
