<template>

  <div class="dashboard-container">
    <el-row type="flex" justify="space-between">
      <el-col :span="18">
        <el-row type="flex" justify="space-around">
          <!-- 工单统计 -->
          <el-col :span="13" class="gdgl">
            <div class="title">
              <h4>工单统计</h4>
              <span>{{ startTime }}~{{ endTime }}</span>
            </div>
            <div class="bottom">
              <el-row type="flex" justify="space-between" align="center" style="height:107px" class="number">
                <el-col :span="6">
                  <h1>157</h1>
                  <p>工单总数（个）</p>
                </el-col>
                <el-col :span="6">
                  <h1>0</h1>
                  <p>完成工单（个）</p>
                </el-col>
                <el-col :span="6">
                  <h1>0</h1>
                  <p>进行工单（个）</p>
                </el-col>
                <el-col :span="6">
                  <h1>156</h1>
                  <p>取消工单（个）</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <!-- 销售统计 -->
          <el-col :span="10" class="sstj">
            <div class="title">
              <h4>销售统计</h4>
              <span>{{ startTime }}~{{ endTime }}</span>
            </div>
            <el-row type="flex" justify="space-around" style="padding-top:20px">
              <el-col :span="12" class="order">
                <p>13958</p>
                <span>订单量(个)</span>
              </el-col>
              <el-col :span="12" class="money">
                <p>9.02</p>
                <span>销售额(万元)</span></el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 销售数据 -->
        <el-row class="xssj" type="flex">
          <div class="top">
            <div class="title">
              <h4>销售数据</h4>
              <span>{{ startTime }}~{{ endTime }}</span>
            </div>
            <div class="date">
              <div v-for="(item,index) in list" :key="index" class="item" :class="{ischeck:item===show}" @click="btn(item)">
                {{ item }}
              </div>
            </div>
          </div>

          <div class="charts">
            <div id="LineChart" />
            <div id="Bar" />
          </div>

        </el-row>
      </el-col>
      <!-- 排行榜 -->
      <el-col :span="6" class="products">
        <div class="title">
          <h4>商品热榜</h4>
          <span>{{ startTime }}~{{ endTime }}</span>
        </div>
        <div class="rankData">
          <el-row v-for="item,index in proList" :key="index" style="flex:1 ;" type="flex" align="middle">
            <el-col :span="5">
              <div :class="{top1:index === 0,top2:index === 1,top3:index===2,topRank:index>=3}">
                {{ index+1 }}
              </div>

            </el-col> <el-col :span="13">{{ item.skuName }}</el-col> <el-col :span="6">{{ item.count }}单</el-col>
          </el-row>
        </div>

      </el-col>
    </el-row>
    <!-- 底部 -->
    <el-row type="flex" :gutter="20" class="footer">
      <el-col :span="14">
        <div class="hezuo">
          <div class="title">
            <h4>合作商点位数top5</h4>
          </div>
          <el-row type="flex" style="height:100%; align-items: center;">
            <el-col :span="17">
              <div id="pie" /></el-col>
            <el-col :span="7">
              <div class="collect">
                <div class="count">16</div>
                <div class="name">点位数</div>
                <div class="count">5</div>
                <div class="name">合作商数</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="shebei">
          <div class="title">
            <h4>异常设备监控</h4>
          </div>
          <div class="empty">
            <img src="@/assets/common/empty.png" alt="">
            <p>暂无数据</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import dayjs from 'dayjs'
