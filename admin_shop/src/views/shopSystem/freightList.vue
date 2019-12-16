<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" />
        <span>运费模板设置</span>
      </div>
      <div class="flex flex_sb box_title">
        <el-button
          :disabled="tableData.length == 0 || ids.length == 0"
          type="danger"
          size="small"
          @click="del(1)"
          >批量删除</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="toRouter('addFreight', { type: 0 })"
          >新增运费模板</el-button
        >
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        :row-key="handleReserve"
        :row-id="handleReserve"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          :reserve-selection="true"
          width="60"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="name" label="模板名称" align="center">
        </el-table-column>
        <el-table-column label="首件" align="center">
          <template slot-scope="scope">
            {{ scope.row.tmpl_rule.default_num }}件
          </template>
        </el-table-column>
        <el-table-column label="运费（元）" align="center">
          <template slot-scope="scope">
            ￥{{ scope.row.tmpl_rule.default_money }}
          </template>
        </el-table-column>
        <el-table-column label="续件" align="center">
          <template slot-scope="scope">
            {{ scope.row.tmpl_rule.num }}件
          </template>
        </el-table-column>
        <el-table-column label="加价（元）" align="center">
          <template slot-scope="scope">
            ￥{{ scope.row.tmpl_rule.money }}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                @click="toRouter('addFreight', { type: 1, id: scope.row.id })"
                >编辑</el-button
              >
              <el-button type="text" class="del" @click="del(2, scope.row.id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page_box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleSizeChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="total,prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { confirm } from "@/utils/element.js";
import { freightList, delFreight } from "@/api/freight.js";
export default {
  name: "orderIndex",
  data() {
    return {
      page: 1,
      tableData: [],
      total: 0,
      pageSize: 10,
      ids: []
    };
  },
  filters: {},
  // 自定义指令
  directives: {},
  mounted() {
    this.getlist();
  },
  methods: {
    getlist() {
      freightList({ page: this.page }).then(res => {
        if (res.code == 200) {
          this.pageSize = res.data.per_page;
          this.total = res.data.total;
          this.tableData = res.data.data;
        }
      });
    },
    toRouter(path, query) {
      this.$router.push({
        path,
        query
      });
    },
    async del(type, id) {
      let ids = [];
      if (type == 1) {
        ids = this.ids.map(item => item.id);
      } else {
        ids.push(id);
      }
      let bol = await confirm({ title: "您确认删除么?" });
      if (bol == 1) {
        delFreight({ ids }).then(res => {
          if (res.code == 200) {
            this.$refs.multipleTable.clearSelection();
            this.$message.success("删除成功");
            this.getlist();
          } else {
            this.$message.warning(res.msg || "删除失败");
          }
        });
      }
      console.log(bol);
    },
    handleSizeChange(e) {
      this.page = e;
      this.getlist();
    },
    handleReserve(e) {
      return e.id;
    },
    handleSelectionChange(val) {
      this.ids = val;
    },
    submit(e) {}
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/componts.scss";
.box_title {
  margin: 0px 0 20px 0;
}
</style>
