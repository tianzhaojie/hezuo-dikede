<template>
  <div class="Change">

    <el-dialog
      title="提示"
      :visible="dialogChangeVisible"
      width="630px"
      style="border-radius:50px"
      center
      @close="handleClose"
    >

      <el-form v-if="changeList.type" :model="form">
        <el-form-item label="机器编号:" label-width="120px">
          {{ changeList.innerCode }}
        </el-form-item>
        <el-form-item label="供货时间:" label-width="120px">
          {{ changeList.createTime | day }}
        </el-form-item>
        <el-form-item label="设备类型:" label-width="120px">
          {{ changeList.type.name }}
        </el-form-item>
        <el-form-item label="设备容量:" label-width="120px">
          {{ changeList.type.channelMaxCapacity }}
        </el-form-item>
        <el-form-item label="设备点位:" label-width="120px">
          <el-select v-model="form.id" placeholder="请选择点位">
            <el-option v-for="item,index in nodeList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="合作商:" label-width="120px">
          {{ changeList.ownerName }}
        </el-form-item>
        <el-form-item label="所属区域:" label-width="120px">
          {{ changeList.region.name }}
        </el-form-item>
        <el-form-item label="设备地址:" label-width="120px">
          {{ changeList.node.addr }}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getNodeAPI, ChangeNameAPI } from '@/api/equipment'
export default {
  name: 'Change',
  props: {
    dialogChangeVisible: {
      type: Boolean,
      default: false
    },
    changeList: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      nodeList: [],
      form: {
        id: ''
      }
    }
  },
  created() {
    this.getNode()
  },
  methods: {
    // 获取点位
    async getNode() {
      const { data } = await getNodeAPI()
      this.nodeList = data.currentPageRecords
      //   console.log(data)
    },
    handleClose() {
      this.$emit('update:dialogChangeVisible', false)
    },
    async  submit() {
      if (this.changeList.vmStatus === '运营') {
        this.$message.warning('设备在运营状态')
      } else {
        await ChangeNameAPI(this.changeList.id, this.form.id)
        this.$parent.getList()

        this.handleClose()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.Change{
   .el-form-item{
    label{
      font-weight: 400;
    }
   }
  }
</style>
