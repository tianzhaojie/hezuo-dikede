<template>
  <div clas="app-main">
    <search @input="btn($event)" />
    <form-data ref="formdata" :lable="lable" :result-list="resultList" :params="params" @show="isshow">
      <template #vmStatus="{scope}">
        {{ scope.vmStatus | filter }}
      </template>
      <template #status>
        <span class="lixian">离线</span>  <span class="huodao">货道</span>  <span class="cdz">传动轴 </span>
      </template>
      <template #opea="{scope}">
        <span class="opea" style=" cursor: pointer;" @click="Detail(scope)">查看详情</span>
      </template>
    </form-data>
    <!-- 分页组件 -->
    <div class="page">
      <span>共{{ totalCount }}跳数据 &nbsp;&nbsp; 第{{ params.pageIndex }}/{{ totalPage }}页</span>
      <el-pagination
        background
        layout=" prev, pager, next, slot,total"
        prev-text="上一页"
        next-text="下一页"
        :current-page.sync="params.pageIndex"
        :disabled="params.pageIndex == totalPage"
        @current-change="currenPage"
      />
    </div>
    <!-- 查看详情弹框 -->
    <Detail :dialog-table-visible.sync="dialogTableVisible" :sales-list="salesList" :replenishment="replenishment" />
  </div>

</template>

<script>
import dayjs from 'dayjs'
import { getListAPI, getSalesAPI, getReplenishmentAPI } from '@/api/equipment'
import search from '@/components/input/index.vue'
import FormData from '@/components/tabel/index.vue'
import Detail from './components/Detail.vue'
export default {
  name: 'State',
  components: {
    search,
    FormData,
    Detail

  },
  filters: {
    filter(key) {
      switch (key) {
        case 0:
          key = '未投放'
          break
        case 1:
          key = '运营'
          break
        case 3:
          key = '撤机'
          break
      }
      return key
    }

  },
  data() {
    return {
      params: {
        // 当前页
        pageIndex: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      dialogVisible: false,
      lable: {
        'innerCode': '设备编号',
        'type.name': '设备型号',
        'node.addr': '详细地址',
        'vmStatus': '运营状态',
        'status': '设备状态'
      },
      loading: false,
      dialogChangeVisible: false,
      resultList: [],
      // 总数据数
      totalCount: '',
      // 总页数
      totalPage: '',
      // 售货机编号列表
      numberList: '',
      // 控制货道弹窗
      isShowAisle: false,
      // 控制取消策略弹窗
      isShowStrategy: false,
      // 当前点击的货道机器编号
      currentInnerCode: '',
      // 点击的策略详情
      strategyDetail: [],
      // 当前点击列的详情  用于修改
      ChangeList: {},
      // 点击查看详情
      dialogTableVisible: false,
      salesList: [],
      replenishment: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    btn(value) {
      this.params.innerCode = value

      this.getList()
    },
    isshow(val) {
      // 显示弹框
      if (val === 'construct') {
        this.dialogFormVisible = true
      } else if (val === 'operation') {
        this.dialogVisible = true
      }
    },
    // 获取列表
    async getList() {
      try {
        this.loading = true
        const { data } = await getListAPI(this.params)
        console.log(data)
        this.resultList = data.currentPageRecords
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
        this.resultList.forEach(item => {
          item.node.addr = item.node.addr.split('-')[3]
        })
        console.log(this.resultList)
      } catch (error) {
        console.log(2)
        this.$message(error)
      } finally {
        this.loading = false
      }
    },
    currenPage() {
      this.getList()
    },
    // 获取销量
    async getSales(innerCode) {
      const end = dayjs(+new Date()).format('YYYY-MM-DD')
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const { data } = await getSalesAPI(innerCode, start, end)
      this.salesList = data
    },
    // 获取补货次数
    async getReplenishment(innerCode) {
      const end = dayjs(+new Date()).format('YYYY-MM-DD')
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const { data } = await getReplenishmentAPI(innerCode, start, end)
      console.log(data)
      this.replenishment = data
    },
    async  Detail(scope) {
      await this.getSales(scope.innerCode)
      await this.getReplenishment(scope.innerCode)

      this.dialogTableVisible = true
    }
  }
}
</script>

<style lang="scss">
 .page{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px;
  font-size: 16px!important;
    color: #dbdfe5!important;
 }
 .el-pagination.is-background .btn-next,.el-pagination.is-background .btn-prev{
  width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    background-color: #d5ddf8;
 }
</style>
