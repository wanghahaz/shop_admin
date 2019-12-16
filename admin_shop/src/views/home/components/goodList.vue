<template>
  <div class="goodsList">
    <el-card class="line_card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" /><span
          >商品零售量统计</span
        >
      </div>
      <div class="goods">
        <!-- <div class="num flex bet fs_14">
          <span>商品数量</span>
          <span>200件</span>
          <span>近七天</span>
        </div> -->
        <div class="flex goods_content" v-for="item in 4" :key="item">
          <div class="flex goods_msg">
            <img
              class="goods_img flex_nosize"
              src="https://avatar.csdn.net/1/E/F/3_fatong3.jpg"
              alt=""
            />
            <span class="fs_13 clamp_1 goods_name"
              >外套女秋冬新品宽松加棉港风服情侣款棉服学生夹潮宽松加棉港风服情侣款棉服学生夹潮呜呜呜呜呜呜呜呜无无无无无无无无无无无无无无无无无无无无无无无无</span
            >
          </div>
          <span>￥300</span>
        </div>
        <!-- <div class="tc fs_13 more cursor">查看更多....</div> -->
      </div>
    </el-card>
  </div>
</template>
<script>
import Mixin from "@/views/mixin/index";
export default {
  name: "goodsList",
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
  width: 14px;
  color: $Text;
  height: 14px;
}
.goods {
  .goods_content {
    line-height: 40px;
    justify-content: space-between;
    padding: 15px 40px;
  }
  .num {
    padding-bottom: 10px;
  }
  .more {
    padding-top: 10px;
    border-top: 1px solid #ebeef5;
  }
  .num {
    border-bottom: 1px solid #ebeef5;
  }
  .goods_msg {
    width: 80%;
  }
  .goods_img {
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
}
</style>