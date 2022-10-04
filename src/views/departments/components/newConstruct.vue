<template>
  <div class="dialog">
    <el-dialog
      title="新增设备"
      :visible.sync="dialogFormVisible"
      width="630px"
      center
      @close="handleClose"
    >
      <el-form
        ref="ruleForm"
        :model="Form"
        :rules="rules"
      >
        <el-form-item label="设备编号" label-width="120px">
          系统自动生成
        </el-form-item>
        <el-form-item label="选择型号" label-width="120px" prop="vmType">
          <el-select v-model="Form.vmType" placeholder="请选择活动区域">
            <el-option v-for="item in typeList" :key="item.typeId" :label="item.name" :value="item.typeId" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择点位" label-width="120px" prop="nodeId">
          <el-select v-model="Form.nodeId" placeholder="请选择活动区域" width="90%">
            <el-option v-for="item in nodeList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTyopeAPI, getNodeAPI, getAddAPI } from '@/api/equipment'
export default {
  name: 'Dialog',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        vmType: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        nodeId: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      },
      dialogTableVisible: false,
      Form: {
        vmType: '',
        nodeId: '',
        createUserId: ''
      },
      typeList: [],
      nodeList: []
    }
  },
  created() {
    this.getType()
    this.getNode()
    this.Form.createUserId = this.$store.state.user.userId
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
      //   console.log(data)
    },
    async submitForm() {
      await this.$refs.ruleForm.validate()
      console.log(222)
      const { data } = await getAddAPI(this.Form)
      this.handleClose()
      console.log(data)
      // 重新渲染
      this.$parent.$refs.formdata.getList()
    },
    handleClose() {
      this.$emit('update:dialogFormVisible', false)
    }

  }
}

</script>

<style lang="scss" scoped>
 ::v-deep.dialog {
  .el-select {
  width: 80%;
 }
 p{
  font-size: 14px;
    color: #606266;
 }
 }

</style>
