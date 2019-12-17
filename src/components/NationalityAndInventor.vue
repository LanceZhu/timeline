<template>
  <div class="natinality-inventor-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" label-position="top" class="test">
      <el-form-item label="国籍" prop="nationality">
        <el-input placeholder="请输入国籍" v-model="ruleForm.nationality"></el-input>
      </el-form-item>
      <el-form-item label="发明人" prop="inventor">
        <el-input placeholder="请输入发明人" v-model="ruleForm.inventor"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'NationalityAndInventor',
  data () {
    return {
      ruleForm: {
        nationality: this.nationality,
        inventor: this.inventor
      },
      rules: {
        // nationality: [
        //   { required: true, message: '请输入国籍', trigger: 'blur' }
        // ]
      }
    }
  },
  props: [
    'nationality',
    'inventor'
  ],
  methods: {
    async getData () {
      try {
        await this.$refs.ruleForm.validate()
        return this.ruleForm
      } catch (err) {
        const errMsg = '请补充国籍和发明人！'
        this.$message.error(errMsg)
        return Promise.reject(new Error(errMsg))
      }
    }
  }
}
</script>

<style scoped>
.natinality-inventor-container{
  text-align: left;
}
/* 深度作用域 更改 element ui 组件样式 */
/deep/ .el-form--label-top .el-form-item__label{
  padding: 0;
  line-height: 30px;
}
</style>
