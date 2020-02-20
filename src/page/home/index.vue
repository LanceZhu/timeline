<template>
  <el-container>
    <el-header>
      <el-menu :default-active="this.$route.name" class="home-el-menu" mode="horizontal" menu-trigger="click" router >
        <el-menu-item
          v-for="el in elMenu"
          :key="el.name"
          :index="el.name"
          :route="el.route"
          class="website-title pc"
        >{{ el.desc }}</el-menu-item>
        <el-menu-item
        index="timeline"
        route="/timeline"
        class="mobile">
          <i>WE</i>
        </el-menu-item>
        <el-menu-item id="search">
          <el-autocomplete
            v-model="search"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSearch"
          ></el-autocomplete>
        </el-menu-item>
        <!-- 网页端 登录/注册/个人中心 -->
        <el-menu-item v-if="!this.$store.state.logged" index="'login'" :route="'/login'" class="pc">注册/登录</el-menu-item>
        <el-menu-item v-if="this.$store.state.logged" index="'user'" :route="'/user'" class="pc">
          <div class="user">
            <el-badge is-dot class="badge" v-if="hasMsg"></el-badge>
            <i class="el-icon-user"></i>
          </div>
        </el-menu-item>
        <!-- 网页端 创建新词条 -->
        <el-menu-item :route="'/timeline/add'" index="'/new-post'" class="pc">
          <div class="new-post-wrap">
            <div class="new-post">创建词条</div>
          </div>
        </el-menu-item>
        <!-- 移动端 登录/注册/个人中心 -->
        <el-submenu class="mobile">
          <template slot="title">
            <i class="el-icon-s-operation"></i>
          </template>
          <el-menu-item v-if="!this.$store.state.logged" index="'login'" :route="'/login'">注册/登录</el-menu-item>
          <el-menu-item v-if="this.$store.state.logged" index="'user'" :route="'/user'">
            <div class="user">
              <el-badge is-dot class="badge" v-if="hasMsg"></el-badge>
              <i class="el-icon-user"></i>
            </div>
          </el-menu-item>
          <!-- 创建词条 -->
          <el-menu-item :route="'/timeline/add'" index="'/new-post'">
            创建词条
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main>
      <transition>
        <router-view></router-view>
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
      elMenu: [
        {
          route: '/timeline',
          name: 'timeline',
          desc: '时间轴wiki（beta版）'
        }
      ],
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
    }
  }
}
</script>

<style scoped>
@media (max-width: 720px) {
  .mobile{
    margin-left: auto;
  }
}
@media (min-width: 720px){
  /* 创建词条 */
  .new-post-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;;
  }
  .new-post{
    background-color: rgb(180, 109, 139);
    color: white;
    font-weight: bold;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    padding: 0 10px;
  }
}
.el-container {
  padding-top: 60px !important;
  height: 100% !important;
}
.el-main {
  height: 100%;
  color: #333;
  text-align: center;
  overflow: visible;
  position: relative;
  padding: 0;
  margin: 0;
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
  padding: 0;
  margin: 0;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-menu {
  display: flex;
}
.el-drawer__body {
  height: 100%;
}
#search {
  margin-left: auto;
}
.badge {
  position: absolute !important;
  left: 40px;
  margin-top: -10px;
}
.el-badge sup {
  right: 10px;
  top: 15px;
}
</style>

<style>
@media screen and (min-width: 720px){
  .mobile{
    display: none;
  }
}
@media screen and (max-width: 720px) {
  .pc{
    display: none;
  }
}
/* 去除导航栏选中后底部样式 */
.el-menu-item{
  border-bottom-color: #ffffff !important;
}
.el-submenu__title{
  border-bottom-color: #ffffff !important;
}
.website-title{
  font-size: 20px !important;
  color: black !important;
}
</style>
