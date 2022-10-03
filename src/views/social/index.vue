<template>
  <div class="order">
    <el-row type="flex" justify="space-between" style="height: 204px" class="chart">
      <el-col :span="12" class="orders">
        <span class="title">日销售统计</span>
        <div class="zy">
          <div class="zy-item">
            <div>{{ dailysales_L }}</div>
            <div>当日销售量(个)</div>
          </div>
          <div class="zy-item">
            <div>{{ dailysales_E }}</div>
            <div>当日销售额(元)</div>
          </div>
          <div class="zy-item">
            <div>{{ dailysales_B }}</div>
            <div>当日分成(元)</div>
          </div>
        </div>
        <div />
      </el-col>
      <el-col :span="12" class="sales">
        <span class="title">月销售统计</span>
        <div class="zy">
          <div class="zy-item">
            <div>{{ monthsales_L }}</div>
            <div>当月销售量(个)</div>
          </div>
          <div class="zy-item">
            <div>{{ monthsales_E }}</div>
            <div>当月销售额(元)</div>
          </div>
          <div class="zy-item">
            <div>{{ dailysales_B }}</div>
            <div>当月分成(元)</div>
          </div>
        </div>
        <div />
      </el-col>
    </el-row>

    <div class="bill">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="合作商" type="daterange">
            <el-select v-model="formInline.partnerName" clearable placeholder="请选择">
              <el-option v-for="item in shoplist" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
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
                :clearable="false"
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
      <div class="show">
        <span class="txt">笔数统计： <span>{{ monthsales_L }} </span>个</span>
        <span class="txt">收入统计：<span>{{ monthsales_E }} </span>元</span>
        <span class="txt">分成统计：<span>{{ monthsales_B }} </span>元</span>
      </div>
    </div>
    <div class="tabel">
      <el-table
        style="width: 100%"
        :data="partnersList"
      >
        <el-table-column
          label="订单日期"
          prop="date"
          class-name="orderNo"
        />
        <el-table-column
          label="合作商"
          prop="ownerName"
        />
        <el-table-column
          label="分成比例"
          prop="amount"
        >
          <template slot-scope="scope">
            {{ scope.row.ratio + '%' }}
          </template>
        </el-table-column>
        <el-table-column
          label="收入（元）"
          prop="status"
        >
          <template slot-scope="scope">
            {{ '+' + scope.row.orderTotalMoney }}
          </template>
        </el-table-column>
        <el-table-column
          label="笔数"
          width="160"
          prop="orderCount"
        />
        <el-table-column
          label="分成金额（元）"
          width="160"
          prop="createTime"
        >
          <template slot-scope="scope">
            {{ '+' + (scope.row.totalBill/100).toFixed(2) }}
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="footer"> -->
      <!-- <div class="page">
          <span>共{{ totalCount }}条记录</span>
          <span>第{{ formInline.pageIndex }}/{{ totalPage }}页</span>
        </div> -->
      <!-- <div class="btn">
          <el-button type="info" :disabled="formInline.pageIndex===1 || !list.length" :class="{changePage: formInline.pageIndex===1 || !list.length }" @click="upbtn">上一页</el-button>
          <el-button type="info" :disabled="formInline.pageIndex===totalPage || !list.length" :class="{changePage: formInline.pageIndex===totalPage || !list.length }" @click="nextbtn">下一页</el-button>
        </div> -->
    </div>
    <!-- </div> -->
    <!-- <isDialog :dialog-visible.sync="dialogVisible" :row="listitem" /> -->
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
// import isDialog from './isDialog/index.vue'
import dayjs from 'dayjs'
import { getPageAPI, getPartnersAPI, getCountAPI, getAmountAPI, getBillAPI } from '@/api/check'
export default {
  components: {
    // isDialog
  },
  data() {
    return {
      formInline: {
        value: [dayjs().startOf('month').format('YYYY-MM-DD'), dayjs(+new Date()).format('YYYY-MM-DD')],
        pageIndex: 1,
        pageSize: 10,
        partnerName: undefined

      },
      totalCount: 0,
      totalPage: 0,
      shoplist: {},
      partnersList: [],
      // 当天开始时间
      start_time: dayjs().format('YYYY-MM-DD 00:00:00'),
      end_time: dayjs().format('YYYY-MM-DD 23:59:59'),
      // 本月第一天
      start_Month_time: dayjs().startOf('month').format('YYYY-MM-DD 00:00:00'),
      // 销售量
      // 当日销售量
      dailysales_L: 0,
      // 当月销售量
      monthsales_L: 0,
      // 当月销售额
      monthsales_E: 0,
      // 当日销售额
      dailysales_E: 0,
      // 当日分成
      dailysales_B: 0,
      // 当月分成
      monthsales_B: 0
    }
  },
  async created() {
    // 调用获取合作商数据的接口函数
    // await this.getPartnersList()
    // 初始化页面的时候显示本月第一天和现在的时间
    console.log(this.start_time, this.end_time)
    await this.getgetPartners()
    this.formInline.start = this.formInline.value[0]
    this.formInline.end = this.formInline.value[1]
    this.formInline.value = undefined
    await this.getPartnersList()
    this.formInline.value = [dayjs().startOf('month').format('YYYY-MM-DD'), dayjs(+new Date()).format('YYYY-MM-DD')]
    await this.count()
    // this.formInline.endDate = dayjs().format('YYYY-MM-DD')
  },
  methods: {
    async onSubmit() {
      const { value } = this.formInline
      this.formInline.startDate = dayjs(value[0]).format('YYYY-MM-DD')
      this.formInline.endDate = dayjs(value[1]).format('YYYY-MM-DD')
      this.formInline.value = undefined
      // console.log(this.formInline)
      await this.getPartnersList()
      this.formInline.value = [this.formInline.start, this.formInline.end]
    },
    // 接口函数
    async getgetPartners() {
      const { data: shopName } = await getPartnersAPI(this.formInline.pageIndex, this.formInline.pageSize)
      this.shoplist = shopName.currentPageRecords
    },
    async getPartnersList() {
      // 获取合作商的数据
      const { data: res } = await getPageAPI(this.formInline)
      this.partnersList = res.currentPageRecords

      // eslint-disable-next-line no-unused-vars
      // const { value, ...rset } = this.formInline
      // console.log(shopName)
      // const { data } = await getPageAPI(rset)
      // this.list = data.currentPageRecords
      // this.totalCount = data.totalCount
      // this.totalPage = data.totalPage
    },
    async count() {
      // 当日销售量
      const res = await getCountAPI(this.start_time, this.end_time)
      this.dailysales_L = res.data
      // 当日销售额
      const res_1 = await getAmountAPI(this.start_time, this.end_time)
      this.dailysales_E = res_1.data
      // 当日分成
      const res_2 = await getBillAPI(this.start_time, this.end_time)
      this.dailysales_B = res_2.data

      // 当月销售量
      const data = await getCountAPI(this.start_Month_time, this.end_time)
      this.monthsales_L = data.data
      // 当月销售额
      const data_1 = await getAmountAPI(this.start_Month_time, this.end_time)
      this.monthsales_E = ((data_1.data * 1) / 100).toFixed(2)
      // 当月分成
      const data_2 = await getBillAPI(this.start_Month_time, this.end_time)
      this.monthsales_B = ((data_2.data * 1) / 100).toFixed(2)
    }
    // 点击进行页数更改和数据更新
    // async upbtn() {
    //   if (this.formInline.pageIndex !== 1) {
    //     this.loading = true
    //     let num = this.formInline.pageIndex
    //     num--
    //     this.formInline.pageIndex = num
    //     await this.getlist()
    //     this.loading = false
    //   }
    // },
    // async nextbtn() {
    //   if (this.formInline.pageIndex !== this.totalPage) {
    //     let num = this.formInline.pageIndex
    //     num++
    //     this.formInline.pageIndex = num
    //     this.loading = true
    //     await this.getlist()
    //     this.loading = false
    //   }
    // },
    // detail(val) {
    //   this.dialogVisible = true
    //   this.listitem = val
    //   console.log(val)
    // }
  }
}
</script>

