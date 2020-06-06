<template>
  <div class="sidebar" v-loading="loading">
    <div class="toolbar">
      <span style="margin-right: 5px">共{{timelineUpdated.length}}个词条</span>
      <div class="pc">
        <el-popover
          placement="right"
          width="400"
          trigger="click"
          v-model="filterVisible">
          <div class="tool">
            <span style="font-weight: bold; font-size: 16px">根据标签筛选</span>
            <el-checkbox-group v-model="tagsChoosed" size="small">
              <el-checkbox v-for="tag in tags" :label="tag" :key="tag" border style="margin-left: 0; margin-top: 5px">{{ tag }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <el-divider></el-divider>
          <el-button @click="filter = true; filterVisible = false" type="primary" >提交</el-button>
          <el-button @click="cancelFilter">取消筛选</el-button>
          <el-button slot="reference" size="small">筛选</el-button>
        </el-popover>
      </div>
    </div>
    <div class="scroll">
      <div v-for="time in timelineUpdated" :key="time.id" class="time" :id="`${time._id}`">
        <router-link :to="'/timeline/'+time._id" tag="li" @click.native="timepoint">{{time.show}} {{time.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../../../config'

export default {
  data () {
    return {
      loading: true,
      filter: false, // 是否进行筛选
      filterVisible: false, // 筛选对话框可见性
      tags: [],
      tagsChoosed: []
    }
  },
  computed: {
    timelineUpdated () {
      const timeline = this.$store.state.timeline
      if (!this.filter) {
        return timeline
      }
      const filterTimeline = []
      const filterRule = {
        tag: this.tagsChoosed
      }

      for (const time of timeline) {
        if (this.filterValidate(time, filterRule)) {
          try {
            filterTimeline.push(time)
          } catch (err) {
            console.error(time, err)
          }
        }
      }
      return filterTimeline
    }
  },
  props: {
    toTimepoint: {
    },
    toAdd: {
    }
  },
  async created () {
    const res = await this.$axios.get('/api/timepoint/list')
    if (res.data.code === 100) {
      let timeline = res.data.data
      timeline = timeline.map(time => {
        if (typeof time.show === 'object') {
          const { show } = time.show
          if (show) {
            time.show = time.show.show
          } else {
            time.show = time.show.date
          }
        }
        return time
      })
      this.$store.commit('updateTimeline', timeline)
    } else {
      this.$message.error('请求出错！')
    }
    this.tags = this.formatTags()
    this.loading = false
  },
  methods: {
    add () {
      this.$router.push('/timeline/add')
      if (this.toAdd !== undefined) {
        this.toAdd()
      }
    },
    timepoint () {
      if (this.toTimepoint !== undefined) {
        this.toTimepoint()
      }
    },
    cancelFilter () {
      this.filter = false
      this.filterVisible = false
      // 选项清除
      this.tagsChoosed = []
    },
    // 树 -> 到达叶子结点路径 数组
    formatTags () {
      const treeTags = config.tags
      const formatedTags = []
      for (let i = 0; i < treeTags.length; i++) {
        dfs(treeTags[i], [])
      }
      return formatedTags

      function dfs (node, path) {
        if (node === undefined) {
          formatedTags.push(path.join('/'))
          return
        }
        path.push(node.label)
        const children = node.children || []
        if (children.length === 0) {
          dfs(undefined, path)
        }
        for (let i = 0; i < children.length; i++) {
          dfs(children[i], path)
        }
        path.pop()
      }
    },
    filterValidate (time, rule) {
      const ruleKeys = Object.keys(rule)
      for (let i = 0; i < ruleKeys.length; i++) {
        const name = ruleKeys[i]
        if (!this.filterValidateByName(time, name, rule[name])) {
          return false
        }
      }
      return true
    },
    filterValidateByName (time, name, rules) {
      switch (name) {
        case 'tag': {
          return this.filterValidateByTag(time, rules)
        }
        default: {
          return true
        }
      }
    },
    filterValidateByTag (time, tags) {
      tags = tags || []
      if (tags.length === 0) {
        return true
      }
      let timeTags = []
      try {
        timeTags = time.tag.reduce((acc, cur) => {
          acc.push(cur.pathLabels.join('/'))
          return acc
        }, [])
      } catch (err) {
        console.error(time, err)
      }
      for (const tag of tags) {
        if (timeTags.includes(tag)) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 720px){
  .pc{
    display: none;
  }
}
.sidebar {
  box-sizing: border-box;
  padding: 40px 10px 0;
  height: 100%;
  border-right: 1px solid #c4c4c4;
  background-color: rgb(247, 247, 247);
}
.toolbar {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  height: 40px;
}
.toolbar .title {
  font-size: 16px;
  font-weight: bolder;
}
.scroll {
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  height: 100%;
}
.time {
  color: #666;
  font-size: 12px;
  text-align: left;
  margin: 6px 0;
}
.router-link-active {
    color: rgb(160, 192, 227);
  }
li {
  padding: 0;
  margin: 0;
  list-style: none;
  display: inline-block;
}
li:hover {
  color: rgb(160, 192, 227);
  cursor: pointer;
}
.el-tooltip {
  margin-left: 10px;
}
.analysis {
  font-size: 14px;
}
</style>
