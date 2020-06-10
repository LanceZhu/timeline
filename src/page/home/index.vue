<template>
  <el-container>
    <el-header class="pc">
      <el-menu class="home-el-menu" mode="horizontal" menu-trigger="click" router >
        <el-menu-item
          v-for="el in elMenu"
          :key="el.name"
          :index="el.name"
          :route="el.route"
          class="website-title"
        >{{ el.desc }}</el-menu-item>
        <el-menu-item style="margin-left: auto">
          <Search></Search>
        </el-menu-item>
        <el-menu-item>
          <span>
            <a href="https://shimo.im/docs/vVAXVYrz96cK8pqm/" target="_blank" style="text-decoration: none; color: gray">使用说明<i class="el-icon-question"></i></a>
          </span>
        </el-menu-item>
        <Acount></Acount>
        <el-menu-item :route="'/timeline/add'" index="'/new-post'" class="pc">
          <div class="new-post-wrap">
            <div class="new-post">创建词条</div>
          </div>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-header class="mobile">
      <el-menu :default-active="this.$route.name" class="home-el-menu" mode="horizontal" menu-trigger="click" router>
        <el-menu-item
        index="timeline"
        route="/timeline">
          <i>WE</i>
        </el-menu-item>
        <el-menu-item style="margin-left: auto">
          <Search></Search>
        </el-menu-item>
        <el-submenu>
          <template slot="title">
            <i class="el-icon-s-operation"></i>
          </template>
          <!-- <Acount></Acount> -->
          <el-menu-item :route="'/timeline/add'" index="'/new-post'">
            创建词条
          </el-menu-item>
          <el-menu-item>
            <span>
              <a href="https://shimo.im/docs/vVAXVYrz96cK8pqm/" target="_blank" style="text-decoration: none; color: gray">使用说明</a>
            </span>
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
const Search = () => import('./components/Search')
const Acount = () => import('./components/Acount')

export default {
  data () {
    return {
      elMenu: [
        {
          route: '/timeline',
          name: 'timeline',
          desc: '时间轴wiki（beta版）'
        }
      ]
    }
  },
  components: {
    Search,
    Acount
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
.el-header {
  box-shadow: 0 0 0.6rem 0 #d0d0d0;
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
