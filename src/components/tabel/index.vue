<template>
  <div>
    <el-table
      v-if="resultList"
      :header-cell-style="{background:'#e1e4e5',color:'#80878f'}"
      :cell-style="{borderBottom:'0px'}"
      :data="resultList"
      style="width: 100%"
    >
      <el-table-column
        width="80px"
        type="index"
        label="序号"
        :index="indexAdd"
        class="order"
      />

      <el-table-column
        v-for="item,val,index in lable"
        :key="index"
        :label="item"
        width="190px"
        :show-overflow-tooltip="(item === '详细地址')"
      >
        <template slot-scope="{row}">
          <slot :name="val" :scope="row">{{ label(row,val) }}</slot>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="190px"
      >
        <template slot-scope="{row}">
          <slot name="opea" :scope="row" />
        </template>

      </el-table-column>
    </el-table>
  </div>

</template>

<script>
export default {
  name: 'Table',
  props: {
    lable: {
      type: Object,
      default: null,
      required: true
    },
    resultList: {
      type: [Object, Array],
      default: null,
      required: true
    },
    params: {
      type: Object,
      default: null,
      required: true
    }
  },
  computed: {
    label() {
      return (row, item) => {
        // console.log(row, item)
        if (item.includes('.')) {
          const keys = item.split('.')
          // console.log(row[keys[0]])
          if (row[keys[0]] === null) {
            return '未知'
          }
          return keys.reduce((pre, cur, index) => pre[cur], row)
        } else {
          return row[item]
        }
      }
    }
  },
  methods: {
    indexAdd(index) {
      return index + 1 + (this.params.pageIndex - 1) * this.params.pageSize
    }
  }
}
</script>

<style lang="scss" scoped>
 .el-table__header{ width: 100% !important; }
.el-table__body{ width: 100% !important; }
.lixian{
  display: inline-block;
  height: 23px;
    padding: 0 12px;
    background: #ff665f linear-gradient(135deg,#3fc997,#4bda98);
    border-radius: 14px;
    background: #ff665f linear-gradient(135deg,#ffb043,#ffc020);
    color: #fff;
}
.huodao{
  display: inline-block;
  height: 23px;
    padding: 0 12px;
    background: #ff665f linear-gradient(135deg,#3fc997,#4bda98);
    border-radius: 14px;
    color: #fff;
}
.cdz{
  display: inline-block;
  height: 23px;
    padding: 0 12px;
    background: #ff665f linear-gradient(135deg,#3fc997,#4bda98);
    border-radius: 14px;
    color: #fff;
}
.opea {
  color: #5f84ff;
  margin-left: 20px;
}
::v-deep .el-table__row{
  .cell {
    img{
  display: block;
    width: 24px;
    height: 24px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 50%;
    background: #f3f6fb;
    border: 1px solid #f3f6fb;
 }
  }
}

</style>
