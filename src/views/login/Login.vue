<template>
  <div class="login-container">
    <div class="login-wrap">
      <div class="login-head"></div>
      <el-form
        class="login-form"
        ref="login-form"
        :model="user"
        :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">
            我已阅读并同意用户协议和隐私条款
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            :loading="loginLoading"
            @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      checked: false,
      loginLoading: false,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'blur' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请同意用户协议'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 先表单验证，格式是否合格
      this.$refs['login-form'].validate(value => {
        if (!value) {
          return
        }
        this.login()
      })
    },
    login () {
      this.loginLoading = true
      login(this.user).then(res => {
        console.log(res)
        this.loginLoading = false
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push('/')
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('登录失败。账号或验证码错误')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login-container{
    position: fixed;
    left: 0;
    top: 0;
    right:0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("./imgs/login_bg.jpg") no-repeat;
    background-size: cover;
    .login-wrap{
      background-color: #fff;
      padding: 20px 0;
      .login-head{
        background: url("./imgs/logo_index.png") no-repeat;
        width: 257px;
        height: 57px;
        margin: 20px auto;
      }
      .login-form{
        background-color: #fff;
        padding: 0 50px;
        min-width: 300px;
        .login-btn{
          width: 100%;
        }
      }
    }
  }

</style>
