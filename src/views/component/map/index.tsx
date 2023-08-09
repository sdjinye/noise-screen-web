import { defineComponent, onMounted } from 'vue'
import '@/views/component/map/styles/index.less'
export default defineComponent({
	name: 'ComponentMap',
	setup() {
		let map
		onMounted(() => {
			map = new AMap.Map('cm-map-container', {
				resizeEnable: true,
				rotateEnable: true,
				pitchEnable: true,
				zoom: 17,
				pitch: 70,
				rotation: -15,
				viewMode: '3D', //开启3D视图,默认为关闭
				buildingAnimation: true, //楼块出现是否带动画
				expandZoomRange: true,
				zooms: [3, 20],
				center: [116.333926, 39.997245]
				// center: [116.333926, 39.997245]
			})

			// map.addControl(
			// 	new AMap.ControlBar({
			// 		showZoomBar: false,
			// 		showControlButton: true,
			// 		position: {
			// 			right: '10px',
			// 			top: '10px'
			// 		}
			// 	})
			// )
		})

		return map
	},
	render() {
		return <div class="cm-map" id="cm-map-container"></div>
	}
})
