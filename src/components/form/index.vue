<template>

  <div class="result">
    <div class="btn">
      <el-button v-if="$route.path !=='/departments/state'" type="primary" @click="construct">新建</el-button>
      <el-button v-if="$route.path ==='/departments/departments'" type="warning" @click="operation">批量操作</el-button>
    </div>
    <div class="bottom">
      <el-table
        :header-cell-style="{background:'#e1e4e5',color:'#80878f'}"
        :cell-style="{borderBottom:'0px'}"
        :data="resultList"
        style="width: 100%"
        @selection-change="changeList"
      >
        <el-table-column type="selection" />
        <el-table-column
          width="80px"
          type="index"
          :index="indexAdd"
          label="序号"
          class="order"
        />
        <el-table-column
          prop="innerCode"
          label="设备编号"
          width="210px"
        />
        <el-table-column
          prop="type.name"
          label="设备型号"
          width="220px"
        />
        <el-table-column
          prop="node.addr"
          label="详细地址"
          width="232px"
        />
        <el-table-column
          prop="ownerName"
          label="合作商"
          width="200px"
        />
        <el-table-column
          label="设备状态"
          width="230px"
        >
          <template slot-scope="scope">
            {{ scope.row.vmStatus }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="190px"
        >
          <template slot-scope="scope">
            <span class="caozuo" @click="ShowAisle(scope.row.innerCode)">货道</span>
            <span class="caozuo" @click="showStrategy(scope.row.innerCode)">策略</span>
            <span class="caozuo">修改</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="page">
        <span>共{{ totalCount }}跳数据 &nbsp;&nbsp; 第{{ params.pageIndex }}/{{ totalPage }}页</span>
        <el-pagination
          background
          layout=" prev, pager, next, slot"
          prev-text="上一页"
          next-text="下一页"
          :current-page.sync="params.pageIndex"
          @current-change="currenPage"
        />

      </div>
    </div>
    <!-- 货道弹窗 -->
    <aisle :is-show-aisle.sync="isShowAisle" :current-inner-code="currentInnerCode" />
    <!-- 取消策略弹窗 -->
    <strategy ref="strategy" :is-show-strategy.sync="isShowStrategy" :current-inner-code="currentInnerCode" :strategy-detail.sync="strategyDetail" />
  </div>

</template>

<script>
import Aisle from '@/views/departments/components/aisle.vue'
import { getListAPI, getStrategyAPI } from '@/api/equipment'
import Strategy from '@/views/departments/components/strategy.vue'
export default {
  name: 'FormData',
  components: {
    Aisle,
    Strategy
  },

  data() {
    return {
      params: {
        // 当前页
        pageIndex: 1,
        pageSize: 10
      },
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
      strategyDetail: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
  // 查询当前点击售货机策略
    async  getStrategy() {
      const { data } = await getStrategyAPI(this.currentInnerCode)
      console.log(data)
      this.strategyDetail = data
    },
    indexAdd(index) {
      return index + 1 + (this.params.pageIndex - 1) * this.params.pageSize
    },
    async getList() {
      try {
        const { data } = await getListAPI(this.params)
        console.log(data)
        this.resultList = data.currentPageRecords
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
        this.resultList.forEach(item => {
          item.node.addr = item.node.addr.split('-')[3]
        })

        this.resultList.forEach(item => {
          item.vmStatus = this.filter(item.vmStatus)
        })
        console.log(this.resultList)
      } catch (error) {
        console.log(2)
        this.$message(error)
      }
    },
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
    },
    currenPage(page) {
      console.log(page)
      this.getList()
    },
    search(val) {
      this.params.innerCode = val

      this.getList()
    },
    construct() {
      this.$emit('show', 'construct')
    },
    changeList(selection) {
      console.log(selection)
      this.numberList = selection.map(item => {
        return item.innerCode
      })
      console.log(this.numberList)
    },
    operation() {
      if (this.numberList) {
        console.log(1)
        this.$emit('show', 'operation')
      } else {
        this.$message.warning('请勾选售货机')
      }
    },
    ShowAisle(innerCode) {
      this.currentInnerCode = innerCode
      this.isShowAisle = true
    },
    showStrategy(innerCode) {
      this.currentInnerCode = innerCode
      // this.isShowStrategy = true
      this.getStrategy()
      // 防止数据没有更新
      this.$nextTick(() => {
        if (this.strategyDetail.length === 0) {
          console.log('批量')
          this.numberList = [innerCode]
          this.$emit('show', 'operation')
        } else {
          console.log('详情')
          this.$refs.strategy.detail(this.strategyDetail)
          this.isShowStrategy = true
        }
      })
    }
  }
}
</script>

<style lang="scss" >
  .result{
    padding: 20px 15px 19px 17px;
  }
 .btn{
  margin-bottom: 20px;
  .el-button--primary{
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
  }
  .el-button--warning{
      align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
  }

 }
 .caozuo{
  padding: 3px;
  color: #5f84ff;
  cursor: pointer;
 }
 .order {
  background-color: #f3f6fb !important;
 }
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
<style lang="scss" scoped>
  .bottom {
    background-color: #fff;
  }
</style>
