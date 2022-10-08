<template>
  <div>
    <el-dialog title="设备详情" :visible="dialogTableVisible" @close="closed">
      <div class="channel-basic">
        <span>销售量:&nbsp;&nbsp;{{ 0 }}</span>
        <span>销售额:&nbsp;&nbsp;{{ 1.43 }}</span>
        <span>补货次数:&nbsp;&nbsp;{{ replenishment }}</span>
        <span>维修次数:&nbsp;&nbsp;{{ 0 }}</span>
      </div>
      <div>
        <p>商品销量(月)</p>
        <el-row>
          <el-col v-for="item in salesList" :key="item.skuName" :span="6">
            {{ item.skuName }}:{{ item.count }}
          </el-col>
          <el-col v-if="salesList.length === 0" style="text-align:center">当前设备未销售商品</el-col>
        </el-row></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      required: true,
      default: false
    },
    salesList: {
      type: [Object, Array],
      default: () => { [] }
    },
    replenishment: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    closed() {
      this.$emit('update:dialogTableVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
    ::v-deep.channel-basic{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    background: #f3f6fb;
    padding: 0 20px 0 30px;
    height: 56px;
      span {
        margin-right: 100px;
      }
    }
    .el-col-6{
      border: 1px solid #ccc;
      padding: 0 10px;
    line-height: 40px;
    border-right: 1px solid #d8dde3;
    border-bottom: 1px solid #d8dde3;
    }
</style>
