import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// create an axios instance
const articleService = axios.create({
	//请求地址
	baseURL: "http://localhost:8020",
  //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 50000
})

// articleService.interceptors.request.use(
//   config => {
//     if (store.getters.token) {
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// response interceptor
articleService.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default articleService
