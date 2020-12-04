// 基于axios封装的请求模块
import axios from 'axios'

/*
  创建一个axios实例，
  通过实例去发请求，把需要的配置配给这个实例来
 */
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 请求基地址
})

// 导出请求方法
export default request