<style  lang="scss">
.order{
  margin-left: 140px;
  padding: 20px;
  height: 100vh;
  background-color: #f8fafd;

   .chart{
  .orders{
    background: url('~@/assets/common/task.png') no-repeat ;
    background-position: right bottom;
    background-color: #e9f3ff;
    padding: 20px;
    border-radius: 10px;
    margin-right: 20px;
    .title{
      display: inline-block;
      font-weight: 700;
      margin-right: 10px;
    }
    .time{
      font-size: 12px;
      color: #999;
    }
    .zy{
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      .zy-item{
        div{
          font-size: 12px;
          color: #94ade0;
          font-family: PingFangSC-Semibold,PingFang SC;
          text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
        }
        div:nth-child(1){
          font-weight: 700;
          font-size: 36px;
          margin:20px 0 ;
          color: #072075;
        }
      }
    }
  }
  .sales{
    background: url('~@/assets/common/pinkpig.png') no-repeat ;
    background-position: right bottom;
    background-color: #fbefe8;
    padding: 20px;
    border-radius: 10px;
    margin-right: 20px;

    .title{
      display: inline-block;
      font-weight: 700;
      margin-right: 10px;
    }
    .time{
      font-size: 12px;
      color: #999;
    }
    .zy{
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: space-around;
      .zy-item{
        div{
          font-size: 12px;
          color: #de9690;
          text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
        }
        div:nth-child(1){
          font-weight: 700;
          font-size: 36px;
          margin:20px 0 ;
          color: #ff5757;
        }
      }
    }
  }
  }
 .bill{
      background-color: #fff;
  .form{
    margin-bottom: 20px;
    height: 64px;
// line-height: 64px;
    display: flex;
    align-items: center;
    // margin-bottom: 20px;
    padding-left: 20px;
    .el-form-item{
      margin-bottom: 0;
    }
  }
  .show{
    .txt{
      margin-right: 50px;
      font-size: 14px;
    span{
      margin-right: 10px;
      font-size: 18px;
      color: red;

    }
    }
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
