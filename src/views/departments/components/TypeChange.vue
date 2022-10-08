<template>
  <el-dialog title="修改设备类型" :visible="isShowChange" width="630px" center @close="close">
    <el-form v-if="changeList" :model="changeList" label-position="right" :rules="rules">
      <el-form-item
        label="型号名称"
        label-width="100px"
        type="text"
        placeholder="请输入"
        max="10"
        min="1"
        prop="name"
      >
        <el-input
          v-model="changeList.name"
          autocomplete="off"
          style="width :90%"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="型号编码" label-width="100px" prop="model">
        <el-input
          v-model="changeList.model"
          autocomplete="off"
          style="width :90%"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="货道行数" label-width="100px" prop="vmRow">
        <el-input-number v-model="changeList.vmRow" placeholder="请输入" controls-position="right" :min="1" :max="10" style="width:90%" />
      </el-form-item>
      <el-form-item label="货道列数" label-width="100px" prop="vmCol">
        <el-input-number v-model="changeList.vmCol" placeholder="请输入" controls-position="right" :min="1" :max="10" style="width:90%" />
      </el-form-item>
      <el-form-item label="货道容量" label-width="100px" prop="channelMaxCapacity">
        <el-input-number v-model="changeList.channelMaxCapacity" placeholder="请输入" controls-position="right" :min="1" :max="10" style="width:90%" />
      </el-form-item>
      <el-form-item label="设备图片" label-width="100px">
        <el-upload
          class="avatar-uploader"
          action="http://likede2-admin.itheima.net/likede/api/vm-service/sku/fileUpload"
          :show-file-list="false"
          name="fileName"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="changeList.image" :src="changeList.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getChangeTypeAPI, getAddTypeAPI } from '@/api/equipment'
export default {
  name: 'TypeChange',
  props: {
    isShowChange: {
      type: Boolean,
      default: false
    },
    changeList: {
      type: Object,
      required: true,
      default: null
    }
  },
  data() {
    return {

      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        model: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        vmRow: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        vmCol: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        channelMaxCapacity: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.changeList.image = URL.createObjectURL(file.raw)
    },
    // 新增
    async getAddType() {
      const { data } = await getAddTypeAPI(this.changeList)
      console.log(data)
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async submit() {
      if (this.changeList.typeId) {
        try {
          const { data } = await getChangeTypeAPI(this.changeList.typeId, this.changeList)
          console.log(data)
          this.close()
        } catch (error) {
          this.$message(error.response.data)
        }
      } else {
        this.getAddType(this.changeList)
        await this.$parent.getList()
        this.close()
      }
    },
    close() {
      this.$emit('update:isShowChange', false)
      this.$emit('update:changeList', {})
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
