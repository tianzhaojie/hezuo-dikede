<template>
  <div>
    <el-dialog title="货道设置" :visible.sync=" isShowAisle" width="940px" center @close="handleClose" @open="open">
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body
      />
      <div class="main">
        <div class="channel-basic">
          <div class="box">
            <span>货道行数</span>
            <span>货道列数</span>
            <span>货道容量</span>
          </div>
          <el-button type="primary">智能排货</el-button>
        </div>
        <div class="channel">
          <el-row v-infinite-scroll="load" type="flex" style="overflow:auto">
            <el-col
              v-for="item in ChannelList"
              :key="item.channelId
              "
              :span="12"
            >
              <div class="pig">
                <img
                  v-if="item.sku"
                  :src="item.sku.skuImage"
                  alt=""
                >
                <div v-if="item.sku">{{ item.sku.brandName }}</div>
              </div>
              <span>添加</span><span>删除</span>
            </el-col>
          </el-row>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getChannelDetailAPI } from '@/api/equipment'
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
    }
  },
  data() {
    return {
      innerVisible: false,
      ChannelList: []
    }
  },
  methods: {
    async getChannelDetail() {
      const { data } = await getChannelDetailAPI(this.currentInnerCode)
      console.log(data)
      this.ChannelList = data
    },
    handleClose() {
      this.$emit('update:isShowAisle', false)
    },
    // 外层弹出框打开的回调
    open() {
      console.log(1)
      this.getChannelDetail()
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
    .pig {
      height: 135px;
      background-color: #f6f7fb;
    }
  }
</style>
