import { defineComponent, reactive, ref, toRefs } from 'vue'
import Box from '@/views/component/box'
import '@/views/component/leftData/styles/overview.less'
import Cycle from '@/views/component/cycle'
import untilApi from '@/api/untilApi'
import { GetUserData } from '@/utils'
export default defineComponent({
	name: 'ComponentLeftDataOverview',

	setup() {
		const state = reactive({
			// list: [] as any,
			onlienNum: 0.0,
			offlineNum: 0.0,
			allNum: 0.0,

			onlinePre: 0.0,
			offlinePre: 0.0
		})

		const reload = () => {
			const user = GetUserData()
			console.log('user===', user)
			if (user === false) return

			const api = untilApi.callp({
				params: { cpn: 'p_user_device_count', pns: ['v_user_id', 'v_dept_id'], pts: [-5, 4], pvs: [user.id, user.dept_id] }
			})
			api.then((data) => {
				data.forEach((item) => {
					if (item.online === 0) {
						state.offlineNum = item.count
					}
					if (item.online === 1) {
						state.onlienNum = item.count
					}
				})
				state.allNum = state.offlineNum + state.onlienNum
				state.onlinePre = state.onlienNum / state.allNum
				state.offlinePre = state.offlineNum / state.allNum
				// console.log(state.onlinePre)
				// console.log(state.offlinePre)
			})
		}

		reload()

		return {
			...toRefs(state)
		}
	},
	render() {
		return (
			<Box title="设备概述">
				<div class="cm-left-data__overview">
					<div class="item">
						<Cycle color="#39baff" color2="#aee3ff" progress={1} />
						<h2>{this.allNum}</h2>
						<span>总数量</span>
					</div>
					<div class="item">
						<Cycle color="#33ff5e" color2="#b3ffc3" progress={this.onlinePre} />
						<h2>{this.onlienNum}</h2>
						<span>在线设备</span>
					</div>
					<div class="item">
						<Cycle color="#ff0000" color2="#ff9280" progress={this.offlinePre} />
						<h2>{this.offlineNum}</h2>
						<span>离线设备</span>
					</div>
				</div>
			</Box>
		)
	}
})
