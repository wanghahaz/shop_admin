<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" />
        <span>运费策略</span>
      </div>
      <el-button
        type="primary"
        style="margin:0 0 20px 0"
        @click="toRouter('addMarket', {})"
        size="small"
        >添加策略</el-button
      >
      <el-table :data="tableData" row-key="id" border>
        <el-table-column prop="name" label="策略名称" align="center">
        </el-table-column>
        <el-table-column prop="content" label="策略内容" align="center">
        </el-table-column>
        <el-table-column label="设置默认" align="center">
          <template slot-scope="scope">
            <el-switch
              inactive-color="#b2b2b2"
              v-model="scope.row.default"
              @change="
                e => {
                  switchTab(e, scope);
                }
              "
              active-color="#13ce66"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="toRouter('addMarket', scope.row)"
              size="small"
              >编辑</el-button
            >
            <el-button
              type="text"
              class="del"
              @click="dele(scope.row)"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import Mixin from "@/views/mixin/index";
export default {
  name: "marketIndex",
  data() {
    return {
      tableData: [
        { id: 1, default: true, name: "策略一", content: "满100包邮" }
      ]
    };
  },
  watch: {},
  computed: {},
  components: {},
  mixins: [Mixin],
  mounted() {},
  methods: {
    dele(e) {},
    switchTab(e, scope) {
      let that = this;
      let $index = scope.$index;
      this.tableData[$index].default = !e;
      this.$alert(`将${scope.row.name}设置为默认后，将适用于全店商品`, "提示", {
        confirmButtonText: "确定",
        center: true,
        callback: action => {
          if (action == "confirm") {
            that.tableData[$index].default = e;
          } else {
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/componts.scss";
</style>