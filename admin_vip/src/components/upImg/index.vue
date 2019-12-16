<template>
  <!-- 带裁剪功能的上传图片 -->
  <div>
    <div v-if="data.crpop && crpop" class="content">
      <div class="show-info">
        <h4 style="margin:0 0 10px 0">
          自动生成截图框 固定比例 宽: 高 => 1 : 1
        </h4>
        <div class="test">
          <vueCropper
            ref="cropper2"
            :img="example2.img"
            :outputSize="example2.size"
            :outputType="example2.outputType"
            :info="example2.info"
            :canScale="example2.canScale"
            :centerBox="example2.centerBox"
            :original="example2.original"
            :autoCrop="example2.autoCrop"
            :autoCropWidth="example2.autoCropWidth"
            :autoCropHeight="example2.autoCropHeight"
            :fixed="example2.fixed"
            :fixedNumber="example2.fixedNumber"
            :enlarge="4"
          ></vueCropper>
        </div>
        <el-button
          :disabled="disabled"
          class="btn_crop"
          @click="finish2"
          size="small"
          type="primary"
          >裁剪</el-button
        >
      </div>
    </div>
    <el-upload
      v-if="data.crpop"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      accept="image/*"
      :data="data"
      :http-request="uploadImg"
    >
      <el-button type="primary" size="small" class="submit">{{
        tip.name
      }}</el-button>
      <div v-if="tip.tip" slot="tip" class="el-upload__tip clo_tip fs_12">
        {{ tip.tip }}
      </div>
    </el-upload>
    <el-upload
      v-else
      :disabled="disabled"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      accept="image/*"
      :data="data"
      :http-request="httpRequest"
    >
      <el-button type="primary" size="small" class="submit">{{
        tip.name
      }}</el-button>
      <div v-if="tip.tip" slot="tip" class="el-upload__tip clo_tip fs_12">
        {{ tip.tip }}
      </div>
    </el-upload>
  </div>
</template>
<script>
// 文件转base64
function getBase64(file) {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    let imgResult = "";
    reader.readAsDataURL(file);
    reader.onload = function() {
      imgResult = reader.result;
    };
    reader.onerror = function(error) {
      reject(error);
    };
    reader.onloadend = function() {
      resolve(imgResult);
    };
  });
}
// base64 转blob
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
// blob转文件
function blobToFile(theBlob, fileName) {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}
export default {
  name: "el_uploads",
  props: {
    tip: {
      type: Object,
      default: {}
    },
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      disabled: false,
      crpop: false,
      crap: false,
      form: {
        head: ""
      },
      example2: {
        img: "", //裁剪图片的地址
        info: true, //裁剪框的大小信息
        size: 0.3, //裁剪生成图片的质量
        outputType: "jpeg", //裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 400, // 默认生成截图框宽度
        autoCropHeight: 400, // 默认生成截图框高度
        fixed: true, //是否开启截图框宽高固定比例
        full: true, // 是否输出原图比例的截图
        // 真实的输出宽高
        fixedNumber: [], //截图框的宽高比例
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true // 截图框是否被限制在图片里面
        // infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
    };
  },
  filters: {},
  mounted() {
    this.example2.fixedNumber = this.$attrs.example.fixedNumber || [1, 1];
  },
  // 自定义指令
  directives: {},
  methods: {
    httpRequest(file) {
      this.disabled = true;
      let formData = new FormData();
      formData.append("file", file.file);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      if (!file.file.size / 1024 / 1024 > 2) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return;
      }
      this.$http
        .post(`${this.$base}`, formData, config)
        .then(res => {
          this.disabled = false;
          let data = this.data;
          data.imgUrl = res.data.data;
          this.$emit("success", data);
        })
        .catch(err => {
          this.disabled = false;
          this.$message.error("上传失败，请重新上传" || res.data.msg);
        });
    },
    // 裁剪上传
    finish2() {
      if (this.data.type == "goods_images") {
        if (this.$attrs.list.length > 4) {
          this.$message.warning("最多上传五张图片");
          this.crpop = false;
          return;
        }
      }
      this.disabled = true;
      this.$refs.cropper2.getCropData(data => {
        this.modelSrc = data;
        //裁剪后的图片显示
        //裁剪后的图片转文件上传
        var blob = dataURLtoBlob(data);
        var file = blobToFile(blob, this.data.type);
        console.log(file);
        if (file.size / 1024 / 1024 > 2) {
          this.$message.error("上传图片大小不能超过 2MB!");
          return;
        }
        // 上传
        let formData = new FormData();
        formData.append("file", file);
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        this.$http
          .post(`${this.$base}`, formData, config)
          .then(res => {
            this.disabled = false;
            this.crpop = false;
            let data = this.data;
            data.imgUrl = res.data.data;
            this.$emit("success", data);
          })
          .catch(err => {
            this.disabled = false;
            this.$message.error("上传失败，请重新上传" || res.data.msg);
          });
      });
    },
    uploadImg(file) {
      if (!file.file.size / 1024 / 1024 > 2) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return;
      }
      //转base64  生成裁剪
      getBase64(file.file)
        .then(res => {
          this.crpop = true;
          this.example2.img = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // base64转blob
    toBlob(ndata) {
      //ndata为base64格式地址
      console.log(ndata);
      let arr = ndata.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  max-width: 520px;
}
.content::after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.test-button {
  display: flex;
  flex-wrap: wrap;
}
.clo_tip {
  // color: red;
  margin: 0 !important;
}
.btn_crop {
  float: right;
  margin: 10px 0px;
}

.show-info {
  margin-bottom: 20px;
}

.show-info h2 {
  line-height: 50px;
}

.test {
  height: 400px;
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: -100% 0;
  }
}

@media screen and (max-width: 1000px) {
  .content {
    max-width: 90%;
    margin: auto;
  }

  .test {
    height: 400px;
  }
}
</style>
