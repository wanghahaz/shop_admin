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
        <span>买家名称:</span>
        <el-input
          style="width:150px"
          v-model="from.user_name"
          size="small"
          placeholder="买家名称"
        ></el-input>
      </div>
      <div>
        <span>订单编号:</span>
        <el-input
          style="width:150px"
          v-model="from.order_id"
          size="small"
          placeholder="商品名称"
        ></el-input>
      </div>
      <div>
        <span>退款状态:</span>
        <el-select
          size="small"
          style="width:150px"
          v-model="from.order_id"
          placeholder="请选择"
        >
          <el-option label="仅退款" value="1"> </el-option>
        </el-select>
      </div>
      <div>
        <span>申请时间:</span>
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
        @click="getList"
        >查询</el-button
      >
      <el-button size="small" @click="reset(from)">重置</el-button>
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
      border
      max-height="600"
    >
      <el-table-column
        prop="order.order_id"
        label="订单编号"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="240"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="user.username"
        label="买家"
        align="center"
      ></el-table-column>
      <el-table-column prop label="交易金额" align="center">
        <template slot-scope="scope">
          ￥{{
            (scope.row.goods_amount / 1 + scope.row.shipping_fee / 1).toFixed(2)
          }}
        </template>
      </el-table-column>
      <el-table-column prop label="退款金额,不含运费(元)" align="center">
        <template slot-scope="scope">
          ￥{{
            scope.row.type == 1
              ? scope.row.goods_amount
              : (scope.row.goods_amount / 1).toFixed(2)
          }}
        </template></el-table-column
      >
      <el-table-column
        prop="created_at"
        label="申请时间"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column prop label="退款状态" width="100" align="center">
        <template slot-scope="scope">
          {{ statusObj[scope.row.status_] }}
        </template></el-table-column
      >
      <el-table-column fixed="right" width="150" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            class="btn"
            type="text"
            @click="toRouter('lookSale', scope.row)"
            size="small"
            >查看详情</el-button
          >
          <el-button
            v-if="scope.row.type == 3"
            :disabled="scope.row.status_ != '3_4'"
            class="btn"
            type="text"
            @click="write(1, scope.row.id)"
            size="small"
            >同意退款</el-button
          >

          <el-button
            v-if="scope.row.type == 1"
            :disabled="scope.row.status_ != '1_4'"
            class="btn"
            type="text"
            @click="write(4, scope.row.id)"
            size="small"
            >同意退货</el-button
          >
          <el-button
            v-if="scope.row.type == 1"
            :disabled="scope.row.status_ != '1_11'"
            class="btn"
            type="text"
            @click="write(3, scope.row.id)"
            size="small"
            >确认收货</el-button
          >
          <el-button
            class="btn"
            v-if="scope.row.type == 1"
            :disabled="scope.row.status_ != '1_11'"
            type="text"
            @click="write(2, scope.row.id)"
            size="small"
            >拒绝收货</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog center title="提示" :visible.sync="dialogVisible" width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
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
import { confirm, message } from "@/utils/element.js";
import { getSaleList, refund } from "@/api/order.js";
import Mixin from "@/views/mixin/index";
export default {
  name: "saleIndex",
  mixins: [Mixin],
  data() {
    return {
      btn_dis: false,
      dialogVisible: false,
      actions: {
        id: "",
        action: "",
        msg: ""
      },
      from: {
        created_at: [],
        goods_name: "",
        order_id: "",
        user_name: ""
      },
      tableData: [],
      statusObj: {
        "3_7": "退款完成",
        "3_5": "退款拒绝",
        "3_4": "待退款",
        "1_4": "待退货",
        "1_6": "待买家发货",
        "1_7": "退货已完成",
        "1_5": "退货已拒绝",
        "1_11": "待收货"
      },
      statuActive: "3",
      statusList: [
        {
          id: 0,
          name: "全部"
        },
        {
          id: 3,
          name: "退款"
        },
        {
          id: 1,
          name: "退款退货"
        }
      ],
      total: 20,
      pageSize: 1,
      page: 1
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getSaleList({ type: this.statuActive, page: this.page })
        .then(res => {
          if (res.code == 200) {
            res.data.data.forEach(item => {
              item.status_ = `${item.type}_${item.status}`;
            });
            this.tableData = res.data.data;
            this.pageSize = res.data.per_page;
            this.total = res.data.total;
          } else {
            this.tableData = [];
            this.pageSize = 1;
            this.total = 0;
          }
        })
        .catch(err => {});
    },
    toRouter(path, e) {
      this.$router.push({
        path: path,
        query: {
          id: e.id,
          status_: e.status_
        }
      });
    },
    write(action, id) {
      this.actions.action = action;
      this.actions.id = id;
      if (action == 2) {
        this.dialogVisible = !this.dialogVisible;
      }
    },
    edit() {
      let data = {};
      this.btn_dis = true;
      data.msg = this.actions.msg;
      data.action = this.actions.action;
      refund(this.id, data).then(res => {
        this.btn_dis = false;
        if (res.code == 200) {
          this.$message.success("操作成功");
          this.getList();
        } else {
          this.$message.error(res.msg || "操作失败");
        }
      });
    },
    handleClick(e) {
      this.statuActive = e.name;
      this.getList();
    },
    handleSizeChange(e) {
      this.page = e;
      this.getList();
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
.btn {
  margin: 0 5px 0 0;
}
</style>
