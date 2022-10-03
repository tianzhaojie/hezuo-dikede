<template>
  <div class="dialog">
    <el-dialog title="新增设备" :visible.sync="dialogFormVisible" width="630px" center>
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item label="设备编号" label-width="120px">
          系统自动生成
        </el-form-item>
        <el-form-item label="选择型号" label-width="120px" prop="type">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option v-for="item in typeList" :key="item.typeId" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择点位" label-width="120px" prop="node">
          <el-select v-model="form.node" placeholder="请选择活动区域" width="90%">
            <el-option v-for="item in nodeList" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formName')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTyopeAPI, getNodeAPI } from '@/api/equipment'
export default {
  data() {
    return {
      rules: {
        type: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        node: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      dialogTableVisible: false,
      dialogFormVisible: true,
      form: {
        type: '',
        node: ''
      },
      typeList: [],
      nodeList: []
    }
  },
  created() {
    this.getType()
    this.getNode()
  },
  methods: {
    // 获取型号
    async  getType() {
      const { data } = await getTyopeAPI()
      this.typeList = data.currentPageRecords
    },
    // 获取点位
    async getNode() {
      const { data } = await getNodeAPI()
      this.nodeList = data.currentPageRecords
      console.log(data)
    },
    submitForm(formName) {
      this.dialogFormVisible = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" >
 .dialog {
  .el-select {
  width: 80%;
 }
 p{
  font-size: 14px;
    color: #606266;
 }
 }

</style>
