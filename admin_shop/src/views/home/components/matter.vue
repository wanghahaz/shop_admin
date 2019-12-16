<template>
  <div class="matter">
    <el-card class="matter_card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle " icon-class="circle" /><span>待办事项</span>
      </div>
      <div class="list">
        <div>
          <div class="num">
            <svg-icon icon-class="order" class-name="order" />
            <span>共有<span class="red">30条待发货</span>订单</span>
          </div>
          <el-button size="small" class="btn_btn">立即处理</el-button>
        </div>
        <div>
          <div class="num">
            <svg-icon icon-class="order" class-name="order" />
            <span>共有<span class="red">30条待退款</span>订单</span>
          </div>
          <el-button size="small" class="btn_btn">立即处理</el-button>
        </div>
        <div>
          <div class="num">
            <svg-icon icon-class="order" class-name="order" />
            <span>共有<span class="red">30条待退货</span>订单</span>
          </div>
          <el-button size="small" class="btn_btn">立即处理</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import Mixin from "@/views/mixin/index";
export default {
  name: "matter",
  data() {
    return {};
  },
  watch: {},
  computed: {},
  components: {},
  mixins: [Mixin],
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../../styles/componts.scss";
.circle {
  margin-right: 10px;
  color: $Text;
  width: 14px;
  height: 14px;
}
.matter_card {
  height: 427px;
}
.list {
  padding: 30px 10px 0 10px;
  .btn_btn {
    color: #fff;
    background: $Text;
    border: none;
  }
  .order {
    width: 20px;
    height: 25px;
    color: $Text;
    margin-right: 10px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    .num {
      display: flex;
      align-items: center;
    }
    div {
      font-size: 15px;
    }
  }
  > div:nth-of-type(2) {
    margin: 25px 0;
  }
  .red {
    color: red;
  }
}
</style>