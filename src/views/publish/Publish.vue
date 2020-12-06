<template>
    <div class="publish">
      <el-card class="top-card">
        <div slot="header" class="clearfix">
          <!--    面包屑 start-->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>发布文章</el-breadcrumb-item>
          </el-breadcrumb>
          <!--    面包屑 end-->
        </div>

        <PubContent :channel="channel"></PubContent>
      </el-card>
    </div>
</template>

<script>
import { getChannel } from '@/api/article'
import PubContent from '../../components/publish/PubContent'

export default {
  name: 'Publish',
  data () {
    return {
      channel: []
    }
  },
  components: {
    PubContent
  },
  created () {
    this.loadChannel()
  },
  methods: {
    loadChannel () {
      getChannel().then(res => {
        this.channel = res.data.data.channels
      })
    }
  }
}
</script>

<style scoped>

</style>
