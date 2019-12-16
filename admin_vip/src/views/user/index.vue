<template>
  <div class="container">
    <div class="search_box">
      <div>
        <label>用户名称</label>
        <el-input
          size="small"
          clearable
          v-model="search_from.keywords"
          placeholder="请输入用户名称"
        ></el-input>
      </div>
      <div>
        <label>会员状态</label>
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
        <label>是否为Vip</label>
        <el-select
          size="small"
          v-model="search_from.is_vip"
          placeholder="请选择"
          clearable
        >
          <el-option label="vip" value="1"> </el-option>
          <el-option label="非Vip" value="0"> </el-option>
        </el-select>
      </div>
      <div>
        <label>会员到期时间</label>
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
      <el-table-column prop="username" width="120" label="昵称" align="center">
      </el-table-column>
      <el-table-column label="头像" width="120" align="center">
        <template slot-scope="scope">
          <div class="flex">
            <img
              class="goods_img"
              onerror="http://5b0988e595225.cdn.sohucs.com/images/20180118/a0163c6be9d247918669229bed6c7280.png"
              :src="scope.row.avatar"
              alt=""
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120" label="手机号码" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone || "暂无" }}
        </template>
      </el-table-column>
      <el-table-column prop="openid" width="160" label="openId" align="center">
      </el-table-column>
      <el-table-column prop="jifen" width="140" label="代金券" align="center">
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
      <el-table-column label="是否为会员" width="110" align="center">
        <template slot-scope="scope">
          <el-switch
            size="small"
            v-model="scope.row.is_vip"
            active-color="#13ce66"
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
      <el-table-column
        prop="is_vip_time"
        width="180"
        label="到期时间"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.is_vip_time || "暂无" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px" fixed="right" align="center">
        <template slot-scope="scope">
          <div>
            <el-button
              size="small"
              @click="toRouter('etditUser', { id: scope.row.id, type: 1 })"
              type="text"
              >查看</el-button
            >
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
import { user } from "@/api/user";
export default {
  name: "goodsList",
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
        is_vip_time: ""
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
      user.setStatus(scope.row.id, {}).then(res => {
        if (res.code == 200) {
          this.$message.success("操作成功");
        } else {
          this.$message.warning(res.msg || "操作失败");
        }
      });
    },
    del(e) {
      this.$alert("您确认删除该用户么？", {
        confirmButtonText: "确认",
        showCancelButton: "取消",
        type: "warning"
      })
        .then(() => {
          user.delUser(e, {}).then(res => {
            if (res.code == 200) {
              this.$message.success("操作成功");
              this.getList();
            } else this.$message.error(res.msg || "操作失败");
          });
        })
        .catch(() => {
          console.log(2);
        });
    },
    getList() {
      user
        .getUser(Object.assign(this.search_from, { page: this.page }))
        .then(res => {
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
        });
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