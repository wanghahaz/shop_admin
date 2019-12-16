<template>
  <div class="upload-container">
    <el-button
      :style="{ background: color, borderColor: color }"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="dialogVisible = true"
      >上传图片</el-button
    >
    <el-dialog :visible.sync="dialogVisible">
      <vuedraggable class="wrapper" v-model="fileList">
        <transition-group>
          <div v-for="(item, index) in fileList" :key="index" class="img_box">
            <div class="del flex_c flex_a">
              <img
                @click="delImg(index)"
                src="../../../assets/images/del.png"
                alt
              />
            </div>
            <img :src="`${$imgUrl}${item}`" class="image_url" />
          </div>
        </transition-group>
      </vuedraggable>
      <el-upload
        :multiple="true"
        class="editor-slide-upload"
        :before-upload="beforeUpload"
        :show-file-list="false"
        accept="image/*"
        :http-request="httpRequest"
        action="https://httpbin.org/post"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import vuedraggable from "vuedraggable";
export default {
  name: "EditorSlideUpload",
  props: {
    color: {
      type: String,
      default: "#1890ff"
    }
  },
  components: { vuedraggable },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    };
  },

  methods: {
    beforeUpload() {
      // if (this.fileList.length > 4) {
      //   this.$message.error("最多可以上传五张");
      //   return false;
      // }
    },
    handleSubmit() {
      this.$emit("successCBK", this.fileList);
      this.dialogVisible = false;
      this.fileList = [];
    },
    delImg(ind) {
      this.fileList.splice(ind, 1);
    },
    httpRequest(file) {
      // console.log(file);
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
            this.fileList.push(res.data.data);
          } else {
            this.$message.error("上传失败" || res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("上传失败" || res.data.msg);
        });
    },
    onExceed(files, fileList) {
      // if (fileList.length >= 5) {
      //   this.$message.error("最多上传五张图片");
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
.del {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: none;
  img {
    width: 20px;
    height: 20px;
  }
}
.img_box:hover {
  .del {
    display: flex;
  }
}

.img_box {
  position: relative;
  display: inline-block;
  margin: 0 10px 10px 0;
}
.image_url {
  width: 120px;
  height: 120px;
}
</style>
