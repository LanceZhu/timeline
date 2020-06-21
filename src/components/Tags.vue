<template>
  <div class="tags">
    <div class="desc el-icon-caret-right" v-if="editable">
      <span>
        标签（至少添加一项)
      <el-tooltip placement="right-start" popper-class="tooltip">
        <div slot="content">
          输入内容后回车
          <br/>
          可添加自定义标签
        </div>
        <i style="color: gray" class="el-icon-info"></i>
      </el-tooltip>
      </span>
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
        :popper-append-to-body="false"
      >
      <!-- popper-append-to-body: false // true 筛选时间轴时 select事件 导致外部 popover 隐藏 -->
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
    // 是否能添加标签
    editable: {
      type: Boolean,
      default: false
    },
    // 是否能够新建标签 即将标签存入数据库，用于时间轴筛选
    canNewTag: {
      type: Boolean,
      default: true
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
      const tagsChoosed = this.tagsChoosed
      if (tagsChoosed.length === 0) {
        const errMsg = '至少添加一个标签'
        this.$message.error(errMsg)
        throw new Error(errMsg)
      }
      return tagsChoosed
    },
    async handleInput () {
      const inputValue = this.inputValue
      if (!inputValue) {
        return
      }
      if (this.canNewTag) {
        const newTagSuccess = await this.newTag(inputValue)
        if (!newTagSuccess) {
          this.$message.error('新建tag出错！')
          return
        }
      }
      this.insertTag(inputValue)
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
    async searchTag (querystring, cb) {
      const tags = config.tags.slice()
      const customTags = await this.getCustomTags()
      tags.push(...customTags)
      // 去重
      let results = tags.filter((tag, index) => {
        return tags.indexOf(tag) === index
      })
      // 前缀匹配
      results = querystring ? results.filter(tag => {
        return tag.value.indexOf(querystring) === 0
      }) : results
      cb(results)
    },
    // @return Array {label, value}
    async getCustomTags () {
      const res = await this.$axios.get('/api/tag/list')
      if (res.data.code !== 100) {
        return []
      }
      const customTags = res.data.result.map(tag => {
        const { tagName: label, tagLabel: value } = tag
        return {
          label, value
        }
      })
      return customTags
    },
    async selectTag (tag) {
      this.insertTag(tag.value)
    },
    // 新建 tag
    async newTag (tag) {
      const data = {
        tagName: tag,
        tagLabel: tag
      }
      const res = await this.$axios.post('/api/tag/new', data)
      if (res.data.code === 100) {
        // 创建新标签成功
        return true
      } else if (res.data.code === 113) {
        // 资源/标签已存在
        return true
      } else {
        return false
      }
    },
    // 显示新建 tag
    insertTag (tag) {
      if (tag) {
        this.tagsChoosed.push(tag)
      }
      this.inputVisible = false
      this.inputValue = ''
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
