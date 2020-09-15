<template>
  <div class="container">
    <div class="menu-title">
      我的回复
    </div>
    <div v-if="replies.length === 0" style="padding: 5px;">暂无回复</div>
    <div v-else v-for="(reply, index) in replies" :key="index" class="thread-wrapper" v-loading="loading">
        <router-link :to="`/discuss/${reply.thread_id}`" tag="li">
          <div class="thread">
            <div>
              {{ reply.content }}
            </div>
            <div class="info">
              {{ reply.timestamp }}
            </div>
          </div>
        </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      replies: []
    }
  },
  async created () {
    const replies = await this.getRepliesByUid()
    this.replies = replies
  },
  methods: {
    async getRepliesByUid () {
      const res = await this.$axios.get('/api/discuss/getRepliesByUid')
      const { replies } = res.data.data

      const filterdReplies = replies.filter(reply => reply.status === 'publish')
      filterdReplies.forEach(thread => {
        thread.timestamp = dayjs(thread.timestamp * 1000).format('YYYY/MM/DD')
      })

      return filterdReplies
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
