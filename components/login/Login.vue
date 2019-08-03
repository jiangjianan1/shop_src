<template>
  <el-row
    type='flex'
    justify='center'
    align='middle'
  >
    <el-col :span='8'>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-loginForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            @click="startLogin"
          >登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    startLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          return false
        } else {
          // console.log('登录成功')
          axios.post('http://localhost:8888/api/private/v1/login', this.loginForm).then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              // 把token保存到本地
              localStorage.setItem('token', res.data.data.token)
              this.$message({
                message: '登录成功',
                type: 'success',
                duration: 800
              })
              this.$router.push('/home')
            } else {
              this.$message({
                message: '登录失败',
                type: 'error',
                duration: 800
              })
            }
          })
        }
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 100%;
  background-color: #2d434c;
}
.el-form {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 20px;
}
</style>
