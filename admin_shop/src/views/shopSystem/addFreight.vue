<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" />
        <span>{{ title }}</span>
      </div>

      <div class="flex box_small">
        <label><span class="must">*</span> 模板名称：</label>
        <el-input
          style="width:160px"
          size="small"
          v-model="form.name"
        ></el-input>
      </div>
      <div class="flex box_small">
        <label><span class="must">*</span> 模板类型：</label>
        <div class="flex radio">
          <el-radio v-model="form.radio" label="1">包邮</el-radio>
          <el-radio v-model="form.radio" label="2">自定义模板</el-radio>
        </div>
      </div>
      <div
        class="flex box_small"
        v-if="form.radio == 2"
        style="margin-bottom:0"
      >
        <label><span class="must">*</span> 运费设置：</label>
        <div class="setFre">
          <span>默认运费</span>
          <el-input
            class="input"
            v-model="form.tmpl_rule.default_num"
            size="small"
          ></el-input>
          <span>件内</span>
          <el-input
            class="input"
            v-model="form.tmpl_rule.default_money"
            size="small"
          ></el-input>
          <span>元，每增加</span>
          <el-input
            class="input"
            v-model="form.tmpl_rule.num"
            size="small"
          ></el-input>
          <span>件，增加运费</span>
          <el-input
            class="input"
            v-model="form.tmpl_rule.money"
            size="small"
          ></el-input>
          <span>元</span>
        </div>
      </div>
      <div v-if="form.radio == 2" class="tip">
        (计价方式:按件计;件数和金额必须都为整数)
      </div>

      <el-button
        style="margin-left:120px"
        size="small"
        type="primary"
        @click="submit"
        >保存</el-button
      >
      <!-- <el-button size="small" @click="toRouter('freightList', {})"
            >查看运费模板列表</el-button
          > -->
    </el-card>
  </div>
</template>
<script>
let reg = new RegExp("^[0-9]*$");
import { confirm } from "@/utils/element.js";
import { addFreight, editFreight } from "@/api/freight.js";
export default {
  name: "orderIndex",
  data() {
    return {
      title: "添加运费模板",
      form: {
        radio: "1",
        name: "",
        tmpl_rule: {
          default_num: "",
          default_money: "",
          num: "",
          money: ""
        }
      }
    };
  },
  filters: {},
  mounted() {
    if (this.$route.query.id) {
      this.$route.meta.title = "修改运费模板";
      this.title = "修改运费模板";
      editFreight("GET", this.$route.query.id, {}).then(res => {
        if (res.code == 200) {
          for (let i in this.form) {
            for (let j in res.data) {
              if (i == j) {
                this.form[i] = res.data[j];
              }
            }
          }
        }
      });
    } else {
      this.$route.meta.title = "添加运费模板";
    }
  },
  // 自定义指令
  directives: {},
  methods: {
    toRouter(path, query) {
      this.$router.push({
        path,
        query
      });
    },
    submit(e) {
      // console.log(this.form);
      if (!this.form["name"]) {
        this.$message.error("模板名称不能为空");
        return false;
      }
      if (this.form["radio"] == 2) {
        for (let i in this.form.tmpl_rule) {
          let bol =
            !(this.form.tmpl_rule[i] == "") && reg.test(this.form.tmpl_rule[i]);
          if (!bol) {
            this.$message.error("请您输入正确的格式");
            return false;
          }
        }
      }
      if (this.$route.query.id) {
        editFreight("POST", this.$route.query.id, this.form).then(res => {
          if (res.code == 200) {
            this.$router.go(-1);
          } else {
            this.$message.error("修改失败");
          }
        });
      } else {
        addFreight(this.form).then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$router.go(-1);
          } else {
            this.$message.error("添加失败");
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/componts.scss";
.tip {
  font-size: 12px;
  color: red;
  margin: 5px 0 30px 100px;
}
.box_small {
  .must {
    color: $danger;
  }
  margin: 0 0 15px 0;
  > label {
    font-weight: 500;
    width: 120px;
    text-align: right;
    font-size: 15px;
    padding-right: 10px;
    line-height: 32px;
    box-sizing: border-box;
  }
  .radio {
    > label {
      margin: auto 30px auto 0;
    }
  }
}
.setFre {
  span {
    font-size: 13px;
  }
  .input {
    margin: 0 5px;
    width: 80px;
  }
}
</style>
