import Api from '.'
import { ApiParams } from './types/index'

export default {
	callp: (params: ApiParams) => Api('/common/callp', params, { method: 'post' })
}
