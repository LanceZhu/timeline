<template>
    <div class="container-devlog">
        <el-timeline>
            <el-timeline-item
            v-for="(log, index) in logs"
            :key="index"
            :icon="log.icon"
            :type="log.type"
            :color="log.color"
            :size="log.size"
            :timestamp="log.timestamp">
            {{log.content}}
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
export default {
  data () {
    return {
      logs: [{
        content: '优化移动端浏览体验',
        timestamp: '2020-02-12',
        type: 'info'
      }, {
        content: '修复时间点编辑页面回车键跳转',
        timestamp: '2020-02-12',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '添加日志',
        timestamp: '2020-02-12',
        color: '#0bbd87'
      }]
    }
  }
}
</script>

<style scoped>
.container-devlog{
    max-width: 650px;
    margin: 10px auto;
}
</style>
