<template>
  <div class="tags">
    <div class="desc">添加标签（必填一项）</div>
    <div>
      <el-cascader v-model="tagValue" :options="tags"></el-cascader>
    </div>
  </div>
</template>

<script>
import config from '../../config'

export default {
  data () {
    return {
      tags: config.tags,
      tagValue: []
    }
  },
  props: ['defaultTagValue'],
  watch: {
    defaultTagValue: function (newV, oldV) {
      this.tagValue = newV
    }
  },
  methods: {
    getData () {
      return JSON.stringify(this.tagValue)
    }
  }
}
</script>

<style scoped>
.tags {
  text-align: left;
}
.tags .desc {
  margin-bottom: 10px;
}
</style>
