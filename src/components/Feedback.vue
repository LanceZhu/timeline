<template>
  <div class="container">
    <div style="padding: 10px; font-size: 20px">欢迎反馈，我们将认真对待您的建议和反馈，尽快处理。</div>
    <el-divider></el-divider>
    <el-form :model="feedbackForm" :rules="feedbackFormRules" label-position="top" ref="feedbackForm">
      <el-form-item label="反馈类型" prop="checkedOptions">
        <el-checkbox-group v-model="feedbackForm.checkedOptions" size="mini">
          <el-checkbox v-for="option in options" :label="option" :key="option" border></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="联系方式（可选填）">
        <el-input v-model="feedbackForm.contact" placeholder="微信/手机号/其他"></el-input>
      </el-form-item>
      <el-form-item label="添加图片（可选填）">
        <el-upload
          multiple
          action="/api/supplement/upload"
          list-type="picture-card"
          name="img"
          :on-success="imgUploadSuccess"
          :on-error="imgUploadError"
          :on-remove="imgRemove"
          :on-preview="imgPreview"
          :before-upload="beforeImgUpload"
          :limit="9">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="其他信息（可选填）">
        <el-input
          v-model="feedbackForm.otherInfo"
          type="textarea"
          maxlength="200"
          show-word-limit
          rows="3"
          placeholder="请提供超过 10 字以上的建议，以便我们更好的理解。"
         ></el-input>
         <el-dialog :visible.sync="dialogVisible">
           <img width="100%" :src="dialogImageUrl" alt="">
         </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('feedbackForm')">提交反馈</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      feedbackForm: {
        checkedOptions: [],
        contact: '',
        otherInfo: '',
        imgList: []
      },
      options: ['白屏', '卡顿', '样式错乱', '时间轴时间排序混乱', '词条内容错误', '功能不可用', '其他'],
      feedbackFormRules: {
        checkedOptions: [
          { type: 'array', required: true, message: '请至少选择一项', trigger: 'change' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    async submit (formName) {
      const resBoolean = await this.$refs[formName].validate()
      if (!resBoolean) {
        console.error('error submit')
        return false
      }
      const { checkedOptions, contact, otherInfo, imgList } = this.feedbackForm
      const params = {
        types: checkedOptions,
        contact: contact,
        pics: imgList,
        content: otherInfo
      }
      const res = await this.$axios.post('/api/user/feedback', params)
      if (res.data.code !== 100) {
        this.$message.error('反馈失败！')
      } else {
        this.$message({
          type: 'success',
          message: '感谢反馈！即将返回首页...'
        })
        const timeId = setTimeout(() => {
          this.$router.push('/timeline')
          clearTimeout(timeId)
        }, 1500)
      }
    },
    imgUploadSuccess (response, file, fileList) {
      const imgUrl = response.allowList[0].filepath || ''
      if (imgUrl === '') {
        this.$message.error('上传图片失败，请重新选择！')
        return
      }
      this.feedbackForm.imgList.push(imgUrl)
    },
    imgUploadError (err, file, fileList) {
      console.error(err, file, fileList)
    },
    beforeImgUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 jpg 或 png 格式！')
      }
      return isJPG || isPNG
    },
    imgRemove (file, fileList) {
      const delImgUrl = file.response.allowList[0].filepath
      for (let index = this.feedbackForm.imgList.length; index >= 0; index--) {
        this.feedbackForm.imgList.splice(index, 1)
      }
    },
    imgPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.container {
  text-align: left;
  margin: 0 auto;
  padding: 20px;
}
@media (min-width: 720px) {
  .container {
    width: 60%;
  }
}
</style>
