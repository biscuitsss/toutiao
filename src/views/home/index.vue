<template>
    <el-container class="layout-container">
      <el-aside class="aside" width="auto">
        <Aside class="layout-aside" :isCollapse="isCollapse"></Aside>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-title">
            <i :class="{
            'el-icon-s-fold':!isCollapse,
            'el-icon-s-unfold':isCollapse
            }"
               @click="isCollapse = !isCollapse"></i>
            <span>自制头条管理系统</span>
          </div>
          <el-dropdown>
        <span class="el-dropdown-link">
          <div class="right">
            <img class="pic" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
        </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main class="main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import Aside from '../../components/layout/Aside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'Layout',
  data () {
    return {
      user: {},
      isCollapse: false
    }
  },
  components: {
    Aside
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('确定退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '退出登录已取消'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .layout-container {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
  .layout-aside{
    height: 100%;
  }
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #ccc;
    .header-title{
      margin: auto 0;
    }
    .right{
      display: flex;
      align-items: center;
      cursor: pointer;
      .pic{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }

</style>
