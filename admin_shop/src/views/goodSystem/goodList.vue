<template>
  <div class="container">
    <div class="search_box flex">
      <div>
        <span>商品名称:</span>
        <el-input
          style="width:180px"
          size="small"
          placeholder="请输入商品名称"
          prefix-icon="el-icon-search"
          v-model="goodsSearch.name"
        ></el-input>
      </div>
      <div>
        <span>商品分类:</span>
        <el-cascader
          clearable
          size="small"
          :options="options"
          separator=","
          :props="{ value: 'id', label: 'name', children: 'sub' }"
          v-model="selectedOptions"
          @change="handleChange"
        ></el-cascader>
      </div>
      <div>
        <span>商品价格:</span>
        <el-input
          style="width:150px"
          v-model="goodsSearch.start_money"
          size="small"
          placeholder="商品价格"
        ></el-input>
        <span>——</span>
        <el-input
          style="width:150px"
          v-model="goodsSearch.end_money"
          size="small"
          placeholder="商品价格"
        ></el-input>
      </div>
      <div>
        <span>创建日期:</span>
        <el-date-picker
          clearable
          size="small"
          v-model="goodsSearch.created_at"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
    </div>
    <div class="btn_btn">
      <el-button
        type="primary"
        class="submit"
        style="margin-right:10px"
        size="small"
        @click="getGoodsList"
        >查询</el-button
      >
      <el-button size="small" @click="reset(goodsSearch)">重置</el-button>
    </div>
    <el-tabs v-model="statuActive" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in statusList"
        :key="item.id"
        :label="item.name"
        :name="String(item.id)"
      ></el-tab-pane>
    </el-tabs>
    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      :data="tableData"
      style="width: 100%"
      :row-key="handleReserve"
      border
      max-height="600"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column label="商品信息" width="300" align="center">
        <template slot-scope="scope">
          <div class="flex flex_a">
            <img
              style="width:120px;height:120px"
              class="goodsImg"
              v-if="scope.row.goods_thumb"
              :src="scope.row.goods_thumb"
            />
            <span style="margin:0 0 0 10px">{{ scope.row.goods_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="发布时间"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column label="价格" align="center">
        <template slot-scope="scope">
          <div>
            <span>￥{{ scope.row.goods_price }}</span>
            <i
              class="el-icon-edit-outline"
              @click="showDialog(scope.row, 1)"
            ></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="库存" align="center">
        <template slot-scope="scope">
          <div>
            <span>{{ scope.row.goods_storage }}</span>
            <i
              class="el-icon-edit-outline"
              @click="showDialog(scope.row, 2)"
            ></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="goods_sales_num"
        label="销量"
        align="center"
      ></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span class="fs_13">{{
            scope.row.status == 1 ? "已上架" : "已下架"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="110" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.status == 1"
            type="text"
            class="btn_btn_1"
            @click="edit(scope.row)"
            size="small"
            >上架</el-button
          >
          <el-button
            :disabled="scope.row.status == 0"
            type="text"
            class="btn_btn_1"
            @click="edit(scope.row)"
            size="small"
            >下架</el-button
          >
          <el-button
            :disabled="scope.row.status == 1"
            type="text"
            class="btn_btn_1"
            @click="del(scope.row)"
            size="small"
            >回收</el-button
          >
          <el-button
            type="text"
            class="btn_btn_1"
            @click="toRouter('addGoods', scope.row)"
            size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑商品"
      center
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="block page_box flex_c flex_a">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleSizeChange"
        :current-page.sync="page"
        :page-size="10"
        layout="total,prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getGoodsList,
  editStatus,
  recycleGoods,
  getGoods
} from "@/api/goods.js";
import { confirm } from "@/utils/element.js";
import Mixin from "@/views/mixin/index";
export default {
  mixins: [Mixin],
  name: "goodList",
  data() {
    return {
      editType: 1,
      goodsDealis: {},
      dialogVisible: false,
      value: [],
      total: 10,
      statuActive: "0",
      statusList: [
        { name: "全部商品", id: "0" },
        { name: "下架区", id: "1" },
        { name: "上架区", id: "2" },
        { name: "审核中", id: "3" },
        { name: "审核拒绝", id: "4" }
      ],
      selectedOptions: [],
      options: [],
      goodsSearch: {
        name: "",
        created_at: [],
        start_money: "",
        end_money: ""
      },
      page: 1,
      tableData: []
    };
  },
  mounted() {
    this.getGoodsList();
    this.getClassFiy();
  },
  methods: {
    showDialog(e, type) {
      this.dialogVisible = !this.dialogVisible;
      this.goodsDealis = e;
      this.editType = type;
    },
    // 分类
    getClassFiy() {
      getGoods({}).then(res => {
        if (res.code == 200) {
          this.options = res.data.cate;
        }
      });
    },
    // 列表
    getGoodsList() {
      let that = this;
      getGoodsList({
        name: that.goodsSearch.name,
        created_at: that.goodsSearch.created_at,
        cate: this.selectedOptions,
        status: that.statuActive - 1 > -1 ? that.statuActive - 1 : "",
        page: that.page
      })
        .then(res => {
          if (res.code == 200) {
            that.tableData = res.data.data;
            that.total = res.data.total;
          } else {
            that.tableData = [];
            that.total = 0;
          }
        })
        .catch(err => {
          that.tableData = [];
          that.total = 0;
        });
    },
    handleChange(value) {},
    // 切换title
    handleClick(e) {
      this.statuActive = e.name;
      this.page = 1;
      this.getGoodsList();
    },
    toRouter(path, row) {
      this.$router.push({
        path: path,
        query: { id: row.id }
      });
    },
    // 回收商品
    del(e) {
      recycleGoods(e.id, {})
        .then(res => {
          if (res.code == 200) {
            this.$message.success("已回收商品");
            this.getGoodsList();
          } else {
            this.$message.error(res.msg || "操作失败");
          }
        })
        .catch(err => {
          this.$message.error("操作失败");
        });
    },
    // 上下架商品
    edit(row) {
      editStatus(row.id, {})
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("修改成功");
            this.getGoodsList();
          } else {
            this.$message.error(res.msg || "操作失败");
          }
        })
        .catch(err => {
          this.$message.error("操作失败");
        });
    },
    // 多选唯一标识
    handleReserve(e) {
      return e.id;
    },
    // 分页
    handleSizeChange(e) {
      this.page = e;
      this.getGoodsList();
    }
  }
};
</script>

<style scoped lang='scss'>
@import "@/styles/componts.scss";
.btn_btn_1 {
  margin: 0 5px 0 0;
}
.search_box {
  font-size: 14px;
  flex-wrap: wrap;
  > div {
    margin: 0 40px 20px 0;
  }
}
.btn_btn {
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
.statusList {
  div {
    width: 100px;
    line-height: 45px;
    border: 1px solid #dcdfe6;
    border-bottom: none;
  }
}
</style>

