<template>
  <div class="container">
    <statistics :order="{}" />
    <div class="content">
      <div class="left">
        <line-echarts class="line_echarts" :newVisitis="{}" />
        <matter />
      </div>
      <div class="right"><pie /><good-list /></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import statistics from "./components/statistics";
import matter from "./components/matter";
import lineEcharts from "./components/line";
import goodList from "./components/goodList";
import pie from "./components/pie";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  },
  components: {
    statistics,
    matter,
    lineEcharts,
    goodList,
    pie
  }
};
</script>

<style lang="scss" scoped>
.content {
  > div {
    display: flex;
  }
  .left {
    height: 427px;
    .line_echarts {
      min-width: 450px;
      width: 65%;
    }
    .matter {
      margin: 0 0 0 2%;
      min-width: 300px;
      width: 33%;
    }
  }
  .right {
    margin: 25px 0 0 0;
    .pie {
      width: 30%;
    }
    .goodsList {
      margin: 0 0 0 2%;
      width: 68%;
    }
  }
}
</style>
