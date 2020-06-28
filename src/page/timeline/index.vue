<template>
  <div class="container">
    <div class="mobile">
      <div class="sidebar-button" @click="showSidebar()">
        <i class="el-icon-right"></i>
      </div>
      <el-drawer
        title="时间轴"
        :visible.sync="sidebar"
        direction="ltr"
        :before-close="closeSidebar"
        size="75%"
        custom-class="custom-drawer"
        :with-header="false"
      >
      <Timeline :toAdd="closeSidebar" :toTimepoint="closeSidebar"></Timeline>
      </el-drawer>
    </div>
    <div class="pc">
      <Timeline></Timeline>
    </div>
    <div class="content">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
const Timeline = () => import('./components/Timeline')

export default {
  data () {
    return {
      sidebar: false
    }
  },
  components: {
    Timeline
  },
  methods: {
    closeSidebar () {
      this.sidebar = false
    },
    showSidebar () {
      this.sidebar = true
    }
  }
}
</script>

<style scoped>
@media (max-width: 720px) {
  .container {
    height: 100%;
    position: relative;
    display: flex;
  }
  .pc {
    display: none;
  }
  .sidebar-button {
    display: block;
    position: fixed;
    top: 100px;
    left: 0;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: white;
    margin-left: -30px;
    opacity: 0.75;
    box-shadow: 0 0 5px rgb(138, 95, 95);
    z-index: 999;
  }
  .sidebar-button i {
    line-height: 60px;
    padding-left: 20px;
  }
  .content {
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    height: 100%;
    width: 100%;
  }
}
@media (min-width: 720px) {
  .container {
    height: 100%;
    position: relative;
    display: flex;
  }
  .mobile {
    display: none;
  }
  .pc {
    height: 100%;
    width: 20%;
  }
  .sidebar-button {
    display: none;
  }
  .content {
    width: 80%;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    height: 100%;
  }
}
</style>

<style>
.custom-drawer .el-drawer__body {
  height: 100%;
}
</style>
