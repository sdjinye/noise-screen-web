import { defineComponent, reactive, ref, toRefs } from 'vue'
import '@/views/component/leftData/styles/device.less'
import userApi from '@/api/userApi'
import { GetUserData } from '@/utils'

export default defineComponent({
	name: 'ComponentLeftDataDevice',
	emits: ['onItemClick'],
	setup(props, { emit }) {
		// onCretae
		const state = reactive({
			list: [{ title: 'K9通源大道与科技路口监控杆', mn: 'YL0912WZ002303011', status: '离线' }] as any
		})

		const reload = () => {
			const user = GetUserData()
			console.log('user===', user)
			if (user === false) return
			const api = userApi.GetUserDataDeptList({
				params: { cpn: 'p_user_data_dept_list2', pns: ['v_user_id', 'v_dept_id'], pts: [4, 4], pvs: [user.id, user.dept_id] }
			})
			api.then((data) => {
				state.list = data
			})
		}

		reload()

		const onItem = (item) => {
			emit('onItemClick', item)
		}

		return {
			onItem,
			...toRefs(state)
		}
	},
	render() {
		return (
			<div class="cm-device-list">
				<div class="cm-device-row z-t">
					<h6>设备列表</h6>
				</div>
				{this.list.map((item) => {
					return (
						<div class="cm-device-row" onClick={() => this.onItem(item)}>
							<div class="cm-device-row__item z-title">{item.dept_name}</div>
							<div class="cm-device-row__item">{item.mn}</div>
							<div class="cm-device-row__item">{item.status}</div>
						</div>
					)
				})}
			</div>
		)
	}
})
