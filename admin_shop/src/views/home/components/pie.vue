<template>
  <div class="pie">
    <el-card class="line_card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" /><span>类别统计</span>
      </div>
      <!-- <div style="background:#fff"> -->
      <div id="myPie" :style="{ height: height, width: width }"></div>
      <!-- </div> -->
    </el-card>
  </div>
</template>
<script>
import Mixin from "@/views/mixin/index";
import echarts from "echarts";
export default {
  name: "pie",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "280px"
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {},
  computed: {},
  components: {},
  mixins: [Mixin],
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("myPie"), "macarons");
      this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
        backgroundColor: "#fff",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "类别统计",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 274, name: "联盟广告" },
              { value: 235, name: "视频广告" },
              { value: 400, name: "搜索引擎" }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              normal: {
                textStyle: {
                  color: "#000"
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "#000"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: "#c23531",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0)"
              }
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/componts.scss";
.circle {
  margin-right: 10px;
  width: 14px;
  color: $Text;
  height: 14px;
}
</style>