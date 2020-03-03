<template>
  <div class="container-timeline-default">
    <div v-html="content" class="content"></div>
    <el-divider></el-divider>
    <div class="recomendations">
      <div class="tip">
        猜你感兴趣
        <el-button size="small" round icon="el-icon-refresh" @click="changeRecomendtion">换一换</el-button>
      </div>
      <div v-if="recomendations.length !== 0">
        <a v-for="item in recomendations" :key="item" :href="`/#/timeline/${item._id}`">
          <el-card  :body-style="{padding: '10px', backgroundColor: 'rgb(250, 250, 250)'}" shadow="never">
              <span>{{ item.show }} {{ item.title }}</span>
          </el-card>
        </a>
      </div>
      <div v-else>暂无推荐词条</div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { preface } from '../../../config'

const Footer = () => import('../../components/Footer')

export default {
  data () {
    return {
      content: preface
    }
  },
  components: {
    Footer
  },
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
.content{
  width: 90%;
  margin: 0 auto;
  text-align: left;
  white-space: pre-wrap;
}
.recomendations {
  width: 90%;
  margin: 0 auto;
}
.recomendations .tip{
  font-size: 16px;
  text-align: left;
  margin: 10px 0;
}
.recomendations a{
  text-decoration: none;
}
</style>
