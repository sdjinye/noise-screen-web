import { defineComponent, onMounted } from 'vue'
import { Chart } from '@antv/g2'
import { generateRandomString } from '@/utils'
export default defineComponent({
	name: 'ComponentCycle',
	props: {
		progress: { type: Number, default: 0.8 },
		color: { type: String, default: '#4cff15' },
		color2: { type: String, default: '#4cff15' }
	},
	setup(props) {
		const id = `cm-cycle_id${generateRandomString(12)}`
		onMounted(() => {
			const chart = new Chart({
				container: id,
				theme: 'classic',
				width: 110,
				height: 110,
				padding: 8
			})
			chart.coordinate({ type: 'theta', innerRadius: 0.7 })

			chart.interval().data
			chart
				.interval()
				.data([1, props.progress])
				.encode('y', (d) => d)
				.encode('color', (d, idx) => idx)
				.scale('y', { domain: [0, 1] })
				.scale('color', { range: [props.color2, props.color] })
				.animate('enter', { type: 'waveIn' })
				.axis(false)
				.legend(false)

			chart.text().style({
				text: `${props.progress * 100}%`,
				x: '50%',
				y: '50%',
				fill: '#fff',
				textAlign: 'center',
				fontSize: 22,
				fontStyle: 'bold'
			})

			chart.interaction('tooltip', false)

			chart.render()
		})

		return { id }
	},
	render() {
		return <div class="container" id={this.id}></div>
	}
})
