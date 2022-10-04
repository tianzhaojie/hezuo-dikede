<template>
  <div clas="app-main">
    <search @input="btn($event)" />
    <form-data ref="formdata" @show="isshow" />
    <!-- 弹出框 -->
    <new-construct :dialog-form-visible.sync="dialogFormVisible" />
    <!-- 批量操作弹出框 -->
    <policy :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import search from '@/components/input/index.vue'
import FormData from '@/components/form/index.vue'
import newConstruct from './components/newConstruct.vue'
import Policy from './components/policy.vue'
export default {
  name: 'Equipment',
  components: {
    search,
    FormData,
    newConstruct,
    Policy
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogVisible: false
    }
  },
  methods: {
    btn(value) {
      console.log(value)
      this.$refs.formdata.search(value)
    },
    isshow(val) {
      // 显示弹框
      if (val === 'construct') {
        this.dialogFormVisible = true
      } else if (val === 'operation') {
        this.dialogVisible = true
      }
    }

  }
}
</script>

<style>

</style>
