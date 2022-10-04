<template>
  <el-dialog
    title="收货地址"
    :visible.sync="dialogVisible"
    center
    width="630px"
    @close="handleClose"
  >
    <el-form :model="form">
      <el-form-item label="选择策略" label-width="120px">
        <el-select v-model="form.policyId" placeholder="请选择">
          <el-option
            v-for="item in policyList"
            :key="item.policyId
            "
            :label="item.policyName"
            :value="item.policyId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
import { getPolicyList, getApplicationAPI } from '@/api/equipment'
export default {
  name: 'Policy',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      policyList: [],
      form: {
        policyId: ''
      }
    }
  },
  async created() {
    const { data } = await getPolicyList()
    console.log(data)
    this.policyList = data
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    async submit() {
      try {
        await getApplicationAPI(this.$parent.$refs.formdata.numberList, this.form.policyId)
        this.handleClose()
        // 重新渲染
        this.$parent.$refs.formdata.getList()
        this.$parent.$refs.formdata.getStrategy()
      } catch (error) {
      //  console.log(error.response.data)
        this.$messgae.error(error.response.data)
      }
    }
  }

}
</script>

<style lang="scss">

  .el-select {
  width: 80%;
 }

</style>
