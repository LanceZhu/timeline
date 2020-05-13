<template>
  <div class="container">
    <div class="version1" v-html="version1"></div>
    <div v-html="diffVersion"></div>
    <div class="version2" v-html="version2"></div>
  </div>
</template>

<script>
import HTMLDiff from '@/utils/htmldiff'

export default {
  data () {
    return {
      version1: '',
      version2: '',
      diffVersion: ''
    }
  },
  async created () {
    const routeParams = this.$route.params
    this.version1 = await this.getWikiContent(routeParams.id1)
    this.version2 = await this.getWikiContent(routeParams.id2)
    this.diffVersion = HTMLDiff.getHTMLDiff(this.version1, this.version2)
  },
  methods: {
    getWikiContent: async function (id) {
      const res = await this.$axios.get(`/api/timepoint/show/${id}`)
      const post = res.data.data.post
      return post.content
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.text {
    float:left;
    width: 30%;
    border: 1px solid blue;
    margin: 10px;
}
</style>

<style>
.diffins {
  background-color: #cfc;
  text-decoration: none;
}
.diffdel {
  color: #999;
  background-color: #FEC8C8;
}
ins {
    background-color: #cfc;
    text-decoration: none;
}
del {
    color: #999;
    background-color: #FEC8C8;
}
</style>
