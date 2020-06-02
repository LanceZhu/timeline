<template>
  <div class="tags">
    <div class="desc">添加标签（至少一项）</div>
    <div>
      <el-cascader
      ref="tags"
      v-model="tagsChoosed"
      :options="tags"
      :props="{ multiple: true }"
      ></el-cascader>
    </div>
  </div>
</template>

<script>
import config from '../../config'

export default {
  data () {
    return {
      tags: config.tags,
      tagsChoosed: []
    }
  },
  props: ['defaultTagsChoosed'],
  watch: {
    defaultTagsChoosed: function (tagsChoosed) {
      this.tagsChoosed = tagsChoosed
    }
  },
  // 返回数据格式
  // [{
  //   path, // value 值组成数组
  //   pathLabels // label 值组成数组
  // }]
  methods: {
    getData () {
      const checkedNodes = this.$refs.tags.getCheckedNodes(true) // leafOnly: true 只获取叶节点
      const tagsChoosed = checkedNodes.reduce((acc, cur) => {
        const { pathLabels, path } = cur
        const tag = {
          path, pathLabels
        }
        acc.push(tag)
        return acc
      }, [])
      if (tagsChoosed.length === 0) {
        const errMsg = '至少添加一个标签'
        this.$message.error(errMsg)
        throw new Error(errMsg)
      }
      return tagsChoosed
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
