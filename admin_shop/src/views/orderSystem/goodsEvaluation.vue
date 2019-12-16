<template>
  <div class="container">
    <div class="search_box flex flex_sb">
      <div>
        <span>订单编号:</span>
        <el-input
          style="width:180px"
          size="small"
          placeholder="请输入订单编号"
          prefix-icon="el-icon-search"
          v-model="goodsSearch.order_id"
        ></el-input>
      </div>
      <div>
        <span>商品名称:</span>
        <el-input
          style="width:180px"
          size="small"
          placeholder="请输入商品名称"
          prefix-icon="el-icon-search"
          v-model="goodsSearch.goods_name"
        ></el-input>
      </div>
      <div>
        <span>评价类型:</span>
        <el-select
          size="small"
          v-model="goodsSearch.type"
          placeholder="请选择评价类型"
        >
          <el-option label="全部" value="0"></el-option>
          <el-option label="好评" value="1"></el-option>
          <el-option label="一般" value="2"></el-option>
          <el-option label="差评" value="3"></el-option>
        </el-select>
      </div>
      <div>
        <span>评价日期:</span>
        <el-date-picker
          size="small"
          v-model="goodsSearch.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
    </div>
    <div class="btn_btn">
      <el-button
        type="primary"
        class="submit"
        style="margin-right:10px"
        size="small"
        @click="getCommentList"
        >查询</el-button
      >
      <el-button size="small" @click="reset(goodsSearch)">重置</el-button>
    </div>
    <el-tabs v-model="statuActive" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in statusList"
        :key="item.id"
        :label="item.name"
        :name="String(item.id)"
      ></el-tab-pane>
    </el-tabs>
    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      :data="tableData"
      style="width: 100%"
      :row-key="handleReserve"
      border
      max-height="600"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="goods.goods_name"
        label="商品名称"
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="user.username"
        label="评论人"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="created_at"
        label="评论时间"
        width="170"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="goods_price"
        label="评价"
        width="140"
        align="center"
      >
        <template slot-scope="scope">
          {{
            scope.row.score > 4 ? "好评" : scope.row.score > 2 ? "一般" : "差评"
          }}
        </template>
      </el-table-column>
      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">
          <div class="flex flex_a">
            <!-- <img
              style="width:100px;height:60px"
              class="goodsImg"
              v-if="scope.row.goods_thumb"
              :src="scope.row.goods_thumb"
            /> -->
            <span style="margin:0 0 0 10px">{{ scope.row.content }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="scope.row.status == 1"
            @click="
              (commentDealis = scope.row),
                (type = 2),
                (centerDialogVisible = true)
            "
            size="small"
            >查看</el-button
          >
          <el-button
            v-if="scope.row.status == 0"
            type="text"
            @click="
              (commentDealis = scope.row),
                (type = 1),
                (centerDialogVisible = true)
            "
            size="small"
            >回复</el-button
          >
          <!-- <el-button type="text" @click="del(scope.row)" size="small"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <div class="block page_box flex_c flex_a">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleSizeChange"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="total,prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 回复 -->
    <el-dialog
      :title="type == 1 ? '商家回复' : '用户评论'"
      :visible.sync="centerDialogVisible"
      width="40%"
      top="20vh"
      center
    >
      <div v-if="type == 1 && commentDealis.user" class="content">
        <div class="fs_15">
          <span>{{ commentDealis.user.username }} 评论：</span>
          <span>{{ commentDealis.created_at }} </span>
        </div>
        <div class="fs_15 lh15">{{ commentDealis.content }}</div>
        <div>商家回复:</div>
        <textarea v-model="content"></textarea>
      </div>
      <div v-if="type == 2" class="content">
        <div class="flex flex_a comment">
          <span>评分:</span>
          <el-rate
            style="margin:0"
            v-model="commentDealis.score"
            disabled
          ></el-rate>
        </div>

        <div class="flex comment">
          <span>评论时间:</span>
          <div>{{ commentDealis.created_at }}</div>
        </div>
        <div class="flex comment">
          <span>评论内容:</span>
          <div>{{ commentDealis.content }}</div>
        </div>
        <div class="flex comment">
          <span>回复时间:</span>
          <div>{{ commentDealis.comment.created_at }}</div>
        </div>
        <div class="flex comment">
          <span>回复内容:</span>
          <div>
            {{ commentDealis.comment.content }}
          </div>
        </div>
      </div>
      <div v-if="type == 1" slot="footer" class="dialog-footer">
        <el-button
          @click="centerDialogVisible = false"
          style="width:120px"
          size="small"
          >取消</el-button
        >
        <el-button
          @click="reply"
          type="primary"
          style="width:120px;margin: 0 0 0 20px"
          size="small"
          >确认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { confirm, message } from "@/utils/element.js";
import { getCommentList, replay } from "@/api/goods.js";
import Mixin from "@/views/mixin/index";
export default {
  mixins: [Mixin],
  name: "goodsEvaluation",
  data() {
    return {
      content: "",
      commentDealis: {},
      rate: 4,
      centerDialogVisible: false,
      statuActive: "99",
      statusList: [
        { name: "全部", id: "99" },
        { name: "已回复", id: "1" },
        { name: "未回复", id: "0" }
      ],
      goodsSearch: {
        goods_name: "",
        order_id: "",
        type: "0",
        time: []
      },
      page: 1,
      total: 0,
      pageSize: 1,
      tableData: [],
      type: 1 //查看2 或者回复1
    };
  },
  mounted() {
    this.getCommentList();
  },
  methods: {
    getCommentList() {
      let data = this.goodsSearch;
      data.status = this.statuActive;
      data.page = this.page;
      // console.log(data);
      getCommentList(data).then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.total = res.data.total;
          this.pageSize = res.data.per_page;
          this.tableData = res.data.data;
        } else {
          this.total = 0;
          this.pageSize = 1;
          this.tableData = [];
        }
      });
    },
    handleClick(e) {
      this.statuActive = e.name;
      this.getCommentList();
    },
    toRouter(path, row) {
      this.$router.push({
        path: path,
        query: {}
      });
    },
    // 回复
    reply() {
      if (this.content == "") {
        this.$message.warning("请您填写回复内容");
      }
      replay(this.commentDealis.id, { content: this.content }).then(res => {
        if (res.code == 200) {
          this.getCommentList();
          this.centerDialogVisible = false;
          this.content = "";
        } else {
          this.$message.error(res.msg || "操作失败");
        }
      });
    },
    // 删除
    del(e) {
      confirm({ content: "您确认删除改评论么?" }).then(res => {
        if (res == "1") {
          message({ msg: "删除成功" });
        }
      });
    },
    // 多选唯一标识
    handleReserve(e) {
      return e.id;
    },
    // 分页
    handleSizeChange(e) {
      this.page = e;
      this.getCommentList();
    }
  }
};
</script>

<style scoped lang='scss'>
@import "@/styles/componts.scss";
.submit {
  @include clearBtn;
}
.text {
  color: $Text;
}
.search_box {
  font-size: 14px;
  flex-wrap: wrap;
  > div {
    margin: 0 40px 20px 0;
  }
}
.btn_btn {
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
.content {
  div {
    margin-bottom: 10px;
  }
  textarea {
    width: 100%;
    height: 100px;
    resize: none;
  }
}

// .comment {
//   line-height: 1.6;
//   span:nth-of-type(1) {
//     width: 70px;
//     flex-shrink: 0;
//     margin-right: 10px;
//     text-align: right;
//   }
// }
</style>

