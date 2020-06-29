<template>
  <div>
    <el-table v-if="!!wikis.length" :data="wikis" height="600px" stripe style="width: 100%;">
      <el-table-column prop="timestamp" sortable label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px;">{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column
        prop="status"
        label="所处状态"
        :filters="[{ text: '发表中', value: '发表中' }, { text: '已更新', value: '已更新' }, { text: '已删除', value: '已删除'}]"
        :filter-method="filterTag"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '发表中' ? 'success' : scope.row.status === '已更新' ? 'info' : 'danger'"
            disable-transitions
          >{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="toTimepointView(scope.$index)" type="text" size="small">查看</el-button>
          <!-- <el-button @click="toDelete(scope.$index)" type="text" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <span v-else>
      还没有发布时间点
    </span>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      wikis: []
    }
  },
  created () {
    this.getWikis()
  },
  methods: {
    getWikis: function () {
      const that = this
      this.$axios.get('/api/user/getPostList').then(res => {
        that.wikis = res.data.data
        that.wikis = that.wikis.map(wiki => {
          wiki.timestamp = dayjs(wiki.timestamp * 1000).format('YYYY-MM-DD HH:mm')
          return wiki
        })
        const wikiStatusTable = {
          publish: '发表中',
          delete: '已删除',
          revision: '已更新',
          pending: '审核中'
        }
        for (let i = that.wikis.length - 1; i >= 0; i--) {
          const status = that.wikis[i].status
          that.wikis[i].status = wikiStatusTable[status]
        }
        that.wikis = that.wikis.reverse()
      })
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
    },
    // 根据时间点状态筛选表格
    filterTag (value, row) {
      return row.status === value
    }
  }
}
</script>

<style scoped>
.wikis {
  margin-top: 10px;
}
</style>
