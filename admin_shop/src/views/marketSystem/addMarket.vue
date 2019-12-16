<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" />
        <span>运费策略设置</span>
      </div>
      <div class="flex msg">
        <label class="label"><span class="must">*</span> 策略名称:</label
        ><el-input
          class="input"
          size="small"
          v-model="form.name"
          placeholder="请输入策略名称"
        ></el-input>
      </div>
      <div class="flex msg">
        <label class="label"><span class="must">*</span> 策略门槛:</label>
        <span>满</span
        ><el-input
          class="input money"
          size="small"
          v-model="form.money"
          placeholder="请输入金额"
        ></el-input
        ><span>元</span>
      </div>
      <div class="flex msg">
        <label class="label">策略内容:</label>
        <el-radio class="radio" v-model="form.content" label="1">包邮</el-radio>
      </div>
      <el-button type="primary" style="margin:0 0 0 100px">保存策略</el-button>
    </el-card>
  </div>
</template>
<script>
import Mixin from "@/views/mixin/index";
export default {
  name: "addMarket",
  data() {
    return {
      form: {
        name: "",
        content: "1",
        money: ""
      }
    };
  },
  watch: {},
  computed: {},
  components: {},
  mixins: [Mixin],
  created() {
    if (this.$route.query.id) {
      this.$route.meta.title = "修改策略";
    } else {
      this.$route.meta.title = "添加策略";
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "@/styles/componts.scss";
.must {
  color: $danger;
}
.msg {
  font-size: 14px;
  margin: 0px 0 20px 0;
  align-items: center;
}
.label {
  width: 110px;
  padding-right: 10px;
  text-align: right;
  font-weight: 500;
}
.input {
  width: 200px;
}
.money {
  width: 170px;
  margin: 0 5px;
}
</style>