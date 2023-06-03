import request from '@/http/user.request'

export function signIn(data) {
  return request({
    url: '/user/signIn',
    method: 'post',
    data
  })
}

export function signUp(data) {
  return request({
    url: '/user/signUp',
    method: 'post',
    data
  })
}

export function fetchUser(id) {
	return request({
	  url: '/user/' + id,
	  method: 'get',
	})
}

export function fetchCheckCode(param) {
	return request({
		url: '/code/phoneCode',
		param: param,
		method: 'POST',
	})
}