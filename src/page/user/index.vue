<template>
  <div class="container-user">
    <div class="menu">
      <el-menu
        router
      >
        <el-menu-item index="/user/timepoint">
          <span slot="title">时间点</span>
        </el-menu-item>
        <el-menu-item index="/user/sendMessage">
          <span slot="title">站内私信</span>
        </el-menu-item>
        <el-menu-item index="/user/messages">
          <span slot="title">我的消息</span>
        </el-menu-item>
        <el-menu-item index="/user/logout">
          <span slot="title">
            登出
          </span>
        </el-menu-item>
        <el-submenu
          index="/user/discuss/articles"
        >
          <template slot="title">
            历史分析
          </template>
          <el-menu-item index="/user/discuss/articles" :route="{ path: '/user/discuss/articles', query: { userId } }">文章</el-menu-item>
          <el-menu-item index="/user/discuss/replies">回复</el-menu-item>
        </el-submenu>
        <el-submenu
          index="/user/delWiki"
          v-if="this.$store.state.userGroup.includes('admin')"
          style="border-top: 1px solid lightgray;"
        >
          <template slot="title">
            管理
          </template>
          <el-menu-item index="/user/delWiki">词条删除</el-menu-item>
          <el-menu-item index="/user/checkWiki">词条审核</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: ''
    }
  },
  async created () {
    const userId = await this.$api.getUserId()
    this.userId = userId
  }
}
</script>

<style scoped>
.container-user {
  min-width: 720px;
  margin-top: 10px;
  display: flex;
}

.menu {
  width: 200px;
}

.content {
  flex: 1;
}
</style>
