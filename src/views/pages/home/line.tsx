import { defineComponent, onMounted } from 'vue'
import { Chart } from '@antv/g2'

export default defineComponent({
	name: 'PageHomeLine',
	setup() {
		onMounted(() => {
			const chart = new Chart({
				container: 'container-line',
				autoFit: true,
				theme: 'classic'
			})
			chart
				.line()
				.data({
					type: 'fetch',
					value: 'http://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv'
				})
				.encode('x', 'date')
				.encode('y', 'close')

			chart.render()
		})
	},
	render() {
		return <div id="container-line"></div>
	}
})
