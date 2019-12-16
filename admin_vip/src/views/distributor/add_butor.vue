<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="90px"
      class="demo-ruleForm"
    >
      <div class="box_size">
        <div class="box_title">基本信息</div>
        <el-form-item label="用户名" prop="username">
          <el-input
            class="input_w3"
            size="small"
            placeholder="请输入用户名"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            class="input_w3"
            size="small"
            placeholder="请输入密码"
            v-model="ruleForm.pwd"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="contact">
          <el-input
            class="input_w3"
            size="small"
            placeholder="请输入用户名"
            v-model="ruleForm.contact"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            class="input_w3"
            size="small"
            placeholder="请输入手机号"
            v-model="ruleForm.phone"
          ></el-input>
        </el-form-item>
      </div>
      <div class="divider"></div>
      <div class="box_size">
        <div class="box_title">店铺信息</div>
        <el-form-item label="店铺名称" prop="store_name">
          <el-input
            class="input_w3"
            size="small"
            placeholder="请输入店铺名称"
            v-model="ruleForm.store_name"
          ></el-input>
        </el-form-item>

        <el-form-item label="店铺地址" prop="store_address">
          <el-input
            class="input_w3"
            size="small"
            placeholder="请输入店铺地址"
            v-model="ruleForm.store_address"
          ></el-input>
        </el-form-item>
        <el-form-item label="店铺资金" prop="balance">
          <el-input
            class="input_w3"
            size="small"
            placeholder="请输入店铺资金"
            v-model="ruleForm.balance"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
        <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "goodsList",
  data() {
    return {
      rules: {},
      ruleForm: {
        pwd: "",
        contact: "",
        username: "",
        phone: "",
        store_name: "",
        store_address: "",
        balance: ""
      }
    };
  },
  watch: {},
  computed: {},
  components: {},
  mounted() {},
  methods: {
    resetForm() {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/body.scss";
.divider {
  @include border(3, dashed, #f2f2f2);
  margin-bottom: 20px;
}
.box_size {
  .box_title {
    margin: 10px 0 15px 0;
    padding-left: 10px;
    height: 25px;
    line-height: 25px;
    position: relative;
  }
  .box_title::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    height: 25px;
    width: 4px;
    background: #a9bd7a;
  }
}
.input_w3 {
  width: 300px;
}
</style>