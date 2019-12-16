<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" />
        <span>发布商品</span>
      </div>
      <el-form
        :model="goods"
        :rules="goodsRules"
        ref="goods"
        label-width="100px"
        class="demo-ruleForm"
        size="small"
      >
        <div class="size_box">
          <div style="padding-top:0" class="flex title">
            <span class="long"></span> <span>选择类别</span>
          </div>
          <el-form-item label="选择分类" prop="selectedOptions">
            <el-cascader
              style="width:300px"
              size="small"
              :options="options"
              separator=","
              :props="{ value: 'id', label: 'name', children: 'sub' }"
              v-model="goods.selectedOptions"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </div>
        <div class="size_box">
          <div class="flex title">
            <span class="long"></span> <span>基本信息</span>
          </div>
          <el-form-item style="width:400px" label="商品名称" prop="goods_name">
            <el-input
              maxlength="30"
              placeholder="请输入商品名称(最多30个字)"
              v-model="goods.goods_name"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="商品品牌" prop="brand_id">
            <el-select
              style="width:300px"
              v-model="goods.brand_id"
              placeholder="请选择商品品牌"
            >
              <el-option
                v-for="item in brandList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width:400px" label="商品描述" prop="goods_desc">
            <el-input
              placeholder="请输入商品描述"
              v-model="goods.goods_desc"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            style="width:400px"
            label="商品属性"
            prop="goods_attribute"
            :rules="{
              required: true,
              trigger: 'blur',
              message: '请选择商品属性'
            }"
          >
            <el-checkbox-group v-model="goods.goods_attribute">
              <el-checkbox label="2">新品</el-checkbox>
              <el-checkbox label="1">热销</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            style="width:600px"
            label="商品参数"
            prop="product_attributes"
            :rules="{
              required: true,
              trigger: 'blur',
              message: ''
            }"
          >
            <div>
              <el-table
                :data="goods.product_attributes"
                style="width: 100%;margin: 20px 0 20px 0"
                border
                max-height="400"
              >
                <el-table-column label="商品参数名" align="center">
                  <template slot-scope="scope">
                    <el-input
                      maxlength="30"
                      placeholder="请输入参数名"
                      v-model="scope.row.key"
                      clearable
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="商品参数值" align="center">
                  <template slot-scope="scope">
                    <el-input
                      maxlength="30"
                      placeholder="请输入参数值"
                      v-model="scope.row.keywords"
                      clearable
                    ></el-input
                  ></template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      :disabled="
                        scope.$index + 1 != goods.product_attributes.length
                      "
                      @click="
                        goods.product_attributes.push({ key: '', keywords: '' })
                      "
                      size="small"
                      >添加</el-button
                    >
                    <el-button
                      :disabled="scope.$index == 0"
                      type="text"
                      @click="goods.product_attributes.splice(scope.$index, 1)"
                      size="small"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <span style="color:red" class="fs_13"
                >（请添加商品参数；例如：商品参数名：材质，商品参数值：毛绒）</span
              >
            </div>
          </el-form-item>
        </div>
        <div class="size_box">
          <div class="flex title">
            <span class="long"></span> <span>图文描述</span>
          </div>
          <el-form-item
            style="width:700px"
            label="商品封面图"
            prop="goods_thumb"
            :rules="{
              required: true,
              trigger: 'blur',
              message: '商品封面图不能为空'
            }"
          >
            <img
              class="image_url"
              v-if="goods.goods_thumb"
              :src="`${$imgUrl}${goods.goods_thumb}`"
            />
            <el-uploads
              :tip="{
                tip: '图片建议宽高比例为1：1，小于2M',
                name: '上传封面图'
              }"
              :data="{ type: 'goods_thumb', crpop: true }"
              :example="{
                fixedNumber: [1, 1],
                autoCropWidth: 400,
                autoCropHeight: 400
              }"
              @success="success"
            ></el-uploads>
          </el-form-item>
          <el-form-item label="商品轮播图" prop="goods_images">
            <span
              class="el_col"
              v-for="(item, index) in goods.goods_images"
              :key="index"
            >
              <div class="del flex_c flex_a">
                <img
                  @click="delImg(index)"
                  src="../../assets/images/del.png"
                  alt
                />
              </div>
              <el-card :body-style="{ padding: '0px', height: '140px' }">
                <img :src="`${$imgUrl}${item}`" class="image_url" />
              </el-card>
            </span>
            <el-uploads
              :list="goods.goods_images"
              :tip="{
                tip: '图片建议宽高比例为1：1，小于2M',
                name: '上传轮播图'
              }"
              :data="{ type: 'goods_images', crpop: true }"
              :example="{
                fixedNumber: [1, 1],
                autoCropWidth: 400,
                autoCropHeight: 400
              }"
              @success="success"
            ></el-uploads>
          </el-form-item>
          <el-form-item
            style="width:800px"
            prop="goods_body"
            label="商品详情"
            :rules="{
              required: true,
              trigger: 'blur',
              message: '请填写商品详情'
            }"
          >
            <tinymce :height="300" v-model="goods.goods_body"></tinymce>
          </el-form-item>
        </div>
        <div class="size_box">
          <div class="flex title">
            <span class="long"></span> <span>销售信息</span>
          </div>
          <el-form-item style="width:400px" label="商品价格" prop="goods_price">
            <el-input
              placeholder="请输入商品价格"
              v-model="goods.goods_price"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            style="width:400px"
            label="市场价格"
            prop="goods_market_price"
          >
            <el-input
              placeholder="请输入市场价格"
              v-model="goods.goods_market_price"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            style="width:400px"
            label="商品库存"
            prop="goods_storage"
          >
            <el-input
              placeholder="请输入商品库存"
              v-model="goods.goods_storage"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            style="width:400px"
            label="虚拟销量"
            prop="goods_virtual_sales_num"
          >
            <el-input
              placeholder="请输入虚拟销量"
              v-model="goods.goods_virtual_sales_num"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            style="width:600px"
            label="商品规格"
            prop="is_mult"
            :rules="{ required: true, trigger: 'blur' }"
          >
            <el-radio-group v-model="goods.is_mult">
              <el-radio label="0">单规格</el-radio>
              <el-radio label="1">
                多规格
                <span style="color:red;font-size:12px"
                  >(* 启用多规格后,商品价格以规格商品价格为准)</span
                >
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="goods.is_mult == 1">
            <div v-for="(item, index) in goods.sku" :key="index">
              <el-form-item
                style="width:700px"
                :label="index > 0 ? '规格名' + index : '规格名'"
                :rules="{
                  required: true,
                  trigger: 'blur',
                  message: '请输入规格名'
                }"
              >
                <el-input
                  style="width:230px"
                  placeholder="请输入规格名，例如：颜色"
                  v-model="item.name"
                  clearable
                ></el-input>
                <el-button
                  size="small"
                  v-if="index > 0"
                  type="danger"
                  @click.prevent="removeDomain(item, 2)"
                  >删除规格</el-button
                >
                <span
                  v-if="index == 0"
                  style="fontSize:12px;margin:20px;color:red"
                  >(最多支持五组规格)</span
                >
              </el-form-item>

              <div v-for="(val, ind) in item.subs" :key="ind">
                <el-form-item
                  style="width:600px"
                  :label="ind == 0 ? '规格值' : ''"
                  :rules="{
                    required: true,
                    trigger: 'blur',
                    message: '请输入规格值'
                  }"
                >
                  <el-input
                    style="width:230px"
                    v-model="val.name"
                    placeholder="请输入规格值,例如：白色"
                    clearable
                  ></el-input>
                  <el-button
                    :disabled="item.subs.length != ind + 1"
                    @click.prevent="addSpec(index)"
                    >新增规格值</el-button
                  >
                  <el-button
                    type="danger"
                    v-if="ind > 0"
                    @click.prevent="addSpec(index, ind)"
                    >删除规格值</el-button
                  >
                </el-form-item>
              </div>
              <div class="flex_end flex">
                <el-button
                  v-if="index == goods.sku.length - 1"
                  style="margin:0 20px 20px 20px"
                  size="small"
                  @click="addDomain(2)"
                  >新增商品规格</el-button
                >
                <el-button
                  :disabled="skuDisabled"
                  style="margin:0 20px 20px 20px"
                  v-show="index + 1 == goods.sku.length"
                  size="small"
                  type="primary"
                  @click="sumSku"
                  >保存规格</el-button
                >
              </div>
            </div>
          </div>
          <el-table
            v-if="goods.is_mult == 1"
            :data="tableData"
            ref="specFrom"
            style="width: calc(100% - 100px);margin: 20px 0px 20px 70px"
            border
            max-height="600"
          >
            <el-table-column
              prop="spec_name"
              label="规格值"
              width="200"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="goods_price"
              label="商品价格"
              width="140"
              align="center"
            >
              <template slot-scope="scope">
                <el-form :model="scope.row" :rules="tableRules">
                  <el-form-item prop="goods_price">
                    <el-input
                      placeholder="请输商品价格"
                      size="small"
                      v-model="scope.row.goods_price"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="shi_price"
              label="市场价格"
              width="140"
              align="center"
            >
              <template slot-scope="scope">
                <el-form :model="scope.row" :rules="tableRules">
                  <el-form-item prop="goods_market_price">
                    <el-input
                      placeholder="请输市场价格"
                      size="small"
                      v-model="scope.row.goods_market_price"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="count"
              label="库存"
              width="140"
              align="center"
            >
              <template slot-scope="scope">
                <el-form :model="scope.row" :rules="tableRules">
                  <el-form-item prop="goods_storage">
                    <el-input
                      placeholder="请输商品库存"
                      size="small"
                      v-model="scope.row.goods_storage"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="缩略图" align="center">
              <template slot-scope="scope">
                <div class="flex_c flex_a">
                  <img
                    class="goodsImg"
                    v-if="scope.row.goods_thumb"
                    :src="`${$imgUrl}${scope.row.goods_thumb}`"
                  />
                  <el-upload
                    class="upload-demo"
                    accept="image/*"
                    action="https://httpbin.org/post"
                    :data="scope"
                    :show-file-list="false"
                    :http-request="httpRequest"
                  >
                    <el-button size="small" type="primary"
                      >上传缩略图</el-button
                    >
                  </el-upload>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="tableData.splice(scope.$index, 1)"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="size_box">
          <div class="flex title">
            <span class="long"></span> <span>物流信息</span>
          </div>
        </div>
        <div class="size_box">
          <div class="flex title">
            <span class="long"></span> <span>服务信息</span>
          </div>
          <el-form-item
            style="width:600px"
            label="商品服务"
            prop="goods_service"
          >
            <el-select
              style="width:300px"
              v-model="goods.goods_service"
              multiple
              placeholder="请选择服务"
            >
              <el-option
                v-for="item in service"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width:400px" label="上架时间" prop="status">
            <el-radio-group v-model="goods.status">
              <el-radio label="0">立即上架</el-radio>
              <el-radio label="1">暂不上架</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="btn">
            <el-button
              style="margin: 0px 0 0 120px;"
              type="primary"
              @click="submint('goods')"
              >保存商品</el-button
            >
          </div>
        </div>
      </el-form>
    </el-card>

    <!-- <el-form-item
          style="width:400px"
          label="运费"
          prop="freight_template"
          :rules="{ required: true, trigger: 'blur' }"
        >
          <el-radio-group v-model="goods.freight_template">
            <el-radio label="0">固定运费</el-radio>
            <el-radio label="1">运费模板</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="goods.freight_template == 1"
          prop="tmpl_Id"
          :rules="{ required: true, trigger: 'blur' }"
          style="width:700px"
        >
          <el-select
            @change="
              val => {
                selectId(val, 'tmpl_Id');
              }
            "
            v-popover:popover1
            style="width:170px"
            v-model="goods.tmpl_Id"
            placeholder="请选择运费模板"
          >
            <el-option
              v-for="item in tmpl_rule"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-popover
            ref="popover1"
            placement="bottom-start"
            width="350"
            trigger="hover"
          >
            <div>
              <span class="fs_13">
                默认运费{{ tmpl_obj.default_num }}件内{{
                  tmpl_obj.default_money
                }}元，每增加{{ tmpl_obj.num }}件，增加运费{{
                  tmpl_obj.money
                }}元</span
              >
            </div>
          </el-popover>
          <el-button
            type="primary"
            @click="toRouter('addFreight', {})"
            size="small"
            >添加运费模板</el-button
          >
        </el-form-item>
        <el-form-item
          v-if="goods.freight_template == 0"
          style="width:400px"
          prop="freight_fee"
          label="运费金额"
        >
          <el-input
            placeholder="请输入运费金额"
            v-model="goods.freight_fee"
          ></el-input>
        </el-form-item>
   -->

    <!-- <div class="btn">
      <el-button
        style="margin: 12px 0 0 100px;"
        type="primary"
        @click="submint('goods')"
        >保存商品</el-button
      >
    </div> -->
  </div>
