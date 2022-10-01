<template>
  <div class="box">
    <el-card class="user-search">
      人员搜索：<el-input v-model="value" placeholder="请输入" class="search" />
      <el-button class="btn">查询</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      dirlogVisible: false
    }
  }
}
</script>

<style lang="scss">
.box {
margin-bottom: 10px;
.user-search {
  display: flex;
  margin-bottom: 10px;
  height: 64px;
  align-items: center;

  .search {
    width: 206px;
    height: 36px;
    // padding: 0px 36px 0 15px;
  }
  .btn {
    background-color: #5f84ff;
    color: #fff;
  }
}
}
</style>
