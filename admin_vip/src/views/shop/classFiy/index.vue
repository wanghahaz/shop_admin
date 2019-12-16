<template>
  <div class="container">
    <div class="search_box">
      <div>
        <label>分类名称</label>
        <el-input
          size="small"
          clearable
          v-model="search_from.keywords"
          placeholder="请输入分类名称"
        ></el-input>
      </div>
    </div>
    <div class="search_btn">
      <el-button size="small" @click="reset(search_from)" type="primary"
        >重置</el-button
      >
      <el-button size="small" @click="getList" type="primary">查询</el-button>
    </div>
    <div style="margin:10px 0">
      <el-button size="small" @click="toRouter('addFiy')" type="primary"
        >新增分类</el-button
      >
    </div>
    <el-table
      row-key="id"
      border
      :data="tableData"
      default-expand-all
      :tree-props="{ children: 'sub' }"
      class="table_body"
    >
      <el-table-column label="#" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="分类名称" align="center">
      </el-table-column>
      <el-table-column width="180" label="分类图片" align="center">
        <template slot-scope="scope">
          <div>
            <img class="img_" :src="scope.row.icon" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <el-button
              size="small"
              @click="toRouter('addFiy', { id: scope.row.id })"
              type="text"
              >编辑</el-button
            >
            <el-button
              class="danger"
              size="small"
              @click="del(scope.row.id)"
              type="text"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="page_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleSizeChange"
        :current-page.sync="page"
        :page-size="page_size"
        layout="total,prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
import { classFiy } from "@/api/shop";
export default {
  name: "",
  data() {
    return {
      page: 1,
      total: 0,
      page_size: 10,
      search_from: { keywords: "" },
      tableData: []
    };
  },
  watch: {},
  computed: {},
  components: {},
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      classFiy
        .getList(Object.assign({}, this.search_from, { page: this.page }))
        .then(res => {
          if (res.code == 200) {
            let { data } = res;
            data.forEach(item => {
              if (item.sub) {
                item.children = item.sub;
                item.children.forEach(value => {
                  value.name = `${item.name} > ${value.name}`;
                  if (value.sub) {
                    value.children = value.sub;
                    value.children.forEach(val => {
                      val.name = `${value.name} > ${val.name}`;
                    });
                  }
                });
              }
            });
            // this.total = data.total;
            // this.page_size = data.per_page;
            this.tableData = data;
          } else {
            this.page = 1;
            this.total = 0;
            this.tableData = [];
          }
        });
    },
    del(id) {},
    handleSizeChange(e) {
      this.page = e;
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "@/styles/componts.scss";
.img_ {
  width: 90px;
  height: 90px;
}
</style>