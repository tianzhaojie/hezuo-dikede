<template>
  <div class="order" :loading="loading">
    <div class="form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单编号">
          <el-input v-model="formInline.orderNo" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="选择日期">
          <div class="block">
            <!-- <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          /> -->
            <el-date-picker
              v-model="formInline.value"
              unlink-panels
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tabel">
      <el-table
        style="width: 100%"
        :data="list"
      >
        <el-table-column
          label="序号"
          width="80"
          type="index"
        />
        <el-table-column
          label="订单编号"
          prop="orderNo"
          class-name="orderNo"
        />
        <el-table-column
          label="商品名称"
          prop="skuName"
        />
        <el-table-column
          label="订单金额（元）"
          prop="amount"
        />
        <el-table-column
          label="设备编号"
          prop="innerCode"
        />
        <el-table-column
          label="订单状态"
          prop="status"
        />
        <el-table-column
          label="订单日期"
          width="160"
          prop="createTime"
        />
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="detail(scope.row)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <div class="page">
          <span>共{{ totalCount }}条记录</span>
          <span>第{{ formInline.pageIndex }}/{{ totalPage }}页</span>
        </div>
        <div class="btn">
          <el-button type="info" :disabled="formInline.pageIndex===1 || !list.length" :class="{changePage: formInline.pageIndex===1 || !list.length }" @click="upbtn">上一页</el-button>
          <el-button type="info" :disabled="formInline.pageIndex===totalPage || !list.length" :class="{changePage: formInline.pageIndex===totalPage || !list.length }" @click="nextbtn">下一页</el-button>
        </div>
      </div>
    </div>
    <isDialog :dialog-visible.sync="dialogVisible" :row="listitem" />
  </div>
</template>

<script>
// background   添加背景
// current-page 当前的页面
// page-size    每一页展示的条数
// page-sizes   每页显示个数选择器的选项设置
// total        总共多少条数据
// layout       布局
// current-change 改变当前页码的触发（current-page 值改变的时候触发）
// size-change 改变页面的数据条数的时候 触发（page-size 值改变
// current-page 当前页
import isDialog from './isDialog/index.vue'
import dayjs from 'dayjs'
import { getPageAPI } from '@/api/order'
export default {
  components: {
    isDialog
  },
  data() {
    return {
      formInline: {
        orderNo: undefined,
        value: [],
        pageIndex: 1,
        pageSize: 10

      },
      totalCount: 0,
      totalPage: 0,
      list: [],
      loading: false,
      status: {
        0: '未支付',
        1: '支付完成',
        2: '出货成功',
        3: '出货失败'
      },
      dialogVisible: false,
      listitem: {}
    }
  },
  async created() {
    await this.getlist()
  },
  methods: {
    onSubmit() {
      // console.log('submit!')
      const { value } = this.formInline
      console.log(value)
      if (value?.length) {
        this.formInline.startDate = dayjs(value[0]).format('YYYY-MM-DD')
        this.formInline.endDate = dayjs(value[1]).format('YYYY-MM-DD')
        this.getlist()
      } else {
        this.formInline.startDate = undefined
        this.formInline.endDate = undefined
      }
      this.getlist()
    },
    // 接口函数
    async getlist() {
      // eslint-disable-next-line no-unused-vars
      const { value, ...rset } = this.formInline
      const { data } = await getPageAPI(rset)
      this.list = data.currentPageRecords
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
      this.list.forEach(item => {
        item.createTime = dayjs(item.createTime).format('YYYY.MM.DD HH:mm:ss')
        item.updateTime = dayjs(item.updateTime).format('YYYY.MM.DD HH:mm:ss')
        item.amount = (item.amount / 100).toFixed(2)
        item.status = this.status[item.status]
        console.log(item.price)
        if (item.payType === '1') {
          item.payType = '支付宝'
        } else if (item.payType === '2') {
          item.payType = '微信'
        }
      })
    },
    // 点击进行页数更改和数据更新
    async upbtn() {
      if (this.formInline.pageIndex !== 1) {
        this.loading = true
        let num = this.formInline.pageIndex
        num--
        this.formInline.pageIndex = num
        await this.getlist()
        this.loading = false
      }
    },
    async nextbtn() {
      if (this.formInline.pageIndex !== this.totalPage) {
        let num = this.formInline.pageIndex
        num++
        this.formInline.pageIndex = num
        this.loading = true
        await this.getlist()
        this.loading = false
      }
    },
    detail(val) {
      this.dialogVisible = true
      this.listitem = val
      console.log(val)
    }
  }
}
</script>

<style  lang="scss">
.order{
  margin-left: 140px;
  padding: 20px;
  height: 100vh;
  background-color: #f8fafd;
  .form{
    margin-bottom: 20px;
    height: 64px;
// line-height: 64px;
    display: flex;
    align-items: center;
    background-color: #fff;
    // margin-bottom: 20px;
    padding-left: 20px;
    .el-form-item{
      margin-bottom: 0;
    }
  }
  .orderNo .cell{
    // width: 200px;
    overflow:hidden;  //超出部分隐藏
    text-overflow:ellipsis;  //超出部分显示...
    white-space:nowrap;  //文本强制一行显示
    word-break: nowrap;
  }
  .footer{
    display: flex;
    width: 100%;
    height: 96px;
    padding: 0 36px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .page{
      color: #dbdfe5!important;
      span{
        display: inline-block;
        margin-right: 20px;
      }
    }
    .el-button--info {
    color: #000;
     background-color: #f4f4f5;
     border: transparent;
    }
    .changePage{
      background: #edf0f9;
      color: #d8dde3;
    }
  }
}
</style>
