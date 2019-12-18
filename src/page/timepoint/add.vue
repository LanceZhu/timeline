<template>
  <div class="container-add">
    <FuzzyTimePicker ref="FuzzyTimePicker"></FuzzyTimePicker>
    <Editor ref="Editor"></Editor>
    <NationalityAndInventor></NationalityAndInventor>
    <div class="submit">
      <el-button type="primary" icon="el-icon-upload2" @click="submit()">添加</el-button>
    </div>
    <Tags ref="Tags"></Tags>
    <Citation ref="Citation"></Citation>
  </div>
</template>

<script>
import customizeViewByMode from '@/utils/customizeViewByMode'

import NationalityAndInventor from '@/components/NationalityAndInventor'
import FuzzyTimePicker from '@/components/FuzzyTimePicker'
import Citation from '@/components/Citation'
import Tags from '@/components/Tags'
import Editor from '@/components/Editor'

export default {
  data () {
    return {
      ruleForm: {},
      showObject: {}
    }
  },
  components: {
    NationalityAndInventor,
    FuzzyTimePicker,
    Citation,
    Tags,
    Editor
  },
  methods: {
    async submit () {
      // 时间点选择字段
      const { year, month, day, show } = this.$refs.FuzzyTimePicker.getData()

      let nationalityAndCreator = {}
      if (this.showObject.nationalityAndCreator) {
        // 发明简史国籍和发明人字段
        try {
          nationalityAndCreator = await this.$refs.NationalityAndInventor.getData()
        } catch (err) {
          console.error(err)
          return
        }
      }

      // 文献字段
      let citations = []
      try {
        citations = this.$refs.Citation.getData()
      } catch (err) {
        console.error(err)
        return
      }

      // 标签字段
      const tag = this.$refs.Tags.getData()

      // 标题和内容字段
      const { title, content } = this.$refs.Editor.getData()

      // post 请求参数
      const params = {
        title,
        content,
        year,
        month,
        day,
        show,
        tag,
        supplement: citations
      }

      Object.assign(params, nationalityAndCreator)

      const res = await this.$axios.post('/api/post/timepoint/new', params)
      switch (res.data.code) {
        case 100: {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push(`/timeline/${res.data.new_post_id}`)
            this.$axios.get('/api/timepoint/list').then(res => {
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
              }
            })
          }, 1500)
          break
        }
        default: {
          this.$message.error('添加失败')
        }
      }
    }
  },
  created () {
    customizeViewByMode.bind(this)()
  }
}
</script>

<style scoped>
.container-add{
  width: 90%;
  margin: 0 auto;
  min-width: 720px;
}
.el-input{
  margin: 10px 0;
}
.submit{
  margin-top: 10px;
}
.date{
  text-align: left;
}
.date-format{
  display: flex;
  align-items: center;
}
.date .el-cascader{
  margin-right: 20px;
}
.date .el-date-editor{
  width: 150px !important;
}
.date .el-input{
  width: 80px;
  height: 40px;
  margin: 10px;
}
.el-dialog{
  margin: 0;
}
</style>
