<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="pic">
      <img src="@/assets/common/logoone.png" alt="">
    </div>

    <div class="right-menu">
      <el-row>
        <el-col :span="5">
          <img src="@/assets/common/user.png" alt="">
        </el-col>
        <el-col :span="14">欢迎您,{{ userInfo.roleName }}</el-col>
        <el-col :span="5">
          <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">

            <el-button class="el-icon-caret-bottom" @click="loginout">退出</el-button>
          </el-tooltip>
        </el-col>
      </el-row>
    </div>
  </div></template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    //   Breadcrumb,
    // Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    loginout() {
      this.$store.commit('user/REMOVE_TOKEN')
      this.$store.commit('user/REMOVE_USER_INFO')
      this.$store.commit('user/REMOVE_USERID')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: fixed;
  left: 0;
  background: url('~@/assets/common/backgroundone.png');
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .pic{
    margin-top: 6px;
    margin-left: 15px;
    position: absolute;
    top: 4px;
    width: 88px;
    height: 36px;
    img{
      width: 100%;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    margin-right: 34px;
    width: 240px;
    float: right;
    height: 100%;
    line-height: 60px;
    .el-button{
      background:#5373e0;
      border: none;
    }
    .el-col-14{
    text-align: center;
    }
    .el-col-5{
      color:#fff;
      .el-button{
        background: transparent;
        color: #fff;
      }
      img{
        padding-top: 12px;
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

</style>
