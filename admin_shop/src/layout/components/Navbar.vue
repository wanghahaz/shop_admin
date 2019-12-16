<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown trigger="click">
        <div class="tip cursor">
          <i style="color:#bfbfbf" class="el-icon-bell"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item> 您有新的退款消息</el-dropdown-item>
          <el-dropdown-item> 您有新的订单消息</el-dropdown-item>
          <el-dropdown-item> 您有新的商品消息</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
      <div class="shopName fs_15">
        <span>{{ name }}</span>
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="bottom cursor">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/shop/index">
            <el-dropdown-item>
              店铺信息
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background: #30373e;
  padding-top: 5px;
  height: 60px;
  overflow: hidden;
  position: relative;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .shopName {
    color: #bfbfbf;
    margin: 0 10px;
  }
  .tip {
    margin: 2px 35px 0 0;
    line-height: 50px;
    display: inline-block;
    font-size: 22px;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    line-height: 50px;
    margin-right: 20px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
