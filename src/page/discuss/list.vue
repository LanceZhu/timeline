<template>
  <div class="container">
    <div class="menu-title">
      历史分析
    </div>
    <div v-if="threads.length === 0" style="padding: 5px;">暂无分析文章</div>
    <div v-else v-for="(thread, index) in threads" :key="index" class="thread-wrapper" v-loading="loading">
        <router-link :to="`/discuss/${thread._id}`" tag="li">
          <div class="thread">
            <div>
              {{ thread.title }}
            </div>
            <div class="info">
              {{ thread.timestamp }}
            </div>
          </div>
        </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data: () => {
    return {
      threads: [],
      loading: true
    }
  },
  async created () {
    const timepointId = this.getTimepointId()

    const threads = await this.getThreadsList(timepointId)
    this.threads = threads

    this.loading = false
  },
  methods: {
    getTimepointId () {
      return this.$route.query.timepointId
    },
    async getThreadsList (timepointId) {
      let API = 'api/discuss/getThreadsList'
      if (timepointId) {
        API = `${API}/${timepointId}`
      }

      const res = await this.$axios.get(API)
      const { threads } = res.data.data

      threads.forEach(thread => {
        thread.timestamp = dayjs(thread.timestamp * 1000).format('YYYY/MM/DD')
      })

      const filterdThreads = threads.filter(thread => thread.status === 'publish')

      return filterdThreads
    }
  }
}
</script>

<style scoped>
.container {
  box-sizing: border-box;
  width: 50%;
  min-width: 375px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 50px;
  background-color: #fafafa;
  border-radius: 20px;
}

.menu-title {
  position: relative;
  font-size: 22px;
  font-weight: bold;
  text-align: left;
}

.menu-title::before {
  content: '';
  border-left: 4px solid #409eff;
  position: absolute;
  height: 100%;
  left: -10px;
}

.thread-wrapper {
  margin-bottom: 10px;
}

.thread {
  padding: 10px;
  border-bottom: 1px solid lightgray;
  text-align: left;
}

.thread:hover {
  border-bottom: 1px solid black;
}

li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.info {
  font-size: 12px;
  color: gray;
}
</style>
