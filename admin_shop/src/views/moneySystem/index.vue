<template>
  <div class="container">
    <div class="card flex" v-if="dealis.seven != undefined">
      <div class="card_1 column ">
        <span>累计收入（截至今日0点）</span>
        <span>￥{{ dealis.total }}</span>
      </div>
      <div class="card_2 column">
        <span>昨日收入</span>
        <span>￥{{ dealis.yesterday }}</span>
      </div>
      <div class="card_3 column">
        <span>七日收入</span>
        <span>￥{{ dealis.seven }}</span>
      </div>
      <div class="card_4 column">
        <div>
          <span style="padding-left: 5px;"
            >可提现<i
              v-popover:popover1
              style="color:#fff;margin-left:5px;"
              class="el-icon-warning"
            ></i
          ></span>
          <el-popover
            ref="popover1"
            placement="top-start"
            width="200"
            trigger="hover"
          >
            <div>
              <span class="fs_13" style="color:red"
                >注:提现时,需向平台提交1%手续费</span
              >
            </div>
          </el-popover>
        </div>
        <div class="flex bet" style="margin-top:10px">
          <span style="fontSize:23px;line-height: 32px;"
            >￥{{ dealis.balance }}</span
          >
          <el-button
            size="small"
            @click="(dialogVisible = true), (type = 2)"
            style="margin-right:20px"
            round
            >提现</el-button
          >
        </div>
      </div>
    </div>
    <el-card style="margin:30px 0 0 0;width:99%" class="box-card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" />
        <span>提现记录</span>
      </div>
      <div>
        <el-table
          border
          tooltip-effect="dark"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="created_at"
            label="提现时间"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop
            label="提现金额（元）"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              ￥{{ scope.row.money }}
            </template></el-table-column
          >
          <el-table-column prop="updated_at" label="到账时间" align="center">
          </el-table-column>
          <el-table-column prop="address" label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">待审核</span>
              <span style="color:#67c23a" v-else-if="scope.row.status == 1"
                >提现成功</span
              >
              <span style="color:red" v-else>提现失败</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="look(scope.row, 1)" size="small"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
    </el-card>
    <el-dialog
      center
      :title="type == 1 ? '提现详情' : '提现'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div v-if="type == 1" class="dialog_content">
        <div>
          <label>状态:</label> <span v-if="one_dealis.status == 0">待审核</span>
          <span style="color:#67c23a" v-else-if="one_dealis.status == 1"
            >提现成功</span
          >
          <span style="color:red" v-else>提现失败</span>
        </div>
        <div v-if="one_dealis.msg">
          <label>拒绝原因:</label><span>{{ one_dealis.msg }}</span>
        </div>
        <div>
          <label>提现金额:</label><span>{{ one_dealis.money }}</span>
        </div>
        <div>
          <label>实际到账金额:</label
          ><span>{{ one_dealis.receive_money }}</span>
        </div>
        <div><label>提现账号:</label><span>1111111111111</span></div>
        <div>
          <label>提现时间:</label><span>{{ one_dealis.created_at }}</span>
        </div>
      </div>
      <div class="dialog_content" v-else>
        <div>
          <label>可提现余额:</label>
          <span style="color:red">￥{{ dealis.balance }}</span>
        </div>
        <div>
          <label>提现金额：</label>
          <el-input
            style="width:50%"
            size="small"
            v-model="from.money"
            placeholder="请输入提现金额"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="disabled" @click="submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { confirm } from "@/utils/element.js";
import { getFinance, get_list, withdraw } from "@/api/money.js";
export default {
  name: "orderIndex",
  data() {
    return {
      disabled: false,
      dialogVisible: false,
      dealis: {},
      input: "",
      direction: { top: 300, left: 200 },
      tableData: [],
      page: 1,
      total: 1,
      pageSize: 10,
      one_dealis: {},
      type: 1,
      from: {
        money: ""
      }
    };
  },
  filters: {},
  // 自定义指令
  directives: {},
  mounted() {
    this.getFinance();
    this.get_list();
  },
  methods: {
    look(e, type) {
      this.dialogVisible = true;
      this.one_dealis = e;
      this.type = type;
      console.log(e);
    },
    handleSizeChange(e) {
      this.page = e;
      this.get_list();
    },
    submit(e) {
      if (this.type == 1) {
        this.dialogVisible = false;
      } else {
        for (let i in this.from) {
          let isTure = this.from[i] == "" || isNaN(this.from[i]);
          console.log(isTure);
          if (isTure || this.from[i] / 1 <= 0) {
            this.$message.warning("请您填写正确提现金额");
            return;
          }
        }
        this.disabled = true;
        withdraw(this.from)
          .then(res => {
            if (res.code == 200) {
              this.getFinance();
              this.get_list();
              this.dialogVisible = false;
            }
            this.$message.warning(res.msg || "操作失败");
            this.disabled = false;
          })
          .catch(err => {
            this.disabled = false;
          });
      }
    },
    get_list() {
      get_list({ page: this.page }).then(res => {
        if (res.code == 200) {
          this.pageSize = res.data.per_page;
          this.tableData = res.data.data;
          this.total = res.data.total;
        } else {
          this.pageSize = 1;
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    getFinance() {
      getFinance({}).then(res => {
        console.log(res);
        this.dealis = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/componts.scss";
.card {
  > div {
    padding: 25px 0 0 20px;
    box-sizing: border-box;
    width: 22%;
    height: 125px;
    margin: 0 1% 0 0;
    color: #fff;
    > span:nth-of-type(1) {
      padding-left: 5px;
    }
    > span:nth-of-type(2) {
      margin-top: 10px;
      line-height: 32px;
      font-size: 23px;
    }
  }
  .card_1 {
    background: url("../../assets/images/sums_.png") no-repeat;
    background-size: 100% 100%;
  }
  .card_2 {
    background: url("../../assets/images/yes_day.png") no-repeat;
    background-size: 100% 100%;
  }
  .card_3 {
    background: url("../../assets/images/seven_day.png") no-repeat;
    background-size: 100% 100%;
  }
  .card_4 {
    background: url("../../assets/images/deposit.png") no-repeat;
    background-size: 100% 100%;
  }
  > div:nth-last-of-type(1) {
    width: 30%;
    margin-right: 0;
  }
}
.dialog_content {
  > div {
    margin: 10px 0 0 0;
    label {
      display: inline-block;
      width: 90px;
      margin-right: 10px;
      text-align: right;
    }
  }
}
</style>
