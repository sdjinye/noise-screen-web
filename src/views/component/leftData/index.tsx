import { defineComponent } from 'vue'
import Overview from '@/views/component/leftData/overview'
import Device from '@/views/component/leftData/device'
import Ranking from '@/views/component/leftData/ranking'
import '@/views/component/leftData/styles/index.less'
export default defineComponent({
	name: 'ComponentLeftData',
	render() {
		return (
			<div class="left-data">
				{/* 设备概述 */}
				<Overview />
				<Device />
				<Ranking />
			</div>
		)
	}
})
