import axios from 'axios'
// import store from '/@/store/'
import { message } from 'ant-design-vue'
import { ApiParams, ApiData } from './types/index'
// import { isUndefined } from '../utils'
import { Method } from 'axios'
// import valid from '../utils/valid'
import router from '../router'

const isUndefined = (context: any): boolean => {
	return typeof context === 'undefined'
}
const API_URL = 'http://device6.jinyeins.com:16479/'
const development = process.env.NODE_ENV === 'development'

//创建axios的一个实例
const service = axios.create({
	baseURL: development ? API_URL : API_URL,
	timeout: 20000000
})

export default <T>(url: string, params: ApiParams = {}, inputParams: ApiParams = {}): Promise<any> => {
	const defaultParams = { method: 'get', params: {} }
	params = Object.assign(defaultParams, params, inputParams)
	const method: Method = typeof params.method === 'undefined' ? 'get' : params.method

	// params.params = Object.assign(params.params, inputParams.params)
	// 处理url中的变量
	const ajaxParams: Record<string, any> = {}
	if (typeof params.params !== 'undefined' && Object.keys(params.params).length > 0) {
		for (const key in params.params) {
			const value = params.params[key]
			if (url.indexOf(`:${key}`) > -1) {
				url = url.replaceAll(`:${key}`, value)
			} else {
				if (typeof value === 'boolean') {
					ajaxParams[key] = value ? 1 : 0
				} else {
					ajaxParams[key] = value
				}
			}
		}
	}

	const changeLoading = (state: boolean = false) => {
		if (typeof params.loading === 'function') {
			params.loading(state)
		} else {
			// store.commit('app/changeLoading', state)
		}
	}

	return new Promise((resolve, reject) => {
		const useReject = (errMsg: string, data: any = {}) => {
			if (typeof data.response === 'undefined') {
				return
			}
			reject(data.response.data)
			if (errMsg === 'login timeout') {
				// store.commit('user/login', '')
				router.push('/login')
				localStorage.removeItem('token')
				errMsg = '登录超时，请重新登录'
			}
			if (params.autoErrorPrompt === true || isUndefined(params.autoErrorPrompt)) message.error(errMsg)
		}

		const checkUrl = url.replace('http://', '').replace('https://', '')
		const patt = /:[A-Za-z0-9]{0,100}/i

		const data = patt.exec(checkUrl)
		if (data !== null && typeof data[0] !== 'undefined') {
			useReject(`找不到变量${data[0]}，请检查输入变量`)
			return
		}

		// 请求前检查规则
		if (typeof inputParams.rule !== 'undefined' && typeof params.params !== 'undefined') {
			// for (const key in inputParams.rule) {
			// 	const item = inputParams.rule[key]
			// 	const errMsg = valid(params.params[key], item.rule, item.desc)
			// 	if (errMsg.length >= 1) {
			// 		useReject(errMsg[0])
			// 		console.error(errMsg[0], { params, inputParams, url })
			// 		return
			// 	}
			// }
		}

		// 100ms以内完成的请求不显示Loading
		const deferrdLoadingTimer = setTimeout(() => changeLoading(true), 100)
		// changeLoading(true)

		const dataMethod: Method[] = typeof params['dataMethod'] !== 'undefined' ? params['dataMethod'] : ['post', 'patch']

		service({
			url: url,
			method: method,
			headers: {
				Authorization: localStorage.getItem('device6.jinyeins.com:16479/token')
			},
			params: dataMethod.indexOf(method) === -1 ? ajaxParams : [],
			data: dataMethod.indexOf(method) > -1 ? ajaxParams : []
		}).then(
			(data: any) => {
				clearTimeout(deferrdLoadingTimer)

				// const apiData: ApiData<T> = data.data
				// const state = !isUndefined(apiData.state) && apiData.state === true

				if ((data.status >= 200 && data.status < 300) || data.status === 303) {
					resolve(data.data)
				} else if (data.status >= 400 && data.status < 500) {
					useReject('无法解析服务器数据')
				} else {
					useReject('服务器出现未知错误 errCode:' + data.status, data)
				}
			},
			(error) => {
				clearTimeout(deferrdLoadingTimer)
				changeLoading(false)
				if (typeof error.response === 'undefined') {
					useReject('接口请求失败，请检查联网情况后再试', error)
					return
				}
				const apiData = error.response.data
				const message = isUndefined(apiData.message) ? `接口请求失败，请检查联网情况后再试` : apiData.message
				useReject(message, error)
			}
		)
	})
}

// 400 Bad Request：服务器不理解客户端的请求，未做任何处理。
// 401 Unauthorized：用户未提供身份验证凭据，或者没有通过身份验证。
// 403 Forbidden：用户通过了身份验证，但是不具有访问资源所需的权限。
// 404 Not Found：所请求的资源不存在，或不可用。
// 405 Method Not Allowed：用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内。
// 410 Gone：所请求的资源已从这个地址转移，不再可用。
// 415 Unsupported Media Type：客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式。
// 422 Unprocessable Entity ：客户端上传的附件无法处理，导致请求失败。
// 429 Too Many Requests：客户端的请求次数超过限额。
// 2.5 5xx 状态码

// GET: 200 OK
// POST: 201 Created
// PUT: 200 OK
// PATCH: 200 OK
// DELETE: 204 No Content
// 202 Accepted task 异步出

// GET：读取（Read）
// POST：新建（Create）
// PUT：更新（Update）
// PATCH：更新（Update），通常是部分更新
// DELETE：删除（Delete）
