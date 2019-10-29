<template>
  <div>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="wiki in wikis" :key="wiki.id" @click.native="toWikiView(wiki.id)">
      <h3>{{ wiki.name }}</h3>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      wikis: [
        {
          id: '29',
          name: '互联网发展简史'
        }
      ]
    }
  },
  methods: {
    toWikiView: function (id) {
      this.$router.push(`/wiki/view/${id}`)
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
