<template>
  <div v-if="dealis.id" class="container">
    <el-card class="box-card fs_14">
      <div>{{ statusObj[status_] }}</div>
      <div v-if="dealis.status == 4" class="danger">
        <div>
          <span>{{ d }}天{{ h }}时{{ m }}分{{ s }}秒后，系统自动同意退款</span
          ><i v-popover:popover1 style="color:red" class="el-icon-warning"></i>
        </div>
        <el-popover
          ref="popover1"
          placement="top-start"
          width="200"
          trigger="hover"
          :content="
            dealis.type == 3
              ? '订单状态为卖家已发货，买家申请仅退款，申请退款后，系统给予卖家7天时间响应退款，逾期未响应，系统将自动退款给买家'
              : '订单状态为卖家已发货，买家申请退货退款，系统给予卖家5天时间响应退货退款，卖家逾期未响应退货退款，系统自动达成退款协议，等待买家退货'
          "
        >
        </el-popover>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" />
        <span>订单详情</span>
      </div>
      <div class="size_box flex">
        <div style="padding-top:0" class="flex title">
          <span class="long"></span> <span>退款详情</span>
        </div>
        <div class="flex msg">
          <label>退款金额:</label>
          <span v-if="dealis.type == 3"
            >￥{{
              (dealis.shipping_fee / 1 + dealis.goods_amount / 1).toFixed(2)
            }}</span
          >
          <span v-else>{{ dealis.goods_amount }}</span>
        </div>
        <div class="flex msg">
          <label>服务单号:</label>
          <span>{{ dealis.id }}</span>
        </div>
        <div class="flex msg">
          <label>退款方式:</label>
          <span>退回到原支付渠道</span>
        </div>
        <div class="flex msg">
          <label>退款原因:</label>
          <span>{{ dealis.reason }}</span>
        </div>
        <div class="flex msg">
          <label>原因描述:</label>
          <span>{{ dealis.content ? dealis.content : "未填写" }}</span>
        </div>
        <div class="flex msg" v-if="dealis.status == 4">
          <label>处理备注:</label>
          <el-input
            size="small"
            style="width:240px;margin-left:5px"
            v-model="from.msg"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </div>
      <div class="size_box flex">
        <div class="flex title">
          <span class="long"></span> <span>用户详情</span>
        </div>
        <div class="flex msg">
          <label>用户账号:</label>
          <span>{{ dealis.user.username }}</span>
        </div>
        <div class="flex msg">
          <label>联系方式:</label>
          <span>15703415006（没有）</span>
        </div>
        <div class="flex msg">
          <label>所在地区:</label>
          <span>山西省太原市小店区（没有）</span>
        </div>
      </div>
      <div class="size_box flex">
        <div class="flex title">
          <span class="long"></span> <span>订单详情</span>
        </div>
        <div class="flex msg">
          <label>订单编号:</label>
          <span>{{ dealis.order.order_id }}</span>
        </div>
        <div class="flex msg">
          <label>订单类型:</label>
          <span>普通订单</span>
        </div>
        <div class="flex msg">
          <label>创建时间:</label>
          <span>{{ dealis.created_at }}（没有）</span>
        </div>
        <div class="flex msg">
          <label>申请时间:</label>
          <span>{{ dealis.created_at }}</span>
        </div>
        <div class="flex msg">
          <label>支付方式:</label>
          <span>微信（没有）</span>
        </div>
      </div>
      <div class="size_box flex">
        <div class="flex title">
          <span class="long"></span> <span>商品详情</span>
        </div>
        <el-table
          style="margin-left:60px"
          class="table size_table"
          ref="multipleTable"
          tooltip-effect="dark"
          :data="goodsData"
          border
        >
          <el-table-column prop label="商品图片" align="center">
            <template slot-scope="scope">
              <div>
                <img
                  class="goodsImg"
                  :src="`${$imgUrl}${scope.row.goods_thumb}`"
                  alt=""
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            align="center"
          ></el-table-column>
          <el-table-column prop label="单价" align="center">
            <template slot-scope="scope">
              ￥{{ scope.row.goods_price }}
            </template></el-table-column
          >
          <el-table-column
            prop="spec_name"
            label="属性"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="goods_num"
            label="数量"
            align="center"
          ></el-table-column>
          <el-table-column prop label="商品总价" align="center">
            <template slot-scope="scope">
              ￥{{ scope.row.goods_amount }}
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
      <div class="size_box flex no_width">
        <div class="flex title">
          <span class="long"></span> <span>物流详情（没有）</span>
        </div>
        <div class="flex msg">
          <label>收货地址:</label>
          <span>安安，15703415066，山西省太原市小店区点字节基地</span>
        </div>
        <div class="flex msg">
          <label>运送方式:</label>
          <span>物流</span>
        </div>
        <div class="flex msg">
          <label>物流公司:</label>
          <span>圆通快递</span>
        </div>
        <div class="flex msg">
          <label>快递单号:</label>
          <span>23164616546156498</span>
        </div>
      </div>
      <div v-if="status_ == '1_11'" class="size_box flex no_width">
        <div class="flex title">
          <span class="long"></span> <span>退货物流详情（没有）</span>
        </div>
        <div class="flex msg">
          <label>物流公司:</label>
          <span>圆通快递</span>
        </div>
        <div class="flex msg">
          <label>快递单号:</label>
          <span>23164616546156498</span>
        </div>
      </div>
      <div
        v-if="dealis.status == 4 || dealis.status == 11"
        class="operation flex"
      >
        <el-button
          size="small"
          :disabled="disabled"
          @click="refund(1, { status: dealis.status, type: dealis.type })"
          type="primary"
          >同意{{
            dealis.type == "3"
              ? "退款"
              : dealis.status == "11"
              ? "收货"
              : "退货"
          }}</el-button
        >
        <template v-if="dealis.status == 11">
          <el-button
            size="small"
            :disabled="disabled"
            @click="refund(2)"
            type="danger"
            >拒绝{{
              dealis.type == "3"
                ? "退款"
                : dealis.status == "11"
                ? "收货"
                : "退货"
            }}</el-button
          >
        </template>
      </div>
    </el-card>
  </div>
