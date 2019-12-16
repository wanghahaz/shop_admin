<template>
  <div class="container">
    <div class="search_box flex flex_sb">
      <div>
        <span>商品名称:</span>
        <el-input
          style="width:150px"
          v-model="goodsSearch.goods_name"
          size="small"
          placeholder="商品名称"
        ></el-input>
      </div>
      <div>
        <span class="fs_15 left">商品分类:</span>
        <el-cascader
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
        @click="getRecycle"
        >查询</el-button
      >
      <el-button size="small" @click="reset(goodsSearch)">重置</el-button>
    </div>
    <el-button
      :disabled="ids.length == 0"
      class="recover"
      @click="recover"
      type="primary"
      size="small"
      >批量恢复</el-button
    >
    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      :data="tableData"
      style="width: 100%"
      border
      :row-key="handleReserve"
      :row-id="handleReserve"
      @selection-change="handleSelectionChange"
      max-height="600"
    >
      <el-table-column
        type="selection"
        :reserve-selection="true"
        width="60"
        align="center"
      >
      </el-table-column>
      <el-table-column label="商品信息" width="380" align="center">
        <template slot-scope="scope">
          <div class="flex flex_a">
            <img
              style="width:100px;height:100px"
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
        label="创建时间"
        width="170"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="deleted_at"
        label="回收时间"
        width="170"
        align="center"
      ></el-table-column>
      <el-table-column prop label="价格" width="80" align="center">
        <template slot-scope="scope">
          ￥{{ scope.row.goods_price }}
        </template></el-table-column
      >
      <el-table-column
        prop="goods_storage"
        label="库存"
        width="80"
        align="center"
      ></el-table-column>
      <!-- <el-table-column prop="count" label="状态" width="80" align="center"></el-table-column> -->
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="thorough(scope.row)" size="small"
            >恢复商品</el-button
          >
          <!-- <el-button type="text" @click="del(scope.row)" size="small"
            >彻底删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
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
import { getGoods, getRecycle, recoverGoods } from "@/api/goods.js";
import { confirm } from "@/utils/element.js";
import Mixin from "@/views/mixin/index";
export default {
  name: "goodsRecycle",
  mixins: [Mixin],
  data() {
    return {
      ids: [],
      options: [],
      total: 0,
      selectedOptions: [],
      goodsSearch: {
        name: "",
        created_at: "",
        start_money: "",
        end_money: ""
      },
      page: 1,
      tableData: []
    };
  },
  async mounted() {
    this.getRecycle();
    this.options = (await this.getClassFiy())["cate"];
  },
  methods: {
    recover() {
      console.log(this.ids);
    },
    handleReserve(e) {
      return e.id;
    },
    handleSelectionChange(val) {
      this.ids = val;
    },
    getRecycle() {
      getRecycle({
        page: this.page,
        name: this.goodsSearch.name,
        created_at: this.goodsSearch.created_at,
        cate: this.selectedOptions
      })
        .then(res => {
          if (res.code == 200) {
            this.total = res.data.total;
            this.tableData = res.data.data;
          } else {
            this.total = 1;
            this.tableData = [];
          }
        })
        .catch(err => {
          this.$message.error(res.msg || "请求失败");
        });
    },
    // 分类
    getClassFiy() {
      return new Promise(function(succ, err) {
        getGoods({}).then(res => {
          if (res.code == 200) {
            succ(res.data);
          } else {
            err(res);
          }
        });
      });
    },
    // 商品分类
    handleChange(value) {},
    del(e) {
      confirm({ content: "您确认彻底删除吗？" }).then(res => {
        if (res == "1") {
          this.$message.success("删除成功");
        }
      });
    },
    // 还原仓库
    thorough(row) {
      recoverGoods(row.id, {})
        .then(res => {
          if (res.code == 200) {
            this.$message.success("操作成功");
            this.getRecycle();
          } else {
            this.$message.error("操作失败");
          }
        })
        .catch(err => {});
      console.log(row);
    },
    // 分页
    handleSizeChange(e) {
      this.page = e;
      this.getRecycle();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/componts.scss";
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
.recover {
  margin-bottom: 20px;
}
</style>
