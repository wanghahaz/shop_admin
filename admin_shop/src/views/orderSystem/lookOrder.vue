<template>
  <div class="container" v-if="dealis.id">
    <el-card class="box-card fs_14">
      <div>{{ statusObj[dealis.status] }}</div>
      <div class="danger">
        {{
          dealis.delivery == 1 &&
          statusText[dealis.status] == "买家已付款，等待发货中"
            ? statusText[dealis.status]
            : "买家已付款，待买家提货"
        }}
        <span v-if="dealis.status == 0">{{ h }}小时{{ m }}分钟{{ s }}秒</span>
        <span v-if="dealis.status == 0">后关闭订单</span>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" />
        <span>订单详情</span>
      </div>
      <div class="size_box ">
        <div style="padding-top:0" class="flex title">
          <span class="long"></span> <span>用户信息</span>
        </div>
        <div class="flex msg">
          <label>用户名:</label>
          <span>{{ dealis.user.username }}</span>
        </div>
        <div class="flex msg">
          <label>联系方式:</label>
          <span>18500350000</span>
        </div>
      </div>
      <div class="size_box ">
        <div class="flex title">
          <span class="long"></span> <span>订单信息</span>
        </div>
        <div class="flex msg">
          <label>订单编号:</label>
          <span>{{ dealis.order_id }}</span>
        </div>
        <div class="flex msg">
          <label>订单类型:</label>
          <span>{{ orderStatus[dealis.order_type] }}</span>
        </div>
        <div class="flex msg">
          <label>下单时间:</label>
          <span>{{ dealis.created_at }}</span>
        </div>
        <div v-if="dealis.pay_time" class="flex msg">
          <label>支付时间:</label>
          <span>{{ dealis.pay_time }}</span>
        </div>
        <div v-if="dealis.delivery == 1" class="flex msg">
          <label>发货时间:</label>
          <span>{{ dealis.check_time ? dealis.check_time : "未发货" }}</span>
        </div>
        <div class="flex msg">
          <label>支付方式:</label>
          <span>{{ paymentStatus[dealis.payment] }}</span>
        </div>
      </div>
      <div class="size_box ">
        <div class="flex title">
          <span class="long"></span> <span>商品信息</span>
        </div>
        <el-table
          style="margin-left:60px"
          class="table size_table"
          ref="multipleTable"
          tooltip-effect="dark"
          :data="dealis.orderdata"
          border
        >
          <el-table-column prop width="380" label="商品信息" align="center">
            <template slot-scope="scope">
              <div class="flex">
                <img
                  class="goodsImg"
                  :src="`${$imgUrl}${scope.row.goods.goods_thumb}`"
                />
                <span>{{ scope.row.goods.goods_name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop label="单价" align="center">
            <template slot-scope="scope">
              ￥{{ scope.row.goods_price }}
            </template></el-table-column
          >
          <el-table-column
            prop="goods_num"
            label="数量"
            align="center"
          ></el-table-column>
          <el-table-column prop label="商品状态" align="center">
            <template slot-scope="scope">
              {{ refund_status[scope.row.refund_status] }}
            </template>
          </el-table-column>
          <el-table-column prop label="商品总价" align="center">
            <template slot-scope="scope">
              {{ `￥${scope.row.goods_num * scope.row.goods_price}` }}
            </template>
          </el-table-column>
        </el-table>
        <div class="sums fs_15 flex">
          <span
            >合计：<span class="danger"
              >￥{{
                (dealis.goods_amount / 1 + dealis.shipping_fee / 1).toFixed(2)
              }}</span
            >
            <span class="fs_13 gray" v-if="dealis.shipping_fee / 1 > 0">
              (运费：{{ dealis.shipping_fee }})
            </span>
          </span>
        </div>
      </div>
      <div class="size_box ">
        <div class="flex title">
          <span class="long"></span> <span>物流信息</span>
        </div>
        <div v-if="dealis.delivery == 1" class="flex msg">
          <label>收货地址:</label>
          <span
            >{{ dealis.addr.name }}，{{ dealis.addr.phone }} ，{{
              dealis.addr.address_info
            }}</span
          >
        </div>
        <div class="flex msg">
          <label>运送方式:</label>
          <span>{{ dealis.delivery == 1 ? "物流" : "自提" }}</span>
        </div>
        <div
          v-if="
            dealis.delivery == 1 && (dealis.status == 2 || dealis.status == 3)
          "
          class="flex msg"
        >
          <label>物流单号:</label>
          <span>{{
            dealis.express_code ? dealis.express_code : "未发货"
          }}</span>
        </div>
        <div
          v-if="
            dealis.delivery == 1 && (dealis.status == 2 || dealis.status == 3)
          "
          class="flex msg"
        >
          <label>物流公司:</label>
          <span>{{ dealis.express_company }}</span>
        </div>
      </div>
      <div
        v-if="dealis.status == 1 && dealis.delivery == 1"
        class="operation flex"
      >
        <el-button size="small">修改发货地址</el-button>
        <el-button size="small">关闭订单</el-button>
        <el-button size="small" @click="dialogVisible = true" type="primary"
          >发货</el-button
        >
      </div>
    </el-card>

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
  </div>
</template>
<script>
let timers = null;
import { diffTime } from "@/utils/index.js";
import { confirm, message } from "@/utils/element.js";
import { getOrder, send } from "@/api/order.js";
export default {
  name: "lookOrder",
  data() {
    return {
      form: { express_code: null, express_company: null },
      dialogVisible: false,
      d: null,
      m: null,
      h: null,
      s: null,
      orderStatus: { "0": "普通订单" },
      refund_status: {
        "0": "正常",
        "1": "售后中",
        "2": "售后完成",
        "3": "已拒绝售后"
      },
      paymentStatus: {
        "1": "微信支付",
        "2": "积分",
        "3": "微信+积分"
      },
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
      dealis: {},
      active: 1,
      activeStatus: {
        "0": 1,
        "1": 2,
        "2": 3,
        "3": 5,
        "10": 1,
        "9": 1,
        "8": 4,
        "4": 2,
        "5": 2,
        "6": 2,
        "7": 2
      },
      statusText: {
        "0": "买家已下单，等待付款中",
        "1": "买家已付款，等待发货中",
        "2": "商家已发货",
        "9": "买家已取消订单",
        "10": "买家超时未支付，系统已自动关闭订单"
      },
      tableData: [{}],
      id: null
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getDealis();
  },
  destroyed() {
    if (this.dealis.status == 0) {
      clearTimeout(timers);
    }
  },
  methods: {
    send() {
      for (let i in this.form) {
        if (!this.form[i]) {
          message({ msg: "请您填写发货信息!", type: "warning" });
          return;
        }
      }
      send(this.id, this.form)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            message({});
            this.dialogVisible = false;
            for (let i in this.form) {
              this.form[i] = "";
            }
            this.getDealis();
          } else {
            message({ msg: "操作失败!", type: "error" });
          }
        })
        .catch(err => {});
    },
    getSummaries(param) {
      // let { columns, data } = param;
      let sum = 0;
      this.dealis.orderdata.forEach(element => {
        sum += element.goods_num * element.goods_price;
      });
      console.log(sum);
      return ["合计", "", "", `${sum}.00`];
    },
    getDealis() {
      getOrder(this.id, {})
        .then(res => {
          if (res.code == 200) {
            this.dealis = res.data;
            this.active = this.activeStatus[this.dealis.status];
            if (
              this.dealis.status == 0 &&
              new Date().getTime() < `${res.data.leftTime}000`
            ) {
              timers = setInterval(() => {
                let t = diffTime(
                  new Date().getTime(),
                  `${res.data.leftTime}000`
                );
                this.d = t.days;
                this.h = t.hours;
                this.m = t.minutes;
                this.s = t.seconds;
                if (
                  this.d == "00" &&
                  this.m == "00" &&
                  this.h == "00" &&
                  this.s == "00"
                ) {
                  clearTimeout(timers);
                  this.getDealis();
                }
              }, 1000);
            }
          } else {
            this.$message.error(res.msg || "获取数据失败");
          }
        })
        .catch(err => {});
    },
    close(e) {
      confirm({ content: "您确认关闭此订单吗?" }).then(res => {
        if (res == "1") {
          message({ msg: "删除成功" });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/componts.scss";
.danger {
  margin-top: 10px;
  color: $danger;
}
.gray {
  color: $caution;
}
.box-card {
  margin-bottom: 30px;
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
.operation {
  margin: 15px 15px 0 0;
  justify-content: flex-end;
}
.size_box {
  @include border(3, dashed, #ebeef5);
  &:nth-last-of-type(1) {
    border: none;
  }
  .title {
    font-weight: 600;
    margin-left: 15px;
    padding: 20px 0;
    align-items: center;
    .long {
      background: $Text;
      height: 18px;
      width: 3px;
      margin-right: 10px;
      @include radius(5px);
    }
  }
  .size_table {
    width: calc(100% - 100px);
  }
  .sums {
    justify-content: flex-end;
    margin: 20px 50px 20px 0;
  }
  .msg {
    font-size: 14px;
    margin: 0px 0 20px 0;
  }
  label {
    width: 120px;
    text-align: right;
    font-weight: 500;
  }
  .bg {
    width: 200px;
    height: 150px;
  }
}
.goodsImg {
  width: 120px;
  height: 120px;
  margin-right: 10px;
}
</style>
