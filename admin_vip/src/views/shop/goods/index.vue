<template>
  <div class="container">
    <div class="search_box">
      <div>
        <label>商店名称</label>
        <el-input
          size="small"
          clearable
          v-model="search_from.name"
          placeholder="请输入商店名称"
        ></el-input>
      </div>
      <div>
        <label>商品名称</label>
        <el-input
          size="small"
          clearable
          v-model="search_from.name"
          placeholder="请输入商品名称"
        ></el-input>
      </div>
      <div>
        <label>创建时间</label>
        <el-date-picker
          size="small"
          end-placeholder="结束日期"
          v-model="search_from.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          clearable
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="search_btn">
      <el-button size="small" @click="reset(search_from)" type="primary"
        >重置</el-button
      >
      <el-button size="small" @click="getList" type="primary">查询</el-button>
    </div>
    <el-tabs class="tabs_body" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部商品" name="0"></el-tab-pane>
      <el-tab-pane label="待审核" name="1"></el-tab-pane>
      <el-tab-pane label="审核通过" name="2"></el-tab-pane>
      <el-tab-pane label="审核拒绝" name="3"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" border class="table_body" style="width: 100%">
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column label="商品信息" align="center">
        <template slot-scope="scope">
          <div class="flex">
            <img class="goods_img" :src="scope.row.goods_thumb" alt="" />
            <span> {{ scope.row.goods_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="goods_price"
        width="180"
        label="商品价格(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goods_sales_num"
        width="180"
        label="商品销量"
        align="center"
      >
      </el-table-column>
      <el-table-column label="审核状态" width="120" align="center">
        <template slot-scope="scope">
          <div>
            <span>{{ verify[scope.row.is_verify] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <el-button
              size="small"
              @click="toRouter('', { id: scope.row.id })"
              type="text"
              >查看</el-button
            >
            <el-button size="small" @click="edit(1)" type="text"
              >同意</el-button
            >
            <el-button size="small" @click="edit(0)" class="danger" type="text"
              >拒绝</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="page_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleSizeChange"
        :current-page.sync="page"
        :page-size="page_size"
        layout="total,prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { goods } from "@/api/shop.js";
export default {
  name: "goodsList",
  data() {
    return {
      search_from: {
        name: "",
        time: ""
      },
      verify: ["待审核", "审核通过", "审核拒绝"],
      activeName: 0,
      tableData: [],
      data_: {},
      page: 1,
      page_size: 10,
      total: 0
    };
  },
  watch: {},
  computed: {},
  components: {},
  async mounted() {
    this.getList();
  },
  methods: {
    handleSizeChange(e) {
      this.page = e;
      this.getList();
    },
    handleClick(e) {
      this.activeName = e.name;
    },
    getList() {
      goods
        .getList(Object.assign({}, this.data_, { page: this.page }))
        .then(res => {
          if (res.code == 200) {
            let { data } = res;
            this.total = data.total;
            this.page_size = data.per_page;
            this.tableData = data.data;
          } else {
            this.page = 1;
            this.total = 0;
            this.tableData = [];
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/body.scss";
.goods_img {
  flex-shrink: 0;
  width: 90px;
  height: 90px;
  margin-right: 5px;
}
</style>