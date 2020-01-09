<template>
  <div class="container-edit">
    <FuzzyTimePicker ref="FuzzyTimePicker" :defaultValue="this.dateValue" :defaultDate="this.date" :defaultType="this.dateType"></FuzzyTimePicker>
    <Editor ref="Editor" :defaultTitle="this.title" :defaultContent="this.content"></Editor>
    <NationalityAndInventor v-if="showObject.showNationalityAndInventor" ref="NationalityAndInventor" :nationality="ruleForm.nationality" :inventor="ruleForm.inventor"></NationalityAndInventor>
    <div class="submit">
      <el-button type="primary" icon="el-icon-upload2" @click="submit()">提交</el-button>
    </div>
    <Tags ref="Tags" :defaultTagValue="this.tagValue"></Tags>
    <Citation ref="Citation" :defaultCitations="this.citations"></Citation>
  </div>
</template>

<script>
import customizeViewByMode from '@/utils/customizeViewByMode'

const NationalityAndInventor = () => import('@/components/NationalityAndInventor')
const FuzzyTimePicker = () => import('@/components/FuzzyTimePicker')
const Citation = () => import('@/components/Citation')
const Tags = () => import('@/components/Tags')
const Editor = () => import('@/components/Editor')

export default {
  data () {
    return {
      // 以组件形式嵌入的表单字段集合
      ruleForm: {},
      // 控制组件的显示
      showObject: {},
      title: '',
      content: '',
      dateValue: [100], // 时间点显示值
      dateType: 100,
      date: '',
      tagValue: [],
      citations: []
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

      const res = await this.$axios.post(`/api/timepoint/edit/${this.$route.params.id}`, params)
      switch (res.data.code) {
        case 100: {
          this.$message({
            message: '编辑成功',
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
          })
          break
        }
        default: {
          this.$message.error('编辑失败')
        }
      }
    },
    dateInitialize (dateInput) {
      this.dateValue = dateInput.type
      const dateType = this.dateValue.reduce((acc, cur) => {
        acc += cur
        return acc
      })
      this.date = dateInput.date
      this.dateType = dateType
    }
  },
  async created () {
    customizeViewByMode.bind(this)()

    try {
      const res = await this.$axios.get(`/api/timepoint/show/${this.$route.params.id}`)
      const { title, content, tag, supplement, show, nationality, inventor } = res.data.data.post
      this.title = title
      this.content = content
      this.citations = supplement
      if (tag !== '') {
        this.tagValue = JSON.parse(tag)
      }
      if (typeof show === 'object') {
        this.dateInitialize(show)
      } else {
        this.dateInitialize({
          type: [100],
          date: show
        })
      }
      Object.assign(this.ruleForm, {
        nationality,
        inventor
      })
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style scoped>
.container-edit{
  width: 90%;
  margin: 0 auto;
  min-width: 720px;
}
.submit{
  margin-top: 10px;
}
.el-input{
  margin: 10px 0;
}
.date{
  text-align: left;
}
.date-format{
  display: flex;
  align-items: center;
}
.date .el-date-editor{
  width: 150px !important;
}
.date .el-input{
  width: 80px;
  height: 40px;
  margin: 10px;
}
</style>
