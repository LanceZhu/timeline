<template>
    <el-container>
    <el-header>
        <el-menu :default-active="this.$route.name" class="el-menu-demo" mode="horizontal" router>
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
            <el-menu-item v-if="this.$store.state.logged" index="'user'" :route="'/user'" id="login"><i class="el-icon-user"></i></el-menu-item>
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
      elMenu: [{
        route: '/timeline',
        name: 'timeline',
        desc: '时间轴wiki'
      }
      ]
    }
  },
  watch: {
  },
  created: function () {
    const that = this
    this.$axios.get('/api/checkLogin').then(res => {
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
    }
  }
}
</script>

<style>
html{
  height: 100%;
}
body{
  height: 100%;
  background-color: rgb(250, 250, 250);
}
#app{
  height: 100%;
}
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
  min-width: 1000px;
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
#login{
  margin-left: auto;
}

/**
* 编辑器全局样式
**/
.ql-container{
  min-height: 250px;
}

</style>
