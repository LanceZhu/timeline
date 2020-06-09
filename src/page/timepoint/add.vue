<template>
  <div class="container-add">
    <FuzzyTimePicker ref="FuzzyTimePicker"></FuzzyTimePicker>
    <Editor ref="Editor"></Editor>
    <NationalityAndInventor v-if="this.$view.showNationalityAndInventor" ref="NationalityAndInventor"></NationalityAndInventor>
    <Tags ref="Tags" editable></Tags>
    <Citation ref="Citation" editable></Citation>
    <div class="submit">
      <el-button type="primary" @click="submit()">提交</el-button>
    </div>
  </div>
</template>

<script>
const NationalityAndInventor = () => import('@/components/NationalityAndInventor')
const FuzzyTimePicker = () => import('@/components/FuzzyTimePicker')
const Citation = () => import('@/components/Citation')
const Tags = () => import('@/components/Tags')
const Editor = () => import('@/components/Editor')

export default {
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
      if (this.$view.showNationalityAndCreator) {
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
      let tag = []
      try {
        tag = this.$refs.Tags.getData()
      } catch (err) {
        console.error(err)
        return
      }

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
  }
}
</script>

<style scoped>
.container-add{
  width: 90%;
  margin: 0 auto;
  min-width: 720px;
  padding: 10px 0 20px;
}
.el-input{
  margin: 10px 0;
}
.submit{
  margin: 10px 0 20px;
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
