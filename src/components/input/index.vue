<template>
  <div>
    <div class="search">
      <el-form :model="form" :inline="true">
        <el-form-item label="设备编号:">
          <el-input v-model="form.order" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      form: {
        order: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('input', this.form.order)
      console.log(this.$parent.$refs.formdata)
    }
  }
}
</script>

<style lang="scss">

    .search {

  .el-form{
    height: 100%;
    display: flex;
    align-items: center;
     height: 100%;
    display: flex;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
 }

</style>
<style lang="scss" scoped>
.search{
  background-color: #fff;
  height: 64px;
 margin-bottom: 20px;
}
</style>
