<template>
  <div class="container">
    <div class="search_box flex flex_sb" style="margin:20px 0">
      <div>
        <el-button
          @click="toRouter('addClfiy', {})"
          type="primary"
          class="theme"
          size="small"
          >添加分类</el-button
        >
        <!-- <el-button
          type="primary"
          @click="toRouter('goodsClassify', {})"
          size="small"
          >商品归类</el-button
        > -->
      </div>
    </div>
    <el-table
      :data="tableData"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="name" label="分类名称" align="center">
      </el-table-column>
      <el-table-column label="分类图片" align="center">
        <template slot-scope="scope">
          <img class="goodsImg" :src="`${$imgUrl}${scope.row.icon}`" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope>
          2019-10-12 12:59:59
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="toRouter('addClfiy', scope.row)"
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
  </div>
</template>
<script>
import { confirm } from "@/utils/element.js";
import { getList, delClfiy } from "@/api/shop.js";
export default {
  name: "shopIndex",
  data() {
    return {
      loading: true,
      input: "",
      tableData: []
    };
  },
  filters: {},
  // 自定义指令
  directives: {},
  mounted() {
    this.getList();
  },
  methods: {
    toRouter(path, e) {
      console.log(e);
      this.$router.push({
        //核心语句
        path: path, //跳转的路径
        query: {
          //路由传参时push和query搭配使用 ，作用时传递参数
          id: e.id ? e.id : 0
        }
      });
    },
    handleReserve(e) {
      return e.id;
    },
    getList() {
      getList({}).then(res => {
        if (res.code == 200) {
          res.data.forEach(item => {
            if (item.sub) {
              item.children = item.sub;
              item.children.forEach(value => {
                value.name = `${item.name} > ${value.name}`;
              });
            }
          });
          this.tableData = res.data;
        } else {
          this.tableData = [];
        }
      });
    },
    dele(e) {
      if (e.sub) {
        this.$message.error("该分类下面有子分类，不能直接删除");
        return;
      }
      confirm({ content: "您确认删除么?" }).then(res => {
        if (res == "1") {
          console.log(1);
          delClfiy(e.id, {}).then(re => {
            if (re.code == 200) {
              this.getList();
            } else {
              this.$message.error("删除失败");
            }
          });
        }
      });
    },
    submit(e) {}
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/componts.scss";
.goodsImg {
  width: 100px;
}
.box_expand {
  .expand {
    border-bottom: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    > div {
      // box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #ebeef5;
      padding: 12px 0;
      flex: 1;
    }
    > div:nth-last-of-type(1) {
      border-right: none;
    }
  }
  .expand:nth-last-of-type(1) {
    border-bottom: none;
  }
}
</style>
