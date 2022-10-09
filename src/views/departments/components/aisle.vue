<template>
  <div>
    <el-dialog title="货道设置" :visible=" isShowAisle" width="940px" center @close="handleClose" @open="open">
      <el-dialog
        width="30%"
        title="智能排货"
        :visible="innerVisible"
        append-to-body
        @close="innerVisible = false"
      />
      <div class="main">
        <div class="channel-basic">
          <div class="box">
            <span>货道行数:{{ channelMaxCapacity }}</span>
            <span>货道列数:{{ vmCol }}</span>
            <span>货道容量:{{ vmRow }}</span>
          </div>
          <el-button type="primary" @click="goods">智能排货</el-button>
        </div>

        <div class="channel">
          <el-scrollbar style="height:100%;">
            <el-row v-for="item,index in ChannelList" :key="index" type="flex">
              <el-col
                v-for="val in item"
                :key="val.channelId
                "
                :span="12"
              >
                <div class="item">
                  <div class="pig">

                    <img
                      v-if="val.sku"
                      :src="val.sku.skuImage"
                      alt=""
                    >

                    <img v-else src="@/assets/common/goods/1111.png" alt="">
                    <span class="label">{{ val.channelCode }}</span>
                    <div v-if="val.sku">{{ val.sku.brandName }}</div>
                    <div v-else>暂无商品</div>
                  </div>
                  <span class="add">添加</span><span class="del">删除</span>
                </div>

              </el-col>
            </el-row>
          </el-scrollbar>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getChannelDetailAPI, getVmtype } from '@/api/equipment'
export default {
  name: 'Aisle',
  props: {
    isShowAisle: {
      type: Boolean,
      default: false
    },
    currentInnerCode: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      load: '1',
      innerVisible: false,
      ChannelList: [],
      vmCol: '',
      vmRow: '',
      channelMaxCapacity: ''
    }
  },
  methods: {
    async getChannelDetail() {
      const res = await getVmtype(this.row.type.typeId)
      this.channelMaxCapacity = res.data.channelMaxCapacity
      this.vmCol = res.data.vmCol
      this.vmRow = res.data.vmRow
      const { data } = await getChannelDetailAPI(this.currentInnerCode)
      console.log(data)
      for (var i = 0; i < data.length; i += this.vmCol) { this.ChannelList.push(data.slice(i, i + this.vmCol)) }
      console.log(this.ChannelList)
    },
    handleClose() {
      this.$emit('update:isShowAisle', false)
    },
    // 外层弹出框打开的回调
    open() {
      console.log(1)
      this.getChannelDetail()
    },
    goods() {
      this.innerVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .main{

    padding: 0 20px;
    .channel-basic{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    background: #f3f6fb;
    padding: 0 20px 0 30px;
    height: 56px;
      span {
        margin-right: 100px;
      }

    }
  }
  ::v-deep.channel{
    width: 814px;
    height: 384px;
    margin: 0 auto;
    .pig {
      width: 150px;
      height: 135px;
      padding-top: 16px;
    background-color: #f6f7fb;
    border-radius: 4px;
      img {
    display: inline-block;
    width: 84px;
    height: 78px;
    margin-bottom: 10px;
    -o-object-fit: contain;
    object-fit: contain;
      }
    }
    .item {
      position: relative;
    width: 150px;
    height: 180px;
    background: #fff;
    -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
    border-radius: 4px;
    text-align: center;

    .add{
        color: #5f84ff;
        padding: 10px;
      cursor: pointer;
      }
      .del{
        color: #ff5a5a;
        padding: 10px;
      cursor: pointer;
      }
    }
  }
  .el-scrollbar{
    width: 750px;
    height: 384px;
    margin: 0 auto;
  }
  .label{
    position: absolute;
    top: 10px;
    left: 0;
    width: 43px;
    height: 23px;
    line-height: 23px;
    background: #829bed;
    border-radius: 0 10px 10px 0;
    font-size: 12px;
    color: #fff;
  }
</style>
