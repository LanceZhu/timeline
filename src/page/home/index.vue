<template>
    <el-container>
    <el-header>
        <el-menu :default-active="this.$route.name" class="el-menu-demo" mode="horizontal" router>
            <div class="sidebar-button" @click="showSidebar()">
              <i class="el-icon-s-operation"></i>
            </div>
            <el-menu-item v-for="el in elMenu" :key="el.name" :index="el.name" :route="el.route">{{ el.desc }}</el-menu-item>
            <!--
            <el-menu-item>
                <el-autocomplete
                    placeholder="请输入查询词条"
                    v-model="search"
                    clearable
                    prefix-icon="el-icon-search"
                    size="medium"
                    :fetch-suggestions="querySearch"
                    @select="handleSearch"
                    @keydown.enter.native="toSearch()"
                    >
                </el-autocomplete>
            </el-menu-item>
            -->
            <el-menu-item v-if="!this.$store.state.logged" index="'login'" :route="'/login'" id="login">注册/登录</el-menu-item>
            <el-menu-item v-if="this.$store.state.logged" index="'user'" :route="'/user'" id="login">
                  <div class="user">
                    <el-badge is-dot class="badge" v-if="hasMessage"></el-badge>
                    <i class="el-icon-user"></i>
                  </div>
            </el-menu-item>
        </el-menu>
    </el-header>
    <el-main>
      <transition>
        <router-view :showSidebar="sidebar" @close-sidebar="closeSidebar"></router-view>
      </transition>
    </el-main>
    <el-backtop></el-backtop>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      elMenu: [{
        route: '/timeline',
        name: 'timeline',
        desc: '时间轴wiki'
      }],
      sidebar: false,
      hasMessage: false
    }
  },
  created: function () {
    const that = this
    this.$axios.get('/api/user/checkLogin').then(res => {
      if (res.data.login) {
        that.$store.commit('signin')
      }
    })
  },
  methods: {
    querySearch (queryString, cb) {
      this.$axios.post('/api/search', {
        search: queryString
      }).then(res => {
        const resLists = res.data.data.result
        const len = resLists.length
        const results = []
        for (let i = 0; i < len; i++) {
          results.push({
            value: resLists[i].title,
            id: resLists[i].id
          })
        }
        cb(results)
      })
    },
    handleSearch (item) {
      this.$router.push(`/wiki/view/${item.id}`)
    },
    toSearch () {
      this.$router.push({
        path: '/search',
        query: {
          key: this.search
        }
      })
    },
    showSidebar () {
      this.sidebar = true
    },
    closeSidebar () {
      this.sidebar = false
    }
  }
}
</script>

<style>
html{
  height: 100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
body{
  height: 100%;
  background-color: rgb(250, 250, 250);
}
#app{
  height: 100%;
}
.feedback{
  margin-bottom: 15px;
  font-size: 13px;
}
.feedback a{
  text-decoration: none;
}
/**
* Element UI 全局样式
*/
.el-container{
  padding-top: 60px;
  height: 100%;
}
.el-main{
  height: 100%;
}
.el-header {
  color: #333;
  text-align: center;
  height: 60px;
  width: 100%;
  min-width: 300px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  overflow: visible;
  position: relative;
}
.el-menu{
  display: flex;
}
.el-drawer__body{
  height: 100%;
}
#login{
  margin-left: auto;
}
.el-badge sup{
  right: 10px;
  top: 15px;
}
/**
* 编辑器全局样式
**/
.ql-container{
  min-height: 250px;
}
.tooltip{
  background-color: rgb(160,192,227) !important;
  opacity: 0.8;
}
.el-tooltip__popper[x-placement^=bottom] .popper__arrow::after {
  border-bottom-color: rgb(160,192,227) !important;
  opacity: 0.8;
}
.el-tooltip__popper[x-placement^=bottom] .popper__arrow{
  border-bottom-color: rgb(160,192,227) !important;
  opacity: 0.8;
}
@media (min-width: 720px) {
  .sidebar-button{
    display: none;
  }
}
@media (max-width: 720px) {
  .sidebar-button{
    display: block;
    line-height: 60px;
  }
}

/**
* 本页面样式
*/
.badge{
  position: absolute !important;
  left: 40px;
  margin-top: -10px;
}
</style>
