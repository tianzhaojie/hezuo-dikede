<template>
  <div>
    <!-- <el-dialog v-if="strategyDetail === ''" title="批量策略管理" :visible.sync="isShowStrategy" width="630px" center @open="open" @close="handleClose">
      <el-form
        ref="ruleForm"
        :model="Form"
      >
        <el-form-item label="选择策略" label-width="120px">
          <el-select v-model="Form.policyId" placeholder="请选择活动区域" width="90%">
            <el-option
              v-for="item in strategyList"
              :key="item.policyId
              "
              :label="item.policyName"
              :value="item.policyId
              "
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="select">确 定</el-button>
      </div>
    </el-dialog> -->
    <el-dialog v-if="strategyDetail" title="策略管理" :visible.sync="isShowStrategy" width="630px" center @close="handleClose">
      <el-row>
        <el-col :span="12">
          机器编号:&nbsp;&nbsp;{{ strategyDetail.innerCode }}
        </el-col>
        <el-col :span="12">
          策略名称:&nbsp;&nbsp;{{ strategyDetail.policyName }}
        </el-col>
        <el-col :span="12">
          策略方案:&nbsp;&nbsp;{{ strategyDetail.discount }}%
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delStrategy">取 消 策 略</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { delStrategyAPI } from '@/api/equipment'
export default {
  props: {
    currentInnerCode: {
      type: String,
      default: ''
    },
    isShowStrategy: {
      type: Boolean,
      default: false
    },
    strategyDetail: {
      type: [Array, Object],
      default: null
    }
  },
  data() {
    return {
      // 策略列表
      strategyList: [],
      // 当前点击策略详情
      Form: {
        policyId: ''
      }
    }
  },
  // created() {
  //   this.getsStrategyList()
  // },
  methods: {
  // 查询售货机策略
    // async  getStrategy() {
    //   const { data } = await getStrategyAPI(this.currentInnerCode)
    //   console.log(data)
    //   this.strategyDetail = data
    // },
    // open() {
    //   this.getStrategy()
    // },
    // 获取策略详情
    detail(val) {
      console.log(333)
      this.strategyDetail = val
    },
    handleClose() {
      this.$emit('update:isShowStrategy', false)
    },
    // // 获取策略列表
    // async getsStrategyList() {
    //   const { data } = await getPolicyList()
    //   console.log(data)
    //   this.strategyList = data
    // },
    // 取消策略
    async delStrategy() {
      console.log(this.strategyDetail)
      await delStrategyAPI(this.currentInnerCode, this.strategyDetail.policyId)
      this.$emit('update:strategyDetail', [])
      this.handleClose()
    },
    // 选择策略
    select() {

    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-dialog {
  border-radius: 10px;
  .el-dialog__body{
  padding: 20px  0 0 100px;
    color: #666;
    .el-col-12{
      padding: 10px 0 10px 10px;
    }
  }
 }
</style>
