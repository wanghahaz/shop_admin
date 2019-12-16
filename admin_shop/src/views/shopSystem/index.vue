<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" />
        <span>店铺信息</span>
        <el-button @click="toRouter('addDealis', {})" class="edit" type="text"
          >修改店铺信息</el-button
        >
      </div>
      <div class="card_content">
        <div class="size_box ">
          <div style="padding-top:0" class="flex title">
            <span class="long"></span> <span>基本信息</span>
          </div>
          <div class="flex msg">
            <label>店铺名称：</label>
            <span>{{ dealis.store_name }}</span>
          </div>
          <div class="flex msg">
            <label>店铺经营类型：</label>
            <span>美妆、护肤</span>
          </div>
          <div class="flex msg">
            <label>店铺背景图：</label>
            <img
              @click="
                (dialogVisible = !dialogVisible), (showImg = dealis.store_bgimg)
              "
              class="bg"
              :src="`${$imgUrl}${dealis.store_bgimg}`"
              alt=""
            />
          </div>
          <div class="flex msg">
            <label>店铺营业执照：</label>
            <img
              @click="
                (dialogVisible = !dialogVisible),
                  (showImg = dealis.store_license)
              "
              class="bg"
              :src="`${$imgUrl}${dealis.store_license}`"
              alt=""
            />
          </div>
        </div>
        <div class="size_box">
          <div class="flex title">
            <span class="long"></span> <span>店铺信息</span>
          </div>
          <div class="flex msg">
            <label>营业时间：</label>
            <span>{{ dealis.store_open_at }}</span>
          </div>
          <div class="flex msg">
            <label>联系方式：</label>
            <span>{{ dealis.phone }}</span>
          </div>
          <div class="flex msg">
            <label>经营地址：</label>
            <span
              >{{ dealis.province }}{{ dealis.city }}{{ dealis.area
              }}{{ dealis.store_address }}</span
            >
          </div>
        </div>
        <div class="size_box" style="border:none">
          <div class="flex title">
            <span class="long"></span> <span>安全设置</span>
          </div>
          <div class="flex msg">
            <label>经营人姓名：</label>
            <span>王哈哈</span>
          </div>
          <div class="flex msg">
            <label>联系方式：</label>
            <span>{{ dealis.phone }}</span>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="`${$imgUrl}${showImg}`" />
    </el-dialog>
  </div>
</template>
<script>
import elUploads from "@/components/elUpload";
import { getDealis } from "@/api/shop.js";
export default {
  name: "shopIndex",
  data() {
    return {
      showImg: "",
      dialogVisible: false,
      input: "",
      dealis: {},
      direction: { top: 300, left: 200 }
    };
  },
  components: {
    elUploads
  },
  filters: {},
  // 自定义指令
  directives: {},
  mounted() {
    this.getDealis();
  },
  methods: {
    success(e) {
      console.log(e);
    },
    getDealis() {
      getDealis("get", {}).then(res => {
        this.dealis = res.data;
        this.$store.dispatch("user/getInfo");
      });
    },
    toRouter(path, data) {
      this.$router.push({
        path,
        query: data
      });
    },
    submit(e) {}
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/componts.scss";
.edit {
  float: right;
  padding: 3px 0;
}
.size_box {
  @include border(3, dashed, #ebeef5);
  .title {
    font-weight: 600;
    margin-left: 15px;
    padding: 20px 0;
    align-items: center;
    .long {
      background: $Text;
      height: 18px;
      width: 3px;
      margin-right: 10px;
      @include radius(5px);
    }
  }
  .msg {
    font-size: 14px;
    margin: 0px 0 20px 0;
  }
  label {
    width: 120px;
    text-align: right;
    font-weight: 500;
  }
  .bg {
    width: 200px;
    height: 150px;
  }
}
</style>
