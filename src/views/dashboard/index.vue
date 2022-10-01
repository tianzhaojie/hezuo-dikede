<template>

  <div class="dashboard-container">
    <el-row type="flex" justify="space-between">
      <el-col :span="18">
        <el-row type="flex" justify="space-around">
          <!-- 工单统计 -->
          <el-col :span="13" class="gdgl">
            <div class="title">
              <h4>工单统计</h4>
              <span>2022.9.01~2022.9.29</span>
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
              <span>2022.9.01~2022.9.29</span>
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
          <div class="title">
            <h4>工单统计</h4>
            <span>2022.9.01~2022.9.29</span>
          </div>
          <div class="charts">
            <div id="LineChart" />
            <div id="Bar" />
          </div>

        </el-row>
      </el-col>
      <!-- 排行榜 -->
      <el-col :span="6" class="products"><div class="grid-content bg-purple-light" /></el-col>
    </el-row>
    <el-row type="flex" :gutter="20" class="footer">
      <el-col :span="12">
        <div class="hezuo">
          <div class="title">
            <h4>合作商点位数top5</h4>

          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="shebei">
          <div class="title">
            <h4>异常设备监控</h4>

          </div>
        </div>

      </el-col>
    </el-row>
  </div>

</template>

<script>
import charts from '@/echarts/index'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.getEcharts()
    this.getEchartsBar()
  },
  methods: {
    getEchartsBar() {
      var chartDom = document.getElementById('Bar')
      var myChart = charts.init(chartDom)
      var option

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [5565, 2953, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }

      option && myChart.setOption(option)
    },
    getEcharts() {
      var chartDom = document.getElementById('LineChart')
      if (chartDom) {
        var myChart = charts.init(chartDom)
        var option

        option = {
          xAxis: {
            type: 'category',
            data: ['星期一', '星期二', '星球上', '星期四', '星期五', '星期六'],
            boundaryGap: false
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [5565, 2953, 4597, 2134, 5430, 0],
              type: 'line',
              smooth: true,
              lineStyle: {
                color: 'rgba(255, 87, 87)'
              },
              itemStyle: {
                color: 'rgba(255, 255, 255)'
              }
            }
          ]
        }

        option && myChart.setOption(option)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  *{
    padding: 0;
    margin: 0;
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

  background: green;
  height: 538px;
}
.xssj{
  padding: 20px;
  flex-direction: column;
  margin-top: 20px;
  min-height: 352px;
  background-color: gold;
  margin-right:10px;
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
 }
 .shebei {
  padding: 20px;
  background-color: yellow;
  height: 100%;
 }
  }
</style>
