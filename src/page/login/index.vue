<template>
    <div class="container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="signup('ruleForm')">注册</el-button>
            <el-button @click="signin('ruleForm')">登录</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
// import resCode from '@/utils/res-code'

export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    signup () {
      const that = this
      this.$axios.defaults.withCredentials = true
      this.$axios.post('/api/register', {
        username: this.$data.ruleForm.username,
        password: this.$data.ruleForm.password,
        nickname: this.$data.ruleForm.username
      }).then(res => {
        switch (res.data.code) {
          case 100: {
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
            that.$store.commit('signin')
            setTimeout(() => {
              that.$router.push('/index')
            }, 1500)
            break
          }
          case 101: {
            this.$message.error('密码错误')
            break
          }
          case 102: {
            this.$message.error('用户名不存在')
            break
          }
          default: {
            this.$message.error('注册失败')
          }
        }
      })
    },
    signin () {
      const that = this
      this.$axios.post('/api/login', {
        username: this.$data.ruleForm.username,
        password: this.$data.ruleForm.password
      }).then(res => {
        switch (res.data.code) {
          case 100: {
            that.$message({
              message: '登陆成功',
              type: 'success'
            })
            that.$store.commit('signin')
            setTimeout(() => {
              if ('redirect' in that.$route.query) {
                that.$router.push(that.$route.query.redirect)
              } else {
                that.$router.push('/index')
              }
            }, 1500)
            break
          }
          case 101: {
            this.$message.error('密码错误')
            break
          }
          case 102: {
            this.$message.error('用户名不存在')
            break
          }
          default: {
            this.$message.error('登陆')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.container{
    display: flex;
    justify-content: center;
}
.ruleForm{
    min-width: 500px;
    width: 40%;
}
</style>
