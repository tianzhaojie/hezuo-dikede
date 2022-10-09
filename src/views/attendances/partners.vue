<template>
  <div>
    <div class="level">
      <span style="padding: 10px;">合作商搜所:</span>
      <el-input v-model="input" placeholder="请输入内容" clearable style="width:206px; padding: 10px;" />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="list-container">
      <!-- 按钮 -->
      <div class="button">
        <el-button type="warning" icon="el-icon-circle-plus-outline" @click="centerDialogVisible = true">新建</el-button>
      </div>
      <!-- 内容 -->
      <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column property="name" label="合作商名称" width="200" />
        <el-table-column property="account" label="账号" width="200" />
        <el-table-column property="vmCount" label="设备数量" width="200" />
        <el-table-column property="ratio" label="分成比例" width="200" />
        <el-table-column property="contact" label="联系人" width="200" />
        <el-table-column property="mobile" label="联系电话" width="200" />
        <el-table-column label="操作">
          <template>
            <el-button type="text">重置密码</el-button>
            <el-button type="text">查看详情</el-button>
            <el-button type="text">修改</el-button>
            <el-button type="text" style="color:red;">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { PartnerSearch } from '@/api/attendances'
export default {
  data() {
    return {
      page: {
        pageIndex: 1, // 当前页码
        pageSize: 10
      },
      input: '', // 搜索内容
      tableData: [], // 数据
      currentRow: null, // 默认选中
      pageIndex: '', // 当前页码
      pageSize: '', // 每页数量
      totalCount: 0, // 总数量
      totalPage: '', // 总页数
      centerDialogVisible: false, // 新增弹出框
      centerDialogVisible1: false, // 修改弹出框
      centerDialogVisible2: false // 详情弹出框
    }
  },
  created() {
    this.PartnerSearch()
  },
  methods: {

    async PartnerSearch() {
      const { data } = await PartnerSearch(this.page)
      console.log(data)
      // console.log(data.currentPageRecords)
      this.tableData = data.currentPageRecords
      this.pageIndex = data.pageIndex
      this.pageSize = data.pageSize
      this.totalCount = +data.totalCount
      this.totalPage = data.totalPage
    }
  }

}
</script>

<style lang="scss" scoped>
.level {
  font-size: 14px;
  height: 64px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 64px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff
}

.list-container {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}
</style>
