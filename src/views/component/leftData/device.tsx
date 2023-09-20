import { defineComponent, reactive, ref, toRefs } from 'vue'
import '@/views/component/leftData/styles/device.less'
import userApi from '@/api/userApi'
import { GetUserData } from '@/utils'

export default defineComponent({
	name: 'ComponentLeftDataDevice',
	emits: ['itemClick'],
	props: {
		devlist: { type: Array } as any
	},
	setup(props, { emit }) {
		// onCretae
		const state = reactive({
			// list: [] as any
		})
		// console.log(props.devlist)
		// state.list = props.devlist
		// const reload = () => {
		// const user = GetUserData()
		// // console.log('user===', user)
		// if (user === false) return
		// const api = userApi.GetUserDataDeptList({
		// 	params: { cpn: 'p_user_data_dept_list2', pns: ['v_user_id', 'v_dept_id'], pts: [4, 4], pvs: [user.id, user.dept_id] }
		// })
		// api.then((data) => {
		// 	state.list = data
		// 	// console.log(state.list)
		// })

		// }

		// reload()
		// 点击设备 传 父页面
		const onItem = (item) => {
			emit('itemClick', item)
		}

		return {
			onItem,
			...toRefs(state)
		}
	},
	render() {
		// console.log (this.$props.devlist)
		// console.log(this.list)
		return (
			<div class="cm-device-list">
				<div class="cm-device-row z-t">
					<h6>设备列表</h6>
				</div>
				<div class="cm-device-row">
					<div class="cm-device-row__item z-title">设备名称</div>
					<div class="cm-device-row__item">设备MN</div>
					<div class="cm-device-row__item">设备状态</div>
				</div>
				{this.$props.devlist.map((item) => {
					return (
						<div class="cm-device-row" onClick={() => this.onItem(item)}>
							<div class="cm-device-row__item z-title">{item.name}</div>
							<div class="cm-device-row__item">{item.mn}</div>
							<div class="cm-device-row__item">{item.online===0?"离线":"在线"}</div>
						</div>
					)
				})}
			</div>
		)
	}
})
