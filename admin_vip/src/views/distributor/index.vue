<template>
  <div class="container">
    <div class="search_box">
      <div>
        <label>供应商名称</label>
        <el-input
          size="small"
          clearable
          v-model="search_from.keywords"
          placeholder="请输入供应商名称"
        ></el-input>
      </div>
      <div>
        <label>经营人姓名</label>
        <el-input
          size="small"
          clearable
          v-model="search_from.user_name"
          placeholder="请输入经营人姓名"
        ></el-input>
      </div>
      <div>
        <label>联系方式</label>
        <el-input
          size="small"
          clearable
          v-model="search_from.phone"
          placeholder="请输入联系方式"
        ></el-input>
      </div>
      <div>
        <label>供应商状态</label>
        <el-select
          size="small"
          v-model="search_from.status"
          placeholder="请选择"
          clearable
        >
          <el-option label="正常" value="1"> </el-option>
          <el-option label="禁用" value="0"> </el-option>
        </el-select>
      </div>
      <div>
        <label>注册时间</label>
        <el-date-picker
          size="small"
          v-model="search_from.is_vip_time"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="search_btn">
      <el-button size="small" @click="reset(search_from)" type="primary"
        >重置</el-button
      >
      <el-button size="small" @click="getList" type="primary">查询</el-button>
    </div>
    <el-table :data="tableData" border class="table_body" style="width: 100%">
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column prop="contact" width="120" label="联系人" align="center">
      </el-table-column>
      <el-table-column prop="phone" width="120" label="手机号" align="center">
      </el-table-column>
      <el-table-column label="店铺logo" width="120" align="center">
        <template slot-scope="scope">
          <div class="flex">
            <img
              class="goods_img"
              onerror="http://5b0988e595225.cdn.sohucs.com/images/20180118/a0163c6be9d247918669229bed6c7280.png"
              :src="scope.row.store_thumb"
              alt=""
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        prop="store_name"
        label="店铺名字"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="balance"
        width="160"
        label="店铺注册资金"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goods_sales_num"
        width="110"
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            @change="val => setStatus(val, scope)"
            v-model="scope.row.status"
            active-color="#13ce66"
            size="small"
            inactive-color="#dcdfe6"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        width="180"
        label="注册时间"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" width="180px" fixed="right" align="center">
        <template slot-scope="scope">
          <div>
            <el-button
              @click="toRouter('etditUser', { id: scope.row.id, type: 0 })"
              size="small"
              type="text"
              >编辑</el-button
            >
            <el-button
              size="small"
              @click="del(scope.row.id)"
              class="danger"
              type="text"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="page_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleSizeChange"
        :current-page.sync="page"
        :page-size="page_size"
        layout="total,prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getList, setStatus } from "@/api/distributor";
export default {
  name: "",
  data() {
    return {
      tableData: [],
      page: 1,
      total: 0,
      page_size: 10,
      search_from: {
        keywords: "",
        status: "",
        is_vip: "",
        is_vip_time: "",
        user_name: "",
        phone: ""
      }
    };
  },
  watch: {},
  computed: {},
  components: {},
  mounted() {
    this.getList();
  },
  methods: {
    setStatus(e, scope) {
      setStatus(scope.row.id, {}).then(res => {
        if (res.code == 200) {
          this.getList();
        } else {
          this.$message.error(res.msg || "操作失败");
        }
      });
    },
    getList() {
      getList(Object.assign(this.search_from, { page: this.page })).then(
        res => {
          if (res.code == 200) {
            let { data } = res;
            this.total = data.total;
            this.page_size = data.per_page;
            this.tableData = data.data;
            this.tableData.forEach(item => {
              item.status = !!item.status;
              item.is_vip = !!item.is_vip;
            });
          } else {
            this.page = 1;
            this.total = 0;
            this.tableData = [];
          }
        }
      );
    },
    handleSizeChange(e) {
      this.page = e;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "@/styles/componts.scss";
.goods_img {
  width: 100px;
  height: 100px;
}
</style>