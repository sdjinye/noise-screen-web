import Api from '.'
import { ApiParams } from './types/index'

export default {
	GetUserDataDeptList: (params: ApiParams) => Api('/common/callp', params, { method: 'post' })
}
