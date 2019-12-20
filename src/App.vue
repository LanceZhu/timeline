<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
}
</script>

<style>
html, body{
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
body{
  background-color: rgb(250, 250, 250);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 300px;
  height: 100%;
}
/* Element UI tooltip 与 #app 同级，需设置全局样式才能生效 */
.tooltip{
  background-color: rgb(160,192,227) !important;
}
.el-tooltip__popper[x-placement^=bottom] .popper__arrow::after {
  border-bottom-color: rgb(160,192,227) !important;
}
.el-tooltip__popper[x-placement^=bottom] .popper__arrow{
  border-bottom-color: rgb(160,192,227) !important;
}
.el-tooltip__popper[x-placement^=right-start] .popper__arrow::after {
  border-right-color: rgb(160,192,227) !important;
}
.el-tooltip__popper[x-placement^=right-start] .popper__arrow{
  border-right-color: rgb(160,192,227) !important;
}
</style>
