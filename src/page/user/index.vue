<template>
  <div>
    <el-tabs :tab-position="'left'">
      <el-tab-pane label="所有时间点">
        <div v-if="wikis.length">
          <el-table
            :data="wikis"
            style="width: 100%">
            <el-table-column
              prop="timestamp"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="toTimepointView(scope.$index)" type="text" size="small">查看</el-button>
                <el-button @click="toDelete(scope.$index)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          还没有发布时间点
        </div>
      </el-tab-pane>
      <el-tab-pane label="登出">
        <el-button @click="logout()">登出</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import parseDate from '@/utils/parseDate'

export default {
  data () {
    return {
      wikis: []
    }
  },
  methods: {
    getWikis: function () {
      const that = this
      this.$axios.get('/api/user/getPostList').then(res => {
        that.wikis = res.data.data
        that.wikis = that.wikis.map(wiki => {
          wiki.timestamp = parseDate(wiki.timestamp * 1000) // 单位 s -> ms
          return wiki
        })
        that.wikis = that.wikis.filter(wiki => {
          return wiki.status === 'publish'
        })
      })
    },
    logout () {
      const that = this
      this.$axios.get('/api/user/logout').then(() => {
        that.$store.commit('logout')
        that.$router.push('/timeline')
      })
      this.$message.success('登出成功')
    },
    toTimepointView (index) {
      const id = this.wikis[index]._id
      this.$router.push(`/timeline/${id}`)
    },
    toDelete (index) {
      const id = this.wikis[index]._id
      const that = this
      this.$axios.get(`/api/user/delPost/${id}`).then(res => {
        switch (res.data.code) {
          case 100: {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getWikis()
            break
          }
          default: {
            that.$message.error('删除失败')
          }
        }
      })
    }
  },
  created () {
    this.getWikis()
  }
}
</script>

<style scoped>
.messages{
  height: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  margin-top: 10px;
}
.wikis{
  margin-top: 10px;
}
.el-card{
  margin-bottom: 10px;
}
a{
  text-decoration: none;
}
</style>
