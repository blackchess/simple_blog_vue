import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// create an axios instance
const userService = axios.create({
	baseURL: "http://127.0.0.1:8082",
  //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
})

userService.interceptors.request.use(
  config => {
    config.headers['Bearer'] = getToken()
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

//响应拦截器
userService.interceptors.response.use(
  response => {
    const res = response.data
		//响应码错误（200）
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
		//token过期重新登录响应
    // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return Promise.resolve(res);
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

export default userService
