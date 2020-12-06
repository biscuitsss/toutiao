<template>
      <el-form
        ref="form"
        :model="article"
        label-width="60px"
        size="mini">
        <el-form-item label="标题：">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="article.channel_id" placeholder="请选择">
            <el-option
              label="全部"
              :value="null">
            </el-option>
            <el-option
              :label="choose.name"
              :value="choose.id"
              v-for="(choose,index) in channel"
              :key="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发布</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
</template>

<script>
import { pubArticle } from '@/api/article'
export default {
  name: 'pubcontent',
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: ''
      }
    }
  },
  props: {
    channel: {
      type: Array,
      require: true
    }
  },
  methods: {
    onPublish (draft) {
      pubArticle(this.article, draft).then(res => {
        this.$message({
          message: `${draft ? '存入草稿' : '发表'}成功`,
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
