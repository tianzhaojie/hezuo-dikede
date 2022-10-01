<template>
  <div class="app-contain">
    <el-card>

      <div class="search">
        <el-button class="newBtn" size="small" icon="el-icon-plus" @click="dirlogVisible = true">新增角色</el-button>

      </div>
      <el-table
        v-loading="loading"
        :data="userList"
        border
        style="width: 100%"
      >
        <el-table-column label="序号" width="120" prop="id" />
        <el-table-column label="人员名称" width="240" prop="userName" />
        <el-table-column label="归属地区" prop="regionName" />
        <el-table-column label="角色" prop="userName" />
        <el-table-column label="联系电话" prop="mobile" />
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <span style="color:blue;margin-right:10px" @click="edit(scope.row.id)">修改</span>
            <span style="color:red" @click="delRole(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="currentPage"
          layout=" prev, next,slot"
          prev-text="上一页"
          next-text="下一页"
          :total="total"
        />
        <div class="page">
          <div class="page-total">
            <span>共{{ total }}条记录</span>
            <span>第{{ page.pageIndex }}/{{ totalPage }}页</span>
          </div>
        <!-- <div class="btn">
          <button>上一页</button> <button>下一页</button>
        </div> -->
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserSearchApi } from '@/api/user'
import { mapState } from 'vuex'

export default {
  name: 'UserTable',
  data() {
    return {
      userList: [],
      loading: false,
      page: {
        // 放置页码及相关数据
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      currentPage: 1,
      totalPage: 0
    }
  },
  computed: {
    ...mapState(['userinfo'])

  },
  created() {
    this.getUserList()
  },
  methods: {
    async  getUserList() {
      const { data } = await getUserSearchApi(this.page)
      console.log(data)
      this.userList = data.currentPageRecords
      this.total = data.totalCount
      this.totalPage = data.totalPage
      this.page.pageIndex = data.pageIndex
    }
    // handleSizeChange() {},
    // handleCurrentChange() {}
  }
}
</script>

<style lang="scss">
.page {
  display: flex;
  justify-content: space-between;
  .page-total {
    span {
      color: #dbdfe5!important;
      font-size: 16px;
      margin-right: 10px;
      font-weight: normal;
    }
  }
}
.search {
margin-bottom: 15px ;
  .newBtn {
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    color: #fff;
  }
}
.block {
  display: flex;
}
</style>