</template>
<script>
import Tinymce from "@/components/Tiny";
import elUploads from "@/components/elUpload";
import { reduceList } from "@/utils/index.js";
import { addSku, getGoods, addGoods, edGoods, editGoods } from "@/api/goods.js";
import { editFreight } from "@/api/freight.js";
import { confirm, message } from "@/utils/element.js";
let validatorImg = (rule, value, callback) => {
  if (value.length > 0) {
    callback();
  } else {
    return callback(new Error("最少上传一张"));
  }
};
let validatorNumber = (rule, value, callback) => {
  if (value.replace(/ /g, "") == "") {
    return callback(new Error("请输入正确的格式"));
  }
  if (!isNaN(value.replace(/ /g, ""))) {
    callback();
  } else {
    return callback(new Error("请输入正确的格式"));
  }
};
let validatorFloat = (rule, value, callback) => {
  if (value == "") {
    return callback(new Error("请输入正确的格式"));
  }
  var reg = new RegExp("^[0-9]*$");
  if (reg.test(value)) {
    callback();
  } else {
    return callback(new Error("请输入正确的格式"));
  }
};
export default {
  name: "addGoods",
  components: {
    Tinymce,
    elUploads
  },
  data() {
    return {
      tmpl_obj: {},
      tmpl_Id: "",
      tmpl_rule: [], //运费列表
      service: [], //服务
      goodsId: 0,
      options: [],
      brandList: [],
      skuDisabled: false,
      tableRules: {
        goods_price: {
          validator: validatorNumber,
          trigger: "blur"
        },
        goods_storage: {
          validator: validatorFloat,
          trigger: "blur"
        },
        goods_market_price: {
          validator: validatorNumber,
          trigger: "blur"
        }
      },
      oldtTbleData: [],
      tableData: [],
      goods: {
        status: "0",
        tmpl_Id: "",
        sku: [
          {
            name: "",
            subs: [
              {
                name: ""
              }
            ]
          }
        ],
        product_attributes: [
          {
            key: "",
            keywords: ""
          }
        ],
        sales_people: "0",
        goods_attribute: [],
        goods_name: "",
        goods_desc: "",
        brand_id: "",
        top_cate_id: "",
        second_cate_id: "",
        third_cate_id: "",
        selectedOptions: [],
        goods_thumb: "",
        goods_images: [],
        goods_body: "",
        goods_price: "",
        goods_service: [],
        goods_market_price: "",
        goods_storage: "",
        goods_virtual_sales_num: "",
        is_mult: "0",
        freight_template: "0",
        freight_fee: ""
      },
      goodsRules: {
        goods_images: [
          {
            validator: validatorImg,
            trigger: "blur",
            required: true
          }
        ],
        goods_market_price: [
          {
            validator: validatorNumber,
            trigger: "blur",
            required: true
          }
        ],
        goods_price: [
          {
            validator: validatorNumber,
            trigger: "blur",
            required: true
          }
        ],
        goods_virtual_sales_num: [
          {
            validator: validatorFloat,
            trigger: "blur",
            required: true
          }
        ],
        freight_fee: [
          {
            validator: validatorFloat,
            trigger: "blur",
            required: true
          }
        ],
        goods_storage: [
          {
            validator: validatorFloat,
            trigger: "blur",
            required: true
          }
        ],
        selectedOptions: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ],
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_desc: [
          { required: true, message: "请输入商品描述", trigger: "blur" }
        ],
        brand_id: [
          { required: true, message: "请选择商品品牌", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    $route(to, from) {
      if (from.name == "addFreight") {
        to.meta.keepAlive = true;
        this.getGoods(1);
      } else {
        to.meta.keepAlive = false;
      }
    }
  },
  async mounted() {
    let that = this;
    await this.getGoods(1);
    if (this.$route.query.id) {
      this.goodsId = this.$route.query.id;
      edGoods(this.$route.query.id, {}).then(res => {
        let goods = res.data.goods;
        for (var i in goods) {
          for (let j in that.goods) {
            if (i == j && goods[i]) {
              that.goods[j] = goods[i];
            }
          }
        }
        that.goods["selectedOptions"].push(that.goods.top_cate_id / 1);
        that.goods["selectedOptions"].push(that.goods.second_cate_id / 1);
        if (that.goods.third_cate_id) {
          that.goods["selectedOptions"].push(that.goods.third_cate_id / 1);
        }
        that.goods["is_mult"] = String(that.goods["is_mult"]);
        that.goods["sales_people"] = String(that.goods["sales_people"]);
        that.goods["freight_template"] = String(that.goods["freight_template"]);
        that.goods["goods_attribute"] = that.goods["goods_attribute"].split(
          ","
        );
        that.goods["freight_fee"] = String(
          that.goods["freight_fee"].split(".")[0]
        );
        if (that.goods["freight_template"] != 0) {
          this.goods.tmpl_Id = that.goods["freight_template"] / 1;
          that.goods["freight_template"] = "1";
          this.editFreight();
        }
        if (res.data.sku) {
          this.oldtTbleData = res.data.sku;
          this.tableData = res.data.sku;
        }
        if (res.data.spec) {
          that.goods["sku"] = res.data.spec;
          that.goods["sku"].forEach(item => {
            that.$set(item, "subs", item.sub);
          });
        }
      });
    }
  },
  methods: {
    // 获取运费规则的详细信息
    editFreight() {
      editFreight("GET", this.goods.tmpl_Id, {}).then(res => {
        if (res.code == 200) {
          this.tmpl_obj = res.data.tmpl_rule;
        }
      });
    },
    selectId(e, type) {
      this.editFreight();
    },
    success(e) {
      // console.log(e);
      if (e.type == "goods_images") {
        this.goods[e.type].push(e.imgUrl);
      } else {
        this.goods[e.type] = e.imgUrl;
      }
    },
    // 获取服务 分类等列表
    getGoods(type) {
      getGoods({}).then(res => {
        if (res.code == 200) {
          this.tmpl_rule = res.data.tmpl_rule || [];
          this.brandList = res.data.brand || [];
          this.options = res.data.cate || [];
          this.service = res.data.service || [];
          if (type && this.tmpl_rule.length > 0) {
            this.goods.tmpl_Id = this.goods.tmpl_Id || res.data.tmpl_rule[0].id;
            this.editFreight();
          }
        }
      });
    },
    handleChange(e) {},
    // 添加规格
    addDomain(type) {
      if (type == 1) {
        if (this.goods.biaoqian.length > 2) {
          this.$message({
            message: "最多可添加三个标签",
            type: "warning"
          });
          return false;
        }
        this.goods.biaoqian.push({
          value: "",
          key: Date.now()
        });
      } else {
        if (this.goods.sku.length > 4) {
          this.$message({
            message: "最多可添加五个商品规格",
            type: "warning"
          });
          return false;
        }
        this.goods.sku.push({
          name: "",
          subs: [
            {
              name: ""
            }
          ]
        });
      }
    },
    addSpec(index, ind) {
      if (ind) {
        this.goods.sku[index].subs.splice(ind, 1);
      } else {
        this.goods.sku[index].subs.push({
          name: ""
        });
      }
    },
    removeDomain(item, type) {
      if (type == 2) {
        var index = this.goods.sku.indexOf(item);
        if (index > 0) {
          this.goods.sku.splice(index, 1);
        }
      }
    },
    toRouter(path, query) {
      this.$router.push({
        path: path,
        query
      });
    },
    // 保存商品规格生成商品部列表
    sumSku() {
      let that = this;
      let bol = this.goods.sku.every(item => item.name && item.subs);
      if (!bol) {
        this.$message({
          message: "请您认真填写商品规格",
          type: "warning"
        });
        return false;
      }
      let data = JSON.parse(JSON.stringify(this.goods.sku));
      data.map(item => {
        item.sub = [];
        item.subs.map(val => {
          item.sub.push(val.name);
        });
      });
      addSku({ sku: data })
        .then(res => {
          let list = res.data;
          let tableList = reduceList(list);
          tableList.forEach((item, ind) => {
            let obj = {};
            that.oldtTbleData.forEach(val => {
              if (item.spec == val.spec) {
                tableList[ind] = val;
              }
            });
            if (!item.id) {
              item.id = 0;
            }
          });
          this.tableData = tableList;
        })
        .catch(err => {});
    },
    httpRequest(file) {
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
        .post(this.$base, formData, config)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success("上传成功");
            if (file.data.type == 1) {
              this.goods.goods_images.push(res.data.data);
            } else {
              this.tableData[file.data.$index].goods_thumb = res.data.data;
            }
          } else {
            this.$message.error("上传失败" || res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("上传失败" || res.data.msg);
        });
    },
    delImg(ind) {
      this.goods.goods_images.splice(ind, 1);
    },
    beforeUpload() {
      if (this.goods.goods_images.length > 4) {
        this.$message.error("最多可以上传五张");
        return false;
      }
    },
    submint(formName) {
      let that = this;
      if (that.goods["freight_template" == 1]) {
        that.goods["freight_fee"] = 0;
      }
      let data = {};
      let bol = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          data = JSON.parse(JSON.stringify(that.goods));
          data.brand_id = that.goods.brand_id;
          data.top_cate_id = that.goods.selectedOptions[0];
          data.second_cate_id = that.goods.selectedOptions[1];
          data.third_cate_id = that.goods.selectedOptions[2]
            ? that.goods.selectedOptions[2]
            : "";
          data.goods_service = data.goods_service.join("|");
          if (that.goods.is_mult == 0) {
            data.spec = "";
          } else {
            if (this.tableData.length == 0) {
              bol = false;
            }
            this.tableData.forEach(item => {
              for (let i in item) {
                if (
                  i == "goods_thumb" ||
                  i == "goods_market_price" ||
                  i == "goods_storage" ||
                  i == "goods_price"
                ) {
                  if (item[i] == "") {
                    bol = false;
                  }
                }
              }
            });
            data.spec = that.tableData;
          }
          if (!bol) {
            that.$message.warning("请您认真填写商品信息");
            return;
          }
          delete data.selectedOptions;
          if (data.freight_template == 1) {
            data.freight_template = this.goods.tmpl_Id;
          }
          if (this.goodsId) {
            editGoods(this.goodsId, data)
              .then(res => {
                if (res.code == "200") {
                  that.$message.success("编辑成功");
                  setTimeout(() => {
                    that.toRouter("goodList", {});
                  }, 1500);
                } else {
                  that.$message.error("编辑失败");
                }
              })
              .catch(err => {
                that.$message.error("编辑失败");
              });
          } else {
            addGoods(data)
              .then(res => {
                if (res.code == "200") {
                  that.$message.success("添加成功");
                  setTimeout(() => {
                    that.toRouter("goodList", {});
                  }, 1500);
                } else {
                  that.$message.error("添加失败");
                }
              })
              .catch(err => {
                that.$message.error("添加失败");
              });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang='scss'>
@import "@/styles/componts.scss";
.box-card {
  margin-bottom: 30px;
}
.size_box {
  @include border(3, dashed, #ebeef5);
  &:nth-last-of-type(1) {
    border: none;
  }
  .el-form-item {
    padding-left: 20px;
  }
  .title {
    width: 100%;
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
}
.el-select {
  margin-right: 10px;
}
.goodsImg {
  width: 100px;
  height: 100px;
  margin-right: 5px;
}
.del {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9;
  display: none;
  img {
    width: 20px;
    height: 20px;
  }
}
.el_col:hover {
  .del {
    display: flex;
  }
}
.el_col {
  position: relative;
  display: inline-block;
  margin-right: 10px;
}
.image_url {
  width: 140px;
  height: 140px;
}
</style>

