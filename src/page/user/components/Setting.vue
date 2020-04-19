<template>
  <div class="setting-content">
    <div class="phone">
      <el-dialog
      title="绑定手机"
      :visible.sync="mobileModel"
      >
        <el-form :model="form">
          <el-form-item>
            <el-input v-model="form.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <div style="display: flex">
              <el-input v-model="form.captcha" placeholder="验证码"></el-input>
              <el-button @click=getCaptcha :disabled="showCaptchaCounter">{{showCaptchaCounter ? `${captchaCounter} s` : '获取'}}</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button @click="bindPhone" type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div class="binded" v-if="mobileBinded">
        <span>已绑定手机：18888888888</span>
        <el-button plain size="mini" style="margin-left: 10px" @click="mobileModel = true">更改手机号</el-button>
      </div>
      <div class="unbinded" v-if="!mobileBinded">
        <span>暂未绑定手机</span>
        <el-button plain size="mini" style="margin-left: 10px" @click="mobileModel = true">立即绑定</el-button>
      </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script lang="ts">
/**
 * 用户-账户设置页
 */

import Vue from 'vue'

type Data = {
  mobileModel: boolean, // 手机绑定对话框
  captchaCounter: number, // 验证码发送倒计时
  showCaptchaCounter: boolean, // 显示 倒计时 / 发送
  form: {
    mobile: number | null,
    captcha: number | null
  }
}

export default Vue.extend({
  data (): Data {
    return {
      mobileModel: false,
      captchaCounter: 60,
      showCaptchaCounter: false,
      form: {
        mobile: null,
        captcha: null
      }
    }
  },
  computed: {
    mobileBinded (): boolean {
      const mobile = this.$store.state.userDetail.mysql?.mobile
      if (mobile !== null && mobile !== undefined) {
        return true
      }
      return false
    }
  },
  methods: {
    getCaptcha (): void {
      this.captchaCounter = 60
      this.showCaptchaCounter = true
      const timer = setInterval(() => {
        this.captchaCounter--
        if (this.captchaCounter <= 0) {
          clearInterval(timer)
          this.showCaptchaCounter = false
        }
      }, 1000)
    },
    bindPhone (): void {
      console.log(this.form)
    }
  }
})
</script>

<style scoped>
.setting-content{
  width: 90%;
  margin: 10px auto;
  text-align: left;
}
</style>
