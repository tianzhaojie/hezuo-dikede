<template>
  <div class="dialog">
    <el-dialog
      title="订单详情"
      :visible="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="centent">
        <div class="status">
          <img :src="row.status === '未支付' ? weipay1 : pay1" alt="">
          <span>支付完成</span>
          <img :src="row.status === '未支付' ? weipay2 : pay2" alt="">
        </div>
      </div>
      <div class="info">
        <div class="item">
          <p>订单编号：</p>
          <p>
            <span>{{ row.orderNo }}</span>
          </p>
        </div>
        <div class="item">
          <p>商品名称：</p>
          <p>
            <span>{{ row.skuName }}</span>
          </p>
        </div>
        <div class="item">
          <p>订单金额：</p>
          <p>
            <span>{{ row.amount }}</span>
          </p>
        </div>
        <div class="item">
          <p>设备编号：</p>
          <p>
            <span>{{ row.innerCode }}</span>
          </p>
        </div>
        <div class="item">
          <p>完成时间：</p>
          <p>
            <span>{{ row.updateTime }}</span>
          </p>
        </div>
        <div class="item">
          <p>创建时间：</p>
          <p>
            <span>{{ row.createTime }}</span>
          </p>
        </div>
        <div class="item">
          <p>设备地址：</p>
          <p>
            <span>{{ row.addr }}</span>
          </p>
        </div>
        <div class="item">
          <p>支付方式：</p>
          <p>
            <span>{{ row.payType }}</span>
          </p>
        </div>

      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    row: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 支付完成左侧图片
      pay1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAADT0lEQVRIS62WX0hTcRTHv+d3V7MkKsVAbHdSLwWhkVEvBZVRL72UvURhRFQ09SpBqZPklrU5oayZkyD68xaYUFH0h5wP9dQfqCAqonST6ikjs2jr7p64103mNndndd8u58/n/M7vnN85BIvPPRwoY12rArAWwBIABXGTEQBvADwkYevzOFwvs7miqYRNobMVBPIBqLQKJi7vZ3Bju7P+WSb9NJDKqi0yXNAJwAWGyBEyrkbQwdRtl78cUknVkm0ngZpC3vmE/GsANkwLkK4cZPzY3u5s/poQTYDMk4QL7v0HSMJ30C6PbE6cbALUHPZ3gVH7jydJMacur7NOGc8qAPPiiR5P+06soiLozLzKKBAT1BzyP5hGdVm5HyPwXiapEKwHAPR7ncpGivfJCyvrXOREeCex2NrmrH3lDvk7GDhspk3Yyqk55D8GoDUXRxYNefunHts1r/TbaDRc2MPg/Un6xw1QEMD6vwYRdAKdnOn4on56ViwVLoheAfOOFH8DBugTgOK/AjFGdcHVPrn+hjp4KS8ixnoB3pLB12cD9AuAPSFkIEJADMDs7Kmi18ImbT1R4np75I1vjpQ36yYI66awiaSBSMJuTYs9kYR0FYyyjIaE67FZ+dUdRXu/q8OnC6I8445RxlkCM0GTUkeEPR5ZuawOqnlRqfAUAwfBnGhsnYhaPY46DwjsHuosZiHdB2OZRerN1KUWg06EfR5ZuWj22JB/GwgXxsuUdnocdXfMJv/cU0rR30b/Lc7hfgfIHT57nJmOpijrJMQBj6PWBLQM95RoIiL5ShrCxv+Roc6l0vhJFuYAARG3UeMHf7mQ8DzNwHzy4fI6lfPJMvfQuRUs9LtgFOUCMXT0GJYnnqD+TK82A0yEGq+s9Jgn+9i9RtditwDMzRUCIOh1KpXxRzVQAWhPKP7IJjsxYEJQPcfoPUjvtSr7SQEQdAFafVKue5o8Js6BUTONSK1VCd1eWTFHT+rgu/9Pz9Fk9IBdHtmUNvjMkg0F5hO0vv8AG2DYqtqdrvRRnggmvpycYYYr051ly1e8eAJ2x0hD1uUk2UlLuGulzmysW7kuKkFB1GhcfKZgptzrEspGn0k2rmKmNZkWSCJ+FNOoz7dIyTo8/wDHwkf9fxFtzQAAAABJRU5ErkJggg==',
      // 支付完成右侧图片
      pay2: 'http://likede2-admin.itheima.net/img/pic_2.3b5af41c.png',
      // 未支付左侧图片
      weipay1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAXCAYAAAAV1F8QAAABXUlEQVRIS72WvUrEQBSFz41jUqRTttDCwn4bGxNiKmvBwhT6EJZ2voDarC+hjSDaWgTiJquQylYlCEEQ10pBskNGBtxFREx2djMpJsW953wz3Pm5hO/P9/0FzvkegA0ASwBmh7Ex/wMATwAuGGOHURQ9Sz3JwfO8tbIszwHMj2lald43DGOz2+1ek+d5i2VZ3gGYq1Ipxt8Mw2iT4zgdItpVNKklE0Ick+u6DwCWaynUkx4lSBaPqXvUUnIJErVSJ0yaBqhPRDdCiI//5jIp6MiyrP0wDD+rFqwMEkKc9nq9bQkIgmAmy7K2bdv3YRi+/wVVBgFYTZLkVpq6rnsFYB1ATkQrcRy//IYpg4qiaKVp+ur7fotzPjImoq04js+mBtK2IgAnSZLsDGuU53nbNM1GaiQZze+6HzXQco6qjs8oruuuG+i7vXW8RwA6+l5YbT1Dg13QJWPsYNgFfQFCc6Z7usO36wAAAABJRU5ErkJggg==',
      // 未支付右侧图片
      weipay2: 'http://likede2-admin.itheima.net/img/pic_0.979e683d.png'

    }
  },
  created() {
    console.log(this.row)
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style lang="scss">
.el-dialog{
  // height: 358px;
  width: 630px !important;
  .centent{
    padding: 0 20px;
    background-color: #f8f8f8;
    margin-bottom: 30px;
     .status{
    height: 54px;
    display: flex;
    align-items: center;
    span{
      flex: 6;
      padding-left: 20px;
    }
    img:nth-child(1){
      width: 26px !important;
    }
        img:nth-child(3){
          padding-right: 60px;
          transform: translateY(-5px);
    }
  }
 }
 .info{
  padding: 0 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  .item{
    display: flex;
    justify-content: start;
    // align-items: center;
    width: 50%;
  p:nth-child(1){
    // line-height: 16px;
    width: 80px;
    margin-bottom: 5px;
  }
  }
  .item:nth-child(2n){
    padding-left: 20px;

  }
 }
}
</style>
