<template>
  <div class="tags">
    <div class="desc el-icon-caret-right" v-if="editable">
      标签（至少添加一项)
    </div>
    <div class="item" v-if="editable">
      <el-autocomplete
        style="width: 400px; margin-bottom: 0"
        v-if="inputVisible"
        v-model="inputValue"
        ref="tagsInput"
        size="small"
        :fetch-suggestions="searchTag"
        @select="selectTag"
        @keyup.enter.native="handleInput"
      >
      </el-autocomplete>
      <el-button v-else size="small" @click="showInput" style="margin-bottom: 10px">添加标签</el-button>
    </div>
    <div class="item">
      <el-tag
        :key="tag"
        v-for="tag in tagsChoosed"
        style="margin-right: 10px"
        :closable="editable"
        disable-transitions
        size="small"
        effect="plain"
        @close="handleCloseTag(tag)">
        {{ tag }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import config from '../../config'

export default {
  data () {
    return {
      tagsChoosed: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  props: {
    defaultTagsChoosed: {
      default: []
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    defaultTagsChoosed: function (tagsChoosed) {
      const formatedTagsChoosed = tagsChoosed.map(tag => {
        if (typeof tag === 'string') {
          return tag
        }
        if (typeof tag === 'object' && 'pathLabels' in tag) {
          return tag.pathLabels.join('/')
        }
        return tag
      })
      this.tagsChoosed = formatedTagsChoosed
    }
  },
  // 返回数据格式
  // [{
  //   path, // value 值组成数组
  //   pathLabels // label 值组成数组
  // }]
  methods: {
    getData () {
      console.log(this.tagsChoosed)
      const tagsChoosed = this.tagsChoosed
      if (tagsChoosed.length === 0) {
        const errMsg = '至少添加一个标签'
        this.$message.error(errMsg)
        throw new Error(errMsg)
      }
      return tagsChoosed
    },
    handleInput () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.tagsChoosed.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.tagsInput.focus()
      })
    },
    handleCloseTag (tag) {
      this.tagsChoosed.splice(this.tagsChoosed.indexOf(tag), 1)
    },
    searchTag (querystring, cb) {
      const tags = config.tags
      const results = querystring ? tags.filter(tag => {
        return tag.value.indexOf(querystring) === 0
      }) : tags
      cb(results)
    },
    selectTag (tag) {
      this.inputValue = tag.value
      this.inputVisible = false
      this.handleInput()
    }
  }
}
</script>

<style scoped>
.tags {
  text-align: left;
  margin-top: 10px;
}
.desc {
  margin-bottom: 10px;
}
.item {
  font-size: 14px;
}
</style>
