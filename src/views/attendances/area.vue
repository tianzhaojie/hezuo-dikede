<template>
  <div>
    <!-- 区域搜索 -->
    <div class="level">
      <span style="padding: 10px;">区域搜所:</span>
      <el-input v-model="page.name" placeholder="请输入内容" clearable style="width:206px; padding: 10px;" />
      <el-button type="primary" icon="el-icon-search" @click="getSearch">搜索</el-button>
    </div>
    <!-- 新建 -->
    <div class="list-container">
      <!-- 按钮 -->
      <div class="button">
        <el-button type="warning" icon="el-icon-circle-plus-outline" @click="centerDialogVisible = true">新建</el-button>
      </div>
      <!-- 内容 -->
      <el-table ref="singleTable" v-loading="loading" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column property="name" label="区域名称" width="270" />
        <el-table-column property="nodeCount" label="点位数" width="270" />
        <el-table-column property="remark" label="备注说明" width="270" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="viewDetails(row)">查看详情</el-button>
            <el-button type="text" @click="modification(row)">修改</el-button>
            <el-button type="text" style="color:red;" @click="DeleteArea(row.id)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <el-row :gutter="24" style="margin-top: 20px;">
        <el-col :span="20"><span>共{{ totalCount }}条记录 第 {{ pageIndex+'/'+totalPage }} 页</span></el-col>
        <el-col :span="4"><span>
          <el-pagination
            :current-page.sync="page.pageIndex"
            :page-size.sync="page.pageSize"
            layout="prev, next"
            prev-text="上一页"
            next-text="下一页"
            :total="totalCount"
            @current-change="getSearch"
            @size-change="getSearch"
          />
        </span></el-col>
      </el-row>
    </div>
    <!-- 新增区域弹窗 -->
    <el-dialog title="新增区域" :visible.sync="centerDialogVisible" width="50%" center>
      <span>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="区域名称" prop="regionName">
            <el-input v-model="ruleForm.regionName" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="备注说明" prop="remark">
            <el-input v-model="ruleForm.remark" type="textarea" placeholder="请输入备注（不超过40字）" />
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibles">取 消</el-button>
        <el-button type="primary" @click="TheNewArea">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改区域弹窗 -->
    <el-dialog title="修改区域" :visible.sync="centerDialogVisible1" width="50%" center>
      <span>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="区域名称" prop="regionName">
            <el-input v-model="ruleForm.regionName" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="备注说明" prop="remark">
            <el-input v-model="ruleForm.remark" type="textarea" placeholder="请输入备注（不超过40字）" />
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible1=false">取 消</el-button>
        <el-button type="primary" @click="modifications">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看详情弹窗 -->
    <el-dialog title="区域详情" :visible.sync="centerDialogVisible2" width="40%" center>
      <form class="el-form">
        <div class="el-form-item"><label class="el-form-item__label" style="width: 140px;">
                                    区域名称：</label>
          <div class="el-form-item__content" style="margin-left: 140px;">
            {{ rowss.name }}
          </div>
        </div>
        <div class="el-form-item"><label class="el-form-item__label" style="width: 140px;">包含点位：</label>
          <div class="el-form-item__content" style="margin-left: 140px;">
            <div
              style="width: 100%;"
            >
              <div class="hidden-columns">
                <div />
                <div />
                <div />
              </div>
              <div class="el-table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 396px;">
                  <colgroup>
                    <col name="el-table_9_column_45" width="80">
                    <col name="el-table_9_column_46" width="120">
                    <col name="el-table_9_column_47" width="120">
                    <col name="gutter" width="0">
                  </colgroup>
                  <thead class="has-gutter">
                    <tr class="">
                      <th
                        colspan="1"
                        rowspan="1"
                        class="el-table_9_column_45     is-leaf"
                        style="line-height: 1.15; padding: 10px 0px 9px; background: rgb(243, 246, 251); font-weight: 500; text-align: left; color: rgb(102, 102, 102);"
                      >
                        <div class="cell">序号</div>
                      </th>
                      <th
                        colspan="1"
                        rowspan="1"
                        class="el-table_9_column_46     is-leaf"
                        style="line-height: 1.15; padding: 10px 0px 9px; background: rgb(243, 246, 251); font-weight: 500; text-align: left; color: rgb(102, 102, 102);"
                      >
                        <div class="cell">点位名称</div>
                      </th>
                      <th
                        colspan="1"
                        rowspan="1"
                        class="el-table_9_column_47     is-leaf"
                        style="line-height: 1.15; padding: 10px 0px 9px; background: rgb(243, 246, 251); font-weight: 500; text-align: left; color: rgb(102, 102, 102);"
                      >
                        <div class="cell">设备数量</div>
                      </th>
                      <th class="gutter" style="width: 0px; display: none;" />
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="el-table__body-wrapper is-scrolling-none">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 396px;">
                  <colgroup>
                    <col name="el-table_9_column_45" width="80">
                    <col name="el-table_9_column_46" width="120">
                    <col name="el-table_9_column_47" width="120">
                  </colgroup>
                  <tbody>
                    <tr class="el-table__row current-row">
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_9_column_45  "
                        style="height: 44px; padding: 2px 0px; background: rgb(252, 253, 254); text-align: left; color: rgb(102, 102, 102);"
                      >
                        <div class="cell"><span>1</span></div>
                      </td>
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_9_column_46  "
                        style="height: 44px; padding: 2px 0px; background: rgb(252, 253, 254); text-align: left; color: rgb(102, 102, 102);"
                      >
                        <div class="cell"><span>{{ rowss.name }}</span></div>
                      </td>
                      <td
                        rowspan="1"
                        colspan="1"
                        class="el-table_9_column_47  "
                        style="height: 44px; padding: 2px 0px; background: rgb(252, 253, 254); text-align: left; color: rgb(102, 102, 102);"
                      >
                        <div class="cell"><span>{{ rowss.nodeCount }}</span></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="el-table__column-resize-proxy" style="display: none;" />
              <div class="el-loading-mask" style="display: none;">
                <div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular">
                  <circle cx="50" cy="50" r="20" fill="none" class="path" />
                </svg></div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </el-dialog>
  </div>
