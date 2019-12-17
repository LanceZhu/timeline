<template>
    <div class="container">
      <el-card>
        <div class="title">
          <div :class="`signin ${login ? 'active' : ''}`" @click="changeTitle">
            登陆
          </div>
          /
          <div :class="`signup ${!login ? 'active' : ''}`" @click="changeTitle">
            注册
          </div>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
        <el-form-item label="用户名*">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码*">
            <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button v-if="!login" type="primary" @click="signup('ruleForm')">注册</el-button>
            <el-button v-if="login" type="primary" @click="signin('ruleForm')">登录</el-button>
        </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>

export default {
  data () {
    return {
      login: true,
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
    changeTitle () {
      this.login = !this.login
    },
    async signup () {
      this.$axios.defaults.withCredentials = true
      try {
        const res = this.$axios.post('/api/user/register', {
          username: this.$data.ruleForm.username,
          password: this.$data.ruleForm.password,
          nickname: this.$data.ruleForm.username,
          captcha: '',
          mobile: ''
        })
        switch (res.data.code) {
          case 100: {
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
            this.$store.commit('signin')
            setTimeout(() => {
              this.$router.push('/timeline')
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
      } catch (err) {
        console.error(err)
      }
      try {
        // 消息通知 管理员删除词条
        const res = await this.$axios('/api/user/getDetail')
        const { msg = [], group = [] } = res.data.data.mongo
        this.$store.commit('updateMessages', msg)
        this.$store.commit('updateUserGroup', group)
      } catch (err) {
        console.error(err)
      }
    },
    async signin () {
      try {
        const res = await this.$axios.post('/api/user/login', {
          username: this.$data.ruleForm.username,
          password: this.$data.ruleForm.password
        })
        switch (res.data.code) {
          case 100: {
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
            this.$store.commit('signin')
            setTimeout(() => {
              if ('redirect' in this.$route.query) {
                this.$router.push(this.$route.query.redirect)
              } else {
                this.$router.push('/timeline')
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
            this.$message.error('登陆失败')
          }
        }
      } catch (err) {
        this.$message.error('登陆失败！')
      }

      try {
      // 消息通知 管理员删除词条
        const res = await this.$axios('/api/user/getDetail')
        const { msg = [], group = [] } = res.data.data.mongo
        this.$store.commit('updateMessages', msg)
        this.$store.commit('updateUserGroup', group)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    text-align: left;
    margin-top: 50px;
}
.title{
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.title .signup{
  display: inline;
}
.title .signin{
  display: inline;
}
.title .active{
  color: rgb(234,111,90);
  border-bottom: 1px solid rgb(234,111,90);
}
.el-card{
  width: 380px;
  height: 420px;
}
.el-input{
  width: 100%;
}
.el-button{
  margin-top: 30px;
  width: 100%;
}
</style>
