<template>
  <div class="line">
    <el-card class="line_card">
      <div slot="header" class="clearfix">
        <svg-icon class="circle" icon-class="circle" /><span>销售额趋势图</span>
      </div>
      <div class="line_map">
        <div
          id="myChart"
          :class="className"
          :style="{ height: height, width: width }"
        ></div>
      </div>
    </el-card>
  </div>
</template>
<script>
let xList = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31
];
import Mixin from "@/views/mixin/index";
import echarts from "echarts";
// require("echarts/theme/macarons"); // echarts theme
export default {
  name: "lineEcharts",
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
      default: "330px"
    },
    newVisitis: {
      type: Object,
      required: true,
      default: {}
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
      this.chart = echarts.init(document.getElementById("myChart"), "macarons");
      this.setOptions({
        expectedData: [
          100,
          200,
          300,
          4000,
          5000,
          888,
          999,
          1120,
          324,
          34,
          4325,
          54,
          4546
        ],
        actualData: [
          1221,
          5464,
          564,
          564,
          87,
          9,
          654,
          1,
          654,
          654,
          8647,
          63,
          453,
          5345,
          634,
          5345,
          5534,
          5432,
          674
        ]
      });
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: ["{a|9月份的订单量走势图}"],
          x: "center",
          y: "top",
          textAlign: "left",
          padding: "50",
          textStyle: {
            rich: {
              a: {
                height: 10,
                color: "#000",
                fontSize: 16
              }
            }
          }
        },
        xAxis: {
          data: xList,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          right: "10",
          data: [
            {
              name: "上月",
              icon: "circle",
              backgroundColor: "yellow"
            },
            { name: "本月", icon: "circle" }
          ]
        },
        series: [
          {
            name: "上月",
            itemStyle: {
              normal: {
                color: "red",
                lineStyle: {
                  color: "red",
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",
            data: expectedData,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "本月",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "green",
                lineStyle: {
                  color: "green",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
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