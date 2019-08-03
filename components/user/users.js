// import axios from 'axios'
export default {
  data () {
    return {
      usersData: [{
        username: '王小虎',
        email: 'dfffgf@163.com',
        mobile: '15366745598'
      }],
      total: 0,
      pagenum: 1,
      input3: '',
      // 是否显示添加用户对话框
      dialogAddUserVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        email: [{
          pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
          message: '格式不正确',
          trigger: 'blur'
        }],
        mobile: [{
          pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
          message: '格式不正确',
          trigger: 'blur'
        }]
      },
      value1: true,
      // 是否显示编辑用户对话框
      dialogEditFormVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      }
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    async getUsers (pagenum = 1, query = '') {
      let config = { params: { query, pagenum, pagesize: 2 } }
      let res = await this.$axios.get('users', config)
      // console.log(res)
      this.usersData = res.data.data.users
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
    },
    // 查询用户
    // getUsers (pagenum = 1, query = '') {
    //   this.$axios
    //     .get('users', {
    //       params: {
    //         query,
    //         pagenum,
    //         pagesize: 2
    //       }
    //       // headers: {
    //       //   Authorization: localStorage.getItem('token')
    //       // }
    //     })
    //     .then(res => {
    //       console.log(res)
    //       this.usersData = res.data.data.users
    //       this.total = res.data.data.total
    //       this.pagenum = res.data.data.pagenum
    //     })
    // },
    // 分页
    currentPageChange (curPage) {
      this.getUsers(curPage, this.input3)
    },
    // 搜索
    startSearch () {
      // console.log(this.input3)
      this.getUsers(1, this.input3)
    },
    // 显示添加用户对话框
    showAddUserDialog () {
      this.dialogAddUserVisible = true
    },
    // 点击添加用户
    async addUser () {
      let res = await this.$axios.post('users', this.addUserForm)
      if (res.data.meta.status === 201) {
        this.dialogAddUserVisible = false
        this.$message({
          message: '添加用户成功',
          type: 'success',
          duration: 800
        })
        this.getUsers()
      }
      // this.$axios
      //   .post('users', this.addUserForm, {
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      //     console.log(res)
      //     if (res.data.meta.status === 201) {
      //       this.dialogAddUserVisible = false
      //       this.$message({
      //         message: '添加用户成功',
      //         type: 'success',
      //         duration: 800
      //       })
      //       this.getUsers()
      //     }
      //   })
    },
    dialogClosed () {
      // console.log('关闭了')
      this.$refs.addUserRef.resetFields()
    },
    // 删除用户
    async delUser (id) {
      let res = await this.$axios.delete(`users/${id}`)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '删除用户成功',
          type: 'success',
          duration: 800
        })
        this.getUsers()
      }
      // console.log(id)
      // this.$axios
      //   .delete(`users/${id}`, {
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      //     // console.log(res)
      //     if (res.data.meta.status === 200) {
      //       this.$message({
      //         message: '删除用户成功',
      //         type: 'success',
      //         duration: 800
      //       })
      //       this.getUsers()
      //     }
      //   })
    },
    // 改变用户状态
    async changeState (row) {
      // 用解构赋值
      const { id, mg_state: mgState } = row
      let res = await this.$axios.put(`users/${id}/state/${mgState}`)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '修改用户状态成功',
          type: 'success',
          duration: 800
        })
      }
      // this.$axios
      //   .put(`users/${id}/state/${mgState}`, null, {
      //     //   headers: {
      //     //     Authorization: localStorage.getItem('token')
      //     //   }
      //   })
      //   .then(res => {
      //     if (res.data.meta.status === 200) {
      //       this.$message({
      //         message: '修改用户状态成功',
      //         type: 'success',
      //         duration: 800
      //       })
      //     }
      //   })
    },
    // 点击显示编辑框
    showEditDialog (row) {
      this.dialogEditFormVisible = true
      const { username, email, mobile, id } = row
      this.editForm.username = username
      this.editForm.email = email
      this.editForm.mobile = mobile
      this.editForm.id = id
    },
    async editUser () {
      const { id, email, mobile } = this.editForm
      let res = await this.$axios.put(`users/${id}`, {
        email,
        mobile
      })
      if (res.data.meta.status === 200) {
        this.dialogEditFormVisible = false
        this.$message({
          message: '编辑用户成功',
          type: 'success',
          duration: 800
        })
        this.getUsers(this.pagenum, this.input3)
      }
      // this.$axios
      //   .put(`users/${id}`, {
      //     email,
      //     mobile
      //   })
      //   .then(res => {
      //     // console.log(res)
      //     if (res.data.meta.status === 200) {
      //       this.dialogEditFormVisible = false
      //       this.$message({
      //         message: '编辑用户成功',
      //         type: 'success',
      //         duration: 800
      //       })
      //       this.getUsers(this.pagenum, this.input3)
      //     }
      //   })
    }
  }
}
