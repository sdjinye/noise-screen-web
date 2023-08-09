import { defineComponent } from 'vue'
import Map from '@/views/component/map'
import LeftData from '@/views/component/leftData'
import '@/views/pages/home/styles/index.less'
export default defineComponent({
	name: 'HomeView',
	render() {
		return (
			<div class="page-home">
				<LeftData />
				<Map />
			</div>
		)
	}
})
