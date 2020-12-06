// article相关请求
import request from '@/utils/request'

export const getArticle = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

// 获取频道数据
export const getChannel = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const deleteArticle = (id) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${id}`
  })
}

// 新建（发布）文章
export const pubArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    prams: {
      draft
    },
    data
  })
}
