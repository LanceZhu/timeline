<template>
    <el-container>
    <el-header>
        <el-menu :default-active="this.$route.name" class="home-el-menu" mode="horizontal" router>
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
            <el-menu-item id="search">
              <el-autocomplete
                v-model="search"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSearch"
              ></el-autocomplete>
            </el-menu-item>
            <el-menu-item v-if="!this.$store.state.logged" index="'login'" :route="'/login'">注册/登录</el-menu-item>
            <el-menu-item v-if="this.$store.state.logged" index="'user'" :route="'/user'">
                  <div class="user">
                    <el-badge is-dot class="badge" v-if="hasMsg"></el-badge>
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
      sidebar: false
    }
  },
  created: async function () {
    try {
      const res = await this.$axios.get('/api/user/checkLogin')
      if (res.data.login) {
        this.$store.commit('signin')
      }
    } catch (err) {
      console.error(err)
    }
    try {
      // 消息通知
      const res = await this.$axios.get('/api/user/getDetail')
      const { msg = [] } = res.data.data.mongo
      this.$store.commit('updateMessages', msg)
    } catch (err) {
      console.error(err)
    }
  },
  computed: {
    hasMsg: function () {
      return !!this.$store.state.messages.length
    }
  },
  methods: {
    async querySearch (queryString, cb) {
      try {
        const res = await this.$axios.post('/api/timepoint/search', {
          search: this.search
        })
        const resList = res.data.data
        const results = resList.map(res => {
          return {
            id: res._id,
            value: res.title
          }
        })
        cb(results)
      } catch (err) {
        console.error(err)
      }
    },
    handleSearch (item) {
      this.$router.push(`/timeline/${item.id}`)
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

<style scoped>
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
.el-container{
  padding-top: 60px !important;
  height: 100% !important;
}
.el-main{
  height: 100%;
  color: #333;
  text-align: center;
  overflow: visible;
  position: relative;
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
.el-menu{
  display: flex;
}
/* 去除导航栏选中后底部样式 */
.el-menu-item{
  border-bottom-color:#ffffff!important;
}
.el-drawer__body{
  height: 100%;
}
#search{
  margin-left: auto;
}
.badge{
  position: absolute !important;
  left: 40px;
  margin-top: -10px;
}
.el-badge sup{
  right: 10px;
  top: 15px;
}
/deep/ .feedback{
  margin-bottom: 15px;
  font-size: 13px;
}
/deep/ .feedback a{
  text-decoration: none;
}
</style>
