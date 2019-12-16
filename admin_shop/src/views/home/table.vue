<template>
  <div class="container">
    <el-table
      :data="tableList"
      border
      fit
      style="width: 100%"
      :row-style="rowClass"
    >
      <el-table-column prop="id" label="id"> </el-table-column>

      <el-table-column prop="color" label="color"> </el-table-column>

      <el-table-column prop="lenght" label="lenght"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
function color16() {
  //十六进制颜色随机
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}
import Mixin from "@/views/mixin/index";
export default {
  name: "",
  data() {
    return {
      tableList: []
    };
  },
  watch: {},
  computed: {},
  components: {},
  mixins: [Mixin],
  mounted() {
    this.tableList = [
      {
        id: 1,
        lenght: "wwwwe"
      },
      {
        id: 2,
        lenght: "wwwfw"
      },
      {
        id: 5,
        lenght: "wwwfs"
      },
      {
        id: 2,
        lenght: "df"
      },
      {
        id: 5,
        lenght: "dfre"
      },
      {
        id: 3,
        lenght: "dfw"
      },
      {
        id: 3,
        lenght: "dfref"
      }
    ];
    var resule = [];
    var obj = {};
    for (let i = 0; i < this.tableList.length; i++) {
      if (!obj[this.tableList[i].id]) {
        let abc = this.tableList[i];
        abc.color = color16();
        abc.num = 1;
        resule.push(abc);
        obj[this.tableList[i].id] = true;
      } else {
        let ind = resule.findIndex(item => item.id == this.tableList[i].id);
        resule[ind].num++;
      }
    }
    console.log(resule);
    this.tableList.forEach(item => {
      resule.forEach(value => {
        if (value.id == item.id) {
          this.$set(item, "color", value.color);
          this.$set(item, "ind", value.num);
        }
      });
    });
  },
  methods: {
    rowClass(row) {
      // console.log(row);
      if (row.row.ind > 1) {
        return { "background-color": row.row.color };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>