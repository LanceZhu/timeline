<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getConfig } from '@/API/API'
export default {
  async created () {
    this.persistVuex()
    await this.getConfig()
    this.applyBaiduAnalysis()
  },
  methods: {
    // 持久化 Vuex，避免页面刷新状态丢失
    persistVuex () {
      if (sessionStorage.getItem('Vuex')) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('Vuex'))))
      }
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('Vuex', JSON.stringify(this.$store.state))
      })
    },
    async getConfig () {
      const config = await getConfig()
      this.$store.commit('updateConfig', config)
    },
    applyBaiduAnalysis () {
      // 百度统计
      if (this.$store.state.config.BAIDU_ANALYSIS_URL !== undefined && process.env.NODE_ENV === 'production') {
        // @ts-ignore
        var _hmt = _hmt || []
        // @ts-ignore
        window._hmt = _hmt; // 修改为window 全局变量
        (function () {
          var hm = document.createElement('script')
          hm.src = config.BAIDU_ANALYSIS_URL
          var s = document.getElementsByTagName('script')[0]
          // @ts-ignore
          s.parentNode.insertBefore(hm, s)
        })()
      }
    }
  }
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  font-family: "Noto Sans SC", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

body {
  background-color: rgb(250, 250, 250);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 300px;
  height: 100%;
}

/* Element UI tooltip 与 #app 同级，需设置全局样式才能生效 */
.tooltip {
  background-color: rgb(160, 192, 227) !important;
}

.el-tooltip__popper[x-placement^=bottom] .popper__arrow::after {
  border-bottom-color: rgb(160, 192, 227) !important;
}

.el-tooltip__popper[x-placement^=bottom] .popper__arrow {
  border-bottom-color: rgb(160, 192, 227) !important;
}

.el-tooltip__popper[x-placement^=right-start] .popper__arrow::after {
  border-right-color: rgb(160, 192, 227) !important;
}

.el-tooltip__popper[x-placement^=right-start] .popper__arrow {
  border-right-color: rgb(160, 192, 227) !important;
}
</style>
