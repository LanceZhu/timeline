<template>
  <div class="container">
    <div class="version1">
      <el-table
      :data="[version1]"
      >
        <el-table-column label="时间" prop="timestamp"></el-table-column>
        <el-table-column label="修改人" prop="owner"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
      </el-table>
      <div v-html="version1.content"></div>
    </div>
    <!-- <div v-html="diffVersion" class="diff-version"></div> -->
    <div class="version2">
      <el-table
      :data="[version2]"
      >
        <el-table-column label="时间" prop="timestamp"></el-table-column>
        <el-table-column label="修改人" prop="owner"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
      </el-table>
      <div v-html="diffVersionContent"></div>
    </div>
  </div>
</template>

<script>
import HTMLDiff from '@/utils/htmldiff'
import dayjs from 'dayjs'

export default {
  data () {
    return {
      version1: '',
      version2: '',
      diffVersionContent: ''
    }
  },
  async created () {
    const routeParams = this.$route.params
    this.version1 = await this.getWikiContent(routeParams.id1)
    this.version2 = await this.getWikiContent(routeParams.id2)
    this.version1.timestamp = dayjs(this.version1.timestamp * 1000).format('YYYY-MM-DD HH:mm')
    this.version2.timestamp = dayjs(this.version2.timestamp * 1000).format('YYYY-MM-DD HH:mm')
    this.diffVersionContent = HTMLDiff.getHTMLDiff(this.version1.content, this.version2.content)
  },
  methods: {
    getWikiContent: async function (id) {
      const res = await this.$axios.get(`/api/timepoint/show/${id}`)
      const post = res.data.data.post
      return post
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.container > div {
  flex: 1;
}

.diff-version {
  border-left: 1px solid gray;
  border-right: 1px solid gray;
}

.version1 {
  border-right: 1px solid gray;
}

.text {
  float: left;
  width: 30%;
  border: 1px solid blue;
  margin: 10px;
}
</style>

<style>
/* .diffins {
  background-color: #cfc;
  text-decoration: none;
} */
.diffins::before {
  content: '+';
}

/* .diffdel {
  color: #999;
  background-color: #FEC8C8;
} */
.diffdel::before {
  content: '-';
}

/* ins {
    background-color: #cfc;
    text-decoration: none;
}
del {
    color: #999;
    background-color: #FEC8C8;
} */
</style>
