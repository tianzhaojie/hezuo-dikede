<template>
  <div clas="app-main">
    <search @input="btn($event)" />
    <div class="btn">
      <el-button type="primary" @click="construct">新建</el-button>

    </div>
    <form-data ref="formdata" :result-list="resultList" :params="params" :lable="lable">
      <template #image="{scope}">
        <img :src="scope.image" alt="" class="vm-type-image">
      </template>
      <template #opea="{scope}">
        <span class="opea" style=" cursor: pointer;"><span style="color:#5f84ff ; padding:5px" @click="change(scope)">修改</span><span style="color:#ff5a5a ; padding:5px">删除</span></span>
      </template>
    </form-data>
    <div class="page">
      <span>共{{ totalCount }}跳数据 &nbsp;&nbsp; 第{{ params.pageIndex }}/{{ totalPage }}页</span>
      <el-pagination
        background
        layout=" prev, pager, next, slot"
        prev-text="上一页"
        next-text="下一页"
        :current-page.sync="params.pageIndex"
        :total="+totalCount"
        @current-change="currenPage"
      />
    </div>
    <!-- 修改弹框 -->
    <ChangeType :is-show-change.sync="isShowChange" :change-list.sync="changeList" />
  </div>
</template>

<script>
import { getTypeAPI } from '@/api/equipment'
import search from '@/components/input/index.vue'
import FormData from '@/components/tabel/index.vue'
import ChangeType from './components/TypeChange.vue'
export default {
  name: 'Type',
  components: {
    search,
    FormData,
    ChangeType
  },
  data() {
    return {
      resultList: [],
      // 总数据数
      totalCount: '',
      // 总页数
      totalPage: '',
      // 售货机编号列表
      numberList: '',
      // 当前点击的货道机器编号
      currentInnerCode: '',
      // 点击的策略详情
      strategyDetail: [],
      // 展示修改弹窗
      isShowChange: false,
      params: {
        // 当前页
        pageIndex: 1,
        pageSize: 10
      },
      // 修改列表
      changeList: {},
      lable: {
        'name': '型号名称',
        'model': '型号编码',
        'image': '设备图片',
        'vmRow': '货道行',
        'vmCol': '货道列',
        'channelMaxCapacity': '设备容量'

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    btn(value) {
      this.params.name = value
      this.getList()
    },
    currenPage() {
      this.getList()
    },
    // 获取列表
    async getList() {
      try {
        this.loading = true
        const { data } = await getTypeAPI(this.params)
        this.resultList = data.currentPageRecords
        this.totalCount = data.totalCount
        console.log(this.totalCount)
        this.totalPage = data.totalPage
        console.log(this.totalPage)
      } catch (error) {
        this.$message(error)
      } finally {
        this.loading = false
      }
    },
    change(scope) {
      console.log(scope)
      this.changeList = scope
      this.isShowChange = true
    },
    construct() {
      this.isShowChange = true
      this.changeList = {
        channelMaxCapacity: undefined,
        image: '',
        model: '',
        name: '',
        vmCol: undefined,
        vmRow: undefined
      }
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

 }
</style>
