import Api from '.'
import { ApiParams } from './types/index'

export default {
	GetDevList: (params: ApiParams) => Api('/device/list', params, { method: 'post' })
}
