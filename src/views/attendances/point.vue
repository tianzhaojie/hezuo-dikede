<template>
  <div>
    <!-- 搜索 -->
    <div class="level">
      <span style="padding: 10px">点位搜索:</span>
      <el-input
        v-model="page.name"
        placeholder="请输入内容"
        clearable
        style="width: 206px; padding: 10px"
      />
      <span style="padding: 10px">区域搜所:</span>
      <el-select
        v-model="page.regionId"
        clearable
        placeholder="请选择"
        style="width: 206px; padding: 10px"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getNodeListAPI"
      >搜索</el-button>
    </div>
    <!-- 内容 -->
    <div class="list-container">
      <!-- 按钮 -->
      <div class="button">
        <el-button
          type="warning"
          icon="el-icon-circle-plus-outline"
          @click="centerDialogVisible = true"
        >新建</el-button>
      </div>
      <!-- 内容 -->
      <el-table
        ref="singleTable"
        v-loading="loading"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column property="name" label="点位名称" width="200" />
        <el-table-column property="regionId" label="所在区域" width="200" />
        <el-table-column property="businessId" label="商圈类型" width="200" />
        <el-table-column property="ownerName" label="合作商" width="200" />
        <el-table-column property="addr" label="详细地址" width="200" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="ItsDetails(row)">查看详情</el-button>
            <el-button type="text" @click="modification(row)">修改</el-button>
            <el-button type="text" style="color: red" @click="DeleteArea(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="24" style="margin-top: 20px">
        <el-col
          :span="20"
        ><span>共{{ totalCount }}条记录 第
          {{ pageIndex + "/" + totalPage }} 页</span></el-col>
        <el-col
          :span="4"
        ><span>
          <el-pagination
            :current-page.sync="page.pageIndex"
            :page-size.sync="page.pageSize"
            layout="prev, next"
            prev-text="上一页"
            next-text="下一页"
            :total="totalCount"
            @current-change="getNodeListAPI"
            @size-change="getNodeListAPI"
          /> </span></el-col>
      </el-row>
    </div>
    <!-- 新增区域弹窗 -->
    <el-dialog
      v-loading="loading"
      title="新增区域"
      :visible.sync="centerDialogVisible"
      width="50%"
      center
    >
      <span>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="区域名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="所在区域" prop="regionId">
            <el-select v-model="ruleForm.regionId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属商圈" prop="regionId">
            <el-select v-model="ruleForm.businessId" placeholder="请选择">
              <el-option
                v-for="item in business"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="归属合作商" prop="regionId">
            <el-select
              ref="optionRef"
              v-model="ruleForm.ownerName"
              placeholder="请选择"
            >
              <el-option
                v-for="item in Partner"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="regionId">
            <el-cascader
              v-model="areaCodes"
              placeholder="请选择"
              size="large"
              :options="optionss"
            />
          </el-form-item>
          <el-form-item label="备注说明" prop="addr">
            <el-input
              v-model="ruleForm.addr"
              type="textarea"
              placeholder="请输入备注（不超过40字）"
            />
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibles">取 消</el-button>
        <el-button type="primary" @click="NewDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改域弹窗 -->
    <el-dialog
      v-loading="loading"
      title="修改区域"
      :visible.sync="centerDialogVisible1"
      width="50%"
      center
    >
      <span>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="区域名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="所在区域" prop="regionId">
            <el-select v-model="ruleForm.regionId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属商圈" prop="regionId">
            <el-select v-model="ruleForm.businessId" placeholder="请选择">
              <el-option
                v-for="item in business"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="归属合作商" prop="regionId">
            <el-select
              ref="optionRef"
              v-model="ruleForm.ownerName"
              placeholder="请选择"
            >
              <el-option
                v-for="item in Partner"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="regionId">
            <el-cascader
              v-model="areaCodes"
              placeholder="请选择"
              size="large"
              :options="optionss"
            />
          </el-form-item>
          <el-form-item label="备注说明" prop="addr">
            <el-input
              v-model="ruleForm.addr"
              type="textarea"
              placeholder="请输入备注（不超过40字）"
            />
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibles">取 消</el-button>
        <el-button type="primary" @click="modifications">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点位详情 -->
    <el-dialog
      title="点位详情"
      :visible.sync="centerDialogVisible2"
      width="40%"
      center
    >
      <el-table
        ref="singleTable"
        :data="rowss"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" />
        <el-table-column property="innerCode" label="机器编号" />
        <el-table-column property="vmStatus" label="设备状态" />
        <el-table-column property="updateTime" label="最后一次供货时间" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  getNodeListAPI,
  getSearch,
  businessList,
  PartnerSearch,
  TheNewPoint,
  ModifyThePoint,
  ItsDetails,
  DeletePoint
} from '@/api/attendances'
import { regionData } from 'element-china-area-data'
export default {
  data() {
    return {
      areaCodes: '',
      optionss: regionData,
      ruleForm: {
        name: '', // 名称
        addr: '', // 详细地址
        areaCode: '', // 最后一级区域Id
        createUserId: 1, // 	创建人Id
        regionId: '', // 所属区域Id
        businessId: '', // 所属商圈Id
        ownerId: '', // 合作商Id
        ownerName: '' // 合作商名称
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          {
            min: 1,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur'
          }
        ],
        regionId: [{ required: true, message: '请选择', trigger: 'change' }],
        addr: [
          { required: true, message: '请填写备注', trigger: 'blur' },
          {
            min: 3,
            max: 40,
            message: '长度在 3 到 40 个字符',
            trigger: 'blur'
          }
        ]
      },
      page: {
        pageIndex: 1, // 当前页码
        pageSize: 10,
        name: '', // 搜索内容
        regionId: ''
      },
      tableData: [], // 数据
      currentRow: null, // 默认选中
      pageIndex: '', // 当前页码
      pageSize: '', // 每页数量
      totalCount: 0, // 总数量
      totalPage: '', // 总页数
      loading: false,
      options: [], // 区域搜索选项
      centerDialogVisible: false, // 新建弹出框
      centerDialogVisible1: false, // 修改弹出框
      centerDialogVisible2: false, // 修改弹出框
      business: [], // 所属商圈
      Partner: [], // 归属合作商
      rows: {}, // 当前点击修改的对象
      rowss: [] // 当前点击的详情返回数据的对象
    }
  },
  created() {
    this.getNodeListAPI()
    this.getSearch()
    this.businessList()
    this.PartnerSearch()
  },
  methods: {
    // 获取列表
    async getNodeListAPI() {
      const { data } = await getNodeListAPI(this.page)
      // console.log(data)
      // console.log(data.currentPageRecords)
      this.tableData = data.currentPageRecords
      this.pageIndex = data.pageIndex
      this.pageSize = data.pageSize
      this.totalCount = +data.totalCount
      this.totalPage = data.totalPage
    },
    // 所在区域/选项
    async getSearch() {
      const { data } = await getSearch()
      // console.log(data)
      this.options = data.currentPageRecords
    },
    // 新增取消
    centerDialogVisibles() {
      this.ruleForm = {
        name: '', // 名称
        addr: '', // 详细地址
        areaCode: '', // 最后一级区域Id
        createUserId: 1, // 	创建人Id
        regionId: '', // 所属区域Id
        businessId: '', // 所属商圈Id
        ownerId: '', // 合作商Id
        ownerName: '' // 合作商名称
      }
      this.areaCodes = ''
      this.centerDialogVisible = false
      this.centerDialogVisible1 = false
    },
    // 商圈列表
    async businessList() {
      const { data } = await businessList()
      this.business = data
    },
    // 归属合作商
    async PartnerSearch() {
      const { data } = await PartnerSearch(this.page)
      this.Partner = data.currentPageRecords
    },
    // 新增确定按钮
    async NewDetermine() {
      const aaa = this.areaCodes.pop()
      this.ruleForm.areaCode = aaa
      this.ruleForm.ownerId = this.$refs.optionRef.selected.value
      this.ruleForm.ownerName = this.$refs.optionRef.selected.label
      this.loading = true
      try {
        await this.$refs.ruleForm.validate()
        await TheNewPoint(this.ruleForm)
        this.$message.success('新增成功')
        this.centerDialogVisible = false
        this.getNodeListAPI()
        this.ruleForm = {
          name: '', // 名称
          addr: '', // 详细地址
          areaCode: '', // 最后一级区域Id
          createUserId: 1, // 	创建人Id
          regionId: '', // 所属区域Id
          businessId: '', // 所属商圈Id
          ownerId: '', // 合作商Id
          ownerName: '' // 合作商名称
        }
      } catch (e) {
        // this.$message.error('新增失败')
      } finally {
        this.loading = false
      }
    },
    // 修改数据回显
    async modification(row) {
      this.centerDialogVisible1 = true
      this.rows = row
      // console.log(row)
      this.ruleForm = {
        name: row.name, // 名称
        addr: row.addr, // 详细地址
        areaCode: row.areaCode, // 最后一级区域Id
        createUserId: 1, // 	创建人Id
        regionId: row.regionId, // 所属区域Id
        businessId: row.businessId, // 所属商圈Id
        ownerId: row.ownerId, // 合作商Id
        ownerName: row.ownerName // 合作商名称
      }
    },
    // 修改
    async modifications() {
      this.loading = true
      try {
        const data = await ModifyThePoint(this.rows.id, this.ruleForm)
        // console.log(data)
        if (data.data === true) {
          this.$message.success('修改成功')
          this.centerDialogVisible1 = false
          this.getSearch()
        } else {
          this.$message.error('修改失败')
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    // 查看详情
    async ItsDetails(row) {
      this.centerDialogVisible2 = true
      const { data } = await ItsDetails(row.id)
      this.rowss = data
    },
    // 删除
    async DeleteArea(id) {
      try {
        this.loading = true
        await DeletePoint(id)
        this.$message.success('删除成功')
        this.getNodeListAPI()
      } catch (e) {
        this.$notify({
          title: '警告',
          message: '系统显示文件不支持删除',
          type: 'warning'
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.level {
  font-size: 14px;
  height: 64px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 64px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
}

.list-container {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}
</style>
