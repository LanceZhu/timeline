<template>
  <div class="container">
    <div style="padding: 10px; font-size: 20px">欢迎反馈，我们将认真对待您的建议和反馈，尽快处理。</div>
    <el-divider></el-divider>
    <el-form :model="feedbackForm" :rules="feedbackFormRules" label-position="top">
      <el-form-item label="反馈类型" prop="checkedOptions">
        <el-checkbox-group v-model="feedbackForm.checkedOptions" size="mini">
          <el-checkbox v-for="option in options" :label="option" :key="option" border></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="联系方式（可选填）">
        <el-input v-model="feedbackForm.contact" placeholder="微信/手机号"></el-input>
      </el-form-item>
      <el-form-item label="添加图片（可选填）">
        <el-upload
          multiple
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          name="img">
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
         ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交反馈</el-button>
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
      options: ['页面白屏', '页面卡顿', '页面样式错乱', '时间轴时间排序混乱', '词条内容错误', '功能不可用', '其他'],
      feedbackFormRules: {
        checkedOptions: [
          { type: 'array', required: true, message: '请至少选择一项', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submit () {
      console.log(this.feedbackForm)
    }
  }
}
</script>

<style scoped>
.container {
  text-align: left;
  width: 60%;
  margin: 0 auto;
  padding: 20px;
}
</style>
