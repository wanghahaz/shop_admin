<template>
  <div class="container">
    <el-form :model="from" label-width="100px">
      <el-form-item label="昵称">
        <el-input
          style="width:300px"
          disabled
          clearable
          size="small"
          v-model="from.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group disabled v-model="from.gender">
          <el-radio :label="0">保密</el-radio>
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          disabled
          style="width:300px"
          clearable
          size="small"
          v-model="from.phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="type == 1" label="openId">
        <el-input
          disabled
          clearable
          style="width:300px"
          size="small"
          v-model="from.openid"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="type == 1" label="状态"
        ><el-switch
          disabled
          size="small"
          v-model="from.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="代金券">
        <el-input
          disabled
          clearable
          style="width:300px"
          size="small"
          v-model="from.jifen"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="type == 0"
          size="small"
          type="primary"
          @click="onSubmit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { user } from "@/api/user";
export default {
  name: "",
  data() {
    return {
      id: "",
      type: "",
      from: {
        avatar: "",
        gender: "",
        jifen: "",
        phone: "",
        username: "",
        openid: "",
        status: "",
        jifen: ""
      }
    };
  },
  watch: {},
  computed: {},
  components: {},
  mounted() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.getEdit();
  },
  methods: {
    onSubmit() {},
    getEdit() {
      user.editUser(this.id, "GET", {}).then(res => {
        if (res.code == 200) {
          let { data } = res;
          for (let i in data) {
            for (let j in this.from) {
              if (i == j && i != "status") {
                this.from[i] = data[i];
              } else if (i == j && i !== "status") {
                this.from[i] = !!data[i];
              }
            }
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "@/styles/componts.scss";
</style>