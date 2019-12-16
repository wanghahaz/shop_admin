<template>
  <div>
    <el-row class="panel-group">
      <el-col :span="6" :xs="12" :sm="12" :lg="6" class="card-panel-col card_1">
        <div class="card-panel " @click="handleSetLineChartData('newVisitis')">
          <!-- <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="order" class-name="card-panel-icon" />
          </div> -->
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日订单总数
            </div>
            <count-to
              :start-val="0"
              :end-val="order.today_nums / 1 ? order.today_nums / 1 : 0"
              :duration="2000"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="6" :xs="12" :sm="12" :lg="6" class="card-panel-col card_2">
        <div class="card-panel " @click="handleSetLineChartData('messages')">
          <!-- <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="qianbao" class-name="card-panel-icon" />
          </div> -->
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日销售额总数
            </div>
            <count-to
              :start-val="0"
              :end-val="order.today_money / 1 ? order.today_money / 1 : 0"
              :duration="2000"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="6" :xs="12" :sm="12" :lg="6" class="card-panel-col card_3">
        <div class="card-panel " @click="handleSetLineChartData('purchases')">
          <!-- <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="huobi" class-name="card-panel-icon" />
          </div> -->
          <div class="card-panel-description">
            <div class="card-panel-text">
              昨日销售额总数
            </div>
            <count-to
              :start-val="0"
              :end-val="order.sum_money / 1 ? order.sum_money / 1 : 0"
              :duration="2000"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="6" :xs="12" :sm="12" :lg="6" class="card-panel-col card_4">
        <div class="card-panel " @click="handleSetLineChartData('newVisitis')">
          <!-- <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="order" class-name="card-panel-icon" />
          </div> -->
          <div class="card-panel-description">
            <div class="card-panel-text">
              交易总金额
            </div>
            <count-to
              :start-val="0"
              :end-val="order.today_nums / 1 ? order.today_nums / 1 : 0"
              :duration="2000"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CountTo from "vue-count-to";
export default {
  name: "panel",
  props: {
    order: {
      type: Object,
      default: {
        sum_money: 2000,
        today_money: 1000,
        today_nums: 5
      }
    }
  },
  components: {
    CountTo
  },
  methods: {
    alert() {
      console.log("父组件调用子组件的方法");
    },
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scope>
.panel-group {
  .card-panel-col {
    width: 24%;
    margin: 0 1.2% 32px 0;
  }
  .card-panel-col:last-of-type {
    margin-right: 0;
  }
  .card-panel {
    box-sizing: border-box;
    height: 160px;
    padding-top: 20px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    // background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: left;
      font-weight: bold;
      margin: 26px;
      margin-left: 20px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
  .card_1 {
    background: url("../../../assets/images/card_1.png") no-repeat;
    background-size: 100% 100%;
  }
  .card_2 {
    background: url("../../../assets/images/card_2.png") no-repeat;
    background-size: 100% 100%;
  }
  .card_3 {
    background: url("../../../assets/images/card_3.png") no-repeat;
    background-size: 100% 100%;
  }
  .card_4 {
    background: url("../../../assets/images/card_4.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>