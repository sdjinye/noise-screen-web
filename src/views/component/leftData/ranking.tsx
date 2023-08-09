import { defineComponent, onMounted } from 'vue'
import { Chart } from '@antv/g2'
import '@/views/component/leftData/styles/ranking.less'
export default defineComponent({
	name: 'ComponentLeftDataRanking',
	setup() {
		onMounted(() => {
			const chart = new Chart({
				container: 'js-ranking',
				theme: 'classic',
				autoFit: true,
				padding: 15
			})

			chart.coordinate({ transform: [{ type: 'transpose' }] })
			const data = [
				{ letter: 'K9通源大道与科技路口监控杆', dB: 100 },
				{ letter: 'K10通源大道与陕煤路(太阳能)', dB: 50 },
				{ letter: 'K7汇源大道与能源路口监控杆', dB: 78 },
				{ letter: 'K4能源路东1设备（太阳能）', dB: 50 },
				{ letter: 'K8通源大道与能源路（太阳能）', dB: 34 },
				{ letter: 'K14创业路与开拓路路灯杆', dB: 48 },
				{ letter: 'K13榆神管委会后山气象站监控杆', dB: 39 },
				{ letter: 'K19清水北路与神华路监控杆', dB: 47 },
				{ letter: 'K11通源大道与延长路监控杆', dB: 35 }
			]
			chart
				.interval()
				// .data({
				// 	type: 'fetch',
				// 	value: 'https://gw.alipayobjects.com/os/bmw-prod/fb9dB6b7-23a5-4c23-bbef-c54a55fee580.csv',
				// 	format: 'csv'
				// })
				.data({
					type: 'inline',
					value: data,
					transform: [{ type: 'sort', callback: (a, b) => b.dB - a.dB }]
				})
				.encode('x', 'letter')
				.encode('y', 'dB')
				.axis('y', { labelFormatter: '.0%', label: false })
				.axis('x', { label: false, title: false })
				.label({
					text: 'dB',
					formatter: '0.1%',
					// fontSize:44,
					style: {
						textAnchor: (d) => (+d.dB > 0.008 ? 'right' : 'start'),
						fill: (d) => (+d.dB > 0.008 ? '#fff' : '#000'),
						dx: (d) => (+d.dB > 0.008 ? -5 : 5)
					}
				})

			chart.render()
		})
	},
	render() {
		return (
			<div class="cm-ranking">
				<div>
					<h6>噪声排行</h6>
				</div>
				<div id="js-ranking"></div>
			</div>
		)
	}
})
