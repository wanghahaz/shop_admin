<template>
  <div class="container">
    <div class="search_box flex">
      <div>
        <span class="left">订单编号:</span>
        <el-input
          style="width:180px"
          size="small"
          placeholder="请输入订单编号"
          v-model="Orderobj.order_id"
        ></el-input>
      </div>
      <div>
        <span class="left">用户昵称:</span>
        <el-input
          style="width:180px"
          size="small"
          placeholder="请输入用户昵称"
          v-model="Orderobj.keywords"
        ></el-input>
      </div>
      <div>
        <span class="left">商品名称:</span>
        <el-input
          style="width:180px"
          size="small"
          placeholder="请输入商品名称"
          v-model="Orderobj.goods_name"
        ></el-input>
      </div>
      <div>
        <span>订单类型:</span>
        <el-select
          size="small"
          v-model="Orderobj.order_type"
          placeholder="请选择分类"
          @change="
            val => {
              selectType(val);
            }
          "
        >
          <el-option label="普通订单" value="0"></el-option>
          <!-- <el-option label="秒杀订单" value="1"></el-option> -->
        </el-select>
      </div>
      <div>
        <span>取货方式:</span>
        <el-select
          size="small"
          v-model="Orderobj.delivery"
          placeholder="请选择分类"
        >
          <el-option label="全部" value="0"></el-option>
          <el-option label="快递物流" value="1"></el-option>
          <el-option label="到店自提" value="2"></el-option>
        </el-select>
      </div>
      <div>
        <span>创建日期:</span>
        <el-date-picker
          clearable
          size="small"
          v-model="Orderobj.time"
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
      <el-button size="small" @click="reset(Orderobj)">重置</el-button>
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
        type="index"
        label="序号"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="order_id"
        label="订单编号"
        width="240"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="user.username"
        label="用户昵称"
        align="center"
      ></el-table-column>
      <el-table-column label="取货方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.delivery == 1 ? "快递物流" : "到店自提" }}
        </template>
      </el-table-column>
      <el-table-column prop label="订单金额" align="center">
        <template slot-scope="scope">
          ￥{{ scope.row.total_fee }}
        </template></el-table-column
      >
      <el-table-column prop label="订单状态" align="center">
        <template slot-scope="scope">
          <div>
            {{ statusObj[scope.row.status] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150" fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <el-button
              type="text"
              @click="toRouter('lookOrder', scope.row)"
              class="table_btn"
              size="small"
              >查看订单</el-button
            >
            <el-button
              :disabled="scope.row.status != 1"
              type="text"
              size="small"
              class="table_btn"
              @click="(dialogVisible = true), (sendObj = scope.row)"
              >订单发货</el-button
            >
          </div>

          <!-- <el-button
            type="text"
            v-if="scope.row.status != '-1' || scope.row.status != '0'"
            size="small"
            >订单跟踪</el-button
          > -->
          <!-- <el-button
            type="text"
            :disabled="scope.row.status != 9 && scope.row.status != 10"
            @click="close(scope.row, 3, '您确认删除此订单吗?')"
            size="small"
            >删除订单</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 提示 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <div class="dialog_v">
        <div>
          <label>订单号</label>
          <el-input
            style="width:50%"
            size="small"
            placeholder="请输入订单号"
            v-model="form.express_code"
            auto-complete="off"
          ></el-input>
        </div>
        <div>
          <label>物流公司</label>
          <el-input
            style="width:50%"
            size="small"
            placeholder="请输入物流公司"
            v-model="form.express_company"
            auto-complete="off"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="send">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <div class="block page_box flex_c flex_a">
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
import { confirm, message } from "@/utils/element.js";
import { getList, send } from "@/api/order.js";
import Mixin from "@/views/mixin/index";
export default {
  name: "orderIndex",
  mixins: [Mixin],
  data() {
    return {
      statusObj: {
        "-1": "全部",
        "0": "待付款",
        "1": "待发货",
        "2": "已发货",
        "3": "已完成",
        "4": "申请售后",
        "5": "拒绝售后",
        "6": "同意售后",
        "7": "完成售后",
        "8": "待评价",
        "9": "已取消",
        "10": "已关闭"
      },
      sendObj: {},
      dialogVisible: false,
      form: { express_code: null, express_company: null },
      tableData: [],
      statusList: [
        { name: "全部订单", id: "-1" },
        { name: "待付款", id: "0" },
        { name: "待发货", id: "1" },
        { name: "已发货", id: "2" },
        { name: "待评价", id: "8" },
        { name: "已完成", id: "3" },
        { name: "已取消", id: "9" },
        { name: "已关闭", id: "10" }
      ],
      Orderobj: {
        order_id: "",
        keywords: "",
        order_type: "",
        time: [],
        delivery: "0",
        goods_name: ""
      },
      pageSize: 1,
      statuActive: "-1",
      page: 1,
      total: null
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let data = this.Orderobj;
      data.status = this.statuActive;
      data.page = this.page;
      getList(data).then(res => {
        if (res.code == 200) {
          this.pageSize = res.data.row.per_page;
          this.tableData = res.data.row.data;
          this.total = res.data.row.total;
        } else {
          this.pageSize = 1;
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    toRouter(path, e) {
      this.$router.push({
        path: path,
        query: {
          id: e.id,
          status: e.status
        }
      });
    },
    handleClick(e) {
      this.statuActive = e.name;
      this.page = 1;
      this.getList();
    },
    send() {
      for (let i in this.form) {
        if (!this.form[i]) {
          message({ msg: "请您填写发货信息!", type: "warning" });
          return;
        }
      }
      send(this.sendObj.id, this.form)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            message({});
            this.dialogVisible = false;
            for (let i in this.form) {
              this.form[i] = "";
            }
            this.getList();
          } else {
            message({ msg: "操作失败!", type: "error" });
          }
        })
        .catch(err => {});
    },
    sendGoods(e, type, msg) {},
    close(e, type, msg) {
      this.sendObj = e;
      confirm({ content: msg }).then(res => {
        if (res == "1") {
          message({ msg: "操作成功" });
        }
      });
    },
    selectType(e) {
      this.Orderobj.order_type = e;
    },
    look(e) {},
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
.table_btn {
  margin: 0 5px 0 0;
  // line-height: 16px;
}
.btn_btn {
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
.dialog_v {
  div {
    margin-top: 6px;
  }
  label {
    width: 90px;
    text-align: right;
    padding-right: 20px;
    box-sizing: border-box;
    display: inline-block;
  }
}
</style>