import charts from '@/echarts/index'
import { mapGetters } from 'vuex'
import { getProductRank, getSales, getDistribution, getPartners } from '@/api/home'
export default {
  name: 'Dashboard',
  data() {
    return {
      list: ['周', '月', '年'],
      startTime: '',
      endTime: '',
      show: '周',
      proList: [],
      // 统计时间类型
      collectType: 1,
      //  销售额数据
      salesOption: [],
      salesDate: [], // 日期/星期
      // 销售额fen布
      distributionList: [],
      distributionDate: [], // 分布地区
      // 饼图
      pieList: []
    }
  },

  computed: {
    ...mapGetters([
      'name'
    ])
  },
  async created() {
    this.startTime = dayjs().subtract(6, 'day').format('YYYY-MM-DD')
    this.endTime = dayjs(+new Date()).format('YYYY-MM-DD')
    const { data } = await getProductRank(this.startTime, this.endTime)
    this.proList = data
    // 获取销售额趋势图
    const res = await getSales(this.collectType, this.startTime, this.endTime)
    this.salesOption = res.data.series
    this.salesOption = this.salesOption.map(item => {
      return item / 100
    })
    this.salesDate = res.data.xAxis
    this.salesDate = this.salesDate.map(item => {
      return this.getWeek(dayjs(item).day())
    })
    // 获取销售额发布
    const res1 = await getDistribution(this.startTime, this.endTime)
    console.log(res1)
    this.distributionDate = res1.data.xAxis
    this.distributionList = res1.data.series.map(item => {
      return item / 100
    })
    // 获取合作商点位
    const res2 = await getPartners()
    console.log(res2)
    this.pieList = res2.data
  },
  mounted() {
    // 获取图标表  计时器为了等待请求
    setTimeout(() => {
      this.getEcharts()
      this.getEchartsBar()
      this.getPieChart()
    }, 1000)
  },

  methods: {
    getWeek(key) {
      switch (key) {
        case 0:
          key = '星期日'
          break
        case 1:
          key = '星期一'
          break
        case 2:
          key = '星期二'
          break
        case 3:
          key = '星期三'
          break
        case 4:
          key = '星期四'
          break
        case 5:
          key = '星期五'
          break
        case 6:
          key = '星期六'
          break
      }
      return key
    },
    // 分布图
    getEchartsBar() {
      var chartDom = document.getElementById('Bar')
      var myChart = charts.init(chartDom)
      var option

      option = {
        xAxis: {
          type: 'category',
          data: this.distributionDate
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.distributionList,
            barWidth: 30, // 柱图宽度
            barMaxWidth: 30, // 最大宽度
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ],
        grid: {
          x: 70
        }
      }

      option && myChart.setOption(option)
    },
    // 趋势图
    getEcharts() {
      var chartDom = document.getElementById('LineChart')
      if (chartDom) {
        var myChart = charts.init(chartDom)
        var option

        option = {
          xAxis: {
            type: 'category',
            data: this.salesDate,
            boundaryGap: false
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: this.salesOption,
              type: 'line',
              smooth: true,
              lineStyle: {
                color: 'rgba(255, 87, 87)'
              },
              itemStyle: {
                color: 'rgba(255, 255, 255)'
              }
            }
          ],
          grid: {
            x: 70
          }
        }

        option && myChart.setOption(option)
      }
    },
    getDate(item) {
      if (item === '周') {
        this.startTime = dayjs().subtract(6, 'day').format('YYYY-MM-DD')
        this.endTime = dayjs(+new Date()).format('YYYY-MM-DD')
        this.collectType = 1
        console.log(this.endTime)
      } else if (item === '月') {
        this.startTime = dayjs(dayjs().startOf('month')).format('YYYY-MM-DD')
        this.endTime = dayjs(+new Date()).format('YYYY-MM-DD')
        this.collectType = 1
      } else if (item === '年') {
        this.startTime = dayjs(dayjs().startOf('year')).format('YYYY-MM-DD')
        console.log(this.startTime)
        this.endTime = dayjs(+new Date()).format('YYYY-MM-DD')
        this.collectType = 2
      }
    },
    // 获取饼图
    getPieChart() {
      console.log(this.pieList)
      var chartDom = document.getElementById('pie')
      var myChart = charts.init(chartDom)
      var option

      option = {
        toolbox: {
          show: true,
          feature: {
            mark: { show: true }

          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [40, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            data: this.pieList,
            label: {
              show: true,
              formatter: '{b}: {c}({d}%)' // 自定义显示格式(b:name, c:value, d:百分比)
            },
            labelLine: { // 指示线样式设置
              normal: {
                length: 5, // 设置指示线的长度
                lineStyle: {
                  color: 'red' // 设置标示线的颜色
                }
              }
            },

            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      option && myChart.setOption(option)
    },
    async btn(item) {
      this.show = item
      this.getDate(item)
      const { data } = await getProductRank(this.startTime, this.endTime)
      console.log(data)
      this.proList = data
      // 获取销售额趋势图
      const res = await getSales(this.collectType, this.startTime, this.endTime)
      this.salesOption = res.data.series
      this.salesOption = this.salesOption.map(item => {
        return item / 100
      })
      this.salesDate = res.data.xAxis
      if (item === '周') {
        this.salesDate = this.salesDate.map(item => {
          return this.getWeek(dayjs(item).day())
        })
      }
      // 获取销售额发布
      const res1 = await getDistribution(this.startTime, this.endTime)
      console.log(res1)
      this.distributionDate = res1.data.xAxis
      this.distributionList = res1.data.series.map(item => {
        return item / 100
      })
      // 获取合作商点位
      this.getEcharts() // 渲染echarts
      this.getEchartsBar()// 渲染echarts
    }
  }
}
</script>

<style lang="scss" scoped>
  li{
    list-style:none
  }
  *{
    padding: 0;
    margin: 0;
  }
  .empty{
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 123px;
    height: 96px;
    }
}

.dashboard {
  &-container {
   // margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.gdgl{
  background: url('~@/assets/common/circle.png') no-repeat,
              url('~@/assets/common/task.png') right bottom no-repeat;
  border-radius: 20px;
  padding: 20px;
  height: 166px;
  background-color: #e9f3ff;

  .bottom{
     .number{
      .el-col-6{
      padding: 0 20px;
      }
      padding-top: 25px;
      h1{
        font-size: 35px;
      color: #072074;
    }
    p{
      color: #91a7dc;
      font-size: 12px;
      margin-top:10px;
    }
     }
    }
}
.sstj {
  background: url('~@/assets/common/pinkpig.png') right bottom no-repeat;
  border-radius: 20px;
  padding: 20px;
  height: 166px;
  background-color: #fbefe8;
  .title{
    display: flex;
    align-items: center;
    span{
      font-weight: 400;
    color: #999;
      font-size: 12px;
      margin-left: 10px;
    }

  }
  .order{
    padding: 0 50px;
    p{
      font-size: 36px;
      color: #ff5757;
      text-shadow: 2px 4px 7px rgb(255 99 85 / 50%)
    }
    span{
      color: #de9690;
      font-size: 12px;
      margin-top: 10px;
    }
  }
  .money{
    padding: 0 50px;
    p{
      font-weight: 600;
      text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
      font-size: 36px;
      color: #ff5757;
    }
    span{
      font-weight: 600;
      color: #de9690;
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
.products {

 padding: 20px;
background-color: #ffffff;
  height: 538px;
}
.xssj{
  padding: 20px;
  flex-direction: column;
  margin-top: 20px;
  min-height: 352px;
  background-color: gold;
  margin-right:10px;
  .top {
    display: flex;
    justify-content: space-between;
    .date{
      .item{
        text-align: center;
        line-height: 25px;
        color: #9ca3b4;
        font-weight: 600;
        cursor: pointer; //展示小手
        background: rgba(233,243,255,.37);
        width: 37px;
        height: 25px;
        font-size: 14px;
      }
      .ischeck{
        color: #333;
        border-radius: 7px;
        background-color: #fff;
      }
    }
  }
  .title{
    height: 34px;
    display: flex;
   align-items: center;
  }
 .charts{
  flex: 1;
  display: flex;
  #Bar {
    flex: 1;
  }
  #LineChart{

    flex:1
  }
 }
}
.title{
    display: flex;
    align-items: center;
    span{
      font-weight: 400;
    color: #999;
      font-size: 12px;
      margin-left: 10px;
    }

  }
.footer{
  margin-top: 20px;
  height: 353px;
 .hezuo {
  padding: 20px;
  background-color: #ccc;
  height: 100%;
  .collect{
    width: 154px;
    height: 230px;
    padding-top: 47px;
    padding-left: 38px;
    background: linear-gradient(135deg,transparent,#f8f8f9 0) 0 0,linear-gradient(-135deg,transparent 12px,#f8f8f9 0) 100% 0,linear-gradient(-45deg,transparent,#f8f8f9 0) 100% 100%,linear-gradient(45deg,transparent 12px,#f8f8f9 0) 0 100%;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    .count{
      height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #072074;
    line-height: 33px;
    }
    .name{
    height: 17px;
    margin-top: 6px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #000412;
    line-height: 17px;
  }
  }

 }
 .shebei {
  padding: 20px;
  background-color: yellow;
  height: 100%;
 }
  }
.date{
  display: flex;
  .item{

  }
}
.top1{
 width: 21px;
 height: 20px;
 color:#8e5900;
 text-align: center;
 line-height: 20px;
 font-size: 12px;
 background: url('~@/assets/common/第一.png');
}
.top2{
width: 21px;
height: 20px;
color:#8e5900;
text-align: center;
line-height: 20px;
font-size: 12px;
background: url('~@/assets/common/2.png');
}
.top3{
  width: 21px;
height: 20px;
color:#8e5900;
text-align: center;
line-height: 20px;
font-size: 12px;
background: url('~@/assets/common/3.png');
}
.topRank{
  width: 21px;
height: 20px;
color:#8e5900;
text-align: center;
line-height: 20px;
font-size: 12px;
background: url('~@/assets/common/rank.png');
}
.rankData{
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
#pie {
    height: 284px;
  width: 100%;
}
</style>
