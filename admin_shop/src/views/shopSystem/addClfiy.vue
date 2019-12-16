<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" />
        <span>分类设置</span>
      </div>
      <el-form
        label-position="right"
        label-width="100px"
        :rules="rules"
        ref="ruleForm"
        :model="formLabelAlign"
      >
        <el-form-item label="分类名称:" prop="name">
          <el-input
            placeholder="请输入分类名称"
            style="width:260px"
            size="small"
            v-model="formLabelAlign.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级分类:" prop="pid">
          <el-select
            v-model="formLabelAlign.pid"
            style="width:260px"
            size="small"
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in fiyList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序:" prop="listorder">
          <el-input
            placeholder="请输入排序值"
            size="small"
            style="width:260px"
            v-model="formLabelAlign.listorder"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类图片:" prop="icon">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="httpRequest"
          >
            <img
              v-if="formLabelAlign.icon"
              :src="`${$imgUrl}${formLabelAlign.icon}`"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-button
          style="margin: 30px 0 0 100px;"
          class="submit"
          type="primary"
          @click="submint('ruleForm')"
          >保存分类</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { confirm, message } from "@/utils/element.js";
import { getClfiy, editClfiy, addClfiy } from "@/api/shop.js";
export default {
  name: "orderIndex",
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            trigger: "blur",
            message: "请输入分类名称"
          }
        ],
        pid: [
          {
            required: true,
            trigger: "blur",
            message: "请选择分类"
          }
        ],
        listorder: [
          {
            required: true,
            trigger: "blur",
            message: "请输入排序值,越大越靠前"
          }
        ],
        icon: [
          {
            required: true,
            trigger: "blur",
            message: "请您选择分类图片"
          }
        ]
      },
      fiyList: [
        {
          name: "顶级分类",
          id: 0
        }
      ],
      formLabelAlign: {
        name: "",
        pid: "",
        listorder: "",
        icon: ""
      },
      id: ""
    };
  },
  filters: {},
  // 自定义指令
  directives: {},
  mounted() {
    this.getClfiy();
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.$route.meta.title = "修改店铺自定义分类";
      this.editClfiy(1);
    } else {
      this.$route.meta.title = "添加店铺自定义分类";
    }
  },
  methods: {
    editClfiy(type) {
      editClfiy(this.id, "get", {}).then(res => {
        this.formLabelAlign.listorder = res.data.listorder;
        this.formLabelAlign.icon = res.data.icon;
        this.formLabelAlign.name = res.data.name;
        this.formLabelAlign.pid = Number(res.data.pid);
      });
    },
    getClfiy() {
      getClfiy({}).then(res => {
        if (res.code == 200) {
          this.fiyList = [...this.fiyList, ...res.data];
        }
      });
    },
    httpRequest(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      if (!file.file.size / 1024 / 1024 > 2) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return;
      }
      this.$http
        .post(this.$base, formData, config)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success("上传成功");
            this.formLabelAlign.icon = res.data.data;
          } else {
            this.$message.error("上传失败" || res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("上传失败" || res.data.msg);
        });
    },
    addClfiy() {
      if (this.$route.query.id) {
        editClfiy(this.id, "post", this.formLabelAlign).then(res => {
          if (res.code == 200) {
            this.$message.success("保存成功");
            this.$router.go(-1);
          } else {
            this.$message.error(res.data.msg || "保存失败");
          }
        });
      } else {
        addClfiy(this.formLabelAlign).then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$message.success("保存成功");
            this.resetForm("ruleForm");
            this.fiyList = [
              {
                name: "顶级分类",
                id: "0"
              }
            ];
            this.$router.push({
              path: "clafiyList"
            });
          } else {
            this.$message.error(res.data.msg || "保存失败");
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submint(formName) {
      let that = this;
      let data = {};
      let bol = true;
      this.$refs[formName].validate(value => {
        if (value) {
          this.addClfiy();
        } else {
          // console.log(new Error("错误信息"));
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/componts.scss";

.submit {
  @include clearBtn;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border: 1px dashed darkgray;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
