<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" />
        <span>修改信息</span>
      </div>
      <el-form
        :model="from"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <div style="padding-top:0" class="title">基本信息</div>
        <el-form-item style="width:400px" label="店铺名称" prop="store_name">
          <el-input
            size="small"
            placeholder="请填写店铺名称"
            v-model="from.store_name"
          ></el-input>
        </el-form-item>
        <el-form-item style="width:100%" label="店铺logo" prop="store_thumb">
          <img
            class="logo"
            @click="
              (dialogVisible = !dialogVisible), (showImg = from.store_thumb)
            "
            v-if="from.store_thumb"
            :src="`${$imgUrl}${from.store_thumb}`"
          />
          <el-uploads
            style="width:100%"
            :example="{ fixedNumber: [1, 1] }"
            :tip="{ tip: '建议LOGO图片宽高比例为1 ：1', name: '上传logo' }"
            :data="{ crpop: false, type: 'store_thumb' }"
            @success="success"
          ></el-uploads>
        </el-form-item>
        <el-form-item style="width:100%" label="店铺背景图" prop="store_bgimg">
          <img
            class="bg"
            @click="
              (dialogVisible = !dialogVisible), (showImg = from.store_bgimg)
            "
            v-if="from.store_bgimg"
            :src="`${$imgUrl}${from.store_bgimg}`"
          />
          <el-uploads
            :example="{ fixedNumber: [1, 1] }"
            :tip="{
              tip: '建议背景图片宽高比例为2 ：1',
              name: '上传店铺背景图'
            }"
            :data="{ crpop: false, type: 'store_bgimg' }"
            @success="success"
          ></el-uploads>
        </el-form-item>
        <!-- <el-form-item
          style="width:100%"
          label="店铺营业执照"
          prop="store_license"
        >
          <img
            class="bg"
            @click="
              (dialogVisible = !dialogVisible), (showImg = from.store_license)
            "
            v-if="from.store_license"
            :src="`${$imgUrl}${from.store_license}`"
          />
          <el-uploads
          :fixedNumber="[1,1]"
            :tip="{
              tip: ' 建议营业执照图片宽高比例为2 ：1',
              name: '上传店铺营业执照'
            }"
            :data="{ crpop: false, type: 'store_license' }"
            @success="success"
          ></el-uploads>
        </el-form-item> -->
        <div style="padding-top:0" class="title">店铺信息</div>
        <el-form-item style="width:100%" label="营业时间" prop="startTime">
          <el-time-select
            placeholder="起始时间"
            size="small"
            :clearable="false"
            v-model="from.startTime"
            :picker-options="{
              start: '06:00',
              step: '00:30',
              end: '23:00'
            }"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item style="width:100%" prop="endTime">
          <el-time-select
            size="small"
            :clearable="false"
            placeholder="结束时间"
            v-model="from.endTime"
            :picker-options="{
              start: '06:00',
              step: '00:30',
              end: '23:00',
              minTime: from.startTime
            }"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item style="width:100%" label="联系方式" prop="phone">
          <el-input
            style="width:470px"
            size="small"
            placeholder="请填写联系方式"
            v-model="from.phone"
          ></el-input>
        </el-form-item>
        <el-form-item style="width:600px" label="经营地址" prop="area">
          <el-select
            style="width:140px;margin-right:20px"
            size="small"
            v-model="from.province"
            placeholder="请选择"
          >
            <el-option label="山西省" value="山西省"> </el-option>
          </el-select>
          <el-select
            style="width:140px;margin-right:20px"
            size="small"
            v-model="from.city"
            placeholder="请选择市"
            @change="select"
          >
            <el-option
              v-for="(item, index) in cityList"
              :key="index"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
          <el-select
            v-if="areaList.length > 0"
            style="width:140px"
            size="small"
            v-model="from.area"
            placeholder="请选择县/区"
          >
            <el-option
              v-for="(item, index) in areaList"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:100%" label="详细地址" prop="store_address">
          <el-input
            style="width:470px"
            size="small"
            placeholder="请填写详细地址"
            v-model="from.store_address"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit"
            @click="submitForm('ruleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- <map-content
        style="margin-bottom:20px"
        @location="location"
      ></map-content> -->
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="`${$imgUrl}${showImg}`" />
    </el-dialog>
  </div>
</template>
<script>
let req = /^[1][0,3,4,5,7,8][0-9]{9}$/;
function phoneRe(rule, value, callback) {
  if (!req.test(value)) {
    callback(new Error("请输入正确的手机号"));
  } else {
    callback();
  }
}
import city from "./json/index.json";
import { getDealis } from "@/api/shop.js";
import elUploads from "@/components/elUpload";
// import mapContent from "@/components/map";
export default {
  name: "shopIndex",
  data() {
    return {
      cityList: city.city,
      areaList: [],
      showImg: "",
      dialogVisible: false,
      from: {
        store_name: "",
        store_thumb: "",
        store_bgimg: "",
        store_license: "",
        province: "山西省",
        city: "",
        area: "",
        store_address: "",
        phone: "",
        startTime: "08:00",
        endTime: "21:00"
      },
      rules: {
        phone: [{ required: true, validator: phoneRe, trigger: "blur" }],
        area: {
          required: true,
          message: "请选择地区",
          trigger: "blur"
        },
        store_name: {
          required: true,
          message: "请输入店铺名称",
          trigger: "blur"
        },
        store_address: {
          required: true,
          message: "请输入详细地址",
          trigger: "blur"
        },
        store_thumb: {
          required: true,
          message: "请输入选择店铺log",
          trigger: "blur"
        },
        store_bgimg: {
          required: true,
          message: "请输入选择店铺背景图片",
          trigger: "blur"
        },
        startTime: {
          required: true,
          message: "请选择营业时间",
          trigger: "blur"
        },
        endTime: {
          required: true,
          message: "请选择营业时间",
          trigger: "blur"
        }
        // store_license: {
        //   required: true,
        //   message: "请输入选择店铺营业执照",
        //   trigger: "blur"
        // }
      },
      input: "",
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
    location(e) {
      console.log(e);
    },
    success(e) {
      this.from[e.type] = e.imgUrl;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.from;
          data.store_open_at = `${this.from.startTime}-${this.from.endTime}`;
          getDealis("post", data).then(res => {
            if (res.code == 200) {
              this.$message.success("提交成功");
              setTimeout(() => {
                this.$router.go(-1);
              }, 1500);
            } else {
              this.$message.error("提交失败");
            }
          });
        } else {
          return false;
        }
      });
    },
    getDealis() {
      getDealis("get", {}).then(res => {
        if (res.code == 200) {
          for (let i in res.data) {
            for (let j in this.from) {
              if (j == "province") {
                this.from[j] = "山西省";
              } else if (j == i) {
                this.from[j] = res.data[i];
              }
            }
          }
        }
        this.from["startTime"] = res.data.store_open_at.split("-")[0];
        this.from["endTime"] = res.data.store_open_at.split("-")[1];
        this.areaList = this.cityList.filter(
          item => item.name == this.from["city"]
        )[0].area;
      });
    },
    select(e) {
      this.areaList = this.cityList.filter(item => item.name == e)[0].area;
      this.from["area"] = "";
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
.title {
  font-weight: 600;
  padding: 15px 0;
  margin-bottom: 10px;
  @include border(3, solid, #ebeef5);
}
.submit {
  @include clearBtn;
}
.logo {
  width: 150px;
  height: 150px;
}
.bg {
  width: 240px;
  height: 160px;
}
</style>
