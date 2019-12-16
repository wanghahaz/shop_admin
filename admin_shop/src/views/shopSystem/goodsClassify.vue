<template>
  <div class="container">
    <div class="search_box flex flex_sb">
      <div>
        <span>商品名称:</span>
        <el-input
          style="width:150px"
          v-model="from.goods_name"
          size="small"
          placeholder="商品名称"
        ></el-input>
      </div>
      <div>
        <span>商品分类:</span>
        <el-cascader
          expand-trigger="hover"
          :options="options"
          separator=","
          :props="{ value: 'id', label: 'name', children: 'sub' }"
          v-model="from.cateid"
          size="small"
        >
        </el-cascader>
      </div>
      <div>
        <span>创建日期:</span>
        <el-date-picker
          clearable
          size="small"
          v-model="from.created_at"
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
      <el-button size="small" @click="reset(from)">重置</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部商品" name="1"></el-tab-pane>
      <el-tab-pane label="已分类" name="2"></el-tab-pane>
      <el-tab-pane label="未分类" name="3"></el-tab-pane>
    </el-tabs>

    <div style="margin:0 0 10px 0">
      <el-button
        size="small"
        :disabled="ids.length == 0"
        type="primary"
        @click="(dialogVisible = true), (batchType = 2)"
        >批量分类</el-button
      ><el-button
        size="small"
        @click="del(2)"
        :disabled="activeName == 3 || ids.length == 0"
        type="danger"
        >批量删除</el-button
      >
    </div>
    <el-table
      v-loading="loading"
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
      <el-table-column label="商品信息" align="center">
        <template slot-scope="scope">
          <div class="flex">
            <img
              class="goods_img"
              :src="`${$imgUrl}${scope.row.goods_thumb}`"
              alt=""
            />
            <span style="margin-left:10px">{{ scope.row.goods_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="所属分类" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.store_cate ? scope.row.store_cate.name : "未分类" }}
          </span>
          <i
            @click="(dialogVisible = true), (goodsDealis = scope.row)"
            class="el-icon-edit-outline"
          ></i>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        prop="address"
        label="操作"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div>
            <el-button
              :disabled="!scope.row.store_cate"
              @click="del(1, scope.row)"
              :class="!!scope.row.store_cate ? 'del' : ''"
              type="text"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改商品分类"
      center
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div class="content_dia">
        <div>
          <span>商品分类:</span>
          <el-cascader
            expand-trigger="hover"
            :options="optionss"
            separator=","
            :props="{ value: 'id', label: 'name', children: 'sub' }"
            v-model="fiyList"
            size="small"
          >
          </el-cascader>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="(dialogVisible = false), (fiyList = [])"
          >取 消</el-button
        >
        <el-button type="primary" class="submit" @click="shiftFiy"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="page_box flex all_c">
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
  </div>
</template>
<script>
import { confirm } from "@/utils/element.js";
import { getList, classify, transfer } from "@/api/shop.js";
import Mixin from "@/views/mixin/index";
export default {
  name: "orderIndex",
  mixins: [Mixin],
  data() {
    return {
      batchType: 1,
      activeName: "1",
      loading: true,
      goodsDealis: {},
      dialogVisible: false,
      page: 1,
      total: 0,
      pageSize: 10,
      tableData: [],
      input: "",
      direction: { top: 300, left: 200 },
      options: [{ id: 0, name: "全部" }],
      optionss: [],
      ids: [],
      fiyList: [],
      from: {
        cateid: [],
        goods_name: "",
        created_at: []
      }
    };
  },
  mounted() {
    this.getList();
    this.getGoodsList();
  },
  methods: {
    handleSizeChange(e) {
      this.page = e;
      this.getGoodsList();
    },
    handleClick(e) {
      console.log(e);
    },
    // 多选唯一标识
    handleReserve(e) {
      return e.id;
    },
    // 转移
    shiftFiy() {
      // type 1:单个 2：批量操作
      let data = {
        cateid: "",
        ids: []
      };

      if (this.fiyList.length == 0) {
        this.$message.warning("请您选择归属分类");
        return false;
      }
      switch (this.batchType) {
        case 1:
          data.ids.push(this.goodsDealis.id);
          break;
        case 2:
          data.ids = this.ids.map(item => {
            return item.id;
          });
          break;
      }
      if (data.ids.length == 0) {
        this.$message.warning("请您选择商品");
        return false;
      }
      data.cateid = this.fiyList[this.fiyList.length - 1];
      transfer(data).then(res => {
        if (res.code == 200) {
          this.$message.success("操作成功");
          this.$refs.multipleTable.clearSelection();
          this.fiyList = [];
          this.dialogVisible = false;
          this.getGoodsList();
        } else {
          this.$message.error(res.msg || "操作失败");
        }
      });
    },
    handleSelectionChange(val) {
      this.ids = val;
    },
    del(type, e) {
      this.batchType = type;
      let data = {
        ids: []
      };
      switch (this.batchType) {
        case 1:
          data.ids.push(this.goodsDealis.id);
          break;
        case 2:
          data.ids = this.ids.map(item => {
            return item.id;
          });
          break;
      }
    },
    getGoodsList() {
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.from));
      data.page = this.page;
      data.cateid =
        data.cateid.length > 0 ? data.cateid[data.cateid.length - 1] : 0;
      classify(data).then(res => {
        this.loading = false;
        // this.$refs.multipleTable.clearSelection();
        if (res.code == 200) {
          this.tableData = res.data.data;
          this.pageSize = res.data.per_page;
          this.total = res.data.total;
        } else {
          this.tableData = [];
          this.pageSize = 1;
          this.total = 0;
        }
      });
    },
    getList() {
      getList({}).then(res => {
        if (res.code == 200) {
          this.options = [...this.options, ...res.data];
          this.optionss = res.data;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/componts.scss";
.submit {
  @include clearBtn;
}
.text {
  color: $Text;
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
.page_box {
  margin-top: 20px;
}
.content_dia {
  > div {
    height: 40px;
    display: flex;
    align-items: center;
    span:nth-of-type(1) {
      width: 80px;
    }
  }
}
.goods_img {
  width: 100px;
  height: 80px;
}
</style>
