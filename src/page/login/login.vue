<template>
    <div class="container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="signup('ruleForm')">注册</el-button>
            <el-button @click="signin('ruleForm')">登录</el-button>
            <el-button @click="logout('ruleForm')">登出</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        }
    },
    methods: {
        signup(formName){},
        signin(formName){},
        logout(formName){
            this.$store.commit('signup', null)
            this.$message.success('登出成功')
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