</template>
<script>
import { diffTime } from "@/utils/index.js";
import { confirm } from "@/utils/element.js";
import { getSale, refund } from "@/api/order.js";
let timers = null;
export default {
  name: "orderIndex",
  data() {
    return {
      statusObj: {
        "3_7": "已完成",
        "3_5": "已拒绝",
        "3_4": "待同意退款",
        "1_4": "待同意退款退货",
        "1_6": "待买家退货",
        "1_7": "已完成",
        "1_5": "已拒绝",
        "1_11": "买家已发货,待收货"
      },
      disabled: false,
      d: null,
      m: null,
      h: null,
      s: null,
      id: "",
      status_: "",
      dealis: {},
      goodsData: [],
      from: {
        msg: "",
        action: ""
      }
    };
  },
  filters: {},
  destroyed() {
    if (typeof timers == "number") {
      clearTimeout(timers);
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getSale();
  },
  // 自定义指令
  directives: {},
  methods: {
    refund(type, actions) {
      // console.log(actions);
      this.disabled = true;
      let data = this.from;
      if (type == 2) {
        data.action = type;
      } else {
        if (actions.status == 11) {
          data.action = 3;
        } else if (actions.type == 1) {
          data.action = 4;
        } else {
          data.action = 1;
        }
      }
      refund(this.id, data).then(res => {
        this.disabled = false;
        if (res.code == 200) {
          this.$message.success("操作成功");
          this.getSale();
        } else {
          this.$message.error(res.msg || "操作失败");
        }
      });
      // 1 同意 2 拒绝 3 卖家收货
    },
    submit(e) {},
    getSale() {
      this.goodsData = [];
      getSale(this.id, {}).then(res => {
        if (res.code == 200) {
          this.dealis = res.data;
          this.goodsData.push({
            goods_amount: res.data.goods_amount,
            goods_num: res.data.goods_num,
            spec_name: res.data.goods.spec_name,
            goods_thumb: res.data.goods.goods_thumb,
            goods_name: res.data.goods.goods_name,
            goods_price: res.data.order_data.goods_price
          });
          // refund_time
          console.log(res.data.refund_time);
          console.log(new Date().getTime());
          if (
            new Date().getTime() < `${res.data.refund_time}000` &&
            res.data.status == 4
          ) {
            timers = setInterval(() => {
              let t = diffTime(
                new Date().getTime(),
                `${res.data.refund_time}000`
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
                this.getSale();
              }
            }, 1000);
          }

          this.status_ = `${res.data.type}_${res.data.status}`;
        } else {
          this.$message.error(res.msg || "网络出错");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/componts.scss";
.box-card {
  margin-bottom: 30px;
}
.danger {
  margin-top: 10px;
  color: $danger;
}
.operation {
  margin: 15px 15px 0 0;
  justify-content: flex-end;
}
.size_box {
  flex-wrap: wrap;
  @include border(3, dashed, #ebeef5);
  &:nth-last-of-type(1) {
    border: none;
  }
  .title {
    width: 100%;
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
  .sums {
    width: 100%;
    justify-content: flex-end;
    margin: 20px 50px 20px 0;
  }
  .size_table {
    width: calc(100% - 100px);
  }
  .msg {
    align-items: center;
    width: 50%;
    font-size: 14px;
    margin: 0px 0 20px 0;
  }
  .card_content_c {
    width: 100%;
  }
  label {
    width: 120px;
    text-align: right;
    font-weight: 500;
  }
}
.no_width {
  .msg {
    width: 100%;
  }
}
.goodsImg {
  width: 120px;
  margin-right: 10px;
}
</style>
