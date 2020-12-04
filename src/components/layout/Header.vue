<template>
    <div class="header">
      <div class="header-title">
        <i class="el-icon-s-fold"></i>
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
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'Header',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">
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
