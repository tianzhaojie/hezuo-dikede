<template>

  <div class="dashboard-container">
    <el-row type="flex" justify="space-around">
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
        <el-row>
          <el-col :span="24" class="data" />
        </el-row>
      </el-col>
      <!-- 排行榜 -->
      <el-col :span="6" class="products"><div class="grid-content bg-purple-light" /></el-col>
    </el-row>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
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
  border-radius: 20px;
  padding: 20px;
  height: 166px;
  background-color: #e9f3ff;
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
  height: 530px;
}
</style>
