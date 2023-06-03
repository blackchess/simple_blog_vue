import request from '@/http/article.request.js'

export function fetchList(param) {
  return request({
    url: '/article',
    method: 'get',
    params: param
  })
}

export function fetchArticle(id) {
	return request({
	  url: '/article/' + id,
	  method: 'get'
	})
}
export function fetchLabel(query){
	return request({
	  url: '/label',
	  method: 'get',
	  params: query
	})
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}

export function handle(query) {
  return http({
    url: '/article/articleVoList',
    method: 'get',
    params: query
  })
}