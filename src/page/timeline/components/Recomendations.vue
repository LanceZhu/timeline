<template>
  <div class="recomendations">
    <div class="tip">
      猜你感兴趣
      <el-button size="small" round icon="el-icon-refresh" @click="changeRecomendtion">换一换</el-button>
    </div>
    <div v-if="recomendations.length !== 0">
      <a v-for="item in recomendations" :key="item" :href="`/#/timeline/${item._id}`">
        <el-card
          :body-style="{padding: '10px', backgroundColor: 'rgb(250, 250, 250)'}"
          shadow="never"
        >
        <span style="color: #606266;">{{ item.show }} {{ item.title }}</span>
        </el-card>
      </a>
    </div>
    <div v-else>暂无推荐词条</div>
  </div>
</template>

<script>
export default {
  computed: {
    recomendations: function () {
      return this.$store.state.recomendations // 数据流 $store.timeline -> $store.recomendations -> recommendations
    }
  },
  methods: {
    changeRecomendtion: function () {
      this.$store.commit('updateRecommendations')
    }
  }
}
</script>

<style scoped>
.recomendations {
  width: 90%;
  margin: 0 auto;
}

.recomendations .tip {
  font-size: 16px;
  text-align: left;
  margin: 10px 0;
}

.recomendations a {
  text-decoration: none;
}
</style>
