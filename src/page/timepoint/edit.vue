<template>
  <div class="container-edit">
    <FuzzyTimePicker ref="FuzzyTimePicker" :defaultValue="timepoint.dateValue" :defaultDate="timepoint.date" :defaultType="timepoint.dateType"></FuzzyTimePicker>
    <Editor ref="Editor" :defaultTitle="timepoint.title" :defaultContent="timepoint.content"></Editor>
    <NationalityAndInventor v-if="this.$view.showNationalityAndInventor" ref="NationalityAndInventor" :nationality="timepoint.nationality" :inventor="timepoint.inventor"></NationalityAndInventor>
    <Tags ref="Tags" :defaultTagsChoosed="timepoint.tagsChoosed" editable></Tags>
    <Citation ref="Citation" :defaultCitations="timepoint.citations" editable></Citation>
    <div class="submit">
      <el-button type="primary" @click="beforeSubmitForm.visible = true">提交</el-button>
      <el-dialog
        title="修改原因"
        :visible.sync="beforeSubmitForm.visible"
        width="70%">
        <el-form
          :model="beforeSubmitForm"
          :rules="beforeSubmitFormRules"
          label-position="top"
          ref="beforeSubmitForm"
          style="text-align: left">
          <el-form-item label="变更类型（可多选）" prop="checkedOptions">
            <div>
              <el-checkbox-group v-model="beforeSubmitForm.checkedOptions" size="mini">
                <el-checkbox v-for="option in beforeSubmitForm.options" :label="option" :key="option" border style="margin-left: 0; margin-top: 5px"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item label="补充信息" prop="reason">
            <el-input
              type="textarea"
              v-model="beforeSubmitForm.reason"
              :autosize="{ minRows: 3, maxRows: 6 }"
              maxlength="500"
              show-word-limit
              placeholder="请简要描述变更内容，以便于管理员审核。">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="beforeSubmitForm.visible = false">取 消</el-button>
          <el-button type="primary" @click="beforeSubmit('beforeSubmitForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div></div>
</template>

<script>
import updateTimeline from '@/utils/updateTimeline'

const NationalityAndInventor = () => import('@/components/NationalityAndInventor')
const FuzzyTimePicker = () => import('@/components/FuzzyTimePicker')
const Citation = () => import('@/components/Citation')
const Tags = () => import('@/components/Tags')
const Editor = () => import('@/components/Editor')

export default {
  data () {
    return {
      // 仅用于初始化
      timepoint: {
        dateValue: [100], // 时间点显示值
        dateType: 100,
        date: '',
        title: '',
        content: '',
        tagsChoosed: [],
        citations: []
      },
      beforeSubmitForm: {
        visible: false,
        reason: '',
        checkedOptions: [],
        options: ['丰富内容', '更正错误', '时间信息', '标题', '正文', '标签', '参考文献', '其他']
      },
      beforeSubmitFormRules: {
        checkedOptions: [
          { type: 'array', required: true, message: '请至少选择一个变更类型', trigger: 'change' }
        ]
      }
    }
  },
  components: {
    NationalityAndInventor,
    FuzzyTimePicker,
    Citation,
    Tags,
    Editor
  },
  async created () {
    await this.init()
  },
  methods: {
    async beforeSubmit (formName) {
      const resBoolean = await this.$refs[formName].validate()
      if (!resBoolean) {
        return false
      }
      this.beforeSubmitForm.visible = false
      await this.submit()
    },
    async afterSubmit () {
      this.$router.push(`/timeline/${res.data.new_post_id}`)
      await updateTimeline()
    },
    async submit () {
      // 时间点选择字段
      const { year, month, day, show } = this.$refs.FuzzyTimePicker.getData()

      let nationalityAndCreator = {}
      if (this.$view.showNationalityAndInventor) {
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

      let reason = this.beforeSubmitForm.checkedOptions.join(';')
      if (this.beforeSubmitForm.reason !== '') {
        reason += `;${this.beforeSubmitForm.reason}`
      }

      // post 请求参数
      const params = {
        title,
        content,
        year,
        month,
        day,
        show,
        tag,
        supplement: citations,
        reason
      }

      Object.assign(params, nationalityAndCreator)

      const res = await this.$axios.post(`/api/timepoint/edit/${this.$route.params.id}`, params)
      switch (res.data.code) {
        case 100: {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          setTimeout(async () => {
            await this.afterSubmit()
          })
          break
        }
        default: {
          this.$message.error('编辑失败')
        }
      }
    },
    dateInitialize (dateInput) {
      this.timepoint.dateValue = dateInput.type
      const dateType = this.timepoint.dateValue.reduce((acc, cur) => {
        acc += cur
        return acc
      })
      this.timepoint.date = dateInput.date
      this.timepoint.dateType = dateType
    },
    // 已有数据初始化
    async init () {
      const res = await this.$axios.get(`/api/timepoint/show/${this.$route.params.id}`)
      const { title, content, tag = [], supplement, show, nationality, inventor } = res.data.data.post
      Object.assign(this.timepoint, {
        title,
        content,
        citations: supplement
      })
      try {
        this.timepoint.tagsChoosed = tag
      } catch (err) {
        console.error(err)
      }
      if (typeof show === 'object') {
        this.dateInitialize(show)
      } else {
        this.dateInitialize({
          type: [100],
          date: show
        })
      }
      Object.assign(this.timepoint, {
        nationality,
        inventor
      })
    }
  }
}
</script>

<style scoped>
.container-edit{
  width: 90%;
  margin: 0 auto;
  min-width: 720px;
  padding: 10px 0 20px;
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
.submit{
  margin: 10px 0 20px;
}
</style>
