<template>
    <el-container class="layout-container">
      <el-aside class="aside" width="200px">
        <Aside class="layout-aside"></Aside>
      </el-aside>
      <el-container>
        <el-header class="header">
          <Header></Header>
        </el-header>
        <el-main class="main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import Aside from '../../components/layout/Aside'
import Header from '../../components/layout/Header'

export default {
  name: 'Layout',
  components: {
    Aside, Header
  }
}
</script>

<style>
  .layout-container {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
  .aside {
    background-color: #d3dce6;
  }
  .layout-aside{
    height: 100%;
  }
  .main {
    background-color: #e9eef3;
  }
</style>
