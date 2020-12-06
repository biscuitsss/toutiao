<template>
  <div class="article">
    <el-card class="top-card">
      <div slot="header" class="clearfix">
        <!--    面包屑 start-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--    面包屑 end-->
      </div>
      <div class="text item">
        <!--    查询表单 start-->
        <el-form ref="form" :model="form" label-width="60px" size="mini">
          <el-form-item label="状态：">
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道：">
            <el-select v-model="channelId" placeholder="请选择">
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
          <el-form-item label="日期：">
            <el-date-picker
              v-model="rangeDate"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="loading"
              @click="loadArticle(1)"
            >查询</el-button>
          </el-form-item>
        </el-form>
        <!--    查询表单 end-->
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 {{totalCount}} 条结果：</span>
      </div>
      <div class="text item">
        <!--    table start-->
        <el-table
          :data="article"
          style="width: 100%"
          class="article-table"
          v-loading="loading">
          <el-table-column
            label="封面">
            <template slot-scope="scope">
              <el-image
                style="width: 60px; height: 60px"
                :src="scope.row.cover.images[0]"
                fit="cover"
                lazy>
<!--                <div slot="error" class="image-slot">-->
<!--                  <i class="el-icon-picture-outline fail-icon"></i>-->
<!--                </div>-->
              </el-image>
<!--              <img-->
<!--                v-if="scope.row.cover.images[0]"-->
<!--                class="article-cover"-->
<!--                :src="scope.row.cover.images[0]" alt="">-->
<!--              <img-->
<!--                v-else-->
<!--                class="article-cover"-->
<!--                src="./no-cover.jpg"-->
<!--                alt="">-->
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-tag :type="articleStatus[scope.row.status].type">
                {{articleStatus[scope.row.status].text}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                circle
                class="el-icon-edit"
                @click="dialogFormVisible = true"></el-button>

              <el-button
                size="mini"
                type="danger"
                circle
                class="el-icon-delete"
                @click="onDeleteArticle(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--    table end-->
        <!--    分页 start-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
          :disabled="loading"
          @current-change="onCurrentPage">
        </el-pagination>
        <!--    分页 end-->
      </div>
    </el-card>

<!--    弹框修改信息 start -->
    <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      append-to-body>
      <el-form :model="article">
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="editArticle.content"></el-input>
        </el-form-item>
        <el-form-item label="封面：" :label-width="formLabelWidth">
          <el-radio-group v-model="editArticle.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：" :label-width="formLabelWidth">
          <el-select v-model="editArticle.channel_id" placeholder="请选择">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--    弹框修改信息 end  -->
  </div>
</template>

<script>
import { getArticle, getChannel, deleteArticle } from '@/api/article'
export default {
  name: 'Article',
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: '',
      article: [],
      articleStatus: [
        { status: 0, text: '草稿', type: '' },
        { status: 1, text: '待审核', type: 'warning' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'danger' },
        { status: 4, text: '已删除', type: 'info' }
      ],
      totalCount: 0,
      pageSize: 10,
      status: null,
      channel: [],
      channelId: null,
      rangeDate: [],
      loading: true,

      dialogFormVisible: false,
      editArticle: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: ''
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    this.loadChannel()
    this.loadArticle(1)
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadArticle (page = 1) {
      this.loading = true
      getArticle({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        // console.log(res)
        const { results, total_count: totalCount } = res.data.data
        this.article = results
        this.totalCount = totalCount
        this.loading = false
      })
    },
    onCurrentPage (page) {
      this.loadArticle(page)
      // 点击的页数 console.log(page)
    },
    loadChannel () {
      getChannel().then(res => {
        // console.log(res)
        this.channel = res.data.data.channels
      })
    },
    onDeleteArticle (id) {
      this.$confirm('确定删除该文章?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id)
        deleteArticle(id.toString()).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.top-card{
  margin-bottom: 15px;
}
  .article-table{
    margin-bottom: 20px;
  }
  .article-cover{
    width: 60px;
    height: 60px;
  }
</style>