</template>

<script>
import { getSearch, TheNewArea, modifierSrea, viewDetailss, DeleteArea } from '@/api/attendances'
export default {
  data() {
    return {
      page: {
        pageIndex: 1, // 当前页码
        pageSize: 10,
        name: '' // 搜索内容
      },
      tableData: [], // 数据
      currentRow: null, // 默认选中
      pageIndex: '', // 当前页码
      pageSize: '', // 每页数量
      totalCount: 0, // 总数量
      totalPage: '', // 总页数
      centerDialogVisible: false, // 新增弹出框
      centerDialogVisible1: false, // 修改弹出框
      centerDialogVisible2: false, // 详情弹出框
      ruleForm: {
        regionName: '',
        remark: ''
      }, rules: {
        regionName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请填写备注', trigger: 'blur' },
          { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      rows: {},
      rowss: {}
    }
  },
  created() {
    this.getSearch()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val
    },
    // 获取列表
    async getSearch() {
      const { data } = await getSearch(this.page)
      // console.log(data.currentPageRecords)
      this.tableData = data.currentPageRecords
      this.pageIndex = data.pageIndex
      this.pageSize = data.pageSize
      this.totalCount = +data.totalCount
      this.totalPage = data.totalPage
    },
    // 取消
    centerDialogVisibles() {
      this.ruleForm = {
        regionName: '',
        remark: ''
      }
      this.centerDialogVisible = false
    },
    // 新增
    async TheNewArea() {
      this.loading = true
      try {
        await this.$refs.ruleForm.validate()
        await TheNewArea(this.ruleForm)
        this.$message.success('新增成功')
        this.centerDialogVisible = false
        this.getSearch()
        this.ruleForm = {
          regionName: '',
          remark: ''
        }
      } catch (e) {
        // this.$message.error('新增失败')
      } finally {
        this.loading = false
      }
    },
    // 修改数据回显
    async modification(row) {
      this.rows = row
      this.ruleForm = {
        regionName: row.name,
        remark: row.remark
      }

      this.centerDialogVisible1 = true
    },
    // 修改
    async modifications() {
      this.loading = true
      try {
        const data = await modifierSrea(this.rows.id, this.ruleForm)
        console.log(data)
        if (data.data === true) {
          this.$message.success('修改成功')
          this.centerDialogVisible1 = false
          this.getSearch()
        } else {
          this.$message.error('修改失败')
        }
      } finally {
        this.loading = false
      }
    },
    // 区域详情
    async viewDetails(row) {
      this.centerDialogVisible2 = true

      const { data } = await viewDetailss(row.id)
      this.rowss = data
      // console.log(this.rowss)
    },
    // 删除
    async DeleteArea(id) {
      // console.log(id)
      try {
        this.loading = true
        await DeleteArea(id)
        this.$message.success('删除成功')
        this.getSearch()
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
  background-color: #fff
}

.list-container {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}
</style>
