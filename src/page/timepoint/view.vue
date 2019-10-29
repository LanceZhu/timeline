<template>
  <div>
    <el-drawer
      title="操作选项"
      size="20%"
      :visible.sync="drawer"
      :direction="direction">
      <el-menu default-active="1">
        <el-menu-item index="1" @click="toTimepointEdit">
          <i class="el-icon-edit-outline"></i>
          <span>编辑时间点</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toTimepointHistory">
          <i class="el-icon-time"></i>
        <span>时间点历史</span>
        </el-menu-item>
        <el-menu-item index="3" @click="toWikiView">
          <i class="el-icon-s-home"></i>
        <span>查看所属词条</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
    <el-button @click="drawer = true" icon="el-icon-s-operation" class="drawer"></el-button>
    <div v-html="content"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      direction: 'ltr',
      belongTo: 0,
      content: ''
    }
  },
  created: function () {
    const that = this
    if ('id' in this.$route.params) {
      this.$axios.get(`/api/show/${this.$route.params.id}`).then(res => {
        that.$data.content = res.data.data.post.content
        that.belongTo = res.data.data.post.belong_to
      })
    }
  },
  methods: {
    toTimepointEdit: function () {
      this.$router.push(`/timepoint/edit/${this.$route.params.id}`)
    },
    toTimepointHistory: function () {
      this.$router.push(`/timepoint/history/${this.$route.params.id}`)
    },
    toWikiView: function () {
      this.$router.push(`/wiki/view/${this.belongTo}`)
    }
  }
}
</script>

<style scoped>
.drawer{
    position: fixed;
    top: 70px;
    left: 10px;
}
</style>
