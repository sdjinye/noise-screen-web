import { defineComponent } from 'vue'
import Box from '@/views/component/box'
import '@/views/component/leftData/styles/overview.less'
import Cycle from '@/views/component/cycle'
export default defineComponent({
	name: 'ComponentLeftDataOverview',
	render() {
		return (
			<Box title="设备概述">
				<div class="cm-left-data__overview">
					<div class="item">
						<Cycle color="#39baff" color2="#aee3ff" />
						<h2>32,199</h2>
						<span>总数量</span>
					</div>
					<div class="item">
						<Cycle color="#33ff5e" color2="#b3ffc3" />
						<h2>32,199</h2>
						<span>在线设备</span>
					</div>
					<div class="item">
						<Cycle color="#ff0000" color2="#ff9280" />
						<h2>32,199</h2>
						<span>离线设备</span>
					</div>
				</div>
			</Box>
		)
	}
})
