<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="分类名称"
        prop="name"
        :rules="{
          required: true,
          trigger: 'blur',
          min: 2,
          max: 5,
          message: '分类名称长度为2-5之间'
        }"
      >
        <el-input
          size="small"
          style="width:300px"
          placeholder="请输入分类名称"
          v-model.trim="ruleForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="上级分类"
        prop="pid"
        :rules="{
          required: true,
          trigger: 'blur',
          message: '分类不能为空'
        }"
      >
        <el-select
          style="width:150px"
          v-model="ruleForm.pid"
          clearable
          size="small"
          placeholder="请选择一级分类"
          @change="select"
        >
          <el-option
            v-for="item in fiyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select
          v-if="pidList.length > 0"
          style="width:150px"
          v-model="ruleForm.pidSub"
          clearable
          size="small"
          placeholder="请选择二级分类"
        >
          <el-option
            v-for="item in pidList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="排序"
        prop="listorder"
        :rules="{
          required: true,
          trigger: 'blur',
          message: '排序不能为空'
        }"
      >
        <el-input
          size="small"
          style="width:300px"
          placeholder="请输入排序值"
          v-model.trim="ruleForm.listorder"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="上传图片"
        prop="icon"
        :rules="{
          required: true,
          trigger: 'blur',
          message: '分类图片不能为空'
        }"
      >
        <img
          @click="(dialogVisible = true), (showImg = ruleForm.icon)"
          class="img_"
          v-if="ruleForm.icon"
          :src="ruleForm.icon"
          alt="分类图片"
        />
        <up-img
          :example="{ fixedNumber: [1, 1] }"
          :tip="{ tip: '建议图片宽高比例为1 ：1', name: '上传图片' }"
          :data="{ crpop: false, type: 'icon' }"
          @success="success"
        ></up-img>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitForm('ruleForm')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="`${showImg}`" />
    </el-dialog>
  </div>
</template>
<script>
import { classFiy } from "@/api/shop";
export default {
  name: "addGoods",
  data() {
    return {
      dialogVisible: false,
      showImg: "",
      pidList: [],
      fiyList: [
        {
          name: "顶级分类",
          id: 0
        }
      ],
      id: "",
      ruleForm: {
        name: "",
        icon: "",
        listorder: "",
        pid: "",
        pidSub: ""
      },
      rules: {
        name: [{}]
      }
    };
  },
  watch: {},
  computed: {},
  components: {},
  async mounted() {
    await this.getFiy();
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getEdit();
    }
  },
  methods: {
    select(e) {
      this.ruleForm.pidSub = "";
      this.pidList = this.fiyList.find(item => item.id == e).sub
        ? this.fiyList.find(item => item.id == e).sub
        : [];
    },
    handleChange(e) {
      console.log(e);
    },
    getEdit() {
      classFiy.edit(this.id, "GET", {}).then(res => {
        if (res.code == 200) {
          for (let i in res.data) {
            for (let j in this.ruleForm) {
              if (i == j && i != "pid") this.ruleForm[j] = res.data[i];
            }
          }
        }
        this.fiyList.forEach(item => {
          if (item.id == res.data.pid) {
            this.ruleForm.pid = res.data.pid;
          } else {
            if (item.sub) {
              item.sub.forEach(value => {
                if (value.id == res.data.pid) {
                  this.ruleForm.pid = item.id;
                  this.ruleForm.pidSub = value.id;
                  this.pidList = item.sub;
                }
              });
            }
          }
        });
      });
    },
    getFiy() {
      classFiy.getFiy({}).then(res => {
        if (res.code == 200) {
          this.fiyList = [...this.fiyList, ...res.data];
        }
      });
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
    },
    success(e) {
      this.ruleForm[e.type] = e.imgUrl;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "@/styles/componts.scss";
.img_ {
  width: 120px;
  height: 120px;
}
</style>