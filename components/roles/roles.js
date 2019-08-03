export default {
  data () {
    return {
      rolesData: [{
        roleName: '主管',
        roleDesc: '技术负责人'
      }],
      dialogAssignRightsVisible: false,
      rightsData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
          ]
        }]
      },
      {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 6,
          label: '二级 2-2'
        }
        ]
      },
      {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        },
        {
          id: 8,
          label: '二级 3-2'
        }
        ]
      }
      ],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: 0
    }
  },
  created () {
    this.showRolesData()
    this.showRightsData()
  },
  methods: {
    async showRolesData () {
      let res = await this.$axios.get('roles')
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.rolesData = res.data.data
      }
    },
    async showRightsData () {
      let res = await this.$axios.get('rights/tree')
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.rightsData = res.data.data
      }
    },
    // 展示权限对话框
    showRightsDialog (row) {
      this.roleId = row.id
      this.dialogAssignRightsVisible = true
      // console.log(row)
      // 根据传过来的row获取第三层的id
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 分配权限
    async assignRights () {
      let keys1 = this.$refs.tree.getCheckedKeys()
      let keys2 = this.$refs.tree.getHalfCheckedKeys()
      let keys = [...keys1, ...keys2]
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      if (res.data.meta.status === 200) {
        this.$message({
          message: '权限更新成功',
          type: 'success',
          duration: 800
        })
        this.showRolesData()
        this.showRightsData()
        this.dialogAssignRightsVisible = false
      }
    }
  }
}
